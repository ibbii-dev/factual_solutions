import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Quote } from "lucide-react";
import { SITE_NAME, SITE_URL, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { dbGetCaseStudies, dbGetCaseStudyBySlug } from "@/lib/mongodb";
import { lineShortName } from "@/data/servicePages";
import PageHeader from "@/components/ui/PageHeader";

export const revalidate = 600;

async function getStudy(slug: string) {
  const study = await dbGetCaseStudyBySlug(slug);
  return study && study.status === "published" ? study : null;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const study = await getStudy(params.slug);
  if (!study) return {};
  return pageMetadata({ title: `${study.title} | Case Study`, description: study.summary, path: `/case-studies/${study.slug}` });
}

const check = (
  <span className="fs-check mt-1">
    <svg viewBox="0 0 12 12" className="w-2.5 h-2.5" aria-hidden="true">
      <path d="M2.5 6.2 5 8.5 9.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
);

const paragraphs = (text: string) => text.split(/\n\s*\n|\n/).map((p) => p.trim()).filter(Boolean);

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  const study = await getStudy(params.slug);
  if (!study) notFound();

  const others = (await dbGetCaseStudies({ status: "published" })).filter((c) => c.id !== study.id).slice(0, 3);
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Case studies", href: "/case-studies" },
    { name: study.title, href: `/case-studies/${study.slug}` },
  ];
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title,
    description: study.summary,
    datePublished: study.publishedAt,
    image: study.coverImage ? (study.coverImage.startsWith("/") ? `${SITE_URL}${study.coverImage}` : study.coverImage) : undefined,
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/case-studies/${study.slug}`,
  };
  const h2 = "text-2xl font-bold font-display text-ink dark:text-white";
  const body = "text-base sm:text-[17px] text-slate-700 dark:text-slate-300 leading-relaxed";

  return (
    <div className="pb-20 sm:pb-28 text-ink dark:text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(crumbs.map((c) => ({ name: c.name, path: c.href })))) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader crumbs={crumbs} eyebrow={`${study.industry} · ${lineShortName(study.serviceLine)}`} title={study.title} lede={study.summary}>
          {study.metrics.length > 0 && (
            <dl className="flex flex-wrap justify-center gap-3">
              {study.metrics.map((m) => (
                <div key={m.label} className="fs-card px-5 py-3 text-center min-w-[9rem]">
                  <dd className="font-display text-2xl font-extrabold text-navy dark:text-steel-light">{m.value}</dd>
                  <dt className="text-[12px] text-slate-500 dark:text-slate-400">{m.label}</dt>
                </div>
              ))}
            </dl>
          )}
        </PageHeader>

        {study.coverImage && (
          <figure className="max-w-5xl mx-auto mb-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={study.coverImage} alt={study.coverImageAlt || ""} className="w-full aspect-[16/8] object-cover rounded-3xl shadow-lift" />
          </figure>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 space-y-6">
            <section aria-labelledby="challenge" className="fs-card p-6 sm:p-8 space-y-4">
              <h2 id="challenge" className={h2}>The challenge</h2>
              {paragraphs(study.challenge).map((p) => <p key={p} className={body}>{p}</p>)}
            </section>
            <section aria-labelledby="approach" className="fs-card p-6 sm:p-8 space-y-4">
              <h2 id="approach" className={h2}>Our approach</h2>
              {paragraphs(study.approach).map((p) => <p key={p} className={body}>{p}</p>)}
            </section>
            <section aria-labelledby="results" className="fs-card p-6 sm:p-8 space-y-4">
              <h2 id="results" className={h2}>Results</h2>
              <ul className="space-y-3">
                {study.results.map((r) => (
                  <li key={r} className="flex items-start gap-3 rounded-xl bg-paper dark:bg-night-900/60 border border-paper-line dark:border-white/10 p-4 text-[15px] text-ink dark:text-white">
                    {check}
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </section>
            {study.testimonial && (
              <figure className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0E1A38] via-[#1A2756] to-[#25346B] text-white p-8 sm:p-10 shadow-lift">
                <div aria-hidden="true" className="absolute top-0 inset-x-0 h-1 bg-brand-tri" />
                <Quote className="w-8 h-8 text-steel mb-4" aria-hidden="true" />
                <blockquote className="text-xl sm:text-2xl font-display font-bold leading-snug">&ldquo;{study.testimonial.quote}&rdquo;</blockquote>
                {(study.testimonial.name || study.testimonial.role) && (
                  <figcaption className="mt-5 text-sm text-slate-200">
                    {study.testimonial.name}
                    {study.testimonial.name && study.testimonial.role && " · "}
                    {study.testimonial.role}
                  </figcaption>
                )}
              </figure>
            )}
          </div>

          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            <div className="fs-card p-6">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400 mb-4">At a glance</h2>
              <dl className="space-y-3 text-[15px]">
                <div><dt className="text-slate-500 dark:text-slate-400 text-sm">Client</dt><dd className="font-semibold">{study.client}</dd></div>
                <div><dt className="text-slate-500 dark:text-slate-400 text-sm">Industry</dt><dd className="font-semibold">{study.industry}</dd></div>
                <div>
                  <dt className="text-slate-500 dark:text-slate-400 text-sm">Service</dt>
                  <dd><Link href={`/services/${study.serviceLine}`} className="font-semibold text-navy dark:text-steel-light hover:underline underline-offset-4">{lineShortName(study.serviceLine)}</Link></dd>
                </div>
                {study.duration && <div><dt className="text-slate-500 dark:text-slate-400 text-sm">Engagement</dt><dd className="font-semibold">{study.duration}</dd></div>}
              </dl>
            </div>
            <div className="fs-card p-6 space-y-4">
              <h2 className="text-xl font-bold font-display">Facing something similar?</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">Tell us what you want to improve and we&apos;ll arrange a short call.</p>
              <Link href={`/contact?topic=${study.serviceLine}`} className="btn-primary w-full">
                Talk to us
                <ArrowRight className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </div>

        {others.length > 0 && (
          <section aria-labelledby="more" className="mt-16">
            <div className="flex items-end justify-between gap-4 mb-6">
              <h2 id="more" className="text-2xl sm:text-3xl font-extrabold tracking-[-0.02em]">More case studies</h2>
              <Link href="/case-studies" className="link-arrow text-[14px] text-navy dark:text-steel-light shrink-0">All case studies</Link>
            </div>
            <ul className="grid md:grid-cols-3 gap-5">
              {others.map((c) => (
                <li key={c.id}>
                  <Link href={`/case-studies/${c.slug}`} className="group fs-card fs-card-hover h-full flex flex-col gap-3 p-6">
                    <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-rust dark:text-rust-light">{c.industry}</span>
                    <span className="text-lg font-bold leading-snug group-hover:text-navy dark:group-hover:text-steel-light transition-colors">{c.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
