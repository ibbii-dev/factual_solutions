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


export default function IndustrySectorsSection() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  return (
    <section aria-labelledby="industries-heading" className="py-16 sm:py-24 border-t border-ink/10 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6">
        <div className="lg:col-span-3 space-y-3">
          <p className="eyebrow">{isAr ? "القطاعات" : "Industries"}</p>
        </div>
        <div className="lg:col-span-9 space-y-10">
          <div data-reveal className="space-y-4 max-w-3xl">
            <h2 id="industries-heading" className="text-3xl sm:text-[2.6rem] font-bold font-display leading-[1.1] text-ink dark:text-white">
              {isAr ? "القطاعات التي نخدمها" : "Industries we serve"}
            </h2>
            <p className="lede text-slate-700 dark:text-slate-300">
              {isAr
                ? "تتيح لنا خبرتنا متعددة التخصصات العمل عبر مجموعة واسعة من القطاعات."
                : "Our multidisciplinary experience allows us to work across a wide range of sectors."}
            </p>
          </div>
          <ul className="fs-rule grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-ink/15 dark:border-white/15">
            {industries.map((ind, idx) => (
              <li key={ind.en} data-reveal="fade" style={{ "--d": `${idx * 45}ms` } as React.CSSProperties} className="flex items-baseline gap-4 py-3.5 border-b border-ink/10 dark:border-white/10 sm:pe-6">
                <span className="section-no text-xs w-6 shrink-0">{String(idx + 1).padStart(2, "0")}</span>
                <span className="text-[15px] text-ink dark:text-white">{isAr ? ind.ar : ind.en}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
