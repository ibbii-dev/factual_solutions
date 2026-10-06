import { createHash, createHmac, timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";

/**
 * Small signed-cookie sessions for the staff admin and the client portal.
 *
 * A cookie value is `base64url(payload).base64url(hmac)`. The HMAC key comes
 * from ADMIN_SESSION_SECRET, or is derived from ADMIN_PASSWORD when no
 * separate secret is set. With neither configured, admin sign-in is disabled.
 */

export const ADMIN_COOKIE = "fs_admin";
export const CLIENT_COOKIE = "fs_client";
const ADMIN_TTL_S = 60 * 60 * 8; // 8 hours
const CLIENT_TTL_S = 60 * 60 * 24 * 7; // 7 days

type Payload = { sub: string; role: "admin" | "client"; exp: number };

function sessionKey(): Buffer | null {
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD;
  if (!secret || secret.length < 8) return null;
  return createHash("sha256").update(`fs-session:${secret}`).digest();
}

const b64 = (b: Buffer | string) => Buffer.from(b).toString("base64url");

function sign(payload: Payload): string | null {
  const key = sessionKey();
  if (!key) return null;
  const body = b64(JSON.stringify(payload));
  const mac = createHmac("sha256", key).update(body).digest();
  return `${body}.${b64(mac)}`;
}

function verify(token: string | undefined, role: Payload["role"]): Payload | null {
  const key = sessionKey();
  if (!key || !token) return null;
  const [body, mac] = token.split(".");
  if (!body || !mac) return null;
  const expected = createHmac("sha256", key).update(body).digest();
  const given = Buffer.from(mac, "base64url");
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) return null;
  try {
    const p = JSON.parse(Buffer.from(body, "base64url").toString()) as Payload;
    if (p.role !== role || typeof p.exp !== "number" || p.exp < Date.now() / 1000) return null;
    return p;
  } catch {
    return null;
  }
}

/** Constant-time string comparison (hashes first so lengths never leak). */
export function safeEqual(a: string, b: string): boolean {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

export function adminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD && sessionKey());
}

export function adminEmail(): string {
  return (process.env.ADMIN_EMAIL || "admin@factual-solutions.com").toLowerCase().trim();
}

function cookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
    maxAge,
  };
}

export function setAdminSession(res: NextResponse, email: string): boolean {
  const token = sign({ sub: email, role: "admin", exp: Math.floor(Date.now() / 1000) + ADMIN_TTL_S });
  if (!token) return false;
  res.cookies.set(ADMIN_COOKIE, token, cookieOptions(ADMIN_TTL_S));
  return true;
}

export function setClientSession(res: NextResponse, email: string): boolean {
  const token = sign({ sub: email.toLowerCase().trim(), role: "client", exp: Math.floor(Date.now() / 1000) + CLIENT_TTL_S });
  if (!token) return false;
  res.cookies.set(CLIENT_COOKIE, token, { ...cookieOptions(CLIENT_TTL_S), sameSite: "lax" });
  return true;
}

export function clearSession(res: NextResponse, name: string) {
  res.cookies.set(name, "", { ...cookieOptions(0), maxAge: 0 });
}

export function isAdmin(req: NextRequest): boolean {
  return verify(req.cookies.get(ADMIN_COOKIE)?.value, "admin") !== null;
}

/** Email of the signed-in (Google-verified) portal client, if any. */
export function clientEmail(req: NextRequest): string | null {
  return verify(req.cookies.get(CLIENT_COOKIE)?.value, "client")?.sub ?? null;
}

/** Returns a 401 response when the request has no valid admin session, otherwise null. */
export function requireAdmin(req: NextRequest): NextResponse | null {
  if (isAdmin(req)) return null;
  return NextResponse.json({ success: false, message: "Not authorised." }, { status: 401 });
}

/* Best-effort login throttle (per server instance): 8 failures per 15 minutes per IP. */
const attempts = new Map<string, { n: number; until: number }>();
export function loginBlocked(ip: string): boolean {
  const a = attempts.get(ip);
  return Boolean(a && a.n >= 8 && a.until > Date.now());
}
export function recordLoginFailure(ip: string) {
  const now = Date.now();
  const a = attempts.get(ip);
  if (!a || a.until < now) attempts.set(ip, { n: 1, until: now + 15 * 60 * 1000 });
  else a.n += 1;
  if (attempts.size > 5000) attempts.clear();
}
export function clearLoginFailures(ip: string) {
  attempts.delete(ip);
}
export function requestIp(req: NextRequest): string {
  return (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || req.ip || "unknown";
}
