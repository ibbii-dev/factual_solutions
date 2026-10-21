"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import BrandMark from "@/components/ui/BrandMark";

/** Closing call to action: a deep navy card with the puzzle mark. */
export default function ConsultationBanner() {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const points = isAr ? ["الاستشارات", "التدريب", "ERP والتحول الرقمي"] : ["Consulting", "Training", "ERP & digital transformation"];

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-reveal className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0E1A38] via-[#1A2756] to-navy text-white shadow-lift">
          <div aria-hidden="true" className="absolute top-0 inset-x-0 h-1 bg-brand-tri" />
          <div aria-hidden="true" className="absolute -end-24 -bottom-24 w-[28rem] h-[28rem] rounded-full bg-[radial-gradient(closest-side,rgba(155,179,217,0.18),transparent)]" />
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-8 sm:p-12 lg:p-14">
            <div className="lg:col-span-8 space-y-6">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-steel-light">
                <span className="w-1.5 h-1.5 rounded-full bg-rust" aria-hidden="true" />
                {isAr ? "تواصل معنا" : "Contact us"}
              </p>
              <h2 className="text-[2rem] sm:text-[2.6rem] font-extrabold leading-[1.1] tracking-[-0.025em]">
                {isAr ? "تواصل مع فريقنا الاستشاري" : "Contact Our Advisory Team"}
              </h2>
              <p className="lede text-slate-200 max-w-2xl">
                {isAr
                  ? "تحدث إلى مستشارينا حول الاستشارات أو التدريب أو ERP والتحول الرقمي لمؤسستك."
                  : "Talk to our consultants about consulting, training, or ERP and digital transformation for your organization."}
              </p>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-slate-200">
                {points.map((p) => (
                  <li key={p} className="inline-flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-steel" aria-hidden="true" />{p}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link href="/contact" className="btn-primary">
                  {isAr ? "طلب استشارة" : "Request a Consultation"}
                  <ArrowRight className="fs-arrow w-4 h-4 rtl:rotate-180" />
                </Link>
                <Link href="/contact?type=discovery" className="btn-secondary !bg-white/5 !border-white/20 !text-white !shadow-none hover:!border-white/40">
                  <CalendarDays className="w-4 h-4" aria-hidden="true" />
                  {isAr ? "احجز نقاشاً" : "Book a Discussion"}
                </Link>
              </div>
            </div>
            <div className="hidden lg:flex lg:col-span-4 justify-center">
              <BrandMark outline className="w-56 h-56 overflow-visible drop-shadow-[0_24px_40px_rgba(0,0,0,0.35)] transition-transform duration-700 ease-out group-hover:rotate-[-4deg] group-hover:scale-105" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
