"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, PhoneCall } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function ConsultationBanner() {
  const { t } = useLanguage();

  return (
    <section className="py-16 sm:py-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <ScrollReveal variant="fade-up" duration={0.6}>
          <div className="relative rounded-3xl bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 dark:from-night-800 dark:via-night-850 dark:to-night-950 text-white p-7 sm:p-12 lg:p-16 overflow-hidden border border-navy-700 dark:border-white/10 shadow-lift">

            {/* Decorative: logo mark */}
            <div className="absolute -bottom-24 -right-24 w-[380px] h-[380px] rounded-full bg-steel/20 blur-3xl pointer-events-none" aria-hidden="true" />
            <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-[360px] h-[360px] opacity-90 hidden lg:block pointer-events-none" aria-hidden="true">
              <Image sizes="360px" src="/images/logo-symbol.png" alt="" fill className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)]" />
            </div>
            <div className="absolute top-0 left-0 h-1 w-full bg-brand-tri" aria-hidden="true" />

            <div className="relative z-10 max-w-2xl space-y-5">

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-steel-light border border-white/15 text-[11px] font-bold uppercase tracking-[0.14em]">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-rust-light" />
                <span>PRACTITIONERS, NOT JUST ADVISORS</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-display leading-[1.1]">
                Practical Experience. Transferable Methods. Measurable Improvement.
              </h2>

              <p className="text-sm sm:text-base text-slate-200/90 leading-relaxed max-w-xl">
                We bring the perspective of practitioners who have worked with real processes, real teams, real constraints, and real business challenges. Our role is not simply to recommend what should change, but to help organizations understand, implement, measure, and sustain that change.
              </p>

              <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2.5 sm:gap-6 pt-1 text-sm text-white/90 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-steel shrink-0" />
                  <span>Consulting</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-steel shrink-0" />
                  <span>Training</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-steel shrink-0" />
                  <span>ERP &amp; Digital Transformation</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
                <Link
                  href="/contact"
                  className="btn-sheen inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-rust hover:bg-rust-light text-white text-sm font-bold transition-all duration-200 shadow-cta hover:-translate-y-0.5 text-center"
                >
                  <span>Request a Consultation</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </Link>

                <Link
                  href="/contact?type=discovery"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm font-semibold border border-white/20 transition-all duration-200 hover:-translate-y-0.5 text-center"
                >
                  <PhoneCall className="w-4 h-4 text-steel" />
                  <span>Book a Discussion</span>
                </Link>
              </div>

            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
