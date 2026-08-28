import { NextResponse } from "next/server";

export async function GET() {
  const uri = process.env.MONGODB_URI;
  let mongoStatus = "Not Configured";
  let dbName = process.env.MONGODB_DB_NAME || "factual_solutions";
  let errorMsg = null;

  if (uri) {
    try {
      const { MongoClient } = await import("mongodb");
      const client = new MongoClient(uri);
      await client.connect();
      const db = client.db(dbName);
      await db.command({ ping: 1 });
      await client.close();
      mongoStatus = "Connected & Active (Cluster0)";
    } catch (err: any) {
      mongoStatus = "Connection Attempted (Fallback Active)";
      errorMsg = err?.message || String(err);
    }
  }

  return NextResponse.json({
    status: "healthy",
    mongodb: {
      status: mongoStatus,
      database: dbName,
      error: errorMsg
    },
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    service: "Factual Solutions Web API"
  });
}
