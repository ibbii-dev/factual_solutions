"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, PhoneCall } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function ConsultationBanner() {
  const { t } = useLanguage();

  return (
    <section className="py-14 sm:py-20 bg-transparent transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <ScrollReveal variant="fade-up" duration={0.6}>
          <div className="relative rounded-3xl bg-slate-900/95 dark:bg-black/55 backdrop-blur-md text-white p-6 sm:p-12 lg:p-16 overflow-hidden border border-slate-800 dark:border-white/20 shadow-2xl">
            
            {/* Subtle radial light highlight in background */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#8EA9D3]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#E25C43]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl space-y-4 sm:space-y-5">
              
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/15 backdrop-blur-md text-white border border-white/20 text-[10.5px] sm:text-[11px] font-bold uppercase tracking-wider shadow-sm">
                <span>ADVISORY ENGAGEMENT</span>
              </div>

              {/* Headline */}
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-display leading-tight drop-shadow-[0_2px_14px_rgba(0,0,0,0.8)]">
                Ready to Discuss Your Business Goals?
              </h2>

              {/* Subheadline */}
              <p className="text-xs sm:text-base text-slate-100 font-normal leading-relaxed max-w-2xl drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
                Connect directly with our consulting team to explore market research, business plan validation, financial modeling, or sales workflows.
              </p>

              {/* 3 Checkmarks */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2.5 sm:gap-6 pt-2 text-xs text-white font-medium drop-shadow-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E25C43] shrink-0" />
                  <span>Confidential Discussion</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E25C43] shrink-0" />
                  <span>Direct Consultant Callback</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E25C43] shrink-0" />
                  <span>No Immediate Commitment</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#E25C43] hover:bg-[#c94a33] text-white text-xs sm:text-sm font-bold transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-center"
                >
                  <span>Request a Consultation</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </Link>

                <Link
                  href="/contact?type=discovery"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold border border-white/25 transition-all duration-200 hover:-translate-y-0.5 text-center shadow-sm backdrop-blur-md"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#E25C43]" />
                  <span>Book a Discovery Call</span>
                </Link>
              </div>

            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
