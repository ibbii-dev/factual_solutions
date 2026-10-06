"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import PuzzleCubeLines from "@/components/ui/PuzzleCubeLines";


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
    <section className="relative overflow-hidden bg-navy dark:bg-night-900 text-white pt-32 sm:pt-40 lg:pt-44 pb-14 sm:pb-20">
      {/* faint drafting grid, only behind the cube */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 end-0 w-1/2 hidden lg:block opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,.9)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.9)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(closest-side,black,transparent)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-8">
            <p className="fs-hero-in flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-steel-light" style={d("0s")}>
              <span className="h-px w-8 bg-rust-light" aria-hidden="true" />
              {isAr ? "استشارات وتدريب وتحول رقمي" : "Management consulting · Training · ERP & digital"}
            </p>

            <h1 className="text-[2.6rem] sm:text-[4rem] lg:text-[4.75rem] font-bold tracking-[-0.02em] leading-[1.03] font-display">
              {isAr ? (
                <>
                  <RevealWords text="تمكين المؤسسات" delay={0} />
                  <br />
                  <RevealWords text="لتنمية أعمالها بنجاح." className="text-steel-light" delay={0.12} />
                </>
              ) : (
                <>
                  <RevealWords text="Consulting people" delay={0} />
                  <br />
                  <RevealWords text="to grow their" delay={0.1} />{" "}
                  <RevealWords text="business." className="text-steel-light" delay={0.2} />
                </>
              )}
            </h1>

            <p className="fs-hero-in lede text-slate-200/90 max-w-xl" style={d("0.25s")}>
              {isAr
                ? "نجمع بين الاستشارات والتدريب والتطبيق الرقمي لمساعدة المؤسسات على تصميم أساليب عمل أفضل، وبناء القدرات اللازمة لاستدامتها، وترسيخ التحسين في العمليات اليومية."
                : "We combine consulting, training, and digital implementation to help organizations design better ways of working, build the capabilities to sustain them, and embed improvement into daily operations."}
            </p>
            <div className="fs-hero-in flex flex-wrap items-center gap-x-8 gap-y-4" style={d("0.35s")}>
              <Link
                href="/contact"
                className="btn-ink inline-flex items-center gap-2 px-6 py-3.5 bg-white text-ink hover:bg-steel-light text-sm font-semibold"
              >
                {isAr ? "طلب استشارة" : "Request a consultation"}
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
              <Link href="/services" className="link-arrow text-sm text-white">
                {isAr ? "ما نقوم به" : "What we do"}
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex lg:col-span-5 justify-center">
            <PuzzleCubeLines className="w-full max-w-[400px] h-auto" />
          </div>
        </div>

        {/* Key figures, set like a report's fact box */}
        <dl className="fs-hero-in mt-16 sm:mt-24 grid grid-cols-2 lg:grid-cols-4 border-t border-white/20" style={d("0.45s")}>
          {stats.map((st, idx) => (
            <div
              key={idx}
              className={`pt-6 pb-2 pe-6 ${idx > 0 ? "lg:border-s lg:ps-6 border-white/15" : ""} ${idx % 2 === 1 ? "border-s ps-6 lg:ps-6 border-white/15" : ""} ${idx >= 2 ? "border-t lg:border-t-0 border-white/15" : ""}`}
            >
              <dt className="sr-only">{st.label}</dt>
              <dd className="text-4xl sm:text-5xl font-bold font-display tracking-tight">
                <CountUp value={st.value} />
              </dd>
              <dd className="mt-2 text-sm text-slate-300 max-w-[16rem]">{st.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
