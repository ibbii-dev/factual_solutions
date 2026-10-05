"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Target, 
  ShieldCheck, 
  Layers, 
  Briefcase, 
  Compass, 
  HelpCircle,
  PhoneCall,
  Calendar,
  Send
} from "lucide-react";
import { getServiceById, getServices, getServicePillars, ServiceItem } from "@/data/servicesData";
import { useLanguage } from "@/context/LanguageContext";
import { saveInquiry } from "@/data/inquiriesStore";

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const serviceId = typeof params?.id === "string" ? params.id : "";
  const { t, language, isRTL } = useLanguage();

  const service = getServiceById(serviceId, language) || getServiceById(serviceId, "en");
  const allServicesList = getServices(language);
  const relatedServices = (() => {
    const others = allServicesList.filter((s) => s.id !== serviceId);
    const cat = (getServiceById(serviceId, "en") || others[0])?.category;
    return [...others.filter((s) => s.category === cat), ...others.filter((s) => s.category !== cat)].slice(0, 4);
  })();
  const pillar = service ? getServicePillars(language).find((p) => p.id === service.category) : undefined;

  // Quick Consultation Form State in Sidebar
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      fullName: formData.name,
      workEmail: formData.email,
      phone: formData.phone,
      companyName: formData.company,
      serviceOfInterest: service?.title || "Specific Service Inquiry",
      message: formData.message || `Direct consultation request for ${service?.title}`
    };

    saveInquiry(payload);

    try {
      await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.error("API error:", err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

  if (!service) {
    return (
      <div className="pt-36 pb-24 min-h-screen text-ink dark:text-white flex items-center justify-center">
        <div className="text-center p-8 bg-white dark:bg-slate-900/95 dark:backdrop-blur-2xl rounded-2xl border border-slate-200/90 dark:border-white/15 max-w-md mx-auto shadow-xs">
          <HelpCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h2 className="text-xl font-bold font-display">
            {language === "ar" ? "الخدمة غير موجودة" : "Service Not Found"}
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
            {language === "ar" 
              ? "الخدمة المطلوبة غير متوفرة أو تم تغيير مسارها." 
              : "The requested service could not be found."}
          </p>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 mt-5 px-6 py-2.5 rounded-xl bg-rust text-white text-xs font-bold hover:bg-rust-dark transition-colors"
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
            <span>{language === "ar" ? "العودة إلى دليل الخدمات" : "Back to Services Directory"}</span>
          </Link>
        </div>
      </div>
    );
  }


  const labels = language === "ar" ? {
    breadcrumbHome: "الرئيسية",
    breadcrumbServices: "الخدمات",
    categoryBusiness: "حلول الأعمال",
    categoryConsultancy: "الاستشارات الإدارية",
    overviewTitle: "نظرة عامة",
    deliverablesTitle: "ما تشمله هذه الخدمة",
    phasesTitle: "كيف نعمل",
    idealForTitle: "لمن هذه الخدمة",
    idealForSubtitle: "تناسب هذه الخدمة:",
    statsTimeline: "نوع الخدمة",
    statsDeliverables: "المخرجات",
    statsLead: "الإشراف",
    statsLeadVal: "حزام أسود رئيسي في لين ستة سيجما · PMP",
    statsBenchmark: "معيار الإنجاز",
    sidebarTitle: "طلب جلسة استشارية مباشرة",
    sidebarDesc: "ناقش متطلبات مشروعك مباشرة مع خبرائنا واحصل على تقييم أولي مجاني.",
    inputName: "الاسم الكريم *",
    inputEmail: "البريد الإلكتروني للعمل *",
    inputPhone: "رقم الهاتف",
    inputCompany: "اسم الشركة / المنشأة",
    inputMessage: "ملاحظات إضافية (اختياري)",
    submitBtn: "إرسال طلب الاستشارة",
    submittingBtn: "جارٍ الإرسال...",
    successTitle: "تم استلام طلبك بنجاح",
    successDesc: "شكراً لك. سيتواصل معك مستشارنا المختص خلال 24 ساعة.",
    confidential: "جلسة استشارية سرية ومحمية باتفاقية عدم إفصاح",
    relatedTitle: "خدمات ذات صلة",
    viewService: "عرض تفاصيل الخدمة",
  } : {
    breadcrumbHome: "Home",
    breadcrumbServices: "Services",
    categoryBusiness: "Business Solution",
    categoryConsultancy: "Consultancy Advisory",
    overviewTitle: "Overview",
    deliverablesTitle: "What This Covers",
    phasesTitle: "How We Work",
    idealForTitle: "Who It's For",
    idealForSubtitle: "This service is a good fit for:",
    statsTimeline: "Format",
    statsDeliverables: "Coverage",
    statsLead: "Lead Advisory",
    statsLeadVal: "Lean Six Sigma Master Black Belt · PMP",
    statsBenchmark: "Key Deliverable",
    sidebarTitle: "Schedule Direct Consultation",
    sidebarDesc: "Discuss your objectives directly with our lead advisory team for a structured initial assessment.",
    inputName: "Full Name *",
    inputEmail: "Work Email *",
    inputPhone: "Phone Number",
    inputCompany: "Company Name",
    inputMessage: "Additional Context (Optional)",
    submitBtn: "Submit Consultation Request",
    submittingBtn: "Sending Inquiry...",
    successTitle: "Inquiry Received Successfully",
    successDesc: "Thank you. Our practice lead will contact you within 24 business hours.",
    confidential: "Your information is kept strictly confidential",
    relatedTitle: "Related Services",
    viewService: "Explore Service",
  };

  return (
    <div className="pt-24 sm:pt-32 pb-20 sm:pb-28 min-h-screen bg-transparent text-ink dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-300 mb-6">
          <Link href="/" className="hover:text-accent transition-colors">
            {labels.breadcrumbHome}
          </Link>
          <span>/</span>
          <Link href="/services" className="hover:text-accent transition-colors">
            {labels.breadcrumbServices}
          </Link>
          <span>/</span>
          <span className="text-ink dark:text-white font-bold truncate max-w-xs sm:max-w-md">
            {service.title}
          </span>
        </nav>

        {/* Hero Section of the Service */}
        <div className="bg-white/90 dark:bg-night-800/60 backdrop-blur-xl rounded-2xl p-6 sm:p-10 lg:p-12 shadow-lift border border-slate-200/80 dark:border-white/10 mb-10 sm:mb-12 text-ink dark:text-white transition-colors">
          <div className="max-w-4xl space-y-4">
            
            {/* Practice Indicator & Deliverable Tag */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-md bg-navy-50 dark:bg-white/10 border border-slate-200/80 dark:border-white/15 text-accent text-[11px] font-bold uppercase tracking-wider">
                {pillar?.title}
              </span>

            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-ink dark:text-white leading-tight font-display">
              {service.title}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-100 leading-relaxed font-medium">
              {service.shortDescription}
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4 border-t border-slate-200/80 dark:border-white/15">
              <div className="bg-slate-50 dark:bg-night-800/60 backdrop-blur-xl p-3.5 rounded-xl border border-slate-200/80 dark:border-white/10 shadow-xs">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-accent uppercase">
                  <Clock className="w-3.5 h-3.5 text-accent" /> {labels.statsTimeline}
                </div>
                <div className="text-xs sm:text-sm font-bold text-ink dark:text-white mt-1">
                  {service.duration}
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-night-800/60 backdrop-blur-xl p-3.5 rounded-xl border border-slate-200/80 dark:border-white/10 shadow-xs">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 dark:text-slate-300 uppercase">
                  <Layers className="w-3.5 h-3.5 text-slate-400 dark:text-slate-300" /> {labels.statsDeliverables}
                </div>
                <div className="text-xs sm:text-sm font-bold text-ink dark:text-white mt-1">
                  {service.deliverables.length} {language === "ar" ? "مجالات" : "Focus Areas"}
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-night-800/60 backdrop-blur-xl p-3.5 rounded-xl border border-slate-200/80 dark:border-white/10 shadow-xs col-span-2 sm:col-span-2">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-navy dark:text-steel uppercase">
                  <ShieldCheck className="w-3.5 h-3.5 text-navy dark:text-steel" /> {labels.statsLead}
                </div>
                <div className="text-xs sm:text-sm font-bold text-ink dark:text-white mt-1">
                  {labels.statsLeadVal}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Main Content Layout (8 cols left + 4 cols right sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Content Area (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* 1. In-Depth Strategic Overview */}
            <div className="bg-white/90 dark:bg-night-800/60 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-card border border-slate-200/80 dark:border-white/10 space-y-4 text-ink dark:text-white">
              <h2 className="text-lg sm:text-xl font-bold text-ink dark:text-white font-display flex items-center gap-2">
                <Compass className="w-5 h-5 text-accent" />
                <span>{labels.overviewTitle}</span>
              </h2>
              
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-100 leading-relaxed font-medium">
                {service.fullDescription}
              </p>

              {/* Service Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {service.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-md bg-navy-50 dark:bg-white/10 border border-slate-200/80 dark:border-white/15 text-[11px] font-semibold text-slate-700 dark:text-slate-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 2. Core Strategic Deliverables Framework */}
            <div className="bg-white/90 dark:bg-night-800/60 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-card border border-slate-200/80 dark:border-white/10 space-y-6 text-ink dark:text-white">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-ink dark:text-white font-display flex items-center gap-2">
                  <Layers className="w-5 h-5 text-accent" />
                  <span>{labels.deliverablesTitle}</span>
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-200 mt-1">
                  {language === "ar" 
                    ? "المجالات التي تغطيها هذه الخدمة:" 
                    : "The areas this service covers:"}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.deliverables.map((del, dIdx) => (
                  <div
                    key={dIdx}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-white/10 border border-slate-200/80 dark:border-white/15 shadow-xs flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-md bg-navy text-white dark:bg-steel dark:text-ink border border-transparent flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-ink dark:text-white leading-snug">
                        {del}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Structured 3-Phase Execution Roadmap */}
            {service.executionPhases && service.executionPhases.length > 0 && (
              <div className="bg-white/90 dark:bg-night-800/60 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-card border border-slate-200/80 dark:border-white/10 space-y-6 text-ink dark:text-white">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-ink dark:text-white font-display flex items-center gap-2">
                    <Target className="w-5 h-5 text-accent" />
                    <span>{labels.phasesTitle}</span>
                  </h2>
                  <p className="text-xs text-slate-600 dark:text-slate-200 mt-1">
                    {language === "ar"
                      ? "نهجنا العملي من البداية إلى النهاية:"
                      : "Our practical approach, from start to finish:"}
                  </p>
                </div>

                <div className="space-y-3.5">
                  {service.executionPhases.map((phase, pIdx) => (
                    <div
                      key={pIdx}
                      className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-white/10 border border-slate-200/80 dark:border-white/15 shadow-xs flex flex-col sm:flex-row items-start sm:items-center gap-4"
                    >
                      <div className="w-9 h-9 rounded-lg bg-rust text-white font-extrabold flex items-center justify-center text-xs shrink-0 font-display">
                        {phase.phase}
                      </div>
                      <div className="space-y-0.5 flex-1">
                        <h3 className="text-sm font-bold text-ink dark:text-white">
                          {phase.title}
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-100 leading-relaxed font-normal">
                          {phase.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Ideal Organization Profile */}
            <div className="bg-white/90 dark:bg-night-800/60 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-card border border-slate-200/80 dark:border-white/10 space-y-3 text-ink dark:text-white">
              <h2 className="text-base sm:text-lg font-bold text-ink dark:text-white font-display flex items-center gap-2">
                <Target className="w-4 h-4 text-accent" />
                <span>{labels.idealForTitle}</span>
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-200">
                {labels.idealForSubtitle}
              </p>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/10 border border-slate-200/80 dark:border-white/15 shadow-xs text-xs text-slate-700 dark:text-slate-100 font-medium leading-relaxed">
                {service.idealFor}
              </div>
            </div>

          </div>

          {/* Right Sidebar: Direct Consultation Form (4 cols) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-32">
            
            <div className="bg-white/90 dark:bg-night-800/60 backdrop-blur-xl rounded-2xl p-6 sm:p-7 shadow-card border border-slate-200/80 dark:border-white/10 space-y-4 text-ink dark:text-white">
              <div>
                <h3 className="text-base font-bold text-ink dark:text-white font-display">
                  {labels.sidebarTitle}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-200 mt-1">
                  {labels.sidebarDesc}
                </p>
              </div>

              {submitted ? (
                <div className="py-6 text-center space-y-2 bg-emerald-500/20 rounded-xl p-4 border border-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <h4 className="text-xs font-bold text-ink dark:text-white">
                    {labels.successTitle}
                  </h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-200">
                    {labels.successDesc}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleQuickSubmit} className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-slate-600 dark:text-slate-300">
                      {labels.inputName}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={language === "ar" ? "الاسم" : "Your Name"}
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/10 text-xs text-ink dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-300 focus:outline-none focus:border-rust"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-slate-600 dark:text-slate-300">
                      {labels.inputEmail}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/10 text-xs text-ink dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-300 focus:outline-none focus:border-rust"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-slate-600 dark:text-slate-300">
                      {labels.inputPhone}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+92 345 0000000"
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/10 text-xs text-ink dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-300 focus:outline-none focus:border-rust"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-slate-600 dark:text-slate-300">
                      {labels.inputCompany}
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder={language === "ar" ? "اسم الشركة" : "Company / Firm"}
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/10 text-xs text-ink dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-300 focus:outline-none focus:border-rust"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 px-4 rounded-xl bg-rust hover:bg-rust-dark text-white text-xs font-bold transition-all shadow-cta flex items-center justify-center gap-2 mt-2"
                  >
                    {isSubmitting ? (
                      <span>{labels.submittingBtn}</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 rtl:rotate-180" />
                        <span>{labels.submitBtn}</span>
                      </>
                    )}
                  </button>

                  <div className="text-[10px] text-slate-500 dark:text-slate-300 text-center flex items-center justify-center gap-1.5 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-accent shrink-0" />
                    <span>{labels.confidential}</span>
                  </div>
                </form>
              )}
            </div>

            {/* Related Capabilities */}
            <div className="bg-white/90 dark:bg-night-800/60 backdrop-blur-xl rounded-2xl p-5 shadow-card border border-slate-200/80 dark:border-white/10 space-y-3 text-ink dark:text-white">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-200 font-display">
                {labels.relatedTitle}
              </h4>
              <div className="space-y-2">
                {relatedServices.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/services/${rel.id}`}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-white/10 hover:bg-slate-100 dark:hover:bg-white/20 border border-slate-200/80 dark:border-white/15 transition-colors flex items-center justify-between group block text-ink dark:text-white"
                  >
                    <div className="truncate pr-2">
                      <div className="text-xs font-bold text-ink dark:text-white truncate">
                        {rel.title}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-300 truncate">
                        {rel.metrics}
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-accent group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform shrink-0" />
                  </Link>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
