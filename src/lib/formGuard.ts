import { createHash } from "crypto";
import { getDatabase } from "@/lib/mongodb";

/**
 * Spam protection for public forms that works without reCAPTCHA keys:
 *  - a per-visitor send limit (stored in MongoDB so it holds across serverless instances,
 *    with an in-memory fallback when no database is configured)
 *  - a filter for link spam
 */

const LIMITS = [
  { windowMs: 10 * 60 * 1000, max: 3 }, // 3 messages per 10 minutes
  { windowMs: 24 * 60 * 60 * 1000, max: 10 }, // 10 messages per day
];
const DAY_MS = 24 * 60 * 60 * 1000;

export function clientIp(headers: Headers): string {
  const fwd = headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return headers.get("x-real-ip") || "unknown";
}

/** Visitors are stored only as a one-way hash of their IP address. */
function visitorKey(form: string, headers: Headers): string {
  return createHash("sha256").update(`${form}:${clientIp(headers)}`).digest("hex");
}

const memory = new Map<string, number[]>();
let indexReady = false;

/** Records this attempt and returns false when the visitor has sent too many recently. */
export async function withinSendLimit(form: string, headers: Headers): Promise<boolean> {
  const key = visitorKey(form, headers);
  const now = Date.now();

  try {
    const db = await getDatabase();
    if (db) {
      const collection = db.collection("form_rate_limits");
      if (!indexReady) {
        // Entries delete themselves after a day.
        await collection.createIndex({ at: 1 }, { expireAfterSeconds: DAY_MS / 1000 });
        await collection.createIndex({ key: 1, at: -1 });
        indexReady = true;
      }
      for (const { windowMs, max } of LIMITS) {
        const recent = await collection.countDocuments({ key, at: { $gt: new Date(now - windowMs) } });
        if (recent >= max) return false;
      }
      await collection.insertOne({ key, at: new Date(now) });
      return true;
    }
  } catch (err) {
    console.error("[formGuard] rate limit check failed, using memory:", err);
  }

  const times = (memory.get(key) || []).filter((t) => now - t < DAY_MS);
  for (const { windowMs, max } of LIMITS) {
    if (times.filter((t) => now - t < windowMs).length >= max) return false;
  }
  times.push(now);
  memory.set(key, times);
  return true;
}

const HAS_LINK = /(https?:\/\/|www\.)\S+/i;
const ALL_LINKS = /(https?:\/\/|www\.)\S+/gi;

/** Returns a message for the visitor when the text looks like link spam, otherwise null. */
export function linkSpamReason(fields: { name?: string; company?: string; message?: string }): string | null {
  if (HAS_LINK.test(fields.name || "") || HAS_LINK.test(fields.company || "")) {
    return "Please remove web links from your name and company.";
  }
  const links = (fields.message || "").match(ALL_LINKS) || [];
  if (links.length > 2) return "Please include no more than two web links in your message.";
  return null;
}
