import { NextRequest, NextResponse } from "next/server";
import { dbAddInquiryReply, dbGetInquiryById } from "@/lib/mongodb";
import { IInquiryReply } from "@/models";
import { sendConsultantReplyEmail } from "@/lib/emailService";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { author, content, channel, subject } = body;

    if (!content || !content.trim()) {
      return NextResponse.json(
        { success: false, message: "Reply content cannot be empty." },
        { status: 400 }
      );
    }

    const inquiry = await dbGetInquiryById(id);
    if (!inquiry) {
      return NextResponse.json(
        { success: false, message: `Inquiry with ID ${id} not found.` },
        { status: 404 }
      );
    }

    const replyId = `REP-${Date.now().toString().slice(-4)}`;
    const nowStr = new Date().toISOString().slice(0, 16).replace("T", " ");
    const selectedChannel = (channel || "Email") as "Email" | "WhatsApp" | "Internal Note";
    const emailSubject = subject?.trim() || `Factual Solutions Advisory: Response to Consultation #${inquiry.id}`;

    let deliveryStatus: "Sent" | "Logged" | "Failed" = "Logged";
    let mailResult: { success: boolean; provider: string; messageId?: string; error?: string } | null = null;

    // Dispatch email if channel is Email
    if (selectedChannel === "Email") {
      try {
        mailResult = await sendConsultantReplyEmail({
          to: inquiry.workEmail,
          clientName: inquiry.fullName,
          inquiryId: inquiry.id,
          serviceOfInterest: inquiry.serviceOfInterest,
          author: author || "Senior Managing Partner, Factual Solutions",
          subject: emailSubject,
          content: content.trim(),
          originalMessage: inquiry.message
        });

        deliveryStatus = mailResult.success ? "Sent" : "Failed";
      } catch (mailErr: any) {
        console.error("Failed to execute sendConsultantReplyEmail:", mailErr);
        deliveryStatus = "Failed";
        mailResult = { success: false, provider: "error", error: mailErr?.message };
      }
    }

    const replyRecord: IInquiryReply = {
      id: replyId,
      author: author || "Senior Managing Partner",
      content: content.trim(),
      sentAt: nowStr,
      channel: selectedChannel,
      subject: selectedChannel === "Email" ? emailSubject : undefined,
      deliveryStatus
    };

    // Save reply to MongoDB Atlas
    await dbAddInquiryReply(id, replyRecord);

    // If client provided a phone, generate direct WhatsApp link with message
    let whatsappUrl = null;
    if (inquiry.phone) {
      const cleanPhone = inquiry.phone.replace(/[^0-9]/g, "").replace(/^0/, "92");
      whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(content.trim())}`;
    }

    let successMessage = `Reply recorded successfully via ${replyRecord.channel}. Inquiry status updated to Contacted.`;
    if (selectedChannel === "Email") {
      if (mailResult?.provider === "resend") {
        successMessage = `Email successfully dispatched to ${inquiry.workEmail} via Resend API.`;
      } else {
        successMessage = `Reply recorded to database audit log for ${inquiry.workEmail}. (Set RESEND_API_KEY in .env for direct live inbox delivery).`;
      }
    }

    return NextResponse.json({
      success: true,
      message: successMessage,
      reply: replyRecord,
      whatsappUrl,
      mailResult
    });
  } catch (error: any) {
    console.error("Error submitting inquiry reply:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to process reply." },
      { status: 500 }
    );
  }
}
