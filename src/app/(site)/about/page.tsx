import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE_NAME, SITE_URL, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { principalConsultant } from "@/data/companyData";
import {
  aboutIntro,
  aboutStats,
  industries,
  leadBio,
  leadCertifications,
  leadCredentialsShort,
  principles,
} from "@/data/aboutContent";
import PageHero, { SectionLabel } from "@/components/layout/PageHero";

export const metadata: Metadata = pageMetadata({
  title: "Who We Are",
  description:
    "Factual Solutions brings over 60 years of combined experience in Lean, strategy, operations and digital transformation. Meet lead consultant Qadeer Bhatti.",
  path: "/about",
});

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: principalConsultant.name,
  jobTitle: principalConsultant.role,
  image: `${SITE_URL}${principalConsultant.image}`,
  worksFor: { "@type": "ProfessionalService", name: SITE_NAME, url: SITE_URL },
  hasCredential: leadCertifications.map((name) => ({ "@type": "EducationalOccupationalCredential", name })),
};

// "Who we are" (About), person first, modern layer.
export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Who we are", path: "/about" }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />

      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Who we are", href: "/about" }]}
        eyebrow="Who we are"
        title="Practical experience. Transferable methods. Measurable improvement."
        lede={aboutIntro}
        aside={
          <figure className="relative max-w-sm w-full mx-auto lg:ms-auto lg:me-0">
            <Image
              src={principalConsultant.image}
              alt={`${principalConsultant.name}, ${principalConsultant.role}`}
              width={1024}
              height={1024}
              priority
              sizes="(min-width: 1024px) 24rem, 90vw"
              className="w-full aspect-[4/5] object-cover object-top rounded-[2rem]"
            />
            <figcaption className="absolute -left-4 sm:-left-8 bottom-8 rounded-2xl bg-bg shadow-lift px-5 py-4 flex flex-col">
              <span className="font-display text-lg text-heading">{principalConsultant.name}</span>
              <span className="text-small text-muted">{principalConsultant.role}</span>
              <span className="text-small text-muted">{leadCredentialsShort}</span>
            </figcaption>
          </figure>
        }
      />

      <section aria-label="In numbers" className="py-14 sm:py-16 border-b border-line">
        <dl className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-3 gap-4">
          {aboutStats.map((s, i) => (
            <div key={s.label} data-reveal style={{ "--d": `${i * 100}ms` } as React.CSSProperties} className={`rounded-[1.5rem] p-6 sm:p-7 flex flex-col gap-1 ${i === 0 ? "fs-deep" : "bg-band"}`}>
              <dt className={`order-last ${i === 0 ? "text-on-deep-muted" : "text-muted"}`}>{s.label}</dt>
              <dd className={`font-display text-5xl leading-none ${i === 0 ? "text-on-deep" : "text-heading"}`}>{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 flex flex-col gap-20 sm:gap-28">
        <section aria-labelledby="lead" className="grid lg:grid-cols-12 gap-10 lg:gap-14">
          <div data-reveal className="lg:col-span-7 flex flex-col gap-4">
            <SectionLabel>Our lead consultant</SectionLabel>
            <h2 id="lead" className="text-h1 text-heading">From London to Vancouver to Lahore</h2>
            {leadBio.map((p) => (
              <p key={p} className="text-body text-ink">{p}</p>
            ))}
          </div>
          <div data-reveal style={{ "--d": "120ms" } as React.CSSProperties} className="lg:col-span-5 rounded-[1.75rem] bg-surface border border-line p-6 sm:p-8 flex flex-col gap-4 self-start">
            <h3 className="text-h3 text-heading">Qualifications &amp; certifications</h3>
            <ul className="flex flex-col gap-2.5">
              {leadCertifications.map((c) => (
                <li key={c} className="flex gap-2.5 text-small text-ink">
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="w-[18px] h-[18px] shrink-0 mt-0.5 text-primary" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="m5 12 5 5L20 7" />
                  </svg>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="believe" data-reveal className="fs-deep fs-dots rounded-[2rem] p-8 sm:p-12 grid lg:grid-cols-12 gap-8 items-center">
          <div aria-hidden="true" className="fs-glow fs-glow-navy w-[32rem] h-[32rem] -right-40 -top-56" />
          <div className="lg:col-span-5 flex flex-col gap-3">
            <SectionLabel onDeep>What we believe</SectionLabel>
            <h2 id="believe" className="text-h1 text-on-deep">Five principles behind every engagement.</h2>
            <Link href="/what-we-think" className="self-start mt-3 inline-flex items-center min-h-[48px] px-6 rounded-full border border-on-deep/40 text-on-deep font-semibold hover:border-on-deep transition-colors">
              Read what we think →
            </Link>
          </div>
          <ol className="lg:col-span-7 flex flex-col">
            {principles.map((p, i) => (
              <li key={p.title} className="flex gap-4 py-3.5 border-t border-on-deep/15 first:border-0">
                <span aria-hidden="true" className="font-display text-on-deep/50 w-7 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-lg text-on-deep">{p.title}</span>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="industries" data-reveal className="flex flex-col gap-5">
          <SectionLabel>Industries</SectionLabel>
          <h2 id="industries" className="text-h1 text-heading max-w-3xl">Experience across a wide range of sectors.</h2>
          <ul className="flex flex-wrap gap-2.5">
            {industries.map((i) => (
              <li key={i} className="text-small font-semibold px-4 py-2.5 rounded-full border border-line bg-bg text-heading">{i}</li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
