"use client";

import React from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Lightbulb, 
  Sparkles, 
  Compass, 
  ShieldCheck, 
  TrendingUp, 
  Layers, 
  MessageSquare,
  Clock
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";

export default function WhatWeThinkPage() {
  const { language, isRTL } = useLanguage();

  const isAr = language === "ar";

  const previewThemes = [
    {
      icon: Compass,
      title: isAr ? "┘à╪╣╪º┘è┘è╪▒ ╪º┘ä╪¬┘à┘è╪▓ ╪º┘ä┘à╪ñ╪│╪│┘è ┘ê╪º┘ä╪¡┘ê┘â┘à╪⌐" : "Institutional Excellence & Governance",
      desc: isAr 
        ? "╪▒╪ñ┘ë ╪º╪│╪¬╪▒╪º╪¬┘è╪¼┘è╪⌐ ╪¡┘ê┘ä ┘ç┘è┘â┘ä╪⌐ ┘à╪¼╪º┘ä╪│ ╪º┘ä╪Ñ╪»╪º╪▒╪⌐ ┘ê╪¡┘ê┘â┘à╪⌐ ╪º╪¬╪«╪º╪░ ╪º┘ä┘é╪▒╪º╪▒╪º╪¬ ┘ü┘è ╪º┘ä┘à┘å╪┤╪ó╪¬ ╪º┘ä╪Ñ┘é┘ä┘è┘à┘è╪⌐."
        : "Strategic frameworks for executive board alignment, KPI ownership, and sustainable organizational governance."
    },
    {
      icon: TrendingUp,
      title: isAr ? "┘ç┘å╪»╪│╪⌐ ╪º┘ä┘å┘à┘ê ┘ê╪º┘ä╪¬╪╣╪º┘ü┘è ╪º┘ä┘à╪ñ╪│╪│┘è" : "Growth Architecture & Turnarounds",
      desc: isAr
        ? "┘à┘å┘ç╪¼┘è╪º╪¬ ╪╣┘à┘ä┘è╪⌐ ┘ä╪¬╪¡┘ê┘è┘ä ╪º┘ä╪┤╪▒┘â╪º╪¬ ╪º┘ä┘à╪¬╪╣╪½╪▒╪⌐ ╪Ñ┘ä┘ë ┘à╪│╪º╪▒╪º╪¬ ┘å┘à┘ê ┘ê╪▒╪¿╪¡┘è╪⌐ ┘à╪│╪¬╪»╪º┘à╪⌐."
        : "Actionable frameworks for business restructuring, turnaround roadmaps, and commercial scaling."
    },
    {
      icon: Layers,
      title: isAr ? "╪»╪▒╪º╪│╪º╪¬ ╪º┘ä╪¼╪»┘ê┘ë ┘ê┘å┘à╪░╪¼╪⌐ ╪▒╪ú╪│ ╪º┘ä┘à╪º┘ä" : "Capital Modeling & Market Feasibility",
      desc: isAr
        ? "╪ú╪»┘ä╪⌐ ╪¬┘ê╪¼┘è┘ç┘è╪⌐ ╪¡┘ê┘ä ╪Ñ╪╣╪»╪º╪» ╪º┘ä╪»╪▒╪º╪│╪º╪¬ ╪º┘ä╪¿┘å┘â┘è╪⌐ ╪º┘ä┘à╪╣╪¬┘à╪»╪⌐ ┘ê╪¬┘é┘è┘è┘à ╪º┘ä┘à╪«╪º╪╖╪▒ ╪º┘ä╪º╪│╪¬╪½┘à╪º╪▒┘è╪⌐."
        : "Rigorous standards for bank-grade feasibility studies, capital deployment, and sensitivity testing."
    }
  ];

  return (
    <div className="pt-24 sm:pt-32 pb-20 sm:pb-28 min-h-screen bg-transparent text-[#152238] dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Hero */}
        <ScrollReveal variant="fade-up" className="text-center max-w-3xl mx-auto space-y-4 mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 text-[#E25C43] border border-white/20 text-[10.5px] sm:text-[11px] font-bold uppercase tracking-wider sm:tracking-widest shadow-sm backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isAr ? "╪▒╪ñ┘è╪¬┘å╪º ╪º┘ä╪º╪│╪¬╪▒╪º╪¬┘è╪¼┘è╪⌐ ┘ê╪º┘ä┘ü┘â╪▒┘è╪⌐" : "Perspectives & Thought Leadership"}</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight font-display drop-shadow-[0_2px_16px_rgba(0,0,0,0.7)]">
            {isAr ? "╪▒╪ñ┘è╪¬┘å╪º" : "What We Think"}
          </h1>
          
          <p className="text-sm sm:text-base md:text-lg text-slate-100 leading-relaxed font-medium drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
            {isAr
              ? "┘ê╪¼┘ç╪º╪¬ ┘å╪╕╪▒ ╪º╪│╪¬╪┤╪º╪▒┘è╪⌐ ┘à╪╣┘à┘é╪⌐╪î ╪ú╪╖╪▒ ╪╣┘à┘ä ┘à┘å┘ç╪¼┘è╪⌐╪î ┘ê╪¬╪¡┘ä┘è┘ä╪º╪¬ ╪º╪│╪¬╪▒╪º╪¬┘è╪¼┘è╪⌐ ┘è┘é┘ê╪»┘ç╪º ┘å╪«╪¿╪⌐ ┘à┘å ╪º┘ä╪«╪¿╪▒╪º╪í ┘ê╪º┘ä┘à╪│╪¬╪┤╪º╪▒┘è┘å."
              : "Proprietary advisory viewpoints, executive frameworks, and institutional strategic analyses curated by our senior consulting leadership."}
          </p>
        </ScrollReveal>

        {/* Editorial Notice Banner */}
        <ScrollReveal variant="fade-up" delay={0.1} className="max-w-4xl mx-auto mb-16 sm:mb-20">
          <div className="rounded-3xl p-6 sm:p-10 border border-white/20 bg-black/45 backdrop-blur-md shadow-2xl relative overflow-hidden text-white">
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#8EA9D3]/10 dark:bg-[#8EA9D3]/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/15 text-[#E25C43] flex items-center justify-center shrink-0">
                <Lightbulb className="w-7 h-7" />
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E25C43] uppercase tracking-wider">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{isAr ? "┘à╪¡╪¬┘ê┘ë ╪¡╪╡╪▒┘è ┘é┘è╪» ╪º┘ä╪¬╪¡╪▒┘è╪▒" : "Curated Content in Editorial Finalization"}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white font-display">
                  {isAr 
                    ? "╪ú┘ê╪▒╪º┘é ╪╣┘à┘ä ╪º╪│╪¬╪┤╪º╪▒┘è╪⌐ ┘ê╪▒╪ñ┘ë ╪º╪│╪¬╪▒╪º╪¬┘è╪¼┘è╪⌐ ╪¼╪»┘è╪»╪⌐ ┘é╪º╪»┘à╪⌐ ┘é╪▒┘è╪¿╪º┘ï" 
                    : "Executive Briefings & Perspectives Releasing Soon"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                  {isAr
                    ? "┘è┘é┘ê┘à ┘ü╪▒┘è┘é┘å╪º ╪º┘ä╪º╪│╪¬╪┤╪º╪▒┘è ╪¡╪º┘ä┘è╪º┘ï ╪¿╪Ñ╪╣╪»╪º╪» ┘ê┘å╪┤╪▒ ╪ú┘ê╪▒╪º┘é ╪º┘ä╪╣┘à┘ä ╪º┘ä┘à╪¬╪«╪╡╪╡╪⌐╪î ╪ú╪╖╪▒ ╪º┘ä┘é┘è╪º╪│╪î ┘ê╪º┘ä╪¬╪¡┘ä┘è┘ä╪º╪¬ ╪º┘ä┘é╪╖╪º╪╣┘è╪⌐ ╪º┘ä┘à╪╣┘à┘é╪⌐. ╪│┘è╪¬┘à ╪Ñ╪╖┘ä╪º┘é ╪º┘ä┘à╪¡╪¬┘ê┘ë ╪º┘ä┘ü┘â╪▒┘è ╪º┘ä┘â╪º┘à┘ä ┘ç┘å╪º ┘é╪▒┘è╪¿╪º┘ï."
                    : "Our senior consulting leadership is finalizing a suite of proprietary frameworks, sector diagnostics, and board-level strategic publications. Dedicated briefings will be published directly here."}
                </p>
              </div>

              <div className="shrink-0 pt-2 md:pt-0 w-full md:w-auto">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 rounded-full bg-[#E25C43] hover:bg-[#c94a33] text-white text-xs sm:text-sm font-bold transition-all shadow-lg"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{isAr ? "╪╖┘ä╪¿ ╪Ñ╪¡╪º╪╖╪⌐ ╪¬┘å┘ü┘è╪░┘è╪⌐" : "Request Executive Briefing"}</span>
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Thematic Pillars Preview */}
        <div className="max-w-5xl mx-auto mb-16 sm:mb-20">
          <div className="text-center mb-8 sm:mb-10 space-y-2">
            <span className="text-[10px] sm:text-xs font-bold text-slate-200 uppercase tracking-widest drop-shadow-sm">
              {isAr ? "┘à╪¡╪º┘ê╪▒ ╪º┘ä╪▒╪ñ┘è╪⌐ ╪º┘ä╪º╪│╪¬╪┤╪º╪▒┘è╪⌐" : "CORE PERSPECTIVE THEMES"}
            </span>
            <h2 className="text-xl sm:text-3xl font-bold text-white font-display drop-shadow-sm">
              {isAr ? "┘à╪º ┘å╪▒┘â╪▓ ╪╣┘ä┘è┘ç ┘ü┘è ╪»╪▒╪º╪│╪º╪¬┘å╪º ┘ê╪¬┘ê╪¼┘ç╪º╪¬┘å╪º" : "Key Areas of Institutional Research"}
            </h2>
          </div>

          <StaggerContainer delayChildren={0.1} staggerChildren={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {previewThemes.map((theme, idx) => {
              const IconComp = theme.icon;
              return (
                <StaggerItem
                  key={idx}
                  className="bg-black/45 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl flex flex-col justify-between hover:border-white/35 hover:shadow-2xl transition-all text-white"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 text-[#E25C43] flex items-center justify-center font-bold">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-white font-display">
                      {theme.title}
                    </h3>
                    <p className="text-xs text-slate-100 font-medium leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                      {theme.desc}
                    </p>
                  </div>

                  <div className="pt-5 mt-4 border-t border-white/15 flex items-center gap-1.5 text-xs font-semibold text-[#E25C43]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{isAr ? "┘à┘å┘ç╪¼┘è╪º╪¬ ┘à╪»┘é┘é╪⌐" : "Empirical Methodology"}</span>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>

        {/* Quick Navigation to Services & Contact */}
        <ScrollReveal variant="fade-up" className="max-w-3xl mx-auto text-center space-y-4 pt-6">
          <p className="text-xs sm:text-sm text-slate-100 font-semibold drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
            {isAr 
              ? "┘ç┘ä ╪¬╪▒╪║╪¿ ┘ü┘è ╪º╪│╪¬┘â╪┤╪º┘ü ┘é╪»╪▒╪º╪¬┘å╪º ┘ê┘à┘à╪º╪▒╪│╪º╪¬┘å╪º ╪º┘ä╪º╪│╪¬╪┤╪º╪▒┘è╪⌐ ╪º┘ä╪¡╪º┘ä┘è╪⌐╪ƒ"
              : "Looking to explore our current consulting practices and advisory frameworks?"}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs sm:text-sm font-semibold border border-white/25 backdrop-blur-md hover:border-white transition-all shadow-md"
            >
              <span>{isAr ? "╪º╪│╪¬┘â╪┤┘ü ┘à╪º ┘å┘é┘ê┘à ╪¿┘ç (╪º┘ä┘à┘à╪º╪▒╪│╪º╪¬)" : "Explore What We Do"}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-[#E25C43] text-white hover:text-white text-xs sm:text-sm font-semibold border border-white/20 backdrop-blur-md transition-all shadow-md"
            >
              <span>{isAr ? "╪¬╪╡┘ü╪¡ ╪º┘ä┘à┘é╪º┘ä╪º╪¬ ┘ê╪º┘ä┘à╪»┘ê┘å╪⌐" : "Browse Blog & Articles"}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
}