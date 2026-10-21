"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Search, ArrowRight, Compass, GraduationCap, MonitorCog } from "lucide-react";
import { getServicePillars, getServices, ServiceCategory, ServiceItem } from "@/data/servicesData";

export const PIECE: Record<ServiceCategory, { color: string; tile: string; Icon: typeof Compass }> = {
  consulting: { color: "#25346B", tile: "bg-navy", Icon: Compass },
  training: { color: "#9BB3D9", tile: "bg-steel text-navy", Icon: GraduationCap },
  digital: { color: "#9B391E", tile: "bg-rust", Icon: MonitorCog },
};

const check = (
  <span className="fs-check mt-0.5">
    <svg viewBox="0 0 12 12" className="w-2.5 h-2.5" aria-hidden="true">
      <path d="M2.5 6.2 5 8.5 9.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
);

/**
 * The service catalogue in the classic card style. On /services it has line tabs and a
 * search; on a line page (`only`) it shows that line's services without the filters.
 * Server-rendered in full; ?line=training preselects a tab after load.
 */
export default function ServiceCatalog({ only }: { only?: ServiceCategory }) {
  const pillars = getServicePillars();
  const services = getServices();
  const [activeTab, setActiveTab] = useState<ServiceCategory | "all">(only ?? "all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (only) return;
    const line = new URLSearchParams(window.location.search).get("line");
    if (line === "consulting" || line === "training" || line === "digital") setActiveTab(line);
  }, [only]);

  const q = query.trim().toLowerCase();
  const matches = (s: ServiceItem) =>
    !q ||
    s.title.toLowerCase().includes(q) ||
    s.shortDescription.toLowerCase().includes(q) ||
    s.deliverables.some((d) => d.toLowerCase().includes(q)) ||
    s.tags.some((t) => t.toLowerCase().includes(q));

  const visiblePillars = pillars.filter((p) => activeTab === "all" || p.id === activeTab);
  const totalVisible = visiblePillars.reduce((n, p) => n + services.filter((s) => s.category === p.id && matches(s)).length, 0);
  const tabs: { id: ServiceCategory | "all"; label: string }[] = [{ id: "all", label: "All services" }, ...pillars.map((p) => ({ id: p.id, label: p.title }))];

  return (
    <>
      {!only && (
        <div className="fs-card p-3 sm:p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-12">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by service line">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                aria-pressed={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 min-h-[44px] px-4 rounded-xl text-[14px] font-semibold transition-colors ${
                  activeTab === tab.id
                    ? "bg-navy text-white shadow-card dark:bg-steel dark:text-night-950"
                    : "text-slate-600 hover:bg-paper-deep hover:text-navy dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
                }`}
              >
                {tab.id !== "all" && <i className="w-2 h-2 rounded-full shrink-0" style={{ background: PIECE[tab.id].color }} aria-hidden="true" />}
                {tab.label}
              </button>
            ))}
          </div>
          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute start-4 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search services, e.g. Lean, ERP, KPIs"
              aria-label="Search services"
              className="fs-input !py-2.5 !ps-10 !pe-14"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute end-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500 hover:text-ink dark:hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}

      {totalVisible > 0 ? (
        <div className="space-y-16 sm:space-y-20 mb-20">
          {visiblePillars.map((pillar) => {
            const items = services.filter((s) => s.category === pillar.id && matches(s));
            if (items.length === 0) return null;
            const pIdx = pillars.findIndex((p) => p.id === pillar.id);
            const piece = PIECE[pillar.id];
            const PIcon = piece.Icon;
            return (
              <section key={pillar.id} id={pillar.id} aria-labelledby={`line-${pillar.id}`} className="scroll-mt-28">
                {!only && (
                  <div data-reveal className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 items-end mb-8">
                    <div className="lg:col-span-7 flex items-start gap-4">
                      <span className={`fs-icon !w-14 !h-14 !rounded-2xl ${piece.tile}`}><PIcon className="w-6 h-6" aria-hidden="true" /></span>
                      <div className="space-y-1.5">
                        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-rust dark:text-rust-light">Service line {String(pIdx + 1).padStart(2, "0")}</p>
                        <h2 id={`line-${pillar.id}`} className="text-3xl sm:text-[2.2rem] font-extrabold tracking-[-0.02em] text-ink dark:text-white">
                          <Link href={`/services/${pillar.id}`} className="hover:text-navy dark:hover:text-steel-light transition-colors">{pillar.title}</Link>
                        </h2>
                        <p className="text-[15px] font-semibold text-navy dark:text-steel-light">{pillar.tagline}</p>
                      </div>
                    </div>
                    <p className="lg:col-span-5 text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed">{pillar.intro}</p>
                  </div>
                )}
                {only && <h2 id={`line-${pillar.id}`} className="sr-only">{pillar.title} services</h2>}

                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {items.map((service, sIdx) => (
                    <li key={service.id} data-reveal style={{ "--d": `${(sIdx % 3) * 90}ms` } as React.CSSProperties}>
                      <article className="group fs-card fs-card-hover fs-topbar h-full flex flex-col gap-4 p-6" style={{ "--piece": piece.color } as React.CSSProperties}>
                        <div className="flex items-center justify-between">
                          <span className={`fs-icon ${piece.tile}`}><PIcon className="w-5 h-5" aria-hidden="true" /></span>
                          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                            {String(pIdx + 1).padStart(2, "0")}.{String(sIdx + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <h3 className="text-[1.2rem] font-bold leading-snug text-ink dark:text-white">
                          <Link href={`/services/${service.id}`} className="hover:text-navy dark:hover:text-steel-light transition-colors">{service.title}</Link>
                        </h3>
                        <p className="text-[14px] text-slate-600 dark:text-slate-300 leading-relaxed">{service.shortDescription}</p>
                        <ul className="rounded-xl bg-paper dark:bg-night-900/60 border border-paper-line dark:border-white/10 p-4 space-y-2">
                          {service.deliverables.map((d) => (
                            <li key={d} className="flex items-start gap-2.5 text-[13.5px] text-slate-700 dark:text-slate-300">{check}<span>{d}</span></li>
                          ))}
                        </ul>
                        <div className="mt-auto pt-2 flex items-center justify-between gap-3">
                          <Link href={`/services/${service.id}`} className="link-arrow text-[14px] text-navy dark:text-steel-light" aria-label={`View details: ${service.title}`}>
                            View details
                            <ArrowRight className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
                          </Link>
                          <Link href={`/contact?topic=${service.category}`} className="text-[13px] font-semibold text-slate-500 hover:text-rust dark:text-slate-400 dark:hover:text-rust-light" aria-label={`Enquire about ${service.title}`}>
                            Enquire
                          </Link>
                        </div>
                      </article>
                    </li>
                  ))}
                </ul>

                {pillar.id === "digital" && (
                  <aside data-reveal className="mt-6 fs-card p-6 sm:p-8 border-s-4 !border-s-rust space-y-3">
                    <h3 className="text-xl font-bold text-ink dark:text-white">Digital transformation, built around the business</h3>
                    <p className="text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed">
                      We don&apos;t digitise inefficient processes; we improve them first, then build the technology around them. Our
                      approach connects process improvement, ERP, workflow automation, data and people, so digital systems deliver
                      measurable operational value.
                    </p>
                  </aside>
                )}
              </section>
            );
          })}
        </div>
      ) : (
        <div className="fs-card p-10 mb-20 max-w-xl mx-auto text-center" role="status">
          <h3 className="text-2xl font-bold text-ink dark:text-white">No matching services</h3>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Try a different word, or show every service line.</p>
          <button type="button" onClick={() => { setQuery(""); setActiveTab("all"); }} className="mt-5 btn-secondary">
            Show all services
          </button>
        </div>
      )}
    </>
  );
}
