"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { IBlogPost } from "@/models";
import { BLOG_CATEGORIES, categoryLabel } from "@/data/blogCategories";
import { useLanguage } from "@/context/LanguageContext";
import PageHeader from "@/components/ui/PageHeader";
const BLOG_COPY = {
  en: {
    badge: "Blog",
    title: "Insights from Practice",
    lead: "Practical insights, tools, and real-world perspectives on operational excellence, strategy, Lean Six Sigma, quality, ERP, digital transformation, and continuous improvement.",
    search: "Search articles by title, topic or keyword...",
    searchLabel: "Search articles",
    clear: "Clear",
    loading: "Loading articles...",
    noneTitle: "No articles found",
    soonTitle: "Articles coming soon",
    noneText: "No published articles match this search or category.",
    soonText: "New articles are on the way. Check back soon.",
    clearFilters: "Clear Filters",
    featured: "Featured Analysis",
    read: "Read Article",
    readFull: "Read Full Article",
  },
  ar: {
    badge: "المدونة",
    title: "رؤى من واقع الممارسة",
    lead: "رؤى عملية وأدوات ووجهات نظر واقعية حول التميز التشغيلي والاستراتيجية ولين ستة سيجما والجودة وERP والتحول الرقمي والتحسين المستمر.",
    search: "ابحث في المقالات بالعنوان أو الموضوع أو الكلمة المفتاحية...",
    searchLabel: "البحث في المقالات",
    clear: "مسح",
    loading: "جارٍ تحميل المقالات...",
    noneTitle: "لا توجد مقالات",
    soonTitle: "المقالات قادمة قريباً",
    noneText: "لا توجد مقالات منشورة تطابق هذا البحث أو التصنيف.",
    soonText: "مقالات جديدة في الطريق. عُد قريباً.",
    clearFilters: "مسح عوامل التصفية",
    featured: "تحليل مميز",
    read: "اقرأ المقال",
    readFull: "اقرأ المقال كاملاً",
  },
};

function BlogContent() {
  const { language } = useLanguage();
  const L = BLOG_COPY[language === "ar" ? "ar" : "en"];
  const [posts, setPosts] = useState<IBlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "All");

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/blog?status=published");
        const json = await res.json();
        if (json.success && json.data) {
          setPosts(json.data);
        }
      } catch (err) {
        console.error("Failed to load blog posts:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.author.name.toLowerCase().includes(query) ||
      post.tags.some((t) => t.toLowerCase().includes(query));
    const matchesCategory =
      activeCategory === "All" || post.category.toLowerCase() === activeCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const featuredPost = filteredPosts.find((p) => p.featured) || filteredPosts[0];
  const gridPosts = featuredPost 
    ? filteredPosts.filter((p) => p.id !== featuredPost.id)
    : filteredPosts;

  const fmt = (v: string) => {
    const d = new Date(v);
    return Number.isNaN(d.getTime()) ? v : d.toLocaleDateString(language === "ar" ? "ar" : "en-GB", { day: "numeric", month: "short", year: "numeric" });
  };

  return (
    <div className="min-h-screen text-ink dark:text-white pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader eyebrow={L.badge} title={L.title} lede={L.lead} />

        {/* Search + categories */}
        <div className="fs-card p-3 sm:p-4 flex flex-col lg:flex-row lg:items-center gap-3 mb-10">
          <div className="relative w-full lg:w-80 shrink-0">
            <Search className="absolute start-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" aria-hidden="true" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={L.search}
              aria-label={L.searchLabel}
              className="fs-input !py-2.5 !ps-10 !pe-14"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute end-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500 hover:text-ink dark:hover:text-white">
                {L.clear}
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by category">
            {["All", ...BLOG_CATEGORIES].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                className={`min-h-[36px] px-3.5 rounded-lg text-[13px] font-semibold transition-colors ${
                  activeCategory === cat
                    ? "bg-navy text-white dark:bg-steel dark:text-ink"
                    : "text-slate-600 hover:bg-paper-deep hover:text-navy dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
                }`}
              >
                {categoryLabel(cat, language)}
              </button>
            ))}
          </div>
        </div>

        {isLoading && <div className="h-72 fs-card animate-pulse" aria-busy="true"><span className="sr-only">{L.loading}</span></div>}

        {!isLoading && filteredPosts.length === 0 && (
          <div className="fs-card p-10 max-w-xl mx-auto text-center space-y-3">
            <h2 className="text-2xl font-bold">{searchQuery || activeCategory !== "All" ? L.noneTitle : L.soonTitle}</h2>
            <p className="text-slate-600 dark:text-slate-400">{searchQuery || activeCategory !== "All" ? L.noneText : L.soonText}</p>
            {(searchQuery || activeCategory !== "All") && (
              <button onClick={() => { setSearchQuery(""); setActiveCategory("All"); }} className="btn-secondary mt-2">
                {L.clearFilters}
              </button>
            )}
          </div>
        )}

        {!isLoading && filteredPosts.length > 0 && (
          <div className="space-y-6">
            {featuredPost && (
              <article className="group fs-card fs-card-hover overflow-hidden grid grid-cols-1 lg:grid-cols-12">
                <Link href={`/blog/${featuredPost.slug}`} className="lg:col-span-7 relative block aspect-[16/10] lg:aspect-auto lg:min-h-[340px] overflow-hidden bg-paper-deep" tabIndex={-1} aria-hidden="true">
                  <Image sizes="(max-width: 1024px) 100vw, 720px" src={featuredPost.coverImage || "/images/consulting-meeting.webp"} alt="" fill priority className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                </Link>
                <div className="lg:col-span-5 flex flex-col gap-4 p-6 sm:p-8">
                  <p className="inline-flex self-start rounded-full bg-rust/10 dark:bg-rust/20 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-rust dark:text-rust-light">{L.featured} · {categoryLabel(featuredPost.category, language)}</p>
                  <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
                    <Link href={`/blog/${featuredPost.slug}`} className="hover:text-navy dark:hover:text-steel-light transition-colors">{featuredPost.title}</Link>
                  </h2>
                  {featuredPost.excerpt && <p className="text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed">{featuredPost.excerpt}</p>}
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {featuredPost.author.name} · <time dateTime={featuredPost.publishedAt}>{fmt(featuredPost.publishedAt)}</time> · {featuredPost.readTime}
                  </p>
                  <Link href={`/blog/${featuredPost.slug}`} className="btn-primary self-start mt-auto">
                    {L.read}
                    <ArrowRight className="fs-arrow w-4 h-4 rtl:rotate-180" />
                  </Link>
                </div>
              </article>
            )}

            {gridPosts.length > 0 && (
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                {gridPosts.map((post) => (
                  <li key={post.id}>
                    <Link href={`/blog/${post.slug}`} className="group fs-card fs-card-hover h-full flex flex-col overflow-hidden">
                      <div className="relative aspect-[16/10] overflow-hidden bg-paper-deep">
                        <Image sizes="(max-width: 640px) 100vw, 400px" src={post.coverImage || "/images/consulting-meeting.webp"} alt="" fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                        <span className="absolute top-3 start-3 rounded-full bg-white/95 dark:bg-night-900/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-navy dark:text-steel-light">{categoryLabel(post.category, language)}</span>
                      </div>
                      <div className="flex flex-col gap-3 p-5 sm:p-6 flex-1">
                        <h3 className="text-lg font-bold leading-snug transition-colors group-hover:text-navy dark:group-hover:text-steel-light">{post.title}</h3>
                        {post.excerpt && <p className="text-[14px] text-slate-600 dark:text-slate-300 line-clamp-3">{post.excerpt}</p>}
                        <p className="mt-auto pt-2 text-[13px] text-slate-500 dark:text-slate-400"><time dateTime={post.publishedAt}>{fmt(post.publishedAt)}</time> · {post.readTime}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function BlogPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center text-slate-500">Loading blog directory...</div>}>
      <BlogContent />
    </Suspense>
  );
}
