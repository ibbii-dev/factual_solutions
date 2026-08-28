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
    <section className="py-16 sm:py-24 bg-[#EBF1FA] dark:bg-[#0B1320] text-[#152238] dark:text-white relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Divided Section Header Box */}
        <div className="bg-white dark:bg-[#111C2E] rounded-3xl p-6 sm:p-10 border border-[#8EA9D3]/35 dark:border-slate-800 shadow-sm mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8EA9D3]/20 text-[#152238] dark:text-brand-steel-light text-xs font-semibold uppercase tracking-wider">
                Practice Divisions
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#152238] dark:text-white">
                Our Structured Consulting Verticals
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl font-normal leading-relaxed">
                Choose between our hands-on business modeling division and our senior strategic management advisory.
              </p>
            </div>

            {/* Switcher Controls in Block */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="p-1.5 bg-[#EBF1FA] dark:bg-[#15233A] rounded-2xl flex gap-1 border border-[#8EA9D3]/30 dark:border-slate-700 w-full">
                <button
                  onClick={() => setActiveTab("business")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 text-center ${
                    activeTab === "business"
                      ? "bg-[#152238] text-white shadow-sm"
                      : "text-[#152238] dark:text-slate-300 hover:text-brand-rust"
                  }`}
                >
                  <Briefcase className="w-4 h-4 shrink-0" />
                  <span className="truncate">Business Solutions</span>
                </button>

                <button
                  onClick={() => setActiveTab("consultancy")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 text-center ${
                    activeTab === "consultancy"
                      ? "bg-brand-rust text-white shadow-sm"
                      : "text-[#152238] dark:text-slate-300 hover:text-brand-rust"
                  }`}
                >
                  <Compass className="w-4 h-4 shrink-0" />
                  <span className="truncate">Consulting Advisory</span>
                </button>
              </div>

              <div className="mt-3 text-center text-[11px] text-slate-500 dark:text-slate-400">
                {activeTab === "business" 
                  ? "Showing 5 Business Growth & Feasibility Services" 
                  : "Showing 5 Strategic Management & Operational Services"}
              </div>
            </div>
          </div>
        </div>

        {/* Divided Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentServices.map((service) => (
            <div
              key={`${activeTab}-${service.id}`}
              className="bg-white dark:bg-[#111C2E] rounded-3xl p-6 sm:p-7 border border-[#8EA9D3]/35 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-brand-steel hover:shadow-md transition-all duration-300 group"
            >
              <div>
                {/* Service Icon & Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                      activeTab === "business"
                        ? "bg-[#8EA9D3]/20 text-[#152238] dark:text-brand-steel-light group-hover:bg-[#152238] group-hover:text-white"
                        : "bg-brand-rust/15 text-brand-rust dark:text-brand-rust-light group-hover:bg-brand-rust group-hover:text-white"
                    } transition-colors`}
                  >
                    {iconMap[service.iconName] || <Briefcase className="w-5 h-5" />}
                  </div>

                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-[#EBF1FA] dark:bg-[#15233A] text-slate-700 dark:text-slate-300">
                    {service.tags[0]}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-base sm:text-lg font-bold text-[#152238] dark:text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 font-normal">
                  {service.shortDescription}
                </p>

                {/* Deliverables Bullet Points */}
                <div className="space-y-1.5 mb-5 pt-3 border-t border-[#8EA9D3]/20 dark:border-slate-800">
                  {service.deliverables.slice(0, 3).map((item, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                      <Check className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${activeTab === "business" ? "text-[#152238] dark:text-brand-steel-light" : "text-brand-rust"}`} />
                      <span className="line-clamp-1">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Action Link */}
              <div className="pt-4 border-t border-[#8EA9D3]/20 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] font-medium text-slate-500">
                  Detailed Scope
                </span>

                <Link
                  href={`/services?category=${service.category}&id=${service.id}`}
                  className={`inline-flex items-center gap-1 text-xs font-bold ${
                    activeTab === "business"
                      ? "text-[#152238] dark:text-brand-steel-light group-hover:text-brand-rust"
                      : "text-brand-rust dark:text-brand-rust-light group-hover:underline"
                  }`}
                >
                  <span>View Deliverables</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Explore All Link Block */}
        <div className="mt-10 sm:mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#152238] hover:bg-brand-rust text-white text-xs sm:text-sm font-bold transition-all shadow-sm"
          >
            <span>View All 10 Services Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
