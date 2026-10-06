"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import PageHeader from "@/components/ui/PageHeader";
import { content } from "@/data/thinkingContent";


export default function WhatWeThinkPage() {
  const { language } = useLanguage();
  const c = language === "ar" ? content.ar : content.en;

  return (
    <div className="pb-20 sm:pb-28 min-h-screen text-ink dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader eyebrow={c.badge} title={c.headline} lede={<><p className="font-semibold text-ink dark:text-white">{c.lead}</p><p className="mt-3">{c.sub}</p></>} />

        {/* Principles as a numbered essay */}
        <ol className="mb-20 sm:mb-28">
          {c.principles.map((p, i) => (
            <li key={p.title} data-reveal className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 py-10 border-b border-ink/15 dark:border-white/15 first:pt-0">
              <span className="lg:col-span-3 section-no text-3xl sm:text-4xl">{String(i + 1).padStart(2, "0")}</span>
              <div className="lg:col-span-9 max-w-3xl space-y-3">
                <h2 className="text-2xl sm:text-3xl font-bold font-display leading-snug text-ink dark:text-white">{p.title}</h2>
                <p className="text-base sm:text-[17px] text-slate-700 dark:text-slate-300 leading-relaxed">{p.desc}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* Go deeper */}
        <section className="fs-rule grid grid-cols-1 lg:grid-cols-12 gap-6 border-t border-ink/15 dark:border-white/15 pt-10">
          <div data-reveal className="lg:col-span-9 lg:col-start-4 max-w-3xl space-y-5">
            <h2 className="text-3xl sm:text-[2.6rem] font-bold font-display leading-[1.1] text-ink dark:text-white">{c.deeperTitle}</h2>
            <p className="lede text-slate-700 dark:text-slate-300">{c.deeperText}</p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-2">
              <Link href="/blog" className="btn-ink inline-flex items-center gap-2 px-6 py-3.5 bg-ink hover:bg-navy dark:bg-white dark:text-ink text-white text-sm font-semibold transition-colors">
                {c.blogCta}
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
              <Link href="/services" className="link-arrow text-sm text-ink dark:text-white">
                {c.servicesCta}
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
