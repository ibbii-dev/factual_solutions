"use client";

import React from "react";
import { Shield, Target, Users } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ClientTestimonials() {
  const { t, language } = useLanguage();

  const industries = language === "ar" ? [
    { name: "التجزئة والمستهلك", type: "تجارة" },
    { name: "الصناعة والإنتاج", type: "صناعي" },
    { name: "الجملة والخدمات اللوجستية", type: "تجارة وتوزيع" },
    { name: "الخدمات التجارية للشركات", type: "مؤسسي" },
    { name: "العقارات والمقاولات", type: "تطوير عقاري" },
    { name: "التقنية والتحول الرقمي", type: "خدمات وحلول" }
  ] : [
    { name: "Retail & Consumer", type: "Commerce" },
    { name: "Manufacturing", type: "Industrial" },
    { name: "Wholesale & Logistics", type: "Trade" },
    { name: "Commercial Services", type: "Corporate" },
    { name: "Real Estate & Contracting", type: "Property" },
    { name: "Technology & Software", type: "Services" }
  ];

  return (
    <section className="py-16 bg-[#DFE8F6] dark:bg-[#0E1728] text-[#152238] dark:text-white border-y border-[#8EA9D3]/30 dark:border-slate-800 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trusted By Title */}
        <div className="text-center mb-8">
          <p className="text-xs uppercase font-bold tracking-widest text-[#152238]/70 dark:text-slate-400">
            {t.trust.title}
          </p>
        </div>

        {/* Industry Focus Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 items-center justify-center">
          {industries.map((ind, idx) => (
            <div
              key={idx}
              className="h-16 rounded-xl bg-white dark:bg-[#111C2E] hover:bg-[#F2F7FD] dark:hover:bg-[#16253B] border border-[#8EA9D3]/30 dark:border-slate-800 hover:border-brand-steel shadow-sm transition-all duration-300 flex flex-col items-center justify-center p-2 text-center group"
            >
              <span className="text-xs font-bold text-[#152238] dark:text-slate-200 group-hover:text-brand-rust transition-colors truncate max-w-full px-1">
                {ind.name}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-slate-500 dark:text-slate-500 font-medium">
                {ind.type}
              </span>
            </div>
          ))}
        </div>

        {/* Practical Consulting Values */}
        <div className="mt-12 pt-10 border-t border-[#8EA9D3]/30 dark:border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-full bg-[#8EA9D3]/20 text-[#152238] dark:text-brand-steel-light flex items-center justify-center mx-auto mb-3">
              <Shield className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-[#152238] dark:text-white font-display">{t.trust.confidentialityTitle}</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xs mx-auto font-normal">
              {t.trust.confidentialityDesc}
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-full bg-brand-rust/15 text-brand-rust flex items-center justify-center mx-auto mb-3">
              <Target className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-[#152238] dark:text-white font-display">{t.trust.actionPlansTitle}</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xs mx-auto font-normal">
              {t.trust.actionPlansDesc}
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-[#152238] dark:text-white font-display">{t.trust.partnerAdvisoryTitle}</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xs mx-auto font-normal">
              {t.trust.partnerAdvisoryDesc}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
