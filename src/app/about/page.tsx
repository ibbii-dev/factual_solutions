"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  ArrowRight,
  Award,
  GraduationCap,
  Globe2,
  Factory,
  Users,
  LineChart,
  CheckCircle2,
} from "lucide-react";
import { principalConsultant, officeLocations } from "@/data/companyData";
import { useLanguage } from "@/context/LanguageContext";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";

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

const tones = ["bg-navy text-white", "bg-steel text-ink", "bg-rust text-white"];

export default function AboutPage() {
  const { language } = useLanguage();
  const c = language === "ar" ? content.ar : content.en;

  return (
    <div className="pt-24 sm:pt-32 pb-20 sm:pb-24 min-h-screen bg-transparent text-ink dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Hero */}
        <ScrollReveal variant="fade-up" className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white dark:bg-white/5 text-navy dark:text-steel-light border border-navy/10 dark:border-white/10 text-[11px] font-bold uppercase tracking-widest shadow-xs">
            {c.badge}
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-[3.4rem] font-extrabold text-ink dark:text-white tracking-tight leading-tight font-display">
            {c.headline}
          </h1>
          <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-200 leading-relaxed">
            {c.intro[0]}
          </p>
        </ScrollReveal>

        {/* Perspective */}
        <ScrollReveal variant="fade-up" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16 sm:mb-24 bg-white dark:bg-night-800/80 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-card border border-slate-200/80 dark:border-white/10">
          <div className="lg:col-span-12 max-w-4xl space-y-4">
            <div className="brand-rule" aria-hidden="true" />
            <p className="text-base sm:text-lg text-ink dark:text-white leading-relaxed font-medium">{c.intro[1]}</p>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">{c.intro[2]}</p>
          </div>

        </ScrollReveal>

        {/* Lead Consultant */}
        <div className="mb-16 sm:mb-24">
          <ScrollReveal variant="fade-up" className="text-center max-w-2xl mx-auto space-y-2 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rust/[0.07] dark:bg-white/5 border border-rust/15 dark:border-white/10 text-accent text-[11px] font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>{c.leadBadge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink dark:text-white font-display">{c.leadName}</h2>
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">{c.leadRole}</p>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" className="bg-white dark:bg-night-800/80 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-white/10 shadow-card grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Portrait + bio */}
            <div className="lg:col-span-5 space-y-5">
              <div className="relative w-full max-w-[280px] aspect-square mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-md border border-slate-200 dark:border-white/10 bg-night-900">
                <Image src={principalConsultant.image} alt={c.leadName} fill priority sizes="280px" className="object-cover" />
              </div>
              {c.leadBio.map((para, i) => (
                <p key={i} className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{para}</p>
              ))}
            </div>

            {/* Experience + qualifications */}
            <div className="lg:col-span-7 space-y-7">
              <div>
                <h3 className="flex items-center gap-2 text-[11px] uppercase font-bold tracking-[0.14em] text-slate-500 dark:text-slate-300 mb-3">
                  <Globe2 className="w-4 h-4 text-accent" /> {c.countriesTitle}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {c.countries.map((ct) => (
                    <span key={ct} className="px-3 py-1 rounded-full bg-navy-50 dark:bg-white/10 border border-navy/10 dark:border-white/10 text-xs font-semibold text-navy dark:text-steel-light">{ct}</span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-[11px] uppercase font-bold tracking-[0.14em] text-slate-500 dark:text-slate-300 mb-3">{c.expertiseTitle}</h3>
                <div className="flex flex-wrap gap-2">
                  {c.expertise.map((ex) => (
                    <span key={ex} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-700 dark:text-slate-100">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent" /> {ex}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="flex items-center gap-2 text-[11px] uppercase font-bold tracking-[0.14em] text-slate-500 dark:text-slate-300 mb-3">
                  <GraduationCap className="w-4 h-4 text-accent" /> {c.qualTitle}
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {c.quals.map((q) => (
                    <li key={q.name} className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10">
                      <div className="text-[13px] font-bold text-ink dark:text-white leading-snug">{q.name}</div>
                      {q.by && <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{q.by}</div>}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Industries */}
        <ScrollReveal variant="fade-up" className="mb-16 sm:mb-24 text-center">
          <span className="eyebrow block mb-3">{c.industriesBadge}</span>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-6">{c.industriesText}</p>
          <div className="flex flex-wrap justify-center gap-2.5 max-w-4xl mx-auto">
            {c.industries.map((ind, i) => (
              <span key={ind} className={`px-4 py-2 rounded-full text-sm font-semibold border ${i % 3 === 0 ? "bg-navy text-white border-navy" : i % 3 === 1 ? "bg-white dark:bg-white/5 text-ink dark:text-white border-slate-200 dark:border-white/10" : "bg-rust/[0.08] text-accent border-rust/20"}`}>
                {ind}
              </span>
            ))}
          </div>
        </ScrollReveal>

        {/* Closing */}
        <ScrollReveal variant="fade-up" className="mb-16 rounded-3xl bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 dark:from-night-800 dark:via-night-850 dark:to-night-950 text-white p-7 sm:p-12 border border-navy-700 dark:border-white/10 shadow-lift relative overflow-hidden">
          <div className="absolute top-0 left-0 h-1 w-full bg-brand-tri" aria-hidden="true" />
          <div className="max-w-3xl space-y-4">
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display leading-tight">{c.closingTitle}</h2>
            <p className="text-sm sm:text-base text-slate-200/90 leading-relaxed">{c.closingText}</p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link href="/contact" className="btn-sheen inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-rust hover:bg-rust-light text-white text-sm font-bold shadow-cta">
                <span>{c.contactCta}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
              <Link href="/blog" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-sm font-semibold">
                <span>{c.blogCta}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
            </div>
            <p className="text-xs text-slate-300"><Link href="/blog" className="font-bold text-steel-light hover:text-white">{c.blogCta} →</Link> {c.blogText}</p>
          </div>
        </ScrollReveal>

        {/* Office Location */}
        <ScrollReveal variant="fade-up" className="max-w-md mx-auto">
          {officeLocations.map((loc) => (
            <div key={loc.city} className="bg-white dark:bg-night-800/80 p-6 rounded-2xl border border-slate-200/80 dark:border-white/10 space-y-2 text-center shadow-card">
              <div className="text-[11px] uppercase font-bold tracking-[0.14em] text-slate-500 dark:text-slate-300">{c.officeTitle}</div>
              <div className="flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4 text-accent shrink-0" />
                <span className="text-base font-bold text-ink dark:text-white">
                  {language === "ar" ? "لاهور، باكستان" : `${loc.city}, ${loc.country}`}
                </span>
              </div>
              <div className="text-sm font-bold text-ink dark:text-white">
                {c.direct} <span dir="ltr">{loc.phone}</span>
              </div>
            </div>
          ))}
        </ScrollReveal>

      </div>
    </div>
  );
}
