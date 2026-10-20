import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_NAME, SITE_URL, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { HowWeWork, ServiceCard } from "@/components/services/ServiceParts";
import PageHero from "@/components/layout/PageHero";
import {
  allServices,
  lineById,
  lineShortName,
  lines,
  phasesForLine,
  relatedServices,
  serviceById,
  servicesInLine,
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

function LinePage({ line }: { line: ServicePillar }) {
  const services = servicesInLine(line.id);
  const otherLines = lines.filter((l) => l.id !== line.id);
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "What we do", href: "/services" },
    { name: lineShortName(line.id), href: `/services/${line.id}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs.map((c) => ({ name: c.name, path: c.href })))} />
      <PageHero crumbs={crumbs} eyebrow={line.title} title={line.tagline} lede={line.intro}>
        <Link href={`/contact?topic=${line.id}`} className="btn-primary !bg-deep-action">
          Discuss your needs
        </Link>
      </PageHero>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 flex flex-col gap-14">
        <section aria-label={`${line.title} services`}>
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s) => (
              <li key={s.id}>
                <ServiceCard service={s} />
              </li>
            ))}
            <li className="rounded-[1.75rem] bg-band p-7 flex flex-col justify-center gap-3">
              <h2 className="text-lg font-display text-heading">Not sure which fits?</h2>
              <p className="text-small text-muted">Tell us what you want to improve and we&apos;ll point you to the right service.</p>
              <Link href={`/contact?topic=${line.id}`} className="btn-secondary self-start min-h-[44px] text-small">
                Discuss your needs
              </Link>
            </li>
          </ul>
        </section>

        <HowWeWork phases={phasesForLine(line.id)} />

        <nav aria-label="Other service lines" className="flex flex-col sm:flex-row gap-3">
          {otherLines.map((l) => (
            <Link key={l.id} href={`/services/${l.id}`} className="flex-1 rounded-xl border border-line p-5 hover:border-primary transition-colors">
              <span className="text-small text-muted">Also see</span>
              <span className="block font-display text-lg text-heading">{l.title} →</span>
            </Link>
          ))}
        </nav>
      </div>
    </>
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

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs.map((c) => ({ name: c.name, path: c.href })))} />
      <JsonLd data={serviceJsonLd} />
      <PageHero
        crumbs={crumbs}
        eyebrow={lineShortName(line.id)}
        title={service.title}
        lede={service.fullDescription}
        aside={
          <div className="fs-glass rounded-3xl p-6 sm:p-7 flex flex-col gap-3">
            <p className="text-label uppercase text-on-deep-accent">Ideal for</p>
            <p className="text-body text-on-deep">{service.idealFor}</p>
            <p className="text-small text-on-deep-muted">{service.duration}</p>
          </div>
        }
      >
        <Link href={`/contact?topic=${line.id}`} className="btn-primary !bg-deep-action">
          Discuss this service
        </Link>
      </PageHero>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 flex flex-col gap-14">
        <section aria-labelledby="included" className="flex flex-col gap-5">
          <h2 id="included" className="text-h2 text-heading">What&apos;s included</h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {service.deliverables.map((d) => (
              <li key={d} className="flex gap-3 rounded-xl bg-surface p-4">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="w-5 h-5 shrink-0 mt-0.5 text-primary" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="m5 12 5 5L20 7" />
                </svg>
                <span className="text-ink">{d}</span>
              </li>
            ))}
          </ul>
        </section>

        <HowWeWork phases={service.executionPhases ?? phasesForLine(line.id)} />

        {related.length > 0 && (
          <section aria-labelledby="related" className="flex flex-col gap-5">
            <h2 id="related" className="text-h3 text-heading">Related services</h2>
            <ul className="grid md:grid-cols-3 gap-4">
              {related.map((r) => (
                <li key={r.id}>
                  <Link href={`/services/${r.id}`} className="h-full flex flex-col gap-1 rounded-xl border border-line p-5 hover:border-primary transition-colors">
                    <span className="font-display text-lg text-heading">{r.title}</span>
                    <span className="text-small text-muted">{lineShortName(r.category)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </>
  );
}
