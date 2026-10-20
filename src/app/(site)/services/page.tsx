import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import PageHero, { SectionLabel } from "@/components/layout/PageHero";
import { lines, servicesInLine } from "@/data/servicePages";
import { serviceLines } from "@/data/navigation";

export const metadata: Metadata = pageMetadata({
  title: "What We Do: Consulting, Training and ERP & Digital",
  description:
    "Consulting, training and ERP & digital transformation from Factual Solutions: operational excellence, strategy, quality, Lean Six Sigma training and ERPNext implementation.",
  path: "/services",
});

// The navy mark is lifted so it also shows on the deep navy tile.
const MARK: Record<string, string> = { navy: "bg-[rgb(var(--c-glow-navy))]", sky: "bg-piece-sky", brick: "bg-piece-brick" };

// Each line gets its own tone so the three read as distinct blocks.
const TONE = [
  { box: "fs-deep", title: "text-on-deep", text: "text-on-deep-muted", item: "bg-on-deep/[0.07] hover:bg-on-deep/[0.13] border border-on-deep/10", itemTitle: "text-on-deep", itemText: "text-on-deep-muted", button: "border border-on-deep/40 text-on-deep hover:border-on-deep", onDeep: true },
  { box: "bg-band", title: "text-heading", text: "text-muted", item: "bg-bg hover:shadow-lift", itemTitle: "text-heading", itemText: "text-muted", button: "border border-primary/40 text-primary hover:border-primary", onDeep: false },
  { box: "border border-line bg-bg", title: "text-heading", text: "text-muted", item: "bg-surface hover:bg-band", itemTitle: "text-heading", itemText: "text-muted", button: "border border-primary/40 text-primary hover:border-primary", onDeep: false },
];

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "What we do", path: "/services" }])) }}
      />
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "What we do", href: "/services" }]}
        eyebrow="What we do"
        title="Consulting, training and systems that work together."
        lede="Consulting identifies what needs to change, training builds the capability to change it, and the right systems make the better way of working easy to run."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 flex flex-col gap-6">
        {lines.map((line, i) => {
          const nav = serviceLines.find((l) => l.id === line.id);
          const t = TONE[i % TONE.length];
          return (
            <section
              key={line.id}
              data-reveal
              aria-labelledby={`line-${line.id}`}
              className={`${t.box} rounded-[2rem] p-7 sm:p-10 grid lg:grid-cols-12 gap-8 lg:gap-12`}
            >
              {t.onDeep && <div aria-hidden="true" className="fs-glow fs-glow-navy w-[34rem] h-[34rem] -right-40 -top-56" />}
              <div className="lg:col-span-5 flex flex-col gap-3">
                <span aria-hidden="true" className={`w-9 h-1.5 rounded-full ${MARK[nav?.piece ?? "navy"]}`} />
                <SectionLabel onDeep={t.onDeep}>{String(i + 1).padStart(2, "0")} · Service line</SectionLabel>
                <h2 id={`line-${line.id}`} className={`text-h1 ${t.title}`}>{line.title}</h2>
                <p className={`text-lede ${t.text}`}>{line.tagline}</p>
                <Link href={`/services/${line.id}`} className={`self-start mt-3 inline-flex items-center min-h-[48px] px-6 rounded-full font-semibold transition-colors ${t.button}`}>
                  Explore {nav?.title ?? line.title} →
                </Link>
              </div>
              <ul className="lg:col-span-7 grid sm:grid-cols-2 gap-3 content-start">
                {servicesInLine(line.id).map((s) => (
                  <li key={s.id}>
                    <Link href={`/services/${s.id}`} className={`h-full flex flex-col gap-1.5 rounded-2xl p-5 transition-all ${t.item}`}>
                      <span className={`font-display text-lg ${t.itemTitle}`}>{s.title}</span>
                      <span className={`text-small ${t.itemText}`}>{s.shortDescription}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </>
  );
}
