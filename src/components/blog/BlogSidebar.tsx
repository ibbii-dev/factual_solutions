import React from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import type { IBlogPost } from "@/models";
import NewsletterSignup from "./NewsletterSignup";

const heading = "text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400 mb-3";

/**
 * Article sidebar: search, categories, recent posts and newsletter sign-up
 * (the standard blog widgets). Search and categories open the blog list filtered.
 */
export default function BlogSidebar({ posts, currentId }: { posts: IBlogPost[]; currentId?: string }) {
  const counts = new Map<string, number>();
  posts.forEach((p) => counts.set(p.category, (counts.get(p.category) ?? 0) + 1));
  const categories = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  const recent = posts.filter((p) => p.id !== currentId).slice(0, 4);

  return (
    <aside aria-label="Blog sidebar" className="space-y-5">
      <form action="/blog" method="get" role="search" className="fs-card p-5">
        <label htmlFor="sidebar-search" className={heading + " block"}>Search the blog</label>
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
          <input id="sidebar-search" name="q" type="search" placeholder="Lean, ERP, KPIs…" className="fs-input !py-2.5 !ps-10" />
        </div>
      </form>

      {categories.length > 0 && (
        <nav aria-labelledby="sidebar-categories" className="fs-card p-5">
          <h2 id="sidebar-categories" className={heading}>Categories</h2>
          <ul className="space-y-1">
            {categories.map(([cat, n]) => (
              <li key={cat}>
                <Link
                  href={`/blog?category=${encodeURIComponent(cat)}`}
                  className="flex items-center justify-between gap-3 rounded-lg px-2.5 py-2 text-[14px] font-medium text-ink dark:text-slate-200 hover:bg-paper-deep dark:hover:bg-white/5 hover:text-navy dark:hover:text-white transition-colors"
                >
                  <span>{cat}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{n}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {recent.length > 0 && (
        <nav aria-labelledby="sidebar-recent" className="fs-card p-5">
          <h2 id="sidebar-recent" className={heading}>Recent articles</h2>
          <ul className="space-y-3">
            {recent.map((p) => (
              <li key={p.id}>
                <Link href={`/blog/${p.slug}`} className="group block">
                  <span className="block text-[14px] font-semibold leading-snug text-ink dark:text-white group-hover:text-navy dark:group-hover:text-steel-light transition-colors">{p.title}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{p.readTime}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <div className="fs-card p-5">
        <h2 className={heading}>Get new articles by email</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">Practical ideas on operational excellence, Lean Six Sigma and ERP. No spam.</p>
        <NewsletterSignup />
      </div>
    </aside>
  );
}
