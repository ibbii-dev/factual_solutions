import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BarChart3, BookOpen, Compass, Repeat, Users, Workflow } from "lucide-react";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { dbGetBlogPosts } from "@/lib/mongodb";
import { content } from "@/data/thinkingContent";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = pageMetadata({
  title: "What We Think",
  description:
    "The five principles behind every Factual Solutions engagement: fix the process first, decide with data, people make change stick, fit the method to the problem, and leave clients stronger.",
  path: "/what-we-think",
});

export const revalidate = 600;

const ICONS = [Workflow, BarChart3, Users, Compass, Repeat];
const TILES = ["bg-navy", "bg-steel text-navy", "bg-rust", "bg-navy", "bg-steel text-navy"];

// "What we think": the classic principle cards and navy "go deeper" panel.
export default async function WhatWeThinkPage() {
  const c = content.en;
  const posts = (await dbGetBlogPosts({ status: "published" })).slice(0, 3);

  return (
    <div className="pb-20 sm:pb-24 text-ink dark:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "What we think", path: "/what-we-think" }])) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow={c.badge}
          title={c.headline}
          lede={
            <>
              <p className="font-semibold text-ink dark:text-white">{c.lead}</p>
              <p className="mt-3">{c.sub}</p>
            </>
          }
        />

        {/* Principles */}
        <ol id="principles" className="scroll-mt-28 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 mb-16">
          {c.principles.map((p, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <li
                key={p.title}
                data-reveal
                style={{ "--d": `${(i % 3) * 90}ms` } as React.CSSProperties}
                className={`fs-card fs-card-hover p-7 flex flex-col gap-4 ${i < 3 ? "lg:col-span-2" : "lg:col-span-3"}`}
              >
                <div className="flex items-center justify-between">
                  <span className={`fs-icon ${TILES[i % TILES.length]}`}><Icon className="w-5 h-5" aria-hidden="true" /></span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-rust dark:text-rust-light">
                    Principle {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h2 className="text-xl sm:text-[1.35rem] font-bold leading-snug text-ink dark:text-white">{p.title}</h2>
                <p className="text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed">{p.desc}</p>
              </li>
            );
          })}
        </ol>

        {/* Go deeper */}
        <section data-reveal aria-labelledby="deeper" className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0E1A38] via-[#1A2756] to-[#25346B] text-white p-8 sm:p-12 shadow-lift">
          <div aria-hidden="true" className="absolute top-0 inset-x-0 h-1 bg-brand-tri" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-5">
              <h2 id="deeper" className="text-3xl sm:text-[2.4rem] font-extrabold leading-[1.1]">{c.deeperTitle}</h2>
              <p className="lede text-slate-200">{c.deeperText}</p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link href="/blog" className="btn-primary">
                  {c.blogCta}
                  <ArrowRight className="fs-arrow w-4 h-4 rtl:rotate-180" aria-hidden="true" />
                </Link>
                <Link href="/services" className="btn-secondary !bg-white/5 !border-white/20 !text-white !shadow-none hover:!border-white/40">
                  {c.servicesCta}
                </Link>
              </div>
            </div>
            <div className="hidden lg:flex lg:col-span-4 justify-center">
              <span className="w-28 h-28 rounded-3xl bg-white/10 border border-white/15 flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-steel" aria-hidden="true" />
              </span>
            </div>
          </div>
        </section>

        {/* Latest articles */}
        {posts.length > 0 && (
          <section aria-labelledby="latest" className="mt-16">
            <div className="flex items-end justify-between gap-4 mb-6">
              <h2 id="latest" className="text-2xl sm:text-3xl font-extrabold tracking-[-0.02em] text-ink dark:text-white">Latest from the blog</h2>
              <Link href="/blog" className="link-arrow text-[14px] text-navy dark:text-steel-light shrink-0">All articles</Link>
            </div>
            <ul className="grid md:grid-cols-3 gap-5">
              {posts.map((post, i) => (
                <li key={post.id} data-reveal style={{ "--d": `${i * 90}ms` } as React.CSSProperties}>
                  <Link href={`/blog/${post.slug}`} className="group fs-card fs-card-hover h-full flex flex-col gap-3 p-6">
                    <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-rust dark:text-rust-light">{post.category}</span>
                    <span className="text-lg font-bold leading-snug text-ink dark:text-white group-hover:text-navy dark:group-hover:text-steel-light transition-colors">{post.title}</span>
                    <span className="text-sm text-slate-500 dark:text-slate-400 mt-auto">{post.readTime}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
