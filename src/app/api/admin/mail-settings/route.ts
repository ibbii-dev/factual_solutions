import { NextRequest, NextResponse } from "next/server";
import { getMailingSystemStatus, sendTestEmail } from "@/lib/emailService";

export async function GET() {
  try {
    const status = getMailingSystemStatus();
    return NextResponse.json({
      success: true,
      status
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to load mail settings." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { targetEmail } = body;

    if (!targetEmail || !targetEmail.includes("@")) {
      return NextResponse.json(
        { success: false, message: "Valid target email address is required for diagnostic test." },
        { status: 400 }
      );
    }

    const result = await sendTestEmail(targetEmail);

    return NextResponse.json({
      success: result.success,
      provider: result.provider,
      message: result.provider === "resend"
        ? `Diagnostic test email transmitted successfully to ${targetEmail} via Resend API.`
        : `Diagnostic test simulated and logged to audit console for ${targetEmail}. Configure RESEND_API_KEY in environment to deliver live emails.`,
      result
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to dispatch test email." },
      { status: 500 }
    );
  }
}
