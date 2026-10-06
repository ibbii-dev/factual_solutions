import { NextRequest, NextResponse } from "next/server";
import { dbTestConnection } from "@/lib/mongodb";
import { isAdmin } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const dbStatus = await dbTestConnection();
  const status = dbStatus.connected ? "healthy" : "degraded";

  // Public callers only get the overall status; database details are for staff.
  if (!isAdmin(request)) {
    return NextResponse.json({ status, timestamp: new Date().toISOString() });
  }

  return NextResponse.json({
    status,
    mongodb: {
      status: dbStatus.connected
        ? "Live & Connected to MongoDB Atlas Cluster0"
        : "Disconnected / Offline",
      database: dbStatus.dbName,
      connected: dbStatus.connected,
      details: dbStatus.message
    },
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    service: "Factual Solutions MERN API Engine",
    version: "2.1.0"
  });
}
