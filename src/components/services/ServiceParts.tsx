import React from "react";
import Link from "next/link";
import type { ServiceItem } from "@/data/servicesData";
import { SectionLabel } from "@/components/layout/PageHero";

// Each service line keeps its logo-piece colour (as in the What we do menu).
const LINE_MARK: Record<ServiceItem["category"], string> = {
  consulting: "bg-piece-navy",
  training: "bg-piece-sky",
  digital: "bg-piece-brick",
};

/** One service as a card linking to its own page. */
export function ServiceCard({ service }: { service: ServiceItem }) {
  return (
    <Link href={`/services/${service.id}`} className="fs-lift group h-full flex flex-col gap-3 rounded-[1.75rem] border border-line bg-bg p-7">
      <span aria-hidden="true" className={`w-9 h-1.5 rounded-full ${LINE_MARK[service.category]}`} />
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

/** The three-step way of working for a service line, on deep navy. */
export function HowWeWork({ phases }: { phases: { phase: string; title: string; desc: string }[] }) {
  return (
    <section aria-labelledby="how-we-work" data-reveal className="fs-deep fs-dots rounded-[2rem] p-8 sm:p-12 flex flex-col gap-10">
      <div aria-hidden="true" className="fs-glow fs-glow-navy w-[34rem] h-[34rem] -right-40 -top-56" />
      <div className="flex flex-col gap-3">
        <SectionLabel onDeep>How we work</SectionLabel>
        <h2 id="how-we-work" className="text-h2 text-on-deep">From diagnosis to daily practice</h2>
      </div>
      <ol className="grid md:grid-cols-3 gap-8">
        {phases.map((p) => (
          <li key={p.phase} className="flex flex-col gap-3">
            <span aria-hidden="true" className="font-display w-14 h-14 rounded-full bg-deep-surface border border-on-deep/20 inline-flex items-center justify-center text-lg text-on-deep">
              {p.phase}
            </span>
            <h3 className="text-h3 text-on-deep">{p.title}</h3>
            <p className="text-small text-on-deep-muted">{p.desc}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
