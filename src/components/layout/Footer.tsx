"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { contactDetails, officeLocations } from "@/data/companyData";
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

  const linkCls = "text-slate-300 hover:text-white transition-colors";
  const socialCls = "w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 hover:border-steel/40 transition-colors";

  return (
    <footer className="relative overflow-hidden bg-navy-950 dark:bg-night-950 text-slate-300 transition-colors duration-300">
      {/* Logo tri-color hairline */}
      <div className="h-1 w-full bg-brand-tri" aria-hidden="true" />

      {/* Top Advisory Briefing Bar */}
      <div className="relative border-b border-white/10 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            <div className="lg:col-span-7 space-y-2">
              <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-steel">
                STAY INFORMED
              </span>
              <h3 className="text-xl sm:text-3xl font-bold text-white font-display">
                Practical Insights on Operational Excellence
              </h3>
              <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
                Ideas on Lean Six Sigma, strategy, quality, ERP, and digital transformation—straight to your inbox.
              </p>
            </div>

            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="p-3.5 bg-emerald-500/10 border border-emerald-400/30 rounded-xl text-emerald-300 text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Thank you, you're subscribed.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 w-full p-1.5 rounded-2xl bg-white/5 border border-white/10">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    aria-label="Corporate email"
                    className="w-full px-4 py-3 rounded-xl bg-transparent text-sm text-white placeholder:text-slate-400 focus:outline-none focus:bg-white/5"
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-rust hover:bg-rust-light text-white text-xs font-bold transition-colors shrink-0 tracking-wider uppercase text-center shadow-cta"
                  >
                    SUBSCRIBE
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main 4-Column Footer */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-10">

          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-flex items-center gap-3 group select-none">
              <div className="relative w-11 h-11 shrink-0 rounded-xl bg-white p-1.5 shadow-lg">
                <div className="relative w-full h-full">
                  <Image
                    src="/images/logo-symbol.png"
                    alt="Factual Solutions Symbol"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <span className="flex flex-col leading-none font-display">
                <span className="text-base font-medium text-slate-200">Factual</span>
                <span className="text-xl font-extrabold tracking-tight text-white">Solutions</span>
              </span>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Consulting, training, and digital implementation that help organizations perform better—from strategy to shop floor.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2.5">
              <a href={`mailto:${contactDetails.email}`} className={socialCls} aria-label="Email">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Knowledge Sectors */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[11px] font-bold text-white uppercase tracking-[0.16em]">
              WHAT WE DO
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/services/operational-excellence" className={linkCls}>Operational Excellence</Link></li>
              <li><Link href="/services/strategy-performance" className={linkCls}>Strategy &amp; Performance</Link></li>
              <li><Link href="/services/quality-risk-compliance" className={linkCls}>Quality, Risk &amp; Compliance</Link></li>
              <li><Link href="/services?line=training#training" className={linkCls}>Training Programs</Link></li>
              <li><Link href="/services/erp-implementation" className={linkCls}>ERP &amp; Digital Transformation</Link></li>
            </ul>
          </div>

          {/* Column 3: Navigation & Company */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-[11px] font-bold text-white uppercase tracking-[0.16em]">
              NAVIGATION
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/about" className={linkCls}>About Us</Link></li>
              <li><Link href="/services" className={linkCls}>Our Services</Link></li>
              <li><Link href="/what-we-think" className={linkCls}>What We Think</Link></li>
              <li><Link href="/blog" className={linkCls}>Blog</Link></li>
              <li>
                <Link href="/contact" className="text-white hover:text-steel-light font-semibold transition-colors inline-flex items-center gap-1.5">
                  <span>Contact Us</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-rust text-white">24h</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Global Headquarters & Inquiries */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="text-[11px] font-bold text-white uppercase tracking-[0.16em]">
                HEAD OFFICE
              </h4>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-steel/15 text-steel-light border border-steel/25">
                1-Day Response
              </span>
            </div>

            <div className="space-y-2.5 text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-rust-light shrink-0 mt-0.5" />
                <span>{officeLocations[0].address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-steel shrink-0" />
                <a href={`tel:${contactDetails.phone.replace(/\s/g, "")}`} className="hover:text-white transition-colors">{contactDetails.phone}</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-steel shrink-0" />
                <a href={`mailto:${contactDetails.email}`} className="hover:text-white transition-colors break-all">{contactDetails.email}</a>
              </div>
            </div>

            {/* Direct Contact Us Button */}
            <div className="pt-1">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-white text-ink hover:bg-steel-light text-xs font-bold transition-all shadow-md group"
              >
                <span>Contact Us &amp; Submit Inquiry</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform" />
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Disclosures */}
        <div className="pt-8 mt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="text-center sm:text-start">
            &copy; {new Date().getFullYear()} Factual Solutions. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-slate-300">
            <Link href="/contact" className="hover:text-white font-semibold transition-colors">Contact Us</Link>
            <span className="text-white/20">•</span>
            <Link href="/about" className="hover:text-white transition-colors">Who We Are</Link>
            <span className="text-white/20">•</span>
            <Link href="/services" className="hover:text-white transition-colors">What We Do</Link>
            <span className="text-white/20">•</span>
            <Link href="/admin" className="text-slate-500 hover:text-slate-200 transition-colors text-[11px]">Staff Admin</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
