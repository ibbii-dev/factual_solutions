"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

const industries = [
  { en: "Textiles & Apparel", ar: "المنسوجات والملابس" },
  { en: "Chemicals", ar: "الكيماويات" },
  { en: "Pharmaceuticals", ar: "الأدوية" },
  { en: "Food & Beverages", ar: "الأغذية والمشروبات" },
  { en: "Oil & Gas", ar: "النفط والغاز" },
  { en: "Sugar", ar: "السكر" },
  { en: "Steel", ar: "الصلب" },
  { en: "Power & Utilities", ar: "الطاقة والمرافق" },
  { en: "IT & Technology", ar: "تقنية المعلومات والتكنولوجيا" },
  { en: "Real Estate", ar: "العقارات" },
  { en: "Academia", ar: "الأوساط الأكاديمية" },
  { en: "HR & Organizational Development", ar: "الموارد البشرية والتطوير المؤسسي" },
  { en: "Nonprofits", ar: "المنظمات غير الربحية" },
];


const DOTS = ["#25346B", "#9B391E", "#9BB3D9"];

/** Industries as a slow marquee in the logo colors. It pauses on hover and stays static for reduced motion. */
export default function IndustrySectorsSection() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const chips = (hidden: boolean) =>
    industries.map((ind, idx) => (
      <li key={`${hidden ? "b" : "a"}-${ind.en}`} aria-hidden={hidden || undefined} className="shrink-0">
        <span className="fs-chip inline-flex items-center gap-2.5 h-12 px-5 border border-paper-line dark:border-white/15 bg-white dark:bg-night-800 text-[16px] text-ink dark:text-white whitespace-nowrap hover:border-rust hover:text-rust dark:hover:text-rust-light">
          <i className="w-2 h-2 shrink-0" style={{ background: DOTS[idx % 3] }} aria-hidden="true" />
          {isAr ? ind.ar : ind.en}
        </span>
      </li>
    ));

  return (
    <section aria-labelledby="industries-heading" className="py-20 sm:py-24 bg-paper-deep dark:bg-night-850 overflow-hidden">
      <div data-reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-12 items-end mb-10">
        <div className="space-y-4">
          <p className="fs-label">{isAr ? "القطاعات" : "Industries"}</p>
          <h2 id="industries-heading" className="text-[2rem] sm:text-[2.6rem] font-semibold font-display leading-[1.1] text-navy dark:text-white">
            {isAr ? "القطاعات التي نخدمها" : "Industries we serve"}
          </h2>
        </div>
        <p className="lede text-slate-500 dark:text-slate-300 max-w-xl">
          {isAr
            ? "تتيح لنا خبرتنا متعددة التخصصات العمل عبر مجموعة واسعة من القطاعات."
            : "Our multidisciplinary experience allows us to work across a wide range of sectors."}
        </p>
      </div>
      <div className="fs-marquee-box" dir="ltr">
        <ul className="fs-marquee px-4" dir={isAr ? "rtl" : "ltr"}>
          {chips(false)}
          {chips(true)}
        </ul>
      </div>
    </section>
  );
}
