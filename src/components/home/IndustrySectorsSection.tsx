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
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";

const sectors = [
  {
    id: "retail",
    icon: <ShoppingBag className="w-5 h-5 text-[#152238] dark:text-brand-steel-light" />,
    badge: "RETAIL & E-COMMERCE",
    title: "Retail & Consumer Commerce",
    description: "Omnichannel retail strategy, customer basket economics, inventory turn plans, and direct-to-consumer expansion frameworks.",
    link: "/services?sector=retail"
  },
  {
    id: "manufacturing",
    icon: <Factory className="w-5 h-5 text-[#152238] dark:text-brand-steel-light" />,
    badge: "MANUFACTURING",
    title: "Manufacturing & Industrial",
    description: "Lean factory structures, throughput bottleneck resolution, plant layout optimization, and CapEx equipment viability studies.",
    link: "/services?sector=manufacturing"
  },
  {
    id: "logistics",
    icon: <Truck className="w-5 h-5 text-[#152238] dark:text-brand-steel-light" />,
    badge: "TRADE",
    title: "Wholesale & Logistics Trade",
    description: "Route optimization, bulk procurement formulas, supplier concession negotiations, and regional distribution hub frameworks.",
    link: "/services?sector=logistics"
  },
  {
    id: "commercial",
    icon: <Building2 className="w-5 h-5 text-[#152238] dark:text-brand-steel-light" />,
    badge: "SERVICES",
    title: "Commercial Services Corporate",
    description: "B2B organizational design, SLA restructuring, billing efficiency, and proprietary service monetization frameworks.",
    link: "/services?sector=commercial"
  },
  {
    id: "real-estate",
    icon: <Home className="w-5 h-5 text-[#152238] dark:text-brand-steel-light" />,
    badge: "REAL ESTATE",
    title: "Real Estate & Contracting Property",
    description: "Project financial feasibility, EPC contractor cash-flow models, yield curve estimation studies, and joint venture mechanics.",
    link: "/services?sector=realestate"
  },
  {
    id: "tech",
    icon: <Cpu className="w-5 h-5 text-[#152238] dark:text-brand-steel-light" />,
    badge: "TECHNOLOGY",
    title: "Technology & Software Services",
    description: "SaaS unit economics, CAC/LTV calibration, cross-migration models, and enterprise software go-to-market execution.",
    link: "/services?sector=technology"
  }
];

export default function IndustrySectorsSection() {
  return (
    <section className="py-20 sm:py-24 bg-[#FAFBFD] dark:bg-[#0B1320] text-[#152238] dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-12 sm:mb-16">
          <div className="lg:col-span-7 space-y-2">
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#A33C29]">
              INDUSTRY SPECIALIZATIONS
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#152238] dark:text-white font-display">
              Advising Businesses Across <br className="hidden sm:inline" />
              Key Industry Sectors
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Tailored market frameworks, sector-specific risk registers, and operational playbooks configured for high-execution reliability.
            </p>
          </div>
        </div>

        {/* 6 Cards Grid */}
        <StaggerContainer delayChildren={0.1} staggerChildren={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((sector) => (
            <StaggerItem
              key={sector.id}
              className="bg-white dark:bg-[#111C2E] p-6 sm:p-7 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-xl hover:-translate-y-1.5 hover:border-[#8EA9D3]/60 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Icon box + category badge */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {sector.icon}
                  </div>
                  <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                    {sector.badge}
                  </span>
                </div>

                {/* Title & Desc */}
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-[#152238] dark:text-white font-display group-hover:text-[#A33C29] transition-colors">
                    {sector.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                    {sector.description}
                  </p>
                </div>
              </div>

              {/* Link */}
              <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800">
                <Link
                  href={sector.link}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#A33C29] hover:text-[#8E3221] transition-colors"
                >
                  <span>Explore Sector Deck</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform" />
                </Link>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </section>
  );
}
