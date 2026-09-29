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
      className="relative pt-28 sm:pt-36 md:pt-40 pb-20 sm:pb-24 overflow-hidden bg-[#F8FAFC] dark:bg-[#0C1424] text-[#152238] dark:text-white transition-colors duration-300 min-h-[86vh] flex items-center"
    >
      {/* Theme-Adaptive Cinematic Looping Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-65 dark:opacity-60 transition-opacity duration-700"
          src={BG_VIDEO}
        />
        {/* Soft frosted scrim: Luminous alabaster in light mode; Deep midnight navy in dark mode */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F8FAFC]/95 via-[#F8FAFC]/82 to-[#F8FAFC]/50 dark:from-[#0C1424]/95 dark:via-[#0C1424]/85 dark:to-[#0C1424]/60 transition-colors duration-300" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F8FAFC] dark:to-[#0C1424] transition-colors duration-300" />
      </div>

      {/* Dynamic Cursor-responsive spotlight */}
      <div 
        className="pointer-events-none absolute -inset-px opacity-0 sm:opacity-100 transition-opacity duration-300 z-1"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(142, 169, 211, 0.08), transparent 80%)`,
        }}
      />

      {/* Subtle ambient background glow */}
      <div className="absolute -top-32 right-1/4 w-96 h-96 bg-[#8EA9D3]/10 dark:bg-[#8EA9D3]/5 rounded-full blur-3xl pointer-events-none z-1" />
      <div className="absolute top-1/2 -left-20 w-72 h-72 bg-[#A33C29]/5 rounded-full blur-3xl pointer-events-none z-1" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Typography and Call to Action */}
          <ScrollReveal variant="fade-up" duration={0.6} className="lg:col-span-7 space-y-6 text-left">
            
            {/* Category Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#152238]/5 dark:bg-white/10 border border-slate-200/80 dark:border-white/15 text-[#152238] dark:text-white text-[10px] sm:text-[11px] font-bold tracking-wider sm:tracking-widest uppercase shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A33C29] shrink-0" />
              <span>BUSINESS SOLUTIONS &amp; MANAGEMENT CONSULTING</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#152238] dark:text-white leading-[1.12] font-display">
              Consulting People to <span className="text-[#A33C29]">Grow Their</span> <br className="hidden sm:inline" />
              Business<span className="text-[#A33C29]">.</span>
            </h1>

            {/* Sub-headline (Reduced & Punchy) */}
            <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-xl font-normal leading-relaxed">
              We provide practical business planning, financial modeling, and management consulting to help companies scale operations and steady commercial growth.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#A33C29] hover:bg-[#8E3221] text-white text-xs sm:text-sm font-bold transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 text-center"
              >
                <span>Request a Consultation</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/90 dark:bg-white/10 text-[#152238] dark:text-white text-xs sm:text-sm font-semibold border border-slate-200/90 dark:border-white/15 hover:bg-white dark:hover:bg-white/20 transition-all duration-200 shadow-xs hover:-translate-y-0.5 text-center"
              >
                <Layers className="w-4 h-4 text-slate-500 dark:text-slate-300" />
                <span>Explore Practices</span>
              </Link>
            </div>

          </ScrollReveal>

          {/* Right Column: Factual Enterprise Engine Dashboard Card (Decongested & Airy) */}
          <ScrollReveal variant="zoom-in" delay={0.2} duration={0.7} className="lg:col-span-5 flex justify-center w-full">
            <div className="w-full max-w-md bg-white/90 dark:bg-[#131B2E]/90 backdrop-blur-xl rounded-3xl border border-slate-200/80 dark:border-white/10 p-6 sm:p-7 shadow-lg space-y-5 hover:shadow-xl transition-all duration-300">
              
              {/* Header: Logo + Title + Status */}
              <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800 p-1.5 flex items-center justify-center border border-slate-200/80 dark:border-slate-700 shrink-0">
                    <Image
                      src="/images/logo-symbol.png"
                      alt="Engine Mark"
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-[#152238] dark:text-white leading-tight truncate font-display">
                      Factual Enterprise Engine
                    </h3>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      Operations &amp; Governance System
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#A33C29]/10 text-[#A33C29] border border-[#A33C29]/20 shrink-0 whitespace-nowrap">
                  Live 4.2
                </span>
              </div>

              {/* Executive Operational KPIs */}
              <div className="bg-[#F8FAFC] dark:bg-[#0E1524] rounded-2xl p-4 border border-slate-200/60 dark:border-white/5 space-y-2">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="space-y-0.5">
                    <span className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold block">Execution</span>
                    <p className="text-sm font-bold text-[#152238] dark:text-white">91.4%</p>
                  </div>
                  <div className="space-y-0.5 border-x border-slate-200/80 dark:border-slate-800">
                    <span className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold block">Forecast</span>
                    <p className="text-sm font-bold text-[#152238] dark:text-white">48.6%</p>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold block">Benchmark</span>
                    <p className="text-sm font-bold text-[#A33C29]">Top Quartile</p>
                  </div>
                </div>
              </div>

              {/* Verified Governance & Milestone Tracking */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-slate-800 text-xs">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-[#A33C29]" />
                    <span className="font-semibold text-slate-700 dark:text-slate-200">Institutional Governance &amp; NDA</span>
                  </div>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 text-[11px]">Active</span>
                </div>

                <Link
                  href="/services"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors group text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-[#8EA9D3]" />
                    <span className="font-semibold text-slate-700 dark:text-slate-200 group-hover:text-[#A33C29] transition-colors">
                      Explore All 6 Practice Blueprints
                    </span>
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
