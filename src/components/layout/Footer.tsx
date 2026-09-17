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
    <footer className="bg-[#0B1322] text-slate-300 relative overflow-hidden transition-colors duration-300">
      
      {/* Top Advisory Briefing Bar */}
      <div className="border-b border-white/10 py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center justify-between">
            
            <div className="lg:col-span-7 space-y-1.5">
              <span className="text-[10px] font-bold tracking-wider uppercase text-[#A33C29]">
                EXECUTIVE ADVISORY BRIEFING
              </span>
              <h3 className="text-lg sm:text-2xl font-bold text-white font-display">
                Schedule an Enterprise Advisory Briefing
              </h3>
              <p className="text-xs text-slate-400 max-w-xl">
                Connect with our strategic analysts to assess financial exposures, market opportunities, and organizational roadmaps.
              </p>
            </div>

            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs flex items-center gap-2">
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
                    className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/15 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-white/40"
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#A33C29] hover:bg-[#8E3221] text-white text-xs font-bold transition-colors shrink-0 tracking-wider uppercase text-center"
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
              <span className="text-lg font-bold tracking-tight text-white font-display">
                Factual Solutions
              </span>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Practical business modeling, market research, financial planning, and management consulting for steady enterprise growth.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="mailto:contact@factualsolutions.com"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Knowledge Sectors */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              KNOWLEDGE SECTORS
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/services/investment-planning" className="text-slate-400 hover:text-white transition-colors">
                  Financial Modeling
                </Link>
              </li>
              <li>
                <Link href="/services/studies-research" className="text-slate-400 hover:text-white transition-colors">
                  Market Opportunity Assessment
                </Link>
              </li>
              <li>
                <Link href="/services/studies-research" className="text-slate-400 hover:text-white transition-colors">
                  Feasibility Studies
                </Link>
              </li>
              <li>
                <Link href="/services/business-growth" className="text-slate-400 hover:text-white transition-colors">
                  Corporate Restructuring
                </Link>
              </li>
              <li>
                <Link href="/services/process-transformation" className="text-slate-400 hover:text-white transition-colors">
                  Operational Audit
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Regions & Practice */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              REGIONS &amp; PRACTICE
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>United Arab Emirates</li>
              <li>Kingdom of Saudi Arabia</li>
              <li>North America</li>
              <li>European Markets</li>
              <li>Enterprise Advisory</li>
            </ul>
          </div>

          {/* Column 4: Global Headquarters */}
          <div className="lg:col-span-3 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                GLOBAL HEADQUARTERS
              </h4>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white/10 text-brand-steel-light">
                1-Day Response
              </span>
            </div>

            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#A33C29] shrink-0 mt-0.5" />
                <span>Executive District, Building 4, Level 6, Riyadh 12214</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <a href="tel:+97140000000" className="hover:text-white transition-colors">+971 4 000 0000</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <a href="mailto:contact@factualsolutions.com" className="hover:text-white transition-colors">contact@factualsolutions.com</a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Disclosures */}
        <div className="pt-10 mt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Factual Solutions. All rights reserved. Registered Enterprise Advisory Ltd.
          </div>
          <div className="flex flex-wrap items-center gap-4 text-slate-400">
            <Link href="/about" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link href="/services" className="hover:text-white transition-colors">Terms of Engagement</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-white transition-colors">Regulatory Disclosures</Link>
            <span>•</span>
            <Link href="/admin" className="text-slate-500 hover:text-slate-300 transition-colors text-[10px]">Staff Admin</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
