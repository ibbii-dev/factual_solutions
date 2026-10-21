"use client";

import React, { useState } from "react";
import { MessageSquare, Send } from "lucide-react";
import type { PublicBlogComment } from "@/models";

const fmt = (iso: string) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
};

const initials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join("");

const TILES = ["bg-navy text-white", "bg-steel text-navy", "bg-rust text-white"];

/** Comments under a blog article: the conversation so far, then a form to join in. */
export default function BlogComments({ slug, initial }: { slug: string; initial: PublicBlogComment[] }) {
  const [comments, setComments] = useState(initial);
  const [fields, setFields] = useState({ name: "", email: "", message: "" });
  const [hp, setHp] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/blog-comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, ...fields, website: hp }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        setStatus("error");
        setError(data.message || "Your comment wasn't posted. Please try again.");
        return;
      }
      if (data.data) setComments((c) => [...c, data.data]);
      setFields((f) => ({ ...f, message: "" }));
      setStatus("done");
    } catch {
      setStatus("error");
      setError("We couldn't reach the server. Please try again.");
    }
  };

  const label = "block text-[13px] font-semibold text-ink dark:text-slate-200 mb-1.5";

  return (
    <section id="comments" aria-labelledby="comments-title" className="mt-12 scroll-mt-28 space-y-6">
      <h2 id="comments-title" className="flex items-center gap-2.5 text-2xl font-bold font-display text-ink dark:text-white">
        <MessageSquare className="w-6 h-6 text-rust dark:text-rust-light" aria-hidden="true" />
        {comments.length === 0 ? "Comments" : `${comments.length} comment${comments.length === 1 ? "" : "s"}`}
      </h2>

      {comments.length === 0 ? (
        <p className="text-[15px] text-slate-600 dark:text-slate-400">No comments yet. Be the first to share your thoughts.</p>
      ) : (
        <ol className="space-y-4">
          {comments.map((c, i) => (
            <li key={c.id} className="fs-card p-5 flex gap-4">
              <span aria-hidden="true" className={`w-10 h-10 shrink-0 rounded-full inline-flex items-center justify-center text-sm font-bold ${TILES[i % 3]}`}>
                {initials(c.name) || "?"}
              </span>
              <div className="min-w-0 space-y-1">
                <p className="text-sm">
                  <span className="font-semibold text-ink dark:text-white">{c.name}</span>
                  <span className="text-slate-500 dark:text-slate-400"> · <time dateTime={c.createdAt}>{fmt(c.createdAt)}</time></span>
                </p>
                <p className="text-[15px] leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-line break-words">{c.message}</p>
              </div>
            </li>
          ))}
        </ol>
      )}

      <form onSubmit={submit} className="fs-card p-6 space-y-4" noValidate>
        <h3 className="text-lg font-bold font-display text-ink dark:text-white">Leave a comment</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="cm-name" className={label}>Name *</label>
            <input id="cm-name" required maxLength={60} autoComplete="name" className="fs-input !py-2.5" value={fields.name} onChange={(e) => setFields({ ...fields, name: e.target.value })} />
          </div>
          <div>
            <label htmlFor="cm-email" className={label}>Email * <span className="font-normal text-slate-500 dark:text-slate-400">(not shown)</span></label>
            <input id="cm-email" type="email" required maxLength={120} autoComplete="email" className="fs-input !py-2.5" value={fields.email} onChange={(e) => setFields({ ...fields, email: e.target.value })} />
          </div>
        </div>
        <div>
          <label htmlFor="cm-message" className={label}>Comment *</label>
          <textarea id="cm-message" required rows={4} maxLength={1500} className="fs-input resize-y" value={fields.message} onChange={(e) => setFields({ ...fields, message: e.target.value })} />
        </div>
        <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
          <input type="text" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
        </div>
        {status === "error" && <p role="alert" className="text-sm text-danger">{error}</p>}
        {status === "done" && <p role="status" className="text-sm text-success">Thanks, your comment is posted.</p>}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <button type="submit" disabled={status === "sending"} className="btn-primary disabled:opacity-60">
            {status === "sending" ? "Posting…" : "Post comment"}
            <Send className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
          </button>
          <p className="text-xs text-slate-500 dark:text-slate-400">Please keep it respectful. Web links aren&apos;t allowed.</p>
        </div>
      </form>
    </section>
  );
}
