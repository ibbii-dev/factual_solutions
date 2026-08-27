"use client";

import React from "react";
import { Shield, Target, Users } from "lucide-react";

export default function ClientTestimonials() {
  const industries = [
    { name: "Retail & Consumer", type: "Commerce" },
    { name: "Manufacturing", type: "Industrial" },
    { name: "Wholesale & Logistics", type: "Trade" },
    { name: "Commercial Services", type: "Corporate" },
    { name: "Real Estate & Contracting", type: "Property" },
    { name: "Technology & Software", type: "Services" }
  ];

  return (
    <section className="py-16 bg-[#0E1728] text-white border-y border-slate-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trusted By Title */}
        <div className="text-center mb-8">
          <p className="text-xs uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500">
            Advising Businesses Across Key Industry Sectors
          </p>
        </div>

        {/* Industry Focus Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 items-center justify-center">
          {industries.map((ind, idx) => (
            <div
              key={idx}
              className="h-16 rounded-xl bg-white dark:bg-[#111C2E] hover:bg-slate-50 dark:hover:bg-[#16253B] border border-slate-200/70 dark:border-slate-800 hover:border-brand-steel/40 shadow-sm transition-all duration-300 flex flex-col items-center justify-center p-2 text-center group"
            >
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-brand-rust transition-colors">
                {ind.name}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-medium">
                {ind.type}
              </span>
            </div>
          ))}
        </div>

        {/* Practical Consulting Values */}
        <div className="mt-12 pt-10 border-t border-slate-200/60 dark:border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-full bg-brand-steel/10 dark:bg-brand-steel/20 text-brand-steel-light flex items-center justify-center mx-auto mb-3">
              <Shield className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">Strict Confidentiality</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
              All financial audits, business models, and strategic plans are protected under mutual non-disclosure agreements.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-full bg-brand-rust/10 dark:bg-brand-rust/20 text-brand-rust-light flex items-center justify-center mx-auto mb-3">
              <Target className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">Practical Action Plans</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
              We deliver straightforward, step-by-step recommendations that your internal team can realistically execute.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-full bg-slate-200/80 dark:bg-slate-700/60 text-slate-700 dark:text-slate-200 flex items-center justify-center mx-auto mb-3">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">Hands-On Collaboration</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
              Our consultants work directly with your management and staff to ensure smooth rollout and steady progress.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
