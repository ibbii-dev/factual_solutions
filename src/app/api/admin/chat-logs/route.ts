import { NextResponse } from "next/server";
import { dbGetChatLogs } from "@/lib/mongodb";

export async function GET() {
  try {
    const logs = await dbGetChatLogs(100);

    return NextResponse.json({
      success: true,
      count: logs.length,
      data: logs
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to retrieve chat logs." },
      { status: 500 }
    );
  }
}
