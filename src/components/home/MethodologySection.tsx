"use client";

import React from "react";
import { Search, Compass, Zap, CheckCircle2, ArrowRight, ArrowUpRight } from "lucide-react";
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
    <section className="py-16 sm:py-24 bg-[#EBF1FA] dark:bg-[#0B1320] text-[#152238] dark:text-white relative overflow-hidden border-t border-[#8EA9D3]/30 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header Divided Box */}
        <div className="bg-white dark:bg-[#111C2E] rounded-3xl p-6 sm:p-10 border border-[#8EA9D3]/35 dark:border-slate-800 shadow-sm mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8EA9D3]/20 text-[#152238] dark:text-brand-steel-light text-xs font-semibold uppercase tracking-wider">
                Execution Framework
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#152238] dark:text-white">
                Structured 4-Phase Advisory Roadmap
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl font-normal leading-relaxed">
                From initial operational diagnosis to model engineering and partner-led milestone execution.
              </p>
            </div>

            <div className="lg:col-span-4 flex justify-end">
              <div className="p-4 rounded-2xl bg-[#EBF1FA] dark:bg-[#15233A] border border-[#8EA9D3]/25 w-full text-center">
                <div className="text-xs font-bold text-[#152238] dark:text-white">DMAIC & Lean Six Sigma</div>
                <div className="text-[11px] text-slate-500">Quality-assured consulting process</div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Divided Step Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreMethodologySteps.map((step, idx) => (
            <div
              key={step.step}
              className="bg-white dark:bg-[#111C2E] rounded-3xl p-6 sm:p-7 border border-[#8EA9D3]/35 dark:border-slate-800 flex flex-col justify-between shadow-sm hover:border-brand-steel hover:shadow-md transition-all duration-300 group"
            >
              <div>
                {/* Step Number & Icon */}
                <div className="flex items-center justify-between mb-5">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                      idx === 0
                        ? "bg-[#8EA9D3]/25 text-[#152238] dark:text-brand-steel-light"
                        : idx === 1
                        ? "bg-[#152238] text-white dark:bg-[#1E3150]"
                        : idx === 2
                        ? "bg-brand-rust/20 text-brand-rust dark:text-brand-rust-light"
                        : "bg-emerald-500/20 text-emerald-600 dark:text-emerald-300"
                    }`}
                  >
                    {stepIcons[idx]}
                  </div>

                  <span className="text-xs font-extrabold px-2.5 py-1 rounded-md bg-[#EBF1FA] dark:bg-[#15233A] text-[#152238] dark:text-white">
                    Phase {step.step}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#152238] dark:text-white mb-2.5">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal mb-5">
                  {step.description}
                </p>
              </div>

              {/* Outcome Badge */}
              <div className="pt-4 border-t border-[#8EA9D3]/20 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-[11px] font-medium text-slate-500">Key Outcome</span>
                <span className="font-bold text-[#152238] dark:text-brand-steel-light bg-[#EBF1FA] dark:bg-[#15233A] px-2.5 py-1 rounded-md">
                  {step.outcome}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Leadership Info Card */}
        <div className="mt-10 bg-white dark:bg-[#111C2E] rounded-2xl p-5 sm:p-6 border border-[#8EA9D3]/30 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-rust/15 text-brand-rust flex items-center justify-center font-bold text-sm shrink-0">
              FS
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-[#152238] dark:text-white">
                Led by Certified Practitioners (Master Black Belt & PMP)
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                Direct engagement oversight with executive accountability.
              </div>
            </div>
          </div>

          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-rust hover:text-brand-rust-light shrink-0"
          >
            <span>Learn About Leadership</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
