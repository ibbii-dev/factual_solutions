"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { Search, ArrowRight, Compass, GraduationCap, MonitorCog } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { getServices, getServicePillars, ServiceCategory, ServiceItem } from "@/data/servicesData";
import ServiceMatcherQuiz from "@/components/services/ServiceMatcherQuiz";
import { useLanguage } from "@/context/LanguageContext";
import PageHeader from "@/components/ui/PageHeader";

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

  const PIECE: Record<string, { color: string; tile: string; Icon: typeof Compass }> = {
    consulting: { color: "#25346B", tile: "bg-navy", Icon: Compass },
    training: { color: "#9BB3D9", tile: "bg-steel text-navy", Icon: GraduationCap },
    digital: { color: "#9B391E", tile: "bg-rust", Icon: MonitorCog },
  };
  const tabs: { id: ServiceCategory | "all"; label: string }[] = [
    { id: "all", label: isAr ? "جميع الخدمات" : "All Services" },
    ...pillars.map((p) => ({ id: p.id, label: p.title })),
  ];
  const check = (
    <span className="fs-check mt-0.5"><svg viewBox="0 0 12 12" className="w-2.5 h-2.5" aria-hidden="true"><path d="M2.5 6.2 5 8.5 9.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
  );

  return (
    <div className="pb-20 sm:pb-24 min-h-screen text-ink dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader eyebrow={sp.badge} title={sp.headline} lede={sp.subheadline} />

        {/* Filter bar */}
        <div className="fs-card p-3 sm:p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-12">
          <div className="flex flex-wrap gap-2" role="tablist">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 min-h-[40px] px-4 rounded-xl text-[14px] font-semibold transition-colors ${
                  activeTab === tab.id
                    ? "bg-navy text-white shadow-card dark:bg-steel dark:text-ink"
                    : "text-slate-600 hover:bg-paper-deep hover:text-navy dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
                }`}
              >
                {tab.id !== "all" && <i className="w-2 h-2 rounded-full shrink-0" style={{ background: PIECE[tab.id].color }} aria-hidden="true" />}
                {tab.label}
              </button>
            ))}
          </div>
          <div className="relative w-full lg:w-80">
            <Search className={`w-4 h-4 text-slate-400 absolute ${isRTL ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 pointer-events-none`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={sp.searchPlaceholder}
              aria-label={sp.searchPlaceholder}
              className={`fs-input !py-2.5 ${isRTL ? "!pr-10 !pl-14" : "!pl-10 !pr-14"}`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className={`absolute ${isRTL ? "left-3" : "right-3"} top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500 hover:text-ink dark:hover:text-white`}
              >
                {isAr ? "مسح" : "Clear"}
              </button>
            )}
          </div>
        </div>

        {/* Service lines, each with its categories as cards */}
        {totalVisible > 0 ? (
          <div className="space-y-16 sm:space-y-20 mb-20">
            {visiblePillars.map((pillar) => {
              const items = currentAllServices.filter((s) => s.category === pillar.id && matches(s));
              if (items.length === 0) return null;
              const pIdx = pillars.findIndex((p) => p.id === pillar.id);
              const piece = PIECE[pillar.id];
              const PIcon = piece.Icon;
              return (
                <section key={pillar.id} id={pillar.id} className="scroll-mt-28">
                  <div data-reveal className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 items-end mb-8">
                    <div className="lg:col-span-7 flex items-start gap-4">
                      <span className={`fs-icon !w-14 !h-14 !rounded-2xl ${piece.tile}`}><PIcon className="w-6 h-6" aria-hidden="true" /></span>
                      <div className="space-y-1.5">
                        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-rust dark:text-rust-light">{isAr ? "خط الخدمة" : "Service line"} {String(pIdx + 1).padStart(2, "0")}</p>
                        <h2 className="text-3xl sm:text-[2.2rem] font-extrabold tracking-[-0.02em] text-ink dark:text-white">{pillar.title}</h2>
                        <p className="text-[15px] font-semibold text-navy dark:text-steel-light">{pillar.tagline}</p>
                      </div>
                    </div>
                    <p className="lg:col-span-5 text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed">{pillar.intro}</p>
                  </div>

                  <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {items.map((service, sIdx) => (
                      <li key={service.id} data-reveal style={{ "--d": `${(sIdx % 3) * 90}ms` } as React.CSSProperties}>
                        <article className="group fs-card fs-card-hover fs-topbar h-full flex flex-col gap-4 p-6" style={{ "--piece": piece.color } as React.CSSProperties}>
                          <div className="flex items-center justify-between">
                            <span className={`fs-icon ${piece.tile}`}><PIcon className="w-5 h-5" aria-hidden="true" /></span>
                            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                              {String(pIdx + 1).padStart(2, "0")}.{String(sIdx + 1).padStart(2, "0")}
                            </span>
                          </div>
                          <h3 className="text-[1.2rem] font-bold leading-snug text-ink dark:text-white">
                            <Link href={`/services/${service.id}`} className="hover:text-navy dark:hover:text-steel-light transition-colors">{service.title}</Link>
                          </h3>
                          <p className="text-[14px] text-slate-600 dark:text-slate-300 leading-relaxed">{service.shortDescription}</p>
                          <ul className="rounded-xl bg-paper dark:bg-night-900/60 border border-paper-line dark:border-white/10 p-4 space-y-2">
                            {service.deliverables.map((del, dIdx) => (
                              <li key={dIdx} className="flex items-start gap-2.5 text-[13.5px] text-slate-700 dark:text-slate-300">{check}<span>{del}</span></li>
                            ))}
                          </ul>
                          <div className="mt-auto pt-2 flex items-center justify-between gap-3">
                            <Link href={`/services/${service.id}`} className="link-arrow text-[14px] text-navy dark:text-steel-light">
                              {sp.viewDetails}
                              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                            </Link>
                            <Link href={`/contact?service=${encodeURIComponent(service.title)}`} className="text-[13px] font-semibold text-slate-500 hover:text-rust dark:text-slate-400 dark:hover:text-rust-light">
                              {isAr ? "اطلب هذه الخدمة" : "Enquire"}
                            </Link>
                          </div>
                        </article>
                      </li>
                    ))}
                  </ul>

                  {pillar.id === "digital" && (
                    <aside data-reveal className="mt-6 fs-card p-6 sm:p-8 border-s-4 !border-s-rust space-y-3">
                      <h3 className="text-xl font-bold text-ink dark:text-white">
                        {isAr ? "تحول رقمي مبني حول أعمالكم" : "Digital Transformation, Built Around the Business"}
                      </h3>
                      <p className="text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed">
                        {isAr
                          ? "لا نقوم برقمنة العمليات غير الفعالة؛ بل نحسّنها أولاً ثم نبني التقنية حولها. يربط نهجنا بين تحسين العمليات وأنظمة ERP وأتمتة سير العمل والبيانات والأفراد لتحقق الأنظمة الرقمية قيمة تشغيلية قابلة للقياس."
                          : "We don't digitize inefficient processes, we improve them first, then build the technology around them. Our approach connects process improvement, ERP, workflow automation, data, and people so that digital systems deliver measurable operational value."}
                      </p>
                      <p className="text-[15px] text-slate-600 dark:text-slate-300">
                        <Link href="/blog" className="link-arrow text-navy dark:text-steel-light">{isAr ? "تصفح مدونتنا" : "Explore our Blog"}</Link>{" "}
                        {isAr
                          ? "للاطلاع على رؤى عملية حول ERP وERPNext وأتمتة سير العمل والتحول الرقمي وتحسين العمليات والتميز التشغيلي المدعوم بالتقنية."
                          : "for practical insights on ERP, ERPNext, workflow automation, digital transformation, process improvement, and technology-enabled operational excellence."}
                      </p>
                    </aside>
                  )}
                </section>
              );
            })}
          </div>
        ) : (
          <div className="fs-card p-10 mb-20 max-w-xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-ink dark:text-white">{sp.noResultsTitle}</h3>
            <p className="text-slate-600 dark:text-slate-400 mt-2">{sp.noResultsDesc}</p>
            <button onClick={() => { setSearchQuery(""); setActiveTab("all"); }} className="mt-5 btn-secondary">
              {sp.resetFilters}
            </button>
          </div>
        )}

        {/* From Knowledge to Results */}
        <section data-reveal className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0E1A38] via-[#1A2756] to-navy text-white p-8 sm:p-12 mb-16 shadow-lift">
          <div aria-hidden="true" className="absolute top-0 inset-x-0 h-1 bg-brand-tri" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <p className="lg:col-span-3 text-[11px] font-bold uppercase tracking-[0.16em] text-steel-light pt-2">{isAr ? "النهج" : "Approach"}</p>
            <div className="lg:col-span-9 space-y-5 max-w-3xl">
              <h2 className="text-3xl sm:text-[2.4rem] font-extrabold leading-[1.1]">{isAr ? "من المعرفة إلى النتائج" : "From Knowledge to Results"}</h2>
              <p className="lede text-slate-200">
                {isAr
                  ? "تحدد الاستشارات ما يجب تغييره. ويبني التدريب القدرة على تغييره. ويساعد التطبيق الرقمي على جعل التحسين جزءاً من العمل اليومي."
                  : "Consulting identifies what needs to change. Training builds the capability to change it. Digital implementation helps make the improvement part of everyday work."}
              </p>
              <p className="text-[15px] text-slate-200">
                <Link href="/blog" className="link-arrow text-white">{isAr ? "تصفح مدونتنا" : "Explore our Blog"}</Link>{" "}
                {isAr
                  ? "للاطلاع على رؤى وأدوات ووجهات نظر واقعية حول التميز التشغيلي والاستراتيجية والجودة والتحسين المستدام."
                  : "for practical insights, tools, and real-world perspectives on operational excellence, strategy, quality, and sustainable improvement."}
              </p>
            </div>
          </div>
        </section>

        {/* Help me choose */}
        <div className="mb-10">
          <ServiceMatcherQuiz />
        </div>
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
