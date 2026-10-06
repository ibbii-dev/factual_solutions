"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getServicePillars, getServicesByCategory } from "@/data/servicesData";

/** "What we do" as a numbered index: one ruled row per service line. */
export default function ServiceLinesStrip() {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const pillars = getServicePillars(language);

  return (
    <section aria-labelledby="what-we-do-heading" className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 mb-10 sm:mb-14">
          <p className="lg:col-span-3 eyebrow pt-2">{isAr ? "ما نقوم به" : "What we do"}</p>
          <h2 data-reveal id="what-we-do-heading" className="lg:col-span-9 text-3xl sm:text-[2.6rem] font-bold font-display leading-[1.1] text-ink dark:text-white max-w-3xl">
            {isAr ? "ثلاث طرق نساعد بها المؤسسات على التحسين." : "Three ways we help organizations improve."}
          </h2>
        </div>

        <ol className="fs-rule border-t border-ink/15 dark:border-white/15">
          {pillars.map((p, i) => {
            const items = getServicesByCategory(p.id, language);
            return (
              <li key={p.id} data-reveal style={{ "--d": `${i * 120}ms` } as React.CSSProperties} className="border-b border-ink/15 dark:border-white/15">
                <Link href={`/services?line=${p.id}#${p.id}`} className="group grid grid-cols-12 gap-x-4 lg:gap-x-6 gap-y-3 py-8 sm:py-10 items-baseline">
                  <span className="col-span-2 lg:col-span-1 section-no text-lg">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="col-span-10 lg:col-span-4 text-2xl sm:text-3xl font-bold font-display text-ink dark:text-white group-hover:text-accent transition-colors">
                    <span className="fs-row-title">{p.title}</span>
                  </h3>
                  <div className="col-span-10 col-start-3 lg:col-span-6 lg:col-start-6 space-y-3">
                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">{p.tagline}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{items.map((it) => it.title).join(" · ")}</p>
                  </div>
                  <ArrowRight
                    className="fs-row-arrow hidden lg:block col-span-1 justify-self-end w-5 h-5 text-slate-400 group-hover:text-accent rtl:rotate-180"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
