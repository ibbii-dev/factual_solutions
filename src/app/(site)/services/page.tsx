import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { Breadcrumbs, PageBand } from "@/components/services/ServiceParts";
import { lines, servicesInLine } from "@/data/servicePages";
import { serviceLines } from "@/data/navigation";

export const metadata: Metadata = pageMetadata({
  title: "Services: Consulting, Training and ERP & Digital",
  description:
    "Consulting, training and ERP & digital transformation from Factual Solutions: operational excellence, strategy, quality, Lean Six Sigma training and ERPNext implementation.",
  path: "/services",
});

const PIECE: Record<string, string> = { navy: "bg-piece-navy", sky: "bg-piece-sky", brick: "bg-piece-brick" };

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])) }}
      />
      <PageBand>
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Services", href: "/services" }]} />
        <h1 className="text-display text-heading">Consulting, training and systems that work together.</h1>
        <p className="text-lede text-muted max-w-2xl">
          Consulting identifies what needs to change, training builds the capability to change it, and the right systems make
          the better way of working easy to run.
        </p>
      </PageBand>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 flex flex-col gap-6">
        {lines.map((line) => {
          const nav = serviceLines.find((l) => l.id === line.id);
          const services = servicesInLine(line.id);
          return (
            <section key={line.id} aria-labelledby={`line-${line.id}`} className="fs-card p-6 sm:p-8 grid lg:grid-cols-12 gap-6 lg:gap-10">
              <div className="lg:col-span-5 flex flex-col gap-3">
                <span aria-hidden="true" className={`w-7 h-1 rounded-full ${PIECE[nav?.piece ?? "navy"]}`} />
                <h2 id={`line-${line.id}`} className="text-h2 text-heading">{line.title}</h2>
                <p className="text-lg font-display text-heading">{line.tagline}</p>
                <p className="text-muted">{line.intro}</p>
                <Link href={`/services/${line.id}`} className="btn-secondary self-start mt-2">
                  Explore {nav?.title ?? line.title}
                </Link>
              </div>
              <ul className="lg:col-span-7 grid sm:grid-cols-2 gap-3 content-start">
                {services.map((s) => (
                  <li key={s.id}>
                    <Link href={`/services/${s.id}`} className="h-full flex flex-col gap-1 rounded-xl bg-surface p-4 hover:bg-band transition-colors">
                      <span className="font-semibold text-heading">{s.title}</span>
                      <span className="text-small text-muted">{s.shortDescription}</span>
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
