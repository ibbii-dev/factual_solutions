"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { IBlogPost } from "@/models";
import { DEFAULT_BLOG_COVER, categoryLabel } from "@/data/blogCategories";
import { useLanguage } from "@/context/LanguageContext";
import SectionHeading from "@/components/ui/SectionHeading";

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
    <section aria-labelledby="insights-heading" className="py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="insights-heading"
          label={isAr ? "المدونة" : "Insights"}
          title={isAr ? "رؤى من" : "Insights from"}
          highlight={isAr ? "واقع الممارسة" : "practice"}
          lede={
            <div className="space-y-4">
              <p>
                {isAr
                  ? "رؤى عملية وأدوات ووجهات نظر واقعية حول التميز التشغيلي والاستراتيجية ولين ستة سيجما والجودة وERP والتحول الرقمي والتحسين المستمر."
                  : "Practical insights, tools, and real-world perspectives on operational excellence, strategy, Lean Six Sigma, quality, ERP, digital transformation, and continuous improvement."}
              </p>
              <Link href="/blog" className="link-arrow text-[15px] text-navy dark:text-steel-light">
                {isAr ? "كل المقالات" : "All articles"}
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
            </div>
          }
          className="mb-12"
        />

        {loading && <div className="h-72 fs-card animate-pulse" aria-busy="true" />}

        {!loading && cards.length === 0 && (
          <div className="fs-card p-8 text-center text-slate-600 dark:text-slate-300">
            {isAr
              ? "مقالاتنا الأولى قيد الإعداد. اشترك في النشرة أسفل الصفحة لتصلك عند نشرها."
              : "Our first articles are being prepared. Subscribe at the bottom of the page and we'll let you know when they go live."}
          </div>
        )}

        {!loading && cards.length > 0 && (
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            {cards.map((post, i) => (
              <li key={post.id} data-reveal style={{ "--d": `${i * 110}ms` } as React.CSSProperties}>
                <Link href={`/blog/${post.slug}`} className="group fs-card fs-card-hover h-full flex flex-col overflow-hidden">
                  <div className="relative aspect-[16/10] overflow-hidden bg-paper-deep dark:bg-night-700">
                    <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
                      <PostImage src={post.coverImage} sizes="(max-width: 768px) 100vw, 400px" className="object-cover" />
                    </div>
                    <span className="absolute top-3 start-3 rounded-full bg-white/95 dark:bg-night-900/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-navy dark:text-steel-light">
                      {categoryLabel(post.category, language)}
                    </span>
                  </div>
                  <div className="flex flex-col gap-3 p-5 sm:p-6 flex-1">
                    <h3 className="text-lg font-bold leading-snug text-ink dark:text-white transition-colors group-hover:text-navy dark:group-hover:text-steel-light">{post.title}</h3>
                    {post.excerpt && <p className="text-[14px] text-slate-600 dark:text-slate-300 line-clamp-2">{post.excerpt}</p>}
                    <p className="mt-auto pt-2 text-[13px] text-slate-500 dark:text-slate-400">
                      <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, language)}</time> · {post.readTime}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
