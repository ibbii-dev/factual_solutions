import { isAdmin, requireAdmin } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";
import { dbGetBlogPosts, dbSaveBlogPost, DatabaseBlogPost } from "@/lib/mongodb";
import { DEFAULT_BLOG_AUTHOR, DEFAULT_BLOG_CATEGORY, DEFAULT_BLOG_COVER } from "@/data/blogCategories";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function calculateReadTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get("all") === "true";
    const statusParam = searchParams.get("status");
    const category = searchParams.get("category") || undefined;
    const search = searchParams.get("q") || undefined;
    const tag = searchParams.get("tag") || undefined;
    const featuredParam = searchParams.get("featured");

    // By default, public API only returns published posts unless explicitly asking for all/specific status
    const status = all ? undefined : statusParam || "published";
    // Drafts and other unpublished posts are for staff only.
    if (status !== "published" && !isAdmin(request)) {
      return NextResponse.json({ success: false, message: "Not authorised." }, { status: 401 });
    }
    const featured = featuredParam !== null ? featuredParam === "true" : undefined;

    const posts = await dbGetBlogPosts({
      status,
      category,
      search,
      tag,
      featured
    });

    return NextResponse.json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (error: any) {
    console.error("[API/blog] GET error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  try {
    const body = await request.json();
    const {
      title,
      slug: customSlug,
      excerpt,
      content,
      coverImage,
      category,
      author,
      readTime: customReadTime,
      tags,
      status,
      featured,
      coverImageAlt,
      metaTitle,
      metaDescription,
      focusKeyword
    } = body;

    if (!title || !title.trim()) {
      return NextResponse.json(
        { success: false, message: "Article title is required." },
        { status: 400 }
      );
    }

    if (!content || !content.trim()) {
      return NextResponse.json(
        { success: false, message: "Article content is required." },
        { status: 400 }
      );
    }

    const baseSlug = customSlug && customSlug.trim() ? slugify(customSlug) : slugify(title);
    const finalSlug = baseSlug || `article-${Date.now()}`;
    const calculatedReadTime = customReadTime || calculateReadTime(content);
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

    const newPost: DatabaseBlogPost = {
      id: `post-${Date.now()}`,
      title: title.trim(),
      slug: finalSlug,
      excerpt: (excerpt || "").trim(),
      content: content.trim(),
      coverImage: coverImage?.trim() || DEFAULT_BLOG_COVER,
      coverImageAlt: (coverImageAlt || "").trim() || title.trim(),
      category: (category || DEFAULT_BLOG_CATEGORY).trim(),
      author: {
        name: author?.name?.trim() || DEFAULT_BLOG_AUTHOR.name,
        role: author?.role?.trim() || DEFAULT_BLOG_AUTHOR.role,
        avatar: author?.avatar?.trim() || DEFAULT_BLOG_AUTHOR.avatar,
        bio: author?.bio?.trim() || undefined
      },
      metaTitle: (metaTitle || "").trim() || undefined,
      metaDescription: (metaDescription || "").trim() || undefined,
      focusKeyword: (focusKeyword || "").trim() || undefined,
      readTime: calculatedReadTime,
      tags: Array.isArray(tags)
        ? tags.map((t: string) => t.trim()).filter(Boolean)
        : typeof tags === "string"
        ? tags.split(",").map((t: string) => t.trim()).filter(Boolean)
        : [],
      status: status === "draft" ? "draft" : "published",
      featured: Boolean(featured),
      publishedAt: dateStr,
      createdAt: now,
      updatedAt: now
    };

    const saved = await dbSaveBlogPost(newPost);

    return NextResponse.json(
      {
        success: true,
        message: "Article published successfully.",
        data: saved
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("[API/blog] POST error:", error);
    return NextResponse.json(
      { success: false, message: "Invalid article payload or server error." },
      { status: 500 }
    );
  }
}
