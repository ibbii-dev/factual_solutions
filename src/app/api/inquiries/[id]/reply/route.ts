import { NextRequest, NextResponse } from "next/server";
import { dbAddInquiryReply, dbGetInquiryById } from "@/lib/mongodb";
import { IInquiryReply } from "@/models";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { author, content, channel } = body;

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

    const replyRecord: IInquiryReply = {
      id: replyId,
      author: author || "Senior Managing Partner",
      content: content.trim(),
      sentAt: nowStr,
      channel: channel || "Email"
    };

    const saved = await dbAddInquiryReply(id, replyRecord);

    // If client provided a phone, generate direct WhatsApp link with message
    let whatsappUrl = null;
    if (inquiry.phone) {
      const cleanPhone = inquiry.phone.replace(/[^0-9]/g, "").replace(/^0/, "92");
      whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(content.trim())}`;
    }

    return NextResponse.json({
      success: true,
      message: `Reply recorded successfully via ${replyRecord.channel}. Inquiry status updated to Contacted.`,
      reply: replyRecord,
      whatsappUrl
    });
  } catch (error: any) {
    console.error("Error submitting inquiry reply:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to process reply." },
      { status: 500 }
    );
  }
}
