"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, PhoneCall, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function ConsultationBanner() {
  const { t, isRTL } = useLanguage();

  return (
    <section className="py-14 sm:py-20 bg-white/80 dark:bg-[#0E1626]/75 backdrop-blur-[2px] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="zoom-in" duration={0.7} className="relative rounded-3xl bg-gradient-to-br from-[#152238] via-[#1A2C49] to-[#111C2E] dark:from-[#131E33] dark:via-[#182640] dark:to-[#0E1626] text-white overflow-hidden p-8 sm:p-12 lg:p-14 shadow-2xl border border-slate-200/40 dark:border-slate-800">
          
          {/* Subtle Ambient Glow inside Banner */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-brand-rust/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-brand-steel/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-4 text-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-steel-light text-xs font-semibold backdrop-blur-md">
                <span className="flex h-2 w-2 rounded-full bg-brand-rust shrink-0 animate-pulse" />
                <span>{t.cta.badge}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight font-display">
                {t.cta.title}
              </h2>

              <p className="text-xs sm:text-sm md:text-base text-slate-200 dark:text-slate-300 max-w-2xl leading-relaxed font-normal">
                {t.cta.description}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-300 font-medium">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-brand-steel-light" /> {t.cta.confidential}
                </span>
                <span className="flex items-center gap-1.5">
                  <PhoneCall className="w-4 h-4 text-brand-steel-light" /> {t.cta.callback}
                </span>
              </div>
            </div>

            {/* Right CTA Buttons */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-brand-rust hover:bg-brand-rust-light text-white text-xs sm:text-sm font-bold transition-all shadow-md hover:shadow-brand-rust/30 hover:scale-[1.02] text-center"
              >
                <span>{t.cta.requestButton}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-semibold border border-white/20 transition-all text-center hover:scale-[1.02]"
              >
                <span>{t.cta.exploreButton}</span>
              </Link>
            </div>

          </div>

        </ScrollReveal>
      </div>
    </section>
  );
}
