"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, 
  ShieldCheck, 
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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative pt-28 sm:pt-36 md:pt-40 pb-16 sm:pb-20 overflow-hidden bg-[#FAFBFD] dark:bg-[#131B2E] text-[#152238] dark:text-white transition-colors duration-300"
    >
      {/* Dynamic Cursor-responsive spotlight */}
      <div 
        className="pointer-events-none absolute -inset-px opacity-0 sm:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(142, 169, 211, 0.08), transparent 80%)`,
        }}
      />

      {/* Subtle ambient background glow */}
      <div className="absolute -top-32 right-1/4 w-96 h-96 bg-[#8EA9D3]/10 dark:bg-[#8EA9D3]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-20 w-72 h-72 bg-[#A33C29]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Typography and Call to Action */}
          <ScrollReveal variant="fade-up" duration={0.6} className="lg:col-span-7 space-y-5 sm:space-y-6 text-left">
            
            {/* Direct Category Eyebrow */}
            <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-md bg-[#A33C29]/10 text-[#A33C29] text-[10px] sm:text-[11px] font-bold tracking-wider sm:tracking-widest uppercase max-w-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A33C29] shrink-0" />
              <span className="break-words">BUSINESS SOLUTIONS &amp; MANAGEMENT CONSULTING</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#152238] dark:text-white leading-[1.18] sm:leading-[1.12] font-display">
              Consulting People to <span className="text-[#A33C29]">Grow Their</span> <br className="hidden sm:inline" />
              Business<span className="text-[#A33C29]">.</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-xs sm:text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl font-normal leading-relaxed">
              We provide practical business planning, market analysis, investment modeling, and management consulting to help companies scale operations and steady commercial growth.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#A33C29] hover:bg-[#8E3221] text-white text-xs sm:text-sm font-bold transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 text-center"
              >
                <span>Request a Consultation</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-[#15233A] text-[#152238] dark:text-white text-xs sm:text-sm font-semibold border border-slate-200 dark:border-slate-700 hover:border-[#152238] dark:hover:border-white transition-all duration-200 shadow-xs hover:-translate-y-0.5 text-center"
              >
                <Layers className="w-4 h-4 text-slate-500" />
                <span>View Solutions</span>
              </Link>
            </div>

            {/* 3-Column Micro Highlights Row */}
            <div className="pt-5 sm:pt-6 border-t border-slate-200/80 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-left">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#A33C29] block">
                  Business Solutions
                </span>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                  Modernizing architectures &amp; digital budgets.
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
                  Commercial Strategy
                </span>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                  Strategic positioning &amp; dynamic revenue targets.
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
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
            <div className="w-full max-w-md bg-white/95 dark:bg-[#182238]/95 backdrop-blur-xl rounded-3xl border border-slate-200/90 dark:border-white/10 p-4 sm:p-6 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.12)] space-y-4 hover:shadow-[0_25px_60px_-10px_rgba(163,60,41,0.15)] transition-all duration-300">
              
              {/* Header: Logo + Title + Status */}
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <div className="relative w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 p-1 flex items-center justify-center border border-slate-200 dark:border-slate-700 shrink-0">
                    <Image
                      src="/images/logo-symbol.png"
                      alt="Engine Mark"
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs sm:text-sm font-bold text-[#152238] dark:text-white leading-tight truncate">
                      Factual Enterprise Engine
                    </h3>
                    <p className="text-[9.5px] sm:text-[10px] text-slate-500 dark:text-slate-400 truncate">
                      Governance &amp; Operations System
                    </p>
                  </div>
                </div>
                <span className="text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shrink-0 whitespace-nowrap">
                  Live 4.2
                </span>
              </div>

              {/* Executive Operational KPIs */}
              <div className="bg-[#F8FAFD] dark:bg-[#0E1524] rounded-xl p-3 sm:p-4 border border-slate-100 dark:border-white/5 space-y-2">
                <div className="grid grid-cols-3 gap-1 sm:gap-2 text-center">
                  <div className="space-y-0.5 px-0.5">
                    <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-slate-500 font-medium block truncate">Execution</span>
                    <p className="text-xs sm:text-sm font-bold text-[#152238] dark:text-white">91.4%</p>
                  </div>
                  <div className="space-y-0.5 border-x border-slate-200/60 dark:border-slate-800 px-0.5">
                    <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-slate-500 font-medium block truncate">Forecast</span>
                    <p className="text-xs sm:text-sm font-bold text-[#152238] dark:text-white">48.6%</p>
                  </div>
                  <div className="space-y-0.5 px-0.5">
                    <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-slate-500 font-medium block truncate">Benchmark</span>
                    <p className="text-xs sm:text-sm font-bold text-[#A33C29] truncate">Top Quartile</p>
                  </div>
                </div>
              </div>

              {/* 2 Bottom Action Items */}
              <div className="space-y-2 pt-1">
                {/* Protected Data Sandbox */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 hover:border-slate-300 transition-colors gap-2">
                  <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-[#8EA9D3]/20 text-[#152238] dark:text-brand-steel-light flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-[11px] font-bold text-[#152238] dark:text-white leading-tight truncate">
                        Protected Data Sandbox
                      </h4>
                      <p className="text-[9.5px] sm:text-[10px] text-slate-500 dark:text-slate-400 truncate">
                        Enterprise cipher governance
                      </p>
                    </div>
                  </div>
                  <span className="text-[9.5px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 shrink-0 whitespace-nowrap">
                    99.9%
                  </span>
                </div>

                {/* Validated 120-Day Action Items */}
                <Link
                  href="/services"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 hover:border-slate-300 transition-colors group gap-2"
                >
                  <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-[#A33C29]/15 text-[#A33C29] flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-[11px] font-bold text-[#152238] dark:text-white leading-tight group-hover:text-[#A33C29] transition-colors truncate">
                        Validated 120-Day Action Items
                      </h4>
                      <p className="text-[9.5px] sm:text-[10px] text-slate-500 dark:text-slate-400 truncate">
                        Prioritized deliverable roadmap
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#A33C29] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                </Link>
              </div>

            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
