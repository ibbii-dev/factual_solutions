import { NextRequest, NextResponse } from "next/server";
import { dbSaveSubscriber, dbGetSubscribers } from "@/lib/mongodb";

export async function GET() {
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
    const { email, source } = body;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, message: "Valid corporate or personal email address is required." },
        { status: 400 }
      );
    }

    await dbSaveSubscriber(email, source || "Website Footer");

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
