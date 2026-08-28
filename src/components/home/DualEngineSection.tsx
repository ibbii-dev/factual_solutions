"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Tv, 
  FolderPlus, 
  Scale, 
  Monitor, 
  TrendingUp, 
  ArrowRight 
} from "lucide-react";

export default function DualEngineSection() {
  return (
    <section className="py-16 sm:py-24 bg-[#EBF1FA] dark:bg-[#0B1320] text-[#152238] dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8EA9D3]/20 text-[#152238] dark:text-brand-steel-light text-xs font-semibold uppercase tracking-wider">
            Our Advisory Services
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#152238] dark:text-white">
            Comprehensive Consulting Services
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed">
            Structured business advisory, financial feasibility, and operational excellence designed to drive sustainable growth.
          </p>
        </div>

        {/* 6 Divided Blocks Grid (Matching the exact Taraa layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          
          {/* Card 1: Human Resources / Strategic Advisory */}
          <div className="bg-[#66C2EC] dark:bg-[#153456] rounded-2xl p-7 sm:p-8 flex flex-col items-center text-center justify-center min-h-[280px] sm:min-h-[300px] shadow-sm hover:shadow-md transition-all duration-300 group">
            {/* Top Outline Icon */}
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-[#083366] dark:text-sky-200 mb-4 group-hover:scale-110 transition-transform">
              <Tv className="w-7 h-7 stroke-[1.75]" />
            </div>

            {/* Title */}
            <h3 className="text-lg sm:text-xl font-bold text-[#083366] dark:text-white mb-3">
              Strategic Management Consulting
            </h3>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#083366]/85 dark:text-slate-200 leading-relaxed max-w-[280px] font-normal">
              Driving success through tailored strategic plans with a seasoned advisory team. Unlock your operational potential with structured corporate governance.
            </p>
          </div>

          {/* Card 2 (CENTER FEATURED HERO CARD): Image Background + Dark Overlay + "Learn more" button */}
          <div className="relative rounded-2xl overflow-hidden min-h-[280px] sm:min-h-[300px] flex flex-col items-center justify-center text-center p-7 sm:p-8 shadow-md group">
            {/* Background Corporate Image */}
            <Image
              src="/images/consulting-meeting.jpg"
              alt="Corporate Strategic Consultation"
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />

            {/* Dark Blue Overlay */}
            <div className="absolute inset-0 bg-[#0B203E]/80 dark:bg-[#07162C]/85 backdrop-blur-[1px]" />

            {/* Center Content */}
            <div className="relative z-10 space-y-5 max-w-[290px] mx-auto flex flex-col items-center justify-center">
              <p className="text-sm sm:text-base font-medium text-white leading-relaxed">
                We help organizations enhance performance and improve workflows to achieve their objectives more efficiently.
              </p>

              <Link
                href="/services"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-[#005CE6] hover:bg-[#0047BA] text-white text-xs sm:text-sm font-bold shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <span>Learn more</span>
              </Link>
            </div>
          </div>

          {/* Card 3: Projects Management / Operational Excellence */}
          <div className="bg-[#66C2EC] dark:bg-[#153456] rounded-2xl p-7 sm:p-8 flex flex-col items-center text-center justify-center min-h-[280px] sm:min-h-[300px] shadow-sm hover:shadow-md transition-all duration-300 group">
            {/* Top Outline Icon */}
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-[#083366] dark:text-sky-200 mb-4 group-hover:scale-110 transition-transform">
              <FolderPlus className="w-7 h-7 stroke-[1.75]" />
            </div>

            {/* Title */}
            <h3 className="text-lg sm:text-xl font-bold text-[#083366] dark:text-white mb-3">
              Projects & Lean Management
            </h3>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#083366]/85 dark:text-slate-200 leading-relaxed max-w-[280px] font-normal">
              We provide project management and Lean Six Sigma services to ensure initiatives are executed efficiently, on time, within budget, and with top quality.
            </p>
          </div>

          {/* Card 4: Process Transformation & ERP Implementation */}
          <div className="bg-[#66C2EC] dark:bg-[#153456] rounded-2xl p-7 sm:p-8 flex flex-col items-center text-center justify-center min-h-[280px] sm:min-h-[300px] shadow-sm hover:shadow-md transition-all duration-300 group">
            {/* Top Outline Icon */}
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-[#083366] dark:text-sky-200 mb-4 group-hover:scale-110 transition-transform">
              <Scale className="w-7 h-7 stroke-[1.75]" />
            </div>

            {/* Title */}
            <h3 className="text-lg sm:text-xl font-bold text-[#083366] dark:text-white mb-3">
              Process & ERP Transformation
            </h3>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#083366]/85 dark:text-slate-200 leading-relaxed max-w-[280px] font-normal">
              Streamlining business operations, eliminating shop-floor waste, and supervising ERP implementation to ensure maximum productivity and compliance.
            </p>
          </div>

          {/* Card 5: Studies & Research / Feasibility */}
          <div className="bg-[#66C2EC] dark:bg-[#153456] rounded-2xl p-7 sm:p-8 flex flex-col items-center text-center justify-center min-h-[280px] sm:min-h-[300px] shadow-sm hover:shadow-md transition-all duration-300 group">
            {/* Top Outline Icon */}
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-[#083366] dark:text-sky-200 mb-4 group-hover:scale-110 transition-transform">
              <Monitor className="w-7 h-7 stroke-[1.75]" />
            </div>

            {/* Title */}
            <h3 className="text-lg sm:text-xl font-bold text-[#083366] dark:text-white mb-3">
              Studies & Feasibility Research
            </h3>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#083366]/85 dark:text-slate-200 leading-relaxed max-w-[280px] font-normal">
              Rigorous market analysis, unit-economic modeling, capital budgeting, and commercial feasibility studies for new ventures and enterprise expansions.
            </p>
          </div>

          {/* Card 6: Specialized Consulting Services */}
          <div className="bg-[#66C2EC] dark:bg-[#153456] rounded-2xl p-7 sm:p-8 flex flex-col items-center text-center justify-center min-h-[280px] sm:min-h-[300px] shadow-sm hover:shadow-md transition-all duration-300 group">
            {/* Top Outline Icon */}
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-[#083366] dark:text-sky-200 mb-4 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-7 h-7 stroke-[1.75]" />
            </div>

            {/* Title */}
            <h3 className="text-lg sm:text-xl font-bold text-[#083366] dark:text-white mb-3">
              Specialized Business Solutions
            </h3>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#083366]/85 dark:text-slate-200 leading-relaxed max-w-[280px] font-normal">
              Tailored commercial advisory, sales funnel optimization, customer retention strategies, and transparent monthly KPI analytics reporting.
            </p>
          </div>

        </div>

        {/* View All Services Footer Link */}
        <div className="mt-10 sm:mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#152238] dark:text-brand-steel-light hover:text-brand-rust transition-colors"
          >
            <span>Explore all services and detailed engagement deliverables</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
