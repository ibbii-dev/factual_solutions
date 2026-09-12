import { NextRequest, NextResponse } from "next/server";
import {
  dbGetBlogPostById,
  dbGetBlogPostBySlug,
  dbUpdateBlogPost,
  dbDeleteBlogPost,
  DatabaseBlogPost
} from "@/lib/mongodb";

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

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    let post = await dbGetBlogPostById(id);
    if (!post) {
      post = await dbGetBlogPostBySlug(id);
    }

    if (!post) {
      return NextResponse.json(
        { success: false, message: "Blog post not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: post
    });
  } catch (error: any) {
    console.error("[API/blog/[id]] GET error:", error);
    return NextResponse.json(
      { success: false, message: "Server error fetching article." },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    const existing = await dbGetBlogPostById(id);
    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Article not found for update." },
        { status: 404 }
      );
    }

    const updates: Partial<DatabaseBlogPost> = {};

    if (body.title !== undefined) updates.title = body.title.trim();
    if (body.slug !== undefined) updates.slug = slugify(body.slug) || existing.slug;
    if (body.excerpt !== undefined) updates.excerpt = body.excerpt.trim();
    if (body.content !== undefined) {
      const trimmedContent = body.content.trim();
      updates.content = trimmedContent;
      if (!body.readTime) {
        updates.readTime = calculateReadTime(trimmedContent);
      }
    }
    if (body.coverImage !== undefined) updates.coverImage = body.coverImage.trim();
    if (body.category !== undefined) updates.category = body.category.trim();
    if (body.author !== undefined) updates.author = body.author;
    if (body.readTime !== undefined) updates.readTime = body.readTime;
    if (body.status !== undefined) updates.status = body.status;
    if (body.featured !== undefined) updates.featured = Boolean(body.featured);
    if (body.publishedAt !== undefined) updates.publishedAt = body.publishedAt;
    if (body.tags !== undefined) {
      updates.tags = Array.isArray(body.tags)
        ? body.tags.map((t: string) => t.trim()).filter(Boolean)
        : typeof body.tags === "string"
        ? body.tags.split(",").map((t: string) => t.trim()).filter(Boolean)
        : existing.tags;
    }

    const ok = await dbUpdateBlogPost(id, updates);
    if (!ok) {
      return NextResponse.json(
        { success: false, message: "Failed to update article." },
        { status: 500 }
      );
    }

    const updatedPost = await dbGetBlogPostById(id);

    return NextResponse.json({
      success: true,
      message: "Article updated successfully.",
      data: updatedPost
    });
  } catch (error: any) {
    console.error("[API/blog/[id]] PUT error:", error);
    return NextResponse.json(
      { success: false, message: "Server error updating article." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const ok = await dbDeleteBlogPost(id);

    return NextResponse.json({
      success: ok,
      message: ok ? "Article deleted successfully." : "Failed to delete article."
    });
  } catch (error: any) {
    console.error("[API/blog/[id]] DELETE error:", error);
    return NextResponse.json(
      { success: false, message: "Server error deleting article." },
      { status: 500 }
    );
  }
}
