"use client";

import React from "react";
import { Search, Compass, Zap, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";

const stepIcons = [
  <Search key="1" className="w-5 h-5" />,
  <Compass key="2" className="w-5 h-5" />,
  <Zap key="3" className="w-5 h-5" />,
  <CheckCircle2 key="4" className="w-5 h-5" />
];

export default function MethodologySection() {
  const { t, isRTL } = useLanguage();

  return (
    <section className="py-16 sm:py-24 bg-[#DFE8F6]/75 dark:bg-[#0B1320]/65 backdrop-blur-sm text-[#152238] dark:text-white relative overflow-hidden border-t border-[#8EA9D3]/30 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <ScrollReveal variant="fade-up" className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8EA9D3]/25 text-[#152238] dark:text-brand-steel-light text-xs font-semibold uppercase tracking-wider">
            {t.methodology.eyebrow}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#152238] dark:text-white font-display">
            {t.methodology.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            {t.methodology.subtitle}
          </p>
        </ScrollReveal>

        {/* 4 Steps Grid */}
        <StaggerContainer delayChildren={0.15} staggerChildren={0.12} className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.methodology.steps.map((step, idx) => (
            <StaggerItem
              key={step.step}
              variant="fade-up"
              className="bg-white/85 dark:bg-[#111C2E]/80 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-[#8EA9D3]/30 dark:border-slate-800 flex flex-col justify-between shadow-sm hover:border-brand-steel hover:-translate-y-1 transition-all duration-300 group"
            >
              <div>
                {/* Step Icon Badge */}
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-sm ${
                    idx === 0
                      ? "bg-[#8EA9D3]/25 text-[#152238] dark:text-brand-steel-light"
                      : idx === 1
                      ? "bg-[#152238] text-white dark:bg-[#1E3150]"
                      : idx === 2
                      ? "bg-brand-rust/20 text-brand-rust dark:text-brand-rust-light"
                      : "bg-emerald-500/20 text-emerald-600 dark:text-emerald-300"
                  }`}
                >
                  {stepIcons[idx]}
                </div>

                <div className="text-[11px] font-bold uppercase tracking-wider text-brand-rust dark:text-brand-steel-light mb-1.5">
                  {t.methodology.phase} {step.step}
                </div>
                <h3 className="text-lg font-bold text-[#152238] dark:text-white mb-2.5 font-display">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[#8EA9D3]/20 dark:border-slate-800 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                <span>{t.methodology.phaseOutcome}</span>
                <span className="font-bold text-[#152238] dark:text-brand-steel-light">{step.outcome}</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Bottom CTA Banner */}
        <ScrollReveal variant="zoom-in" delay={0.2} className="mt-12 text-center">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#152238] hover:bg-brand-rust text-white text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-lg"
          >
            <span>{t.methodology.learnLeadership}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        </ScrollReveal>

      </div>
    </section>
  );
}
