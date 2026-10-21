import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/session";
import { dbCaseStudySlugTaken, dbDeleteCaseStudy, dbGetCaseStudies, dbUpdateCaseStudy } from "@/lib/mongodb";
import { parseCaseStudy } from "@/lib/caseStudyInput";

async function findById(id: string) {
  return (await dbGetCaseStudies()).find((c) => c.id === id) ?? null;
}

// PUT: staff edit a case study.
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const denied = requireAdmin(request);
  if (denied) return denied;

  const existing = await findById(params.id);
  if (!existing) return NextResponse.json({ success: false, message: "Case study not found." }, { status: 404 });

  const body = await request.json().catch(() => null);
  const { data, error } = parseCaseStudy(body ?? {});
  if (!data) return NextResponse.json({ success: false, message: error }, { status: 400 });
  if (await dbCaseStudySlugTaken(data.slug, params.id)) {
    return NextResponse.json({ success: false, message: "Another case study already uses this web address." }, { status: 409 });
  }

  // Keep the original date; a draft published for the first time gets today's date.
  const publishedAt = existing.status === "draft" && data.status === "published" ? new Date().toISOString().slice(0, 10) : existing.publishedAt;
  await dbUpdateCaseStudy(params.id, { ...data, publishedAt });
  revalidatePath("/case-studies");
  revalidatePath(`/case-studies/${existing.slug}`);
  revalidatePath(`/case-studies/${data.slug}`);
  return NextResponse.json({ success: true, message: "Case study updated." });
}

// DELETE: staff remove a case study.
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const denied = requireAdmin(request);
  if (denied) return denied;

  const existing = await findById(params.id);
  if (!existing) return NextResponse.json({ success: false, message: "Case study not found." }, { status: 404 });
  await dbDeleteCaseStudy(params.id);
  revalidatePath("/case-studies");
  revalidatePath(`/case-studies/${existing.slug}`);
  return NextResponse.json({ success: true, message: "Case study deleted." });
}
