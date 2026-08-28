"use client";

import React from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  BarChart3, 
  Cpu, 
  Briefcase, 
  ArrowRight, 
  Check, 
  Target, 
  Compass,
  FileSpreadsheet,
  Users2
} from "lucide-react";

export default function DividedValueBlocks() {
  const valuePillars = [
    {
      id: "strategy",
      icon: <Compass className="w-5 h-5" />,
      tag: "Strategic Rigor",
      title: "Strategic Management & Corporate Advisory",
      description: "We don't deliver generic theory. We build disciplined corporate governance, executive KPIs, and operational roadmaps tailored to your commercial reality.",
      bullets: ["Executive Leadership Alignment", "Cross-Department KPI Architecture", "Operational Restructuring & Governance"],
      accent: "navy",
      span: "lg:col-span-6"
    },
    {
      id: "feasibility",
      icon: <FileSpreadsheet className="w-5 h-5" />,
      tag: "Financial Engineering",
      title: "Feasibility Modeling & Capital Budgeting",
      description: "Rigorous unit-economic forecasting, sensitivity scenarios, capital expenditure budgeting, and ROI validation for new ventures and expansion projects.",
      bullets: ["Unit Economics & Break-Even Analysis", "Cash Flow & Capital Budgeting Models", "Investor-Ready Feasibility Reports"],
      accent: "rust",
      span: "lg:col-span-6"
    },
    {
      id: "excellence",
      icon: <Cpu className="w-5 h-5" />,
      tag: "Process Transformation",
      title: "Lean Six Sigma & Operational Excellence",
      description: "Eliminating operational waste, optimizing factory and supply-chain throughput, and supervising ERP implementation for sustainable productivity.",
      bullets: ["Lean Six Sigma Master Black Belt Audits", "Waste Reduction & Scrap Minimization", "ERP & Workflow Systemization"],
      accent: "steel",
      span: "lg:col-span-6"
    },
    {
      id: "execution",
      icon: <Users2 className="w-5 h-5" />,
      tag: "Partner Delivery",
      title: "Senior Partner-Led Execution & Governance",
      description: "Direct hands-on delivery by credentialed practitioners (PMP, Master Black Belt) rather than delegating your strategic roadmap to junior analysts.",
      bullets: ["100% Strict NDA Protection", "Milestone-Based Transparent Deliverables", "Weekly Progress Tracking & Reviews"],
      accent: "emerald",
      span: "lg:col-span-6"
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#DFE8F6] dark:bg-[#0E1728] text-[#152238] dark:text-white border-y border-[#8EA9D3]/30 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header Card */}
        <div className="bg-white dark:bg-[#111C2E] rounded-3xl p-6 sm:p-10 border border-[#8EA9D3]/35 dark:border-slate-800 shadow-sm mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8EA9D3]/20 text-[#152238] dark:text-brand-steel-light text-xs font-semibold uppercase tracking-wider">
                Distinct Advantage
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#152238] dark:text-white">
                Why Industry Leaders Choose Factual Solutions
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-2xl">
                We combine deep financial rigor, certified process engineering, and senior-level management advisory to solve complex business challenges.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <div className="p-4 rounded-2xl bg-[#EBF1FA] dark:bg-[#15233A] border border-[#8EA9D3]/25 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#152238] dark:text-white">Senior Advisor Led</div>
                  <div className="text-[11px] text-slate-500">Every single engagement</div>
                </div>
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#152238] hover:bg-brand-rust text-white text-xs font-bold transition-all shadow-sm text-center"
              >
                <span>Read About Our Practice</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Divided Value Bento Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {valuePillars.map((pillar) => (
            <div
              key={pillar.id}
              className={`${pillar.span} bg-white dark:bg-[#111C2E] rounded-3xl p-6 sm:p-8 border border-[#8EA9D3]/35 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-brand-steel transition-all duration-300 group`}
            >
              <div>
                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between mb-5">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                      pillar.accent === "rust"
                        ? "bg-brand-rust/15 text-brand-rust"
                        : pillar.accent === "emerald"
                        ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                        : pillar.accent === "navy"
                        ? "bg-[#152238] text-white dark:bg-[#1E3150]"
                        : "bg-[#8EA9D3]/25 text-[#152238] dark:text-brand-steel-light"
                    }`}
                  >
                    {pillar.icon}
                  </div>

                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-[#EBF1FA] dark:bg-[#15233A] text-slate-700 dark:text-slate-300">
                    {pillar.tag}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-[#152238] dark:text-white mb-2.5">
                  {pillar.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal mb-5">
                  {pillar.description}
                </p>

                {/* Deliverables List */}
                <div className="space-y-2 mb-6 pt-2 border-t border-[#8EA9D3]/20 dark:border-slate-800">
                  {pillar.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                      <Check className={`w-3.5 h-3.5 shrink-0 ${pillar.accent === "rust" ? "text-brand-rust" : "text-emerald-600 dark:text-emerald-400"}`} />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Quick Drill Down */}
              <div className="pt-4 border-t border-[#8EA9D3]/20 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-500">Methodology Pillar</span>
                <Link
                  href="/services"
                  className="font-bold text-[#152238] dark:text-brand-steel-light group-hover:text-brand-rust flex items-center gap-1 transition-colors"
                >
                  <span>Explore Deliverables</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
