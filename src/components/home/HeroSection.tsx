"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useInView, animate, useReducedMotion } from "framer-motion";
import { ArrowRight, Layers, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import HeroFilm from "@/components/ui/HeroFilm";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Counts a numeric prefix up from 0 when scrolled into view (e.g. "91.4%", "18+"). */
function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  const [display, setDisplay] = useState(match && !reduce ? "0" + match[2] : value);

  useEffect(() => {
    if (!match || !inView || reduce) {
      if (!match || reduce) setDisplay(value);
      return;
    }
    const target = parseFloat(match[1]);
    const decimals = match[1].includes(".") ? match[1].split(".")[1].length : 0;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: EASE,
      onUpdate: (v) => setDisplay(v.toFixed(decimals) + match[2]),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value, reduce]);

  return <span ref={ref}>{display}</span>;
}

/** Headline that reveals word by word (CSS-driven, so it paints without waiting for JS). */
function RevealWords({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <>
      {text.split(" ").map((word, i, arr) => (
        <React.Fragment key={i}>
          <span className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
            <span
              className={`fs-word ${className}`}
              style={{ "--fs-delay": `${(delay + i * 0.05).toFixed(2)}s` } as React.CSSProperties}
            >
              {word}
            </span>
          </span>
          {i < arr.length - 1 ? " " : null}
        </React.Fragment>
      ))}
    </>
  );
}

export default function HeroSection() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const stats = [
    { value: "60+", label: isAr ? "سنة من الخبرة المشتركة" : "Years of Combined Experience", bar: "bg-navy" },
    { value: "13", label: isAr ? "قطاعاً نخدمه" : "Industries Served", bar: "bg-rust" },
    { value: "11", label: isAr ? "دولة شملتها مهامنا" : "Countries of Professional Experience", bar: "bg-steel" },
    { value: "3", label: isAr ? "خطوط خدمة: استشارات · تدريب · رقمي" : "Service Lines: Consulting · Training · Digital", bar: "bg-ink dark:bg-white" },
  ];

  return (
    <section className="dark relative pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-24 overflow-hidden text-ink dark:text-white bg-night-950 min-h-[92vh] flex flex-col justify-center">
      {/* Cinematic 3D puzzle-cube film (dark stage in both themes) */}
      <HeroFilm />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">

          {/* Copy column */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-start">

            <h1 className="text-[2.35rem] sm:text-6xl lg:text-[4.25rem] font-extrabold tracking-tight text-ink dark:text-white leading-[1.06] font-display">
              {isAr ? (
                <>
                  <RevealWords text="تمكين المؤسسات" delay={0} />
                  <br />
                  <RevealWords text="لتنمية أعمالها بنجاح." className="text-navy dark:text-steel" delay={0.12} />
                </>
              ) : (
                <>
                  <RevealWords text="Consulting People to" delay={0} />
                  <br />
                  <span className="relative inline-block">
                    <RevealWords text="Grow Their Business." className="text-navy dark:text-steel" delay={0.15} />
                    <svg className="absolute -bottom-1 left-0 w-[96%] h-3 text-rust" viewBox="0 0 300 12" preserveAspectRatio="none" aria-hidden="true">
                      <path
                        className="fs-draw"
                        d="M2 9 C 80 2, 220 2, 298 7"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </>
              )}
            </h1>

            <div className="fs-hero-in" style={{ "--fs-delay": "0.25s" } as React.CSSProperties}>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {isAr
                  ? "نجمع بين الاستشارات والتدريب والتطبيق الرقمي لمساعدة المؤسسات على تصميم أساليب عمل أفضل، وبناء القدرات اللازمة لاستدامتها، وترسيخ التحسين في العمليات اليومية."
                  : "We combine consulting, training, and digital implementation to help organizations design better ways of working, build the capabilities to sustain them, and embed improvement into daily operations."}
              </p>
            </div>

            <div className="fs-hero-in" style={{ "--fs-delay": "0.32s" } as React.CSSProperties}>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-1">
                <Link
                  href="/contact"
                  className="btn-sheen group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-rust hover:bg-rust-dark text-white text-sm font-bold transition-all duration-300 shadow-cta hover:-translate-y-0.5"
                >
                  <span>{isAr ? "طلب استشارة تنفيذية" : "Request a Consultation"}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </Link>

                <Link
                  href="/services"
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white hover:bg-navy-50 dark:bg-white/5 dark:hover:bg-white/10 text-navy dark:text-white text-sm font-semibold border border-navy/15 dark:border-white/15 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Layers className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
                  <span>{isAr ? "ما نقوم به" : "What We Do"}</span>
                </Link>
              </div>
            </div>

            <div className="fs-hero-in" style={{ "--fs-delay": "0.4s" } as React.CSSProperties}>
              <ul className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-navy dark:text-steel" />{isAr ? "الاستشارات" : "Consulting"}</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-navy dark:text-steel" />{isAr ? "التدريب" : "Training"}</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-navy dark:text-steel" />{isAr ? "ERP والتحول الرقمي" : "ERP & Digital Transformation"}</li>
              </ul>
            </div>
          </div>

          {/* Right side left open: the film is the visual */}
          <div className="hidden lg:block lg:col-span-5" aria-hidden="true" />
        </div>

        {/* Metric strip with count-up numbers */}
        <div className="fs-hero-in pt-14 sm:pt-20" style={{ "--fs-delay": "0.45s" } as React.CSSProperties}>
          <div className="grid grid-cols-2 md:grid-cols-4 rounded-2xl bg-white dark:bg-night-900/80 border border-slate-200/80 dark:border-white/10 shadow-card overflow-hidden">
            {stats.map((st, idx) => (
              <div
                key={idx}
                className={`group relative p-5 sm:p-6 text-center md:text-start transition-colors duration-300 hover:bg-navy-50/50 dark:hover:bg-white/[0.03] ${idx % 2 === 1 ? "border-s border-slate-200/80 dark:border-white/10" : ""} ${idx >= 2 ? "border-t md:border-t-0 border-slate-200/80 dark:border-white/10" : ""} ${idx === 2 ? "md:border-s" : ""}`}
              >
                <span className={`absolute top-0 inset-x-6 h-[3px] rounded-b-full origin-left transition-transform duration-500 group-hover:scale-x-110 ${st.bar}`} aria-hidden="true" />
                <div className="text-2xl sm:text-3xl font-extrabold text-ink dark:text-white font-display tracking-tight">
                  <CountUp value={st.value} />
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">{st.label}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
