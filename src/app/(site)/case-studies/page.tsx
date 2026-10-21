import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ClipboardList, LineChart, Repeat, Search } from "lucide-react";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { caseStudies } from "@/data/caseStudies";
import { lineShortName } from "@/data/servicePages";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = pageMetadata({
  title: "Case Studies",
  description: "How Factual Solutions helps organizations improve through consulting, training and ERP & digital transformation.",
  path: "/case-studies",
});

const STEPS = [
  { label: "Challenge", Icon: Search, tile: "bg-navy" },
  { label: "Approach", Icon: ClipboardList, tile: "bg-steel text-navy" },
  { label: "Results", Icon: LineChart, tile: "bg-rust" },
  { label: "Sustain", Icon: Repeat, tile: "bg-navy" },
];

export default function CaseStudiesPage() {
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

        {caseStudies.length === 0 ? (
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
          <ul className="grid md:grid-cols-2 gap-6">
            {caseStudies.map((cs) => (
              <li key={cs.slug} data-reveal className="fs-card fs-card-hover p-7 sm:p-8 flex flex-col gap-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-rust dark:text-rust-light">{cs.industry} · {lineShortName(cs.serviceLine)}</p>
                <h2 className="text-xl font-bold text-ink dark:text-white">{cs.title}</h2>
                <p className="text-slate-600 dark:text-slate-300"><span className="font-semibold text-ink dark:text-white">Challenge: </span>{cs.challenge}</p>
                <p className="text-slate-600 dark:text-slate-300"><span className="font-semibold text-ink dark:text-white">Approach: </span>{cs.approach}</p>
                <ul className="flex flex-col gap-2 rounded-xl bg-paper dark:bg-night-900/60 border border-paper-line dark:border-white/10 p-5">
                  {cs.results.map((r) => (
                    <li key={r} className="text-ink dark:text-white">{r}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
