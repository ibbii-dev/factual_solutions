import { NextRequest, NextResponse } from "next/server";
import { sendLeadNotification } from "@/lib/emailService";
import { generateAiAutoReply } from "@/lib/aiAgentService";
import { dbSaveInquiry, dbGetInquiries, DatabaseInquiry } from "@/lib/mongodb";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || undefined;
    const search = searchParams.get("q") || undefined;

    const inquiries = await dbGetInquiries({ status, search });

    return NextResponse.json({
      success: true,
      count: inquiries.length,
      data: inquiries
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to retrieve inquiries" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, workEmail, companyName, phone, serviceOfInterest, message, priority } = body;

    if (!fullName || !workEmail) {
      return NextResponse.json(
        { success: false, message: "Full Name and Work Email are required." },
        { status: 400 }
      );
    }

    const now = new Date();
    const currentInquiries = await dbGetInquiries();
    const newId = `INQ-${now.getFullYear()}-${String(currentInquiries.length + 1).padStart(3, "0")}`;
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    // Generate AI Agent Diagnostic & Auto-Reply
    const aiAssessment = await generateAiAutoReply({
      fullName,
      workEmail,
      companyName: companyName || "",
      serviceOfInterest: serviceOfInterest || "General Business Advisory",
      message: message || ""
    });

    const newInquiry: DatabaseInquiry = {
      id: newId,
      fullName: fullName.trim(),
      workEmail: workEmail.trim(),
      companyName: (companyName || "").trim(),
      phone: (phone || "").trim(),
      serviceOfInterest: (serviceOfInterest || "General Business Advisory").trim(),
      message: (message || "").trim(),
      date: dateStr,
      status: "New",
      priority: priority || "Normal",
      aiAssessment
    };

    // Save to MongoDB
    await dbSaveInquiry(newInquiry);

    // Trigger lead notification email / webhook dispatcher
    await sendLeadNotification({
      id: newInquiry.id,
      fullName: newInquiry.fullName,
      workEmail: newInquiry.workEmail,
      companyName: newInquiry.companyName,
      phone: newInquiry.phone,
      serviceOfInterest: newInquiry.serviceOfInterest,
      message: newInquiry.message,
      date: newInquiry.date,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Inquiry registered successfully. AI preliminary assessment generated.",
        data: newInquiry,
        aiAssessment
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Invalid request payload or server error." },
      { status: 500 }
    );
  }
}
