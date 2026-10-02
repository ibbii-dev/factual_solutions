"use client";

import React from "react";
import { Lock, FileSpreadsheet, Users2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";

export default function ClientTestimonials() {
  const { t } = useLanguage();

  const pillars = [
    {
      icon: <Lock className="w-5 h-5 text-white" />,
      iconBg: "bg-ink",
      title: "Strict Confidentiality",
      description: "All business details, financial models, and strategic plans remain protected under formal non-disclosure agreements."
    },
    {
      icon: <FileSpreadsheet className="w-5 h-5 text-white" />,
      iconBg: "bg-rust",
      title: "Principal Action Plans",
      description: "Direct engagement leaders in your industry; actionable execution roadmap with systematic milestones."
    },
    {
      icon: <Users2 className="w-5 h-5 text-white" />,
      iconBg: "bg-navy-500",
      title: "Partner-Level Multiplying",
      description: "Direct access to senior technical principals with continuous communication and executive briefing."
    }
  ];

  return (
    <section className="py-12 bg-transparent border-y border-slate-200/70 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerContainer delayChildren={0.1} staggerChildren={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => (
            <StaggerItem
              key={idx}
              className="flex items-start gap-4 p-5 sm:p-6 rounded-2xl bg-white dark:bg-night-800/80 border border-slate-200/80 dark:border-white/10 shadow-card hover:shadow-lift transition-all duration-200 text-ink dark:text-white"
            >
              <div className={`w-11 h-11 rounded-xl ${pillar.iconBg} flex items-center justify-center shrink-0 shadow-xs border border-white/15`}>
                {pillar.icon}
              </div>
              <div className="space-y-1.5">
                <h3 className="text-sm sm:text-base font-bold text-ink dark:text-white font-display">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-200 leading-relaxed font-medium">
                  {pillar.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
