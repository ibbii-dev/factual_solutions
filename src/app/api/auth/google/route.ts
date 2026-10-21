import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { CLIENT_COOKIE, clearSession, clientEmail, setClientSession } from "@/lib/session";

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
    const { credential } = body;

    // Client sign-in only works when this site's Google client ID is configured, so
    // tokens issued for other applications are never accepted.
    const expectedClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID;
    if (!expectedClientId) {
      return NextResponse.json({ success: false, message: "Client sign-in is not configured." }, { status: 503 });
    }

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

        // The token must have been issued for this site.
        if (tokenInfo.aud !== expectedClientId) {
          return NextResponse.json(
            { success: false, message: "Google token audience mismatch" },
            { status: 403 }
          );
        }

        const emailVerified = tokenInfo.email_verified === true || tokenInfo.email_verified === "true";
        if (!tokenInfo.email || !emailVerified) {
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

    const res = NextResponse.json({
      success: true,
      message: "Google authentication verified successfully",
      user: finalUserData,
    });
    // Only a Google-verified token reaches this point; it earns a signed portal session.
    if (!setClientSession(res, verifiedEmail)) {
      return NextResponse.json({ success: false, message: "Client sign-in is not configured." }, { status: 503 });
    }
    return res;
  } catch (error: any) {
    console.error("Google auth route fatal error:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Internal server error during Google auth" },
      { status: 500 }
    );
  }
}

/** Who is signed in to the client portal (from the signed session cookie), if anyone. */
export async function GET(request: NextRequest) {
  const email = clientEmail(request);
  const enabled = Boolean(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID);
  if (!email) return NextResponse.json({ success: true, enabled, user: null });

  let name = email.split("@")[0];
  let avatar = "";
  try {
    const db = await getDatabase();
    const record = db ? await db.collection("users").findOne({ email }) : null;
    if (record?.name) name = record.name;
    if (record?.avatar) avatar = record.avatar;
  } catch {
    /* the session is still valid without the profile details */
  }
  return NextResponse.json({ success: true, enabled, user: { email, name, avatar, provider: "google" } });
}

/** Portal sign-out: clears the client session cookie. */
export async function DELETE() {
  const res = NextResponse.json({ success: true });
  clearSession(res, CLIENT_COOKIE);
  return res;
}
