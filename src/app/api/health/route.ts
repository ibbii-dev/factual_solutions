import { NextResponse } from "next/server";
import { dbTestConnection } from "@/lib/mongodb";

export async function GET() {
  const dbStatus = await dbTestConnection();

  return NextResponse.json({
    status: dbStatus.connected ? "healthy" : "degraded",
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
