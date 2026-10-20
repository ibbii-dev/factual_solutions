import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { caseStudies } from "@/data/caseStudies";
import { lineShortName } from "@/data/servicePages";
import PageHero, { SectionLabel } from "@/components/layout/PageHero";

export const metadata: Metadata = pageMetadata({
  title: "Case Studies",
  description: "How Factual Solutions helps organizations improve through consulting, training and ERP & digital transformation.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Case studies", path: "/case-studies" }])) }}
      />
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Case studies", href: "/case-studies" }]}
        eyebrow="Case studies"
        title="Improvement you can measure."
        lede="Real engagements: the challenge, how we approached it, and what changed."
      />

      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {caseStudies.length === 0 ? (
            <div data-reveal className="grid lg:grid-cols-12 gap-8 items-center rounded-[2rem] border border-line bg-surface p-8 sm:p-12">
              <div className="lg:col-span-7 flex flex-col gap-4">
                <SectionLabel>Coming soon</SectionLabel>
                <h2 className="text-h1 text-heading">We&apos;re preparing detailed case studies.</h2>
                <p className="text-lede text-muted">
                  In the meantime, we&apos;re happy to talk you through relevant work from your industry on a short call.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Link href="/contact" className="btn-primary">Book a consultation</Link>
                  <Link href="/services" className="btn-secondary">See what we do</Link>
                </div>
              </div>
              <div aria-hidden="true" className="lg:col-span-5 grid grid-cols-2 gap-3">
                {["Challenge", "Approach", "Results", "Sustain"].map((label, i) => (
                  <span
                    key={label}
                    className={`rounded-2xl p-5 font-display text-lg ${i === 2 ? "fs-deep text-on-deep" : "bg-bg border border-line text-heading"}`}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <ul className="grid md:grid-cols-2 gap-6">
              {caseStudies.map((cs) => (
                <li key={cs.slug} data-reveal className="fs-lift rounded-[1.75rem] border border-line bg-bg p-7 sm:p-8 flex flex-col gap-4">
                  <p className="text-label uppercase text-accent">{cs.industry} · {lineShortName(cs.serviceLine)}</p>
                  <h2 className="text-h3 text-heading">{cs.title}</h2>
                  <p className="text-muted"><span className="font-semibold text-ink">Challenge: </span>{cs.challenge}</p>
                  <p className="text-muted"><span className="font-semibold text-ink">Approach: </span>{cs.approach}</p>
                  <ul className="flex flex-col gap-2 rounded-2xl bg-surface p-5">
                    {cs.results.map((r) => (
                      <li key={r} className="text-ink">{r}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
