import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdmin, requireAdmin } from "@/lib/session";
import { dbCaseStudySlugTaken, dbGetCaseStudies, dbSaveCaseStudy } from "@/lib/mongodb";
import { parseCaseStudy } from "@/lib/caseStudyInput";

// GET: published case studies (staff can add ?all=true to include drafts).
export async function GET(request: NextRequest) {
  const all = request.nextUrl.searchParams.get("all") === "true";
  if (all && !isAdmin(request)) {
    return NextResponse.json({ success: false, message: "Not authorised." }, { status: 401 });
  }
  const data = await dbGetCaseStudies(all ? undefined : { status: "published" });
  return NextResponse.json({ success: true, count: data.length, data });
}

// POST: staff add a case study.
export async function POST(request: NextRequest) {
  const denied = requireAdmin(request);
  if (denied) return denied;

  const body = await request.json().catch(() => null);
  const { data, error } = parseCaseStudy(body ?? {});
  if (!data) return NextResponse.json({ success: false, message: error }, { status: 400 });
  if (await dbCaseStudySlugTaken(data.slug)) {
    return NextResponse.json({ success: false, message: "Another case study already uses this web address. Change the title or address." }, { status: 409 });
  }

  const saved = await dbSaveCaseStudy({
    ...data,
    id: `case-${Date.now()}`,
    publishedAt: new Date().toISOString().slice(0, 10),
  });
  revalidatePath("/case-studies");
  revalidatePath(`/case-studies/${saved.slug}`);
  return NextResponse.json({ success: true, message: data.status === "draft" ? "Draft saved." : "Case study published.", data: saved }, { status: 201 });
}
