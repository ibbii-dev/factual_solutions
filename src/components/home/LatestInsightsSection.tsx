"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Folder,
  Mail,
  Search,
  Tag,
} from "lucide-react";
import { IBlogPost } from "@/models";
import { BLOG_CATEGORIES, DEFAULT_BLOG_COVER } from "@/data/blogCategories";
import { principalConsultant } from "@/data/companyData";
import { useLanguage } from "@/context/LanguageContext";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";

function formatDate(value: string, lang: string) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString(lang === "ar" ? "ar" : "en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function PostMeta({ post, lang }: { post: IBlogPost; lang: string }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium text-slate-500 dark:text-slate-300">
      <span className="inline-flex items-center gap-1">
        <Calendar className="w-3 h-3" aria-hidden="true" />
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, lang)}</time>
      </span>
      <span className="inline-flex items-center gap-1">
        <Clock className="w-3 h-3" aria-hidden="true" />
        {post.readTime}
      </span>
    </div>
  );
}

export default function LatestInsightsSection() {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const router = useRouter();

  const [posts, setPosts] = useState<IBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [email, setEmail] = useState("");
  const [subState, setSubState] = useState<"idle" | "sending" | "done" | "error">("idle");

  useEffect(() => {
    let alive = true;
    fetch("/api/blog?status=published")
      .then((r) => r.json())
      .then((json) => {
        if (alive && json?.success && Array.isArray(json.data)) setPosts(json.data);
      })
      .catch(() => {})
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  const sorted = useMemo(
    () => [...posts].sort((a, b) => (b.publishedAt || "").localeCompare(a.publishedAt || "")),
    [posts]
  );
  const featured = sorted.find((p) => p.featured) || sorted[0];
  const recent = sorted.filter((p) => p.id !== featured?.id).slice(0, 4);

  const categoryCounts = useMemo(() => {
    const map: Record<string, number> = {};
    posts.forEach((p) => {
      map[p.category] = (map[p.category] || 0) + 1;
    });
    return map;
  }, [posts]);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/blog?q=${encodeURIComponent(q)}` : "/blog");
  };

  const onSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubState("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source: "Homepage Blog Sidebar" }),
      });
      const json = await res.json();
      setSubState(json?.success ? "done" : "error");
      if (json?.success) setEmail("");
    } catch {
      setSubState("error");
    }
  };

  const t = {
    eyebrow: isAr ? "المدونة" : "FROM THE BLOG",
    title: isAr ? "أحدث الرؤى من الممارسة" : "Latest Insights from Practice",
    lead: isAr
      ? "رؤى عملية وأدوات ووجهات نظر واقعية حول التميز التشغيلي والاستراتيجية ولين ستة سيجما والجودة وERP والتحول الرقمي والتحسين المستمر."
      : "Practical insights, tools, and real-world perspectives on operational excellence, strategy, Lean Six Sigma, quality, ERP, digital transformation, and continuous improvement.",
    featured: isAr ? "مقال مميز" : "Featured",
    recent: isAr ? "أحدث المقالات" : "Recent Articles",
    readMore: isAr ? "اقرأ المقال" : "Read article",
    viewAll: isAr ? "عرض كل المقالات" : "View all articles",
    soonTitle: isAr ? "المقالات قادمة قريباً" : "Articles coming soon",
    soonText: isAr
      ? "نعمل على أول مجموعة من المقالات. اشترك لتصلك عند نشرها."
      : "Our first articles are being prepared. Subscribe below and we'll let you know when they go live.",
    search: isAr ? "ابحث في المدونة" : "Search the Blog",
    searchPh: isAr ? "موضوع أو كلمة مفتاحية..." : "Topic or keyword...",
    categories: isAr ? "التصنيفات" : "Categories",
    newsTitle: isAr ? "رؤى عملية في بريدك" : "Practical Insights on Operational Excellence",
    newsText: isAr ? "مقالات وأدوات جديدة، دون إزعاج." : "New articles and tools, delivered occasionally. No spam.",
    subscribe: isAr ? "اشترك" : "Subscribe",
    subscribed: isAr ? "تم الاشتراك. شكراً لك!" : "You're subscribed. Thank you!",
    subError: isAr ? "تعذر الاشتراك. حاول مرة أخرى." : "Couldn't subscribe. Please try again.",
    aboutTitle: isAr ? "عن الكاتب" : "About the Author",
    aboutText: isAr
      ? "استشاري ومدرب بخبرة دولية في الاستراتيجية وإدارة المشاريع ولين ستة سيجما والتميز التشغيلي والتحول الرقمي."
      : "Consultant and trainer with international experience across strategy, project and program management, Lean Six Sigma, operational excellence, and digital transformation.",
    aboutCta: isAr ? "تعرّف علينا" : "More about us",
  };

  return (
    <section aria-labelledby="insights-heading" className="relative py-16 sm:py-24 bg-slate-50/70 dark:bg-night-950/40 border-y border-slate-200/70 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <ScrollReveal variant="fade-up" className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-10 sm:mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="brand-rule" aria-hidden="true" />
            <span className="eyebrow block">{t.eyebrow}</span>
            <h2 id="insights-heading" className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-ink dark:text-white font-display leading-[1.1]">
              {t.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">{t.lead}</p>
          </div>
          <Link href="/blog" className="inline-flex items-center gap-2 self-start lg:self-auto px-5 py-2.5 rounded-xl bg-navy hover:bg-navy-800 text-white text-sm font-bold shadow-sm transition-colors">
            {t.viewAll}
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* ---------- Main content column ---------- */}
          <div className="lg:col-span-8 space-y-8">
            {loading && (
              <div className="space-y-4" aria-busy="true" aria-live="polite">
                <div className="h-72 rounded-3xl bg-slate-200/70 dark:bg-white/5 animate-pulse" />
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="h-40 rounded-2xl bg-slate-200/70 dark:bg-white/5 animate-pulse" />
                  <div className="h-40 rounded-2xl bg-slate-200/70 dark:bg-white/5 animate-pulse" />
                </div>
              </div>
            )}

            {!loading && !featured && (
              <div className="rounded-3xl bg-white dark:bg-night-800/80 border border-slate-200/80 dark:border-white/10 shadow-card p-8 sm:p-12 text-center space-y-3">
                <span className="w-12 h-12 mx-auto rounded-xl bg-navy text-white flex items-center justify-center shadow-sm">
                  <BookOpen className="w-5 h-5" />
                </span>
                <h3 className="text-xl font-bold font-display text-ink dark:text-white">{t.soonTitle}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">{t.soonText}</p>
                <div className="flex flex-wrap justify-center gap-2 pt-2">
                  {BLOG_CATEGORIES.map((c) => (
                    <span key={c} className="px-3 py-1 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Featured post */}
            {!loading && featured && (
              <ScrollReveal variant="fade-up">
                <article className="group grid md:grid-cols-2 overflow-hidden rounded-3xl bg-white dark:bg-night-800/80 border border-slate-200/80 dark:border-white/10 shadow-card hover:shadow-lift transition-shadow">
                  <Link href={`/blog/${featured.slug}`} className="relative block aspect-[16/10] md:aspect-auto md:min-h-[300px] overflow-hidden bg-navy-900" tabIndex={-1} aria-hidden="true">
                    <img
                      src={featured.coverImage || DEFAULT_BLOG_COVER}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute top-4 left-4 rtl:left-auto rtl:right-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rust text-white text-[10.5px] font-bold uppercase tracking-wider shadow-cta">
                      {t.featured}
                    </span>
                  </Link>
                  <div className="p-6 sm:p-8 flex flex-col gap-4">
                    <Link href={`/blog?category=${encodeURIComponent(featured.category)}`} className="self-start inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-rust dark:text-rust-light hover:underline">
                      <Folder className="w-3 h-3" aria-hidden="true" />
                      {featured.category}
                    </Link>
                    <h3 className="text-xl sm:text-2xl font-extrabold font-display leading-snug text-ink dark:text-white">
                      <Link href={`/blog/${featured.slug}`} className="hover:text-navy dark:hover:text-steel transition-colors">
                        {featured.title}
                      </Link>
                    </h3>
                    <PostMeta post={featured} lang={language} />
                    {featured.excerpt && (
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-4">{featured.excerpt}</p>
                    )}
                    <div className="mt-auto flex items-center justify-between gap-3 pt-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={featured.author.avatar || principalConsultant.image}
                          alt=""
                          className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-white/10"
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-ink dark:text-white truncate">{featured.author.name}</div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{featured.author.role}</div>
                        </div>
                      </div>
                      <Link href={`/blog/${featured.slug}`} className="shrink-0 inline-flex items-center gap-1.5 text-xs font-bold text-navy dark:text-steel hover:text-rust dark:hover:text-rust-light">
                        {t.readMore}
                        <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                      </Link>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            )}

            {/* Recent posts */}
            {!loading && recent.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{t.recent}</h3>
                <StaggerContainer staggerChildren={0.06} className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                  {recent.map((post) => (
                    <StaggerItem key={post.id}>
                      <article className="group h-full flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-night-800/80 border border-slate-200/80 dark:border-white/10 shadow-card hover:shadow-lift hover:-translate-y-0.5 transition-all duration-300">
                        <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/9] overflow-hidden bg-navy-900" tabIndex={-1} aria-hidden="true">
                          <img
                            src={post.coverImage || DEFAULT_BLOG_COVER}
                            alt=""
                            loading="lazy"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </Link>
                        <div className="p-5 flex flex-col gap-2.5 flex-1">
                          <span className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-rust dark:text-rust-light">{post.category}</span>
                          <h4 className="text-base font-bold font-display leading-snug text-ink dark:text-white">
                            <Link href={`/blog/${post.slug}`} className="hover:text-navy dark:hover:text-steel transition-colors">
                              {post.title}
                            </Link>
                          </h4>
                          {post.excerpt && <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">{post.excerpt}</p>}
                          <div className="mt-auto pt-1 flex items-center justify-between gap-2">
                            <PostMeta post={post} lang={language} />
                          </div>
                          {post.tags?.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {post.tags.slice(0, 3).map((tag) => (
                                <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 text-[10px] font-semibold text-slate-500 dark:text-slate-300">
                                  <Tag className="w-2.5 h-2.5" aria-hidden="true" />
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </article>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            )}
          </div>

          {/* ---------- Sidebar ---------- */}
          <aside className="lg:col-span-4 space-y-5" aria-label={isAr ? "الشريط الجانبي للمدونة" : "Blog sidebar"}>
            {/* Search */}
            <div className="rounded-2xl bg-white dark:bg-night-800/80 border border-slate-200/80 dark:border-white/10 shadow-card p-5">
              <h3 className="text-sm font-bold text-ink dark:text-white mb-3">{t.search}</h3>
              <form onSubmit={onSearch} role="search" className="relative">
                <Search className="absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" aria-hidden="true" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t.searchPh}
                  aria-label={t.search}
                  className="w-full pl-10 pr-20 rtl:pl-20 rtl:pr-10 py-2.5 rounded-xl bg-slate-50 dark:bg-night-900 border border-slate-200 dark:border-white/10 text-sm text-ink dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-navy dark:focus:border-steel"
                />
                <button type="submit" className="absolute right-1.5 rtl:right-auto rtl:left-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-navy text-white text-xs font-bold hover:bg-navy-800">
                  {isAr ? "بحث" : "Go"}
                </button>
              </form>
            </div>

            {/* Categories */}
            <nav aria-label={t.categories} className="rounded-2xl bg-white dark:bg-night-800/80 border border-slate-200/80 dark:border-white/10 shadow-card p-5">
              <h3 className="text-sm font-bold text-ink dark:text-white mb-2">{t.categories}</h3>
              <ul className="divide-y divide-slate-100 dark:divide-white/5">
                {BLOG_CATEGORIES.map((c) => (
                  <li key={c}>
                    <Link
                      href={`/blog?category=${encodeURIComponent(c)}`}
                      className="group flex items-center justify-between gap-3 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:text-navy dark:hover:text-steel transition-colors"
                    >
                      <span className="inline-flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-steel group-hover:bg-rust transition-colors" aria-hidden="true" />
                        {c}
                      </span>
                      <span className="min-w-[1.75rem] text-center px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 text-[11px] font-bold text-slate-500 dark:text-slate-400">
                        {categoryCounts[c] || 0}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Newsletter */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 dark:from-night-800 dark:to-night-950 text-white border border-navy-700 dark:border-white/10 shadow-lift p-5">
              <div className="absolute top-0 left-0 h-1 w-full bg-brand-tri" aria-hidden="true" />
              <div className="flex items-center gap-2 mb-2">
                <Mail className="w-4 h-4 text-steel" aria-hidden="true" />
                <h3 className="text-sm font-bold">{t.newsTitle}</h3>
              </div>
              <p className="text-xs text-slate-200/80 mb-3">{t.newsText}</p>
              {subState === "done" ? (
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-steel-light" role="status">
                  <CheckCircle2 className="w-4 h-4" /> {t.subscribed}
                </p>
              ) : (
                <form onSubmit={onSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    aria-label={isAr ? "البريد الإلكتروني" : "Email address"}
                    className="flex-1 min-w-0 px-3 py-2.5 rounded-xl bg-white/10 border border-white/20 text-sm text-white placeholder:text-slate-300 focus:outline-none focus:border-steel"
                  />
                  <button
                    type="submit"
                    disabled={subState === "sending"}
                    className="btn-sheen shrink-0 px-4 py-2.5 rounded-xl bg-rust hover:bg-rust-light text-white text-xs font-bold shadow-cta disabled:opacity-60"
                  >
                    {subState === "sending" ? "…" : t.subscribe}
                  </button>
                </form>
              )}
              {subState === "error" && <p className="mt-2 text-xs text-rust-light" role="alert">{t.subError}</p>}
            </div>

            {/* About the author */}
            <div className="rounded-2xl bg-white dark:bg-night-800/80 border border-slate-200/80 dark:border-white/10 shadow-card p-5">
              <h3 className="text-sm font-bold text-ink dark:text-white mb-3">{t.aboutTitle}</h3>
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={principalConsultant.image}
                  alt={principalConsultant.name}
                  loading="lazy"
                  className="w-14 h-14 rounded-xl object-cover border-2 border-steel/40"
                />
                <div>
                  <div className="text-sm font-bold text-ink dark:text-white">{principalConsultant.name}</div>
                  <div className="text-xs font-semibold text-rust dark:text-rust-light">{principalConsultant.role}</div>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{t.aboutText}</p>
              <Link href="/about" className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-navy dark:text-steel hover:text-rust dark:hover:text-rust-light">
                {t.aboutCta}
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
