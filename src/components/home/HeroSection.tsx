"use client";

import React from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  CheckCircle, 
  ShieldCheck, 
  Briefcase, 
  Compass, 
  PhoneCall 
} from "lucide-react";
import InteractiveHeroCube from "./InteractiveHeroCube";
import { useLanguage } from "@/context/LanguageContext";

export default function HeroSection() {
  const { t, isRTL } = useLanguage();

  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-20 overflow-hidden bg-[#EBF1FA] dark:bg-[#0B1320] text-[#152238] dark:text-white border-b border-[#8EA9D3]/30 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Strategic Positioning & Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-start">
            
            {/* Direct Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#15233A] shadow-sm border border-[#8EA9D3]/40 dark:border-slate-700 text-xs font-semibold text-[#152238] dark:text-brand-steel-light max-w-full">
              <span className="flex h-2 w-2 rounded-full bg-brand-rust shrink-0" />
              <span>{t.hero.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#152238] dark:text-white leading-[1.2] sm:leading-[1.15] break-words font-display">
              {t.hero.headline}
            </h1>

            {/* Sub-headline */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-700 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              {t.hero.subheadline}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2 w-full">
              <Link
                href="/services"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-brand-rust hover:bg-brand-rust-light text-white text-sm font-semibold transition-all duration-200 shadow-sm"
              >
                <span>{t.hero.viewServices}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform" />
              </Link>

              <Link
                href="/contact"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white dark:bg-[#15233A] text-[#152238] dark:text-white text-sm font-semibold border border-[#8EA9D3]/40 dark:border-slate-700 hover:border-[#152238] dark:hover:border-brand-steel transition-all duration-200 shadow-sm"
              >
                <PhoneCall className="w-4 h-4 text-brand-rust" />
                <span>{t.hero.requestConsultation}</span>
              </Link>
            </div>

            {/* Value Highlights */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs font-medium text-slate-700 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{t.hero.handsOn}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#152238] dark:text-brand-steel-light shrink-0" />
                <span>{t.hero.confidential}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-brand-rust shrink-0" />
                <span>{t.hero.actionable}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean 3D Brand Symbol */}
          <div className="lg:col-span-5 flex justify-center items-center w-full">
            <InteractiveHeroCube />
          </div>

        </div>

        {/* 3 Core Practice Areas */}
        <div className="mt-14 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white dark:bg-[#111C2E] p-5 sm:p-6 rounded-2xl border border-[#8EA9D3]/30 dark:border-slate-800 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-lg bg-[#8EA9D3]/20 text-[#152238] dark:text-brand-steel-light flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-[#152238] dark:text-white font-display">{t.hero.businessSolutionsTitle}</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              {t.hero.businessSolutionsDesc}
            </p>
          </div>

          <div className="bg-white dark:bg-[#111C2E] p-5 sm:p-6 rounded-2xl border border-brand-rust/25 dark:border-slate-800 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-lg bg-brand-rust/15 text-brand-rust flex items-center justify-center">
              <Compass className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-[#152238] dark:text-white font-display">{t.hero.consultancyTitle}</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              {t.hero.consultancyDesc}
            </p>
          </div>

          <div className="bg-white dark:bg-[#111C2E] p-5 sm:p-6 rounded-2xl border border-emerald-500/25 dark:border-slate-800 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-[#152238] dark:text-white font-display">{t.hero.empiricalTitle}</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              {t.hero.empiricalDesc}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
