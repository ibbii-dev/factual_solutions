"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";


/** Counts a numeric prefix up from 0 once it scrolls into view (e.g. "60+"). No animation library. */
function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || !match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || typeof IntersectionObserver === "undefined") return;
    const target = parseFloat(match[1]);
    const suffix = match[2];
    let raf = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const dur = 1400;
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 4);
        setDisplay(Math.round(target * eased) + suffix);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      setDisplay("0" + suffix);
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

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
    { value: "60+", label: isAr ? "سنة من الخبرة المشتركة" : "Years of combined experience" },
    { value: "13", label: isAr ? "قطاعاً نخدمه" : "Industries served" },
    { value: "11", label: isAr ? "دولة شملتها مهامنا" : "Countries of professional experience" },
    { value: "3", label: isAr ? "خطوط خدمة: استشارات · تدريب · رقمي" : "Service lines: consulting, training, digital" },
  ];

  const d = (s: string) => ({ "--fs-delay": s } as React.CSSProperties);

  return (
    <section className="relative pt-32 sm:pt-40 lg:pt-44 pb-14 sm:pb-20 text-ink dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="fs-hero-in eyebrow mb-6 sm:mb-8" style={d("0s")}>
          {isAr ? "استشارات وتدريب وتحول رقمي" : "Management consulting · Training · ERP & digital"}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <h1 className="lg:col-span-8 text-[2.6rem] sm:text-[4rem] lg:text-[5.25rem] font-bold tracking-[-0.02em] leading-[1.02] font-display">
            {isAr ? (
              <>
                <RevealWords text="تمكين المؤسسات" delay={0} />
                <br />
                <RevealWords text="لتنمية أعمالها بنجاح." className="text-navy dark:text-steel" delay={0.12} />
              </>
            ) : (
              <>
                <RevealWords text="Consulting people" delay={0} />
                <br />
                <RevealWords text="to grow their" delay={0.1} />{" "}
                <RevealWords text="business." className="text-navy dark:text-steel" delay={0.2} />
              </>
            )}
          </h1>

          <div className="lg:col-span-4 space-y-6 lg:pb-3">
            <p className="fs-hero-in lede text-slate-700 dark:text-slate-300" style={d("0.25s")}>
              {isAr
                ? "نجمع بين الاستشارات والتدريب والتطبيق الرقمي لمساعدة المؤسسات على تصميم أساليب عمل أفضل، وبناء القدرات اللازمة لاستدامتها، وترسيخ التحسين في العمليات اليومية."
                : "We combine consulting, training, and digital implementation to help organizations design better ways of working, build the capabilities to sustain them, and embed improvement into daily operations."}
            </p>
            <div className="fs-hero-in flex flex-wrap items-center gap-x-6 gap-y-4" style={d("0.35s")}>
              <Link
                href="/contact"
                className="btn-ink inline-flex items-center gap-2 px-6 py-3.5 bg-ink hover:bg-navy dark:bg-white dark:text-ink dark:hover:bg-steel-light text-white text-sm font-semibold transition-colors"
              >
                {isAr ? "طلب استشارة" : "Request a consultation"}
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
              <Link href="/services" className="link-arrow text-sm text-ink dark:text-white">
                {isAr ? "ما نقوم به" : "What we do"}
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
            </div>
          </div>
        </div>

        {/* Key figures, set like a report's fact box */}
        <dl className="fs-hero-in fs-rule mt-16 sm:mt-24 grid grid-cols-2 lg:grid-cols-4 border-t border-ink/15 dark:border-white/15" style={{ ...d("0.45s"), "--d": "500ms" } as React.CSSProperties}>
          {stats.map((st, idx) => (
            <div
              key={idx}
              className={`pt-6 pb-2 pe-6 ${idx > 0 ? "lg:border-s lg:ps-6 border-ink/15 dark:border-white/15" : ""} ${idx % 2 === 1 ? "border-s ps-6 lg:ps-6 border-ink/15 dark:border-white/15" : ""} ${idx >= 2 ? "border-t lg:border-t-0 border-ink/15 dark:border-white/15" : ""}`}
            >
              <dt className="sr-only">{st.label}</dt>
              <dd className="text-4xl sm:text-5xl font-bold font-display tracking-tight">
                <CountUp value={st.value} />
              </dd>
              <dd className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-[16rem]">{st.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
