import React from "react";
import Link from "next/link";
import type { ServiceItem } from "@/data/servicesData";

/** Breadcrumb trail; the last item is the current page. */
export function Breadcrumbs({ items }: { items: { name: string; href: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-small text-muted">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="text-ink">{item.name}</span>
              ) : (
                <>
                  <Link href={item.href} className="hover:text-heading underline-offset-4 hover:underline">{item.name}</Link>
                  <span aria-hidden="true">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Soft-blue intro band used at the top of the services pages. */
export function PageBand({ children, aside }: { children: React.ReactNode; aside?: React.ReactNode }) {
  return (
    <section className="bg-band">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 grid lg:grid-cols-12 gap-8 lg:gap-10">
        <div className={`flex flex-col gap-4 ${aside ? "lg:col-span-7" : "lg:col-span-9"}`}>{children}</div>
        {aside && <div className="lg:col-span-5 lg:self-end">{aside}</div>}
      </div>
    </section>
  );
}

// Each service line keeps its logo-piece colour (as in the Services menu).
const LINE_MARK: Record<ServiceItem["category"], string> = {
  consulting: "bg-piece-navy",
  training: "bg-piece-sky",
  digital: "bg-piece-brick",
};

/** One service as a card linking to its own page. */
export function ServiceCard({ service }: { service: ServiceItem }) {
  return (
    <Link href={`/services/${service.id}`} className="group fs-card fs-card-hover h-full flex flex-col gap-3 p-6">
      <span aria-hidden="true" className={`w-7 h-1 rounded-full ${LINE_MARK[service.category]}`} />
      <h3 className="text-h3 text-heading">{service.title}</h3>
      <p className="text-muted">{service.shortDescription}</p>
      <ul className="flex flex-wrap gap-1.5 pt-0.5" aria-label="Topics">
        {service.tags.slice(0, 3).map((tag) => (
          <li key={tag} className="text-xs font-semibold px-2.5 py-1 rounded-full bg-surface text-heading">{tag}</li>
        ))}
      </ul>
      <span className="mt-auto pt-1.5 text-small font-semibold text-primary">
        View service <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span>
      </span>
    </Link>
  );
}

/** The three-step way of working for a service line. */
export function HowWeWork({ phases }: { phases: { phase: string; title: string; desc: string }[] }) {
  return (
    <section aria-labelledby="how-we-work" className="rounded-2xl border border-line p-6 sm:p-8 flex flex-col gap-6">
      <h2 id="how-we-work" className="text-h2 text-heading">How we work</h2>
      <ol className="grid md:grid-cols-3 gap-6">
        {phases.map((p) => (
          <li key={p.phase} className="flex flex-col gap-2">
            <span aria-hidden="true" className="font-display text-3xl leading-none text-primary/70">{p.phase}</span>
            <h3 className="text-lg font-display text-heading">{p.title}</h3>
            <p className="text-small text-muted">{p.desc}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
