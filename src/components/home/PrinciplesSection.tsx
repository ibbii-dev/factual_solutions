"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { content } from "@/data/thinkingContent";

/** What we think: the five principles as ruled rows on navy. */
export default function PrinciplesSection() {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const c = content[isAr ? "ar" : "en"];

  return (
    <section aria-labelledby="think-heading" className="py-20 sm:py-28 bg-navy dark:bg-night-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-reveal className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-end mb-10 sm:mb-14">
          <div className="space-y-4">
            <p className="fs-label fs-label-light">{c.badge}</p>
            <h2 id="think-heading" className="text-[2rem] sm:text-5xl font-semibold font-display leading-[1.08]">{c.headline}</h2>
          </div>
          <div className="space-y-5">
            <p className="lede text-[#E4E9F3] max-w-xl">{c.lead}</p>
            <Link href="/what-we-think" className="link-arrow text-[15px] text-white">
              {isAr ? "اقرأ رؤيتنا" : "Read how we think"}
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
        <ol className="border-b border-white/20">
          {c.principles.map((pr, i) => (
            <li
              key={pr.title}
              data-reveal
              style={{ "--d": `${i * 80}ms` } as React.CSSProperties}
              className="fs-prow grid grid-cols-[3rem_minmax(0,1fr)] lg:grid-cols-[5rem_minmax(0,1fr)_minmax(0,1.2fr)] gap-x-4 lg:gap-x-8 gap-y-2 py-7 sm:py-8 border-t border-white/20 px-1"
            >
              <span className="fs-prow-no font-display text-xl text-steel">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-xl sm:text-[1.6rem] font-semibold font-display leading-snug">{pr.title}</h3>
              <p className="col-start-2 lg:col-start-3 text-[#D5DCEA]">{pr.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
