"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  FileText, 
  ArrowUpRight,
  Layers,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function HeroSection() {
  const { t, isRTL } = useLanguage();
  const [activeMetric, setActiveMetric] = useState<number | null>(null);

  return (
    <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden bg-[#FAFBFD] dark:bg-[#0B1320] text-[#152238] dark:text-white transition-colors duration-300">
      {/* Subtle geometric background grid/glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute -top-32 right-1/4 w-96 h-96 bg-[#8EA9D3]/10 dark:bg-[#8EA9D3]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Typography and Call to Action */}
          <ScrollReveal variant="fade-up" duration={0.6} className="lg:col-span-7 space-y-6 text-left">
            
            {/* Direct Category Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#A33C29]/10 text-[#A33C29] text-[11px] font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A33C29]" />
              <span>BUSINESS SOLUTIONS &amp; MANAGEMENT CONSULTING</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#152238] dark:text-white leading-[1.12] font-display">
              Consulting People to <span className="text-[#A33C29]">Grow Their</span> <br className="hidden sm:inline" />
              Business<span className="text-[#A33C29]">.</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl font-normal leading-relaxed">
              We provide practical business planning, market analysis, investment modeling, and management consulting to help companies scale operations and steady commercial growth.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#A33C29] hover:bg-[#8E3221] text-white text-xs sm:text-sm font-bold transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                <span>Request a Consultation</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-[#15233A] text-[#152238] dark:text-white text-xs sm:text-sm font-semibold border border-slate-200 dark:border-slate-700 hover:border-[#152238] dark:hover:border-white transition-all duration-200 shadow-xs hover:-translate-y-0.5"
              >
                <Layers className="w-4 h-4 text-slate-500" />
                <span>View Solutions</span>
              </Link>
            </div>

            {/* 3-Column Micro Highlights Row */}
            <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#A33C29]">
                  Business Solutions
                </span>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                  Modernizing architectures &amp; digital budgets.
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Commercial Strategy
                </span>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                  Strategic positioning and dynamic revenue targets.
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Financial Advisory
                </span>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                  Actionable projection scenarios &amp; capital modeling.
                </p>
              </div>
            </div>

          </ScrollReveal>

          {/* Right Column: Factual Enterprise Engine Dashboard Card */}
          <ScrollReveal variant="zoom-in" delay={0.2} duration={0.7} className="lg:col-span-5 flex justify-center w-full">
            <div className="w-full max-w-md bg-white dark:bg-[#111C2E] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.08)] space-y-4">
              
              {/* Header: Logo + Title + Status */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="relative w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 p-1 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                    <Image
                      src="/images/logo-symbol.png"
                      alt="Engine Mark"
                      width={28}
                      height={28}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#152238] dark:text-white leading-tight">
                      Factual Enterprise Engine
                    </h3>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">
                      Governance and Operations System
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                  Live 4.2
                </span>
              </div>

              {/* Chart Card */}
              <div className="bg-[#F8FAFD] dark:bg-[#0A1220] rounded-xl p-4 border border-slate-100 dark:border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Capital Velocity Metrics
                  </span>
                  <span className="text-[11px] font-extrabold text-[#A33C29] flex items-center gap-0.5">
                    <TrendingUp className="w-3 h-3" /> +24.8% YOY
                  </span>
                </div>

                {/* SVG Curve Chart */}
                <div className="relative h-28 w-full">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 320 100" fill="none">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8EA9D3" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#8EA9D3" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    {/* Background fill */}
                    <path
                      d="M 0 85 C 40 80, 80 75, 120 60 C 160 48, 200 52, 240 35 C 280 20, 300 25, 320 15 L 320 100 L 0 100 Z"
                      fill="url(#chartGradient)"
                    />
                    {/* Smooth curve line */}
                    <path
                      d="M 0 85 C 40 80, 80 75, 120 60 C 160 48, 200 52, 240 35 C 280 20, 300 25, 320 15"
                      stroke="#152238"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    {/* Secondary accent projection line */}
                    <path
                      d="M 0 90 C 50 85, 100 70, 150 65 C 200 60, 250 40, 320 30"
                      stroke="#8EA9D3"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                    />
                    {/* Data Node Dots */}
                    <circle cx="120" cy="60" r="4.5" fill="#152238" className="cursor-pointer hover:r-6 hover:fill-[#A33C29] transition-all" />
                    <circle cx="240" cy="35" r="4.5" fill="#152238" className="cursor-pointer hover:r-6 hover:fill-[#A33C29] transition-all" />
                    <circle cx="320" cy="15" r="5.5" fill="#A33C29" stroke="#fff" strokeWidth="2" className="cursor-pointer hover:r-7 transition-all animate-pulse" />
                  </svg>
                </div>

                {/* 3 Metrics Row */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200/60 dark:border-slate-800 text-center">
                  <div className="space-y-0.5">
                    <span className="text-[9px] uppercase tracking-wider text-slate-500 font-medium">Execution Index</span>
                    <p className="text-xs sm:text-sm font-bold text-[#152238] dark:text-white">91.4%</p>
                  </div>
                  <div className="space-y-0.5 border-x border-slate-200/60 dark:border-slate-800">
                    <span className="text-[9px] uppercase tracking-wider text-slate-500 font-medium">Forecast Accuracy</span>
                    <p className="text-xs sm:text-sm font-bold text-[#152238] dark:text-white">48.6%</p>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[9px] uppercase tracking-wider text-slate-500 font-medium">Benchmark</span>
                    <p className="text-xs sm:text-sm font-bold text-[#A33C29]">Top Quartile</p>
                  </div>
                </div>
              </div>

              {/* 2 Bottom Action Items */}
              <div className="space-y-2 pt-1">
                {/* Protected Data Sandbox */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 hover:border-slate-300 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#8EA9D3]/20 text-[#152238] dark:text-brand-steel-light flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-[#152238] dark:text-white leading-tight">
                        Protected Data Sandbox
                      </h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">
                        Enterprise-grade cipher governance
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                    99.9%
                  </span>
                </div>

                {/* Validated 120-Day Action Items */}
                <Link
                  href="/services"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 hover:border-slate-300 transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#A33C29]/15 text-[#A33C29] flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-[#152238] dark:text-white leading-tight group-hover:text-[#A33C29] transition-colors">
                        Validated 120-Day Action Items
                      </h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">
                        Prioritized deliverable roadmap
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#A33C29] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </Link>
              </div>

            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
