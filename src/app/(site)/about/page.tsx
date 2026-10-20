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

export const metadata: Metadata = pageMetadata({
  title: "About Us",
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

// About "Option B · Person first" (approved 2026-10-20).
export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />

      <section className="bg-band">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col gap-4">
            <p className="eyebrow">About us</p>
            <h1 className="text-display text-heading">Practical experience. Transferable methods. Measurable improvement.</h1>
            <p className="text-lede text-muted">{aboutIntro}</p>
          </div>
          <figure className="lg:col-span-5 overflow-hidden rounded-3xl bg-bg shadow-lift max-w-md w-full mx-auto lg:mx-0 lg:ms-auto">
            <Image
              src={principalConsultant.image}
              alt={`${principalConsultant.name}, ${principalConsultant.role}`}
              width={1024}
              height={1024}
              priority
              sizes="(min-width: 1024px) 28rem, 100vw"
              className="w-full aspect-square object-cover"
            />
            <figcaption className="px-5 py-4 flex flex-col gap-0.5">
              <span className="font-display text-xl text-heading">{principalConsultant.name}</span>
              <span className="text-small text-muted">{principalConsultant.role} · {leadCredentialsShort}</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section aria-label="In numbers" className="border-b border-line">
        <dl className="max-w-7xl mx-auto grid sm:grid-cols-3">
          {aboutStats.map((s) => (
            <div key={s.label} className="flex items-baseline gap-3.5 px-4 sm:px-6 lg:px-8 py-6 sm:py-7 border-b sm:border-b-0 sm:border-e border-line last:border-0">
              <dt className="text-muted">{s.label}</dt>
              <dd className="order-first font-display text-4xl leading-none text-heading">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 flex flex-col gap-16 sm:gap-20">
        <section aria-labelledby="lead" className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-7 flex flex-col gap-4">
            <p className="eyebrow">Our lead consultant</p>
            <h2 id="lead" className="text-h2 text-heading">From London to Vancouver to Lahore</h2>
            {leadBio.map((p) => (
              <p key={p} className="text-body text-ink">{p}</p>
            ))}
          </div>
          <div className="lg:col-span-5 rounded-2xl bg-surface p-6 sm:p-7 flex flex-col gap-4 self-start">
            <h3 className="text-lg font-display text-heading">Qualifications &amp; certifications</h3>
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

        <section id="principles" aria-labelledby="principles-title" className="scroll-mt-28 flex flex-col gap-3">
          <h2 id="principles-title" className="text-h2 text-heading mb-3">What we believe</h2>
          <ol>
            {principles.map((p, i) => (
              <li key={p.title} className="grid md:grid-cols-12 gap-2 md:gap-6 py-6 border-t border-line">
                <span aria-hidden="true" className="md:col-span-1 font-display text-2xl leading-none text-primary/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="md:col-span-4 text-lg font-display text-heading">{p.title}</h3>
                <p className="md:col-span-7 text-muted">{p.desc}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="industries" className="rounded-2xl bg-band p-6 sm:p-8 flex flex-col gap-4">
          <h2 id="industries" className="text-h3 text-heading">Industries we work with</h2>
          <p className="text-muted">Our multidisciplinary experience allows us to work across a wide range of sectors, including:</p>
          <ul className="flex flex-wrap gap-2">
            {industries.map((i) => (
              <li key={i} className="text-small font-semibold px-3.5 py-2 rounded-full bg-bg text-heading">{i}</li>
            ))}
          </ul>
          <Link href="/services" className="btn-secondary self-start mt-2">See our services</Link>
        </section>
      </div>
    </>
  );
}
