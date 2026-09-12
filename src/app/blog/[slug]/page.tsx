import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Share2, 
  Tag, 
  Sparkles, 
  ChevronRight, 
  ArrowRight,
  CheckCircle2,
  Building2,
  Copy,
  Linkedin,
  Twitter,
  MessageCircle
} from "lucide-react";
import { dbGetBlogPostBySlug, dbGetBlogPosts } from "@/lib/mongodb";
import BlogArticleClientActions from "./BlogArticleClientActions";

export async function generateMetadata({
  params
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await dbGetBlogPostBySlug(params.slug);
  if (!post) {
    return {
      title: "Article Not Found | Factual Solutions",
      description: "The requested executive blog post could not be found."
    };
  }

  return {
    title: `${post.title} | Factual Solutions Blog`,
    description: post.excerpt || "Strategic advisory and management consulting intelligence.",
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: post.coverImage ? [post.coverImage] : []
    }
  };
}

export default async function BlogPostPage({
  params
}: {
  params: { slug: string };
}) {
  const post = await dbGetBlogPostBySlug(params.slug);

  if (!post || post.status !== "published") {
    notFound();
  }

  // Fetch related posts in the same category or other published posts
  const allPosts = await dbGetBlogPosts({ status: "published" });
  const relatedPosts = allPosts
    .filter((p) => p.id !== post.id)
    .slice(0, 3);

  // Render markdown-like sections cleanly
  const renderFormattedContent = (content: string) => {
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let currentParagraph: string[] = [];

    const flushParagraph = (key: string) => {
      if (currentParagraph.length > 0) {
        const text = currentParagraph.join(" ");
        elements.push(
          <p key={key} className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
            {renderInlineMarkdown(text)}
          </p>
        );
        currentParagraph = [];
      }
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      if (!trimmed) {
        flushParagraph(`p-${index}`);
        return;
      }

      if (trimmed.startsWith("## ")) {
        flushParagraph(`p-before-${index}`);
        elements.push(
          <h2
            key={`h2-${index}`}
            className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-display mt-8 mb-4 tracking-tight pt-4 border-t border-slate-200/60 dark:border-slate-800/80"
          >
            {trimmed.replace("## ", "")}
          </h2>
        );
      } else if (trimmed.startsWith("### ")) {
        flushParagraph(`p-before-${index}`);
        elements.push(
          <h3
            key={`h3-${index}`}
            className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-display mt-6 mb-3 tracking-tight text-brand-rust dark:text-brand-rust-light"
          >
            {trimmed.replace("### ", "")}
          </h3>
        );
      } else if (trimmed.startsWith("> ")) {
        flushParagraph(`p-before-${index}`);
        elements.push(
          <div
            key={`quote-${index}`}
            className="my-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-brand-rust/10 via-brand-rust/5 to-transparent border-l-4 border-brand-rust text-slate-800 dark:text-slate-200 italic font-serif text-lg sm:text-xl shadow-sm"
          >
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-brand-rust shrink-0 mt-0.5" />
              <span>{trimmed.replace(/^>\s*"?|"?$/g, "")}</span>
            </div>
          </div>
        );
      } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        flushParagraph(`p-before-${index}`);
        elements.push(
          <li key={`li-${index}`} className="flex items-start gap-3 text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed my-2">
            <span className="w-2 h-2 rounded-full bg-brand-rust shrink-0 mt-2.5" />
            <span>{renderInlineMarkdown(trimmed.replace(/^[-*]\s*/, ""))}</span>
          </li>
        );
      } else if (/^\d+\.\s/.test(trimmed)) {
        flushParagraph(`p-before-${index}`);
        const number = trimmed.match(/^\d+/)?.[0] || "1";
        elements.push(
          <li key={`num-${index}`} className="flex items-start gap-3 text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed my-2.5">
            <span className="w-6 h-6 rounded-full bg-brand-rust/20 text-brand-rust dark:text-brand-rust-light text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
              {number}
            </span>
            <span>{renderInlineMarkdown(trimmed.replace(/^\d+\.\s*/, ""))}</span>
          </li>
        );
      } else {
        currentParagraph.push(trimmed);
      }
    });

    flushParagraph("final-p");
    return elements;
  };

  const renderInlineMarkdown = (text: string) => {
    // Bold **text**
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="font-bold text-slate-900 dark:text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <article className="min-h-screen bg-slate-50 dark:bg-[#070D18] text-slate-900 dark:text-slate-100 transition-colors pt-28 pb-20">
      
      {/* 1. Article Hero & Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
          <Link href="/" className="hover:text-brand-rust transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/blog" className="hover:text-brand-rust transition-colors">Blog</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-700 dark:text-slate-300 truncate max-w-[200px] sm:max-w-xs">
            {post.category}
          </span>
        </div>

        {/* Category & Meta */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <span className="px-3.5 py-1.5 rounded-full bg-brand-rust/10 text-brand-rust dark:text-brand-rust-light font-bold text-xs uppercase tracking-wider border border-brand-rust/20">
            {post.category}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <Clock className="w-4 h-4" />
            {post.readTime}
          </span>
          <span className="text-slate-400">•</span>
          <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <Calendar className="w-4 h-4" />
            {post.publishedAt}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white font-display leading-[1.15]">
          {post.title}
        </h1>

        {/* Excerpt Lead */}
        {post.excerpt && (
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed border-l-2 border-brand-steel/40 pl-4 py-1 italic">
            {post.excerpt}
          </p>
        )}

        {/* Author Bio Bar & Share Actions */}
        <div className="pt-4 pb-6 border-y border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-brand-rust/20 relative shrink-0 border border-brand-rust/30">
              <Image
                src={post.author.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80"}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">
                {post.author.name}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {post.author.role}
              </div>
            </div>
          </div>

          <BlogArticleClientActions title={post.title} />
        </div>

      </div>

      {/* 2. Cover Image Banner */}
      {post.coverImage && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
          <div className="relative h-72 sm:h-96 lg:h-[480px] w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-slate-900">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      )}

      {/* 3. Main Article Body */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <div className="space-y-6">
          {renderFormattedContent(post.content)}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="pt-8 mt-10 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5" />
              <span>Related Strategic Disciplines</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-brand-rust/10 hover:text-brand-rust dark:hover:text-brand-rust-light text-xs font-medium text-slate-600 dark:text-slate-400 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Author Executive Card */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0E1626] border border-slate-200 dark:border-slate-800 shadow-lg flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-brand-rust/20 relative shrink-0 border-2 border-brand-rust/40 shadow-md">
            <Image
              src={post.author.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80"}
              alt={post.author.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-2">
            <div className="text-base font-bold text-slate-900 dark:text-white">
              {post.author.name}
            </div>
            <div className="text-xs font-semibold text-brand-rust dark:text-brand-rust-light">
              {post.author.role}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Senior partner and practice lead at Factual Solutions. Specializes in multi-variable business modeling, feasibility validation, and corporate restructuring for high-growth enterprises.
            </p>
          </div>
        </div>

      </div>

      {/* 4. Consultation CTA Banner */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-brand-rust via-[#A83D29] to-[#882F1F] text-white shadow-2xl relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold">
              <Building2 className="w-3.5 h-3.5" />
              <span>Direct Partner Consultation</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display">
              Apply These Strategies to Your Enterprise
            </h3>
            <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
              Schedule a confidential 45-minute working session with our practice partners to review your strategic challenges and financial projections.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-6 py-3.5 rounded-xl bg-white text-brand-rust font-bold text-xs sm:text-sm shadow-xl hover:bg-slate-100 transition-all shrink-0 flex items-center gap-2"
          >
            <span>Book Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* 5. Related Articles Grid */}
      {relatedPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-16 border-t border-slate-200 dark:border-slate-800 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
              Further Executive Blog Posts
            </h3>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-rust dark:text-brand-rust-light hover:underline"
            >
              <span>View All Blogs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((related) => (
              <article
                key={related.id}
                className="bg-white dark:bg-[#0E1626] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                  <Image
                    src={related.coverImage || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"}
                    alt={related.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2.5 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase border border-white/20">
                      {related.category}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow justify-between space-y-3">
                  <div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mb-1.5 flex items-center gap-1.5">
                      <Clock className="w-3 h-3" />
                      {related.readTime}
                    </div>
                    <Link href={`/blog/${related.slug}`}>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-rust transition-colors line-clamp-2 leading-snug">
                        {related.title}
                      </h4>
                    </Link>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between mt-auto">
                    <span className="text-[11px] text-slate-500">{related.publishedAt}</span>
                    <Link
                      href={`/blog/${related.slug}`}
                      className="text-xs font-bold text-brand-rust dark:text-brand-rust-light flex items-center gap-1 hover:underline"
                    >
                      <span>Read</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

    </article>
  );
}
