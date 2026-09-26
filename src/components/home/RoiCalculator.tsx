"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Calculator, 
  TrendingUp, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  BarChart3, 
  Building2, 
  Sliders
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface IndustryOption {
  id: string;
  name: string;
  defaultRevenue: number;
  benchmarkMargin: number;
  iconName: string;
}

const INDUSTRIES: IndustryOption[] = [
  { id: "manufacturing", name: "Manufacturing & Industrial", defaultRevenue: 8500000, benchmarkMargin: 0.18, iconName: "Factory" },
  { id: "retail", name: "Retail & Multi-Unit Branches", defaultRevenue: 4200000, benchmarkMargin: 0.14, iconName: "Store" },
  { id: "logistics", name: "Logistics & Supply Chain", defaultRevenue: 6000000, benchmarkMargin: 0.16, iconName: "Truck" },
  { id: "healthcare", name: "Healthcare & Pharmaceuticals", defaultRevenue: 9500000, benchmarkMargin: 0.22, iconName: "Activity" },
  { id: "commercial", name: "Commercial & Corporate Services", defaultRevenue: 3000000, benchmarkMargin: 0.25, iconName: "Building" }
];

const BOTTLENECKS = [
  {
    id: "scrap",
    label: "Material Scrap & Shift Turnover Leaks",
    rate: 0.042,
    paybackMonths: 3.5,
    practice: "Operational Excellence & Process Engineering",
    description: "Eliminating handover variance, scrap defect rates, and machine idle times."
  },
  {
    id: "capital",
    label: "Working Capital Drag & Inventory Lag",
    rate: 0.055,
    paybackMonths: 4.2,
    practice: "Financial Feasibility & Investment Modeling",
    description: "Aligning cash conversion cycles, supplier payables, and storage shelf-life."
  },
  {
    id: "expansion",
    label: "New Branch / Market Entry Feasibility",
    rate: 0.075,
    paybackMonths: 6.0,
    practice: "Studies & Feasibility Research",
    description: "Multi-scenario footfall modeling, unit economics stress-testing & CapEx protection."
  },
  {
    id: "restructuring",
    label: "Overhead Bloat & Departmental Friction",
    rate: 0.048,
    paybackMonths: 3.8,
    practice: "Strategic Management & Corporate Restructuring",
    description: "Delayering administration, SaaS rationalization, and performance KPI governance."
  }
];

export default function RoiCalculator() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("manufacturing");
  const [annualRevenue, setAnnualRevenue] = useState<number>(5000000);
  const [selectedBottleneck, setSelectedBottleneck] = useState<string>("scrap");

  const calculations = useMemo(() => {
    const industry = INDUSTRIES.find((i) => i.id === selectedIndustry) || INDUSTRIES[0];
    const bottleneck = BOTTLENECKS.find((b) => b.id === selectedBottleneck) || BOTTLENECKS[0];

    const estimatedUnlockMin = Math.round(annualRevenue * bottleneck.rate * 0.85);
    const estimatedUnlockMax = Math.round(annualRevenue * bottleneck.rate * 1.35);
    const estimatedRoiMultiplier = (bottleneck.rate * 12).toFixed(1);

    return {
      industry,
      bottleneck,
      estimatedUnlockMin,
      estimatedUnlockMax,
      paybackMonths: bottleneck.paybackMonths,
      estimatedRoiMultiplier,
      recommendedPractice: bottleneck.practice
    };
  }, [selectedIndustry, annualRevenue, selectedBottleneck]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <section className="py-20 bg-[#FAFBFD] dark:bg-[#0A111E] text-[#152238] dark:text-white border-y border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#A33C29]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-brand-steel/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal variant="fade-up" className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A33C29]/10 text-[#A33C29] text-[11px] font-bold tracking-widest uppercase">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Diagnostic Model</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#152238] dark:text-white font-display">
            Estimate Your Enterprise <span className="text-[#A33C29]">Turnaround Potential</span>
          </h2>
          <p className="text-xs sm:text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
            Select your industry sector, operating scale, and primary bottleneck to model projected capital recovery, working capital velocity, and feasibility ROI.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <ScrollReveal variant="fade-up" delay={0.1} className="lg:col-span-7 bg-white dark:bg-[#111C2E] p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center justify-between">
                <span>1. Select Industry Sector</span>
                <span className="text-[11px] text-[#A33C29] font-semibold">{calculations.industry.name}</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {INDUSTRIES.map((ind) => (
                  <button
                    key={ind.id}
                    onClick={() => {
                      setSelectedIndustry(ind.id);
                      setAnnualRevenue(ind.defaultRevenue);
                    }}
                    className={`p-3 rounded-2xl border text-left text-xs font-semibold transition-all ${
                      selectedIndustry === ind.id
                        ? "bg-[#152238] text-white border-[#152238] dark:bg-[#1C2C47] dark:border-brand-steel shadow-md"
                        : "bg-slate-50 dark:bg-[#0E1626] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700/80 hover:border-slate-400"
                    }`}
                  >
                    <Building2 className="w-4 h-4 mb-1.5 opacity-80" />
                    <span className="line-clamp-2 leading-tight">{ind.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  2. Annual Operating Revenue
                </label>
                <span className="text-sm sm:text-base font-extrabold text-[#A33C29] font-mono">
                  {formatCurrency(annualRevenue)}
                </span>
              </div>
              <input
                type="range"
                min={500000}
                max={25000000}
                step={250000}
                value={annualRevenue}
                onChange={(e) => setAnnualRevenue(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#A33C29]"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>$500K</span>
                <span>$10M</span>
                <span>$25M+</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                3. Primary Operational Bottleneck
              </label>
              <div className="space-y-2">
                {BOTTLENECKS.map((btn) => (
                  <button
                    key={btn.id}
                    onClick={() => setSelectedBottleneck(btn.id)}
                    className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-start justify-between gap-3 ${
                      selectedBottleneck === btn.id
                        ? "bg-[#FAF5F4] dark:bg-[#1E1C2B] border-[#A33C29]/50 shadow-sm"
                        : "bg-slate-50 dark:bg-[#0E1626] border-slate-200 dark:border-slate-800 hover:border-slate-300"
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                          selectedBottleneck === btn.id ? "border-[#A33C29] bg-[#A33C29]" : "border-slate-400"
                        }`}>
                          {selectedBottleneck === btn.id && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </span>
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {btn.label}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 pl-5.5 leading-snug">
                        {btn.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.2} className="lg:col-span-5 bg-gradient-to-br from-[#121E33] to-[#0A1220] text-white p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-700/80">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-steel" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Diagnostic Projections
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Model: 2026-v2
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-slate-400 font-medium">Estimated Annual Value Unlock</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight text-emerald-400">
                {formatCurrency(calculations.estimatedUnlockMin)} – {formatCurrency(calculations.estimatedUnlockMax)}
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                Projected bottom-line margin expansion and working capital recovery.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-[#16243C] border border-slate-700/60 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Payback Horizon</span>
                <div className="text-lg font-bold text-white font-mono flex items-baseline gap-1">
                  <span>~{calculations.paybackMonths}</span>
                  <span className="text-xs text-slate-400 font-sans font-normal">Months</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#16243C] border border-slate-700/60 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Expected Hurdle ROI</span>
                <div className="text-lg font-bold text-[#FF8570] font-mono flex items-baseline gap-1">
                  <span>{calculations.estimatedRoiMultiplier}x</span>
                  <span className="text-xs text-slate-400 font-sans font-normal">Return</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0E1729] border border-slate-700/70 space-y-1.5">
              <div className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5 text-brand-steel" />
                <span>Recommended Advisory Practice</span>
              </div>
              <p className="text-xs font-bold text-slate-100">
                {calculations.recommendedPractice}
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              <Link
                href={`/contact?service=${encodeURIComponent(calculations.recommendedPractice)}&scale=${encodeURIComponent(formatCurrency(annualRevenue))}`}
                className="w-full py-3.5 px-4 rounded-full bg-gradient-to-r from-[#A33C29] to-[#8E3221] hover:from-[#B84530] hover:to-[#A33C29] text-white text-xs font-bold tracking-wide transition-all shadow-lg flex items-center justify-center gap-2 group text-center"
              >
                <span>Request Tailored Feasibility Blueprint</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <div className="flex items-center justify-center gap-2 text-[10.5px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Strictly Confidential &bull; Mutual NDA Guaranteed</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
