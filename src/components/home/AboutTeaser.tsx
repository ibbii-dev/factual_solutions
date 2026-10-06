"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

/** Who we are: practitioners, with a photo framed by two logo-colored blocks. */
export default function AboutTeaser() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  return (
    <section aria-labelledby="about-heading" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div data-reveal className="lg:col-span-5 space-y-5">
          <p className="fs-label">{isAr ? "من نحن" : "Who we are"}</p>
          <h2 id="about-heading" className="text-[2rem] sm:text-5xl font-semibold font-display leading-[1.08] text-navy dark:text-white">
            {isAr ? "ممارسون، لا مجرد مستشارين." : "Practitioners, not just advisors."}
          </h2>
          <p className="text-lg sm:text-xl font-semibold text-ink dark:text-white">
            {isAr ? "خبرة عملية. أساليب قابلة للنقل. تحسين قابل للقياس." : "Practical experience. Transferable methods. Measurable improvement."}
          </p>
          <p className="text-slate-500 dark:text-slate-300">
            {isAr
              ? "نقدّم منظور الممارسين الذين عملوا مع عمليات حقيقية وفرق حقيقية وقيود حقيقية وتحديات أعمال حقيقية. دورنا ليس مجرد التوصية بما يجب تغييره، بل مساعدة المؤسسات على فهم التغيير وتنفيذه وقياسه واستدامته."
              : "We bring the perspective of practitioners who have worked with real processes, real teams, real constraints, and real business challenges. Our role is not simply to recommend what should change, but to help organizations understand, implement, measure, and sustain that change."}
          </p>
          <div className="pt-2">
            <Link href="/about" className="fs-btn fs-btn-navy">
              {isAr ? "تعرّف على فريقنا" : "Meet the team"}
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
        <div data-reveal className="lg:col-span-7 relative" style={{ "--d": "120ms" } as React.CSSProperties}>
          <div aria-hidden="true" className="absolute -start-3 sm:-start-4 -bottom-3 sm:-bottom-4 w-20 h-20 sm:w-28 sm:h-28 bg-rust" />
          <div aria-hidden="true" className="absolute -end-3 sm:-end-4 -top-3 sm:-top-4 w-14 h-14 sm:w-20 sm:h-20 bg-steel" />
          <div className="relative aspect-[5/4] overflow-hidden bg-paper-deep">
            <Image
              src="/images/consulting-meeting.webp"
              alt={isAr ? "فريق Factual Solutions في ورشة عمل مع عميل" : "Factual Solutions consultants in a working session with a client team"}
              fill
              sizes="(max-width: 1024px) 100vw, 680px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
