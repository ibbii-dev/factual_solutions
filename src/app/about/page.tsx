"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { principalConsultant, officeLocations } from "@/data/companyData";
import { useLanguage } from "@/context/LanguageContext";
import PageHeader from "@/components/ui/PageHeader";

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
  const label = "text-[11px] uppercase font-semibold tracking-[0.14em] text-slate-500 dark:text-slate-400";
  const row = "fs-rule grid grid-cols-1 lg:grid-cols-12 gap-6 border-t border-ink/15 dark:border-white/15 pt-10";

  return (
    <div className="pb-20 sm:pb-24 min-h-screen text-ink dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader eyebrow={c.badge} title={c.headline} lede={c.intro[0]} />

        {/* Perspective */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-20 sm:mb-28">
          <div data-reveal className="lg:col-span-9 lg:col-start-4 space-y-5 max-w-3xl">
            <p className="text-xl sm:text-2xl font-display font-bold leading-snug text-ink dark:text-white">{c.intro[1]}</p>
            <p className="text-[15px] sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">{c.intro[2]}</p>
          </div>
        </section>

        {/* Lead consultant */}
        <section className={`${row} mb-20 sm:mb-28`}>
          <p className="lg:col-span-3 eyebrow pt-2">{c.leadBadge}</p>
          <div data-reveal className="lg:col-span-9 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-9 gap-8">
              <div className="md:col-span-3">
                <div className="relative w-full max-w-[260px] aspect-[4/5] overflow-hidden bg-paper-deep">
                  <Image src={principalConsultant.image} alt={c.leadName} fill priority sizes="260px" className="object-cover grayscale-[15%]" />
                </div>
              </div>
              <div className="md:col-span-6 space-y-4">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold font-display text-ink dark:text-white">{c.leadName}</h2>
                  <p className="mt-1 text-[15px] text-slate-600 dark:text-slate-400">{c.leadRole}</p>
                </div>
                {c.leadBio.map((para, i) => (
                  <p key={i} className="text-[15px] text-slate-700 dark:text-slate-300 leading-relaxed">{para}</p>
                ))}
              </div>
            </div>

            <dl className="grid grid-cols-1 md:grid-cols-9 gap-x-8 gap-y-8 border-t border-ink/10 dark:border-white/10 pt-8">
              <dt className={`md:col-span-3 ${label}`}>{c.countriesTitle}</dt>
              <dd className="md:col-span-6 text-[15px] text-ink dark:text-white leading-relaxed">{c.countries.join(isAr ? "، " : ", ")}</dd>

              <dt className={`md:col-span-3 ${label}`}>{c.expertiseTitle}</dt>
              <dd className="md:col-span-6 text-[15px] text-ink dark:text-white leading-relaxed">{c.expertise.join(" · ")}</dd>

              <dt className={`md:col-span-3 ${label}`}>{c.qualTitle}</dt>
              <dd className="md:col-span-6">
                <ul className="border-t border-ink/10 dark:border-white/10">
                  {c.quals.map((q) => (
                    <li key={q.name} className="py-3 border-b border-ink/10 dark:border-white/10 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-6">
                      <span className="text-[15px] font-semibold text-ink dark:text-white">{q.name}</span>
                      {q.by && <span className="text-sm text-slate-500 dark:text-slate-400 sm:text-end">{q.by}</span>}
                    </li>
                  ))}
                </ul>
              </dd>
            </dl>
          </div>
        </section>

        {/* Industries */}
        <section className={`${row} mb-20 sm:mb-28`}>
          <p className="lg:col-span-3 eyebrow pt-2">{c.industriesBadge}</p>
          <div data-reveal className="lg:col-span-9 max-w-3xl space-y-4">
            <p className="text-[15px] text-slate-700 dark:text-slate-300">{c.industriesText}</p>
            <p className="text-xl sm:text-2xl font-display font-bold leading-snug text-ink dark:text-white">{c.industries.join(" · ")}</p>
          </div>
        </section>

        {/* Closing */}
        <section className={row}>
          <p className="lg:col-span-3 eyebrow pt-2">{isAr ? "نهجنا" : "Our approach"}</p>
          <div data-reveal className="lg:col-span-9 space-y-6 max-w-3xl">
            <h2 className="text-3xl sm:text-[2.6rem] font-bold font-display leading-[1.1] text-ink dark:text-white">{c.closingTitle}</h2>
            <p className="lede text-slate-700 dark:text-slate-300">{c.closingText}</p>
            <p className="text-[15px] text-slate-700 dark:text-slate-300">
              <Link href="/blog" className="link-arrow text-ink dark:text-white">{c.blogCta}</Link> {c.blogText}
            </p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-2">
              <Link href="/contact" className="btn-ink inline-flex items-center gap-2 px-6 py-3.5 bg-ink hover:bg-navy dark:bg-white dark:text-ink text-white text-sm font-semibold transition-colors">
                {c.contactCta}
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
              {officeLocations.map((loc) => (
                <p key={loc.city} className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
                  <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
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
