"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, 
  Mail, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  CheckCircle2
} from "lucide-react";
import { businessServices, consultancyServices } from "@/data/servicesData";
import { officeLocations, contactDetails } from "@/data/companyData";

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-brand-navy-dark text-slate-300 pt-16 sm:pt-20 pb-10 border-t border-brand-steel/15 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/3 w-72 sm:w-96 h-72 sm:h-96 bg-brand-steel/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-60 sm:w-80 h-60 sm:h-80 bg-brand-rust/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 sm:pb-16 border-b border-white/10">
          
          {/* Col 1: Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4 sm:space-y-6">
            <Link href="/" className="inline-flex items-center gap-3 group select-none">
              <div className="flex flex-col leading-tight">
                <span className="text-xl sm:text-2xl font-light tracking-tight text-white">
                  Factual
                </span>
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-white -mt-0.5">
                  Solutions
                </span>
              </div>
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 transition-transform duration-300 group-hover:scale-105 shrink-0">
                <Image
                  src="/images/logo-symbol.png"
                  alt="Factual Solutions 3D Symbol"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm font-normal">
              Practical business modeling, market research, financial planning, and management consulting for steady enterprise growth.
            </p>

            {/* Newsletter Subscription */}
            <div className="space-y-2.5 pt-1">
              <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-brand-steel-light">
                Monthly Advisory Insights
              </div>
              {subscribed ? (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Subscribed! You will receive our monthly brief.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter business email"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-steel"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-brand-rust hover:bg-brand-rust-light text-white text-xs font-bold transition-colors shrink-0 flex items-center justify-center"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Col 2: Business Solutions (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
              Business Solutions
            </h4>
            <ul className="space-y-2 text-xs">
              {businessServices.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services?category=business&id=${service.id}`}
                    className="text-slate-400 hover:text-brand-steel-light transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-steel/40 shrink-0" />
                    <span className="truncate">{service.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Consultancy Services (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
              Consultancy Advisory
            </h4>
            <ul className="space-y-2 text-xs">
              {consultancyServices.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services?category=consultancy&id=${service.id}`}
                    className="text-slate-400 hover:text-brand-rust-light transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-rust/40 shrink-0" />
                    <span className="truncate">{service.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Head Office (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
              Head Office
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              {officeLocations.map((loc) => (
                <div key={loc.city} className="space-y-0.5">
                  <div className="font-semibold text-white flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-brand-rust shrink-0" /> {loc.city}
                  </div>
                  <div className="text-[10px] text-slate-400">{loc.tag}</div>
                </div>
              ))}
            </div>

            <div className="pt-1">
              <Link
                href="/contact"
                className="text-xs font-bold text-brand-steel-light hover:underline inline-flex items-center gap-1"
              >
                <span>Contact Form</span> &rarr;
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Factual Solutions. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link href="/about" className="hover:text-slate-400 transition-colors">About</Link>
            <Link href="/services" className="hover:text-slate-400 transition-colors">Services</Link>
            <Link href="/contact" className="hover:text-slate-400 transition-colors">Contact</Link>
            <Link href="/admin" className="text-slate-500 hover:text-brand-steel-light transition-colors font-medium">Admin Portal</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
