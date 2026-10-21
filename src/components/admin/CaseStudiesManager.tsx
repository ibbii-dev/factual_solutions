"use client";

import React, { useCallback, useEffect, useState } from "react";
import { ArrowLeft, Briefcase, ExternalLink, Pencil, Plus, Trash2 } from "lucide-react";
import type { ICaseStudy } from "@/models";
import { caseStudyIndustries } from "@/data/caseStudies";

type Form = {
  title: string;
  slug: string;
  client: string;
  industry: string;
  serviceLine: ICaseStudy["serviceLine"];
  summary: string;
  challenge: string;
  approach: string;
  results: string;
  metrics: { value: string; label: string }[];
  quote: string;
  quoteName: string;
  quoteRole: string;
  coverImage: string;
  coverImageAlt: string;
  duration: string;
  status: ICaseStudy["status"];
};

const EMPTY: Form = {
  title: "",
  slug: "",
  client: "",
  industry: caseStudyIndustries[0],
  serviceLine: "consulting",
  summary: "",
  challenge: "",
  approach: "",
  results: "",
  metrics: [
    { value: "", label: "" },
    { value: "", label: "" },
    { value: "", label: "" },
  ],
  quote: "",
  quoteName: "",
  quoteRole: "",
  coverImage: "",
  coverImageAlt: "",
  duration: "",
  status: "published",
};

const LINE_LABEL: Record<ICaseStudy["serviceLine"], string> = { consulting: "Consulting", training: "Training", digital: "ERP & Digital" };

const fromStudy = (c: ICaseStudy): Form => ({
  title: c.title,
  slug: c.slug,
  client: c.client,
  industry: c.industry,
  serviceLine: c.serviceLine,
  summary: c.summary,
  challenge: c.challenge,
  approach: c.approach,
  results: c.results.join("\n"),
  metrics: [0, 1, 2].map((i) => c.metrics[i] ?? { value: "", label: "" }),
  quote: c.testimonial?.quote ?? "",
  quoteName: c.testimonial?.name ?? "",
  quoteRole: c.testimonial?.role ?? "",
  coverImage: c.coverImage ?? "",
  coverImageAlt: c.coverImageAlt ?? "",
  duration: c.duration ?? "",
  status: c.status,
});

const input = "w-full rounded-xl border border-line bg-bg px-3.5 py-2.5 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/40";
const labelCls = "block text-xs font-semibold text-heading mb-1.5";

/** Admin "Case studies" tab: list, add, edit, publish/unpublish and delete client stories. */
export default function CaseStudiesManager({ onCount }: { onCount?: (n: number) => void }) {
  const [items, setItems] = useState<ICaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null); // "new" or an id
  const [form, setForm] = useState<Form>(EMPTY);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/case-studies?all=true", { cache: "no-store" });
      const data = await res.json();
      if (data.success) {
        setItems(data.data);
        onCount?.(data.data.length);
      }
    } catch {
      setMessage({ ok: false, text: "Could not load case studies." });
    } finally {
      setLoading(false);
    }
  }, [onCount]);

  useEffect(() => {
    load();
  }, [load]);

  const set = <K extends keyof Form>(key: K, value: Form[K]) => setForm((f) => ({ ...f, [key]: value }));

  const startNew = () => {
    setForm(EMPTY);
    setEditingId("new");
    setMessage(null);
  };

  const startEdit = (c: ICaseStudy) => {
    setForm(fromStudy(c));
    setEditingId(c.id);
    setMessage(null);
  };

  const save = async (status: ICaseStudy["status"]) => {
    setBusy(true);
    setMessage(null);
    const payload = {
      title: form.title,
      slug: form.slug,
      client: form.client,
      industry: form.industry,
      serviceLine: form.serviceLine,
      summary: form.summary,
      challenge: form.challenge,
      approach: form.approach,
      results: form.results.split("\n"),
      metrics: form.metrics,
      testimonial: { quote: form.quote, name: form.quoteName, role: form.quoteRole },
      coverImage: form.coverImage,
      coverImageAlt: form.coverImageAlt,
      duration: form.duration,
      status,
    };
    try {
      const isNew = editingId === "new";
      const res = await fetch(isNew ? "/api/case-studies" : `/api/case-studies/${editingId}`, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        setMessage({ ok: false, text: data.message || "Could not save. Please try again." });
        return;
      }
      setMessage({ ok: true, text: data.message });
      setEditingId(null);
      await load();
    } catch {
      setMessage({ ok: false, text: "Connection problem. Please try again." });
    } finally {
      setBusy(false);
    }
  };

  const remove = async (c: ICaseStudy) => {
    if (!window.confirm(`Delete "${c.title}"? This cannot be undone.`)) return;
    const res = await fetch(`/api/case-studies/${c.id}`, { method: "DELETE" });
    const data = await res.json().catch(() => ({}));
    setMessage({ ok: res.ok, text: data.message || (res.ok ? "Deleted." : "Could not delete.") });
    await load();
  };

  const notice = message && (
    <div role="status" className={`rounded-xl border px-4 py-3 text-sm ${message.ok ? "border-success/30 bg-success/10 text-success" : "border-danger/30 bg-danger/10 text-danger"}`}>
      {message.text}
    </div>
  );

  /* ---------------- Editor ---------------- */
  if (editingId) {
    return (
      <div className="space-y-6">
        <button type="button" onClick={() => setEditingId(null)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-heading">
          <ArrowLeft className="w-4 h-4" /> Back to case studies
        </button>
        <h2 className="text-xl font-bold text-heading">{editingId === "new" ? "New case study" : "Edit case study"}</h2>
        {notice}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5 rounded-2xl border border-line bg-surface p-5 sm:p-6">
            <div>
              <label className={labelCls} htmlFor="cs-title">Title *</label>
              <input id="cs-title" className={input} value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Cutting lead time by a third at a textile mill" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls} htmlFor="cs-client">Client *</label>
                <input id="cs-client" className={input} value={form.client} onChange={(e) => set("client", e.target.value)} placeholder="Client name, or e.g. A textile exporter in Faisalabad" />
              </div>
              <div>
                <label className={labelCls} htmlFor="cs-duration">Engagement length</label>
                <input id="cs-duration" className={input} value={form.duration} onChange={(e) => set("duration", e.target.value)} placeholder="e.g. 12 weeks" />
              </div>
              <div>
                <label className={labelCls} htmlFor="cs-industry">Industry *</label>
                <select id="cs-industry" className={input} value={form.industry} onChange={(e) => set("industry", e.target.value)}>
                  {caseStudyIndustries.map((i) => <option key={i}>{i}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls} htmlFor="cs-line">Service line *</label>
                <select id="cs-line" className={input} value={form.serviceLine} onChange={(e) => set("serviceLine", e.target.value as Form["serviceLine"])}>
                  {(Object.keys(LINE_LABEL) as Form["serviceLine"][]).map((l) => <option key={l} value={l}>{LINE_LABEL[l]}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className={labelCls} htmlFor="cs-summary">Summary * <span className="font-normal text-muted">(one or two sentences for the card)</span></label>
              <textarea id="cs-summary" rows={2} className={input} value={form.summary} onChange={(e) => set("summary", e.target.value)} />
            </div>
            <div>
              <label className={labelCls} htmlFor="cs-challenge">The challenge *</label>
              <textarea id="cs-challenge" rows={5} className={input} value={form.challenge} onChange={(e) => set("challenge", e.target.value)} placeholder="What was the problem, and why did it matter?" />
            </div>
            <div>
              <label className={labelCls} htmlFor="cs-approach">Our approach *</label>
              <textarea id="cs-approach" rows={5} className={input} value={form.approach} onChange={(e) => set("approach", e.target.value)} placeholder="What did we do, step by step?" />
            </div>
            <div>
              <label className={labelCls} htmlFor="cs-results">Results * <span className="font-normal text-muted">(one per line; only results the client agreed to share)</span></label>
              <textarea id="cs-results" rows={4} className={input} value={form.results} onChange={(e) => set("results", e.target.value)} placeholder={"Lead time down from 21 to 14 days\nScrap rate halved within three months"} />
            </div>
            <fieldset>
              <legend className={labelCls}>Headline numbers <span className="font-normal text-muted">(optional, up to three)</span></legend>
              <div className="space-y-2">
                {form.metrics.map((m, i) => (
                  <div key={i} className="grid grid-cols-3 gap-2">
                    <input aria-label={`Number ${i + 1}`} className={input} value={m.value} placeholder="e.g. 32%" onChange={(e) => set("metrics", form.metrics.map((x, j) => (j === i ? { ...x, value: e.target.value } : x)))} />
                    <input aria-label={`Number ${i + 1} label`} className={`${input} col-span-2`} value={m.label} placeholder="e.g. shorter lead time" onChange={(e) => set("metrics", form.metrics.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)))} />
                  </div>
                ))}
              </div>
            </fieldset>
            <fieldset className="space-y-2">
              <legend className={labelCls}>Client quote <span className="font-normal text-muted">(optional)</span></legend>
              <textarea aria-label="Quote" rows={3} className={input} value={form.quote} onChange={(e) => set("quote", e.target.value)} placeholder="What the client said about the work" />
              <div className="grid sm:grid-cols-2 gap-2">
                <input aria-label="Quote name" className={input} value={form.quoteName} onChange={(e) => set("quoteName", e.target.value)} placeholder="Name" />
                <input aria-label="Quote role" className={input} value={form.quoteRole} onChange={(e) => set("quoteRole", e.target.value)} placeholder="Role, company" />
              </div>
            </fieldset>
          </div>

          <aside className="space-y-5">
            <div className="rounded-2xl border border-line bg-surface p-5 space-y-3">
              <p className="text-xs font-semibold text-heading">Publish</p>
              <button type="button" disabled={busy} onClick={() => save("published")} className="w-full rounded-xl bg-action hover:bg-action-hover text-on-action text-sm font-semibold py-2.5 disabled:opacity-60">
                {busy ? "Saving…" : form.status === "published" && editingId !== "new" ? "Update" : "Publish"}
              </button>
              <button type="button" disabled={busy} onClick={() => save("draft")} className="w-full rounded-xl border border-line text-heading hover:bg-band text-sm font-semibold py-2.5 disabled:opacity-60">
                {editingId !== "new" && form.status === "published" ? "Unpublish (save as draft)" : "Save as draft"}
              </button>
              <p className="text-xs text-muted">Drafts are only visible here.</p>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-5 space-y-3">
              <div>
                <label className={labelCls} htmlFor="cs-image">Cover image URL</label>
                <input id="cs-image" className={input} value={form.coverImage} onChange={(e) => set("coverImage", e.target.value)} placeholder="https://… or /images/…" />
              </div>
              {form.coverImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={form.coverImage} alt="" className="w-full aspect-[16/9] object-cover rounded-xl border border-line" />
              )}
              <div>
                <label className={labelCls} htmlFor="cs-alt">Image description (alt text)</label>
                <input id="cs-alt" className={input} value={form.coverImageAlt} onChange={(e) => set("coverImageAlt", e.target.value)} />
              </div>
              <div>
                <label className={labelCls} htmlFor="cs-slug">Web address</label>
                <input id="cs-slug" className={input} value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="made from the title if empty" />
                <p className="mt-1 text-xs text-muted">/case-studies/{form.slug || "…"}</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    );
  }

  /* ---------------- List ---------------- */
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-heading">Case studies</h2>
          <p className="text-sm text-muted">Client stories shown on the Case studies page. Only share results the client has agreed to.</p>
        </div>
        <button type="button" onClick={startNew} className="inline-flex items-center gap-2 rounded-xl bg-action hover:bg-action-hover text-on-action text-sm font-semibold px-4 py-2.5">
          <Plus className="w-4 h-4" /> New case study
        </button>
      </div>
      {notice}

      {loading ? (
        <p className="text-sm text-muted">Loading…</p>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line bg-surface p-10 text-center space-y-3">
          <Briefcase className="w-8 h-8 mx-auto text-muted" />
          <p className="font-semibold text-heading">No case studies yet</p>
          <p className="text-sm text-muted">The public page shows &ldquo;coming soon&rdquo; until you publish the first one.</p>
        </div>
      ) : (
        <ul className="grid gap-3">
          {items.map((c) => (
            <li key={c.id} className="rounded-2xl border border-line bg-surface p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className={`px-2 py-0.5 rounded-full font-semibold ${c.status === "published" ? "bg-success/15 text-success" : "bg-warning/15 text-warning"}`}>
                    {c.status === "published" ? "Published" : "Draft"}
                  </span>
                  <span className="text-muted">{LINE_LABEL[c.serviceLine]} · {c.industry} · {c.publishedAt}</span>
                </div>
                <p className="font-semibold text-heading truncate">{c.title}</p>
                <p className="text-sm text-muted truncate">{c.client}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {c.status === "published" && (
                  <a href={`/case-studies/${c.slug}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-xs font-semibold text-heading hover:bg-band">
                    <ExternalLink className="w-3.5 h-3.5" /> View
                  </a>
                )}
                <button type="button" onClick={() => startEdit(c)} className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-xs font-semibold text-heading hover:bg-band">
                  <Pencil className="w-3.5 h-3.5" /> Edit
                </button>
                <button type="button" onClick={() => remove(c)} aria-label={`Delete ${c.title}`} className="inline-flex items-center gap-1.5 rounded-lg border border-danger/30 px-3 py-2 text-xs font-semibold text-danger hover:bg-danger/10">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
