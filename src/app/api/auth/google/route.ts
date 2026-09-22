import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";

interface GoogleTokenInfo {
  iss: string;
  sub: string;
  azp?: string;
  aud?: string;
  email: string;
  email_verified?: string | boolean;
  name?: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
  error_description?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { credential, user: directUser } = body;

    let verifiedEmail = "";
    let verifiedName = "Google Client";
    let verifiedAvatar = "";
    let googleId = "";

    // 1. If real Google JWT credential token is provided, verify it directly with Google
    if (credential) {
      try {
        const verifyRes = await fetch(
          `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`,
          { cache: "no-store" }
        );

        if (!verifyRes.ok) {
          const errData = await verifyRes.json().catch(() => ({}));
          return NextResponse.json(
            { 
              success: false, 
              message: errData.error_description || "Invalid or expired Google credential token" 
            }, 
            { status: 401 }
          );
        }

        const tokenInfo: GoogleTokenInfo = await verifyRes.json();

        // Check if token belongs to this project's Google Client ID if configured
        const expectedClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
        if (expectedClientId && tokenInfo.aud && tokenInfo.aud !== expectedClientId) {
          return NextResponse.json(
            { success: false, message: "Google token audience (aud) mismatch" },
            { status: 403 }
          );
        }

        if (!tokenInfo.email) {
          return NextResponse.json(
            { success: false, message: "Google token does not contain a verified email" },
            { status: 400 }
          );
        }

        verifiedEmail = tokenInfo.email.toLowerCase().trim();
        verifiedName = tokenInfo.name || tokenInfo.given_name || "Executive Client";
        verifiedAvatar = tokenInfo.picture || "";
        googleId = tokenInfo.sub;
      } catch (verifyErr) {
        console.error("Token verification network error:", verifyErr);
        return NextResponse.json(
          { success: false, message: "Could not reach Google verification servers" },
          { status: 502 }
        );
      }
    } else if (directUser && directUser.email) {
      // Fallback for direct profile sync
      verifiedEmail = directUser.email.toLowerCase().trim();
      verifiedName = directUser.name || "Client";
      verifiedAvatar = directUser.avatar || "";
      googleId = directUser.id || `g_${Date.now()}`;
    } else {
      return NextResponse.json(
        { success: false, message: "Missing Google credential or email" },
        { status: 400 }
      );
    }

    // 2. Upsert verified user into MongoDB
    const now = new Date();
    const finalUserData = {
      id: googleId || `g_${Date.now()}`,
      name: verifiedName,
      email: verifiedEmail,
      avatar: verifiedAvatar,
      provider: "google" as const,
      role: "client",
      lastLoginAt: now.toISOString(),
      createdAt: now.toISOString(),
    };

    try {
      const db = await getDatabase();
      if (db) {
        const usersCollection = db.collection("users");
        await usersCollection.updateOne(
          { email: verifiedEmail },
          {
            $set: {
              name: verifiedName,
              avatar: verifiedAvatar,
              provider: "google",
              googleId: googleId,
              lastLoginAt: now,
              updatedAt: now,
            },
            $setOnInsert: {
              email: verifiedEmail,
              role: "client",
              createdAt: now,
            },
          },
          { upsert: true }
        );

        // Fetch existing metadata if already registered
        const existingRecord = await usersCollection.findOne({ email: verifiedEmail });
        if (existingRecord) {
          finalUserData.role = existingRecord.role || "client";
          finalUserData.createdAt = existingRecord.createdAt?.toISOString?.() || finalUserData.createdAt;
        }
      }
    } catch (dbError) {
      console.warn("MongoDB connection warning in Google Auth (proceeding with session):", dbError);
    }

    return NextResponse.json({
      success: true,
      message: "Google authentication verified successfully",
      user: finalUserData,
    });
  } catch (error: any) {
    console.error("Google auth route fatal error:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Internal server error during Google auth" },
      { status: 500 }
    );
  }
}
