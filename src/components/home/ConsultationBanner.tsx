"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

/** Closing statement: a plain, confident block of type on ink. */
export default function ConsultationBanner() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  return (
    <section className="bg-navy dark:bg-night-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <p className="lg:col-span-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-steel-light pt-3">
          {isAr ? "ممارسون، لا مجرد مستشارين" : "Practitioners, not just advisors"}
        </p>
        <div data-reveal className="lg:col-span-9 space-y-8">
          <h2 className="text-3xl sm:text-5xl font-bold font-display leading-[1.08] max-w-4xl">
            {isAr ? "خبرة عملية. أساليب قابلة للنقل. تحسين قابل للقياس." : "Practical experience. Transferable methods. Measurable improvement."}
          </h2>
          <p className="lede text-slate-200/90 max-w-2xl">
            {isAr
              ? "نقدّم منظور الممارسين الذين عملوا مع عمليات حقيقية وفرق حقيقية وقيود حقيقية وتحديات أعمال حقيقية. دورنا ليس مجرد التوصية بما يجب تغييره، بل مساعدة المؤسسات على فهم التغيير وتنفيذه وقياسه واستدامته."
              : "We bring the perspective of practitioners who have worked with real processes, real teams, real constraints, and real business challenges. Our role is not simply to recommend what should change, but to help organizations understand, implement, measure, and sustain that change."}
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-2">
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-ink hover:bg-steel-light text-sm font-semibold transition-colors">
              {isAr ? "طلب استشارة" : "Request a consultation"}
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
            <Link href="/contact?type=discovery" className="link-arrow text-sm text-white">
              {isAr ? "احجز نقاشاً" : "Book a discussion"}
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
