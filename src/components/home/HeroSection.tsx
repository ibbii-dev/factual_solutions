"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Layers, ShieldCheck, Target, TrendingUp, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { PHASES_AR, PHASES_EN } from "@/data/servicesData";

/** Headline that reveals word by word (CSS-driven, so it paints without waiting for JS). */
function RevealWords({ text, className = "", delay = 0, suffix }: { text: string; className?: string; delay?: number; suffix?: React.ReactNode }) {
  return (
    <>
      {text.split(" ").map((word, i, arr) => (
        <React.Fragment key={i}>
          <span className="inline-block overflow-hidden align-bottom pb-[0.1em] -mb-[0.1em]">
            <span className={`fs-word ${className}`} style={{ "--fs-delay": `${(delay + i * 0.05).toFixed(2)}s` } as React.CSSProperties}>
              {word}
              {i === arr.length - 1 ? suffix : null}
            </span>
          </span>
          {i < arr.length - 1 ? " " : null}
        </React.Fragment>
      ))}
    </>
  );
}

const BARS = [
  { h: 34, c: "#25346B" },
  { h: 46, c: "#9BB3D9" },
  { h: 40, c: "#25346B" },
  { h: 58, c: "#9BB3D9" },
  { h: 52, c: "#25346B" },
  { h: 70, c: "#9BB3D9" },
  { h: 84, c: "#9B391E" },
];

/** Illustrative improvement curve: shows the shape of the approach, not client data. */
function ApproachCard({ isAr }: { isAr: boolean }) {
  const phases = (isAr ? PHASES_AR : PHASES_EN).consulting;
  const icons = [Target, TrendingUp, ShieldCheck];
  const pts = BARS.map((b, i) => `${(i + 0.5) * (100 / BARS.length)},${100 - b.h - 8}`).join(" ");

  return (
    <div className="relative" aria-hidden="true">
      <div className="fs-bob absolute -top-6 start-2 sm:-start-6 z-10 flex items-center gap-2.5 rounded-xl bg-white dark:bg-night-800 border border-paper-line dark:border-white/10 shadow-lift px-3 py-2">
        <span className="fs-icon !w-8 !h-8 !rounded-lg bg-navy"><Target className="w-4 h-4" /></span>
        <span className="leading-tight">
          <span className="block text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">{isAr ? "الاستراتيجية" : "Strategy"}</span>
          <span className="block text-[13px] font-semibold text-ink dark:text-white">{isAr ? "اتجاه واضح" : "Clear direction"}</span>
        </span>
      </div>

      <div className="fs-card p-6 sm:p-7 shadow-lift">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{isAr ? "من التشخيص إلى الممارسة اليومية" : "From diagnosis to daily practice"}</p>
            <p className="mt-1.5 font-display text-2xl sm:text-[1.7rem] font-bold text-ink dark:text-white">{isAr ? "تحسين مستدام" : "Improvement that lasts"}</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-paper-deep dark:bg-white/10 px-2.5 py-1 text-[11px] font-bold text-navy dark:text-steel-light">
            <TrendingUp className="w-3.5 h-3.5" /> {isAr ? "تقدّم" : "Progress"}
          </span>
        </div>

        <div className="fs-chart relative mt-6 h-40 sm:h-44" dir="ltr">
          <div className="absolute inset-0 flex items-end gap-2.5 sm:gap-3">
            {BARS.map((b, i) => (
              <span key={i} className="fs-bar flex-1 rounded-t-md" style={{ height: `${b.h}%`, background: b.c, "--i": i } as React.CSSProperties} />
            ))}
          </div>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="fs-trend absolute inset-0 w-full h-full overflow-visible text-ink dark:text-white">
            <polyline points={pts} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>

        <ul className="mt-5 pt-5 border-t border-paper-line dark:border-white/10 grid grid-cols-3 gap-3 text-center">
          {phases.map((ph, i) => {
            const Icon = icons[i];
            return (
              <li key={ph.phase} className="flex flex-col items-center gap-1.5">
                <Icon className={`w-4 h-4 ${i === 2 ? "text-rust dark:text-rust-light" : "text-navy dark:text-steel"}`} />
                <span className="text-[11px] sm:text-[12px] font-semibold leading-snug text-ink dark:text-slate-200">{ph.title}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="fs-bob-2 absolute -bottom-6 end-2 sm:-end-6 z-10 flex items-center gap-2.5 rounded-xl bg-white dark:bg-night-800 border border-paper-line dark:border-white/10 shadow-lift px-3 py-2">
        <span className="fs-icon !w-8 !h-8 !rounded-lg bg-rust"><Layers className="w-4 h-4" /></span>
        <span className="leading-tight">
          <span className="block text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">{isAr ? "التميز التشغيلي" : "Operational excellence"}</span>
          <span className="block text-[13px] font-semibold text-ink dark:text-white">{isAr ? "لين وستة سيجما" : "Lean & Six Sigma"}</span>
        </span>
      </div>
    </div>
  );
}

function Swoosh() {
  return (
    <svg aria-hidden="true" viewBox="0 0 300 12" preserveAspectRatio="none" className="fs-swoosh hidden sm:block absolute -bottom-1.5 start-0 w-[calc(100%-0.4em)] h-3 text-rust">
      <path pathLength={1} d="M2 8 C 70 2, 150 2, 298 7" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export default function HeroSection() {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const d = (s: string) => ({ "--fs-delay": s } as React.CSSProperties);

  const stats = [
    { value: "60+", label: isAr ? "سنة من الخبرة المشتركة" : "Years of combined experience", bar: "bg-navy dark:bg-navy-400" },
    { value: "13", label: isAr ? "قطاعاً نخدمه" : "Industries served", bar: "bg-rust" },
    { value: "11", label: isAr ? "دولة شملتها مهامنا" : "Countries of professional experience", bar: "bg-steel" },
    { value: "3", label: isAr ? "خطوط خدمة: استشارات · تدريب · رقمي" : "Service lines: consulting, training, digital", bar: "bg-ink dark:bg-white" },
  ];
  const tags = isAr ? ["الاستشارات", "التدريب", "ERP والتحول الرقمي"] : ["Consulting", "Training", "ERP & Digital"];

  return (
    <section className="relative overflow-hidden pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-20">
      <div className="fs-glow" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-7">
            <p className="fs-hero-in fs-pill" style={d("0s")}>
              <span className="fs-pill-icon"><ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" /></span>
              {isAr ? "استشارات وتدريب وتحول رقمي" : "Management consulting · Training · ERP & digital"}
            </p>

            <h1 className="text-[2.35rem] sm:text-[3.6rem] lg:text-[4.1rem] font-extrabold leading-[1.06] tracking-[-0.03em] text-ink dark:text-white">
              {isAr ? (
                <>
                  <RevealWords text="تمكين المؤسسات" delay={0.05} />
                  <br />
                  <span className="sm:relative sm:inline-block text-navy dark:text-steel">
                    <RevealWords text="لتنمية أعمالها بنجاح." delay={0.17} />
                    <Swoosh />
                  </span>
                </>
              ) : (
                <>
                  <RevealWords text="Consulting People to" delay={0.05} />
                  <br />
                  <span className="sm:relative sm:inline-block text-navy dark:text-steel">
                    <RevealWords text="Grow Their Business" delay={0.2} suffix={<span className="text-rust">.</span>} />
                    <Swoosh />
                  </span>
                </>
              )}
            </h1>

            <p className="fs-hero-in lede text-slate-600 dark:text-slate-300 max-w-xl" style={d("0.3s")}>
              {isAr
                ? "نجمع بين الاستشارات والتدريب والتطبيق الرقمي لمساعدة المؤسسات على تصميم أساليب عمل أفضل، وبناء القدرات اللازمة لاستدامتها، وترسيخ التحسين في العمليات اليومية."
                : "We combine consulting, training, and digital implementation to help organizations design better ways of working, build the capabilities to sustain them, and embed improvement into daily operations."}
            </p>

            <div className="fs-hero-in flex flex-wrap items-center gap-3" style={d("0.4s")}>
              <Link href="/contact" className="btn-primary">
                {isAr ? "طلب استشارة" : "Request a Consultation"}
                <ArrowRight className="fs-arrow w-4 h-4 rtl:rotate-180" />
              </Link>
              <Link href="/services" className="btn-secondary">
                <Layers className="w-4 h-4" aria-hidden="true" />
                {isAr ? "ما نقوم به" : "Explore What We Do"}
              </Link>
            </div>

            <ul className="fs-hero-in flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-slate-500 dark:text-slate-400" style={d("0.5s")}>
              {tags.map((t) => (
                <li key={t} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-navy/60 dark:text-steel/70" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="fs-hero-in lg:col-span-5 px-3 sm:px-8 lg:px-0" style={d("0.25s")}>
            <ApproachCard isAr={isAr} />
          </div>
        </div>

        {/* Key figures */}
        <dl className="mt-16 sm:mt-20 grid grid-cols-2 lg:grid-cols-4 fs-card overflow-hidden">
          {stats.map((st, idx) => (
            <div
              key={idx}
              className={`relative p-5 sm:p-6 ${idx % 2 === 1 ? "border-s" : ""} ${idx >= 2 ? "border-t lg:border-t-0" : ""} ${idx === 2 ? "lg:border-s" : ""} border-paper-line dark:border-white/10`}
            >
              <span aria-hidden="true" className={`absolute top-0 inset-x-5 h-[3px] rounded-b ${st.bar}`} />
              <dt className="sr-only">{st.label}</dt>
              <dd className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-ink dark:text-white">
                <span className="fs-roll"><span style={d(`${(0.5 + idx * 0.1).toFixed(2)}s`)}>{st.value}</span></span>
              </dd>
              <dd className="mt-1.5 text-[13px] text-slate-500 dark:text-slate-400">{st.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
