import { NextRequest, NextResponse } from "next/server";

const newsletterSubscribers: Set<string> = new Set();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "Valid email address is required." },
        { status: 400 }
      );
    }

    const normalized = email.trim().toLowerCase();
    newsletterSubscribers.add(normalized);

    console.log(`[Factual Solutions Backend] New Newsletter Subscriber: ${normalized}`);

    return NextResponse.json({
      success: true,
      message: "Subscribed successfully to monthly advisory insights."
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error subscribing to newsletter." },
      { status: 500 }
    );
  }
}
