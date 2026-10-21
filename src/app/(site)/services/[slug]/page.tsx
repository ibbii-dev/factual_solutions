import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { SITE_NAME, SITE_URL, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import PageHeader from "@/components/ui/PageHeader";
import ServiceCatalog from "@/components/services/ServiceCatalog";
import ApproachPanel from "@/components/services/ApproachPanel";
import { contactLinks } from "@/data/navigation";
import {
  allServices,
  lineById,
  lineShortName,
  lines,
  phasesForLine,
  relatedServices,
  serviceById,
} from "@/data/servicePages";
import type { ServiceItem, ServicePillar } from "@/data/servicesData";

// One route serves both kinds of page: /services/consulting (a service line) and
// /services/operational-excellence (one service; these addresses match the old site).

export function generateStaticParams() {
  return [...lines.map((l) => ({ slug: l.id })), ...allServices.map((s) => ({ slug: s.id }))];
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const line = lineById(params.slug);
  if (line) {
    return pageMetadata({ title: `${line.title} Services`, description: line.intro, path: `/services/${line.id}` });
  }
  const service = serviceById(params.slug);
  if (service) {
    return pageMetadata({ title: service.title, description: service.shortDescription, path: `/services/${service.id}` });
  }
  return {};
}

export default function ServiceSlugPage({ params }: { params: { slug: string } }) {
  const line = lineById(params.slug);
  if (line) return <LinePage line={line} />;
  const service = serviceById(params.slug);
  if (service) return <ServicePage service={service} />;
  notFound();
}

function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

const PHASE_TILE = ["bg-navy", "bg-steel !text-navy", "bg-rust"];

/** The three-step way of working, as a numbered card. */
function HowWeWork({ phases }: { phases: { phase: string; title: string; desc: string }[] }) {
  return (
    <section aria-labelledby="how-we-work" className="fs-card p-6 sm:p-8 space-y-6">
      <h2 id="how-we-work" className="text-2xl font-bold font-display text-ink dark:text-white">How we work</h2>
      <ol className="space-y-6">
        {phases.map((p, i) => (
          <li key={p.phase} className="flex gap-4">
            <span aria-hidden="true" className={`fs-icon !w-11 !h-11 font-display font-bold text-sm ${PHASE_TILE[i % 3]}`}>{p.phase}</span>
            <div className="space-y-1">
              <h3 className="text-lg font-bold font-display text-ink dark:text-white">{p.title}</h3>
              <p className="text-[15px] text-slate-700 dark:text-slate-300 leading-relaxed">{p.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function LinePage({ line }: { line: ServicePillar }) {
  const otherLines = lines.filter((l) => l.id !== line.id);
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "What we do", href: "/services" },
    { name: lineShortName(line.id), href: `/services/${line.id}` },
  ];

  return (
    <div className="pb-20 sm:pb-24 text-ink dark:text-white">
      <JsonLd data={breadcrumbJsonLd(crumbs.map((c) => ({ name: c.name, path: c.href })))} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader crumbs={crumbs} eyebrow={line.title} title={line.tagline} lede={line.intro}>
          <Link href={`/contact?topic=${line.id}`} className="btn-primary">
            Discuss your needs
            <ArrowRight className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
          </Link>
        </PageHeader>

        <ServiceCatalog only={line.id} />

        <div className="mb-16">
          <HowWeWork phases={phasesForLine(line.id)} />
        </div>

        <ApproachPanel />

        <nav aria-label="Other service lines" className="grid sm:grid-cols-2 gap-4">
          {otherLines.map((l) => (
            <Link key={l.id} href={`/services/${l.id}`} className="group fs-card fs-card-hover p-6 flex items-center justify-between gap-4">
              <span>
                <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Also see</span>
                <span className="block text-xl font-bold font-display text-ink dark:text-white">{l.title}</span>
              </span>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-accent rtl:rotate-180 shrink-0" aria-hidden="true" />
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

function ServicePage({ service }: { service: ServiceItem }) {
  const line = lineById(service.category)!;
  const related = relatedServices(service);
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "What we do", href: "/services" },
    { name: lineShortName(line.id), href: `/services/${line.id}` },
    { name: service.title, href: `/services/${service.id}` },
  ];
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.fullDescription,
    serviceType: line.title,
    url: `${SITE_URL}/services/${service.id}`,
    provider: { "@type": "ProfessionalService", name: SITE_NAME, url: SITE_URL },
    areaServed: "Worldwide",
  };
  const h2 = "text-2xl font-bold font-display text-ink dark:text-white";
  const sectionCls = "fs-card p-6 sm:p-8 space-y-5";

  return (
    <div className="pb-20 sm:pb-28 text-ink dark:text-white">
      <JsonLd data={breadcrumbJsonLd(crumbs.map((c) => ({ name: c.name, path: c.href })))} />
      <JsonLd data={serviceJsonLd} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader crumbs={crumbs} eyebrow={line.title} title={service.title} lede={service.shortDescription}>
          <dl className="flex flex-wrap justify-center gap-3">
            <div className="fs-card px-5 py-3 text-start">
              <dt className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Format</dt>
              <dd className="font-semibold text-ink dark:text-white">{service.duration}</dd>
            </div>
            <div className="fs-card px-5 py-3 text-start">
              <dt className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Coverage</dt>
              <dd className="font-semibold text-ink dark:text-white">{service.deliverables.length} focus areas</dd>
            </div>
          </dl>
        </PageHeader>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 space-y-6">
            <section aria-labelledby="overview" className={sectionCls}>
              <h2 id="overview" className={h2}>Overview</h2>
              <p className="text-base sm:text-[17px] text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl">{service.fullDescription}</p>
              {service.tags.length > 0 && <p className="text-sm text-slate-500 dark:text-slate-400">{service.tags.join(" · ")}</p>}
            </section>

            <section aria-labelledby="included" className={sectionCls}>
              <h2 id="included" className={h2}>What this covers</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.deliverables.map((d, i) => (
                  <li key={d} className="flex gap-3 items-start rounded-xl bg-paper dark:bg-night-900/60 border border-paper-line dark:border-white/10 p-4 text-[15px] text-ink dark:text-white">
                    <span aria-hidden="true" className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-navy text-white text-xs font-bold shrink-0 dark:bg-steel dark:text-night-950">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </section>

            <HowWeWork phases={service.executionPhases ?? phasesForLine(line.id)} />

            <section aria-labelledby="ideal-for" className={sectionCls}>
              <h2 id="ideal-for" className={h2}>Who it&apos;s for</h2>
              <p className="text-base sm:text-[17px] text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl">{service.idealFor}</p>
            </section>
          </div>

          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            <div className="fs-card p-6 space-y-5">
              <div>
                <h2 className="text-xl font-bold text-ink dark:text-white font-display">Discuss this service</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                  Tell us what you want to improve and we&apos;ll arrange a short call with the right advisor.
                </p>
              </div>
              <Link href={`/contact?topic=${line.id}`} className="btn-primary w-full">
                Send us a message
                <ArrowRight className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
              </Link>
              <div className="grid grid-cols-2 gap-2.5">
                <a href={contactLinks.phoneHref} className="btn-secondary !px-3 text-sm">
                  <Phone className="w-4 h-4" aria-hidden="true" /> Call
                </a>
                <a href={contactLinks.whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-secondary !px-3 text-sm">
                  <MessageCircle className="w-4 h-4" aria-hidden="true" /> WhatsApp
                </a>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-accent shrink-0" aria-hidden="true" />
                Your information is kept strictly confidential.
              </p>
            </div>

            {related.length > 0 && (
              <nav aria-labelledby="related" className="fs-card p-6 space-y-3">
                <h2 id="related" className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Related services</h2>
                <ul className="space-y-2">
                  {related.map((r) => (
                    <li key={r.id}>
                      <Link href={`/services/${r.id}`} className="group flex items-center justify-between gap-3 rounded-xl border border-paper-line dark:border-white/10 bg-paper dark:bg-night-900/60 px-4 py-3 text-[14px] font-semibold text-ink dark:text-white hover:border-navy/30 hover:text-navy dark:hover:text-steel-light transition-colors">
                        <span>{r.title}</span>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-accent rtl:rotate-180 shrink-0" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
