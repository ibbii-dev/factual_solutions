"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";


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
    <section className="relative overflow-hidden bg-navy dark:bg-night-900 text-white pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-20 lg:pb-24 dark:border-b dark:border-white/10">

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-end">
          <div className="lg:col-span-7 space-y-7 sm:space-y-8">
            <p className="fs-hero-in fs-label fs-label-light" style={d("0s")}>
              {isAr ? "استشارات وتدريب وتحول رقمي" : "Management consulting · Training · ERP & digital"}
            </p>

            <h1 className="text-[2.7rem] sm:text-[4.1rem] lg:text-[4.6rem] font-semibold tracking-[-0.03em] leading-[1.02] font-display">
              {isAr ? (
                <>
                  <RevealWords text="تمكين المؤسسات" delay={0.05} />
                  <br />
                  <RevealWords text="لتنمية أعمالها بنجاح." className="text-steel" delay={0.17} />
                </>
              ) : (
                <>
                  <RevealWords text="Consulting people" delay={0.05} />
                  <br />
                  <RevealWords text="to grow their" delay={0.15} />{" "}
                  <RevealWords text="business." className="text-steel" delay={0.27} />
                </>
              )}
            </h1>

            <p className="fs-hero-in lede text-[#E4E9F3] max-w-xl" style={d("0.3s")}>
              {isAr
                ? "نجمع بين الاستشارات والتدريب والتطبيق الرقمي لمساعدة المؤسسات على تصميم أساليب عمل أفضل، وبناء القدرات اللازمة لاستدامتها، وترسيخ التحسين في العمليات اليومية."
                : "We combine consulting, training, and digital implementation to help organizations design better ways of working, build the capabilities to sustain them, and embed improvement into daily operations."}
            </p>
            <div className="fs-hero-in flex flex-wrap items-center gap-3 sm:gap-4 pt-1" style={d("0.42s")}>
              <Link href="/contact" className="fs-btn fs-btn-rust">
                {isAr ? "طلب استشارة" : "Request a consultation"}
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
              <Link href="/services" className="fs-btn fs-btn-ghost">
                {isAr ? "ما نقوم به" : "What we do"}
              </Link>
            </div>
          </div>

          {/* Key figures: a 2x2 panel; each number rolls up into place */}
          <dl className="lg:col-span-5 grid grid-cols-2 border-t border-s border-white/20">
            {stats.map((st, idx) => (
              <div
                key={idx}
                className="fs-stat relative p-5 sm:p-7 border-e border-b border-white/20"
                style={{ "--piece": ["#9BB3D9", "#9B391E", "#9B391E", "#9BB3D9"][idx] } as React.CSSProperties}
              >
                <dt className="sr-only">{st.label}</dt>
                <dd className="text-4xl sm:text-5xl lg:text-[3.4rem] font-semibold font-display tracking-tight leading-none">
                  <span className="fs-roll"><span style={d(`${(0.45 + idx * 0.1).toFixed(2)}s`)}>{st.value}</span></span>
                </dd>
                <dd className="fs-hero-in mt-3 text-sm text-[#C9D3E6] max-w-[14rem]" style={d(`${(0.6 + idx * 0.1).toFixed(2)}s`)}>{st.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
