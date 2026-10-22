import { NextRequest, NextResponse } from "next/server";
import { dbSetSubscriberActive } from "@/lib/mongodb";
import { verifyUnsubscribeToken } from "@/lib/newsletter";

/**
 * Unsubscribe with a signed link (?e=<email>&t=<token>).
 *  - POST: one-click unsubscribe from Gmail/Outlook (List-Unsubscribe-Post) and the confirm button on /unsubscribe.
 *  - GET: sends people to the /unsubscribe page, which asks them to confirm (link scanners only GET).
 */
export async function POST(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  let email = params.get("e") || "";
  let token = params.get("t") || "";
  if (!email || !token) {
    const form = await request.formData().catch(() => null);
    email = String(form?.get("e") ?? email);
    token = String(form?.get("t") ?? token);
  }
  email = email.trim().toLowerCase();

  const ok = Boolean(email && token && verifyUnsubscribeToken(email, token));
  if (ok) await dbSetSubscriberActive(email, false);

  // The confirm form on /unsubscribe expects to come back to the page.
  if ((request.headers.get("accept") || "").includes("text/html")) {
    const back = new URL("/unsubscribe", request.nextUrl.origin);
    back.searchParams.set("status", ok ? "done" : "invalid");
    return NextResponse.redirect(back, 303);
  }
  return ok
    ? NextResponse.json({ success: true, message: "Unsubscribed." })
    : NextResponse.json({ success: false, message: "This unsubscribe link is not valid." }, { status: 400 });
}

export async function GET(request: NextRequest) {
  const page = new URL("/unsubscribe", request.nextUrl.origin);
  request.nextUrl.searchParams.forEach((v, k) => page.searchParams.set(k, v));
  return NextResponse.redirect(page, 307);
}
