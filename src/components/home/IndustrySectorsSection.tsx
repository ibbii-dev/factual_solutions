"use client";

import React from "react";
import { Building2, Candy, Cpu, Factory, FlaskConical, Fuel, GraduationCap, HeartHandshake, Pill, Shirt, Users, UtensilsCrossed, Zap } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import SectionHeading from "@/components/ui/SectionHeading";

const industries = [
  { en: "Textiles & Apparel", ar: "المنسوجات والملابس", Icon: Shirt },
  { en: "Chemicals", ar: "الكيماويات", Icon: FlaskConical },
  { en: "Pharmaceuticals", ar: "الأدوية", Icon: Pill },
  { en: "Food & Beverages", ar: "الأغذية والمشروبات", Icon: UtensilsCrossed },
  { en: "Oil & Gas", ar: "النفط والغاز", Icon: Fuel },
  { en: "Sugar", ar: "السكر", Icon: Candy },
  { en: "Steel", ar: "الصلب", Icon: Factory },
  { en: "Power & Utilities", ar: "الطاقة والمرافق", Icon: Zap },
  { en: "IT & Technology", ar: "تقنية المعلومات والتكنولوجيا", Icon: Cpu },
  { en: "Real Estate", ar: "العقارات", Icon: Building2 },
  { en: "Academia", ar: "الأوساط الأكاديمية", Icon: GraduationCap },
  { en: "HR & Organizational Development", ar: "الموارد البشرية والتطوير المؤسسي", Icon: Users },
  { en: "Nonprofits", ar: "المنظمات غير الربحية", Icon: HeartHandshake },
];


const TILES = ["bg-navy", "bg-steel text-navy", "bg-rust"];

/** Industries we serve: a grid of icon tiles that lift on hover. */
export default function IndustrySectorsSection() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  return (
    <section aria-labelledby="industries-heading" className="py-20 sm:py-24 bg-white dark:bg-night-850/60 border-y border-paper-line dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="industries-heading"
          label={isAr ? "القطاعات" : "Industries"}
          title={isAr ? "القطاعات" : "Industries"}
          highlight={isAr ? "التي نخدمها" : "we serve"}
          lede={isAr ? "تتيح لنا خبرتنا متعددة التخصصات العمل عبر مجموعة واسعة من القطاعات." : "Our multidisciplinary experience allows us to work across a wide range of sectors."}
          className="mb-12"
        />
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {industries.map((ind, idx) => {
            const Icon = ind.Icon;
            return (
              <li key={ind.en} data-reveal style={{ "--d": `${(idx % 5) * 60}ms` } as React.CSSProperties} className="fs-card fs-card-hover flex items-center gap-3 p-3.5 sm:p-4">
                <span className={`fs-icon !w-10 !h-10 ${TILES[idx % 3]}`}><Icon className="w-[18px] h-[18px]" aria-hidden="true" /></span>
                <span className="text-[14px] font-semibold leading-snug text-ink dark:text-white">{isAr ? ind.ar : ind.en}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
