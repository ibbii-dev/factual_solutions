import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/session";
import { dbGetNewsletterSends, dbGetSubscribers, dbSaveNewsletterSend } from "@/lib/mongodb";
import { sendNewsletterEmails } from "@/lib/newsletter";

const EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

async function activeSubscribers(): Promise<string[]> {
  const all = await dbGetSubscribers();
  return Array.from(new Set(all.filter((s) => s.isActive !== false).map((s) => s.email.trim().toLowerCase()))).filter((e) =>
    EMAIL.test(e)
  );
}

// GET: how many people would receive a newsletter, plus recent sends.
export async function GET(request: NextRequest) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const [recipients, history] = await Promise.all([activeSubscribers(), dbGetNewsletterSends()]);
  return NextResponse.json({ success: true, activeCount: recipients.length, history });
}

// POST { subject, body, testEmail? }: send a test to one address, or the newsletter to every active subscriber.
export async function POST(request: NextRequest) {
  const denied = requireAdmin(request);
  if (denied) return denied;

  const payload = await request.json().catch(() => ({}));
  const subject = String(payload.subject ?? "").trim();
  const body = String(payload.body ?? "").trim();
  const testEmail = String(payload.testEmail ?? "").trim().toLowerCase();

  if (!subject || subject.length > 150) return NextResponse.json({ success: false, message: "Please add a subject (up to 150 characters)." }, { status: 400 });
  if (body.length < 20 || body.length > 20000) return NextResponse.json({ success: false, message: "Please write a message (at least a couple of sentences)." }, { status: 400 });

  if (testEmail) {
    if (!EMAIL.test(testEmail)) return NextResponse.json({ success: false, message: "Enter a valid email address for the test." }, { status: 400 });
    const r = await sendNewsletterEmails(`[TEST] ${subject}`, body, [testEmail]);
    return r.delivered
      ? NextResponse.json({ success: true, message: `Test sent to ${testEmail}. Check the inbox (and spam folder).` })
      : NextResponse.json({ success: false, message: r.error || "The test email could not be sent." }, { status: 502 });
  }

  const recipients = await activeSubscribers();
  if (recipients.length === 0) return NextResponse.json({ success: false, message: "There are no active subscribers yet." }, { status: 400 });

  const r = await sendNewsletterEmails(subject, body, recipients);
  await dbSaveNewsletterSend({
    id: `nl-${Date.now()}`,
    subject,
    sentAt: new Date().toISOString(),
    sentBy: "admin",
    recipients: recipients.length,
    delivered: r.delivered,
    failed: r.failed,
    error: r.error,
  });

  if (r.delivered === 0) {
    return NextResponse.json({ success: false, message: r.error || "The newsletter could not be sent." }, { status: 502 });
  }
  return NextResponse.json({
    success: true,
    partial: r.failed > 0,
    message:
      r.failed > 0
        ? `Sent to ${r.delivered} of ${recipients.length} subscribers. The rest failed: ${r.error}`
        : `Newsletter sent to ${r.delivered} subscriber${r.delivered === 1 ? "" : "s"}.`,
  });
}
