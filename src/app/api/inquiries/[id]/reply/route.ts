import { clientEmail, isAdmin } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";
import { dbAddInquiryReply, dbGetInquiryById } from "@/lib/mongodb";
import { IInquiryReply } from "@/models";
import { sendConsultantReplyEmail } from "@/lib/emailService";
import { linkSpamReason, withinSendLimit } from "@/lib/formGuard";

/** A signed-in client adds a follow-up to one of their own inquiries (client portal). */
async function clientFollowUp(request: NextRequest, id: string) {
  const email = clientEmail(request);
  if (!email) return NextResponse.json({ success: false, message: "Not authorised." }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const message = String(body?.message ?? "").trim();
  if (!message || message.length > 2000) {
    return NextResponse.json({ success: false, message: "Please write a message of up to 2,000 characters." }, { status: 400 });
  }
  const spam = linkSpamReason({ message });
  if (spam) return NextResponse.json({ success: false, message: spam }, { status: 400 });

  const inquiry = await dbGetInquiryById(id);
  // Same answer for "missing" and "someone else's" so ids cannot be probed.
  if (!inquiry || inquiry.workEmail.toLowerCase().trim() !== email) {
    return NextResponse.json({ success: false, message: "Inquiry not found." }, { status: 404 });
  }
  if (!(await withinSendLimit("client-reply", request.headers))) {
    return NextResponse.json({ success: false, message: "You have sent several messages in a short time. Please wait a few minutes." }, { status: 429 });
  }

  const reply: IInquiryReply = {
    id: `REP-${Date.now().toString().slice(-6)}`,
    author: `${inquiry.fullName} (client)`,
    content: message,
    sentAt: new Date().toISOString().slice(0, 16).replace("T", " "),
    channel: "Internal Note",
    deliveryStatus: "Logged",
  };
  await dbAddInquiryReply(id, reply, "New");
  return NextResponse.json({ success: true, message: "Message sent.", reply });
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Staff reply from the admin panel; anyone else is treated as a client follow-up.
  if (!isAdmin(request)) return clientFollowUp(request, params.id);
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
