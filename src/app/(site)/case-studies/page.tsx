import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ClipboardList, LineChart, Repeat, Search } from "lucide-react";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { dbGetCaseStudies } from "@/lib/mongodb";
import { lineShortName } from "@/data/servicePages";
import PageHeader from "@/components/ui/PageHeader";
import { PIECE } from "@/components/services/linePieces";

export const metadata: Metadata = pageMetadata({
  title: "Case Studies",
  description: "How Factual Solutions helps organizations improve through consulting, training and ERP & digital transformation.",
  path: "/case-studies",
});

// Case studies are posted from the admin panel; saving one refreshes this page straight away.
export const revalidate = 600;

const STEPS = [
  { label: "Challenge", Icon: Search, tile: "bg-navy" },
  { label: "Approach", Icon: ClipboardList, tile: "bg-steel text-navy" },
  { label: "Results", Icon: LineChart, tile: "bg-rust" },
  { label: "Sustain", Icon: Repeat, tile: "bg-navy" },
];

export default async function CaseStudiesPage() {
  const studies = await dbGetCaseStudies({ status: "published" });

  return (
    <div className="pb-20 sm:pb-24 text-ink dark:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Case studies", path: "/case-studies" }])) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Case studies"
          title="Improvement you can measure"
          lede="Real engagements: the challenge, how we approached it, and what changed."
        />

        {studies.length === 0 ? (
          <section data-reveal aria-labelledby="coming-soon" className="fs-card p-8 sm:p-12 grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              <p className="fs-label">Coming soon</p>
              <h2 id="coming-soon" className="text-3xl sm:text-[2.3rem] font-extrabold leading-[1.1] text-ink dark:text-white">
                We&apos;re preparing detailed case studies
              </h2>
              <p className="lede text-slate-600 dark:text-slate-300">
                In the meantime, we&apos;re happy to talk you through relevant work from your industry on a short call.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link href="/contact" className="btn-primary">
                  Book a consultation
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
                </Link>
                <Link href="/services" className="btn-secondary">See what we do</Link>
              </div>
            </div>
            <ol aria-label="How each case study is written" className="lg:col-span-5 grid grid-cols-2 gap-3">
              {STEPS.map(({ label, Icon, tile }) => (
                <li key={label} className="rounded-2xl bg-paper dark:bg-night-900/60 border border-paper-line dark:border-white/10 p-5 flex flex-col gap-3">
                  <span className={`fs-icon !w-10 !h-10 ${tile}`}><Icon className="w-4 h-4" aria-hidden="true" /></span>
                  <span className="font-display font-bold text-ink dark:text-white">{label}</span>
                </li>
              ))}
            </ol>
          </section>
        ) : (
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {studies.map((cs, i) => {
              const piece = PIECE[cs.serviceLine];
              const Icon = piece.Icon;
              return (
                <li key={cs.id} data-reveal style={{ "--d": `${(i % 3) * 90}ms` } as React.CSSProperties}>
                  <article className="group fs-card fs-card-hover fs-topbar h-full flex flex-col overflow-hidden" style={{ "--piece": piece.color } as React.CSSProperties}>
                    {cs.coverImage && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={cs.coverImage} alt={cs.coverImageAlt || ""} loading="lazy" className="w-full aspect-[16/9] object-cover" />
                    )}
                    <div className="p-6 flex flex-col gap-4 flex-1">
                      <div className="flex items-center gap-3">
                        <span className={`fs-icon !w-10 !h-10 ${piece.tile}`}><Icon className="w-4 h-4" aria-hidden="true" /></span>
                        <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-rust dark:text-rust-light">
                          {cs.industry} · {lineShortName(cs.serviceLine)}
                        </span>
                      </div>
                      <h2 className="text-[1.2rem] font-bold leading-snug text-ink dark:text-white">
                        <Link href={`/case-studies/${cs.slug}`} className="hover:text-navy dark:hover:text-steel-light transition-colors">{cs.title}</Link>
                      </h2>
                      <p className="text-[14px] text-slate-600 dark:text-slate-300 leading-relaxed">{cs.summary}</p>
                      {cs.metrics.length > 0 && (
                        <dl className="grid grid-cols-3 gap-2 rounded-xl bg-paper dark:bg-night-900/60 border border-paper-line dark:border-white/10 p-3">
                          {cs.metrics.map((m) => (
                            <div key={m.label} className="text-center">
                              <dd className="font-display text-lg font-extrabold text-navy dark:text-steel-light">{m.value}</dd>
                              <dt className="text-[11px] leading-tight text-slate-500 dark:text-slate-400">{m.label}</dt>
                            </div>
                          ))}
                        </dl>
                      )}
                      <Link href={`/case-studies/${cs.slug}`} className="mt-auto link-arrow text-[14px] text-navy dark:text-steel-light" aria-label={`Read the case study: ${cs.title}`}>
                        Read the case study
                        <ArrowRight className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
