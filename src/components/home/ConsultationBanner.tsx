"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, PhoneCall, ShieldCheck } from "lucide-react";

export default function ConsultationBanner() {
  return (
    <section className="py-14 sm:py-20 bg-[#EBF1FA] dark:bg-[#0B1320] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-[#152238] dark:bg-[#111C2E] text-white overflow-hidden p-8 sm:p-12 lg:p-14 shadow-xl border border-[#8EA9D3]/30 dark:border-slate-800">
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-steel-light text-xs font-semibold">
                <span className="flex h-2 w-2 rounded-full bg-brand-rust shrink-0" />
                <span>Advisory & Consultation</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
                Ready to Discuss Your Business Goals?
              </h2>

              <p className="text-xs sm:text-sm md:text-base text-slate-200 dark:text-slate-300 max-w-2xl leading-relaxed font-normal">
                Connect directly with our consulting team to explore market research, business idea validation, financial planning, or sales expansion.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-300 font-medium">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-brand-steel-light" /> Confidential Discussion
                </span>
                <span className="flex items-center gap-1.5">
                  <PhoneCall className="w-4 h-4 text-brand-steel-light" /> Direct Consultant Callback
                </span>
              </div>
            </div>

            {/* Right CTA Buttons */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-brand-rust hover:bg-brand-rust-light text-white text-xs sm:text-sm font-bold transition-all shadow-sm text-center"
              >
                <span>Request a Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-semibold border border-white/20 transition-all text-center"
              >
                <span>Explore All Services</span>
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
