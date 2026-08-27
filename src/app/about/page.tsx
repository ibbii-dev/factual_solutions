"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ShieldCheck, 
  Target, 
  MapPin, 
  CheckCircle2,
  Briefcase,
  Compass,
  ArrowRight
} from "lucide-react";
import { leadershipTeam, officeLocations } from "@/data/companyData";
import InteractiveHeroCube from "@/components/home/InteractiveHeroCube";

export default function AboutPage() {
  return (
    <div className="pt-28 sm:pt-32 pb-20 sm:pb-24 min-h-screen bg-[#F8FAFC] dark:bg-[#0B1320] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-steel/10 text-brand-steel-light text-xs font-semibold uppercase tracking-wider">
            About Factual Solutions
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
            Practical Guidance for Growing Businesses
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Factual Solutions was founded to provide business owners and management teams with actionable advisory—helping companies turn promising ideas into profitable, steady operations.
          </p>
        </div>

        {/* The Puzzle Philosophy Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16 sm:mb-20 bg-white dark:bg-[#111C2E] rounded-2xl p-6 sm:p-10 lg:p-12 shadow-sm border border-slate-200 dark:border-slate-800">
          
          <div className="lg:col-span-6 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Our Core Philosophy: The Interlocking Puzzle
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              In business, every piece matters. A great product idea requires solid financial planning, and strong sales need reliable operations and risk management to support them.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              At <strong>Factual Solutions</strong>, our interlocking cube represents practical alignment across all operational functions—market research, sales strategy, team structure, and financial modeling.
            </p>

            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Fact-based market and competitive research</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Practical financial planning without unnecessary complexity</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Hands-on management support during execution</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center items-center">
            <InteractiveHeroCube />
          </div>

        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16 sm:mb-20">
          <div className="bg-[#0E1728] text-white rounded-2xl p-6 sm:p-8 shadow-sm border border-brand-steel/20 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-steel/20 text-brand-steel-light flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold">Our Mission</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              To provide business owners and managers with clear, practical roadmaps—reducing operational friction and building steady, long-term commercial growth.
            </p>
          </div>

          <div className="bg-white dark:bg-[#111C2E] text-slate-900 dark:text-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-rust/10 text-brand-rust-light flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold">Our Vision</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              To be a dependable, trusted consulting partner for commercial enterprises—known for practical advice, integrity, and measurable business improvement.
            </p>
          </div>
        </div>

        {/* Leadership Team */}
        <div className="mb-16 sm:mb-20">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Our Advisory Team
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Our team brings practical experience in commercial strategy, operations, financial modeling, and business development.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadershipTeam.map((leader, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#111C2E] rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4 bg-slate-100 dark:bg-slate-800">
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-0.5">
                    {leader.name}
                  </h3>
                  <div className="text-xs font-semibold text-brand-rust-light mb-2.5">
                    {leader.role}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {leader.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Office Locations */}
        <div className="bg-white dark:bg-[#0E1728] rounded-2xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800">
          <div className="text-center max-w-xl mx-auto mb-8 space-y-1">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Office Locations</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Supporting clients with regional advisory and local support.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {officeLocations.map((loc) => (
              <div key={loc.city} className="bg-slate-50 dark:bg-[#111C2E] p-4 rounded-xl shadow-sm border border-slate-200/70 dark:border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-brand-rust shrink-0" /> {loc.city}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {loc.country}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-tight">{loc.address}</p>
                <div className="text-xs font-semibold text-brand-steel-light pt-1">
                  {loc.phone}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
