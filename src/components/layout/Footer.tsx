"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle2,
  Linkedin,
  Twitter
} from "lucide-react";

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      const emailToSend = email;
      setEmail("");
      try {
        await fetch("/api/newsletter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: emailToSend })
        });
      } catch (err) {
        console.error("Newsletter error:", err);
      }
    }
  };

  return (
    <footer className="bg-slate-50/80 dark:bg-transparent backdrop-blur-sm border-t border-slate-200/80 dark:border-white/10 text-slate-600 dark:text-slate-100 relative overflow-hidden transition-colors duration-300">
      
      {/* Top Advisory Briefing Bar */}
      <div className="border-b border-slate-200/80 dark:border-white/10 py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center justify-between">
            
            <div className="lg:col-span-7 space-y-1.5">
              <span className="text-[10px] font-bold tracking-wider uppercase text-[#E25C43]">
                EXECUTIVE ADVISORY BRIEFING
              </span>
              <h3 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white font-display">
                Schedule an Enterprise Advisory Briefing
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-200 max-w-xl">
                Connect with our strategic analysts to assess financial exposures, market opportunities, and organizational roadmaps.
              </p>
            </div>

            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Briefing request sent. Our advisory team will contact you.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 w-full">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your corporate email"
                    className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-white/10 border border-slate-200 dark:border-white/20 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-300 focus:outline-none focus:border-[#E25C43]"
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#E25C43] hover:bg-[#c94a33] text-white text-xs font-bold transition-colors shrink-0 tracking-wider uppercase text-center shadow-md"
                  >
                    SEND BRIEFING REQUEST
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Main 4-Column Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 group select-none">
              <div className="relative w-8 h-8 shrink-0">
                <Image
                  src="/images/logo-symbol.png"
                  alt="Factual Solutions Symbol"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white font-display">
                Factual Solutions
              </span>
            </Link>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-sm">
              Practical business modeling, market research, financial planning, and management consulting for steady enterprise growth.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-200 hover:text-[#E25C43] dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-200 hover:text-[#E25C43] dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="mailto:contact@factualsolutions.com"
                className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-200 hover:text-[#E25C43] dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Knowledge Sectors */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              KNOWLEDGE SECTORS
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/services/investment-planning" className="text-slate-600 dark:text-slate-300 hover:text-[#E25C43] dark:hover:text-white transition-colors">
                  Financial Modeling
                </Link>
              </li>
              <li>
                <Link href="/services/studies-research" className="text-slate-600 dark:text-slate-300 hover:text-[#E25C43] dark:hover:text-white transition-colors">
                  Market Opportunity Assessment
                </Link>
              </li>
              <li>
                <Link href="/services/studies-research" className="text-slate-600 dark:text-slate-300 hover:text-[#E25C43] dark:hover:text-white transition-colors">
                  Feasibility Studies
                </Link>
              </li>
              <li>
                <Link href="/services/business-growth" className="text-slate-600 dark:text-slate-300 hover:text-[#E25C43] dark:hover:text-white transition-colors">
                  Corporate Restructuring
                </Link>
              </li>
              <li>
                <Link href="/services/process-transformation" className="text-slate-600 dark:text-slate-300 hover:text-[#E25C43] dark:hover:text-white transition-colors">
                  Operational Audit
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Navigation & Company */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              NAVIGATION
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="text-slate-600 dark:text-slate-300 hover:text-[#E25C43] dark:hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-slate-600 dark:text-slate-300 hover:text-[#E25C43] dark:hover:text-white transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/what-we-think" className="text-slate-600 dark:text-slate-300 hover:text-[#E25C43] dark:hover:text-white transition-colors">
                  What We Think
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-600 dark:text-slate-300 hover:text-[#E25C43] dark:hover:text-white transition-colors">
                  Executive Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#E25C43] hover:text-[#c94a33] font-bold transition-colors inline-flex items-center gap-1">
                  <span>Contact Us</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#E25C43]/15 text-[#E25C43]">24h</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Global Headquarters & Inquiries */}
          <div className="lg:col-span-3 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                GLOBAL HEADQUARTERS
              </h4>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-200/80 dark:bg-white/10 text-slate-800 dark:text-white border border-slate-300/60 dark:border-white/10">
                1-Day Response
              </span>
            </div>

            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#E25C43] shrink-0 mt-0.5" />
                <span>Executive District, Building 4, Level 6, Riyadh 12214</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <a href="tel:+97140000000" className="hover:text-[#E25C43] dark:hover:text-white transition-colors">+971 4 000 0000</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <a href="mailto:contact@factualsolutions.com" className="hover:text-[#E25C43] dark:hover:text-white transition-colors">contact@factualsolutions.com</a>
              </div>
            </div>

            {/* Direct Contact Us Button */}
            <div className="pt-1">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#E25C43] hover:bg-[#c94a33] text-white text-xs font-bold transition-all shadow-md group"
              >
                <span>Contact Us &amp; Submit Inquiry</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform" />
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Disclosures */}
        <div className="pt-10 mt-10 border-t border-slate-200/80 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500 dark:text-slate-300">
          <div>
            &copy; {new Date().getFullYear()} Factual Solutions. All rights reserved. Registered Enterprise Advisory Ltd.
          </div>
          <div className="flex flex-wrap items-center gap-4 text-slate-600 dark:text-slate-200">
            <Link href="/contact" className="hover:text-[#E25C43] dark:hover:text-white font-semibold transition-colors">Contact Us</Link>
            <span>•</span>
            <Link href="/about" className="hover:text-[#E25C43] dark:hover:text-white transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link href="/services" className="hover:text-[#E25C43] dark:hover:text-white transition-colors">Terms of Engagement</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-[#E25C43] dark:hover:text-white transition-colors">Regulatory Disclosures</Link>
            <span>•</span>
            <Link href="/admin" className="text-slate-400 hover:text-slate-700 dark:text-slate-300 dark:hover:text-white transition-colors text-[10px]">Staff Admin</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
