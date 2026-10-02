"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Layers, ShieldCheck, CheckCircle2, TrendingUp, Compass } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function HeroSection() {
  const { language, isRTL } = useLanguage();
  const isAr = language === "ar";

  const stats = [
    { value: "91.4%", label: isAr ? "دقة تنفيذ المخرجات" : "Delivery Execution", bar: "bg-navy" },
    { value: isAr ? "الربع الأعلى" : "Top Quartile", label: isAr ? "المعيار الاستشاري" : "Industry Benchmark", bar: "bg-rust" },
    { value: "18+", label: isAr ? "ممارسة متخصصة" : "Advisory Practices", bar: "bg-steel" },
    { value: "100% NDA", label: isAr ? "سرية وحوكمة صارمة" : "Strict Governance", bar: "bg-ink dark:bg-white" },
  ];

  return (
    <section className="relative pt-32 sm:pt-40 lg:pt-44 pb-16 sm:pb-24 overflow-hidden text-ink dark:text-white transition-colors duration-300">
      {/* Backdrop: blueprint grid + logo-color glows */}
      <div className="absolute inset-0 brand-grid [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)] pointer-events-none" aria-hidden="true" />
      <div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-steel/25 dark:bg-steel/10 blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute top-20 -right-40 w-[460px] h-[460px] rounded-full bg-rust/10 dark:bg-rust/15 blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Copy column */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-start">
            <ScrollReveal variant="fade-up" duration={0.5}>
              <div className="inline-flex items-center gap-2.5 ps-1.5 pe-4 py-1.5 rounded-full bg-white dark:bg-white/5 border border-navy/10 dark:border-white/10 text-navy dark:text-steel-light text-[10px] sm:text-[11px] font-bold tracking-[0.08em] sm:tracking-[0.14em] uppercase shadow-card max-w-full">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-navy text-white">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </span>
                <span>{isAr ? "استشارات وحلول الأعمال التنفيذية" : "EXECUTIVE ADVISORY • BUSINESS EXCELLENCE"}</span>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={0.1} duration={0.6}>
              <h1 className="text-[2.35rem] sm:text-6xl lg:text-[4.25rem] font-extrabold tracking-tight text-ink dark:text-white leading-[1.04] font-display">
                {isAr ? (
                  <>
                    تمكين المؤسسات <br />
                    <span className="text-navy dark:text-steel">لتنمية أعمالها بنجاح</span><span className="text-rust">.</span>
                  </>
                ) : (
                  <>
                    Consulting People to <br />
                    <span className="relative inline-block text-navy dark:text-steel">
                      Grow Their Business<span className="text-rust">.</span>
                      <svg className="absolute -bottom-2 left-0 w-full h-3 text-rust" viewBox="0 0 300 12" preserveAspectRatio="none" aria-hidden="true">
                        <path d="M2 9 C 80 2, 220 2, 298 7" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
                      </svg>
                    </span>
                  </>
                )}
              </h1>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={0.2} duration={0.6}>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {isAr
                  ? "تخطيط عملي للأعمال، نمذجة مالية واستشارات استراتيجية لمساعدة الشركات على توسيع نطاق عملياتها واستقرار نموها التجاري."
                  : "Practical business planning, financial modeling, and management consulting to help companies scale operations and steady commercial growth."}
              </p>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={0.3} duration={0.6}>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-1">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-rust hover:bg-rust-dark text-white text-sm font-bold transition-all duration-200 shadow-cta hover:-translate-y-0.5"
                >
                  <span>{isAr ? "طلب استشارة تنفيذية" : "Request a Consultation"}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </Link>

                <Link
                  href="/services"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white hover:bg-navy-50 dark:bg-white/5 dark:hover:bg-white/10 text-navy dark:text-white text-sm font-semibold border border-navy/15 dark:border-white/15 transition-all hover:-translate-y-0.5"
                >
                  <Layers className="w-4 h-4" />
                  <span>{isAr ? "استكشف الممارسات" : "Explore Practices"}</span>
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={0.35} duration={0.6}>
              <ul className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-navy dark:text-steel" />{isAr ? "تخطيط الأعمال" : "Business Planning"}</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-navy dark:text-steel" />{isAr ? "النمذجة المالية" : "Financial Modeling"}</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-navy dark:text-steel" />{isAr ? "الاستشارات الإدارية" : "Management Consulting"}</li>
              </ul>
            </ScrollReveal>
          </div>

          {/* Visual column: the logo cube as hero art */}
          <ScrollReveal variant="fade-up" delay={0.2} duration={0.7} className="lg:col-span-5 hidden sm:block">
            <div className="relative mx-auto w-full max-w-[440px] aspect-square">
              <div className="absolute inset-6 rounded-full bg-gradient-to-br from-navy-50 via-white to-steel/20 dark:from-navy-900/60 dark:via-night-800 dark:to-night-900 border border-navy/10 dark:border-white/10" />
              <div className="absolute inset-16 rounded-full border border-dashed border-navy/15 dark:border-steel/20 animate-[spin_60s_linear_infinite]" />
              <div className="absolute inset-[18%] drop-shadow-[0_30px_40px_rgba(31,58,125,0.25)]">
                <Image src="/images/logo-symbol.png" alt="Factual Solutions interlocking puzzle cube" fill priority className="object-contain" />
              </div>

              {/* Floating insight chips */}
              <div className="absolute top-8 -left-2 sm:-left-6 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white dark:bg-night-800 border border-slate-200 dark:border-white/10 shadow-lift">
                <span className="w-8 h-8 rounded-lg bg-navy text-white flex items-center justify-center"><Compass className="w-4 h-4" /></span>
                <span className="text-start">
                  <span className="block text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">{isAr ? "استراتيجية" : "Strategy"}</span>
                  <span className="block text-xs font-bold text-ink dark:text-white">{isAr ? "خارطة طريق واضحة" : "Clear Roadmaps"}</span>
                </span>
              </div>
              <div className="absolute bottom-10 -right-2 sm:-right-6 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white dark:bg-night-800 border border-slate-200 dark:border-white/10 shadow-lift">
                <span className="w-8 h-8 rounded-lg bg-rust text-white flex items-center justify-center"><TrendingUp className="w-4 h-4" /></span>
                <span className="text-start">
                  <span className="block text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">{isAr ? "نمو" : "Growth"}</span>
                  <span className="block text-xs font-bold text-ink dark:text-white">{isAr ? "نمو تجاري مستقر" : "Steady Commercial Growth"}</span>
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Metric strip */}
        <ScrollReveal variant="fade-up" delay={0.4} duration={0.6} className="pt-14 sm:pt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 rounded-2xl bg-white dark:bg-night-800/80 border border-slate-200/80 dark:border-white/10 shadow-card overflow-hidden">
            {stats.map((st, idx) => (
              <div
                key={idx}
                className={`relative p-5 sm:p-6 text-center md:text-start ${idx % 2 === 1 ? "border-s border-slate-200/80 dark:border-white/10" : ""} ${idx >= 2 ? "border-t md:border-t-0 border-slate-200/80 dark:border-white/10" : ""} ${idx === 2 ? "md:border-s" : ""}`}
              >
                <span className={`absolute top-0 inset-x-6 h-[3px] rounded-b-full ${st.bar}`} aria-hidden="true" />
                <div className="text-2xl sm:text-3xl font-extrabold text-ink dark:text-white font-display tracking-tight">{st.value}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">{st.label}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
