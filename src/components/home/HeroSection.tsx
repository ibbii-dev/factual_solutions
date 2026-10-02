"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Layers, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function HeroSection() {
  const { language, isRTL } = useLanguage();
  const isAr = language === "ar";

  return (
    <section className="relative pt-32 sm:pt-40 md:pt-44 pb-20 sm:pb-28 overflow-hidden bg-transparent text-[#152238] dark:text-white transition-colors duration-300 min-h-[90vh] flex items-center justify-center">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-7">
        
        {/* Category Eyebrow Pill */}
        <ScrollReveal variant="fade-up" duration={0.5}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold tracking-widest uppercase shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#E25C43] shrink-0 animate-pulse" />
            <span>{isAr ? "استشارات وحلول الأعمال التنفيذية" : "EXECUTIVE ADVISORY • BUSINESS EXCELLENCE"}</span>
          </div>
        </ScrollReveal>

        {/* Main Headline */}
        <ScrollReveal variant="fade-up" delay={0.1} duration={0.6}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] font-display drop-shadow-[0_2px_16px_rgba(0,0,0,0.7)]">
            {isAr ? (
              <>
                تمكين المؤسسات <br />
                <span className="text-[#E25C43]">لتنمية أعمالها بنجاح.</span>
              </>
            ) : (
              <>
                Consulting People to <br />
                <span className="text-[#E25C43]">Grow Their Business.</span>
              </>
            )}
          </h1>
        </ScrollReveal>

        {/* Sub-headline */}
        <ScrollReveal variant="fade-up" delay={0.2} duration={0.6}>
          <p className="text-base sm:text-lg md:text-xl text-slate-100 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.7)]">
            {isAr
              ? "تخطيط عملي للأعمال، نمذجة مالية واستشارات استراتيجية لمساعدة الشركات على توسيع نطاق عملياتها واستقرار نموها التجاري."
              : "Practical business planning, financial modeling, and management consulting to help companies scale operations and steady commercial growth."}
          </p>
        </ScrollReveal>

        {/* Action Buttons */}
        <ScrollReveal variant="fade-up" delay={0.3} duration={0.6}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#E25C43] hover:bg-[#c94a33] text-white text-xs sm:text-sm font-bold transition-all duration-200 shadow-lg hover:shadow-2xl hover:-translate-y-0.5"
            >
              <span>{isAr ? "طلب استشارة تنفيذية" : "Request a Consultation"}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>

            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold border border-white/25 backdrop-blur-md transition-all shadow-sm hover:-translate-y-0.5"
            >
              <Layers className="w-4 h-4 text-slate-200" />
              <span>{isAr ? "استكشف الممارسات" : "Explore Practices"}</span>
            </Link>
          </div>
        </ScrollReveal>

        {/* Floating Minimal Glass Metric Strip */}
        <ScrollReveal variant="fade-up" delay={0.4} duration={0.6} className="pt-8 sm:pt-12">
          <div className="p-4 sm:p-5 rounded-2xl bg-black/45 backdrop-blur-md border border-white/20 shadow-xl grid grid-cols-2 md:grid-cols-4 gap-4 text-center max-w-4xl mx-auto text-white">
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-white font-display">91.4%</div>
              <div className="text-[11px] text-slate-100 font-medium mt-0.5 drop-shadow-sm">
                {isAr ? "دقة تنفيذ المخرجات" : "Delivery Execution"}
              </div>
            </div>
            <div className="border-s border-white/15">
              <div className="text-xl sm:text-2xl font-extrabold text-[#E25C43] font-display">
                {isAr ? "الربع الأعلى" : "Top Quartile"}
              </div>
              <div className="text-[11px] text-slate-100 font-medium mt-0.5 drop-shadow-sm">
                {isAr ? "المعيار الاستشاري" : "Industry Benchmark"}
              </div>
            </div>
            <div className="border-s-0 md:border-s border-white/15">
              <div className="text-xl sm:text-2xl font-extrabold text-white font-display">18+</div>
              <div className="text-[11px] text-slate-100 font-medium mt-0.5 drop-shadow-sm">
                {isAr ? "ممارسة متخصصة" : "Advisory Practices"}
              </div>
            </div>
            <div className="border-s border-white/15">
              <div className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-display">100% NDA</div>
              <div className="text-[11px] text-slate-100 font-medium mt-0.5 drop-shadow-sm">
                {isAr ? "سرية وحوكمة صارمة" : "Strict Governance"}
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}