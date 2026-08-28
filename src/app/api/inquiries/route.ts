import { NextRequest, NextResponse } from "next/server";
import { sendLeadNotification } from "@/lib/emailService";

export interface ServerInquiry {
  id: string;
  fullName: string;
  workEmail: string;
  companyName: string;
  phone: string;
  serviceOfInterest: string;
  message: string;
  date: string;
  status: "New" | "Contacted" | "In Progress" | "Closed";
  priority: "Normal" | "High" | "Urgent";
}

// In-memory / server cache fallback
let memoryInquiries: ServerInquiry[] = [
  {
    id: "INQ-2026-001",
    fullName: "Tariq Al-Mansoor",
    workEmail: "tariq@alnoorgroup.com",
    companyName: "Al-Noor Consumer Retail",
    phone: "+966 50 492 1180",
    serviceOfInterest: "Specialized Business Solutions",
    message: "We operate 3 retail branches in Riyadh and are looking for advice on inventory budgeting and store-level financial modeling before opening 2 more stores next quarter.",
    date: "2026-08-26 14:30",
    status: "In Progress",
    priority: "High"
  },
  {
    id: "INQ-2026-002",
    fullName: "Bilal Farooq",
    workEmail: "bfarooq@apexpack.com",
    companyName: "Apex Industrial Packaging",
    phone: "+92 321 884 1029",
    serviceOfInterest: "Strategic Management Consulting",
    message: "We need an operational audit of our factory floor handovers and scrap rates. Looking for an advisory team to conduct a 4-week review.",
    date: "2026-08-26 11:15",
    status: "New",
    priority: "Urgent"
  },
  {
    id: "INQ-2026-003",
    fullName: "Kamran Qureshi",
    workEmail: "k.qureshi@novabiz.com.pk",
    companyName: "Nova Commercial Logistics",
    phone: "+92 300 551 2291",
    serviceOfInterest: "Studies & Feasibility Research",
    message: "Seeking commercial model validation and ROI sensitivity projections for a cold-chain storage facility in Lahore.",
    date: "2026-08-25 16:45",
    status: "Contacted",
    priority: "Normal"
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const search = searchParams.get("q");

    let result = [...memoryInquiries];

    if (status && status !== "All") {
      result = result.filter((i) => i.status === status);
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (i) =>
          i.fullName.toLowerCase().includes(q) ||
          i.workEmail.toLowerCase().includes(q) ||
          i.companyName.toLowerCase().includes(q) ||
          i.serviceOfInterest.toLowerCase().includes(q) ||
          i.id.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({
      success: true,
      count: result.length,
      data: result
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
    const newId = `INQ-${now.getFullYear()}-${String(memoryInquiries.length + 1).padStart(3, "0")}`;
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    const newInquiry: ServerInquiry = {
      id: newId,
      fullName: fullName.trim(),
      workEmail: workEmail.trim(),
      companyName: (companyName || "").trim(),
      phone: (phone || "").trim(),
      serviceOfInterest: (serviceOfInterest || "General Business Advisory").trim(),
      message: (message || "").trim(),
      date: dateStr,
      status: "New",
      priority: priority || "Normal"
    };

    // Store in server list
    memoryInquiries = [newInquiry, ...memoryInquiries];

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
        message: "Inquiry registered successfully. Our consultants will contact you shortly.",
        data: newInquiry
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
