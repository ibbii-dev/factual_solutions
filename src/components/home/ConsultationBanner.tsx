"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

/** Closing call to action on navy, with two logo-colored shapes turning slowly in the corner. */
export default function ConsultationBanner() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  return (
    <section className="relative overflow-hidden bg-navy dark:bg-night-900 text-white">
      <div aria-hidden="true" className="pointer-events-none absolute -end-16 -top-16 w-72 h-72 sm:w-96 sm:h-96">
        <div className="fs-spin absolute inset-0 border-2 border-steel/40" />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute end-24 -bottom-24 w-40 h-40 sm:w-56 sm:h-56">
        <div className="fs-spin-rev absolute inset-0 bg-rust" />
      </div>
      <div data-reveal className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-5">
          <p className="fs-label fs-label-light">{isAr ? "لنبدأ" : "Start a conversation"}</p>
          <h2 className="text-[2rem] sm:text-5xl font-semibold font-display leading-[1.08]">
            {isAr ? "لنجد القطعة الناقصة معاً." : "Let\u2019s find the piece that\u2019s missing."}
          </h2>
          <p className="lede text-[#E4E9F3] max-w-xl">
            {isAr
              ? "تحدث إلى مستشارينا حول الاستشارات أو التدريب أو ERP والتحول الرقمي لمؤسستك."
              : "Talk to our consultants about consulting, training, or ERP and digital transformation for your organization."}
          </p>
        </div>
        <div className="lg:col-span-5 flex flex-wrap gap-3 sm:gap-4 lg:justify-end">
          <Link href="/contact" className="fs-btn fs-btn-rust">
            {isAr ? "طلب استشارة" : "Request a consultation"}
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
          <Link href="/contact?type=discovery" className="fs-btn fs-btn-ghost">
            {isAr ? "احجز نقاشاً" : "Book a discussion"}
          </Link>
        </div>
      </div>
    </section>
  );
}
