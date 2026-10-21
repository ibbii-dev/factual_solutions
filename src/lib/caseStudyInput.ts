import type { ICaseStudy } from "@/models";

// Checks and cleans a case study sent from the admin panel (POST and PUT share it).

const LINES = ["consulting", "training", "digital"] as const;

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

const text = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);

/** Only http(s) links or site paths, so a pasted image address can't run script. */
function safeUrl(v: unknown): string | undefined {
  const s = text(v, 600);
  if (!s) return undefined;
  if (s.startsWith("/") && !s.startsWith("//")) return s;
  try {
    const u = new URL(s);
    return u.protocol === "https:" || u.protocol === "http:" ? u.toString() : undefined;
  } catch {
    return undefined;
  }
}

type Input = Omit<ICaseStudy, "id" | "publishedAt" | "createdAt" | "updatedAt" | "_id">;

export function parseCaseStudy(body: Record<string, unknown>): { data?: Input; error?: string } {
  const title = text(body.title, 160);
  const client = text(body.client, 160);
  const industry = text(body.industry, 80);
  const summary = text(body.summary, 400);
  const challenge = text(body.challenge, 4000);
  const approach = text(body.approach, 4000);
  const serviceLine = LINES.includes(body.serviceLine as (typeof LINES)[number])
    ? (body.serviceLine as ICaseStudy["serviceLine"])
    : undefined;

  const rawResults = Array.isArray(body.results) ? body.results : String(body.results ?? "").split("\n");
  const results = rawResults.map((r) => text(r, 300)).filter(Boolean).slice(0, 12);

  const rawMetrics = Array.isArray(body.metrics) ? body.metrics : [];
  const metrics = rawMetrics
    .map((m) => ({ value: text((m as { value?: unknown })?.value, 24), label: text((m as { label?: unknown })?.label, 80) }))
    .filter((m) => m.value && m.label)
    .slice(0, 3);

  const t = (body.testimonial ?? {}) as Record<string, unknown>;
  const quote = text(t.quote, 800);
  const testimonial = quote ? { quote, name: text(t.name, 100), role: text(t.role, 120) } : undefined;

  if (!title) return { error: "Please add a title." };
  if (!client) return { error: "Please add the client (or describe them if they stay anonymous)." };
  if (!industry) return { error: "Please choose an industry." };
  if (!serviceLine) return { error: "Please choose a service line." };
  if (!summary) return { error: "Please add a short summary." };
  if (!challenge || !approach) return { error: "Please describe the challenge and the approach." };
  if (results.length === 0) return { error: "Please add at least one result." };

  const slug = slugify(text(body.slug, 120) || title) || `case-${Date.now()}`;

  return {
    data: {
      title,
      slug,
      client,
      industry,
      serviceLine,
      summary,
      challenge,
      approach,
      results,
      metrics,
      testimonial,
      coverImage: safeUrl(body.coverImage),
      coverImageAlt: text(body.coverImageAlt, 200) || undefined,
      duration: text(body.duration, 60) || undefined,
      status: body.status === "draft" ? "draft" : "published",
    },
  };
}
