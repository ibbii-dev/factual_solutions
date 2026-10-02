"use client";

import React from "react";
import Link from "next/link";
import { 
  ShoppingBag, 
  Factory, 
  Truck, 
  Building2, 
  Home, 
  Cpu, 
  ArrowRight 
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";

const sectors = [
  {
    id: "retail",
    icon: ShoppingBag,
    badge: "RETAIL & E-COMMERCE",
    title: "Retail & Consumer Commerce",
    description: "Omnichannel scaling, inventory turn planning & unit economics.",
    link: "/services?sector=retail"
  },
  {
    id: "manufacturing",
    icon: Factory,
    badge: "MANUFACTURING",
    title: "Manufacturing & Industrial",
    description: "Lean factory structures, throughput optimization & CapEx equipment viability.",
    link: "/services?sector=manufacturing"
  },
  {
    id: "logistics",
    icon: Truck,
    badge: "LOGISTICS & TRADE",
    title: "Logistics & Distribution",
    description: "Route optimization, procurement formulas & distribution hub frameworks.",
    link: "/services?sector=logistics"
  },
  {
    id: "commercial",
    icon: Building2,
    badge: "CORPORATE SERVICES",
    title: "Commercial Services",
    description: "B2B organizational design, SLA restructuring & margin expansion.",
    link: "/services?sector=commercial"
  },
  {
    id: "real-estate",
    icon: Home,
    badge: "REAL ESTATE",
    title: "Real Estate & Contracting",
    description: "Financial feasibility, contractor cash-flow models & yield curve analysis.",
    link: "/services?sector=realestate"
  },
  {
    id: "tech",
    icon: Cpu,
    badge: "TECHNOLOGY & SAAS",
    title: "Technology & Software",
    description: "SaaS unit economics, CAC/LTV calibration & go-to-market roadmaps.",
    link: "/services?sector=technology"
  }
];

export default function IndustrySectorsSection() {
  const { language, isRTL } = useLanguage();
  const isAr = language === "ar";

  const tones = [
    "bg-navy text-white",
    "bg-steel text-ink",
    "bg-rust text-white",
  ];

  return (
    <section className="relative py-20 sm:py-28 bg-white dark:bg-night-900 border-y border-slate-200/70 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-12 sm:mb-16">
          <div className="lg:col-span-7 space-y-4">
            <div className="brand-rule" aria-hidden="true" />
            <span className="eyebrow block">
              {isAr ? "القطاعات الاقتصادية" : "INDUSTRY SPECIALIZATIONS"}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-ink dark:text-white font-display leading-[1.1]">
              {isAr ? (
                <>
                  خبرات قطاعية متخصصة <br />
                  في الأسواق الرئيسية
                </>
              ) : (
                <>
                  Advising Businesses Across <br />
                  <span className="text-navy dark:text-steel">Key Industry Sectors</span>
                </>
              )}
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {isAr
                ? "أطر عمل مصممة خصيصاً لكل قطاع، مع تقييم المخاطر وتحديد خطط العمل ذات الأثر التشغيلي العالي."
                : "Tailored market frameworks, sector-specific risk registers, and operational playbooks configured for high-execution reliability."}
            </p>
          </div>
        </div>

        {/* 6 Cards Grid */}
        <StaggerContainer delayChildren={0.1} staggerChildren={0.06} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {sectors.map((sector, idx) => {
            const IconComp = sector.icon;
            return (
              <StaggerItem
                key={sector.id}
                className="relative p-6 sm:p-7 rounded-2xl bg-slate-50/70 dark:bg-night-800/70 border border-slate-200/80 dark:border-white/10 hover:bg-white dark:hover:bg-night-800 hover:border-navy/25 dark:hover:border-steel/30 hover:shadow-lift hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group text-ink dark:text-white overflow-hidden"
              >
                <span className="absolute top-0 inset-x-0 h-[3px] bg-brand-tri scale-x-0 origin-left rtl:origin-right group-hover:scale-x-100 transition-transform duration-500" aria-hidden="true" />
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${tones[idx % 3]}`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400 text-end pt-1">
                      {sector.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-ink dark:text-white font-display group-hover:text-navy dark:group-hover:text-steel-light transition-colors">
                    {sector.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {sector.description}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-200/80 dark:border-white/10">
                  <Link
                    href={sector.link}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-navy dark:text-steel-light group-hover:text-accent transition-colors after:absolute after:inset-0"
                  >
                    <span>{isAr ? "استكشف خدمات القطاع" : "Explore Sector Services"}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform" />
                  </Link>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

      </div>
    </section>
  );
}
