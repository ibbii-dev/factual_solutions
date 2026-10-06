"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Compass, GraduationCap, MonitorCog } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getServicePillars, getServicesByCategory } from "@/data/servicesData";
import SectionHeading from "@/components/ui/SectionHeading";

/** Each service line is one piece of the logo cube, in that piece's exact color. */
const PIECES: Record<string, { color: string; tile: string; Icon: typeof Compass }> = {
  consulting: { color: "#25346B", tile: "bg-navy", Icon: Compass },
  training: { color: "#9BB3D9", tile: "bg-steel text-navy", Icon: GraduationCap },
  digital: { color: "#9B391E", tile: "bg-rust", Icon: MonitorCog },
};

export default function ServiceLinesStrip() {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const pillars = getServicePillars(language);

  return (
    <section aria-labelledby="what-we-do-heading" className="py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="what-we-do-heading"
          label={isAr ? "ما نقوم به" : "What we do"}
          title={isAr ? "ثلاث طرق نساعد بها" : "Three ways we help"}
          highlight={isAr ? "المؤسسات على التحسين" : "organizations improve"}
          lede={
            isAr
              ? "تحدد الاستشارات ما يجب تغييره. ويبني التدريب القدرة على تغييره. ويساعد التطبيق الرقمي على جعل التحسين جزءاً من العمل اليومي."
              : "Consulting identifies what needs to change. Training builds the capability to change it. Digital implementation helps make the improvement part of everyday work."
          }
          className="mb-12"
        />

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {pillars.map((p, i) => {
            const piece = PIECES[p.id] || PIECES.consulting;
            const items = getServicesByCategory(p.id, language);
            const Icon = piece.Icon;
            return (
              <li key={p.id} data-reveal style={{ "--d": `${i * 110}ms` } as React.CSSProperties}>
                <Link
                  href={`/services?line=${p.id}#${p.id}`}
                  className="group fs-card fs-card-hover fs-topbar h-full flex flex-col gap-4 p-6 sm:p-7"
                  style={{ "--piece": piece.color } as React.CSSProperties}
                >
                  <div className="flex items-center justify-between">
                    <span className={`fs-icon ${piece.tile}`}><Icon className="w-5 h-5" aria-hidden="true" /></span>
                    <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                      {isAr ? "خط الخدمة" : "Service line"} {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-[1.4rem] font-bold leading-snug text-ink dark:text-white">{p.title}</h3>
                  <p className="text-[15px] text-slate-600 dark:text-slate-300">{p.tagline}</p>
                  <ul className="pt-4 border-t border-paper-line dark:border-white/10 space-y-2">
                    {items.map((it) => (
                      <li key={it.id} className="flex items-start gap-2.5 text-[14px] text-slate-600 dark:text-slate-300">
                        <span className="fs-check mt-0.5"><svg viewBox="0 0 12 12" className="w-2.5 h-2.5" aria-hidden="true"><path d="M2.5 6.2 5 8.5 9.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                        {it.title}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto pt-3 flex items-center justify-between text-[14px] font-semibold text-navy dark:text-steel-light">
                    {isAr ? "استكشف الخدمات" : "Explore services"}
                    <span className="w-9 h-9 rounded-full border border-paper-line dark:border-white/15 flex items-center justify-center transition-colors group-hover:bg-navy group-hover:border-navy group-hover:text-white">
                      <ArrowRight className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
