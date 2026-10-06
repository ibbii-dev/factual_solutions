"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getServicePillars, getServicesByCategory } from "@/data/servicesData";

/** Each service line is one piece of the logo cube, in that piece's exact color. */
const PIECES: Record<string, { color: string; text: string }> = {
  consulting: { color: "#25346B", text: "text-navy dark:text-steel" },
  training: { color: "#9BB3D9", text: "text-navy dark:text-steel" },
  digital: { color: "#9B391E", text: "text-rust dark:text-rust-light" },
};

export default function ServiceLinesStrip() {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const pillars = getServicePillars(language);

  return (
    <section aria-labelledby="what-we-do-heading" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-reveal className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-end mb-12 sm:mb-16">
          <div className="space-y-4">
            <p className="fs-label">{isAr ? "ما نقوم به" : "What we do"}</p>
            <h2 id="what-we-do-heading" className="text-[2rem] sm:text-5xl font-semibold font-display leading-[1.08] text-navy dark:text-white">
              {isAr ? "ثلاث طرق نساعد بها المؤسسات على التحسين." : "Three ways we help organizations improve."}
            </h2>
          </div>
          <p className="lede text-slate-500 dark:text-slate-300 max-w-xl">
            {isAr
              ? "كل خط خدمة قطعة من المكعب. ومعاً تنقل التغيير من التشخيص إلى الممارسة اليومية."
              : "Each service line is one piece of the cube. Used together, they take a change from diagnosis to daily practice."}
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {pillars.map((p, i) => {
            const piece = PIECES[p.id] || PIECES.consulting;
            const items = getServicesByCategory(p.id, language);
            return (
              <li key={p.id} data-reveal style={{ "--d": `${i * 120}ms` } as React.CSSProperties}>
                <Link
                  href={`/services?line=${p.id}#${p.id}`}
                  className="fs-card group h-full flex flex-col gap-4 p-7 sm:p-8 pt-9 bg-white dark:bg-night-800 border border-paper-line dark:border-white/10"
                  style={{ "--piece": piece.color } as React.CSSProperties}
                >
                  <span className={`fs-card-no font-display text-sm font-semibold ${piece.text}`}>{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-2xl sm:text-[1.75rem] font-semibold font-display leading-tight text-ink dark:text-white">{p.title}</h3>
                  <p className="text-[17px] text-slate-500 dark:text-slate-300">{p.tagline}</p>
                  <p className="text-[15px] leading-relaxed text-slate-500 dark:text-slate-400">{items.map((it) => it.title).join(" · ")}</p>
                  <span className={`fs-card-more mt-auto pt-3 inline-flex items-center gap-2 text-[15px] font-semibold ${piece.text}`}>
                    {isAr ? "استكشف" : "Explore"} {p.title}
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
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
