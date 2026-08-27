"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Briefcase, 
  Compass, 
  ArrowRight, 
  Cpu, 
  TrendingUp, 
  Layers, 
  BarChart3, 
  Sparkles,
  ShieldCheck,
  BrainCircuit,
  Scale,
  Users,
  GitMerge,
  Check
} from "lucide-react";
import { businessServices, consultancyServices } from "@/data/servicesData";

const iconMap: Record<string, React.ReactNode> = {
  Cpu: <Cpu className="w-5 h-5" />,
  TrendingUp: <TrendingUp className="w-5 h-5" />,
  Layers: <Layers className="w-5 h-5" />,
  BarChart3: <BarChart3 className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5" />,
  BrainCircuit: <BrainCircuit className="w-5 h-5" />,
  Scale: <Scale className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />,
  GitMerge: <GitMerge className="w-5 h-5" />
};

export default function DualEngineSection() {
  const [activeTab, setActiveTab] = useState<"business" | "consultancy">("business");

  const currentServices = activeTab === "business" ? businessServices : consultancyServices;

  return (
    <section className="py-16 sm:py-24 bg-[#0B1320] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-steel/10 text-brand-steel-light text-xs font-semibold uppercase tracking-wider">
            Our Core Services
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
            Tailored Advisory & Business Solutions
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Choose between our hands-on business operations division and our management consulting advisory.
          </p>
        </div>

        {/* Category Switcher Tabs */}
        <div className="mt-8 sm:mt-10 flex justify-center">
          <div className="p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl flex gap-1 border border-slate-200 dark:border-slate-700 max-w-md w-full">
            <button
              onClick={() => setActiveTab("business")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 text-center truncate ${
                activeTab === "business"
                  ? "bg-brand-navy dark:bg-brand-navy-light text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Briefcase className="w-4 h-4 shrink-0 hidden sm:inline" />
              <span className="truncate">Business Solutions</span>
            </button>

            <button
              onClick={() => setActiveTab("consultancy")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 text-center truncate ${
                activeTab === "consultancy"
                  ? "bg-brand-rust text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Compass className="w-4 h-4 shrink-0 hidden sm:inline" />
              <span className="truncate">Consultancy Services</span>
            </button>
          </div>
        </div>

        {/* Category Description Banner */}
        <div className="mt-6 text-center max-w-2xl mx-auto px-2">
          {activeTab === "business" ? (
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <strong className="text-slate-900 dark:text-white">Business Solutions:</strong> Commercial strategy, market analysis, capital planning, sales optimization, and global expansion.
            </p>
          ) : (
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <strong className="text-slate-900 dark:text-white">Consultancy Advisory:</strong> Management consulting, risk & compliance, analytics reporting, and organizational structure.
            </p>
          )}
        </div>

        {/* Services Grid */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentServices.map((service) => (
            <div
              key={`${activeTab}-${service.id}`}
              className="bg-slate-50/80 dark:bg-[#111C2E] hover:bg-white dark:hover:bg-[#15233A] rounded-2xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Service Icon */}
                <div className="mb-4">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                      activeTab === "business"
                        ? "bg-brand-navy/10 dark:bg-brand-steel/15 text-brand-navy dark:text-brand-steel-light"
                        : "bg-brand-rust/10 dark:bg-brand-rust/20 text-brand-rust dark:text-brand-rust-light"
                    }`}
                  >
                    {iconMap[service.iconName] || <Briefcase className="w-5 h-5" />}
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 font-normal">
                  {service.shortDescription}
                </p>

                {/* Deliverables Bullet Points */}
                <div className="space-y-1.5 mb-4">
                  {service.deliverables.slice(0, 3).map((item, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <Check className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${activeTab === "business" ? "text-brand-steel" : "text-brand-rust"}`} />
                      <span className="line-clamp-1">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Action Link */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  {service.tags[0]}
                </span>

                <Link
                  href={`/services?category=${service.category}&id=${service.id}`}
                  className={`inline-flex items-center gap-1 text-xs font-semibold ${
                    activeTab === "business"
                      ? "text-brand-navy dark:text-brand-steel-light hover:underline"
                      : "text-brand-rust dark:text-brand-rust-light hover:underline"
                  }`}
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Explore All Link CTA */}
        <div className="mt-10 sm:mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 rounded-xl bg-brand-navy dark:bg-white text-white dark:text-slate-900 text-xs sm:text-sm font-semibold hover:bg-brand-rust dark:hover:bg-brand-steel-light transition-all shadow-sm"
          >
            <span>View All 10 Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
