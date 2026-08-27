"use client";

import React from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  CheckCircle, 
  ShieldCheck, 
  Briefcase, 
  Compass, 
  PhoneCall 
} from "lucide-react";
import InteractiveHeroCube from "./InteractiveHeroCube";

export default function HeroSection() {
  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-20 overflow-hidden bg-[#152238] dark:bg-[#0B1320] text-white border-b border-slate-700/40 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Strategic Positioning & Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Direct Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E3150] dark:bg-[#15233A] shadow-sm border border-brand-steel/30 dark:border-slate-700 text-xs font-semibold text-brand-steel-light max-w-full">
              <span className="flex h-2 w-2 rounded-full bg-brand-rust shrink-0" />
              <span>Business Solutions & Management Consulting</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.18] sm:leading-[1.12] break-words">
              Consulting People to Grow Their Business.
            </h1>

            {/* Sub-headline */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-200 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              We provide practical business planning, market analysis, investment modeling, and management consulting to help companies build solid operations and steady commercial growth.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2 w-full">
              <Link
                href="/services"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-brand-rust hover:bg-brand-rust-light text-white text-sm font-semibold transition-all duration-200 shadow-sm"
              >
                <span>View All Services</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/contact"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#1E3150] dark:bg-[#15233A] text-white text-sm font-semibold border border-brand-steel/30 dark:border-slate-700 hover:border-brand-steel transition-all duration-200 shadow-sm"
              >
                <PhoneCall className="w-4 h-4 text-brand-rust-light" />
                <span>Request a Consultation</span>
              </Link>
            </div>

            {/* Value Highlights */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs font-medium text-slate-300 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Direct Hands-On Advisory</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-steel-light shrink-0" />
                <span>Confidential Client Engagements</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-brand-rust-light shrink-0" />
                <span>Actionable Roadmaps</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean 3D Brand Symbol */}
          <div className="lg:col-span-5 flex justify-center items-center w-full">
            <InteractiveHeroCube />
          </div>

        </div>

        {/* 3 Core Practice Areas */}
        <div className="mt-14 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-[#1C2E4A] dark:bg-[#111C2E] p-5 sm:p-6 rounded-2xl border border-brand-steel/20 dark:border-slate-800 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-lg bg-brand-steel/20 text-brand-steel-light flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white">Business Solutions</h3>
            <p className="text-xs text-slate-200 dark:text-slate-400 leading-relaxed font-normal">
              New business idea modeling, comprehensive market analysis, capital budgeting, and sales growth strategies.
            </p>
          </div>

          <div className="bg-[#1C2E4A] dark:bg-[#111C2E] p-5 sm:p-6 rounded-2xl border border-brand-rust/30 dark:border-slate-800 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-lg bg-brand-rust/25 text-brand-rust-light flex items-center justify-center">
              <Compass className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white">Consultancy Advisory</h3>
            <p className="text-xs text-slate-200 dark:text-slate-400 leading-relaxed font-normal">
              Strategic management consulting, risk mitigation, performance tracking, and organizational leadership.
            </p>
          </div>

          <div className="bg-[#1C2E4A] dark:bg-[#111C2E] p-5 sm:p-6 rounded-2xl border border-emerald-500/30 dark:border-slate-800 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white">Empirical & Practical</h3>
            <p className="text-xs text-slate-200 dark:text-slate-400 leading-relaxed font-normal">
              Clear, step-by-step guidance tailored to your industry, team capability, and real market conditions.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
