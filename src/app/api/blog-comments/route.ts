import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/session";
import { dbGetBlogPostBySlug, dbGetComments, dbSaveComment } from "@/lib/mongodb";
import { withinSendLimit } from "@/lib/formGuard";
import type { IBlogComment, PublicBlogComment } from "@/models";

const EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// Comments with links are the usual spam, so none are allowed.
const LINK = /(https?:\/\/|www\.|\b[a-z0-9-]+\.(com|net|org|io|xyz|ru|top|info|biz|pk|co)\b)/i;

const toPublic = (c: IBlogComment): PublicBlogComment => ({ id: c.id, name: c.name, message: c.message, createdAt: c.createdAt });

// GET ?slug=<post>: visible comments for an article. Staff: ?all=true lists every comment.
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  if (params.get("all") === "true") {
    if (!isAdmin(request)) return NextResponse.json({ success: false, message: "Not authorised." }, { status: 401 });
    const all = await dbGetComments();
    return NextResponse.json({ success: true, data: all.reverse() });
  }
  const slug = params.get("slug");
  if (!slug) return NextResponse.json({ success: false, message: "Missing article." }, { status: 400 });
  const comments = await dbGetComments({ postSlug: slug, status: "visible" });
  return NextResponse.json({ success: true, data: comments.map(toPublic) });
}

// POST: a reader adds a comment. It shows straight away; staff can hide or delete it.
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));

  // Honeypot: bots fill the hidden field; pretend it worked.
  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ success: true, data: null });
  }

  const slug = String(body.slug ?? "").trim();
  const name = String(body.name ?? "").trim().replace(/\s+/g, " ");
  const email = String(body.email ?? "").trim().toLowerCase();
  const message = String(body.message ?? "").trim();

  if (!name || name.length > 60) return NextResponse.json({ success: false, message: "Please enter your name (up to 60 characters)." }, { status: 400 });
  if (!EMAIL.test(email) || email.length > 120) return NextResponse.json({ success: false, message: "Please enter a valid email address. It won't be shown." }, { status: 400 });
  if (message.length < 2 || message.length > 1500) return NextResponse.json({ success: false, message: "Please write a comment of up to 1,500 characters." }, { status: 400 });
  if (LINK.test(name) || LINK.test(message)) return NextResponse.json({ success: false, message: "Please remove web links from your comment." }, { status: 400 });

  const post = await dbGetBlogPostBySlug(slug);
  if (!post || post.status !== "published") return NextResponse.json({ success: false, message: "Article not found." }, { status: 404 });

  if (!(await withinSendLimit("blog-comment", request.headers))) {
    return NextResponse.json({ success: false, message: "You have posted several comments in a short time. Please wait a few minutes." }, { status: 429 });
  }

  const comment: IBlogComment = {
    id: `cmt-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    postSlug: post.slug,
    postTitle: post.title,
    name,
    email,
    message,
    status: "visible",
    createdAt: new Date().toISOString(),
  };
  await dbSaveComment(comment);
  return NextResponse.json({ success: true, data: toPublic(comment) }, { status: 201 });
}
