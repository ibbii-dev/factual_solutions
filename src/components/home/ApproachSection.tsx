"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { PHASES_AR, PHASES_EN } from "@/data/servicesData";

/** How we work: three steps, each with a navy line that draws across in turn. */
export default function ApproachSection() {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const phases = (isAr ? PHASES_AR : PHASES_EN).consulting;

  return (
    <section aria-labelledby="approach-heading" className="py-20 sm:py-28 bg-paper-deep dark:bg-night-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-reveal className="space-y-4 max-w-3xl mb-12 sm:mb-16">
          <p className="fs-label">{isAr ? "طريقة عملنا" : "How we work"}</p>
          <h2 id="approach-heading" className="text-[2rem] sm:text-[2.75rem] font-semibold font-display leading-[1.1] text-navy dark:text-white">
            {isAr ? "من الدليل إلى الممارسة اليومية." : "From evidence to everyday practice."}
          </h2>
        </div>
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          {phases.map((ph, i) => (
            <li key={ph.phase} data-reveal className="fs-step flex flex-col gap-3" style={{ "--d": `${i * 220}ms` } as React.CSSProperties}>
              <span className="font-display text-5xl sm:text-6xl font-semibold leading-none text-navy dark:text-steel">{ph.phase}</span>
              <h3 className="text-xl sm:text-2xl font-semibold font-display text-ink dark:text-white">{ph.title}</h3>
              <p className="text-slate-500 dark:text-slate-300">{ph.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
