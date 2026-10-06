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

  const cards = featured ? [featured, ...recent].slice(0, 3) : [];

  return (
    <section aria-labelledby="insights-heading" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-reveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 sm:mb-14">
          <div className="space-y-4 max-w-3xl">
            <p className="fs-label">{isAr ? "المدونة" : "Insights"}</p>
            <h2 id="insights-heading" className="text-[2rem] sm:text-[2.75rem] font-semibold font-display leading-[1.1] text-navy dark:text-white">
              {isAr ? "رؤى من واقع الممارسة" : "Insights from practice"}
            </h2>
            <p className="text-slate-500 dark:text-slate-300 leading-relaxed">
              {isAr
                ? "رؤى عملية وأدوات ووجهات نظر واقعية حول التميز التشغيلي والاستراتيجية ولين ستة سيجما والجودة وERP والتحول الرقمي والتحسين المستمر."
                : "Practical insights, tools, and real-world perspectives on operational excellence, strategy, Lean Six Sigma, quality, ERP, digital transformation, and continuous improvement."}
            </p>
          </div>
          <Link href="/blog" className="link-arrow text-[15px] text-navy dark:text-white shrink-0">
            {isAr ? "كل المقالات" : "All articles"}
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        </div>

        {loading && <div className="h-64 bg-paper-deep dark:bg-night-800" aria-busy="true" />}

        {!loading && cards.length === 0 && (
          <p className="border-t border-paper-line dark:border-white/15 pt-6 text-slate-500 dark:text-slate-400">
            {isAr
              ? "مقالاتنا الأولى قيد الإعداد. اشترك في النشرة أسفل الصفحة لتصلك عند نشرها."
              : "Our first articles are being prepared. Subscribe at the bottom of the page and we'll let you know when they go live."}
          </p>
        )}

        {!loading && cards.length > 0 && (
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {cards.map((post, i) => (
              <li key={post.id} data-reveal style={{ "--d": `${i * 110}ms` } as React.CSSProperties}>
                <Link href={`/blog/${post.slug}`} className="fs-post group flex flex-col gap-4">
                  <div className="relative aspect-[16/10] overflow-hidden bg-paper-deep dark:bg-night-800">
                    <div className="fs-post-img absolute inset-0">
                      <PostImage src={post.coverImage} sizes="(max-width: 768px) 100vw, 400px" className="object-cover" />
                    </div>
                    <span aria-hidden="true" className="absolute start-0 bottom-0 h-1.5 w-1/3 transition-[width] duration-700 ease-out group-hover:w-full" style={{ background: ["#25346B", "#9BB3D9", "#9B391E"][i % 3] }} />
                  </div>
                  <p className="text-xs uppercase tracking-[0.14em] text-accent font-semibold">{categoryLabel(post.category, language)}</p>
                  <h3 className="text-xl sm:text-[1.4rem] font-semibold font-display leading-snug text-ink dark:text-white transition-colors group-hover:text-rust dark:group-hover:text-rust-light">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, language)}</time> · {post.readTime}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
