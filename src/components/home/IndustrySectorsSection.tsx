"use client";

import React from "react";
import Link from "next/link";
import {
  Shirt,
  FlaskConical,
  Pill,
  UtensilsCrossed,
  Fuel,
  Wheat,
  Factory,
  Zap,
  Cpu,
  Building2,
  GraduationCap,
  Users,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";

const industries = [
  { icon: Shirt, en: "Textiles & Apparel", ar: "المنسوجات والملابس" },
  { icon: FlaskConical, en: "Chemicals", ar: "الكيماويات" },
  { icon: Pill, en: "Pharmaceuticals", ar: "الأدوية" },
  { icon: UtensilsCrossed, en: "Food & Beverages", ar: "الأغذية والمشروبات" },
  { icon: Fuel, en: "Oil & Gas", ar: "النفط والغاز" },
  { icon: Wheat, en: "Sugar", ar: "السكر" },
  { icon: Factory, en: "Steel", ar: "الصلب" },
  { icon: Zap, en: "Power & Utilities", ar: "الطاقة والمرافق" },
  { icon: Cpu, en: "IT & Technology", ar: "تقنية المعلومات والتكنولوجيا" },
  { icon: Building2, en: "Real Estate", ar: "العقارات" },
  { icon: GraduationCap, en: "Academia", ar: "الأوساط الأكاديمية" },
  { icon: Users, en: "HR & Organizational Development", ar: "الموارد البشرية والتطوير المؤسسي" },
  { icon: HeartHandshake, en: "Nonprofits", ar: "المنظمات غير الربحية" },
];

const tones = ["bg-navy text-white", "bg-steel text-ink", "bg-rust text-white"];

export default function IndustrySectorsSection() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  return (
    <section className="relative py-20 sm:py-28 bg-white dark:bg-night-900 border-y border-slate-200/70 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-12 sm:mb-14">
          <div className="lg:col-span-7 space-y-4">
            <div className="brand-rule" aria-hidden="true" />
            <span className="eyebrow block">{isAr ? "القطاعات التي نخدمها" : "INDUSTRIES WE SERVE"}</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-ink dark:text-white font-display leading-[1.1]">
              {isAr ? (
                <>خبرة متعددة التخصصات<br /><span className="text-navy dark:text-steel">عبر قطاعات متنوعة</span></>
              ) : (
                <>Multidisciplinary Experience<br /><span className="text-navy dark:text-steel">Across Many Sectors</span></>
              )}
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {isAr
                ? "تتيح لنا خبرتنا متعددة التخصصات العمل عبر مجموعة واسعة من القطاعات، مع أساليب قابلة للنقل وتحسين قابل للقياس."
                : "Our multidisciplinary experience allows us to work across a wide range of sectors—bringing transferable methods and measurable improvement to each."}
            </p>
          </div>
        </div>

        {/* Industries grid */}
        <StaggerContainer delayChildren={0.05} staggerChildren={0.04} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {industries.map((ind, idx) => {
            const Icon = ind.icon;
            return (
              <StaggerItem
                key={ind.en}
                className="group flex items-center gap-3 p-4 rounded-2xl bg-slate-50/70 dark:bg-night-800/70 border border-slate-200/80 dark:border-white/10 hover:bg-white dark:hover:bg-night-800 hover:border-navy/25 dark:hover:border-steel/30 hover:shadow-lift hover:-translate-y-0.5 transition-all duration-300"
              >
                <span className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110 ${tones[idx % 3]}`}>
                  <Icon className="w-[18px] h-[18px]" />
                </span>
                <span className="text-[13px] font-bold leading-snug text-ink dark:text-white">{isAr ? ind.ar : ind.en}</span>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <div className="mt-10 flex justify-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-navy hover:bg-navy-800 text-white text-sm font-bold transition-colors shadow-sm"
          >
            <span>{isAr ? "استكشف ما نقوم به" : "Explore What We Do"}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </section>
  );
}
