/**
 * Server-side Google reCAPTCHA (v2 "I'm not a robot") verification.
 *
 * Configure in Vercel → Project → Settings → Environment Variables:
 *   NEXT_PUBLIC_RECAPTCHA_SITE_KEY  – public site key (used by the browser widget)
 *   RECAPTCHA_SECRET_KEY            – secret key (server only, never exposed)
 *   RECAPTCHA_ALLOWED_HOSTNAMES     – optional, comma-separated (e.g. "factual-solutions.vercel.app,www.factual-solutions.com")
 */

// Google's documented test pair: always passes. Used ONLY in local development.
const DEV_TEST_SECRET = "6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe";

const isProduction = process.env.NODE_ENV === "production";

export function recaptchaSecret(): string | null {
  const secret = process.env.RECAPTCHA_SECRET_KEY?.trim();
  if (secret) return secret;
  return isProduction ? null : DEV_TEST_SECRET;
}

export type RecaptchaResult =
  | { ok: true; skipped?: boolean }
  | { ok: false; status: number; message: string; codes?: string[] };

function clientIp(headers: Headers): string | undefined {
  const fwd = headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return headers.get("x-real-ip") || undefined;
}

export async function verifyRecaptcha(token: unknown, headers: Headers): Promise<RecaptchaResult> {
  const secret = recaptchaSecret();

  if (!secret) {
    // Keys not configured yet: don't take the forms offline, but make it visible in logs.
    console.warn("[reCAPTCHA] RECAPTCHA_SECRET_KEY is not set – submissions are NOT spam-protected.");
    return { ok: true, skipped: true };
  }

  if (typeof token !== "string" || token.length < 20 || token.length > 4000) {
    return { ok: false, status: 400, message: "Please complete the \"I'm not a robot\" check and try again." };
  }

  try {
    const body = new URLSearchParams({ secret, response: token });
    const ip = clientIp(headers);
    if (ip) body.set("remoteip", ip);

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      signal: controller.signal,
      cache: "no-store",
    }).finally(() => clearTimeout(timer));

    const data = (await res.json()) as { success?: boolean; hostname?: string; "error-codes"?: string[] };

    if (!data.success) {
      const codes = data["error-codes"] || [];
      const expired = codes.includes("timeout-or-duplicate");
      return {
        ok: false,
        status: 400,
        codes,
        message: expired
          ? "The verification expired. Please tick \"I'm not a robot\" again."
          : "Verification failed. Please tick \"I'm not a robot\" and try again.",
      };
    }

    const allowed = (process.env.RECAPTCHA_ALLOWED_HOSTNAMES || "")
      .split(",")
      .map((h) => h.trim().toLowerCase())
      .filter(Boolean);
    if (allowed.length && data.hostname && !allowed.includes(data.hostname.toLowerCase())) {
      return { ok: false, status: 400, message: "Verification failed for this website.", codes: ["hostname-mismatch"] };
    }

    return { ok: true };
  } catch (err) {
    console.error("[reCAPTCHA] verification request failed:", err);
    return { ok: false, status: 503, message: "We couldn't verify the request right now. Please try again in a moment." };
  }
}
