"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Calendar, Sparkles, BookOpen } from "lucide-react";
import { IBlogPost } from "@/models";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";

export default function LatestInsightsSection() {
  const [posts, setPosts] = useState<IBlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLatest() {
      try {
        const res = await fetch("/api/blog?status=published");
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setPosts(json.data.slice(0, 3));
        }
      } catch (err) {
        console.error("Failed to fetch latest insights:", err);
      } finally {
        setLoading(false);
      }
    }
    loadLatest();
  }, []);

  if (!loading && posts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 sm:py-24 bg-white/70 dark:bg-[#0A101D]/70 backdrop-blur-md text-[#152238] dark:text-white relative overflow-hidden border-t border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-brand-rust/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-steel/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <ScrollReveal variant="fade-up" className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-rust/10 dark:bg-brand-rust/20 border border-brand-rust/30 text-brand-rust dark:text-brand-rust-light text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Thought Leadership & Blog</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#152238] dark:text-white font-display">
              Latest Strategic Blog
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Practical frameworks, corporate valuation models, and market intelligence published by our senior practice leaders.
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fade-left" className="shrink-0">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs sm:text-sm font-bold hover:bg-brand-rust dark:hover:bg-brand-rust hover:text-white dark:hover:text-white transition-all shadow-md group"
            >
              <span>Explore All Blogs</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </ScrollReveal>
        </div>

        {/* 3 Featured Insights Grid */}
        <StaggerContainer delayChildren={0.1} staggerChildren={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {posts.map((post) => (
            <StaggerItem
              key={post.id}
              variant="fade-up"
              className="flex flex-col bg-white dark:bg-[#111C2E] border border-slate-200/80 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-rust/50 transition-all duration-300 group"
            >
              {/* Cover Image */}
              <div className="relative h-52 w-full bg-slate-900 overflow-hidden shrink-0">
                <Image
                  src={post.coverImage || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wide border border-white/20">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.publishedAt}
                    </span>
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-rust transition-colors line-clamp-2 leading-snug font-display">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                {/* Footer Meta */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700 relative shrink-0">
                      <Image
                        src={post.author.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80"}
                        alt={post.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate max-w-[130px]">
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
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </section>
  );
}
