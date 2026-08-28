"use client";

import React from "react";
import Link from "next/link";
import { 
  ShoppingBag, 
  Factory, 
  Truck, 
  Building2, 
  Laptop, 
  HeartPulse, 
  ArrowRight,
  Shield
} from "lucide-react";

export default function DividedSectorGrid() {
  const sectors = [
    {
      id: "retail",
      icon: <ShoppingBag className="w-5 h-5" />,
      title: "Retail & FMCG",
      category: "Consumer Commerce",
      points: "Inventory budgeting, store-level unit economics, and multi-branch retail rollouts.",
      tag: "Store Networks"
    },
    {
      id: "manufacturing",
      icon: <Factory className="w-5 h-5" />,
      title: "Industrial & Manufacturing",
      category: "Production & Heavy Industry",
      points: "Scrap reduction, shop-floor OEE, Lean Six Sigma deployment, and plant capacity models.",
      tag: "Plant Operations"
    },
    {
      id: "logistics",
      icon: <Truck className="w-5 h-5" />,
      title: "Wholesale & Supply Chain",
      category: "Distribution & Trade",
      points: "Warehousing unit economics, fleet routing profitability, and supplier margin reviews.",
      tag: "Cold Chain & Fleet"
    },
    {
      id: "tech",
      icon: <Laptop className="w-5 h-5" />,
      title: "Technology & Digital Services",
      category: "SaaS & IT Solutions",
      points: "Subscription financial models, customer acquisition unit costs, and scaling roadmap.",
      tag: "Digital Commerce"
    },
    {
      id: "realestate",
      icon: <Building2 className="w-5 h-5" />,
      title: "Real Estate & Contracting",
      category: "Property Development",
      points: "Project-level cash flow modeling, contractor feasibility, and capital expenditure tracking.",
      tag: "CapEx Modeling"
    },
    {
      id: "services",
      icon: <HeartPulse className="w-5 h-5" />,
      title: "Commercial & Corporate Services",
      category: "Professional Services",
      points: "Partner compensation structures, billable hour economics, and corporate governance.",
      tag: "Governance"
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#DFE8F6] dark:bg-[#0E1728] text-[#152238] dark:text-white border-t border-[#8EA9D3]/30 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8EA9D3]/20 text-[#152238] dark:text-brand-steel-light text-xs font-semibold uppercase tracking-wider">
              Industry Experience
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#152238] dark:text-white">
              Proven Advisory Across Core Sectors
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
              We apply sector-specific benchmarks, regulatory understanding, and empirical operational analysis to deliver measurable outcomes.
            </p>
          </div>

          <div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-[#15233A] text-[#152238] dark:text-white border border-[#8EA9D3]/35 dark:border-slate-700 hover:border-[#152238] text-xs font-bold transition-all shadow-sm"
            >
              <span>Inquire for Your Sector</span>
              <ArrowRight className="w-3.5 h-3.5 text-brand-rust" />
            </Link>
          </div>
        </div>

        {/* Divided 6-Sector Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sectors.map((sector) => (
            <div
              key={sector.id}
              className="bg-white dark:bg-[#111C2E] rounded-3xl p-6 sm:p-7 border border-[#8EA9D3]/35 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-brand-steel hover:shadow-md transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-[#8EA9D3]/20 text-[#152238] dark:text-brand-steel-light group-hover:bg-brand-rust group-hover:text-white flex items-center justify-center transition-colors">
                    {sector.icon}
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-[#EBF1FA] dark:bg-[#15233A] text-slate-700 dark:text-slate-300">
                    {sector.tag}
                  </span>
                </div>

                <div className="text-[11px] font-bold uppercase tracking-wider text-brand-rust dark:text-brand-steel-light mb-1">
                  {sector.category}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#152238] dark:text-white mb-2">
                  {sector.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal mb-4">
                  {sector.points}
                </p>
              </div>

              <div className="pt-3 border-t border-[#8EA9D3]/20 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-[11px] font-semibold text-slate-500">Tailored Advisory</span>
                <Link
                  href="/contact"
                  className="font-bold text-[#152238] dark:text-brand-steel-light group-hover:text-brand-rust flex items-center gap-1 transition-colors"
                >
                  <span>Request Scoping</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
