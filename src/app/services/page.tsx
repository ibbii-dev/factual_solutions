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
                        {pillar.id === "digital" && (
                          <p className="text-sm sm:text-base font-bold text-navy dark:text-steel-light max-w-2xl">{pillar.tagline}</p>
                        )}
                        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">{pillar.intro}</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400 shrink-0">
                      {items.length} {isAr ? "فئات" : items.length === 1 ? "Category" : "Categories"}
                    </span>
                  </ScrollReveal>

                  <StaggerContainer delayChildren={0.05} staggerChildren={0.06} className="flex flex-col gap-4 sm:gap-5">
                    {items.map((service, sIdx) => (
                      <StaggerItem
                        key={service.id}
                        variant="fade-up"
                        className="relative overflow-hidden bg-white dark:bg-night-800/80 rounded-2xl p-6 sm:p-8 shadow-card border border-slate-200/80 dark:border-white/10 hover:border-navy/25 dark:hover:border-steel/30 hover:shadow-lift transition-all duration-300 group text-ink dark:text-white"
                      >
                        <span className="absolute inset-y-0 start-0 w-[4px] bg-gradient-to-b from-navy via-steel to-rust scale-y-0 origin-top group-hover:scale-y-100 transition-transform duration-500" aria-hidden="true" />
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
                          {/* Category */}
                          <div className="md:col-span-5 flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-sm shrink-0 ${pillarTone[pillar.id]}`}>
                                {iconMap[service.iconName] || <Briefcase className="w-5 h-5" />}
                              </div>
                              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.14em]">
                                {String(sIdx + 1).padStart(2, "0")} · {service.deliverables.length} {isAr ? "مجالات" : "Focus Areas"}
                              </span>
                            </div>
                            <div className="space-y-2">
                              <Link href={`/services/${service.id}`}>
                                <h3 className="text-xl sm:text-2xl font-bold text-ink dark:text-white leading-snug font-display group-hover:text-navy dark:group-hover:text-steel-light transition-colors">
                                  {service.title}
                                </h3>
                              </Link>
                              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{service.shortDescription}</p>
                            </div>
                            <div className="flex items-center gap-3 mt-auto pt-1">
                              <Link
                                href={`/services/${service.id}`}
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-navy-50 dark:bg-white/10 text-navy dark:text-steel-light text-xs font-bold hover:bg-navy hover:text-white dark:hover:bg-steel dark:hover:text-ink transition-colors"
                              >
                                <span>{sp.viewDetails}</span>
                              </Link>
                              <Link
                                href={`/contact?service=${encodeURIComponent(service.title)}`}
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-ink dark:text-white border border-slate-200 dark:border-white/15 hover:bg-rust hover:text-white hover:border-rust transition-colors"
                              >
                                <span>{isAr ? "اطلب هذه الخدمة" : "Enquire"}</span>
                                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                              </Link>
                            </div>
                          </div>

                          {/* Everything this category covers, listed vertically */}
                          <ul className="md:col-span-7 flex flex-col divide-y divide-slate-100 dark:divide-white/10 md:border-s md:border-slate-100 md:dark:border-white/10 md:ps-8">
                            {service.deliverables.map((del, dIdx) => (
                              <li key={dIdx} className="flex items-start gap-3 py-2.5 first:pt-0 last:pb-0 text-sm text-slate-700 dark:text-slate-100 font-medium">
                                <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-accent" />
                                <span>{del}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>

                  {pillar.id === "digital" && (
                    <ScrollReveal variant="fade-up" className="mt-6 rounded-2xl p-6 sm:p-8 bg-rust/[0.06] dark:bg-white/5 border border-rust/15 dark:border-white/10">
                      <h3 className="text-lg sm:text-xl font-bold font-display text-ink dark:text-white">
                        {isAr ? "تحول رقمي مبني حول أعمالكم" : "Digital Transformation, Built Around the Business"}
                      </h3>
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
                        {isAr
                          ? "لا نقوم برقمنة العمليات غير الفعالة؛ بل نحسّنها أولاً ثم نبني التقنية حولها. يربط نهجنا بين تحسين العمليات وأنظمة ERP وأتمتة سير العمل والبيانات والأفراد لتحقق الأنظمة الرقمية قيمة تشغيلية قابلة للقياس."
                          : "We don't digitize inefficient processes, we improve them first, then build the technology around them. Our approach connects process improvement, ERP, workflow automation, data, and people so that digital systems deliver measurable operational value."}
                      </p>
                      <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                        <Link href="/blog" className="font-bold text-accent hover:underline">{isAr ? "تصفح مدونتنا ←" : "Explore our Blog →"}</Link>{" "}
                        {isAr
                          ? "للاطلاع على رؤى عملية حول ERP وERPNext وأتمتة سير العمل والتحول الرقمي وتحسين العمليات والتميز التشغيلي المدعوم بالتقنية."
                          : "for practical insights on ERP, ERPNext, workflow automation, digital transformation, process improvement, and technology-enabled operational excellence."}
                      </p>
                    </ScrollReveal>
                  )}
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
              <p className="text-sm text-slate-300 leading-relaxed">
                <Link href="/blog" className="font-bold text-steel-light hover:text-white transition-colors">{isAr ? "تصفح مدونتنا ←" : "Explore our Blog →"}</Link>{" "}
                {isAr
                  ? "للاطلاع على رؤى وأدوات ووجهات نظر واقعية حول التميز التشغيلي والاستراتيجية والجودة والتحسين المستدام."
                  : "for practical insights, tools, and real-world perspectives on operational excellence, strategy, quality, and sustainable improvement."}
              </p>
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
