"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Eye, EyeOff, ExternalLink, MessageSquare, Search, Trash2 } from "lucide-react";
import type { IBlogComment } from "@/models";
import { useNotify } from "@/components/ui/Notify";

/** Admin "Comments" tab: every blog comment, newest first, with show/hide and delete. */
export default function CommentsManager({ onCount }: { onCount?: (n: number) => void }) {
  const [items, setItems] = useState<IBlogComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const { toast, confirm: ask } = useNotify();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/blog-comments?all=true", { cache: "no-store" });
      const data = await res.json();
      if (data.success) {
        setItems(data.data);
        onCount?.(data.data.length);
      }
    } catch {
      setMessage({ ok: false, text: "Could not load comments." });
    } finally {
      setLoading(false);
    }
  }, [onCount]);

  useEffect(() => {
    load();
  }, [load]);

  const setStatus = async (c: IBlogComment, status: IBlogComment["status"]) => {
    const res = await fetch(`/api/blog-comments/${c.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const data = await res.json().catch(() => ({}));
    toast({ tone: res.ok ? "success" : "error", title: data.message || "Done." });
    await load();
  };

  const remove = async (c: IBlogComment) => {
    if (!(await ask({ title: "Delete this comment?", message: `The comment by ${c.name} will be removed permanently. To keep it but take it off the site, use Hide instead.`, confirmLabel: "Delete comment", danger: true }))) return;
    const res = await fetch(`/api/blog-comments/${c.id}`, { method: "DELETE" });
    const data = await res.json().catch(() => ({}));
    toast({ tone: res.ok ? "success" : "error", title: data.message || "Done." });
    await load();
  };

  const q = query.trim().toLowerCase();
  const shown = items.filter(
    (c) => !q || [c.name, c.email, c.message, c.postTitle].some((v) => v.toLowerCase().includes(q))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-heading">Blog comments</h2>
          <p className="text-sm text-muted">Comments appear on articles straight away. Hide or delete anything inappropriate.</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-muted absolute start-3 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search comments"
            aria-label="Search comments"
            className="w-full rounded-xl border border-line bg-bg ps-9 pe-3 py-2 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
      </div>

      {message && (
        <div role="status" className={`rounded-xl border px-4 py-3 text-sm ${message.ok ? "border-success/30 bg-success/10 text-success" : "border-danger/30 bg-danger/10 text-danger"}`}>
          {message.text}
        </div>
      )}

      {loading ? (
        <p className="text-sm text-muted">Loading…</p>
      ) : shown.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line bg-surface p-10 text-center space-y-3">
          <MessageSquare className="w-8 h-8 mx-auto text-muted" />
          <p className="font-semibold text-heading">{items.length === 0 ? "No comments yet" : "No comments match your search"}</p>
        </div>
      ) : (
        <ul className="grid gap-3">
          {shown.map((c) => (
            <li key={c.id} className={`rounded-2xl border border-line bg-surface p-4 sm:p-5 flex flex-col sm:flex-row gap-4 ${c.status === "hidden" ? "opacity-70" : ""}`}>
              <div className="flex-1 min-w-0 space-y-1.5">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className={`px-2 py-0.5 rounded-full font-semibold ${c.status === "visible" ? "bg-success/15 text-success" : "bg-warning/15 text-warning"}`}>
                    {c.status === "visible" ? "Visible" : "Hidden"}
                  </span>
                  <span className="text-muted">{new Date(c.createdAt).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}</span>
                  <span className="text-muted">on</span>
                  <a href={`/blog/${c.postSlug}#comments`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">
                    {c.postTitle} <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-sm">
                  <span className="font-semibold text-heading">{c.name}</span>{" "}
                  <a href={`mailto:${c.email}`} className="text-muted hover:text-heading">{c.email}</a>
                </p>
                <p className="text-sm text-ink whitespace-pre-line break-words">{c.message}</p>
              </div>
              <div className="flex sm:flex-col items-start gap-2 shrink-0">
                {c.status === "visible" ? (
                  <button type="button" onClick={() => setStatus(c, "hidden")} className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-xs font-semibold text-heading hover:bg-band">
                    <EyeOff className="w-3.5 h-3.5" /> Hide
                  </button>
                ) : (
                  <button type="button" onClick={() => setStatus(c, "visible")} className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-xs font-semibold text-heading hover:bg-band">
                    <Eye className="w-3.5 h-3.5" /> Show
                  </button>
                )}
                <button type="button" onClick={() => remove(c)} className="inline-flex items-center gap-1.5 rounded-lg border border-danger/30 px-3 py-2 text-xs font-semibold text-danger hover:bg-danger/10">
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
