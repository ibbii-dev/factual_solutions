import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    const user = await request.json();
    if (!user || !user.email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
    }

    const db = await getDatabase();
    if (db) {
      const usersCollection = db.collection("users");
      await usersCollection.updateOne(
        { email: user.email.toLowerCase().trim() },
        {
          $set: {
            name: user.name,
            email: user.email.toLowerCase().trim(),
            provider: user.provider || "email",
            lastLoginAt: new Date(),
          },
          $setOnInsert: {
            createdAt: new Date(),
            role: "client",
          }
        },
        { upsert: true }
      );
    }

    return NextResponse.json({ success: true, message: "User session registered" });
  } catch (error) {
    console.error("User register error:", error);
    return NextResponse.json({ success: false, message: "Failed to register user" }, { status: 500 });
  }
}
