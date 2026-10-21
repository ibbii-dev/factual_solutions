import { requireAdmin } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";
import { dbSaveSubscriber, dbGetSubscribers } from "@/lib/mongodb";
import { withinSendLimit } from "@/lib/formGuard";

export async function GET(request: NextRequest) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  try {
    const subscribers = await dbGetSubscribers();
    return NextResponse.json({
      success: true,
      count: subscribers.length,
      data: subscribers
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to retrieve subscriber list." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, source, website } = body;

    // Honeypot: silently accept and drop bot submissions.
    if (typeof website === "string" && website.trim() !== "") {
      return NextResponse.json({ success: true, message: "Subscribed." });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, message: "Valid corporate or personal email address is required." },
        { status: 400 }
      );
    }

    if (!(await withinSendLimit("newsletter", request.headers))) {
      return NextResponse.json(
        { success: false, message: "Too many sign-ups from this connection. Please try again later." },
        { status: 429 }
      );
    }

    await dbSaveSubscriber(email.trim(), String(source || "Website Footer").slice(0, 60));

    return NextResponse.json({
      success: true,
      message: "Subscribed successfully to Factual Solutions monthly corporate insights."
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error subscribing to newsletter." },
      { status: 500 }
    );
  }
}
