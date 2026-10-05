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
import { useSearchParams } from "next/navigation";
import { getServices, getServicePillars, ServiceCategory, ServiceItem } from "@/data/servicesData";
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
  Target: <Target className="w-5 h-5" />,
  Compass: <Compass className="w-5 h-5" />,
};

const pillarIcon: Record<string, React.ReactNode> = {
  consulting: <Briefcase className="w-5 h-5" />,
  training: <Compass className="w-5 h-5" />,
  digital: <Cpu className="w-5 h-5" />,
};

const pillarTone: Record<string, string> = {
  consulting: "bg-navy text-white",
  training: "bg-steel text-ink",
  digital: "bg-rust text-white",
};

function ServicesContent() {
  const { t, language, isRTL } = useLanguage();
  const sp = t.servicesPage;
  const isAr = language === "ar";
  const searchParams = useSearchParams();

  const pillars = getServicePillars(language);
  const currentAllServices = getServices(language);
  const initialTab = (searchParams?.get("line") as ServiceCategory | null) || "all";
  const [activeTab, setActiveTab] = useState<ServiceCategory | "all">(
    ["consulting", "training", "digital"].includes(initialTab) ? initialTab : "all"
  );
  const [searchQuery, setSearchQuery] = useState("");

  const q = searchQuery.trim().toLowerCase();
  const matches = (service: ServiceItem) =>
    !q ||
    service.title.toLowerCase().includes(q) ||
    service.shortDescription.toLowerCase().includes(q) ||
    service.deliverables.some((d) => d.toLowerCase().includes(q)) ||
    service.tags.some((tg) => tg.toLowerCase().includes(q));

  const visiblePillars = pillars.filter((p) => activeTab === "all" || p.id === activeTab);
  const totalVisible = visiblePillars.reduce(
    (n, p) => n + currentAllServices.filter((s) => s.category === p.id && matches(s)).length,
    0
  );

  const tabs: { id: ServiceCategory | "all"; label: string }[] = [
    { id: "all", label: isAr ? "جميع الخدمات" : "All Services" },
    ...pillars.map((p) => ({ id: p.id, label: p.title })),
  ];

  return (
    <div className="pt-24 sm:pt-32 pb-20 sm:pb-24 min-h-screen bg-transparent text-ink dark:text-white relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Page Header */}
        <ScrollReveal variant="fade-up" className="text-center max-w-3xl mx-auto space-y-4 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white dark:bg-white/5 text-navy dark:text-steel-light border border-navy/10 dark:border-white/10 text-[10.5px] sm:text-[11px] font-bold uppercase tracking-wider sm:tracking-widest shadow-xs">
            {sp.badge}
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink dark:text-white leading-tight font-display">
            {sp.headline}
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-100 leading-relaxed max-w-2xl mx-auto font-normal">
            {sp.subheadline}
          </p>
        </ScrollReveal>

        {/* Tabs + Search */}
        <ScrollReveal variant="fade-up" delay={0.1} className="bg-white dark:bg-night-800/80 rounded-2xl p-3 sm:p-4 shadow-card border border-slate-200/80 dark:border-white/10 mb-10 sm:mb-14 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 text-ink dark:text-white">
          <div className="flex flex-wrap gap-1.5" role="tablist">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-[13px] font-bold transition-all ${
                  activeTab === tab.id
                    ? "bg-navy text-white shadow-sm dark:bg-steel dark:text-ink"
                    : "text-slate-600 hover:text-navy hover:bg-navy-50 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-80">
            <Search className={`w-4 h-4 text-slate-400 dark:text-slate-300 absolute ${isRTL ? "right-3.5" : "left-3.5"} top-1/2 -translate-y-1/2 pointer-events-none`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={sp.searchPlaceholder}
              aria-label={sp.searchPlaceholder}
              className={`w-full ${isRTL ? "pr-9 pl-4" : "pl-9 pr-4"} py-2.5 rounded-xl bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/10 text-xs text-ink dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-300 focus:outline-none focus:border-focus transition-all`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className={`absolute ${isRTL ? "left-3" : "right-3"} top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 dark:text-slate-300 hover:text-slate-700 dark:hover:text-white`}
              >
                {isAr ? "مسح" : "Clear"}
              </button>
            )}
          </div>
        </ScrollReveal>

        {/* Service lines, each with its categories */}
        {totalVisible > 0 ? (
          <div className="space-y-16 sm:space-y-20 mb-20">
            {visiblePillars.map((pillar) => {
              const items = currentAllServices.filter((s) => s.category === pillar.id && matches(s));
              if (items.length === 0) return null;
              return (
                <section key={pillar.id} id={pillar.id} className="scroll-mt-28">
                  <ScrollReveal variant="fade-up" className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-7 sm:mb-9">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm shrink-0 ${pillarTone[pillar.id]}`}>
                        {pillarIcon[pillar.id]}
                      </div>
                      <div className="space-y-1">
                        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-ink dark:text-white font-display">
                          {pillar.title}
                        </h2>
                        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">{pillar.intro}</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400 shrink-0">
                      {items.length} {isAr ? "فئات" : items.length === 1 ? "Category" : "Categories"}
                    </span>
                  </ScrollReveal>

                  <StaggerContainer delayChildren={0.05} staggerChildren={0.06} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                    {items.map((service) => (
                      <StaggerItem
                        key={service.id}
                        variant="fade-up"
                        className="relative overflow-hidden bg-white dark:bg-night-800/80 rounded-2xl p-6 sm:p-7 shadow-card border border-slate-200/80 dark:border-white/10 flex flex-col justify-between hover:border-navy/25 dark:hover:border-steel/30 hover:shadow-lift hover:-translate-y-1 transition-all duration-300 group text-ink dark:text-white"
                      >
                        <span className="absolute top-0 inset-x-0 h-[3px] bg-brand-tri scale-x-0 origin-left rtl:origin-right group-hover:scale-x-100 transition-transform duration-500" aria-hidden="true" />
                        <div className="space-y-4">
                          <div className="flex items-center justify-between gap-3">
                            <div className={`w-11 h-11 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-sm ${pillarTone[pillar.id]}`}>
                              {iconMap[service.iconName] || <Briefcase className="w-5 h-5" />}
                            </div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.14em] text-end">
                              {service.deliverables.length} {isAr ? "مجالات" : "Focus Areas"}
                            </span>
                          </div>

                          <div className="space-y-1.5">
                            <Link href={`/services/${service.id}`}>
                              <h3 className="text-lg font-bold text-ink dark:text-white leading-snug font-display group-hover:text-navy dark:group-hover:text-steel-light transition-colors">
                                {service.title}
                              </h3>
                            </Link>
                            <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed">
                              {service.shortDescription}
                            </p>
                          </div>

                          <ul className="space-y-1.5 pt-1">
                            {service.deliverables.slice(0, 5).map((del, dIdx) => (
                              <li key={dIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-100 font-medium">
                                <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0 text-accent" />
                                <span>{del}</span>
                              </li>
                            ))}
                            {service.deliverables.length > 5 && (
                              <li className="text-xs font-semibold text-slate-500 dark:text-slate-400 ps-5">
                                {isAr ? `+ ${service.deliverables.length - 5} المزيد` : `+ ${service.deliverables.length - 5} more`}
                              </li>
                            )}
                          </ul>
                        </div>

                        <div className="pt-5 mt-5 border-t border-slate-100 dark:border-white/15 flex items-center justify-between">
                          <Link
                            href={`/services/${service.id}`}
                            className="text-xs font-bold text-navy dark:text-steel-light hover:text-accent transition-colors flex items-center gap-1"
                          >
                            <span>{sp.viewDetails}</span>
                          </Link>
                          <Link
                            href={`/contact?service=${encodeURIComponent(service.title)}`}
                            className="p-2 rounded-xl text-ink dark:text-white transition-all duration-200 bg-slate-100 hover:bg-rust hover:text-white dark:bg-white/15 dark:hover:bg-rust border border-slate-200 dark:border-white/10"
                            title={isAr ? "اطلب هذه الخدمة" : "Enquire about this service"}
                            aria-label={isAr ? "اطلب هذه الخدمة" : "Enquire about this service"}
                          >
                            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                          </Link>
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </section>
              );
            })}
          </div>
        ) : (
          <ScrollReveal variant="fade" className="text-center py-16 bg-white dark:bg-night-800/80 rounded-2xl border border-slate-200/80 dark:border-white/10 p-8 shadow-card text-ink dark:text-white mb-20">
            <HelpCircle className="w-10 h-10 text-slate-400 dark:text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-ink dark:text-white font-display">{sp.noResultsTitle}</h3>
            <p className="text-xs text-slate-600 dark:text-slate-200 max-w-sm mx-auto mt-1 font-medium">{sp.noResultsDesc}</p>
            <button
              onClick={() => { setSearchQuery(""); setActiveTab("all"); }}
              className="mt-4 px-5 py-2 rounded-xl bg-rust hover:bg-rust-dark text-white text-xs font-bold shadow-cta transition-colors"
            >
              {sp.resetFilters}
            </button>
          </ScrollReveal>
        )}

        {/* From Knowledge to Results */}
        <ScrollReveal variant="fade-up" className="mb-16 rounded-3xl bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 dark:from-night-800 dark:via-night-850 dark:to-night-950 text-white p-7 sm:p-12 border border-navy-700 dark:border-white/10 shadow-lift relative overflow-hidden">
          <div className="absolute top-0 left-0 h-1 w-full bg-brand-tri" aria-hidden="true" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display">{isAr ? "من المعرفة إلى النتائج" : "From Knowledge to Results"}</h2>
              <p className="text-sm text-slate-200/90 leading-relaxed">
                {isAr
                  ? "تحدد الاستشارات ما يجب تغييره. ويبني التدريب القدرة على تغييره. ويساعد التطبيق الرقمي على جعل التحسين جزءاً من العمل اليومي."
                  : "Consulting identifies what needs to change. Training builds the capability to change it. Digital implementation helps make the improvement part of everyday work."}
              </p>
              <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-bold text-steel-light hover:text-white transition-colors">
                <span>{isAr ? "تصفح المدونة" : "Explore our Blog"}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {pillars.map((p, i) => (
                <a key={p.id} href={`#${p.id}`} onClick={() => setActiveTab("all")} className="rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 p-5 transition-colors">
                  <div className="text-[11px] font-bold tracking-[0.14em] text-steel-light">0{i + 1}</div>
                  <div className="mt-1 font-bold font-display">{p.title}</div>
                  <div className="mt-1 text-xs text-slate-300 leading-relaxed">{p.tagline}</div>
                </a>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Interactive Matcher Quiz */}
        <ScrollReveal variant="fade-up" delay={0.1} className="mb-10">
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
