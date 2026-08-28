"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Calculator, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Target,
  FileCheck2
} from "lucide-react";

interface StageOption {
  id: string;
  label: string;
  sub: string;
}

interface GoalOption {
  id: string;
  label: string;
  sub: string;
}

export default function InteractiveFeasibilityBlock() {
  const [selectedStage, setSelectedStage] = useState<string>("sme");
  const [selectedGoal, setSelectedGoal] = useState<string>("feasibility");

  const stages: StageOption[] = [
    { id: "startup", label: "New Venture / Idea", sub: "Pre-launch or conceptual stage" },
    { id: "sme", label: "Growing SME", sub: "Expanding operations & sales" },
    { id: "enterprise", label: "Established Enterprise", sub: "Multi-branch / industrial scale" },
    { id: "turnaround", label: "Operational Restructure", sub: "Cost cutting & efficiency audit" }
  ];

  const goals: GoalOption[] = [
    { id: "feasibility", label: "Feasibility & Capital Model", sub: "ROI, budgeting & financial projections" },
    { id: "operations", label: "Lean Six Sigma & ERP", sub: "Scrap reduction, workflow & systems" },
    { id: "growth", label: "Sales & Market Expansion", sub: "Channel strategy & revenue scaling" },
    { id: "governance", label: "Management Advisory", sub: "KPI structure, policies & governance" }
  ];

  // Dynamic blueprint generator
  const getBlueprint = () => {
    if (selectedGoal === "feasibility") {
      return {
        title: "Commercial Feasibility & Unit Economics Model",
        timeline: "3 to 5 Weeks",
        deliverables: [
          "5-Year Cash Flow & ROI Sensitivity Model",
          "Break-Even Capital Budget & CapEx/OpEx Breakdown",
          "Investor & Bank-Ready Feasibility Document",
          "Risk Mitigation Matrix"
        ],
        framework: "Empirical Financial Engineering",
        suggestedService: "New Business Idea & Feasibility Modeling"
      };
    } else if (selectedGoal === "operations") {
      return {
        title: "Lean Six Sigma & Operational Excellence Blueprint",
        timeline: "4 to 8 Weeks",
        deliverables: [
          "Full Shop-Floor / Workflow Value Stream Map",
          "Root Cause Scrap & Waste Elimination Plan",
          "Standard Operating Procedures (SOPs) & ERP Alignment",
          "Quality & Cycle Time Control Dashboard"
        ],
        framework: "Lean Six Sigma DMAIC Process",
        suggestedService: "Process Transformation & ERP Implementation"
      };
    } else if (selectedGoal === "growth") {
      return {
        title: "Commercial Scaling & Sales Channel Strategy",
        timeline: "4 to 6 Weeks",
        deliverables: [
          "Customer Acquisition Cost (CAC) & LTV Optimization",
          "Sales Team Compensation & KPI Structure",
          "Competitive Pricing & Margin Protection Strategy",
          "Quarterly Revenue Milestone Plan"
        ],
        framework: "Revenue Engine Architecture",
        suggestedService: "Business Growth & Sales Optimization"
      };
    } else {
      return {
        title: "Strategic Management & Executive Governance Architecture",
        timeline: "4 to 6 Weeks",
        deliverables: [
          "Organizational Chart & Responsibility Matrix (RACI)",
          "Departmental Balanced Scorecard & KPIs",
          "Risk Governance & Internal Control Protocols",
          "Quarterly Executive Review Cadence"
        ],
        framework: "Corporate Excellence Framework",
        suggestedService: "Strategic Management Consulting"
      };
    }
  };

  const blueprint = getBlueprint();

  return (
    <section className="py-16 sm:py-24 bg-[#EBF1FA] dark:bg-[#0B1320] text-[#152238] dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8EA9D3]/20 text-[#152238] dark:text-brand-steel-light text-xs font-semibold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Advisory Scope Tool</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#152238] dark:text-white">
            Estimate Your Project Blueprint & Scope
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal max-w-2xl mx-auto">
            Select your enterprise stage and primary commercial objective below to view a customized engagement framework and deliverables preview.
          </p>
        </div>

        {/* Divided Interactive Bento Block */}
        <div className="bg-white dark:bg-[#111C2E] rounded-3xl p-6 sm:p-10 border border-[#8EA9D3]/35 dark:border-slate-800 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Selectors (7-col) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Step 1: Enterprise Stage */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-brand-rust dark:text-brand-steel-light block mb-3">
                  Step 1: Select Your Current Business Stage
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {stages.map((stage) => (
                    <button
                      key={stage.id}
                      type="button"
                      onClick={() => setSelectedStage(stage.id)}
                      className={`text-left p-3.5 rounded-2xl border transition-all duration-200 ${
                        selectedStage === stage.id
                          ? "bg-[#152238] text-white border-[#152238] shadow-sm"
                          : "bg-[#F5F8FD] dark:bg-[#15233A] text-[#152238] dark:text-slate-200 border-[#8EA9D3]/30 dark:border-slate-700 hover:border-brand-steel"
                      }`}
                    >
                      <div className="text-xs font-bold">{stage.label}</div>
                      <div className={`text-[11px] mt-0.5 ${selectedStage === stage.id ? "text-slate-300" : "text-slate-500 dark:text-slate-400"}`}>
                        {stage.sub}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Commercial Objective */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-brand-rust dark:text-brand-steel-light block mb-3">
                  Step 2: Select Your Primary Advisory Priority
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {goals.map((goal) => (
                    <button
                      key={goal.id}
                      type="button"
                      onClick={() => setSelectedGoal(goal.id)}
                      className={`text-left p-3.5 rounded-2xl border transition-all duration-200 ${
                        selectedGoal === goal.id
                          ? "bg-brand-rust text-white border-brand-rust shadow-sm"
                          : "bg-[#F5F8FD] dark:bg-[#15233A] text-[#152238] dark:text-slate-200 border-[#8EA9D3]/30 dark:border-slate-700 hover:border-brand-steel"
                      }`}
                    >
                      <div className="text-xs font-bold">{goal.label}</div>
                      <div className={`text-[11px] mt-0.5 ${selectedGoal === goal.id ? "text-slate-100" : "text-slate-500 dark:text-slate-400"}`}>
                        {goal.sub}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Customized Scopes Available
                </span>
                <span>•</span>
                <span>Fixed Milestone Delivery</span>
              </div>
            </div>

            {/* Right Column: Dynamic Blueprint Output (5-col) */}
            <div className="lg:col-span-5 bg-[#DFE8F6] dark:bg-[#142033] rounded-2xl p-6 sm:p-7 border border-[#8EA9D3]/35 dark:border-slate-700 flex flex-col justify-between">
              
              <div>
                <div className="flex items-center justify-between border-b border-[#8EA9D3]/30 dark:border-slate-700 pb-3 mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#152238] dark:text-brand-steel-light flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-brand-rust" />
                    Recommended Engagement Scope
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white dark:bg-[#1C2C45] font-bold text-slate-700 dark:text-slate-300">
                    Live Blueprint
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#152238] dark:text-white mb-2">
                  {blueprint.title}
                </h3>

                <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300 mb-4">
                  <div className="flex items-center gap-1 font-semibold text-brand-rust">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Est. Timeline: {blueprint.timeline}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1 font-medium">
                    <Target className="w-3.5 h-3.5" />
                    <span>{blueprint.framework}</span>
                  </div>
                </div>

                {/* Key Deliverables */}
                <div className="space-y-2 mb-6">
                  <div className="text-xs font-bold text-[#152238] dark:text-white">Core Deliverables Included:</div>
                  {blueprint.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-[#8EA9D3]/30 dark:border-slate-700">
                <Link
                  href={`/contact?service=${encodeURIComponent(blueprint.suggestedService)}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-brand-rust hover:bg-brand-rust-light text-white text-xs sm:text-sm font-bold transition-all shadow-sm text-center"
                >
                  <FileCheck2 className="w-4 h-4" />
                  <span>Request Proposal for this Scope</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
