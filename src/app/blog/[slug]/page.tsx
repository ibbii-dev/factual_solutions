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
import { SITE_URL, SITE_NAME, breadcrumbJsonLd } from "@/lib/seo";

export async function generateMetadata({
  params
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await dbGetBlogPostBySlug(params.slug);
  if (!post) {
    return {
      title: "Article Not Found",
      robots: { index: false },
      description: "The requested executive blog post could not be found."
    };
  }

  return {
    title: { absolute: `${post.metaTitle || post.title} | Factual Solutions` },
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
    description: post.metaDescription || post.excerpt || "Practical insights on operational excellence, quality and digital transformation.",
    keywords: [post.focusKeyword, ...(post.tags || [])].filter(Boolean) as string[],
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
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
          <p key={key} className="text-base sm:text-lg text-slate-700 dark:text-slate-100 leading-relaxed font-normal">
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
            className="text-2xl sm:text-3xl font-bold text-ink dark:text-white font-display mt-8 mb-4 tracking-tight pt-4 border-t border-slate-200/80 dark:border-white/10"
          >
            {trimmed.replace("## ", "")}
          </h2>
        );
      } else if (trimmed.startsWith("### ")) {
        flushParagraph(`p-before-${index}`);
        elements.push(
          <h3
            key={`h3-${index}`}
            className="text-xl sm:text-2xl font-bold text-accent font-display mt-6 mb-3 tracking-tight"
          >
            {trimmed.replace("### ", "")}
          </h3>
        );
      } else if (trimmed.startsWith("> ")) {
        flushParagraph(`p-before-${index}`);
        elements.push(
          <div
            key={`quote-${index}`}
            className="my-6 p-5 sm:p-6 rounded-2xl bg-slate-100/90 dark:bg-white/10 backdrop-blur-md border-l-4 border-brand-rust text-slate-800 dark:text-slate-100 italic font-serif text-lg sm:text-xl shadow-xs"
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
          <li key={`li-${index}`} className="flex items-start gap-3 text-base sm:text-lg text-slate-700 dark:text-slate-100 leading-relaxed my-2">
            <span className="w-2 h-2 rounded-full bg-brand-rust shrink-0 mt-2.5" />
            <span>{renderInlineMarkdown(trimmed.replace(/^[-*]\s*/, ""))}</span>
          </li>
        );
      } else if (/^\d+\.\s/.test(trimmed)) {
        flushParagraph(`p-before-${index}`);
        const number = trimmed.match(/^\d+/)?.[0] || "1";
        elements.push(
          <li key={`num-${index}`} className="flex items-start gap-3 text-base sm:text-lg text-slate-700 dark:text-slate-100 leading-relaxed my-2.5">
            <span className="w-6 h-6 rounded-full bg-brand-rust/20 text-accent text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
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
          <strong key={i} className="font-bold text-ink dark:text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  const articleJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt ? new Date(post.updatedAt).toISOString() : post.publishedAt,
      author: { "@type": "Person", name: post.author.name, jobTitle: post.author.role },
      publisher: { "@type": "Organization", name: SITE_NAME, logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo-symbol.png` } },
      image: post.coverImage ? [post.coverImage.startsWith("/") ? `${SITE_URL}${post.coverImage}` : post.coverImage] : undefined,
      mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
      keywords: [post.focusKeyword, ...(post.tags || [])].filter(Boolean).join(", "),
      articleSection: post.category,
    },
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
  ];

  const fmt = (v: string) => {
    const d = new Date(v);
    return Number.isNaN(d.getTime()) ? v : d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  };

  return (
    <article className="min-h-screen text-ink dark:text-white pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 pb-10 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <nav aria-label="Breadcrumb" className="lg:col-span-3 text-sm text-slate-500 dark:text-slate-400 pt-2 space-x-2">
          <Link href="/" className="hover:text-ink dark:hover:text-white">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/blog" className="hover:text-ink dark:hover:text-white">Blog</Link>
        </nav>
        <div className="lg:col-span-9 max-w-3xl space-y-6">
          <p className="eyebrow">{post.category}</p>
          <h1 className="text-[2.2rem] sm:text-5xl lg:text-[3.4rem] font-bold font-display tracking-[-0.015em] leading-[1.08]">{post.title}</h1>
          {post.excerpt && <p className="lede text-slate-700 dark:text-slate-300">{post.excerpt}</p>}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-ink/15 dark:border-white/15">
            <div className="flex items-center gap-3">
              <span className="relative w-10 h-10 rounded-full overflow-hidden bg-paper-deep shrink-0">
                <Image sizes="40px" src={post.author.avatar || "/images/qadeer-ahmad-bhatti.jpg"} alt="" fill className="object-cover" />
              </span>
              <p className="text-sm">
                <span className="font-semibold">{post.author.name}</span>
                <span className="text-slate-500 dark:text-slate-400"> · <time dateTime={post.publishedAt}>{fmt(post.publishedAt)}</time> · {post.readTime}</span>
              </p>
            </div>
            <BlogArticleClientActions title={post.title} />
          </div>
        </div>
      </header>

      {post.coverImage && (
        <figure className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="relative aspect-[16/8] w-full overflow-hidden bg-paper-deep">
            <Image sizes="(max-width: 1280px) 100vw, 1280px" src={post.coverImage} alt={post.coverImageAlt || post.title} fill priority className="object-cover" />
          </div>
          {post.coverImageAlt && <figcaption className="mt-2 text-sm text-slate-500 dark:text-slate-400">{post.coverImageAlt}</figcaption>}
        </figure>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-9 lg:col-start-4 max-w-3xl space-y-6 text-[17px] leading-[1.75]">
          {renderFormattedContent(post.content)}

          {post.tags && post.tags.length > 0 && (
            <p className="pt-8 mt-10 border-t border-ink/15 dark:border-white/15 text-sm text-slate-500 dark:text-slate-400">
              {post.tags.map((tag, i) => (
                <React.Fragment key={tag}>
                  {i > 0 && " · "}
                  <Link href={`/blog?q=${encodeURIComponent(tag)}`} className="hover:text-ink dark:hover:text-white hover:underline underline-offset-4">{tag}</Link>
                </React.Fragment>
              ))}
            </p>
          )}

          <aside className="mt-10 flex gap-5 pt-8 border-t border-ink/15 dark:border-white/15">
            <span className="relative w-16 h-16 rounded-full overflow-hidden bg-paper-deep shrink-0">
              <Image sizes="64px" src={post.author.avatar || "/images/qadeer-ahmad-bhatti.jpg"} alt="" fill className="object-cover" />
            </span>
            <div className="space-y-1">
              <p className="font-display text-lg font-bold">{post.author.name}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{post.author.role}</p>
              <p className="text-[15px] text-slate-700 dark:text-slate-300 leading-relaxed pt-1">
                {post.author.bio || "Practitioner at Factual Solutions, sharing practical insights on operational excellence, Lean Six Sigma, strategy, and digital transformation."}
              </p>
            </div>
          </aside>

          <div className="mt-12 p-8 bg-navy text-white space-y-4">
            <p className="font-display text-2xl font-bold leading-snug">Want to apply this in your organization?</p>
            <p className="text-[15px] text-slate-200/90">Talk to us about consulting, training, or ERP &amp; digital transformation.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-ink hover:bg-steel-light text-sm font-semibold transition-colors">
              Request a consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {relatedPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 grid grid-cols-1 lg:grid-cols-12 gap-6 border-t border-ink/15 dark:border-white/15 pt-10">
          <p className="lg:col-span-3 eyebrow pt-1">More articles</p>
          <ul className="lg:col-span-9">
            {relatedPosts.map((related) => (
              <li key={related.id} className="border-b border-ink/10 dark:border-white/10">
                <Link href={`/blog/${related.slug}`} className="group grid grid-cols-12 gap-4 py-5 items-baseline">
                  <time dateTime={related.publishedAt} className="col-span-12 sm:col-span-3 text-sm text-slate-500 dark:text-slate-400">{fmt(related.publishedAt)}</time>
                  <span className="col-span-12 sm:col-span-7 text-lg font-display font-bold group-hover:underline underline-offset-4 decoration-1">{related.title}</span>
                  <span className="col-span-12 sm:col-span-2 text-sm text-slate-500 dark:text-slate-400 sm:text-end">{related.readTime}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
