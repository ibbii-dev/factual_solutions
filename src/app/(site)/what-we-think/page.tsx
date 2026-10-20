import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { dbGetBlogPosts } from "@/lib/mongodb";
import { principles } from "@/data/aboutContent";
import PageHero, { SectionLabel } from "@/components/layout/PageHero";

export const metadata: Metadata = pageMetadata({
  title: "What We Think",
  description:
    "The five principles behind every Factual Solutions engagement: fix the process first, decide with data, people make change stick, fit the method to the problem, and leave clients stronger.",
  path: "/what-we-think",
});

export const revalidate = 600;

// Copy from the previous site's "What We Think" page.
export default async function WhatWeThinkPage() {
  const posts = (await dbGetBlogPosts({ status: "published" })).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "What we think", path: "/what-we-think" }])) }}
      />
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "What we think", href: "/what-we-think" }]}
        eyebrow="What we think"
        title="Improvement that lasts starts with how you think."
        lede="Tools are easy to buy. Lasting results come from the thinking behind them. Here are the principles that guide how we approach every engagement."
      />

      <section id="principles" className="scroll-mt-24 py-20 sm:py-28">
        <ol className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 lg:grid-cols-6 gap-5">
          {principles.map((p, i) => (
            <li
              key={p.title}
              data-reveal
              style={{ "--d": `${(i % 3) * 100}ms` } as React.CSSProperties}
              className={`fs-lift rounded-[1.75rem] p-7 sm:p-8 flex flex-col gap-4 ${
                i < 2 ? "lg:col-span-3" : "lg:col-span-2"
              } ${i === 0 ? "fs-deep" : i === 1 ? "bg-band" : "border border-line bg-bg"}`}
            >
              {i === 0 && <div aria-hidden="true" className="fs-glow fs-glow-navy w-96 h-96 -right-32 -top-40" />}
              <span aria-hidden="true" className={`font-display text-5xl leading-none ${i === 0 ? "text-on-deep/40" : "text-primary/40"}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className={`text-h3 ${i === 0 ? "text-on-deep" : "text-heading"}`}>{p.title}</h2>
              <p className={i === 0 ? "text-on-deep-muted" : "text-muted"}>{p.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
          <div data-reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex flex-col gap-3 max-w-2xl">
              <SectionLabel>Want to go deeper?</SectionLabel>
              <h2 className="text-h1 text-heading">Ideas from practice, on the blog.</h2>
              <p className="text-muted">
                Practical insights, frameworks and ideas on process improvement, operational excellence, technology and sustainable
                organizational change.
              </p>
            </div>
            <Link href="/blog" className="btn-secondary shrink-0">Read the blog</Link>
          </div>
          {posts.length > 0 && (
            <ul className="grid md:grid-cols-3 gap-5">
              {posts.map((post) => (
                <li key={post.id} data-reveal>
                  <Link href={`/blog/${post.slug}`} className="fs-lift h-full flex flex-col gap-2.5 rounded-[1.5rem] border border-line bg-bg p-6">
                    <span className="text-label uppercase text-accent">{post.category}</span>
                    <span className="text-h3 text-heading">{post.title}</span>
                    <span className="text-small text-muted mt-auto">{post.readTime}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
