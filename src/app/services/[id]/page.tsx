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
import { getServiceById, getServices, ServiceItem } from "@/data/servicesData";
import { useLanguage } from "@/context/LanguageContext";
import { saveInquiry } from "@/data/inquiriesStore";

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const serviceId = typeof params?.id === "string" ? params.id : "";
  const { t, language, isRTL } = useLanguage();

  const service = getServiceById(serviceId, language) || getServiceById(serviceId, "en");
  const allServicesList = getServices(language);
  const relatedServices = allServicesList.filter((s) => s.id !== serviceId).slice(0, 3);

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
      <div className="pt-36 pb-24 min-h-screen bg-[#EBF1FA] dark:bg-[#0B1320] text-[#152238] dark:text-white flex items-center justify-center">
        <div className="text-center p-8 bg-white dark:bg-[#111C2E] rounded-3xl border border-[#8EA9D3]/30 dark:border-slate-800 max-w-md mx-auto shadow-sm">
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
            className="inline-flex items-center gap-2 mt-5 px-6 py-2.5 rounded-xl bg-brand-rust text-white text-xs font-bold"
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
            <span>{language === "ar" ? "العودة إلى دليل الخدمات" : "Back to Services Directory"}</span>
          </Link>
        </div>
      </div>
    );
  }

  const isBusiness = service.category === "business";

  const labels = language === "ar" ? {
    breadcrumbHome: "الرئيسية",
    breadcrumbServices: "الخدمات",
    categoryBusiness: "حلول الأعمال",
    categoryConsultancy: "الاستشارات الإدارية",
    overviewTitle: "نظرة عامة على الخدمة والأثر المؤسسي",
    deliverablesTitle: "مخرجات العمل الاستشارية والتنفيذية",
    phasesTitle: "منهجية التنفيذ ومراحل العمل",
    idealForTitle: "الملف المؤسسي المستهدف",
    idealForSubtitle: "صممت هذه الخدمة للشركات والقيادات التي تواجه التحديات التالية:",
    statsTimeline: "الإطار الزمني",
    statsDeliverables: "المخرجات",
    statsLead: "الإشراف",
    statsLeadVal: "مستشار معتمد (PMP / MBB)",
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
    relatedTitle: "خدمات استشارية ذات صلة",
    viewService: "عرض تفاصيل الخدمة",
    ctaBannerTitle: "هل تحتاج إلى استشارة مخصصة تناسب أهداف شركتك؟",
    ctaBannerDesc: "تواصل معنا مباشرة عبر الهاتف أو البريد الإلكتروني لمناقشة خارطة طريق مخصصة لعملك.",
    contactUs: "تواصل معنا الآن"
  } : {
    breadcrumbHome: "Home",
    breadcrumbServices: "Services",
    categoryBusiness: "Business Solution",
    categoryConsultancy: "Consultancy Advisory",
    overviewTitle: "Strategic Overview & Business Impact",
    deliverablesTitle: "Core Strategic & Operational Deliverables",
    phasesTitle: "Structured 3-Phase Execution Roadmap",
    idealForTitle: "Ideal Organization Profile & Target Readiness",
    idealForSubtitle: "This engagement is tailored for enterprises and leadership teams requiring structured outcomes:",
    statsTimeline: "Timeline",
    statsDeliverables: "Deliverables",
    statsLead: "Lead Advisory",
    statsLeadVal: "Senior PMP / Master Black Belt",
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
    confidential: "Strict client confidentiality protected under mutual NDA",
    relatedTitle: "Related Strategic Capabilities",
    viewService: "Explore Service",
    ctaBannerTitle: "Need a tailored engagement for your enterprise?",
    ctaBannerDesc: "Connect directly with our senior consulting partners to outline an actionable scope of work.",
    contactUs: "Contact Our Advisory Team"
  };

  return (
    <div className="pt-28 sm:pt-32 pb-20 sm:pb-28 min-h-screen bg-[#EBF1FA] dark:bg-[#0B1320] text-[#152238] dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-6">
          <Link href="/" className="hover:text-brand-rust transition-colors">
            {labels.breadcrumbHome}
          </Link>
          <span>/</span>
          <Link href="/services" className="hover:text-brand-rust transition-colors">
            {labels.breadcrumbServices}
          </Link>
          <span>/</span>
          <span className="text-[#152238] dark:text-brand-steel-light font-bold truncate max-w-xs sm:max-w-md">
            {service.title}
          </span>
        </nav>

        {/* Hero Section of the Service */}
        <div className="bg-white dark:bg-[#111C2E] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm border border-[#8EA9D3]/30 dark:border-slate-800 mb-10 sm:mb-14">
          <div className="max-w-4xl space-y-4">
            
            {/* Category Badge & Deliverable Tag */}
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  isBusiness
                    ? "bg-[#8EA9D3]/20 text-[#152238] dark:text-brand-steel-light"
                    : "bg-brand-rust/20 text-brand-rust dark:text-brand-rust-light"
                }`}
              >
                {isBusiness ? labels.categoryBusiness : labels.categoryConsultancy}
              </span>

              <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs border border-emerald-500/20">
                {service.metrics}
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#152238] dark:text-white leading-tight font-display">
              {service.title}
            </h1>

            {/* Subtitle / Lead description */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
              {service.shortDescription}
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4 border-t border-[#8EA9D3]/20 dark:border-slate-800">
              <div className="bg-[#F2F7FD] dark:bg-[#15233A] p-3.5 rounded-2xl border border-[#8EA9D3]/20 dark:border-slate-700/60">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                  <Clock className="w-3.5 h-3.5 text-brand-rust" /> {labels.statsTimeline}
                </div>
                <div className="text-xs sm:text-sm font-bold text-[#152238] dark:text-white mt-1">
                  {service.duration}
                </div>
              </div>

              <div className="bg-[#F2F7FD] dark:bg-[#15233A] p-3.5 rounded-2xl border border-[#8EA9D3]/20 dark:border-slate-700/60">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                  <Layers className="w-3.5 h-3.5 text-brand-steel" /> {labels.statsDeliverables}
                </div>
                <div className="text-xs sm:text-sm font-bold text-[#152238] dark:text-white mt-1">
                  {service.deliverables.length} {language === "ar" ? "مخرجات رئيسية" : "Key Frameworks"}
                </div>
              </div>

              <div className="bg-[#F2F7FD] dark:bg-[#15233A] p-3.5 rounded-2xl border border-[#8EA9D3]/20 dark:border-slate-700/60 col-span-2 sm:col-span-2">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> {labels.statsLead}
                </div>
                <div className="text-xs sm:text-sm font-bold text-[#152238] dark:text-white mt-1">
                  {labels.statsLeadVal}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Main Content Layout (8 cols left + 4 cols right sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Content Area (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* 1. In-Depth Strategic Overview */}
            <div className="bg-white dark:bg-[#111C2E] rounded-3xl p-6 sm:p-8 shadow-sm border border-[#8EA9D3]/30 dark:border-slate-800 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#152238] dark:text-white font-display flex items-center gap-2.5">
                <Compass className="w-5 h-5 text-brand-rust" />
                <span>{labels.overviewTitle}</span>
              </h2>
              
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                {service.fullDescription}
              </p>

              {/* Service Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {service.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-xl bg-[#F2F7FD] dark:bg-[#15233A] text-xs font-semibold text-[#152238] dark:text-slate-300 border border-[#8EA9D3]/30 dark:border-slate-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 2. Core Strategic Deliverables Framework */}
            <div className="bg-white dark:bg-[#111C2E] rounded-3xl p-6 sm:p-8 shadow-sm border border-[#8EA9D3]/30 dark:border-slate-800 space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#152238] dark:text-white font-display flex items-center gap-2.5">
                  <Layers className="w-5 h-5 text-brand-steel" />
                  <span>{labels.deliverablesTitle}</span>
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  {language === "ar" 
                    ? "مجموعة متكاملة من التقارير والنماذج وخرائط العمل المعتمدة التي يتم تسليمها خلال المشروع:" 
                    : "Tangible reports, financial models, and strategic blueprints provided during the engagement:"}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.deliverables.map((del, dIdx) => (
                  <div
                    key={dIdx}
                    className="p-4 rounded-2xl bg-[#F2F7FD] dark:bg-[#15233A] border border-[#8EA9D3]/20 dark:border-slate-700/60 flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-[#152238] dark:text-white leading-snug">
                        {del}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                        {language === "ar" ? "وثيقة تنفيذية معتمدة وموثقة" : "Verified operational artifact"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Structured 3-Phase Execution Roadmap */}
            {service.executionPhases && service.executionPhases.length > 0 && (
              <div className="bg-white dark:bg-[#111C2E] rounded-3xl p-6 sm:p-8 shadow-sm border border-[#8EA9D3]/30 dark:border-slate-800 space-y-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#152238] dark:text-white font-display flex items-center gap-2.5">
                    <Target className="w-5 h-5 text-brand-rust" />
                    <span>{labels.phasesTitle}</span>
                  </h2>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    {language === "ar"
                      ? "نتبع مساراً استشارياً منظماً يضمن تحقيق المستهدفات بدقة وانضباط:"
                      : "A disciplined step-by-step approach ensuring clear milestone accountability:"}
                  </p>
                </div>

                <div className="space-y-4">
                  {service.executionPhases.map((phase, pIdx) => (
                    <div
                      key={pIdx}
                      className="p-4 sm:p-5 rounded-2xl bg-[#F2F7FD] dark:bg-[#15233A] border border-[#8EA9D3]/20 dark:border-slate-700/60 flex flex-col sm:flex-row items-start sm:items-center gap-4"
                    >
                      <div className="w-10 h-10 rounded-xl bg-brand-rust text-white font-extrabold flex items-center justify-center text-sm shrink-0 font-display">
                        {phase.phase}
                      </div>
                      <div className="space-y-0.5 flex-1">
                        <h3 className="text-sm sm:text-base font-bold text-[#152238] dark:text-white">
                          {phase.title}
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                          {phase.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Ideal Organization Profile */}
            <div className="bg-white dark:bg-[#111C2E] rounded-3xl p-6 sm:p-8 shadow-sm border border-[#8EA9D3]/30 dark:border-slate-800 space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-[#152238] dark:text-white font-display flex items-center gap-2">
                <Target className="w-5 h-5 text-brand-steel" />
                <span>{labels.idealForTitle}</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {labels.idealForSubtitle}
              </p>
              <div className="p-4 rounded-2xl bg-[#F2F7FD] dark:bg-[#15233A] border border-[#8EA9D3]/30 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                {service.idealFor}
              </div>
            </div>

          </div>

          {/* Right Sidebar: Direct Action Card & Lead Capture (4 cols) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            
            {/* Consultation Booking Card */}
            <div className="bg-white dark:bg-[#111C2E] rounded-3xl p-6 sm:p-8 shadow-sm border border-[#8EA9D3]/30 dark:border-slate-800 space-y-4">
              <div>
                <h3 className="text-lg font-bold text-[#152238] dark:text-white font-display">
                  {labels.sidebarTitle}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  {labels.sidebarDesc}
                </p>
              </div>

              {submitted ? (
                <div className="py-6 text-center space-y-3 bg-emerald-500/10 rounded-2xl p-4 border border-emerald-500/20">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto" />
                  <h4 className="text-sm font-bold text-[#152238] dark:text-white">
                    {labels.successTitle}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {labels.successDesc}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleQuickSubmit} className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                      {labels.inputName}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={language === "ar" ? "الاسم" : "Your Name"}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#F2F7FD] dark:bg-[#15233A] border border-[#8EA9D3]/30 dark:border-slate-700 text-xs text-[#152238] dark:text-white focus:outline-none focus:border-brand-rust"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                      {labels.inputEmail}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full px-3.5 py-2 rounded-xl bg-[#F2F7FD] dark:bg-[#15233A] border border-[#8EA9D3]/30 dark:border-slate-700 text-xs text-[#152238] dark:text-white focus:outline-none focus:border-brand-rust"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                      {labels.inputPhone}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+92 345 0000000"
                      className="w-full px-3.5 py-2 rounded-xl bg-[#F2F7FD] dark:bg-[#15233A] border border-[#8EA9D3]/30 dark:border-slate-700 text-xs text-[#152238] dark:text-white focus:outline-none focus:border-brand-rust"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                      {labels.inputCompany}
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder={language === "ar" ? "اسم الشركة" : "Company / Firm"}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#F2F7FD] dark:bg-[#15233A] border border-[#8EA9D3]/30 dark:border-slate-700 text-xs text-[#152238] dark:text-white focus:outline-none focus:border-brand-rust"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 rounded-xl bg-brand-rust hover:bg-brand-rust-light text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 mt-2"
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

                  <div className="text-[10px] text-slate-500 text-center flex items-center justify-center gap-1.5 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-rust shrink-0" />
                    <span>{labels.confidential}</span>
                  </div>
                </form>
              )}
            </div>

            {/* Related Capabilities Box */}
            <div className="bg-white dark:bg-[#111C2E] rounded-3xl p-6 shadow-sm border border-[#8EA9D3]/30 dark:border-slate-800 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#152238] dark:text-brand-steel-light font-display">
                {labels.relatedTitle}
              </h4>
              <div className="space-y-2">
                {relatedServices.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/services/${rel.id}`}
                    className="p-3 rounded-2xl bg-[#F2F7FD] dark:bg-[#15233A] hover:bg-[#E2ECF9] dark:hover:bg-[#1E3150] transition-colors flex items-center justify-between group block"
                  >
                    <div className="truncate pr-2">
                      <div className="text-xs font-bold text-[#152238] dark:text-white truncate">
                        {rel.title}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                        {rel.metrics}
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-brand-rust group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform shrink-0" />
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
