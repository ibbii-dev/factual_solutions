"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
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
  Target
} from "lucide-react";
import { getServices, getBusinessServices, getConsultancyServices } from "@/data/servicesData";
import ServiceMatcherQuiz from "@/components/services/ServiceMatcherQuiz";
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
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");
  const { t, language, isRTL } = useLanguage();
  const sp = t.servicesPage;

  const currentAllServices = getServices(language);
  const currentBusinessServices = getBusinessServices(language);
  const currentConsultancyServices = getConsultancyServices(language);

  const [activeCategory, setActiveCategory] = useState<"all" | "business" | "consultancy">(
    initialCategory === "business" || initialCategory === "consultancy"
      ? initialCategory
      : "all"
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = currentAllServices.filter((service) => {
    const matchesCategory =
      activeCategory === "all" || service.category === activeCategory;
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-32 sm:pt-36 pb-20 sm:pb-24 min-h-screen bg-[#FAFBFD] dark:bg-[#0B1320] text-[#152238] dark:text-white relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Page Header */}
        <ScrollReveal variant="fade-up" className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#A33C29]/10 text-[#A33C29] text-[11px] font-bold uppercase tracking-widest">
            {sp.badge}
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#152238] dark:text-white leading-tight font-display">
            {sp.headline}
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
            {sp.subheadline}
          </p>
        </ScrollReveal>

        {/* Filter and Search Bar */}
        <ScrollReveal variant="fade-up" delay={0.1} className="bg-white dark:bg-[#111C2E] rounded-2xl p-3.5 sm:p-5 shadow-xs border border-slate-200/90 dark:border-slate-800 mb-10 sm:mb-12 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
          
          {/* Category Toggle Tabs */}
          <div className="grid grid-cols-3 sm:flex p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl sm:rounded-full w-full md:w-auto gap-1 border border-slate-200/80 dark:border-slate-700">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-3 sm:px-5 py-2 rounded-lg sm:rounded-full text-[11px] sm:text-xs font-bold transition-all text-center truncate ${
                activeCategory === "all"
                  ? "bg-[#152238] text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-300 hover:text-[#A33C29]"
              }`}
            >
              {sp.allTab} ({currentAllServices.length})
            </button>
            <button
              onClick={() => setActiveCategory("business")}
              className={`px-3 sm:px-5 py-2 rounded-lg sm:rounded-full text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 sm:gap-1.5 truncate ${
                activeCategory === "business"
                  ? "bg-[#152238] text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-300 hover:text-[#A33C29]"
              }`}
            >
              <Briefcase className="w-3.5 h-3.5 shrink-0 hidden sm:inline" />
              <span className="truncate">{sp.businessTab} ({currentBusinessServices.length})</span>
            </button>
            <button
              onClick={() => setActiveCategory("consultancy")}
              className={`px-3 sm:px-5 py-2 rounded-lg sm:rounded-full text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 sm:gap-1.5 truncate ${
                activeCategory === "consultancy"
                  ? "bg-[#A33C29] text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-300 hover:text-[#A33C29]"
              }`}
            >
              <Compass className="w-3.5 h-3.5 shrink-0 hidden sm:inline" />
              <span className="truncate">{sp.consultingTab} ({currentConsultancyServices.length})</span>
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className={`w-4 h-4 text-slate-400 absolute ${isRTL ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2 pointer-events-none`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={sp.searchPlaceholder}
              className={`w-full ${isRTL ? 'pr-9 pl-4' : 'pl-9 pr-4'} py-2.5 rounded-xl sm:rounded-full bg-[#FAFBFD] dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-[#152238] dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#152238] dark:focus:border-brand-steel transition-all`}
            />
          </div>

        </ScrollReveal>

        {/* Services Cards Grid */}
        {filteredServices.length > 0 ? (
          <StaggerContainer delayChildren={0.1} staggerChildren={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mb-20">
            {filteredServices.map((service) => {
              const isBusiness = service.category === "business";
              return (
                <StaggerItem
                  key={service.id}
                  variant="fade-up"
                  className="bg-white dark:bg-[#111C2E] rounded-2xl p-6 sm:p-7 shadow-xs border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="space-y-4">
                    
                    {/* Card Top: Icon & Badge */}
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 ${
                          isBusiness
                            ? "bg-[#152238] text-white"
                            : "bg-[#A33C29] text-white"
                        }`}
                      >
                        {iconMap[service.iconName] || <Briefcase className="w-5 h-5" />}
                      </div>

                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider ${
                          isBusiness
                            ? "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                            : "bg-[#A33C29]/10 text-[#A33C29]"
                        }`}
                      >
                        {isBusiness ? (language === "ar" ? "حلول أعمال" : "Business") : (language === "ar" ? "استشارات" : "Consultancy")}
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
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0E1728] border border-slate-100 dark:border-slate-800">
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
                          <CheckCircle2 className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${isBusiness ? "text-[#152238] dark:text-brand-steel" : "text-[#A33C29]"}`} />
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
                      className={`p-2 rounded-xl text-white transition-all duration-200 shadow-xs ${
                        isBusiness
                          ? "bg-[#152238] hover:bg-[#1E3150]"
                          : "bg-[#A33C29] hover:bg-[#8E3221]"
                      }`}
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
          <ScrollReveal variant="fade" className="text-center py-16 bg-white dark:bg-[#111C2E] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-8 shadow-xs">
            <HelpCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#152238] dark:text-white font-display">{sp.noResultsTitle}</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm mx-auto mt-1 font-normal">
              {sp.noResultsDesc}
            </p>
            <button
              onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
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
