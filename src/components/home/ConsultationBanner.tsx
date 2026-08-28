"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, PhoneCall, ShieldCheck, MessageCircle, Mail, Clock } from "lucide-react";
import { contactDetails } from "@/data/companyData";

export default function ConsultationBanner() {
  return (
    <section className="py-16 sm:py-24 bg-[#EBF1FA] dark:bg-[#0B1320] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Divided Dual-Panel Consultation Card */}
        <div className="rounded-3xl bg-[#152238] dark:bg-[#0E1728] text-white overflow-hidden p-6 sm:p-10 lg:p-12 shadow-xl border border-[#8EA9D3]/30 dark:border-slate-800">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Panel: Proposition & Assurance (7-col) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-steel-light text-xs font-semibold">
                <span className="flex h-2 w-2 rounded-full bg-brand-rust shrink-0" />
                <span>Confidential Advisory Scoping</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Ready to Structure & Scale Your Business Operations?
              </h2>

              <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-xl leading-relaxed font-normal">
                Schedule a direct consultation with our advisory team to discuss feasibility studies, operational restructuring, financial modeling, or sales optimization.
              </p>

              {/* Verified Trust Badges */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Strict Mutual Non-Disclosure</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <Clock className="w-4 h-4 text-brand-steel-light shrink-0" />
                  <span>24-Hour Scoping Response</span>
                </div>
              </div>
            </div>

            {/* Right Panel: Divided Action & Contact Block (5-col) */}
            <div className="lg:col-span-5 bg-white/10 dark:bg-white/5 rounded-2xl p-6 border border-white/15 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-brand-steel-light">
                Direct Contact Channels
              </div>

              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-rust hover:bg-brand-rust-light text-white text-xs sm:text-sm font-bold transition-all shadow-sm text-center"
              >
                <span>Request Formal Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <a
                  href={`tel:${contactDetails.phone.replace(/\s+/g, '')}`}
                  className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-center text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-brand-steel-light" />
                  <span>Call Us</span>
                </a>

                <a
                  href={`https://wa.me/${contactDetails.phone.replace(/[^0-9]/g, '')}?text=Hello%20Factual%20Solutions,%20I%20would%20like%20to%20request%20a%20consultation.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-center text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                <span>Direct Office Email:</span>
                <a href={`mailto:${contactDetails.email}`} className="text-brand-steel-light hover:underline font-medium">
                  {contactDetails.email}
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
