"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Search, 
  ArrowRight, 
  Clock, 
  Calendar, 
  Tag, 
  BookOpen, 
  Sparkles, 
  Share2, 
  TrendingUp, 
  Layers, 
  ChevronRight,
  Filter,
  CheckCircle2
} from "lucide-react";
import { IBlogPost } from "@/models";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";

const CATEGORIES = [
  "All",
  "Strategic Management",
  "Financial Modeling",
  "Feasibility Studies",
  "Operational Excellence",
  "Enterprise Growth"
];

function BlogContent() {
  const [posts, setPosts] = useState<IBlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

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
    const matchesCategory =
      selectedCategory === "All" ||
      post.category.toLowerCase() === selectedCategory.toLowerCase();
    
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.category.toLowerCase().includes(query) ||
      post.author.name.toLowerCase().includes(query) ||
      post.tags.some((t) => t.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredPosts.find((p) => p.featured) || filteredPosts[0];
  const gridPosts = featuredPost 
    ? filteredPosts.filter((p) => p.id !== featuredPost.id)
    : filteredPosts;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070D18] text-slate-900 dark:text-slate-100 transition-colors pt-24 pb-20">
      
      {/* 1. Header Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-8 pb-12 sm:pb-16 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-rust/10 dark:bg-brand-rust/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-10 w-80 h-80 bg-brand-steel/10 dark:bg-brand-steel/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-rust/10 dark:bg-brand-rust/20 border border-brand-rust/30 text-brand-rust dark:text-brand-rust-light text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Strategic Intelligence & Blog</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white font-display">
            Executive Blog & Advisory Perspectives
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Data-backed methodologies, corporate finance research, and practical operational frameworks curated by our senior consulting partners.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="mt-10 max-w-4xl mx-auto space-y-5">
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles by title, financial model, strategy, keyword..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white dark:bg-[#0E1626] border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-rust shadow-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-brand-rust text-white shadow-md shadow-brand-rust/20"
                    : "bg-white dark:bg-[#0E1626] text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Loading State */}
      {isLoading && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="w-10 h-10 border-4 border-brand-rust border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-slate-500 dark:text-slate-400">Loading strategic intelligence articles...</p>
        </div>
      )}

      {/* 3. Empty State */}
      {!isLoading && filteredPosts.length === 0 && (
        <div className="max-w-md mx-auto px-4 py-16 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">No articles found</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            No published blog posts match your current search or category filter. Try clearing your filters or search terms.
          </p>
          <button
            onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-rust text-white text-xs font-semibold hover:bg-brand-rust-light transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* 4. Articles Showcase */}
      {!isLoading && filteredPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Featured Post Spotlight */}
          {featuredPost && (
            <div className="relative rounded-3xl overflow-hidden bg-white dark:bg-[#0E1626] border border-slate-200 dark:border-slate-800/80 shadow-xl group transition-all duration-300 hover:border-brand-rust/50">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Cover Image Container */}
                <div className="lg:col-span-7 relative h-64 sm:h-80 lg:h-[420px] overflow-hidden bg-slate-900">
                  <Image
                    src={featuredPost.coverImage || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"}
                    alt={featuredPost.title}
                    fill
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent lg:hidden" />
                  
                  {/* Spotlight Tag */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-brand-rust text-white text-[11px] font-bold uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Featured Analysis</span>
                  </div>
                </div>

                {/* Content Container */}
                <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                      <span className="px-2.5 py-1 rounded-md bg-brand-rust/10 text-brand-rust dark:text-brand-rust-light font-bold">
                        {featuredPost.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {featuredPost.readTime}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {featuredPost.publishedAt}
                      </span>
                    </div>

                    <Link href={`/blog/${featuredPost.slug}`}>
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white group-hover:text-brand-rust transition-colors leading-tight font-display">
                        {featuredPost.title}
                      </h2>
                    </Link>

                    <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>

                    {/* Tags */}
                    {featuredPost.tags && featuredPost.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {featuredPost.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Author & CTA Footer */}
                  <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-brand-rust/20 relative shrink-0 border border-brand-rust/30">
                        <Image
                          src={featuredPost.author.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80"}
                          alt={featuredPost.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">
                          {featuredPost.author.name}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">
                          {featuredPost.author.role}
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-rust hover:bg-brand-rust-light text-white text-xs font-bold transition-all shadow-md shadow-brand-rust/20 group/btn"
                    >
                      <span>Read Blog</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                    </Link>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* Grid of Other Articles */}
          {gridPosts.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
                  <span>Recent Advisory Articles</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {gridPosts.length}
                  </span>
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {gridPosts.map((post) => (
                  <article
                    key={post.id}
                    className="flex flex-col bg-white dark:bg-[#0E1626] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:border-brand-rust/40 group"
                  >
                    {/* Thumbnail Image */}
                    <div className="relative h-48 w-full overflow-hidden bg-slate-900 shrink-0">
                      <Image
                        src={post.coverImage || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] font-bold tracking-wide uppercase border border-white/20">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between space-y-4">
                      <div className="space-y-2.5">
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {post.publishedAt}
                          </span>
                        </div>

                        <Link href={`/blog/${post.slug}`}>
                          <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-rust transition-colors line-clamp-2 leading-snug">
                            {post.title}
                          </h4>
                        </Link>

                        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>

                      {/* Footer */}
                      <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700 relative shrink-0">
                            <Image
                              src={post.author.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80"}
                              alt={post.author.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate max-w-[120px]">
                            {post.author.name}
                          </span>
                        </div>

                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-1 text-xs font-bold text-brand-rust dark:text-brand-rust-light hover:underline"
                        >
                          <span>Read</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>

                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

        </section>
      )}

      {/* 5. Advisory Subscription CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-brand-navy-dark via-[#0F1D33] to-[#12223D] border border-brand-steel/20 p-8 sm:p-12 text-center text-white space-y-6 shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-steel/20 text-brand-steel-light text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Partner Intelligence Dispatch</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-display">
              Receive Our Strategic Briefings Directly
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Curated case analyses, valuation frameworks, and feasibility research delivered monthly to corporate executives and founders.
            </p>
          </div>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const input = form.elements.namedItem("subEmail") as HTMLInputElement;
              if (input && input.value) {
                try {
                  await fetch("/api/newsletter", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: input.value })
                  });
                  alert("Thank you for subscribing to our executive briefings.");
                  input.value = "";
                } catch (err) {
                  console.error(err);
                }
              }
            }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              name="subEmail"
              required
              placeholder="Enter corporate email..."
              className="flex-grow px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none focus:border-brand-steel"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-brand-rust hover:bg-brand-rust-light text-white text-xs sm:text-sm font-bold transition-all shrink-0 shadow-lg shadow-brand-rust/20"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}

export default function BlogPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 dark:bg-[#070D18] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-brand-rust border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <BlogContent />
    </Suspense>
  );
}
