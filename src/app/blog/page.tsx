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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          <div className="lg:col-span-3">
            <div className="relative">
              <Search className="absolute start-0 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" aria-hidden="true" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={L.search}
                aria-label={L.searchLabel}
                className="w-full ps-7 pe-12 py-2.5 bg-transparent border-b border-ink/25 dark:border-white/25 text-sm text-ink dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-ink dark:focus:border-white"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute end-0 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500 hover:text-ink dark:hover:text-white">
                  {L.clear}
                </button>
              )}
            </div>
          </div>
          <div className="lg:col-span-9 flex flex-wrap gap-x-5 gap-y-2 lg:pt-2" role="group" aria-label="Filter by category">
            {["All", ...BLOG_CATEGORIES].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                className={`py-1 text-sm border-b transition-colors ${
                  activeCategory === cat
                    ? "border-ink text-ink dark:border-white dark:text-white font-semibold"
                    : "border-transparent text-slate-500 hover:text-ink dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                {categoryLabel(cat, language)}
              </button>
            ))}
          </div>
        </div>

        {isLoading && <p className="py-16 text-slate-500 border-t border-ink/15 dark:border-white/15">{L.loading}</p>}

        {!isLoading && filteredPosts.length === 0 && (
          <div className="py-12 border-t border-ink/15 dark:border-white/15 max-w-xl space-y-3">
            <h2 className="text-2xl font-bold font-display">{searchQuery || activeCategory !== "All" ? L.noneTitle : L.soonTitle}</h2>
            <p className="text-slate-600 dark:text-slate-400">{searchQuery || activeCategory !== "All" ? L.noneText : L.soonText}</p>
            {(searchQuery || activeCategory !== "All") && (
              <button onClick={() => { setSearchQuery(""); setActiveCategory("All"); }} className="link-arrow text-sm text-ink dark:text-white">
                {L.clearFilters}
              </button>
            )}
          </div>
        )}

        {!isLoading && filteredPosts.length > 0 && (
          <div className="border-t border-ink/15 dark:border-white/15">
            {featuredPost && (
              <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-10 border-b border-ink/15 dark:border-white/15">
                <Link href={`/blog/${featuredPost.slug}`} className="lg:col-span-7 relative block aspect-[16/10] overflow-hidden bg-paper-deep" tabIndex={-1} aria-hidden="true">
                  <Image sizes="(max-width: 1024px) 100vw, 720px" src={featuredPost.coverImage || "/images/consulting-meeting.webp"} alt="" fill priority className="object-cover" />
                </Link>
                <div className="lg:col-span-5 flex flex-col gap-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-accent font-semibold">{L.featured} · {categoryLabel(featuredPost.category, language)}</p>
                  <h2 className="text-3xl sm:text-4xl font-bold font-display leading-tight">
                    <Link href={`/blog/${featuredPost.slug}`} className="hover:underline underline-offset-4 decoration-1">{featuredPost.title}</Link>
                  </h2>
                  {featuredPost.excerpt && <p className="lede text-slate-700 dark:text-slate-300">{featuredPost.excerpt}</p>}
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {featuredPost.author.name} · <time dateTime={featuredPost.publishedAt}>{fmt(featuredPost.publishedAt)}</time> · {featuredPost.readTime}
                  </p>
                  {featuredPost.tags?.length > 0 && <p className="text-sm text-slate-500 dark:text-slate-400">{featuredPost.tags.slice(0, 4).join(" · ")}</p>}
                  <Link href={`/blog/${featuredPost.slug}`} className="link-arrow text-sm text-ink dark:text-white mt-auto">
                    {L.read}
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </Link>
                </div>
              </article>
            )}

            {gridPosts.length > 0 && (
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8">
                {gridPosts.map((post) => (
                  <li key={post.id} className="py-8 border-b border-ink/10 dark:border-white/10">
                    <article className="space-y-3">
                      <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-paper-deep" tabIndex={-1} aria-hidden="true">
                        <Image sizes="(max-width: 640px) 100vw, 400px" src={post.coverImage || "/images/consulting-meeting.webp"} alt="" fill className="object-cover" />
                      </Link>
                      <p className="text-xs uppercase tracking-[0.14em] text-accent font-semibold">{categoryLabel(post.category, language)}</p>
                      <h3 className="text-xl font-bold font-display leading-snug">
                        <Link href={`/blog/${post.slug}`} className="hover:underline underline-offset-4 decoration-1">{post.title}</Link>
                      </h3>
                      {post.excerpt && <p className="text-[15px] text-slate-700 dark:text-slate-300 line-clamp-3">{post.excerpt}</p>}
                      <p className="text-sm text-slate-500 dark:text-slate-400"><time dateTime={post.publishedAt}>{fmt(post.publishedAt)}</time> · {post.readTime}</p>
                    </article>
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
