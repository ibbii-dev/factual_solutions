"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, BarChart3, Compass, Repeat, Users, Workflow } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { content } from "@/data/thinkingContent";
import SectionHeading from "@/components/ui/SectionHeading";

const ICONS = [Workflow, BarChart3, Users, Compass, Repeat];
const TILES = ["bg-navy", "bg-steel text-navy", "bg-rust", "bg-navy", "bg-steel text-navy"];

/** What we think: the principles as icon cards. */
export default function PrinciplesSection() {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const c = content[isAr ? "ar" : "en"];

  return (
    <section aria-labelledby="think-heading" className="py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="think-heading"
          label={c.badge}
          title={c.headline}
          lede={
            <div className="space-y-4">
              <p>{c.lead}</p>
              <Link href="/what-we-think" className="link-arrow text-[15px] text-navy dark:text-steel-light">
                {isAr ? "اقرأ رؤيتنا" : "Read how we think"}
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
            </div>
          }
          className="mb-12"
        />
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5">
          {c.principles.map((pr, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <li
                key={pr.title}
                data-reveal
                style={{ "--d": `${i * 90}ms` } as React.CSSProperties}
                className={`fs-card fs-card-hover p-6 flex flex-col gap-3 ${i < 3 ? "lg:col-span-2" : "lg:col-span-3"}`}
              >
                <div className="flex items-center justify-between">
                  <span className={`fs-icon ${TILES[i % TILES.length]}`}><Icon className="w-5 h-5" aria-hidden="true" /></span>
                  <span className="font-display text-sm font-bold text-slate-500 dark:text-slate-400" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="text-lg font-bold leading-snug text-ink dark:text-white">{pr.title}</h3>
                <p className="text-[15px] text-slate-600 dark:text-slate-300">{pr.desc}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
