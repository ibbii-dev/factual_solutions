"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { IBlogPost } from "@/models";
import { DEFAULT_BLOG_COVER, categoryLabel } from "@/data/blogCategories";
import { useLanguage } from "@/context/LanguageContext";

/** Local images go through next/image (resized + WebP/AVIF); external URLs fall back to a lazy <img>. */
function PostImage({ src, sizes, className = "" }: { src?: string; sizes: string; className?: string }) {
  const url = src || DEFAULT_BLOG_COVER;
  if (url.startsWith("/")) return <Image src={url} alt="" fill sizes={sizes} className={className} />;
  return <img src={url} alt="" loading="lazy" decoding="async" className={`absolute inset-0 w-full h-full ${className}`} />;
}

function formatDate(value: string, lang: string) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString(lang === "ar" ? "ar" : "en-GB", { day: "numeric", month: "short", year: "numeric" });
}

/** Homepage blog teaser: one lead article and a short ruled list, like a journal's contents page. */
export default function LatestInsightsSection() {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const [posts, setPosts] = useState<IBlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    fetch("/api/blog?status=published")
      .then((r) => r.json())
      .then((json) => alive && json?.success && Array.isArray(json.data) && setPosts(json.data))
      .catch(() => {})
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  const sorted = useMemo(() => [...posts].sort((a, b) => (b.publishedAt || "").localeCompare(a.publishedAt || "")), [posts]);
  const featured = sorted.find((p) => p.featured) || sorted[0];
  const recent = sorted.filter((p) => p.id !== featured?.id).slice(0, 4);

  return (
    <section aria-labelledby="insights-heading" className="py-16 sm:py-24 border-t border-ink/10 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6">
        <div className="lg:col-span-3">
          <p className="eyebrow">{isAr ? "المدونة" : "Insights"}</p>
        </div>

        <div className="lg:col-span-9 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div data-reveal className="space-y-4 max-w-2xl">
              <h2 id="insights-heading" className="text-3xl sm:text-[2.6rem] font-bold font-display leading-[1.1] text-ink dark:text-white">
                {isAr ? "رؤى من واقع الممارسة" : "Insights from practice"}
              </h2>
              <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                {isAr
                  ? "رؤى عملية وأدوات ووجهات نظر واقعية حول التميز التشغيلي والاستراتيجية ولين ستة سيجما والجودة وERP والتحول الرقمي والتحسين المستمر."
                  : "Practical insights, tools, and real-world perspectives on operational excellence, strategy, Lean Six Sigma, quality, ERP, digital transformation, and continuous improvement."}
              </p>
            </div>
            <Link href="/blog" className="link-arrow text-sm text-ink dark:text-white shrink-0">
              {isAr ? "كل المقالات" : "All articles"}
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>

          {loading && <div className="h-40 border-t border-ink/15 dark:border-white/15" aria-busy="true" />}

          {!loading && !featured && (
            <p className="border-t border-ink/15 dark:border-white/15 pt-6 text-slate-600 dark:text-slate-400">
              {isAr
                ? "مقالاتنا الأولى قيد الإعداد. اشترك في النشرة أسفل الصفحة لتصلك عند نشرها."
                : "Our first articles are being prepared. Subscribe at the bottom of the page and we'll let you know when they go live."}
            </p>
          )}

          {!loading && featured && (
            <div className="fs-rule border-t border-ink/15 dark:border-white/15">
              <article data-reveal className="group grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 py-8">
                <Link href={`/blog/${featured.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-paper-deep" tabIndex={-1} aria-hidden="true">
                  <PostImage src={featured.coverImage} sizes="(max-width: 768px) 100vw, 440px" className="object-cover" />
                </Link>
                <div className="flex flex-col gap-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-accent font-semibold">{categoryLabel(featured.category, language)}</p>
                  <h3 className="text-2xl sm:text-3xl font-bold font-display leading-tight text-ink dark:text-white">
                    <Link href={`/blog/${featured.slug}`} className="hover:underline underline-offset-4 decoration-1">
                      {featured.title}
                    </Link>
                  </h3>
                  {featured.excerpt && <p className="text-slate-700 dark:text-slate-300 leading-relaxed line-clamp-4">{featured.excerpt}</p>}
                  <p className="mt-auto text-sm text-slate-500 dark:text-slate-400">
                    {featured.author.name} · <time dateTime={featured.publishedAt}>{formatDate(featured.publishedAt, language)}</time> · {featured.readTime}
                  </p>
                </div>
              </article>

              {recent.length > 0 && (
                <ul className="border-t border-ink/15 dark:border-white/15">
                  {recent.map((post) => (
                    <li key={post.id} className="border-b border-ink/10 dark:border-white/10">
                      <Link href={`/blog/${post.slug}`} className="group grid grid-cols-12 gap-4 py-5 items-baseline">
                        <time dateTime={post.publishedAt} className="col-span-12 sm:col-span-3 text-sm text-slate-500 dark:text-slate-400">
                          {formatDate(post.publishedAt, language)}
                        </time>
                        <span className="col-span-12 sm:col-span-6 text-lg font-display font-bold text-ink dark:text-white group-hover:underline underline-offset-4 decoration-1">
                          {post.title}
                        </span>
                        <span className="col-span-12 sm:col-span-3 text-sm text-slate-500 dark:text-slate-400 sm:text-end">
                          {categoryLabel(post.category, language)}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
