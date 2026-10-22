"use client";

import React, { useCallback, useEffect, useState } from "react";
import { History, Megaphone, Send, TestTube2 } from "lucide-react";
import { useNotify } from "@/components/ui/Notify";

type SendRecord = { id: string; subject: string; sentAt: string; recipients: number; delivered: number; failed: number; error?: string };

const input = "w-full rounded-xl border border-line bg-bg px-3.5 py-2.5 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/40";
/** Resend's free plan sends at most 100 emails a day. */
const DAILY_LIMIT = 100;

/** Admin: write a newsletter, send yourself a test, then send it to every active subscriber. */
export default function NewsletterComposer() {
  const { toast, confirm: ask } = useNotify();
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [testEmail, setTestEmail] = useState("");
  const [activeCount, setActiveCount] = useState<number | null>(null);
  const [history, setHistory] = useState<SendRecord[]>([]);
  const [busy, setBusy] = useState<"" | "test" | "send">("");
  const [testedSubject, setTestedSubject] = useState("");

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/newsletter", { cache: "no-store" });
      const data = await res.json();
      if (data.success) {
        setActiveCount(data.activeCount);
        setHistory(data.history);
      }
    } catch {
      /* the tab still works; counts just stay empty */
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const post = async (extra: object) => {
    const res = await fetch("/api/admin/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, body, ...extra }),
    });
    return { ok: res.ok, data: await res.json().catch(() => ({})) };
  };

  const sendTest = async () => {
    setBusy("test");
    const { ok, data } = await post({ testEmail });
    setBusy("");
    toast({ tone: ok ? "success" : "error", title: ok ? "Test email sent" : "Test not sent", message: data.message });
    if (ok) setTestedSubject(subject);
  };

  const sendAll = async () => {
    if (!activeCount) return;
    const ok = await ask({
      title: `Send to ${activeCount} subscriber${activeCount === 1 ? "" : "s"}?`,
      message:
        (testedSubject !== subject ? "You haven't sent yourself a test of this version yet. " : "") +
        `"${subject}" will be emailed to everyone on the list now. This cannot be undone.`,
      confirmLabel: "Send newsletter",
    });
    if (!ok) return;
    setBusy("send");
    const { ok: sent, data } = await post({});
    setBusy("");
    toast({ tone: sent ? (data.partial ? "warning" : "success") : "error", title: sent ? "Newsletter sent" : "Newsletter not sent", message: data.message });
    if (sent) {
      setSubject("");
      setBody("");
      setTestedSubject("");
    }
    load();
  };

  const ready = subject.trim().length > 0 && body.trim().length >= 20;
  // Tell the admin why the send buttons are greyed out.
  const blocker = !subject.trim()
    ? "Add a subject to continue."
    : body.trim().length < 20
      ? `Write a little more: the message needs at least 20 characters (${body.trim().length}/20).`
      : "";

  return (
    <section aria-labelledby="nl-title" className="rounded-3xl border border-line bg-surface p-5 sm:p-6 space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 id="nl-title" className="text-lg font-bold text-heading flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-accent" aria-hidden="true" /> Send a newsletter
          </h2>
          <p className="text-sm text-muted">
            Each subscriber gets their own copy with an unsubscribe link.{" "}
            {activeCount !== null && (
              <strong className="text-heading">
                {activeCount} active subscriber{activeCount === 1 ? "" : "s"}.
              </strong>
            )}
          </p>
        </div>
      </div>

      {activeCount !== null && activeCount > DAILY_LIMIT && (
        <p className="rounded-xl border border-warning/30 bg-warning/10 p-3 text-sm text-ink">
          You have more than {DAILY_LIMIT} subscribers. Resend&apos;s free plan sends up to {DAILY_LIMIT} emails a day, so upgrade the
          Resend plan before sending, or some subscribers won&apos;t receive it.
        </p>
      )}

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-4">
          <div>
            <label htmlFor="nl-subject" className="block text-xs font-semibold text-heading mb-1.5">Subject</label>
            <input id="nl-subject" className={input} maxLength={150} value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. 5 quick wins to cut waste on the shop floor" />
          </div>
          <div>
            <label htmlFor="nl-body" className="block text-xs font-semibold text-heading mb-1.5">Message</label>
            <textarea
              id="nl-body"
              rows={12}
              className={`${input} font-[inherit] leading-relaxed`}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder={"Dear reader,\n\nWrite your update here. Leave a blank line between paragraphs.\n\n## A heading\n- A bullet point\n- **Bold text**\n- [A link](https://factual-solutions.com/blog)"}
            />
            <p className="mt-1.5 text-xs text-muted">
              Blank line = new paragraph · <code>## </code> heading · <code>- </code> bullet · <code>**bold**</code> · <code>[text](https://link)</code>.
              The email adds your logo, a &ldquo;Read more on our blog&rdquo; button and the unsubscribe footer automatically.
            </p>
          </div>
        </div>

        <aside className="space-y-4">
          {blocker && (
            <p role="status" className="rounded-xl border border-warning/30 bg-warning/10 px-3.5 py-2.5 text-xs text-ink">
              {blocker}
            </p>
          )}
          <div className="rounded-2xl border border-line bg-bg p-4 space-y-3">
            <p className="text-xs font-semibold text-heading flex items-center gap-1.5"><TestTube2 className="w-4 h-4 text-primary" aria-hidden="true" /> 1. Send yourself a test</p>
            <label htmlFor="nl-test" className="sr-only">Test email address</label>
            <input id="nl-test" type="email" className={input} value={testEmail} onChange={(e) => setTestEmail(e.target.value)} placeholder="you@factual-solutions.com" />
            {ready && !testEmail && <p className="text-xs text-muted">Enter the address to send the test to.</p>}
            <button type="button" disabled={!ready || !testEmail || busy !== ""} onClick={sendTest} className="w-full rounded-xl border border-line py-2.5 text-sm font-semibold text-heading hover:bg-band disabled:opacity-50">
              {busy === "test" ? "Sending test…" : "Send test"}
            </button>
          </div>
          <div className="rounded-2xl border border-line bg-bg p-4 space-y-3">
            <p className="text-xs font-semibold text-heading flex items-center gap-1.5"><Send className="w-4 h-4 text-accent" aria-hidden="true" /> 2. Send to everyone</p>
            <button type="button" disabled={!ready || !activeCount || busy !== ""} onClick={sendAll} className="w-full rounded-xl bg-action hover:bg-action-hover text-on-action py-2.5 text-sm font-semibold disabled:opacity-50">
              {busy === "send" ? "Sending…" : `Send to ${activeCount ?? "…"} subscriber${activeCount === 1 ? "" : "s"}`}
            </button>
          </div>
        </aside>
      </div>

      {history.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-heading flex items-center gap-1.5"><History className="w-4 h-4 text-muted" aria-hidden="true" /> Sent newsletters</p>
          <ul className="divide-y divide-line rounded-2xl border border-line bg-bg">
            {history.map((h) => (
              <li key={h.id} className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-sm">
                <span className="font-semibold text-heading">{h.subject}</span>
                <span className="text-muted">
                  {new Date(h.sentAt).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })} · {h.delivered}/{h.recipients} sent
                  {h.failed > 0 && <span className="text-danger"> · {h.failed} failed</span>}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
