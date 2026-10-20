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
          <p key={key} className="text-base sm:text-lg text-ink leading-relaxed font-normal">
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
            className="text-2xl sm:text-3xl font-bold text-ink font-display mt-8 mb-4 tracking-tight pt-4 border-t border-line"
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
            className="my-6 p-5 sm:p-6 rounded-2xl bg-surface/90 backdrop-blur-md border-l-4 border-action text-ink italic text-lede shadow-xs"
          >
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <span>{trimmed.replace(/^>\s*"?|"?$/g, "")}</span>
            </div>
          </div>
        );
      } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        flushParagraph(`p-before-${index}`);
        elements.push(
          <li key={`li-${index}`} className="flex items-start gap-3 text-base sm:text-lg text-ink leading-relaxed my-2">
            <span className="w-2 h-2 rounded-full bg-action shrink-0 mt-2.5" />
            <span>{renderInlineMarkdown(trimmed.replace(/^[-*]\s*/, ""))}</span>
          </li>
        );
      } else if (/^\d+\.\s/.test(trimmed)) {
        flushParagraph(`p-before-${index}`);
        const number = trimmed.match(/^\d+/)?.[0] || "1";
        elements.push(
          <li key={`num-${index}`} className="flex items-start gap-3 text-base sm:text-lg text-ink leading-relaxed my-2.5">
            <span className="w-6 h-6 rounded-full bg-action/20 text-accent text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
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
          <strong key={i} className="font-bold text-ink">
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
    <article className="min-h-screen text-ink pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <header className="relative overflow-hidden">
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 pt-32 sm:pt-40 pb-10 flex flex-col items-center text-center gap-5">
          <nav aria-label="Breadcrumb" className="text-sm text-muted space-x-2 rtl:space-x-reverse">
            <Link href="/" className="hover:text-heading">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/blog" className="hover:text-heading">Blog</Link>
          </nav>
          <p className="fs-pill">{post.category}</p>
          <h1 className="text-h1 text-heading">{post.title}</h1>
          {post.excerpt && <p className="lede text-muted">{post.excerpt}</p>}
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 mt-2 fs-card px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="relative w-10 h-10 rounded-full overflow-hidden bg-band shrink-0">
                <Image sizes="40px" src={post.author.avatar || "/images/qadeer-ahmad-bhatti.jpg"} alt="" fill className="object-cover" />
              </span>
              <p className="text-sm text-start">
                <span className="font-semibold">{post.author.name}</span>
                <span className="text-muted"> · <time dateTime={post.publishedAt}>{fmt(post.publishedAt)}</time> · {post.readTime}</span>
              </p>
            </div>
            <BlogArticleClientActions title={post.title} />
          </div>
        </div>
      </header>

      {post.coverImage && (
        <figure className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="relative aspect-[16/8] w-full overflow-hidden rounded-3xl shadow-lift bg-band">
            <Image sizes="(max-width: 1280px) 100vw, 1280px" src={post.coverImage} alt={post.coverImageAlt || post.title} fill priority className="object-cover" />
          </div>
          {post.coverImageAlt && <figcaption className="mt-2 text-sm text-muted">{post.coverImageAlt}</figcaption>}
        </figure>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="space-y-6 text-[17px] leading-[1.75]">
          {renderFormattedContent(post.content)}

          {post.tags && post.tags.length > 0 && (
            <p className="pt-8 mt-10 border-t border-line text-sm text-muted">
              {post.tags.map((tag, i) => (
                <React.Fragment key={tag}>
                  {i > 0 && " · "}
                  <Link href={`/blog?q=${encodeURIComponent(tag)}`} className="hover:text-ink hover:underline underline-offset-4">{tag}</Link>
                </React.Fragment>
              ))}
            </p>
          )}

          <aside className="mt-10 flex gap-5 fs-card p-6">
            <span className="relative w-16 h-16 rounded-full overflow-hidden bg-band shrink-0">
              <Image sizes="64px" src={post.author.avatar || "/images/qadeer-ahmad-bhatti.jpg"} alt="" fill className="object-cover" />
            </span>
            <div className="space-y-1">
              <p className="font-display text-lg font-bold">{post.author.name}</p>
              <p className="text-sm text-muted">{post.author.role}</p>
              <p className="text-[15px] text-ink leading-relaxed pt-1">
                {post.author.bio || "Practitioner at Factual Solutions, sharing practical insights on operational excellence, Lean Six Sigma, strategy, and digital transformation."}
              </p>
            </div>
          </aside>

          <div className="relative overflow-hidden mt-10 p-8 rounded-3xl bg-band text-heading space-y-4">
            <p className="font-display text-2xl font-bold leading-snug">Want to apply this in your organization?</p>
            <p className="text-[15px] text-ink">Talk to us about consulting, training, or ERP &amp; digital transformation.</p>
            <Link href="/contact" className="btn-primary">
              Request a consultation
              <ArrowRight className="fs-arrow w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {relatedPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <p className="fs-label mb-6">More articles</p>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {relatedPosts.map((related) => (
              <li key={related.id}>
                <Link href={`/blog/${related.slug}`} className="group fs-card fs-card-hover h-full flex flex-col gap-3 p-6">
                  <time dateTime={related.publishedAt} className="text-[13px] text-muted">{fmt(related.publishedAt)} · {related.readTime}</time>
                  <span className="text-lg font-display font-bold leading-snug transition-colors group-hover:text-heading">{related.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
