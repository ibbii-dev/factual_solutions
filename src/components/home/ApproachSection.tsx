"use client";

import React from "react";
import { ShieldCheck, Target, TrendingUp } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { PHASES_AR, PHASES_EN } from "@/data/servicesData";
import SectionHeading from "@/components/ui/SectionHeading";

const STEP = [
  { Icon: Target, tile: "bg-navy" },
  { Icon: TrendingUp, tile: "bg-steel text-navy" },
  { Icon: ShieldCheck, tile: "bg-rust" },
];

/** How we work: three connected step cards. */
export default function ApproachSection() {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const phases = (isAr ? PHASES_AR : PHASES_EN).consulting;

  return (
    <section aria-labelledby="approach-heading" className="py-20 sm:py-24 bg-white dark:bg-night-850/60 border-y border-paper-line dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="approach-heading"
          align="center"
          label={isAr ? "طريقة عملنا" : "How we work"}
          title={isAr ? "من الدليل" : "From evidence"}
          highlight={isAr ? "إلى الممارسة اليومية" : "to everyday practice"}
          className="mb-14"
        />
        <ol className="relative grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          <span aria-hidden="true" className="hidden md:block absolute top-[3.1rem] inset-x-[16%] h-px bg-gradient-to-r from-navy/30 via-steel/60 to-rust/40" />
          {phases.map((ph, i) => {
            const { Icon, tile } = STEP[i];
            return (
              <li key={ph.phase} data-reveal style={{ "--d": `${i * 140}ms` } as React.CSSProperties} className="relative fs-card fs-card-hover p-6 sm:p-7 flex flex-col items-center text-center gap-3">
                <span className={`fs-icon !w-14 !h-14 !rounded-2xl shadow-card ${tile}`}><Icon className="w-6 h-6" aria-hidden="true" /></span>
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-rust dark:text-rust-light">{isAr ? "المرحلة" : "Step"} {ph.phase}</span>
                <h3 className="text-xl font-bold text-ink dark:text-white">{ph.title}</h3>
                <p className="text-[15px] text-slate-600 dark:text-slate-300">{ph.desc}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
