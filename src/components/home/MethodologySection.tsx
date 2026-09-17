"use client";

import React from "react";
import Link from "next/link";
import { 
  Search, 
  FileText, 
  Wrench, 
  Gauge, 
  ArrowRight,
  Sparkles
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";

const frameworkSteps = [
  {
    phase: "Phase 01",
    isRustPhase: false,
    icon: <Search className="w-4 h-4 text-slate-400" />,
    title: "Discovery & Business Assessment",
    description: "We audit your existing workflows, market position, and financial sheet to identify critical bottlenecks and growth opportunities.",
    outcome: "Diagnostic Matrix"
  },
  {
    phase: "Phase 02",
    isRustPhase: true,
    icon: <FileText className="w-4 h-4 text-[#A33C29]" />,
    title: "Strategic Planning & Analysis",
    description: "We construct tailored market forecasts, execution milestones, and commercial budgets tailored to your sector and goals.",
    outcome: "Action Roadmap"
  },
  {
    phase: "Phase 03",
    isRustPhase: false,
    icon: <Wrench className="w-4 h-4 text-slate-400" />,
    title: "Execution & Hands-On Guidance",
    description: "We work directly with your leadership and team to implement business changes under structured governance and management practices.",
    outcome: "Operational Delivery"
  },
  {
    phase: "Phase 04",
    isRustPhase: false,
    icon: <Gauge className="w-4 h-4 text-slate-400" />,
    title: "Review & Performance Tracking",
    description: "We provide ongoing tracking and progress reports with practical KPIs to make sure your business stays on track and achieves steady growth.",
    outcome: "Verified Milestone Metrics"
  }
];

export default function MethodologySection() {
  const { t } = useLanguage();

  return (
    <section id="methodology" className="py-20 sm:py-24 bg-[#FAFBFD] dark:bg-[#0B1320] text-[#152238] dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <ScrollReveal variant="fade-up" className="text-center max-w-3xl mx-auto space-y-2 mb-12 sm:mb-16">
          <span className="text-[11px] font-bold tracking-widest uppercase text-[#A33C29]">
            ENGAGEMENT PROCESS
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#152238] dark:text-white font-display">
            A Structured 4–Step Advisory Framework
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
            We follow a practical disciplined consulting process from infrastructure review through hands-on execution and performance training.
          </p>
        </ScrollReveal>

        {/* 4 Cards Row */}
        <StaggerContainer delayChildren={0.1} staggerChildren={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {frameworkSteps.map((step, idx) => (
            <StaggerItem
              key={idx}
              className="bg-white dark:bg-[#111C2E] p-5 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-3.5">
                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      step.isRustPhase
                        ? "bg-[#A33C29]/15 text-[#A33C29]"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {step.phase}
                  </span>
                  {step.icon}
                </div>

                {/* Title and Desc */}
                <div className="space-y-1.5">
                  <h3 className="text-sm sm:text-base font-bold text-[#152238] dark:text-white font-display">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Expected Outcome Box */}
              <div className="mt-6 pt-3.5 border-t border-slate-100 dark:border-slate-800 space-y-0.5">
                <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold block">
                  EXPECTED OUTCOME:
                </span>
                <span className="text-xs font-bold text-[#152238] dark:text-slate-200 block">
                  {step.outcome}
                </span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Bottom Link */}
        <div className="mt-10 sm:mt-12 text-center">
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-[#A33C29] transition-colors"
          >
            <span>Learn More About our Methodology &amp; Governance Standards</span>
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
          </Link>
        </div>

      </div>
    </section>
  );
}
