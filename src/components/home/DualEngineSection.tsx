"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";

const consultingServices = [
  {
    num: "01",
    isRustNum: false,
    tag: "Strategic Focus",
    title: "Strategic Management Consulting",
    description: "Aligning organizational vision, leadership, routine operational workflows, and execution resources to execute corporate growth strategies.",
    bullets: [
      "Executive alignment & OKRs",
      "Operational bottleneck audits",
      "Structured corporate governance"
    ],
    link: "/services/strategic-consulting"
  },
  {
    num: "02",
    isRustNum: true,
    tag: "Feasibility & ROI",
    title: "Financial Modeling & Budgeting",
    description: "We construct stress-tested financial projections, unit economic models, and CapEx/OpEx budgets for banks, partners, and executive decisions.",
    bullets: [
      "5-Year Pro-Forma Cash Flows",
      "Unit Economics & Break-Even Tools",
      "Bank-Ready Presentation Sheets"
    ],
    link: "/services/investment-planning"
  },
  {
    num: "03",
    isRustNum: false,
    tag: "Operations",
    title: "Projects & Lean Management",
    description: "Certified PMP professional lead execution plans using lean six-sigma project execution, cross-department coordination, and audit tracking.",
    bullets: [
      "Certified PMO Framework Delivery",
      "Lean Waste Audit Sessions",
      "Rolling Risk Audits & Milestone Controls"
    ],
    link: "/services/projects-management"
  },
  {
    num: "04",
    isRustNum: false,
    tag: "Systems",
    title: "Process & ERP Transformation",
    description: "Streamline departments handover, automate operational smog, and manage ERP software rollouts to institutionalize operational workflows.",
    bullets: [
      "Departmental Handover Optimization",
      "Standardized SOP Frameworks",
      "ERP Readiness & System Migration"
    ],
    link: "/services/process-transformation"
  },
  {
    num: "05",
    isRustNum: false,
    tag: "Market Entry",
    title: "Studies & Feasibility Research",
    description: "Empirical market research, customer demand surveys, competitor benchmarking, and cross-border commercial feasibility studies.",
    bullets: [
      "Customer Demand & Willingness-To-Pay",
      "Global Competitor Matrix Benchmarking",
      "Multi-Market Growth Opportunities"
    ],
    link: "/services/studies-research"
  },
  {
    num: "06",
    isRustNum: true,
    tag: "Growth",
    title: "Specialized Business Solutions",
    description: "Identifying cross-corporate bottlenecks, restructuring customer acquisition funnels, and enterprise commercial turnarounds.",
    bullets: [
      "Go-to-Market Strategy Re-calibration",
      "Sales Pipeline & Deal Velocity Retooling",
      "Transaction Readiness & Growth Re-Financing"
    ],
    link: "/services/business-growth"
  }
];

export default function DualEngineSection() {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-20 sm:py-24 bg-white dark:bg-[#0E1626] text-[#152238] dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <ScrollReveal variant="fade-up" className="max-w-3xl space-y-2 mb-12 sm:mb-16">
          <span className="text-[11px] font-bold tracking-widest uppercase text-[#A33C29]">
            OUR ADVISORY SOLUTIONS
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#152238] dark:text-white font-display">
            Comprehensive Consulting Services
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
            Structured business advisory, financial feasibility, and operational excellence designed to drive sustainable growth.
          </p>
        </ScrollReveal>

        {/* 6 Cards Grid */}
        <StaggerContainer delayChildren={0.1} staggerChildren={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {consultingServices.map((service) => (
            <StaggerItem
              key={service.num}
              className="bg-white dark:bg-[#111C2E] p-6 sm:p-7 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-lg hover:border-slate-300 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Top Number Badge and Tag */}
                <div className="flex items-center justify-between">
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                      service.isRustNum
                        ? "bg-[#A33C29] text-white"
                        : "bg-[#152238] text-white"
                    }`}
                  >
                    {service.num}
                  </span>
                  <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {service.tag}
                  </span>
                </div>

                {/* Title and Description */}
                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg font-bold text-[#152238] dark:text-white font-display group-hover:text-[#A33C29] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                    {service.description}
                  </p>
                </div>

                {/* Bullets List */}
                <ul className="space-y-2 pt-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                  {service.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#A33C29] shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Learn More Link */}
              <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800">
                <Link
                  href={service.link}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#152238] dark:text-slate-200 group-hover:text-[#A33C29] transition-colors"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform" />
                </Link>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Center Button Below Grid */}
        <div className="mt-12 sm:mt-16 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#152238] hover:bg-[#1E3150] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
          >
            <span>Explore Our Comprehensive Engagement Deliverables</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        </div>

      </div>
    </section>
  );
}
