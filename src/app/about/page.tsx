"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ShieldCheck, 
  Target, 
  MapPin, 
  CheckCircle2, 
  ArrowRight,
  Award,
  Check
} from "lucide-react";
import { principalConsultant, officeLocations } from "@/data/companyData";
import InteractiveHeroCube from "@/components/home/InteractiveHeroCube";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
  const { t, language, isRTL } = useLanguage();
  const about = t.aboutPage;

  const arabicSkills = [
    "الاستشارات الإدارية والاستراتيجية",
    "تخطيط واستراتيجيات الأعمال",
    "التميز التشغيلي المؤسسي",
    "تطبيق منهجية اللين ستة سيجما",
    "تحول العمليات وأنظمة ERP",
    "إدارة المشاريع الاحترافية (PMP)",
    "تحليلات الأداء ومؤشرات KPIs",
    "التحسين المستمر للعمليات"
  ];

  const currentSkills = language === "ar" ? arabicSkills : principalConsultant.skills;

  return (
    <div className="pt-28 sm:pt-32 pb-20 sm:pb-24 min-h-screen bg-[#EBF1FA] dark:bg-[#0B1320] text-[#152238] dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8EA9D3]/20 text-[#152238] dark:text-brand-steel-light text-xs font-semibold uppercase tracking-wider">
            {about.badge}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#152238] dark:text-white tracking-tight leading-tight font-display">
            {about.headline}
          </h1>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
            {about.subheadline}
          </p>
        </div>

        {/* The Puzzle Philosophy Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16 sm:mb-20 bg-white dark:bg-[#111C2E] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm border border-[#8EA9D3]/30 dark:border-slate-800">
          
          <div className="lg:col-span-6 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#152238] dark:text-white tracking-tight font-display">
              {about.philosophyTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
              {about.philosophyP1}
            </p>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
              {about.philosophyP2}
            </p>

            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#152238] dark:text-slate-200 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{about.point1}</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#152238] dark:text-slate-200 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{about.point2}</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#152238] dark:text-slate-200 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{about.point3}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center items-center">
            <InteractiveHeroCube />
          </div>

        </div>

        {/* Principal Consultant & Practice Leadership */}
        <div className="mb-16 sm:mb-20">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-rust/15 text-brand-rust dark:text-brand-rust-light text-xs font-semibold uppercase">
              <Award className="w-3.5 h-3.5" />
              {about.leadershipBadge}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#152238] dark:text-white font-display">
              {about.principalTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal">
              {about.principalSubtitle}
            </p>
          </div>

          {/* Qadeer Ahmad Bhatti Profile Card */}
          <div className="bg-white dark:bg-[#111C2E] rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#8EA9D3]/30 dark:border-slate-800 shadow-sm max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Portrait Photo (4 cols) */}
            <div className="md:col-span-4 flex flex-col items-center text-center">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden shadow-md border-2 border-[#8EA9D3]/40 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
                <Image
                  src={principalConsultant.image}
                  alt={principalConsultant.name}
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              <h3 className="text-xl font-bold text-[#152238] dark:text-white mt-4 font-display">
                {about.consultantName}
              </h3>
              <p className="text-xs font-semibold text-brand-rust dark:text-brand-rust-light mt-0.5">
                {about.consultantRole}
              </p>
            </div>

            {/* Credentials & Skills (8 cols) */}
            <div className="md:col-span-8 space-y-4">
              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-[#152238] dark:text-brand-steel-light mb-1.5 font-display">
                  {about.focusTitle}
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                  {about.consultantBio}
                </p>
              </div>

              {/* Skills Tags Grid */}
              <div>
                <h5 className="text-[11px] uppercase font-bold tracking-wider text-slate-600 dark:text-slate-400 mb-2.5">
                  {about.skillsTitle}
                </h5>
                <div className="flex flex-wrap gap-2">
                  {currentSkills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F2F7FD] dark:bg-[#0B1320] border border-[#8EA9D3]/30 dark:border-slate-700/80 text-xs font-semibold text-[#152238] dark:text-slate-200"
                    >
                      <Check className="w-3.5 h-3.5 text-brand-rust shrink-0" />
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-rust hover:bg-brand-rust-light text-white text-xs font-bold transition-all shadow-sm"
                >
                  <span>{about.scheduleButton}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16 sm:mb-20">
          <div className="bg-white dark:bg-[#0E1728] text-[#152238] dark:text-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#8EA9D3]/30 dark:border-brand-steel/20 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#8EA9D3]/20 text-[#152238] dark:text-brand-steel-light flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold font-display">{about.missionTitle}</h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
              {about.missionDesc}
            </p>
          </div>

          <div className="bg-white dark:bg-[#111C2E] text-[#152238] dark:text-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#8EA9D3]/30 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-full bg-brand-rust/15 text-brand-rust dark:text-brand-rust-light flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold font-display">{about.visionTitle}</h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
              {about.visionDesc}
            </p>
          </div>
        </div>

        {/* Office Location */}
        <div className="bg-white dark:bg-[#0E1728] rounded-3xl p-6 sm:p-10 border border-[#8EA9D3]/30 dark:border-slate-800 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-6 space-y-1">
            <h3 className="text-xl sm:text-2xl font-bold text-[#152238] dark:text-white font-display">{about.headOfficeTitle}</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-normal">{about.headOfficeSubtitle}</p>
          </div>

          <div className="max-w-md mx-auto">
            {officeLocations.map((loc) => (
              <div key={loc.city} className="bg-[#F2F7FD] dark:bg-[#111C2E] p-5 rounded-2xl shadow-sm border border-[#8EA9D3]/30 dark:border-slate-800 space-y-2 text-center">
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-rust shrink-0" />
                  <span className="text-base font-bold text-[#152238] dark:text-white">
                    {language === "ar" ? "لاهور، باكستان" : `${loc.city}, ${loc.country}`}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#8EA9D3]/20 dark:bg-slate-800 text-[#152238] dark:text-slate-300">
                    {language === "ar" ? "المقر الرئيسي" : loc.tag}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-normal">
                  {language === "ar" ? "لاهور، البنجاب، باكستان" : loc.address}
                </p>
                <div className="text-xs font-bold text-[#152238] dark:text-brand-steel-light pt-1">
                  {language === "ar" ? "المباشر:" : "Direct:"} {loc.phone}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
