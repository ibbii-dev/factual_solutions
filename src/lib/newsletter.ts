import crypto from "crypto";
import { SITE_URL } from "@/lib/seo";

/**
 * Newsletter sending (admin panel → Subscribers → Send newsletter).
 *
 *  - Every subscriber gets their own email (nobody sees anyone else's address).
 *  - Each email carries a signed one-click unsubscribe link and the List-Unsubscribe
 *    headers that Gmail and Outlook require for bulk mail.
 *  - Sent through Resend's batch endpoint, 100 emails per request.
 */

function secret(): string {
  const s = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD;
  if (!s) throw new Error("ADMIN_SESSION_SECRET is not set.");
  return s;
}

/** Signature that proves an unsubscribe link was issued by us for this exact address. */
export function unsubscribeToken(email: string): string {
  return crypto.createHmac("sha256", secret()).update(`unsubscribe:${email.trim().toLowerCase()}`).digest("base64url");
}

export function verifyUnsubscribeToken(email: string, token: string): boolean {
  try {
    const expected = Buffer.from(unsubscribeToken(email));
    const given = Buffer.from(String(token));
    return expected.length === given.length && crypto.timingSafeEqual(expected, given);
  } catch {
    return false;
  }
}

export function unsubscribeUrl(email: string): string {
  const e = encodeURIComponent(email.trim().toLowerCase());
  return `${SITE_URL}/unsubscribe?e=${e}&t=${unsubscribeToken(email)}`;
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Safe http(s) links only, written as [text](url) in the message. */
function inline(text: string): string {
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" style="color:#9B391E;">$1</a>');
}

/**
 * Turns the plain message typed in the admin panel into email HTML.
 * Blank line = new paragraph, "## " = heading, "- " = bullet, **bold**, [text](https://link).
 */
export function messageToHtml(body: string): string {
  const blocks = body.replace(/\r\n/g, "\n").trim().split(/\n\s*\n/);
  return blocks
    .map((block) => {
      const lines = block.split("\n");
      if (lines.every((l) => /^\s*[-*]\s+/.test(l))) {
        return `<ul style="margin:0 0 16px;padding-left:20px;">${lines
          .map((l) => `<li style="margin:0 0 6px;">${inline(l.replace(/^\s*[-*]\s+/, ""))}</li>`)
          .join("")}</ul>`;
      }
      if (/^##\s+/.test(block)) {
        return `<h2 style="margin:24px 0 10px;font-size:19px;line-height:1.3;color:#0E1A38;">${inline(block.replace(/^##\s+/, ""))}</h2>`;
      }
      return `<p style="margin:0 0 16px;">${lines.map(inline).join("<br>")}</p>`;
    })
    .join("\n");
}

export function newsletterHtml(subject: string, body: string, unsubscribe: string): string {
  return `<!doctype html><html><body style="margin:0;background:#F6F8FC;font-family:Segoe UI,Arial,sans-serif;color:#1F2A44;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F6F8FC;padding:24px 12px;"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid #E4E9F2;border-radius:14px;overflow:hidden;">
<tr><td style="height:4px;background:#25346B;font-size:0;line-height:0;">&nbsp;</td></tr>
<tr><td style="padding:24px 28px 8px;">
<a href="${SITE_URL}" style="text-decoration:none;color:#0E1A38;font-size:18px;font-weight:700;">Factual <span style="color:#25346B;">Solutions</span></a>
<div style="font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#56627A;margin-top:2px;">Your Business Excellence Partners</div>
</td></tr>
<tr><td style="padding:12px 28px 8px;font-size:15px;line-height:1.65;">
<h1 style="margin:0 0 16px;font-size:23px;line-height:1.25;color:#0E1A38;">${escapeHtml(subject)}</h1>
${messageToHtml(body)}
</td></tr>
<tr><td style="padding:8px 28px 28px;">
<a href="${SITE_URL}/blog" style="display:inline-block;background:#9B391E;color:#ffffff;text-decoration:none;font-weight:600;font-size:14px;padding:11px 20px;border-radius:10px;">Read more on our blog</a>
</td></tr>
<tr><td style="padding:16px 28px;border-top:1px solid #E4E9F2;font-size:12px;line-height:1.6;color:#56627A;">
You are receiving this because you subscribed at factual-solutions.com.<br>
Factual Solutions, Lahore, Pakistan &middot; <a href="${unsubscribe}" style="color:#56627A;">Unsubscribe</a>
</td></tr>
</table></td></tr></table></body></html>`;
}

export function newsletterText(subject: string, body: string, unsubscribe: string): string {
  return `${subject}\n\n${body.trim()}\n\nRead more: ${SITE_URL}/blog\n\n--\nYou are receiving this because you subscribed at factual-solutions.com.\nUnsubscribe: ${unsubscribe}`;
}

export type SendResult = { delivered: number; failed: number; error?: string };

/** Sends one personalised email per address through Resend's batch API (100 per call). */
export async function sendNewsletterEmails(subject: string, body: string, recipients: string[]): Promise<SendResult> {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) return { delivered: 0, failed: recipients.length, error: "RESEND_API_KEY is not set." };
  const from = process.env.EMAIL_FROM || "Factual Solutions <contact@factual-solutions.com>";
  const replyTo = (from.match(/<([^>]+)>/)?.[1] || from).trim();

  let delivered = 0;
  let failed = 0;
  let error: string | undefined;
  for (let i = 0; i < recipients.length; i += 100) {
    const chunk = recipients.slice(i, i + 100);
    const batch = chunk.map((to) => {
      const unsub = unsubscribeUrl(to);
      return {
        from,
        to: [to],
        reply_to: replyTo,
        subject,
        html: newsletterHtml(subject, body, unsub),
        text: newsletterText(subject, body, unsub),
        headers: {
          "List-Unsubscribe": `<${unsub}>`,
          "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        },
      };
    });
    try {
      const res = await fetch("https://api.resend.com/emails/batch", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
        body: JSON.stringify(batch),
      });
      if (res.ok) {
        delivered += chunk.length;
      } else {
        failed += recipients.length - i;
        const detail = await res.json().catch(() => ({}));
        error = (detail as { message?: string }).message || `Resend returned ${res.status}.`;
        break; // e.g. the daily sending limit: stop rather than half-send the rest
      }
    } catch (e) {
      failed += recipients.length - i;
      error = e instanceof Error ? e.message : "Network error.";
      break;
    }
  }
  return { delivered, failed, error };
}
