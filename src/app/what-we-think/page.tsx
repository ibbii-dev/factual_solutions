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
      title: isAr ? "معايير التميز المؤسسي والحوكمة" : "Institutional Excellence & Governance",
      desc: isAr 
        ? "رؤى استراتيجية حول هيكلة مجالس الإدارة وحوكمة اتخاذ القرارات في المنشآت الإقليمية."
        : "Strategic frameworks for executive board alignment, KPI ownership, and sustainable organizational governance."
    },
    {
      icon: TrendingUp,
      title: isAr ? "هندسة النمو والتعافي المؤسسي" : "Growth Architecture & Turnarounds",
      desc: isAr
        ? "منهجيات عملية لتحويل الشركات المتعثرة إلى مسارات نمو وربحية مستدامة."
        : "Actionable frameworks for business restructuring, turnaround roadmaps, and commercial scaling."
    },
    {
      icon: Layers,
      title: isAr ? "دراسات الجدوى ونمذجة رأس المال" : "Capital Modeling & Market Feasibility",
      desc: isAr
        ? "أدلة توجيهية حول إعداد الدراسات البنكية المعتمدة وتقييم المخاطر الاستثمارية."
        : "Rigorous standards for bank-grade feasibility studies, capital deployment, and sensitivity testing."
    }
  ];

  return (
    <div className="pt-24 sm:pt-32 pb-20 sm:pb-28 min-h-screen bg-transparent text-[#152238] dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Hero */}
        <ScrollReveal variant="fade-up" className="text-center max-w-3xl mx-auto space-y-4 mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-transparent text-[#A33C29] dark:text-white border border-slate-200/90 dark:border-white/20 text-[10.5px] sm:text-[11px] font-bold uppercase tracking-wider sm:tracking-widest shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isAr ? "رؤيتنا الاستراتيجية والفكرية" : "Perspectives & Thought Leadership"}</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight font-display drop-shadow-[0_2px_16px_rgba(0,0,0,0.7)]">
            {isAr ? "رؤيتنا" : "What We Think"}
          </h1>
          
          <p className="text-sm sm:text-base md:text-lg text-slate-100 leading-relaxed font-normal drop-shadow-sm">
            {isAr
              ? "وجهات نظر استشارية معمقة، أطر عمل منهجية، وتحليلات استراتيجية يقودها نخبة من الخبراء والمستشارين."
              : "Proprietary advisory viewpoints, executive frameworks, and institutional strategic analyses curated by our senior consulting leadership."}
          </p>
        </ScrollReveal>

        {/* Editorial Notice Banner */}
        <ScrollReveal variant="fade-up" delay={0.1} className="max-w-4xl mx-auto mb-16 sm:mb-20">
          <div className="rounded-3xl p-6 sm:p-10 border border-slate-200/90 dark:border-white/15 bg-white dark:bg-transparent backdrop-blur-md shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#8EA9D3]/10 dark:bg-[#8EA9D3]/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-[#A33C29]/10 text-[#A33C29] flex items-center justify-center shrink-0">
                <Lightbulb className="w-7 h-7" />
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#A33C29] uppercase tracking-wider">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{isAr ? "محتوى حصري قيد التحرير" : "Curated Content in Editorial Finalization"}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#152238] dark:text-white font-display">
                  {isAr 
                    ? "أوراق عمل استشارية ورؤى استراتيجية جديدة قادمة قريباً" 
                    : "Executive Briefings & Perspectives Releasing Soon"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {isAr
                    ? "يقوم فريقنا الاستشاري حالياً بإعداد ونشر أوراق العمل المتخصصة، أطر القياس، والتحليلات القطاعية المعمقة. سيتم إطلاق المحتوى الفكري الكامل هنا قريباً."
                    : "Our senior consulting leadership is finalizing a suite of proprietary frameworks, sector diagnostics, and board-level strategic publications. Dedicated briefings will be published directly here."}
                </p>
              </div>

              <div className="shrink-0 pt-2 md:pt-0 w-full md:w-auto">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 rounded-full bg-[#A33C29] hover:bg-[#8E3221] text-white text-xs sm:text-sm font-bold transition-all shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{isAr ? "طلب إحاطة تنفيذية" : "Request Executive Briefing"}</span>
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Thematic Pillars Preview */}
        <div className="max-w-5xl mx-auto mb-16 sm:mb-20">
          <div className="text-center mb-8 sm:mb-10 space-y-2">
            <span className="text-[10px] sm:text-xs font-bold text-slate-200 uppercase tracking-widest drop-shadow-sm">
              {isAr ? "محاور الرؤية الاستشارية" : "CORE PERSPECTIVE THEMES"}
            </span>
            <h2 className="text-xl sm:text-3xl font-bold text-white font-display drop-shadow-sm">
              {isAr ? "ما نركز عليه في دراساتنا وتوجهاتنا" : "Key Areas of Institutional Research"}
            </h2>
          </div>

          <StaggerContainer delayChildren={0.1} staggerChildren={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {previewThemes.map((theme, idx) => {
              const IconComp = theme.icon;
              return (
                <StaggerItem
                  key={idx}
                  className="bg-white dark:bg-transparent backdrop-blur-md p-6 rounded-2xl border border-slate-200/90 dark:border-white/15 shadow-sm flex flex-col justify-between hover:shadow-xl transition-all"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-[#A33C29] flex items-center justify-center font-bold">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-[#152238] dark:text-white font-display">
                      {theme.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {theme.desc}
                    </p>
                  </div>

                  <div className="pt-5 mt-4 border-t border-slate-100 dark:border-white/5 flex items-center gap-1.5 text-xs font-semibold text-[#8EA9D3]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{isAr ? "منهجيات مدققة" : "Empirical Methodology"}</span>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>

        {/* Quick Navigation to Services & Contact */}
        <ScrollReveal variant="fade-up" className="max-w-3xl mx-auto text-center space-y-4 pt-6">
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {isAr 
              ? "هل ترغب في استكشاف قدراتنا وممارساتنا الاستشارية الحالية؟"
              : "Looking to explore our current consulting practices and advisory frameworks?"}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-[#15233A] text-[#152238] dark:text-white text-xs sm:text-sm font-semibold border border-slate-200 dark:border-slate-700 hover:border-[#152238] dark:hover:border-white transition-all shadow-xs"
            >
              <span>{isAr ? "استكشف ما نقوم به (الممارسات)" : "Explore What We Do"}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-200 hover:text-[#A33C29] text-xs sm:text-sm font-semibold transition-all"
            >
              <span>{isAr ? "تصفح المقالات والمدونة" : "Browse Blog & Articles"}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
}
