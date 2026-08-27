"use client";

import React from "react";
import { Search, Compass, Zap, CheckCircle2, ArrowRight } from "lucide-react";
import { coreMethodologySteps } from "@/data/companyData";
import Link from "next/link";

const stepIcons = [
  <Search key="1" className="w-5 h-5" />,
  <Compass key="2" className="w-5 h-5" />,
  <Zap key="3" className="w-5 h-5" />,
  <CheckCircle2 key="4" className="w-5 h-5" />
];

export default function MethodologySection() {
  return (
    <section className="py-16 sm:py-24 bg-[#1E3150] dark:bg-[#0B1320] text-white relative overflow-hidden border-t border-brand-steel/15 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-steel/20 text-brand-steel-light text-xs font-semibold uppercase tracking-wider">
            Our Advisory Process
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            A Structured 4-Step Advisory Framework
          </h2>
          <p className="text-sm sm:text-base text-slate-200 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            We follow a practical, disciplined consulting process from initial business review through to hands-on execution and performance tracking.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreMethodologySteps.map((step, idx) => (
            <div
              key={step.step}
              className="bg-[#152238] dark:bg-[#111C2E] rounded-3xl p-6 sm:p-7 border border-brand-steel/20 dark:border-slate-800 flex flex-col justify-between shadow-sm"
            >
              <div>
                {/* Step Icon Badge */}
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${
                    idx === 0
                      ? "bg-brand-steel/25 text-brand-steel-light"
                      : idx === 1
                      ? "bg-[#1E3150] text-white border border-brand-steel/20"
                      : idx === 2
                      ? "bg-brand-rust/25 text-brand-rust-light"
                      : "bg-emerald-500/25 text-emerald-300"
                  }`}
                >
                  {stepIcons[idx]}
                </div>

                <div className="text-[11px] font-bold uppercase tracking-wider text-brand-steel-light mb-1.5">
                  Phase {step.step}
                </div>
                <h3 className="text-lg font-bold text-white mb-2.5">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 dark:text-slate-300 leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-brand-steel/15 dark:border-slate-800 flex items-center justify-between text-xs text-slate-300 dark:text-slate-400">
                <span>Phase Outcome</span>
                <span className="font-semibold text-brand-steel-light">{step.outcome}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-12 text-center">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-semibold border border-white/20 transition-all duration-200"
          >
            <span>Learn About Our Advisory Philosophy & Leadership</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
