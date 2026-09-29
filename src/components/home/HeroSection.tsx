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

const BG_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260511_230229_7c9bc431-46cf-489a-948d-e8144d8eb5d4.mp4";

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
      className="relative pt-28 sm:pt-36 md:pt-40 pb-20 sm:pb-24 overflow-hidden bg-[#0A111F] text-white transition-colors duration-300 min-h-[92vh] flex items-center"
    >
      {/* High-Impact Cinematic Looping Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-85 sm:opacity-90 transition-opacity duration-1000 scale-100"
          src={BG_VIDEO}
        />
        {/* Cinematic dark scrim for crystal-clear readability without washing out the video */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A111F]/85 via-[#0A111F]/50 to-[#0A111F]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAFBFD] dark:from-[#131B2E] via-transparent to-[#0A111F]/40" />
      </div>

      {/* Dynamic Cursor-responsive spotlight */}
      <div 
        className="pointer-events-none absolute -inset-px opacity-0 sm:opacity-100 transition-opacity duration-300 z-1"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(142, 169, 211, 0.12), transparent 80%)`,
        }}
      />

      {/* Subtle ambient background glow */}
      <div className="absolute -top-32 right-1/4 w-96 h-96 bg-[#8EA9D3]/15 rounded-full blur-3xl pointer-events-none z-1" />
      <div className="absolute top-1/2 -left-20 w-72 h-72 bg-[#A33C29]/15 rounded-full blur-3xl pointer-events-none z-1" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Typography and Call to Action */}
          <ScrollReveal variant="fade-up" duration={0.6} className="lg:col-span-7 space-y-6 text-left">
            
            {/* Direct Category Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 dark:bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-[11px] font-bold tracking-widest uppercase shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E25C43] shrink-0 animate-pulse" />
              <span className="break-words">BUSINESS SOLUTIONS &amp; MANAGEMENT CONSULTING</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.12] sm:leading-[1.08] font-display drop-shadow-md">
              Consulting People to <span className="text-[#E25C43]">Grow Their</span> <br className="hidden sm:inline" />
              Business<span className="text-[#E25C43]">.</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-sm sm:text-base md:text-lg text-slate-100/90 max-w-2xl font-normal leading-relaxed drop-shadow-sm">
              We provide practical business planning, market analysis, investment modeling, and management consulting to help companies scale operations and steady commercial growth.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#A33C29] hover:bg-[#B84530] text-white text-xs sm:text-sm font-bold transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-center"
              >
                <span>Request a Consultation</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md text-white text-xs sm:text-sm font-semibold border border-white/30 hover:border-white transition-all duration-200 shadow-sm hover:-translate-y-0.5 text-center"
              >
                <Layers className="w-4 h-4 text-slate-200" />
                <span>View Solutions</span>
              </Link>
            </div>

            {/* 3-Column Micro Highlights Row with Frosted Glass */}
            <div className="pt-6 sm:pt-7 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-left">
              <div className="p-3 sm:p-3.5 rounded-2xl bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/15 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#E25C43] block">
                  Business Solutions
                </span>
                <p className="text-[11px] text-slate-200 leading-snug">
                  Modernizing architectures &amp; digital budgets.
                </p>
              </div>

              <div className="p-3 sm:p-3.5 rounded-2xl bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/15 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-200 block">
                  Commercial Strategy
                </span>
                <p className="text-[11px] text-slate-200 leading-snug">
                  Strategic positioning &amp; dynamic revenue targets.
                </p>
              </div>

              <div className="p-3 sm:p-3.5 rounded-2xl bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/15 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-200 block">
                  Financial Advisory
                </span>
                <p className="text-[11px] text-slate-200 leading-snug">
                  Actionable projection scenarios &amp; capital modeling.
                </p>
              </div>
            </div>

          </ScrollReveal>

          {/* Right Column: Factual Enterprise Engine Dashboard Card */}
          <ScrollReveal variant="zoom-in" delay={0.2} duration={0.7} className="lg:col-span-5 flex justify-center w-full">
            <div className="w-full max-w-md bg-white/95 dark:bg-[#131B2E]/90 backdrop-blur-2xl rounded-3xl border border-white/60 dark:border-white/15 p-5 sm:p-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] space-y-4 hover:shadow-[0_30px_70px_-15px_rgba(163,60,41,0.3)] transition-all duration-300">
              
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
                <span className="text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E25C43]/15 text-[#A33C29] dark:text-[#E25C43] border border-[#E25C43]/30 shrink-0 whitespace-nowrap">
                  Live 4.2
                </span>
              </div>

              {/* Executive Operational KPIs */}
              <div className="bg-[#FAFBFD]/90 dark:bg-[#0A111F]/80 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 border border-slate-200/60 dark:border-white/10 space-y-2">
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
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/90 dark:bg-white/5 border border-slate-100 dark:border-white/10 hover:border-slate-300 transition-colors gap-2">
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
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/90 dark:bg-white/5 border border-slate-100 dark:border-white/10 hover:border-[#A33C29]/40 transition-colors group gap-2"
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
