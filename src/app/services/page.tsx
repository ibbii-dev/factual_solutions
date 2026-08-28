"use client";

import React, { useState, Suspense, useEffect } from "react";
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
  HelpCircle
} from "lucide-react";
import { getServices, getBusinessServices, getConsultancyServices, ServiceItem } from "@/data/servicesData";
import ServiceDetailModal from "@/components/services/ServiceDetailModal";
import ServiceMatcherQuiz from "@/components/services/ServiceMatcherQuiz";
import { useLanguage } from "@/context/LanguageContext";

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
  GitMerge: <GitMerge className="w-5 h-5" />
};

function ServicesContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");
  const initialServiceId = searchParams.get("id");
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
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  useEffect(() => {
    if (initialServiceId) {
      const match = currentAllServices.find((s) => s.id === initialServiceId);
      if (match) setSelectedService(match);
    }
  }, [initialServiceId, language]);

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
    <div className="pt-28 sm:pt-32 pb-20 sm:pb-24 min-h-screen bg-[#EBF1FA] dark:bg-[#0B1320] text-[#152238] dark:text-white relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8EA9D3]/20 text-[#152238] dark:text-brand-steel-light text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            {sp.badge}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#152238] dark:text-white leading-tight break-words font-display">
            {sp.headline}
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
            {sp.subheadline}
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white dark:bg-[#111C2E] rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 shadow-sm border border-[#8EA9D3]/30 dark:border-slate-800 mb-10 sm:mb-12 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
          
          {/* Category Toggle Tabs */}
          <div className="grid grid-cols-3 sm:flex p-1 bg-[#DFE8F6] dark:bg-[#15233A] rounded-xl sm:rounded-full w-full md:w-auto gap-1 border border-[#8EA9D3]/30 dark:border-slate-700">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-full text-[11px] sm:text-xs font-bold transition-all text-center truncate ${
                activeCategory === "all"
                  ? "bg-[#152238] text-white shadow-sm"
                  : "text-[#152238] dark:text-slate-300 hover:text-brand-rust"
              }`}
            >
              {sp.allTab} ({currentAllServices.length})
            </button>
            <button
              onClick={() => setActiveCategory("business")}
              className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-full text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 sm:gap-1.5 truncate ${
                activeCategory === "business"
                  ? "bg-[#152238] text-white shadow-sm"
                  : "text-[#152238] dark:text-slate-300 hover:text-brand-rust"
              }`}
            >
              <Briefcase className="w-3.5 h-3.5 shrink-0 hidden sm:inline" />
              <span className="truncate">{sp.businessTab} ({currentBusinessServices.length})</span>
            </button>
            <button
              onClick={() => setActiveCategory("consultancy")}
              className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-full text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 sm:gap-1.5 truncate ${
                activeCategory === "consultancy"
                  ? "bg-brand-rust text-white shadow-sm"
                  : "text-[#152238] dark:text-slate-300 hover:text-brand-rust"
              }`}
            >
              <Compass className="w-3.5 h-3.5 shrink-0 hidden sm:inline" />
              <span className="truncate">{sp.consultingTab} ({currentConsultancyServices.length})</span>
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className={`w-4 h-4 text-slate-500 absolute ${isRTL ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2 pointer-events-none`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={sp.searchPlaceholder}
              className={`w-full ${isRTL ? 'pr-9 pl-4' : 'pl-9 pr-4'} py-2.5 rounded-xl sm:rounded-full bg-[#F2F7FD] dark:bg-slate-800/90 border border-[#8EA9D3]/40 dark:border-slate-700 text-xs text-[#152238] dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#152238] dark:focus:border-brand-steel transition-all`}
            />
          </div>

        </div>

        {/* Services Cards Grid */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20">
            {filteredServices.map((service) => {
              const isBusiness = service.category === "business";
              return (
                <div
                  key={service.id}
                  className="bg-white dark:bg-[#111C2E] hover:bg-[#F2F7FD] dark:hover:bg-[#15233A] rounded-3xl p-6 sm:p-8 shadow-sm border border-[#8EA9D3]/30 dark:border-slate-800 flex flex-col justify-between transition-all duration-200"
                >
                  <div className="space-y-4">
                    
                    {/* Card Top: Icon & Badge */}
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                          isBusiness
                            ? "bg-[#8EA9D3]/20 text-[#152238] dark:text-brand-steel-light"
                            : "bg-brand-rust/15 text-brand-rust dark:text-brand-rust-light"
                        }`}
                      >
                        {iconMap[service.iconName] || <Briefcase className="w-5 h-5" />}
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${
                          isBusiness
                            ? "bg-[#8EA9D3]/20 text-[#152238] dark:text-brand-steel-light"
                            : "bg-brand-rust/20 text-brand-rust dark:text-brand-rust-light"
                        }`}
                      >
                        {isBusiness ? (language === "ar" ? "حلول أعمال" : "Business") : (language === "ar" ? "استشارات" : "Consultancy")}
                      </span>
                    </div>

                    {/* Title & Short Description */}
                    <div>
                      <h3 className="text-xl font-bold text-[#152238] dark:text-white leading-snug font-display">
                        {service.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed font-normal">
                        {service.shortDescription}
                      </p>
                    </div>

                    {/* Benchmark KPI */}
                    <div className="p-3 rounded-2xl bg-[#F2F7FD] dark:bg-[#0E1728] border border-[#8EA9D3]/20 dark:border-slate-800">
                      <div className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">
                        {sp.deliverableLabel}
                      </div>
                      <div className="text-xs font-bold text-[#152238] dark:text-brand-steel-light mt-0.5">
                        {service.metrics}
                      </div>
                    </div>

                    {/* Deliverables Preview */}
                    <div className="space-y-1.5 pt-1">
                      {service.deliverables.slice(0, 2).map((del, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 font-normal">
                          <CheckCircle2 className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${isBusiness ? "text-[#152238] dark:text-brand-steel" : "text-brand-rust"}`} />
                          <span className="line-clamp-1">{del}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="pt-6 mt-6 border-t border-[#8EA9D3]/20 dark:border-slate-800 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedService(service)}
                      className="text-xs font-bold text-[#152238] dark:text-brand-steel-light hover:text-brand-rust transition-colors"
                    >
                      {sp.viewDetails}
                    </button>

                    <Link
                      href={`/contact?service=${encodeURIComponent(service.title)}`}
                      className={`p-2 rounded-xl text-white transition-all duration-200 ${
                        isBusiness
                          ? "bg-[#152238] hover:bg-brand-rust"
                          : "bg-brand-rust hover:bg-brand-rust-light"
                      }`}
                      title="Book this Service"
                    >
                      <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                    </Link>
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-[#111C2E] rounded-3xl border border-[#8EA9D3]/30 dark:border-slate-800 p-8 shadow-sm">
            <HelpCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-[#152238] dark:text-white font-display">{sp.noResultsTitle}</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto mt-1 font-normal">
              {sp.noResultsDesc}
            </p>
            <button
              onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
              className="mt-4 px-5 py-2 rounded-full bg-[#152238] text-white text-xs font-bold"
            >
              {sp.resetFilters}
            </button>
          </div>
        )}

        {/* Interactive Matcher Quiz */}
        <div className="mb-20">
          <ServiceMatcherQuiz />
        </div>

      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <ServiceDetailModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
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
