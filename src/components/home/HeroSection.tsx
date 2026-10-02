"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, animate, useReducedMotion } from "framer-motion";
import { ArrowRight, Layers, ShieldCheck, CheckCircle2, TrendingUp, Compass, BarChart3 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

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

/** Headline that reveals word by word with a soft blur-rise. */
function RevealWords({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className={`inline-block ${className}`}
            initial={{ y: "105%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 0.8, delay: delay + i * 0.07, ease: EASE }}
          >
            {word}
            {" "}
          </motion.span>
        </span>
      ))}
    </>
  );
}

const bars = [38, 52, 46, 64, 58, 76, 88];

export default function HeroSection() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const stats = [
    { value: "91.4%", label: isAr ? "دقة تنفيذ المخرجات" : "Delivery Execution", bar: "bg-navy" },
    { value: isAr ? "الربع الأعلى" : "Top Quartile", label: isAr ? "المعيار الاستشاري" : "Industry Benchmark", bar: "bg-rust" },
    { value: "18+", label: isAr ? "ممارسة متخصصة" : "Advisory Practices", bar: "bg-steel" },
    { value: "100% NDA", label: isAr ? "سرية وحوكمة صارمة" : "Strict Governance", bar: "bg-ink dark:bg-white" },
  ];

  return (
    <section className="relative pt-32 sm:pt-40 lg:pt-44 pb-16 sm:pb-24 overflow-hidden text-ink dark:text-white transition-colors duration-300">
      {/* Backdrop: slow-drifting logo-color glows */}
      <motion.div
        aria-hidden="true"
        className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-steel/25 dark:bg-steel/10 blur-3xl pointer-events-none"
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute top-20 -right-40 w-[460px] h-[460px] rounded-full bg-rust/10 dark:bg-rust/15 blur-3xl pointer-events-none"
        animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">

          {/* Copy column */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-start">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="inline-flex items-center gap-2.5 ps-1.5 pe-4 py-1.5 rounded-full bg-white dark:bg-white/5 border border-navy/10 dark:border-white/10 text-navy dark:text-steel-light text-[10px] sm:text-[11px] font-bold tracking-[0.08em] sm:tracking-[0.14em] uppercase shadow-card max-w-full"
            >
              <span className="relative inline-flex items-center justify-center w-6 h-6 rounded-full bg-navy text-white">
                <span className="absolute inset-0 rounded-full bg-navy/40 animate-ping" aria-hidden="true" />
                <ShieldCheck className="relative w-3.5 h-3.5" />
              </span>
              <span>{isAr ? "استشارات وحلول الأعمال التنفيذية" : "EXECUTIVE ADVISORY • BUSINESS EXCELLENCE"}</span>
            </motion.div>

            <h1 className="text-[2.35rem] sm:text-6xl lg:text-[4.25rem] font-extrabold tracking-tight text-ink dark:text-white leading-[1.06] font-display">
              {isAr ? (
                <>
                  <RevealWords text="تمكين المؤسسات" delay={0.1} />
                  <br />
                  <RevealWords text="لتنمية أعمالها بنجاح." className="text-navy dark:text-steel" delay={0.3} />
                </>
              ) : (
                <>
                  <RevealWords text="Consulting People to" delay={0.1} />
                  <br />
                  <span className="relative inline-block">
                    <RevealWords text="Grow Their Business." className="text-navy dark:text-steel" delay={0.35} />
                    <svg className="absolute -bottom-1 left-0 w-[96%] h-3 text-rust" viewBox="0 0 300 12" preserveAspectRatio="none" aria-hidden="true">
                      <motion.path
                        d="M2 9 C 80 2, 220 2, 298 7"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.1, delay: 0.9, ease: EASE }}
                      />
                    </svg>
                  </span>
                </>
              )}
            </h1>

            <ScrollReveal variant="fade-up" delay={0.45} duration={0.8}>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {isAr
                  ? "تخطيط عملي للأعمال، نمذجة مالية واستشارات استراتيجية لمساعدة الشركات على توسيع نطاق عملياتها واستقرار نموها التجاري."
                  : "Practical business planning, financial modeling, and management consulting to help companies scale operations and steady commercial growth."}
              </p>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={0.55} duration={0.8}>
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
                  <span>{isAr ? "استكشف الممارسات" : "Explore Practices"}</span>
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={0.65} duration={0.8}>
              <ul className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-navy dark:text-steel" />{isAr ? "تخطيط الأعمال" : "Business Planning"}</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-navy dark:text-steel" />{isAr ? "النمذجة المالية" : "Financial Modeling"}</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-navy dark:text-steel" />{isAr ? "الاستشارات الإدارية" : "Management Consulting"}</li>
              </ul>
            </ScrollReveal>
          </div>

          {/* Visual column: animated growth dashboard */}
          <motion.div
            className="lg:col-span-5 hidden sm:block"
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: EASE }}
          >
            <div className="relative mx-auto w-full max-w-[460px] py-10">
              {/* Main card */}
              <div className="relative rounded-3xl bg-white dark:bg-night-800 border border-slate-200/80 dark:border-white/10 shadow-lift p-6 sm:p-7">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                      {isAr ? "مؤشر النمو التجاري" : "Commercial Growth Index"}
                    </div>
                    <div className="mt-1 text-3xl font-extrabold font-display text-ink dark:text-white tracking-tight">
                      +<CountUp value="38.6%" />
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-navy-50 dark:bg-steel/15 text-navy dark:text-steel-light text-[11px] font-bold">
                    <TrendingUp className="w-3.5 h-3.5" /> YoY
                  </span>
                </div>

                {/* Animated bar chart with trend line */}
                <div className="relative mt-6 h-44">
                  <div className="absolute inset-0 flex items-end justify-between gap-2.5">
                    {bars.map((h, i) => (
                      <motion.div
                        key={i}
                        className={`flex-1 rounded-t-lg ${i === bars.length - 1 ? "bg-rust" : i % 2 === 0 ? "bg-navy" : "bg-steel"}`}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ duration: 1, delay: 0.6 + i * 0.08, ease: EASE }}
                      />
                    ))}
                  </div>
                  <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                    <motion.path
                      d="M4 66 L19 50 L34 56 L49 38 L64 44 L79 26 L95 12"
                      fill="none"
                      className="stroke-ink dark:stroke-white"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                      style={{ strokeWidth: 2.5 }}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.6, delay: 1.1, ease: EASE }}
                    />
                  </svg>
                </div>

                <div className="mt-4 flex justify-between text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  <span>Q1</span><span>Q2</span><span>Q3</span><span>Q4</span><span>Q1</span><span>Q2</span><span>Q3</span>
                </div>

                <div className="mt-5 pt-5 border-t border-slate-200/80 dark:border-white/10 grid grid-cols-3 gap-3 text-center">
                  {[
                    { k: isAr ? "الهامش" : "Margin", v: "+12%", c: "text-navy dark:text-steel" },
                    { k: isAr ? "التكلفة" : "Cost", v: "−18%", c: "text-accent" },
                    { k: "ROI", v: "3.4x", c: "text-ink dark:text-white" },
                  ].map((m) => (
                    <div key={m.k}>
                      <div className={`text-lg font-extrabold font-display ${m.c}`}>{m.v}</div>
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{m.k}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating insight chips */}
              <motion.div
                className="absolute top-0 -left-4 sm:-left-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.2, ease: EASE }}
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/95 dark:bg-night-700/95 backdrop-blur border border-slate-200 dark:border-white/10 shadow-lift"
                >
                  <span className="w-8 h-8 rounded-lg bg-navy text-white flex items-center justify-center"><Compass className="w-4 h-4" /></span>
                  <span className="text-start">
                    <span className="block text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">{isAr ? "استراتيجية" : "Strategy"}</span>
                    <span className="block text-xs font-bold text-ink dark:text-white">{isAr ? "خارطة طريق واضحة" : "Clear Roadmaps"}</span>
                  </span>
                </motion.div>
              </motion.div>

              <motion.div
                className="absolute bottom-0 -right-4 sm:-right-8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.4, ease: EASE }}
              >
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/95 dark:bg-night-700/95 backdrop-blur border border-slate-200 dark:border-white/10 shadow-lift"
                >
                  <span className="w-8 h-8 rounded-lg bg-rust text-white flex items-center justify-center"><BarChart3 className="w-4 h-4" /></span>
                  <span className="text-start">
                    <span className="block text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">{isAr ? "نمو" : "Growth"}</span>
                    <span className="block text-xs font-bold text-ink dark:text-white">{isAr ? "نمو تجاري مستقر" : "Steady Commercial Growth"}</span>
                  </span>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Metric strip with count-up numbers */}
        <ScrollReveal variant="fade-up" delay={0.2} duration={0.8} className="pt-14 sm:pt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 rounded-2xl bg-white dark:bg-night-800/80 border border-slate-200/80 dark:border-white/10 shadow-card overflow-hidden">
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
        </ScrollReveal>

      </div>
    </section>
  );
}
