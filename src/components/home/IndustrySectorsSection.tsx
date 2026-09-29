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

  return (
    <section className="py-20 sm:py-28 bg-transparent text-[#152238] dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-12 sm:mb-16">
          <div className="lg:col-span-7 space-y-2">
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#A33C29]">
              {isAr ? "القطاعات الاقتصادية" : "INDUSTRY SPECIALIZATIONS"}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#152238] dark:text-white font-display">
              {isAr ? (
                <>
                  خبرات قطاعية متخصصة <br />
                  في الأسواق الرئيسية
                </>
              ) : (
                <>
                  Advising Businesses Across <br />
                  Key Industry Sectors
                </>
              )}
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
              {isAr
                ? "أطر عمل مصممة خصيصاً لكل قطاع، مع تقييم المخاطر وتحديد خطط العمل ذات الأثر التشغيلي العالي."
                : "Tailored market frameworks, sector-specific risk registers, and operational playbooks configured for high-execution reliability."}
            </p>
          </div>
        </div>

        {/* 6 Cards Grid - Frosted Glass */}
        <StaggerContainer delayChildren={0.1} staggerChildren={0.06} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((sector) => {
            const IconComp = sector.icon;
            return (
              <StaggerItem
                key={sector.id}
                className="p-6 rounded-2xl bg-white dark:bg-transparent backdrop-blur-md border border-slate-200/90 dark:border-white/15 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-[#152238] dark:text-[#8EA9D3] flex items-center justify-center font-bold">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#A33C29]">
                      {sector.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#152238] dark:text-white font-display group-hover:text-[#A33C29] transition-colors">
                    {sector.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {sector.description}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-200/50 dark:border-white/5">
                  <Link
                    href={sector.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#152238] dark:text-slate-200 group-hover:text-[#A33C29] transition-colors"
                  >
                    <span>{isAr ? "استكشف خدمات القطاع" : "Explore Sector Services"}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform" />
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
