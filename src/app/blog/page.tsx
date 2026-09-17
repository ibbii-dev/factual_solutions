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
  TrendingUp, 
  Layers
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
    <div className="min-h-screen bg-[#FAFBFD] dark:bg-[#0B1320] text-[#152238] dark:text-white transition-colors pt-32 sm:pt-36 pb-20">
      
      {/* 1. Header Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-12 sm:pb-16">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#A33C29]/10 text-[#A33C29] text-[11px] font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Strategic Intelligence &amp; Blog</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#152238] dark:text-white font-display">
            Executive Blog &amp; Advisory Perspectives
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Data-backed methodologies, corporate finance research, and practical operational frameworks curated by our senior consulting partners.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="mt-10 max-w-4xl mx-auto space-y-4">
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles by title, financial model, strategy, keyword..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-[#111C2E] border border-slate-200/90 dark:border-slate-800 text-xs text-[#152238] dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#A33C29] shadow-xs transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-[#A33C29]"
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
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-[#152238] text-white shadow-xs font-bold"
                    : "bg-white dark:bg-[#111C2E] text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800"
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
          <div className="w-8 h-8 border-3 border-[#A33C29] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-slate-500">Loading strategic intelligence articles...</p>
        </div>
      )}

      {/* 3. Empty State */}
      {!isLoading && filteredPosts.length === 0 && (
        <div className="max-w-md mx-auto px-4 py-16 text-center space-y-3 bg-white dark:bg-[#111C2E] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-8 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#152238] dark:text-white">No articles found</h3>
          <p className="text-xs text-slate-500">
            No published blog posts match your current search or category filter.
          </p>
          <button
            onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#152238] text-white text-xs font-bold hover:bg-[#A33C29] transition-colors"
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
            <div className="relative rounded-2xl overflow-hidden bg-white dark:bg-[#111C2E] border border-slate-200/90 dark:border-slate-800 shadow-xs group transition-all duration-300 hover:shadow-md">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Cover Image */}
                <div className="lg:col-span-7 relative h-64 sm:h-80 lg:h-[400px] overflow-hidden bg-slate-900">
                  <Image
                    src={featuredPost.coverImage || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"}
                    alt={featuredPost.title}
                    fill
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-md bg-[#152238]/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#A33C29]" />
                    <span>Featured Analysis</span>
                  </div>
                </div>

                {/* Content Container */}
                <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2.5 text-xs text-slate-500">
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-[10px]">
                        {featuredPost.category}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-[11px]">
                        <Clock className="w-3 h-3" />
                        {featuredPost.readTime}
                      </span>
                    </div>

                    <Link href={`/blog/${featuredPost.slug}`}>
                      <h2 className="text-xl sm:text-2xl font-bold text-[#152238] dark:text-white group-hover:text-[#A33C29] transition-colors leading-snug font-display">
                        {featuredPost.title}
                      </h2>
                    </Link>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed font-normal">
                      {featuredPost.excerpt}
                    </p>

                    {/* Tags */}
                    {featuredPost.tags && featuredPost.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {featuredPost.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Author & CTA */}
                  <div className="pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-200 relative shrink-0">
                        <Image
                          src={featuredPost.author.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80"}
                          alt={featuredPost.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#152238] dark:text-white">
                          {featuredPost.author.name}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {featuredPost.author.role}
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#A33C29] hover:text-[#8E3221]"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Grid of Remaining Posts */}
          {gridPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {gridPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white dark:bg-[#111C2E] rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    {/* Cover image */}
                    <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                      <Image
                        src={post.coverImage || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="text-[10px] font-bold tracking-wider px-2.5 py-1 rounded bg-[#152238]/85 backdrop-blur-md text-white uppercase">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 sm:p-6 space-y-2.5">
                      <div className="flex items-center gap-2 text-[11px] text-slate-500">
                        <span>{post.publishedAt}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>

                      <Link href={`/blog/${post.slug}`}>
                        <h3 className="text-base font-bold text-[#152238] dark:text-white leading-snug font-display group-hover:text-[#A33C29] transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                      </Link>

                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3 font-normal">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Read Article */}
                  <div className="p-5 sm:p-6 pt-0 mt-auto">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#152238] dark:text-slate-200 group-hover:text-[#A33C29] transition-colors"
                    >
                      <span>Read Full Article</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

        </section>
      )}

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
