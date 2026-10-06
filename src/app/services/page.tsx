"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
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

  const PIECE: Record<string, string> = { consulting: "#25346B", training: "#9BB3D9", digital: "#9B391E", all: "#0A0A0A" };
  const tabs: { id: ServiceCategory | "all"; label: string }[] = [
    { id: "all", label: isAr ? "جميع الخدمات" : "All Services" },
    ...pillars.map((p) => ({ id: p.id, label: p.title })),
  ];

  return (
    <div className="pb-20 sm:pb-24 min-h-screen text-ink dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader eyebrow={sp.badge} title={sp.headline} lede={sp.subheadline} />

        {/* Filter: plain text tabs + underline search */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="flex flex-wrap gap-2.5" role="tablist">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`fs-chip inline-flex items-center gap-2.5 min-h-[44px] px-4 text-[15px] border transition-colors ${
                  activeTab === tab.id
                    ? "border-ink bg-ink text-white dark:bg-white dark:text-ink dark:border-white font-semibold"
                    : "border-paper-line dark:border-white/15 text-ink dark:text-white hover:border-ink dark:hover:border-white"
                }`}
              >
                {tab.id !== "all" && <i className="w-2.5 h-2.5 shrink-0" style={{ background: PIECE[tab.id] }} aria-hidden="true" />}
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-80">
            <Search className={`w-4 h-4 text-slate-400 absolute ${isRTL ? "right-0" : "left-0"} top-1/2 -translate-y-1/2 pointer-events-none`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={sp.searchPlaceholder}
              aria-label={sp.searchPlaceholder}
              className={`w-full ${isRTL ? "pr-7 pl-12" : "pl-7 pr-12"} py-2.5 bg-transparent border-b border-ink/25 dark:border-white/25 text-sm text-ink dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-ink dark:focus:border-white`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className={`absolute ${isRTL ? "left-0" : "right-0"} top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500 hover:text-ink dark:hover:text-white`}
              >
                {isAr ? "مسح" : "Clear"}
              </button>
            )}
          </div>
        </div>

        {/* Service lines, each with its categories */}
        {totalVisible > 0 ? (
          <div className="space-y-20 sm:space-y-28 mb-24">
            {visiblePillars.map((pillar) => {
              const items = currentAllServices.filter((s) => s.category === pillar.id && matches(s));
              if (items.length === 0) return null;
              const pIdx = pillars.findIndex((p) => p.id === pillar.id);
              return (
                <section key={pillar.id} id={pillar.id} className="scroll-mt-28 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10" style={{ "--piece": PIECE[pillar.id] } as React.CSSProperties}>
                  <div className="lg:col-span-3">
                    <div data-reveal className="lg:sticky lg:top-28 space-y-3">
                      <span aria-hidden="true" className="block h-1.5 w-16" style={{ background: PIECE[pillar.id] }} />
                      <p className="font-display text-7xl font-semibold leading-none pt-2" style={{ color: pillar.id === "training" ? "#25346B" : PIECE[pillar.id] }}>{String(pIdx + 1).padStart(2, "0")}</p>
                      <h2 className="text-3xl font-semibold font-display text-navy dark:text-white">{pillar.title}</h2>
                      {pillar.id === "digital" && (
                        <p className="text-[15px] font-semibold text-navy dark:text-steel-light">{pillar.tagline}</p>
                      )}
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{pillar.intro}</p>
                    </div>
                  </div>

                  <div className="lg:col-span-9">
                    <ul>
                      {items.map((service) => (
                        <li key={service.id} data-reveal className="fs-prow fs-svcrow py-8 px-1 border-t border-paper-line dark:border-white/10">
                          <div className="grid grid-cols-1 md:grid-cols-9 gap-6">
                            <div className="md:col-span-4 space-y-3">
                              <h3 className="text-2xl font-semibold font-display leading-snug text-ink dark:text-white">
                                <Link href={`/services/${service.id}`} className="fs-row-title hover:text-rust dark:hover:text-rust-light transition-colors">
                                  {service.title}
                                </Link>
                              </h3>
                              <p className="text-[15px] text-slate-700 dark:text-slate-300 leading-relaxed">{service.shortDescription}</p>
                              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1">
                                <Link href={`/services/${service.id}`} className="link-arrow text-sm text-ink dark:text-white">
                                  {sp.viewDetails}
                                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                                </Link>
                                <Link href={`/contact?service=${encodeURIComponent(service.title)}`} className="text-sm text-slate-600 hover:text-ink dark:text-slate-400 dark:hover:text-white">
                                  {isAr ? "اطلب هذه الخدمة" : "Enquire"}
                                </Link>
                              </div>
                            </div>
                            <ul className="md:col-span-5 grid grid-cols-1 gap-y-2 text-[15px] text-slate-700 dark:text-slate-300">
                              {service.deliverables.map((del, dIdx) => (
                                <li key={dIdx} className="flex gap-3">
                                  <span className="mt-[0.7em] h-0.5 w-3 shrink-0" style={{ background: PIECE[pillar.id] }} aria-hidden="true" />
                                  <span>{del}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </li>
                      ))}
                    </ul>

                    {pillar.id === "digital" && (
                      <aside className="mt-10 border-s-2 border-rust ps-6 space-y-3 max-w-3xl">
                        <h3 className="text-xl font-bold font-display text-ink dark:text-white">
                          {isAr ? "تحول رقمي مبني حول أعمالكم" : "Digital Transformation, Built Around the Business"}
                        </h3>
                        <p className="text-[15px] text-slate-700 dark:text-slate-300 leading-relaxed">
                          {isAr
                            ? "لا نقوم برقمنة العمليات غير الفعالة؛ بل نحسّنها أولاً ثم نبني التقنية حولها. يربط نهجنا بين تحسين العمليات وأنظمة ERP وأتمتة سير العمل والبيانات والأفراد لتحقق الأنظمة الرقمية قيمة تشغيلية قابلة للقياس."
                            : "We don't digitize inefficient processes, we improve them first, then build the technology around them. Our approach connects process improvement, ERP, workflow automation, data, and people so that digital systems deliver measurable operational value."}
                        </p>
                        <p className="text-[15px] text-slate-700 dark:text-slate-300">
                          <Link href="/blog" className="link-arrow text-ink dark:text-white">{isAr ? "تصفح مدونتنا" : "Explore our Blog"}</Link>{" "}
                          {isAr
                            ? "للاطلاع على رؤى عملية حول ERP وERPNext وأتمتة سير العمل والتحول الرقمي وتحسين العمليات والتميز التشغيلي المدعوم بالتقنية."
                            : "for practical insights on ERP, ERPNext, workflow automation, digital transformation, process improvement, and technology-enabled operational excellence."}
                        </p>
                      </aside>
                    )}
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          <div className="py-16 border-t border-ink/15 dark:border-white/15 mb-20 max-w-xl">
            <h3 className="text-2xl font-bold font-display text-ink dark:text-white">{sp.noResultsTitle}</h3>
            <p className="text-slate-600 dark:text-slate-400 mt-2">{sp.noResultsDesc}</p>
            <button onClick={() => { setSearchQuery(""); setActiveTab("all"); }} className="mt-5 link-arrow text-sm text-ink dark:text-white">
              {sp.resetFilters}
            </button>
          </div>
        )}

        {/* From Knowledge to Results */}
        <section className="relative w-screen left-1/2 -translate-x-1/2 bg-navy dark:bg-night-950 text-white mb-24 overflow-hidden">
          <div aria-hidden="true" className="grid grid-cols-3 h-1.5"><span className="bg-navy-400" /><span className="bg-steel" /><span className="bg-rust" /></div>
          <div data-reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <p className="lg:col-span-3 fs-label fs-label-light self-start pt-2">{isAr ? "النهج" : "Approach"}</p>
          <div className="lg:col-span-9 space-y-5 max-w-3xl [&_.lede]:text-[#E4E9F3] [&_p]:text-[#E4E9F3] [&_a]:!text-white">
            <h2 className="text-3xl sm:text-[2.6rem] font-semibold font-display leading-[1.1] text-white">
              {isAr ? "من المعرفة إلى النتائج" : "From Knowledge to Results"}
            </h2>
            <p className="lede text-slate-700 dark:text-slate-300">
              {isAr
                ? "تحدد الاستشارات ما يجب تغييره. ويبني التدريب القدرة على تغييره. ويساعد التطبيق الرقمي على جعل التحسين جزءاً من العمل اليومي."
                : "Consulting identifies what needs to change. Training builds the capability to change it. Digital implementation helps make the improvement part of everyday work."}
            </p>
            <p className="text-[15px] text-slate-700 dark:text-slate-300">
              <Link href="/blog" className="link-arrow text-ink dark:text-white">{isAr ? "تصفح مدونتنا" : "Explore our Blog"}</Link>{" "}
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
