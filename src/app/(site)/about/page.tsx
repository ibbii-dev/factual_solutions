import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { SITE_NAME, SITE_URL, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { officeLocations, principalConsultant } from "@/data/companyData";
import PageHeader from "@/components/ui/PageHeader";
import BrandMark from "@/components/ui/BrandMark";

export const metadata: Metadata = pageMetadata({
  title: "Who We Are",
  description:
    "Factual Solutions brings over 60 years of combined experience in Lean, strategy, operations and digital transformation. Meet lead consultant Qadeer Bhatti.",
  path: "/about",
});

const intro = [
  "Experience matters most when it can be applied. Factual Solutions brings together consultants and trainers with over 60 years of combined experience across Lean and the Toyota Production System, business strategy, operations management, digital transformation, and continuous improvement.",
  "We have worked inside factories, alongside project teams, and with leadership in boardrooms. That gives us a practical perspective on both sides of improvement: what looks right on paper and what actually works on the shop floor.",
  "Our approach combines proven management methods with practical implementation, capability building, and measurable improvement.",
];

const leadBio = [
  "Mr. Bhatti began his professional career in London, UK, before joining Nokia Mobile Phones and later moving to Canada.",
  "In Canada, he managed projects and programs across the software and telecommunications industries before moving into business excellence and organizational improvement in Vancouver.",
  "His international assignments and professional experience have taken him across the United States, Finland, Germany, China, Brazil, Sweden, the UAE, Pakistan, and Iran, giving him exposure to diverse industries, operating environments, and organizational cultures.",
  "His experience spans strategy, project and program management, Lean Six Sigma, operational excellence, innovation, risk management, supply chain, data analysis, and digital transformation.",
];

const countries = ["United Kingdom", "Canada", "United States", "Finland", "Germany", "China", "Brazil", "Sweden", "UAE", "Pakistan", "Iran"];
const expertise = ["Strategy", "Project & Program Management", "Lean Six Sigma", "Operational Excellence", "Innovation", "Risk Management", "Supply Chain", "Data Analysis", "Digital Transformation"];

const quals = [
  { name: "M.Sc.", by: "GC University, Lahore" },
  { name: "M.Sc. Computer Engineering", by: "University of Surrey, UK" },
  { name: "Project Management Professional (PMP)", by: "PMI, USA" },
  { name: "Lean Six Sigma Master Black Belt & Black Belt", by: "Harrington Institute, USA" },
  { name: "Six Sigma Black Belt", by: "ASQ, USA" },
  { name: "Corporate Auditor, Program Manager & Risk Manager", by: "Harrington Institute, USA" },
  { name: "Master of Innovation in TRIZ, Operations Research & Data Mining", by: "The Penn Research Group, USA" },
  { name: "Six Sigma Green Belt (DFSS)", by: "Nokia Canada" },
  { name: "Agile Scrum Master", by: "" },
  { name: "CCBA", by: "" },
  { name: "Diploma in Supply Chain Management", by: "" },
  { name: "Certified Consultant & Trainer", by: "SCC, Vancouver" },
];

const industries = ["Textiles & Apparel", "Chemicals", "Pharmaceuticals", "Food & Beverages", "Oil & Gas", "Sugar", "Steel", "Power & Utilities", "IT & Technology", "Real Estate", "Academia", "HR & Organizational Development", "Nonprofits"];

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: principalConsultant.name,
  jobTitle: principalConsultant.role,
  image: `${SITE_URL}${principalConsultant.image}`,
  worksFor: { "@type": "ProfessionalService", name: SITE_NAME, url: SITE_URL },
  hasCredential: quals.map((q) => ({ "@type": "EducationalOccupationalCredential", name: q.name })),
};

const label = "text-[11px] uppercase font-bold tracking-[0.14em] text-slate-500 dark:text-slate-400";
const check = (
  <span className="fs-check mt-0.5">
    <svg viewBox="0 0 12 12" className="w-2.5 h-2.5" aria-hidden="true">
      <path d="M2.5 6.2 5 8.5 9.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
);

// "Who we are": the classic "Practitioners, not just advisors" layout.
export default function AboutPage() {
  return (
    <div className="pb-20 sm:pb-24 text-ink dark:text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Who we are", path: "/about" }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader eyebrow="Who we are" title="Practitioners, not just advisors" lede={intro[0]} />

        {/* Perspective, with the puzzle mark */}
        <section data-reveal aria-label="Our perspective" className="group fs-card p-8 sm:p-12 mb-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <p className="text-xl sm:text-2xl font-display font-bold leading-snug text-ink dark:text-white">{intro[1]}</p>
            <p className="text-[15px] sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">{intro[2]}</p>
          </div>
          <div className="lg:col-span-5 flex justify-center">
            <div className="dark:bg-white/95 dark:rounded-3xl dark:p-6">
              <BrandMark className="w-48 h-48 sm:w-60 sm:h-60 overflow-visible transition-transform duration-700 ease-out group-hover:rotate-[-4deg] group-hover:scale-105" />
            </div>
          </div>
        </section>

        {/* Lead consultant */}
        <section aria-labelledby="lead" className="mb-16">
          <div data-reveal className="text-center flex flex-col items-center gap-3 mb-8">
            <p className="fs-pill">Our lead consultant</p>
          </div>
          <div data-reveal className="fs-card p-6 sm:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
            <div className="md:col-span-4 flex flex-col items-center text-center gap-3">
              <div className="relative w-full max-w-[260px] aspect-[4/5] overflow-hidden rounded-2xl border border-paper-line dark:border-white/10 shadow-card bg-paper-deep">
                <Image src={principalConsultant.image} alt={`${principalConsultant.name}, ${principalConsultant.role}`} fill priority sizes="260px" className="object-cover object-top" />
              </div>
              <div>
                <h2 id="lead" className="text-2xl font-bold text-ink dark:text-white">{principalConsultant.name}</h2>
                <p className="mt-1 text-[14px] font-semibold text-rust dark:text-rust-light">Lead Consultant &amp; Trainer</p>
              </div>
            </div>
            <div className="md:col-span-8 space-y-6">
              <div className="space-y-4">
                {leadBio.map((para) => (
                  <p key={para} className="text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed">{para}</p>
                ))}
              </div>
              <div className="space-y-2">
                <h3 className={label}>Experience spans</h3>
                <ul className="flex flex-wrap gap-2">
                  {expertise.map((x) => (
                    <li key={x} className="inline-flex items-center gap-1.5 rounded-lg bg-paper-deep dark:bg-white/5 border border-paper-line dark:border-white/10 px-3 py-1.5 text-[13px] font-medium text-ink dark:text-slate-200">{check}{x}</li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className={label}>International experience</h3>
                <p className="text-[15px] text-ink dark:text-white leading-relaxed">{countries.join(", ")}</p>
              </div>
            </div>
          </div>

          <div data-reveal className="mt-5 fs-card p-6 sm:p-8">
            <h3 className={`${label} mb-4`}>Qualifications &amp; professional certifications</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {quals.map((q) => (
                <li key={q.name} className="flex items-start gap-3 rounded-xl bg-paper dark:bg-night-900/60 border border-paper-line dark:border-white/10 p-4">
                  {check}
                  <span>
                    <span className="block text-[15px] font-semibold text-ink dark:text-white">{q.name}</span>
                    {q.by && <span className="block text-[13px] text-slate-500 dark:text-slate-400">{q.by}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Industries */}
        <section data-reveal aria-labelledby="industries" className="fs-card p-8 sm:p-10 mb-16 text-center">
          <h2 id="industries" className="fs-pill mb-5">Industries we serve</h2>
          <p className="text-[15px] text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Our multidisciplinary experience allows us to work across a wide range of sectors, including:
          </p>
          <ul className="mt-6 flex flex-wrap justify-center gap-2">
            {industries.map((ind, i) => (
              <li key={ind} className="inline-flex items-center gap-2 rounded-full border border-paper-line dark:border-white/15 bg-white dark:bg-white/5 px-4 py-2 text-[14px] font-semibold text-ink dark:text-white">
                <i className="w-2 h-2 rounded-full" style={{ background: ["#25346B", "#9BB3D9", "#9B391E"][i % 3] }} aria-hidden="true" />
                {ind}
              </li>
            ))}
          </ul>
        </section>

        {/* Closing */}
        <section data-reveal aria-labelledby="closing" className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0E1A38] via-[#1A2756] to-[#25346B] text-white p-8 sm:p-12 shadow-lift">
          <div aria-hidden="true" className="absolute top-0 inset-x-0 h-1 bg-brand-tri" />
          <div className="max-w-3xl space-y-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-steel-light">Our approach</p>
            <h2 id="closing" className="text-3xl sm:text-[2.4rem] font-extrabold leading-[1.1]">
              Practical experience. Transferable methods. Measurable improvement.
            </h2>
            <p className="lede text-slate-200">
              We bring the perspective of practitioners who have worked with real processes, real teams, real constraints and
              real business challenges. Our role is not simply to recommend what should change, but to help organisations
              understand, implement, measure and sustain that change.
            </p>
            <p className="text-[15px] text-slate-200">
              <Link href="/what-we-think" className="link-arrow text-white">Read what we think</Link> or{" "}
              <Link href="/blog" className="link-arrow text-white">explore our blog</Link> for practical insights on operational
              excellence, strategy, Lean Six Sigma and digital transformation.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4 pt-2">
              <Link href="/contact" className="btn-primary">
                Talk to us
                <ArrowRight className="fs-arrow w-4 h-4 rtl:rotate-180" aria-hidden="true" />
              </Link>
              {officeLocations.map((loc) => (
                <p key={loc.city} className="text-sm text-slate-200 flex flex-wrap items-center gap-2">
                  <MapPin className="w-4 h-4 shrink-0 text-rust-light" aria-hidden="true" />
                  <span>{loc.city}, {loc.country}</span>
                  <span aria-hidden="true">·</span>
                  <span>Direct: <span dir="ltr">{loc.phone}</span></span>
                </p>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
