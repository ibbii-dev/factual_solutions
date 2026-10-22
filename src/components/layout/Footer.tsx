"use client";

import React, { useState } from "react";
import Link from "next/link";
import BrandMark from "@/components/ui/BrandMark";
import { contactDetails, officeLocations } from "@/data/companyData";
import { mainNav, servicesLabel } from "@/data/navigation";
import { ArrowRight, MapPin, Phone, Mail, CheckCircle2 } from "lucide-react";

// Classic footer (restored 2026-10-21): newsletter, then links on midnight navy.
// Other languages are machine-translated, so the copy is English only.
const c = {
  stay: "STAY INFORMED",
  newsTitle: "Practical Insights on Operational Excellence",
  newsText: "Ideas on Lean Six Sigma, strategy, quality, ERP, and digital transformation, straight to your inbox.",
  thanks: "Thank you, you're subscribed.",
  emailPh: "Enter your email",
  emailLabel: "Email address",
  subscribe: "SUBSCRIBE",
  about: "Consulting, training, and digital implementation that help organizations perform better, from strategy to shop floor.",
  oe: "Operational Excellence",
  sp: "Strategy & Performance",
  qrc: "Quality, Risk & Compliance",
  training: "Training Programs",
  erp: "ERP & Digital Transformation",
  nav: "NAVIGATION",
  contact: "Contact Us",
  office: "HEAD OFFICE",
  contactCta: "Contact Us & Submit Inquiry",
  rights: "All rights reserved.",
  admin: "Staff Admin",
};

export default function Footer() {
  const [status, setStatus] = useState<"idle" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "Website Footer", website: hp }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setStatus("done");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.message || "Please check the address and try again.");
      }
    } catch {
      setStatus("error");
      setMessage("We couldn't reach the server. Please try again.");
    }
  };

  const linkCls = "text-slate-300 hover:text-white transition-colors";
  const headCls = "text-[11px] font-bold text-white uppercase tracking-[0.16em]";

  return (
    <footer className="relative bg-[#0B1533] dark:bg-night-950 text-slate-300">
      {/* the three logo pieces as a signature band */}
      <div aria-hidden="true" className="grid grid-cols-3 h-1">
        <span className="bg-navy" />
        <span className="bg-steel" />
        <span className="bg-rust" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end py-14 sm:py-16 border-b border-white/10">
          <div className="lg:col-span-7 space-y-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-steel">{c.stay}</p>
            <h2 className="text-2xl sm:text-[1.75rem] font-bold text-white font-display">{c.newsTitle}</h2>
            <p className="text-sm text-slate-400 max-w-xl leading-relaxed">{c.newsText}</p>
          </div>
          <div className="lg:col-span-5">
            {status === "done" ? (
              <p className="flex items-center gap-2 text-sm text-white" role="status">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                {c.thanks}
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <div className="relative flex items-stretch gap-2 rounded-2xl bg-white/5 border border-white/15 p-1.5 focus-within:border-white/40">
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-0 top-0 opacity-0 pointer-events-none -z-10 w-px h-px" value={hp} onChange={(e) => setHp(e.target.value)} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={c.emailPh}
                    aria-label={c.emailLabel}
                    className="flex-1 min-w-0 px-3 py-2.5 bg-transparent text-[16px] sm:text-[15px] text-white placeholder:text-slate-400 focus:outline-none"
                  />
                  <button type="submit" className="btn-primary !min-h-[44px] !px-5 !text-[13px] !rounded-xl uppercase tracking-wide">
                    {c.subscribe}
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </button>
                </div>
                {status === "error" && <p role="alert" className="text-sm text-rust-light">{message}</p>}
              </form>
            )}
          </div>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-10 py-14">
          <div className="col-span-2 lg:col-span-4 space-y-4">
            <Link href="/" className="group inline-flex items-center gap-3" translate="no" dir="ltr">
              <span className="shrink-0 w-11 h-11 bg-white rounded-xl p-1.5"><BrandMark className="w-full h-full overflow-visible" /></span>
              <span className="flex flex-col">
                <span className="fs-wordmark font-display text-[1.3rem] leading-tight text-white"><span className="font-medium">Factual </span><span className="font-bold">Solutions</span></span>
                <span className="fs-tagline mt-1 text-[10px] leading-none font-semibold uppercase tracking-[0.14em] text-slate-400">Your Business Excellence Partners</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">{c.about}</p>
          </div>

          <nav aria-label={servicesLabel} className="lg:col-span-3 space-y-4">
            <h2 className={headCls}>{servicesLabel.toUpperCase()}</h2>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/services/operational-excellence" className={linkCls}>{c.oe}</Link></li>
              <li><Link href="/services/strategy-performance" className={linkCls}>{c.sp}</Link></li>
              <li><Link href="/services/quality-risk-compliance" className={linkCls}>{c.qrc}</Link></li>
              <li><Link href="/services/training" className={linkCls}>{c.training}</Link></li>
              <li><Link href="/services/digital" className={linkCls}>{c.erp}</Link></li>
            </ul>
          </nav>

          <nav aria-label="Navigation" className="lg:col-span-2 space-y-4">
            <h2 className={headCls}>{c.nav}</h2>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/services" className={linkCls}>{servicesLabel}</Link></li>
              {mainNav.map((item) => (
                <li key={item.href}><Link href={item.href} className={linkCls}>{item.label}</Link></li>
              ))}
              <li><Link href="/contact" className={linkCls}>{c.contact}</Link></li>
            </ul>
          </nav>

          <div className="col-span-2 lg:col-span-3 space-y-4">
            <h2 className={headCls}>{c.office}</h2>
            <address className="not-italic space-y-2.5 text-sm text-slate-300">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-rust-light shrink-0 mt-0.5" aria-hidden="true" />
                <span>{officeLocations[0].address}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-rust-light shrink-0" aria-hidden="true" />
                <a href={`tel:${contactDetails.phone.replace(/\s/g, "")}`} dir="ltr" className="hover:text-white">{contactDetails.phone}</a>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-rust-light shrink-0" aria-hidden="true" />
                <a href={`mailto:${contactDetails.email}`} className="hover:text-white break-all">{contactDetails.email}</a>
              </p>
            </address>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 w-full min-h-[44px] rounded-xl bg-white text-[#0E1A38] text-[13px] font-semibold hover:bg-steel-light transition-colors">
              {c.contactCta}
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>

        {/* Bottom line */}
        <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>&copy; {new Date().getFullYear()} <span translate="no">Factual Solutions</span>. {c.rights}</p>
          <nav aria-label="Legal" className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
            <Link href="/admin" className="hover:text-white transition-colors">{c.admin}</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
