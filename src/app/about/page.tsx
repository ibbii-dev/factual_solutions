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
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";

export default function AboutPage() {
  const { t, language, isRTL } = useLanguage();
  const about = t.aboutPage;

  const arabicSkills = [
    "╪º┘ä╪º╪│╪¬╪┤╪º╪▒╪º╪¬ ╪º┘ä╪Ñ╪»╪º╪▒┘è╪⌐ ┘ê╪º┘ä╪º╪│╪¬╪▒╪º╪¬┘è╪¼┘è╪⌐",
    "╪¬╪«╪╖┘è╪╖ ┘ê╪º╪│╪¬╪▒╪º╪¬┘è╪¼┘è╪º╪¬ ╪º┘ä╪ú╪╣┘à╪º┘ä",
    "╪º┘ä╪¬┘à┘è╪▓ ╪º┘ä╪¬╪┤╪║┘è┘ä┘è ╪º┘ä┘à╪ñ╪│╪│┘è",
    "╪¬╪╖╪¿┘è┘é ┘à┘å┘ç╪¼┘è╪⌐ ╪º┘ä┘ä┘è┘å ╪│╪¬╪⌐ ╪│┘è╪¼┘à╪º",
    "╪¬╪¡┘ê┘ä ╪º┘ä╪╣┘à┘ä┘è╪º╪¬ ┘ê╪ú┘å╪╕┘à╪⌐ ERP",
    "╪Ñ╪»╪º╪▒╪⌐ ╪º┘ä┘à╪┤╪º╪▒┘è╪╣ ╪º┘ä╪º╪¡╪¬╪▒╪º┘ü┘è╪⌐ (PMP)",
    "╪¬╪¡┘ä┘è┘ä╪º╪¬ ╪º┘ä╪ú╪»╪º╪í ┘ê┘à╪ñ╪┤╪▒╪º╪¬ KPIs",
    "╪º┘ä╪¬╪¡╪│┘è┘å ╪º┘ä┘à╪│╪¬┘à╪▒ ┘ä┘ä╪╣┘à┘ä┘è╪º╪¬"
  ];

  const currentSkills = language === "ar" ? arabicSkills : principalConsultant.skills;

  return (
    <div className="pt-24 sm:pt-32 pb-20 sm:pb-24 min-h-screen bg-transparent text-[#152238] dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Hero */}
        <ScrollReveal variant="fade-up" className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/45 backdrop-blur-md text-white border border-white/20 text-[10.5px] sm:text-[11px] font-bold uppercase tracking-wider sm:tracking-widest shadow-sm">
            {about.badge}
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight font-display drop-shadow-[0_2px_16px_rgba(0,0,0,0.7)]">
            {about.headline}
          </h1>
          <p className="text-xs sm:text-base md:text-lg text-slate-100 leading-relaxed max-w-2xl mx-auto font-medium drop-shadow-sm">
            {about.subheadline}
          </p>
        </ScrollReveal>

        {/* The Puzzle Philosophy Section */}
        <ScrollReveal variant="zoom-in" duration={0.7} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16 sm:mb-20 bg-black/45 backdrop-blur-md rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl border border-white/20 text-white">
          
          <div className="lg:col-span-6 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display drop-shadow-sm">
              {about.philosophyTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
              {about.philosophyP1}
            </p>
            <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
              {about.philosophyP2}
            </p>

            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-white font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#E25C43] shrink-0" />
                <span>{about.point1}</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-white font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#E25C43] shrink-0" />
                <span>{about.point2}</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-white font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#E25C43] shrink-0" />
                <span>{about.point3}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center items-center">
            <InteractiveHeroCube />
          </div>

        </ScrollReveal>

        {/* Principal Consultant & Practice Leadership */}
        <div className="mb-16 sm:mb-20">
          <ScrollReveal variant="fade-up" className="text-center max-w-2xl mx-auto space-y-2 mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 border border-white/15 text-[#E25C43] text-[11px] font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>{about.leadershipBadge}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display drop-shadow-[0_2px_14px_rgba(0,0,0,0.8)]">
              {about.principalTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-100 font-medium drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
              {about.principalSubtitle}
            </p>
          </ScrollReveal>

          {/* Qadeer Ahmad Bhatti Profile Card */}
          <ScrollReveal variant="fade-up" delay={0.15} className="bg-black/45 backdrop-blur-md rounded-3xl p-6 sm:p-10 lg:p-12 border border-white/20 shadow-xl max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-white">
            
            {/* Portrait Photo (4 cols) */}
            <div className="md:col-span-4 flex flex-col items-center text-center">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden shadow-md border-2 border-white/20 bg-slate-900">
                <Image
                  src={principalConsultant.image}
                  alt={principalConsultant.name}
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white mt-4 font-display">
                {about.consultantName}
              </h3>
              <p className="text-xs font-semibold text-[#E25C43] mt-0.5">
                {about.consultantRole}
              </p>
            </div>

            {/* Credentials & Skills (8 cols) */}
            <div className="md:col-span-8 space-y-4">
              <div>
                <h4 className="text-[11px] uppercase font-bold tracking-wider text-slate-300 mb-1.5 font-display">
                  {about.focusTitle}
                </h4>
                <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                  {about.consultantBio}
                </p>
              </div>

              {/* Skills Tags Grid */}
              <div>
                <h5 className="text-[10px] uppercase font-bold tracking-wider text-slate-300 mb-2">
                  {about.skillsTitle}
                </h5>
                <div className="flex flex-wrap gap-2">
                  {currentSkills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 border border-white/15 text-xs font-medium text-slate-100"
                    >
                      <Check className="w-3.5 h-3.5 text-[#E25C43] shrink-0" />
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#A33C29] hover:bg-[#8E3221] text-white text-xs font-bold transition-all shadow-md"
                >
                  <span>{about.scheduleButton}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </Link>
              </div>
            </div>

          </ScrollReveal>
        </div>

        {/* Mission & Vision Cards */}
        <StaggerContainer delayChildren={0.2} staggerChildren={0.15} className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16 sm:mb-20">
          <StaggerItem className="bg-black/45 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-xl border border-white/20 space-y-3 text-white">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 text-white flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold font-display text-white">{about.missionTitle}</h3>
            <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
              {about.missionDesc}
            </p>
          </StaggerItem>

          <StaggerItem className="bg-black/45 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-xl border border-white/20 space-y-3 text-white">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 text-white flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#E25C43]" />
            </div>
            <h3 className="text-xl font-bold font-display text-white">{about.visionTitle}</h3>
            <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
              {about.visionDesc}
            </p>
          </StaggerItem>
        </StaggerContainer>

        {/* Office Location */}
        <ScrollReveal variant="fade-up" className="bg-black/45 backdrop-blur-md rounded-2xl p-6 sm:p-10 border border-white/20 shadow-xl text-white">
          <div className="text-center max-w-xl mx-auto mb-6 space-y-1">
            <h3 className="text-xl sm:text-2xl font-bold text-white font-display">{about.headOfficeTitle}</h3>
            <p className="text-xs text-slate-200 font-normal">{about.headOfficeSubtitle}</p>
          </div>

          <div className="max-w-md mx-auto">
            {officeLocations.map((loc) => (
              <div key={loc.city} className="bg-white/10 p-5 rounded-xl border border-white/15 space-y-2 text-center shadow-md text-white">
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="w-4 h-4 text-[#E25C43] shrink-0" />
                  <span className="text-base font-bold text-white">
                    {language === "ar" ? "┘ä╪º┘ç┘ê╪▒╪î ╪¿╪º┘â╪│╪¬╪º┘å" : `${loc.city}, ${loc.country}`}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white/15 text-white border border-white/15">
                    {language === "ar" ? "╪º┘ä┘à┘é╪▒ ╪º┘ä╪▒╪ª┘è╪│┘è" : loc.tag}
                  </span>
                </div>
                <p className="text-xs text-slate-100 font-medium">
                  {language === "ar" ? "┘ä╪º┘ç┘ê╪▒╪î ╪º┘ä╪¿┘å╪¼╪º╪¿╪î ╪¿╪º┘â╪│╪¬╪º┘å" : loc.address}
                </p>
                <div className="text-xs font-bold text-white pt-1">
                  {language === "ar" ? "╪º┘ä┘à╪¿╪º╪┤╪▒:" : "Direct:"} {loc.phone}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
}