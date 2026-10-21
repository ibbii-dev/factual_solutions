import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/session";
import { dbDeleteComment, dbGetCommentById, dbSetCommentStatus } from "@/lib/mongodb";

// PATCH { status: "visible" | "hidden" }: staff show or hide a comment.
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const body = await request.json().catch(() => ({}));
  if (body.status !== "visible" && body.status !== "hidden") {
    return NextResponse.json({ success: false, message: "Unknown status." }, { status: 400 });
  }
  if (!(await dbGetCommentById(params.id))) return NextResponse.json({ success: false, message: "Comment not found." }, { status: 404 });
  await dbSetCommentStatus(params.id, body.status);
  return NextResponse.json({ success: true, message: body.status === "hidden" ? "Comment hidden." : "Comment shown." });
}

// DELETE: staff remove a comment for good.
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  if (!(await dbGetCommentById(params.id))) return NextResponse.json({ success: false, message: "Comment not found." }, { status: 404 });
  await dbDeleteComment(params.id);
  return NextResponse.json({ success: true, message: "Comment deleted." });
}
