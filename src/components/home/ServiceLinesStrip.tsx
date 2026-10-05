"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Briefcase, GraduationCap, Cpu } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getServicePillars, getServicesByCategory } from "@/data/servicesData";
import { StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";

const ICONS = { consulting: Briefcase, training: GraduationCap, digital: Cpu } as const;
const TONES = {
  consulting: "bg-navy text-white",
  training: "bg-steel text-ink",
  digital: "bg-rust text-white",
} as const;

export default function ServiceLinesStrip() {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const pillars = getServicePillars(language);

  return (
    <section aria-labelledby="what-we-do-heading" className="relative py-16 sm:py-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-10">
          <div className="space-y-3">
            <div className="brand-rule" aria-hidden="true" />
            <span className="eyebrow block">{isAr ? "ما نقوم به" : "WHAT WE DO"}</span>
            <h2 id="what-we-do-heading" className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-ink dark:text-white font-display">
              {isAr ? "ثلاثة مسارات خدمة" : "Three Service Lines, One Goal"}
            </h2>
          </div>
          <Link href="/services" className="inline-flex items-center gap-1.5 text-sm font-bold text-navy dark:text-steel hover:text-rust dark:hover:text-rust-light transition-colors">
            {isAr ? "عرض كل الخدمات" : "View all services"}
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        </div>

        <StaggerContainer staggerChildren={0.08} className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {pillars.map((p) => {
            const Icon = ICONS[p.id];
            const count = getServicesByCategory(p.id, language).length;
            return (
              <StaggerItem key={p.id}>
                <Link
                  href={`/services?line=${p.id}`}
                  className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl bg-white dark:bg-night-800/80 p-6 border border-slate-200/80 dark:border-white/10 shadow-card hover:shadow-lift hover:-translate-y-0.5 hover:border-navy/25 dark:hover:border-steel/30 transition-all duration-300"
                >
                  <span className="absolute top-0 inset-x-0 h-[3px] bg-brand-tri scale-x-0 origin-left rtl:origin-right group-hover:scale-x-100 transition-transform duration-500" aria-hidden="true" />
                  <div className="flex items-center justify-between">
                    <span className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-sm ${TONES[p.id]}`}>
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
                      {count} {isAr ? "فئات" : "categories"}
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-bold font-display text-ink dark:text-white">{p.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{p.tagline}</p>
                  </div>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold text-navy dark:text-steel group-hover:text-rust dark:group-hover:text-rust-light transition-colors">
                    {isAr ? "استكشف" : "Explore"}
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
