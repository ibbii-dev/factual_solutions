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
      title: isAr ? "الإدارة الاستراتيجية وتوافق القيادة" : "Strategic Management & OKRs",
      desc: isAr 
        ? "مواءمة رؤية المنشأة، وهيكلة مؤشرات الأداء، وتدقيق الاختناقات التشغيلية لتحقيق نمو مستدام."
        : "Aligning executive leadership, OKR roadmaps, and resolving operational bottlenecks to drive measurable corporate scale.",
      link: "/services/strategic-consulting"
    },
    {
      num: "02",
      icon: TrendingUp,
      title: isAr ? "النمذجة المالية ودراسات الجدوى" : "Financial Modeling & Feasibility",
      desc: isAr
        ? "بناء تدفقات نقدية لـ 5 سنوات، ونماذج العائد على الاستثمار، وملفات بنكية معتمدة للتمويل والتوسع."
        : "Bank-ready financial projections, CapEx/OpEx modeling, and empirical feasibility analyses for capital allocation.",
      link: "/services/investment-planning"
    },
    {
      num: "03",
      icon: Layers,
      title: isAr ? "إدارة المشاريع ومنهجية لين 6 سيجما" : "Projects & Lean Six Sigma",
      desc: isAr
        ? "قيادة تنفيذية معتمدة (PMP) للقضاء على الهدر التشغيلي، وضبط الميزانيات، ومتابعة الإنجاز المرحلي."
        : "Certified PMO delivery and Lean Master Black Belt methodologies to eliminate waste and guarantee milestones.",
      link: "/services/projects-management"
    },
    {
      num: "04",
      icon: Cpu,
      title: isAr ? "تحول العمليات وهندسة الأنظمة ERP" : "Process & ERP Transformation",
      desc: isAr
        ? "إعادة هندسة الإجراءات المعيارية (SOPs)، وتسهيل تسليم المهام بين الأقسام، وجاهزية أنظمة ERP."
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
            {isAr ? "حلولنا الاستشارية الرئيسية" : "CORE ADVISORY CAPABILITIES"}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-display drop-shadow-[0_2px_14px_rgba(0,0,0,0.8)]">
            {isAr ? "ممارسات استشارية تركز على النتائج" : "Institutional Advisory Practices"}
          </h2>
          <p className="text-sm sm:text-base text-slate-100 font-normal leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
            {isAr
              ? "حلول استشارية متخصصة ومصممة لدعم القرارات الاستثمارية، وتحسين الكفاءة التشغيلية للمنشآت."
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
                    <span>{isAr ? "استكشف تفاصيل الممارسة" : "Explore Capability Details"}</span>
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
            <span>{isAr ? "عرض جميع الممارسات الـ 18" : "Explore All 18 Advisory Practices"}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        </div>

      </div>
    </section>
  );
}
