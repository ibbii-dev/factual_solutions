"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { principalConsultant, officeLocations } from "@/data/companyData";
import { useLanguage } from "@/context/LanguageContext";
import PageHeader from "@/components/ui/PageHeader";
import BrandMark from "@/components/ui/BrandMark";

const content = {
  en: {
    badge: "Who We Are",
    headline: "Practitioners, Not Just Advisors",
    intro: [
      "Experience matters most when it can be applied. Factual Solutions brings together consultants and trainers with over 60 years of combined experience across Lean and the Toyota Production System, business strategy, operations management, digital transformation, and continuous improvement.",
      "We have worked inside factories, alongside project teams, and with leadership in boardrooms. That gives us a practical perspective on both sides of improvement: what looks right on paper and what actually works on the shop floor.",
      "Our approach combines proven management methods with practical implementation, capability building, and measurable improvement.",
    ],
    leadBadge: "Our Lead Consultant",
    leadName: "Qadeer Bhatti",
    leadRole: "Lead Consultant & Trainer",
    leadBio: [
      "Mr. Bhatti began his professional career in London, UK, before joining Nokia Mobile Phones and later moving to Canada.",
      "In Canada, he managed projects and programs across the software and telecommunications industries before moving into business excellence and organizational improvement in Vancouver.",
      "His international assignments and professional experience have taken him across the United States, Finland, Germany, China, Brazil, Sweden, the UAE, Pakistan, and Iran, giving him exposure to diverse industries, operating environments, and organizational cultures.",
      "His experience spans strategy, project and program management, Lean Six Sigma, operational excellence, innovation, risk management, supply chain, data analysis, and digital transformation.",
    ],
    countriesTitle: "International Experience",
    countries: ["United Kingdom", "Canada", "United States", "Finland", "Germany", "China", "Brazil", "Sweden", "UAE", "Pakistan", "Iran"],
    expertiseTitle: "Experience Spans",
    expertise: ["Strategy", "Project & Program Management", "Lean Six Sigma", "Operational Excellence", "Innovation", "Risk Management", "Supply Chain", "Data Analysis", "Digital Transformation"],
    qualTitle: "Qualifications & Professional Certifications",
    quals: [
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
    ],
    industriesBadge: "Industries We Serve",
    industriesText: "Our multidisciplinary experience allows us to work across a wide range of sectors, including:",
    industries: ["Textiles & Apparel", "Chemicals", "Pharmaceuticals", "Food & Beverages", "Oil & Gas", "Sugar", "Steel", "Power & Utilities", "IT & Technology", "Real Estate", "Academia", "HR & Organizational Development", "Nonprofits"],
    closingTitle: "Practical Experience. Transferable Methods. Measurable Improvement.",
    closingText: "We bring the perspective of practitioners who have worked with real processes, real teams, real constraints, and real business challenges. Our role is not simply to recommend what should change, but to help organizations understand, implement, measure, and sustain that change.",
    blogCta: "Explore our Blog",
    blogText: "for practical insights, case-based perspectives, and ideas from the world of operational excellence, strategy, Lean Six Sigma, digital transformation, and continuous improvement.",
    contactCta: "Talk to Us",
    officeTitle: "Head Office",
    direct: "Direct:",
  },
  ar: {
    badge: "من نحن",
    headline: "ممارسون، لا مجرد مستشارين",
    intro: [
      "تكتسب الخبرة قيمتها الحقيقية عندما يمكن تطبيقها. تجمع Factual Solutions مستشارين ومدربين بخبرة مشتركة تتجاوز 60 عاماً في منهجية لين ونظام تويوتا للإنتاج واستراتيجية الأعمال وإدارة العمليات والتحول الرقمي والتحسين المستمر.",
      "عملنا داخل المصانع وإلى جانب فرق المشاريع ومع القيادات في مجالس الإدارة. وهذا يمنحنا منظوراً عملياً لجانبي التحسين: ما يبدو صحيحاً على الورق، وما ينجح فعلاً في أرض المصنع.",
      "يجمع نهجنا بين الأساليب الإدارية المثبتة والتنفيذ العملي وبناء القدرات والتحسين القابل للقياس.",
    ],
    leadBadge: "مستشارنا الرئيسي",
    leadName: "قدير بهاتي",
    leadRole: "المستشار والمدرب الرئيسي",
    leadBio: [
      "بدأ السيد بهاتي مسيرته المهنية في لندن بالمملكة المتحدة، ثم انضم إلى نوكيا للهواتف المحمولة قبل انتقاله لاحقاً إلى كندا.",
      "في كندا، أدار مشاريع وبرامج في قطاعي البرمجيات والاتصالات قبل أن ينتقل إلى مجال التميز المؤسسي وتطوير المؤسسات في فانكوفر.",
      "أخذته مهامه الدولية وخبرته المهنية إلى الولايات المتحدة وفنلندا وألمانيا والصين والبرازيل والسويد والإمارات وباكستان وإيران، مما أتاح له الاطلاع على قطاعات وبيئات تشغيل وثقافات مؤسسية متنوعة.",
      "تشمل خبرته الاستراتيجية وإدارة المشاريع والبرامج ولين ستة سيجما والتميز التشغيلي والابتكار وإدارة المخاطر وسلسلة الإمداد وتحليل البيانات والتحول الرقمي.",
    ],
    countriesTitle: "الخبرة الدولية",
    countries: ["المملكة المتحدة", "كندا", "الولايات المتحدة", "فنلندا", "ألمانيا", "الصين", "البرازيل", "السويد", "الإمارات", "باكستان", "إيران"],
    expertiseTitle: "مجالات الخبرة",
    expertise: ["الاستراتيجية", "إدارة المشاريع والبرامج", "لين ستة سيجما", "التميز التشغيلي", "الابتكار", "إدارة المخاطر", "سلسلة الإمداد", "تحليل البيانات", "التحول الرقمي"],
    qualTitle: "المؤهلات والشهادات المهنية",
    quals: [
      { name: "ماجستير العلوم (M.Sc.)", by: "جامعة GC، لاهور" },
      { name: "ماجستير العلوم في هندسة الحاسوب", by: "جامعة سري، المملكة المتحدة" },
      { name: "محترف إدارة المشاريع (PMP)", by: "PMI، الولايات المتحدة" },
      { name: "الحزام الأسود الرئيسي والحزام الأسود في لين ستة سيجما", by: "معهد هارينغتون، الولايات المتحدة" },
      { name: "الحزام الأسود في ستة سيجما", by: "ASQ، الولايات المتحدة" },
      { name: "مدقق مؤسسي ومدير برامج ومدير مخاطر", by: "معهد هارينغتون، الولايات المتحدة" },
      { name: "ماجستير الابتكار في TRIZ وبحوث العمليات والتنقيب في البيانات", by: "The Penn Research Group، الولايات المتحدة" },
      { name: "الحزام الأخضر في ستة سيجما (DFSS)", by: "نوكيا كندا" },
      { name: "Agile Scrum Master", by: "" },
      { name: "CCBA", by: "" },
      { name: "دبلوم إدارة سلسلة الإمداد", by: "" },
      { name: "مستشار ومدرب معتمد", by: "SCC، فانكوفر" },
    ],
    industriesBadge: "القطاعات التي نخدمها",
    industriesText: "تتيح لنا خبرتنا متعددة التخصصات العمل عبر مجموعة واسعة من القطاعات، منها:",
    industries: ["المنسوجات والملابس", "الكيماويات", "الأدوية", "الأغذية والمشروبات", "النفط والغاز", "السكر", "الصلب", "الطاقة والمرافق", "تقنية المعلومات والتكنولوجيا", "العقارات", "الأوساط الأكاديمية", "الموارد البشرية والتطوير المؤسسي", "المنظمات غير الربحية"],
    closingTitle: "خبرة عملية. أساليب قابلة للنقل. تحسين قابل للقياس.",
    closingText: "نقدّم منظور ممارسين عملوا مع عمليات حقيقية وفرق حقيقية وقيود حقيقية وتحديات أعمال حقيقية. دورنا ليس مجرد التوصية بما يجب تغييره، بل مساعدة المؤسسات على فهم هذا التغيير وتنفيذه وقياسه واستدامته.",
    blogCta: "تصفح مدونتنا",
    blogText: "للاطلاع على رؤى عملية ووجهات نظر مبنية على الحالات وأفكار من عالم التميز التشغيلي والاستراتيجية ولين ستة سيجما والتحول الرقمي والتحسين المستمر.",
    contactCta: "تواصل معنا",
    officeTitle: "المكتب الرئيسي",
    direct: "المباشر:",
  },
};

export default function AboutPage() {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const c = isAr ? content.ar : content.en;
  const label = "text-[11px] uppercase font-bold tracking-[0.14em] text-slate-500 dark:text-slate-400";
  const check = (
    <span className="fs-check mt-0.5"><svg viewBox="0 0 12 12" className="w-2.5 h-2.5" aria-hidden="true"><path d="M2.5 6.2 5 8.5 9.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
  );

  return (
    <div className="pb-20 sm:pb-24 min-h-screen text-ink dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader eyebrow={c.badge} title={c.headline} lede={c.intro[0]} />

        {/* Perspective, with the puzzle mark */}
        <section data-reveal className="group fs-card p-8 sm:p-12 mb-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <p className="text-xl sm:text-2xl font-display font-bold leading-snug text-ink dark:text-white">{c.intro[1]}</p>
            <p className="text-[15px] sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">{c.intro[2]}</p>
          </div>
          <div className="lg:col-span-5 flex justify-center">
            <div className="dark:bg-white/95 dark:rounded-3xl dark:p-6">
              <BrandMark className="w-48 h-48 sm:w-60 sm:h-60 overflow-visible transition-transform duration-700 ease-out group-hover:rotate-[-4deg] group-hover:scale-105" />
            </div>
          </div>
        </section>

        {/* Lead consultant */}
        <section className="mb-16">
          <div data-reveal className="text-center flex flex-col items-center gap-3 mb-8">
            <p className="fs-pill">{c.leadBadge}</p>
          </div>
          <div data-reveal className="fs-card p-6 sm:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
            <div className="md:col-span-4 flex flex-col items-center text-center gap-3">
              <div className="relative w-full max-w-[260px] aspect-[4/5] overflow-hidden rounded-2xl border border-paper-line dark:border-white/10 shadow-card bg-paper-deep">
                <Image src={principalConsultant.image} alt={c.leadName} fill priority sizes="260px" className="object-cover" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-ink dark:text-white">{c.leadName}</h2>
                <p className="mt-1 text-[14px] font-semibold text-rust dark:text-rust-light">{c.leadRole}</p>
              </div>
            </div>
            <div className="md:col-span-8 space-y-6">
              <div className="space-y-4">
                {c.leadBio.map((para, i) => (
                  <p key={i} className="text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed">{para}</p>
                ))}
              </div>
              <div className="space-y-2">
                <p className={label}>{c.expertiseTitle}</p>
                <ul className="flex flex-wrap gap-2">
                  {c.expertise.map((x) => (
                    <li key={x} className="inline-flex items-center gap-1.5 rounded-lg bg-paper-deep dark:bg-white/5 border border-paper-line dark:border-white/10 px-3 py-1.5 text-[13px] font-medium text-ink dark:text-slate-200">{check}{x}</li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                <p className={label}>{c.countriesTitle}</p>
                <p className="text-[15px] text-ink dark:text-white leading-relaxed">{c.countries.join(isAr ? "، " : ", ")}</p>
              </div>
            </div>
          </div>

          <div data-reveal className="mt-5 fs-card p-6 sm:p-8">
            <p className={`${label} mb-4`}>{c.qualTitle}</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {c.quals.map((q) => (
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
        <section data-reveal className="fs-card p-8 sm:p-10 mb-16 text-center">
          <p className="fs-pill mb-5">{c.industriesBadge}</p>
          <p className="text-[15px] text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">{c.industriesText}</p>
          <ul className="mt-6 flex flex-wrap justify-center gap-2">
            {c.industries.map((ind, i) => (
              <li key={ind} className="inline-flex items-center gap-2 rounded-full border border-paper-line dark:border-white/15 bg-white dark:bg-white/5 px-4 py-2 text-[14px] font-semibold text-ink dark:text-white">
                <i className="w-2 h-2 rounded-full" style={{ background: ["#25346B", "#9BB3D9", "#9B391E"][i % 3] }} aria-hidden="true" />
                {ind}
              </li>
            ))}
          </ul>
        </section>

        {/* Closing */}
        <section data-reveal className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0E1A38] via-[#1A2756] to-navy text-white p-8 sm:p-12 shadow-lift">
          <div aria-hidden="true" className="absolute top-0 inset-x-0 h-1 bg-brand-tri" />
          <div className="max-w-3xl space-y-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-steel-light">{isAr ? "نهجنا" : "Our approach"}</p>
            <h2 className="text-3xl sm:text-[2.4rem] font-extrabold leading-[1.1]">{c.closingTitle}</h2>
            <p className="lede text-slate-200">{c.closingText}</p>
            <p className="text-[15px] text-slate-200">
              <Link href="/blog" className="link-arrow text-white">{c.blogCta}</Link> {c.blogText}
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4 pt-2">
              <Link href="/contact" className="btn-primary">
                {c.contactCta}
                <ArrowRight className="fs-arrow w-4 h-4 rtl:rotate-180" />
              </Link>
              {officeLocations.map((loc) => (
                <p key={loc.city} className="text-sm text-slate-200 flex items-center gap-2">
                  <MapPin className="w-4 h-4 shrink-0 text-rust-light" aria-hidden="true" />
                  <span>{isAr ? "لاهور، باكستان" : `${loc.city}, ${loc.country}`}</span>
                  <span aria-hidden="true">·</span>
                  <span>{c.direct} <span dir="ltr">{loc.phone}</span></span>
                </p>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
