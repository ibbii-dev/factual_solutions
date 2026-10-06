import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  adminConfigured,
  adminEmail,
  clearLoginFailures,
  clearSession,
  isAdmin,
  loginBlocked,
  recordLoginFailure,
  requestIp,
  safeEqual,
  setAdminSession,
} from "@/lib/session";

export const dynamic = "force-dynamic";

/** Is there a valid staff session? */
export async function GET(request: NextRequest) {
  return NextResponse.json({ success: true, authenticated: isAdmin(request), configured: adminConfigured() });
}

/** Staff sign-in. Credentials come only from ADMIN_EMAIL / ADMIN_PASSWORD env vars. */
export async function POST(request: NextRequest) {
  if (!adminConfigured()) {
    return NextResponse.json(
      { success: false, message: "Admin sign-in is not configured. Set ADMIN_PASSWORD in the hosting environment." },
      { status: 503 }
    );
  }

  const ip = requestIp(request);
  if (loginBlocked(ip)) {
    return NextResponse.json({ success: false, message: "Too many attempts. Try again in 15 minutes." }, { status: 429 });
  }

  let email = "";
  let password = "";
  try {
    const body = await request.json();
    email = String(body?.email || "").toLowerCase().trim();
    password = String(body?.password || "");
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request." }, { status: 400 });
  }

  const ok = safeEqual(email, adminEmail()) && safeEqual(password, process.env.ADMIN_PASSWORD as string);
  if (!ok) {
    recordLoginFailure(ip);
    return NextResponse.json({ success: false, message: "Invalid email or password." }, { status: 401 });
  }

  clearLoginFailures(ip);
  const res = NextResponse.json({ success: true, message: "Signed in." });
  setAdminSession(res, email);
  return res;
}

/** Sign out. */
export async function DELETE() {
  const res = NextResponse.json({ success: true });
  clearSession(res, ADMIN_COOKIE);
  return res;
}
