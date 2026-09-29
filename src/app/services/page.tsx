"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { 
  Briefcase, 
  Compass, 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  BarChart3, 
  Sparkles, 
  ShieldCheck, 
  BrainCircuit, 
  Scale, 
  Users, 
  GitMerge, 
  Cpu, 
  TrendingUp, 
  HelpCircle,
  Target,
  FileText
} from "lucide-react";
import { getServices } from "@/data/servicesData";
import ServiceMatcherQuiz from "@/components/services/ServiceMatcherQuiz";
import ExecutiveBlueprintModal from "@/components/services/ExecutiveBlueprintModal";
import { useLanguage } from "@/context/LanguageContext";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";

const iconMap: Record<string, React.ReactNode> = {
  Cpu: <Cpu className="w-5 h-5" />,
  TrendingUp: <TrendingUp className="w-5 h-5" />,
  Layers: <Layers className="w-5 h-5" />,
  BarChart3: <BarChart3 className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5" />,
  BrainCircuit: <BrainCircuit className="w-5 h-5" />,
  Scale: <Scale className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />,
  GitMerge: <GitMerge className="w-5 h-5" />,
  Target: <Target className="w-5 h-5" />
};

function ServicesContent() {
  const { t, language, isRTL } = useLanguage();
  const sp = t.servicesPage;

  const currentAllServices = getServices(language);
  const [searchQuery, setSearchQuery] = useState("");
  const [isBlueprintModalOpen, setIsBlueprintModalOpen] = useState(false);

  const filteredServices = currentAllServices.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      service.metrics.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="pt-24 sm:pt-32 pb-20 sm:pb-24 min-h-screen bg-transparent text-[#152238] dark:text-white relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Page Header */}
        <ScrollReveal variant="fade-up" className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-transparent text-[#A33C29] dark:text-white border border-slate-200/90 dark:border-white/20 text-[10.5px] sm:text-[11px] font-bold uppercase tracking-wider sm:tracking-widest shadow-sm">
            {sp.badge}
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-display drop-shadow-[0_2px_16px_rgba(0,0,0,0.7)]">
            {sp.headline}
          </h1>
          <p className="text-xs sm:text-base lg:text-lg text-slate-100 leading-relaxed max-w-2xl mx-auto font-normal drop-shadow-sm">
            {sp.subheadline}
          </p>

          <div className="pt-2">
            <button
              onClick={() => setIsBlueprintModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#A33C29] hover:bg-[#8E3221] text-white text-xs font-bold transition-all shadow-md hover:scale-[1.02]"
            >
              <FileText className="w-4 h-4" />
              <span>Download 1-Page Feasibility Blueprint (PDF)</span>
            </button>
          </div>
        </ScrollReveal>

        {/* Search Bar & Counter */}
        <ScrollReveal variant="fade-up" delay={0.1} className="bg-white dark:bg-transparent backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/90 dark:border-white/15 mb-10 sm:mb-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs font-bold text-[#152238] dark:text-slate-200">
            {language === "ar" 
              ? `عرض ${filteredServices.length} ممارسة استشارية متخصصة` 
              : `Showing ${filteredServices.length} Specialized Practice Capabilities`}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-96">
            <Search className={`w-4 h-4 text-slate-400 absolute ${isRTL ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2 pointer-events-none`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={sp.searchPlaceholder}
              className={`w-full ${isRTL ? 'pr-9 pl-4' : 'pl-9 pr-4'} py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700 text-xs text-[#152238] dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#A33C29] transition-all`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-[#A33C29]`}
              >
                Clear
              </button>
            )}
          </div>
        </ScrollReveal>

        {/* Services Cards Grid */}
        {filteredServices.length > 0 ? (
          <StaggerContainer delayChildren={0.1} staggerChildren={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mb-20">
            {filteredServices.map((service, index) => {
              return (
                <StaggerItem
                  key={service.id}
                  variant="fade-up"
                  className="bg-white dark:bg-transparent backdrop-blur-md rounded-2xl p-6 sm:p-7 shadow-sm border border-slate-200/90 dark:border-white/15 flex flex-col justify-between hover:border-[#A33C29]/40 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="space-y-4">
                    
                    {/* Card Top: Icon & Indicator */}
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-[#152238] dark:bg-[#1E2D4A] text-white group-hover:scale-105 transition-transform duration-300 shadow-xs">
                        {iconMap[service.iconName] || <Briefcase className="w-5 h-5" />}
                      </div>

                      <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                        Practice {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Title & Short Description */}
                    <div className="space-y-1.5">
                      <Link href={`/services/${service.id}`} className="hover:text-[#A33C29] transition-colors">
                        <h3 className="text-base sm:text-lg font-bold text-[#152238] dark:text-white leading-snug font-display">
                          {service.title}
                        </h3>
                      </Link>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                        {service.shortDescription}
                      </p>
                    </div>

                    {/* Benchmark KPI */}
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0E1524] border border-slate-100 dark:border-slate-700/60">
                      <div className="text-[10px] uppercase font-bold text-slate-400">
                        {sp.deliverableLabel}
                      </div>
                      <div className="text-xs font-bold text-[#152238] dark:text-brand-steel-light mt-0.5">
                        {service.metrics}
                      </div>
                    </div>

                    {/* Deliverables Preview */}
                    <div className="space-y-1.5 pt-1">
                      {service.deliverables.slice(0, 2).map((del, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400 font-normal">
                          <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#A33C29]" />
                          <span className="line-clamp-1">{del}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="pt-5 mt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <Link
                      href={`/services/${service.id}`}
                      className="text-xs font-bold text-[#152238] dark:text-slate-200 hover:text-[#A33C29] transition-colors flex items-center gap-1"
                    >
                      <span>{sp.viewDetails}</span>
                      <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                    </Link>

                    <Link
                      href={`/contact?service=${encodeURIComponent(service.title)}`}
                      className="p-2 rounded-xl text-white transition-all duration-200 shadow-xs bg-[#152238] hover:bg-[#A33C29]"
                      title={language === "ar" ? "طلب استشارة لهذه الخدمة" : "Book this Service"}
                    >
                      <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                    </Link>
                  </div>

                </StaggerItem>
              );
            })}
          </StaggerContainer>
        ) : (
          <ScrollReveal variant="fade" className="text-center py-16 bg-white dark:bg-transparent backdrop-blur-md rounded-2xl border border-slate-200/90 dark:border-white/15 p-8 shadow-sm">
            <HelpCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#152238] dark:text-white font-display">{sp.noResultsTitle}</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm mx-auto mt-1 font-normal">
              {sp.noResultsDesc}
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 px-5 py-2 rounded-full bg-[#152238] text-white text-xs font-bold shadow-xs hover:bg-[#A33C29] transition-colors"
            >
              {sp.resetFilters}
            </button>
          </ScrollReveal>
        )}

        {/* Interactive Matcher Quiz */}
        <ScrollReveal variant="fade-up" delay={0.15} className="mb-20">
          <ServiceMatcherQuiz />
        </ScrollReveal>

      </div>

      <ExecutiveBlueprintModal
        isOpen={isBlueprintModalOpen}
        onClose={() => setIsBlueprintModalOpen(false)}
      />
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center text-slate-500">Loading services directory...</div>}>
      <ServicesContent />
    </Suspense>
  );
}
