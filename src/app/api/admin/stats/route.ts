import { NextResponse } from "next/server";
import { dbGetDashboardStats, dbTestConnection } from "@/lib/mongodb";

export async function GET() {
  try {
    const stats = await dbGetDashboardStats();
    const dbStatus = await dbTestConnection();

    return NextResponse.json({
      success: true,
      data: stats,
      database: dbStatus,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to generate dashboard statistics." },
      { status: 500 }
    );
  }
}
