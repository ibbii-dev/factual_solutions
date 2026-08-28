"use client";

import React from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  CheckCircle, 
  ShieldCheck, 
  Briefcase, 
  Compass, 
  PhoneCall, 
  TrendingUp, 
  Award,
  Layers,
  Sparkles,
  ArrowUpRight,
  MessageCircle
} from "lucide-react";
import InteractiveHeroCube from "./InteractiveHeroCube";
import { contactDetails } from "@/data/companyData";

export default function HeroBentoGrid() {
  return (
    <section className="relative pt-28 pb-12 sm:pt-36 sm:pb-16 bg-[#EBF1FA] dark:bg-[#0B1320] text-[#152238] dark:text-white border-b border-[#8EA9D3]/30 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Eyebrow & Live Status */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#15233A] shadow-sm border border-[#8EA9D3]/40 dark:border-slate-700 text-xs font-semibold text-[#152238] dark:text-brand-steel-light">
            <span className="flex h-2 w-2 rounded-full bg-brand-rust animate-pulse" />
            <span>Factual Solutions • Business Solutions & Management Consulting</span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-xs text-slate-600 dark:text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              100% NDA Protected
            </span>
            <span className="text-[#8EA9D3]/60">•</span>
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-brand-rust" />
              Master Black Belt & PMP Certified
            </span>
          </div>
        </div>

        {/* Bento Grid Layout - Divided Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* BLOCK 1: Main Strategic Hero Statement (Large 7-col Block) */}
          <div className="lg:col-span-7 bg-white dark:bg-[#111C2E] rounded-3xl p-6 sm:p-10 border border-[#8EA9D3]/35 dark:border-slate-800 shadow-sm flex flex-col justify-between relative overflow-hidden group">
            {/* Subtle background ambient glow */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#8EA9D3]/10 dark:bg-brand-navy-light/30 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-5 relative z-10">
              <div className="inline-block px-3 py-1 rounded-md bg-[#8EA9D3]/15 text-[#152238] dark:text-brand-steel-light text-[11px] font-bold tracking-wider uppercase">
                Advisory Framework & Growth
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#152238] dark:text-white leading-[1.14]">
                Consulting People to <span className="text-brand-rust">Grow</span> Their Business.
              </h1>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl font-normal leading-relaxed">
                We provide hands-on strategic planning, unit-economic feasibility modeling, lean operational excellence, and sales optimization to build resilient, profitable commercial enterprises.
              </p>
            </div>

            {/* CTAs & Trust Badges */}
            <div className="pt-8 space-y-5 relative z-10">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Link
                  href="/services"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-brand-rust hover:bg-brand-rust-light text-white text-sm font-bold transition-all duration-200 shadow-sm group/btn"
                >
                  <span>Explore Practice Areas</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#EBF1FA] dark:bg-[#15233A] text-[#152238] dark:text-white text-sm font-semibold border border-[#8EA9D3]/40 dark:border-slate-700 hover:border-[#152238] dark:hover:border-brand-steel transition-all duration-200"
                >
                  <PhoneCall className="w-4 h-4 text-brand-rust" />
                  <span>Book Consultation</span>
                </Link>
              </div>

              {/* Verified Value Markers */}
              <div className="pt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Empirical Market Modeling</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Lean Six Sigma Excellence</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Senior Partner Involvement</span>
                </div>
              </div>
            </div>
          </div>

          {/* BLOCK 2: 3D Interactive Brand & Strategy Visual (5-col Block) */}
          <div className="lg:col-span-5 bg-[#DFE8F6] dark:bg-[#131F33] rounded-3xl p-6 sm:p-8 border border-[#8EA9D3]/35 dark:border-slate-800 shadow-sm flex flex-col justify-between items-center relative overflow-hidden">
            <div className="w-full flex items-center justify-between border-b border-[#8EA9D3]/30 dark:border-slate-800 pb-3">
              <span className="text-xs font-bold text-[#152238] dark:text-brand-steel-light uppercase tracking-wider">
                Factual Structure Matrix
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/60 dark:bg-white/10 text-slate-700 dark:text-slate-300 font-semibold">
                Interactive Model
              </span>
            </div>

            <div className="my-auto py-2 w-full flex items-center justify-center">
              <InteractiveHeroCube />
            </div>

            <div className="w-full bg-white/70 dark:bg-[#0E1726] rounded-2xl p-3.5 border border-[#8EA9D3]/25 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-brand-rust/15 text-brand-rust flex items-center justify-center shrink-0">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#152238] dark:text-white">Dual Advisory Engine</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Business Solutions & Consulting</p>
                </div>
              </div>
              <Link
                href="/about"
                className="text-xs font-bold text-brand-rust hover:text-brand-rust-light flex items-center gap-1"
              >
                <span>Read Bio</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* BLOCK 3: Divided Stats & Impact Strip (4-col) */}
          <div className="lg:col-span-4 bg-white dark:bg-[#111C2E] rounded-3xl p-6 border border-[#8EA9D3]/35 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#8EA9D3]/20 text-[#152238] dark:text-brand-steel-light flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Track Record</span>
            </div>

            <div className="grid grid-cols-2 gap-4 my-2">
              <div className="p-3.5 rounded-2xl bg-[#EBF1FA] dark:bg-[#15233A] border border-[#8EA9D3]/20 dark:border-slate-800">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#152238] dark:text-white">150+</div>
                <div className="text-[11px] font-medium text-slate-600 dark:text-slate-400 mt-0.5">Projects Delivered</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#EBF1FA] dark:bg-[#15233A] border border-[#8EA9D3]/20 dark:border-slate-800">
                <div className="text-2xl sm:text-3xl font-extrabold text-brand-rust">8+ Yrs</div>
                <div className="text-[11px] font-medium text-slate-600 dark:text-slate-400 mt-0.5">Advisory Leadership</div>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-2">
              Serving industrial manufacturing, retail distribution, supply chain, and high-growth services.
            </p>
          </div>

          {/* BLOCK 4: Practice Pillars Divided Strip (5-col) */}
          <div className="lg:col-span-5 bg-white dark:bg-[#111C2E] rounded-3xl p-6 border border-[#8EA9D3]/35 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-brand-navy dark:bg-brand-navy-light text-white flex items-center justify-center">
                  <Briefcase className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-[#152238] dark:text-white">Strategic Practice Verticals</h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#8EA9D3]/20 text-[#152238] dark:text-brand-steel-light">
                10 Core Services
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 my-2 text-xs">
              <div className="p-2.5 rounded-xl bg-[#F4F7FC] dark:bg-[#15233A] border border-[#8EA9D3]/20 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-rust" />
                <span className="font-semibold truncate">Business Feasibility</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#F4F7FC] dark:bg-[#15233A] border border-[#8EA9D3]/20 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#152238] dark:bg-brand-steel" />
                <span className="font-semibold truncate">Management Consulting</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#F4F7FC] dark:bg-[#15233A] border border-[#8EA9D3]/20 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                <span className="font-semibold truncate">Sales Optimization</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#F4F7FC] dark:bg-[#15233A] border border-[#8EA9D3]/20 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-rust" />
                <span className="font-semibold truncate">Process & Lean ERP</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#8EA9D3]/20 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">Tailored to enterprise & SME scopes</span>
              <Link href="/services" className="text-xs font-bold text-[#152238] dark:text-brand-steel-light hover:text-brand-rust flex items-center gap-1">
                <span>View Breakdown</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* BLOCK 5: Fast Direct Contact / WhatsApp Connect Block (3-col) */}
          <div className="lg:col-span-3 bg-[#152238] dark:bg-[#0A101C] text-white rounded-3xl p-6 border border-[#8EA9D3]/30 dark:border-slate-800 shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-white/10 text-brand-steel-light flex items-center justify-center">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </div>
              <h3 className="text-base font-bold text-white pt-1">Direct Advisory Hotline</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                Direct consultation with senior advisors for rapid scoping.
              </p>
            </div>

            <div className="pt-4 space-y-2.5">
              <a
                href={`tel:${contactDetails.phone.replace(/\s+/g, '')}`}
                className="w-full py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-bold text-center block text-white transition-colors"
              >
                {contactDetails.phone}
              </a>

              <a
                href={`https://wa.me/${contactDetails.phone.replace(/[^0-9]/g, '')}?text=Hello%20Factual%20Solutions,%20I%20would%20like%20to%20inquire%20about%20your%20consulting%20services.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-center flex items-center justify-center gap-1.5 text-white transition-colors shadow-sm"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
