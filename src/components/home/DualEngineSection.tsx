"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Compass, TrendingUp, Layers, Cpu } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";

export default function DualEngineSection() {
  const { language, isRTL } = useLanguage();
  const isAr = language === "ar";

  const corePractices = [
    {
      num: "01",
      icon: Compass,
      title: isAr ? "╪º┘ä╪Ñ╪»╪º╪▒╪⌐ ╪º┘ä╪º╪│╪¬╪▒╪º╪¬┘è╪¼┘è╪⌐ ┘ê╪¬┘ê╪º┘ü┘é ╪º┘ä┘é┘è╪º╪»╪⌐" : "Strategic Management & OKRs",
      desc: isAr 
        ? "┘à┘ê╪º╪í┘à╪⌐ ╪▒╪ñ┘è╪⌐ ╪º┘ä┘à┘å╪┤╪ú╪⌐╪î ┘ê┘ç┘è┘â┘ä╪⌐ ┘à╪ñ╪┤╪▒╪º╪¬ ╪º┘ä╪ú╪»╪º╪í╪î ┘ê╪¬╪»┘é┘è┘é ╪º┘ä╪º╪«╪¬┘å╪º┘é╪º╪¬ ╪º┘ä╪¬╪┤╪║┘è┘ä┘è╪⌐ ┘ä╪¬╪¡┘é┘è┘é ┘å┘à┘ê ┘à╪│╪¬╪»╪º┘à."
        : "Aligning executive leadership, OKR roadmaps, and resolving operational bottlenecks to drive measurable corporate scale.",
      link: "/services/strategic-consulting"
    },
    {
      num: "02",
      icon: TrendingUp,
      title: isAr ? "╪º┘ä┘å┘à╪░╪¼╪⌐ ╪º┘ä┘à╪º┘ä┘è╪⌐ ┘ê╪»╪▒╪º╪│╪º╪¬ ╪º┘ä╪¼╪»┘ê┘ë" : "Financial Modeling & Feasibility",
      desc: isAr
        ? "╪¿┘å╪º╪í ╪¬╪»┘ü┘é╪º╪¬ ┘å┘é╪»┘è╪⌐ ┘ä┘Ç 5 ╪│┘å┘ê╪º╪¬╪î ┘ê┘å┘à╪º╪░╪¼ ╪º┘ä╪╣╪º╪ª╪» ╪╣┘ä┘ë ╪º┘ä╪º╪│╪¬╪½┘à╪º╪▒╪î ┘ê┘à┘ä┘ü╪º╪¬ ╪¿┘å┘â┘è╪⌐ ┘à╪╣╪¬┘à╪»╪⌐ ┘ä┘ä╪¬┘à┘ê┘è┘ä ┘ê╪º┘ä╪¬┘ê╪│╪╣."
        : "Bank-ready financial projections, CapEx/OpEx modeling, and empirical feasibility analyses for capital allocation.",
      link: "/services/investment-planning"
    },
    {
      num: "03",
      icon: Layers,
      title: isAr ? "╪Ñ╪»╪º╪▒╪⌐ ╪º┘ä┘à╪┤╪º╪▒┘è╪╣ ┘ê┘à┘å┘ç╪¼┘è╪⌐ ┘ä┘è┘å 6 ╪│┘è╪¼┘à╪º" : "Projects & Lean Six Sigma",
      desc: isAr
        ? "┘é┘è╪º╪»╪⌐ ╪¬┘å┘ü┘è╪░┘è╪⌐ ┘à╪╣╪¬┘à╪»╪⌐ (PMP) ┘ä┘ä┘é╪╢╪º╪í ╪╣┘ä┘ë ╪º┘ä┘ç╪»╪▒ ╪º┘ä╪¬╪┤╪║┘è┘ä┘è╪î ┘ê╪╢╪¿╪╖ ╪º┘ä┘à┘è╪▓╪º┘å┘è╪º╪¬╪î ┘ê┘à╪¬╪º╪¿╪╣╪⌐ ╪º┘ä╪Ñ┘å╪¼╪º╪▓ ╪º┘ä┘à╪▒╪¡┘ä┘è."
        : "Certified PMO delivery and Lean Master Black Belt methodologies to eliminate waste and guarantee milestones.",
      link: "/services/projects-management"
    },
    {
      num: "04",
      icon: Cpu,
      title: isAr ? "╪¬╪¡┘ê┘ä ╪º┘ä╪╣┘à┘ä┘è╪º╪¬ ┘ê┘ç┘å╪»╪│╪⌐ ╪º┘ä╪ú┘å╪╕┘à╪⌐ ERP" : "Process & ERP Transformation",
      desc: isAr
        ? "╪Ñ╪╣╪º╪»╪⌐ ┘ç┘å╪»╪│╪⌐ ╪º┘ä╪Ñ╪¼╪▒╪º╪í╪º╪¬ ╪º┘ä┘à╪╣┘è╪º╪▒┘è╪⌐ (SOPs)╪î ┘ê╪¬╪│┘ç┘è┘ä ╪¬╪│┘ä┘è┘à ╪º┘ä┘à┘ç╪º┘à ╪¿┘è┘å ╪º┘ä╪ú┘é╪│╪º┘à╪î ┘ê╪¼╪º┘ç╪▓┘è╪⌐ ╪ú┘å╪╕┘à╪⌐ ERP."
        : "Standardized workflow SOPs, departmental handover optimization, and enterprise ERP implementation readiness.",
      link: "/services/process-transformation"
    }
  ];

  return (
    <section id="services" className="py-20 sm:py-28 bg-transparent text-[#152238] dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal variant="fade-up" className="max-w-3xl space-y-3 mb-12 sm:mb-16">
          <span className="text-[11px] font-bold tracking-widest uppercase text-[#E25C43] drop-shadow-sm">
            {isAr ? "╪¡┘ä┘ê┘ä┘å╪º ╪º┘ä╪º╪│╪¬╪┤╪º╪▒┘è╪⌐ ╪º┘ä╪▒╪ª┘è╪│┘è╪⌐" : "CORE ADVISORY CAPABILITIES"}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-display drop-shadow-[0_2px_14px_rgba(0,0,0,0.8)]">
            {isAr ? "┘à┘à╪º╪▒╪│╪º╪¬ ╪º╪│╪¬╪┤╪º╪▒┘è╪⌐ ╪¬╪▒┘â╪▓ ╪╣┘ä┘ë ╪º┘ä┘å╪¬╪º╪ª╪¼" : "Institutional Advisory Practices"}
          </h2>
          <p className="text-sm sm:text-base text-slate-100 font-normal leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
            {isAr
              ? "╪¡┘ä┘ê┘ä ╪º╪│╪¬╪┤╪º╪▒┘è╪⌐ ┘à╪¬╪«╪╡╪╡╪⌐ ┘ê┘à╪╡┘à┘à╪⌐ ┘ä╪»╪╣┘à ╪º┘ä┘é╪▒╪º╪▒╪º╪¬ ╪º┘ä╪º╪│╪¬╪½┘à╪º╪▒┘è╪⌐╪î ┘ê╪¬╪¡╪│┘è┘å ╪º┘ä┘â┘ü╪º╪í╪⌐ ╪º┘ä╪¬╪┤╪║┘è┘ä┘è╪⌐ ┘ä┘ä┘à┘å╪┤╪ó╪¬."
              : "Structured business advisory, financial feasibility, and operational excellence designed to drive sustainable growth."}
          </p>
        </ScrollReveal>

        {/* 4 Cards Grid - Frosted Glass */}
        <StaggerContainer delayChildren={0.1} staggerChildren={0.08} className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {corePractices.map((practice) => {
            const IconComp = practice.icon;
            return (
              <StaggerItem
                key={practice.num}
                className="p-7 sm:p-8 rounded-3xl bg-black/45 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl hover:border-white/35 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group text-white"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 text-white flex items-center justify-center font-bold">
                      <IconComp className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs font-bold text-[#E25C43] font-display">
                      {practice.num}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg sm:text-xl font-bold text-white font-display group-hover:text-[#E25C43] transition-colors drop-shadow-sm">
                      {practice.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                      {practice.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-white/15 flex items-center justify-between text-xs font-bold">
                  <Link
                    href={practice.link}
                    className="inline-flex items-center gap-1.5 text-white group-hover:text-[#E25C43] transition-colors"
                  >
                    <span>{isAr ? "╪º╪│╪¬┘â╪┤┘ü ╪¬┘ü╪º╪╡┘è┘ä ╪º┘ä┘à┘à╪º╪▒╪│╪⌐" : "Explore Capability Details"}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform" />
                  </Link>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Center CTA Button */}
        <div className="mt-12 sm:mt-16 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#E25C43] hover:bg-[#c94a33] text-white text-xs sm:text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
          >
            <span>{isAr ? "╪╣╪▒╪╢ ╪¼┘à┘è╪╣ ╪º┘ä┘à┘à╪º╪▒╪│╪º╪¬ ╪º┘ä┘Ç 18" : "Explore All 18 Advisory Practices"}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        </div>

      </div>
    </section>
  );
}