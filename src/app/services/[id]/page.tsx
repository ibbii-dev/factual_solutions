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
      <div className="pt-36 pb-24 min-h-screen text-[#152238] dark:text-white flex items-center justify-center">
        <div className="text-center p-8 bg-white dark:bg-slate-900/95 dark:backdrop-blur-2xl rounded-2xl border border-slate-200/90 dark:border-white/15 max-w-md mx-auto shadow-xs">
          <HelpCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h2 className="text-xl font-bold font-display">
            {language === "ar" ? "╪º┘ä╪«╪»┘à╪⌐ ╪║┘è╪▒ ┘à┘ê╪¼┘ê╪»╪⌐" : "Service Not Found"}
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
            {language === "ar" 
              ? "╪º┘ä╪«╪»┘à╪⌐ ╪º┘ä┘à╪╖┘ä┘ê╪¿╪⌐ ╪║┘è╪▒ ┘à╪¬┘ê┘ü╪▒╪⌐ ╪ú┘ê ╪¬┘à ╪¬╪║┘è┘è╪▒ ┘à╪│╪º╪▒┘ç╪º." 
              : "The requested service could not be found."}
          </p>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 mt-5 px-6 py-2.5 rounded-full bg-[#A33C29] text-white text-xs font-bold hover:bg-[#8E3221] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
            <span>{language === "ar" ? "╪º┘ä╪╣┘ê╪»╪⌐ ╪Ñ┘ä┘ë ╪»┘ä┘è┘ä ╪º┘ä╪«╪»┘à╪º╪¬" : "Back to Services Directory"}</span>
          </Link>
        </div>
      </div>
    );
  }

  const isBusiness = service.category === "business";

  const labels = language === "ar" ? {
    breadcrumbHome: "╪º┘ä╪▒╪ª┘è╪│┘è╪⌐",
    breadcrumbServices: "╪º┘ä╪«╪»┘à╪º╪¬",
    categoryBusiness: "╪¡┘ä┘ê┘ä ╪º┘ä╪ú╪╣┘à╪º┘ä",
    categoryConsultancy: "╪º┘ä╪º╪│╪¬╪┤╪º╪▒╪º╪¬ ╪º┘ä╪Ñ╪»╪º╪▒┘è╪⌐",
    overviewTitle: "┘å╪╕╪▒╪⌐ ╪╣╪º┘à╪⌐ ╪╣┘ä┘ë ╪º┘ä╪«╪»┘à╪⌐ ┘ê╪º┘ä╪ú╪½╪▒ ╪º┘ä┘à╪ñ╪│╪│┘è",
    deliverablesTitle: "┘à╪«╪▒╪¼╪º╪¬ ╪º┘ä╪╣┘à┘ä ╪º┘ä╪º╪│╪¬╪┤╪º╪▒┘è╪⌐ ┘ê╪º┘ä╪¬┘å┘ü┘è╪░┘è╪⌐",
    phasesTitle: "┘à┘å┘ç╪¼┘è╪⌐ ╪º┘ä╪¬┘å┘ü┘è╪░ ┘ê┘à╪▒╪º╪¡┘ä ╪º┘ä╪╣┘à┘ä",
    idealForTitle: "╪º┘ä┘à┘ä┘ü ╪º┘ä┘à╪ñ╪│╪│┘è ╪º┘ä┘à╪│╪¬┘ç╪»┘ü",
    idealForSubtitle: "╪╡┘à┘à╪¬ ┘ç╪░┘ç ╪º┘ä╪«╪»┘à╪⌐ ┘ä┘ä╪┤╪▒┘â╪º╪¬ ┘ê╪º┘ä┘é┘è╪º╪»╪º╪¬ ╪º┘ä╪¬┘è ╪¬┘ê╪º╪¼┘ç ╪º┘ä╪¬╪¡╪»┘è╪º╪¬ ╪º┘ä╪¬╪º┘ä┘è╪⌐:",
    statsTimeline: "╪º┘ä╪Ñ╪╖╪º╪▒ ╪º┘ä╪▓┘à┘å┘è",
    statsDeliverables: "╪º┘ä┘à╪«╪▒╪¼╪º╪¬",
    statsLead: "╪º┘ä╪Ñ╪┤╪▒╪º┘ü",
    statsLeadVal: "┘à╪│╪¬╪┤╪º╪▒ ┘à╪╣╪¬┘à╪» (PMP / MBB)",
    statsBenchmark: "┘à╪╣┘è╪º╪▒ ╪º┘ä╪Ñ┘å╪¼╪º╪▓",
    sidebarTitle: "╪╖┘ä╪¿ ╪¼┘ä╪│╪⌐ ╪º╪│╪¬╪┤╪º╪▒┘è╪⌐ ┘à╪¿╪º╪┤╪▒╪⌐",
    sidebarDesc: "┘å╪º┘é╪┤ ┘à╪¬╪╖┘ä╪¿╪º╪¬ ┘à╪┤╪▒┘ê╪╣┘â ┘à╪¿╪º╪┤╪▒╪⌐ ┘à╪╣ ╪«╪¿╪▒╪º╪ª┘å╪º ┘ê╪º╪¡╪╡┘ä ╪╣┘ä┘ë ╪¬┘é┘è┘è┘à ╪ú┘ê┘ä┘è ┘à╪¼╪º┘å┘è.",
    inputName: "╪º┘ä╪º╪│┘à ╪º┘ä┘â╪▒┘è┘à *",
    inputEmail: "╪º┘ä╪¿╪▒┘è╪» ╪º┘ä╪Ñ┘ä┘â╪¬╪▒┘ê┘å┘è ┘ä┘ä╪╣┘à┘ä *",
    inputPhone: "╪▒┘é┘à ╪º┘ä┘ç╪º╪¬┘ü",
    inputCompany: "╪º╪│┘à ╪º┘ä╪┤╪▒┘â╪⌐ / ╪º┘ä┘à┘å╪┤╪ú╪⌐",
    inputMessage: "┘à┘ä╪º╪¡╪╕╪º╪¬ ╪Ñ╪╢╪º┘ü┘è╪⌐ (╪º╪«╪¬┘è╪º╪▒┘è)",
    submitBtn: "╪Ñ╪▒╪│╪º┘ä ╪╖┘ä╪¿ ╪º┘ä╪º╪│╪¬╪┤╪º╪▒╪⌐",
    submittingBtn: "╪¼╪º╪▒┘ì ╪º┘ä╪Ñ╪▒╪│╪º┘ä...",
    successTitle: "╪¬┘à ╪º╪│╪¬┘ä╪º┘à ╪╖┘ä╪¿┘â ╪¿┘å╪¼╪º╪¡",
    successDesc: "╪┤┘â╪▒╪º┘ï ┘ä┘â. ╪│┘è╪¬┘ê╪º╪╡┘ä ┘à╪╣┘â ┘à╪│╪¬╪┤╪º╪▒┘å╪º ╪º┘ä┘à╪«╪¬╪╡ ╪«┘ä╪º┘ä 24 ╪│╪º╪╣╪⌐.",
    confidential: "╪¼┘ä╪│╪⌐ ╪º╪│╪¬╪┤╪º╪▒┘è╪⌐ ╪│╪▒┘è╪⌐ ┘ê┘à╪¡┘à┘è╪⌐ ╪¿╪º╪¬┘ü╪º┘é┘è╪⌐ ╪╣╪»┘à ╪Ñ┘ü╪╡╪º╪¡",
    relatedTitle: "╪«╪»┘à╪º╪¬ ╪º╪│╪¬╪┤╪º╪▒┘è╪⌐ ╪░╪º╪¬ ╪╡┘ä╪⌐",
    viewService: "╪╣╪▒╪╢ ╪¬┘ü╪º╪╡┘è┘ä ╪º┘ä╪«╪»┘à╪⌐",
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
  };

  return (
    <div className="pt-24 sm:pt-32 pb-20 sm:pb-28 min-h-screen bg-transparent text-[#152238] dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-300 mb-6 drop-shadow-sm">
          <Link href="/" className="hover:text-[#A33C29] transition-colors">
            {labels.breadcrumbHome}
          </Link>
          <span>/</span>
          <Link href="/services" className="hover:text-[#A33C29] transition-colors">
            {labels.breadcrumbServices}
          </Link>
          <span>/</span>
          <span className="text-white font-bold truncate max-w-xs sm:max-w-md">
            {service.title}
          </span>
        </nav>

        {/* Hero Section of the Service */}
        <div className="bg-black/35 backdrop-blur-xl rounded-2xl p-6 sm:p-10 lg:p-12 shadow-2xl border border-white/20 mb-10 sm:mb-12 text-white">
          <div className="max-w-4xl space-y-4">
            
            {/* Practice Indicator & Deliverable Tag */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-md bg-white/10 border border-white/15 text-[#E25C43] text-[11px] font-bold uppercase tracking-wider">
                {language === "ar" ? "┘à┘à╪º╪▒╪│╪⌐ ╪º╪│╪¬╪┤╪º╪▒┘è╪⌐ ┘à╪¬╪«╪╡╪╡╪⌐" : "Advisory Practice"}
              </span>

              <span className="px-3 py-1 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold text-[11px]">
                {service.metrics}
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight font-display drop-shadow-[0_2px_16px_rgba(0,0,0,0.7)]">
              {service.title}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-100 leading-relaxed font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
              {service.shortDescription}
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4 border-t border-white/15">
              <div className="bg-black/35 backdrop-blur-xl p-3.5 rounded-xl border border-white/20 shadow-md">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#E25C43] uppercase">
                  <Clock className="w-3.5 h-3.5 text-[#E25C43]" /> {labels.statsTimeline}
                </div>
                <div className="text-xs sm:text-sm font-bold text-white mt-1">
                  {service.duration}
                </div>
              </div>

              <div className="bg-black/35 backdrop-blur-xl p-3.5 rounded-xl border border-white/20 shadow-md">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-300 uppercase">
                  <Layers className="w-3.5 h-3.5 text-slate-300" /> {labels.statsDeliverables}
                </div>
                <div className="text-xs sm:text-sm font-bold text-white mt-1">
                  {service.deliverables.length} {language === "ar" ? "┘à╪«╪▒╪¼╪º╪¬ ╪▒╪ª┘è╪│┘è╪⌐" : "Key Frameworks"}
                </div>
              </div>

              <div className="bg-black/35 backdrop-blur-xl p-3.5 rounded-xl border border-white/20 shadow-md col-span-2 sm:col-span-2">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 uppercase">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> {labels.statsLead}
                </div>
                <div className="text-xs sm:text-sm font-bold text-white mt-1">
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
            <div className="bg-black/35 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-xl border border-white/20 space-y-4 text-white">
              <h2 className="text-lg sm:text-xl font-bold text-white font-display flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#E25C43]" />
                <span>{labels.overviewTitle}</span>
              </h2>
              
              <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                {service.fullDescription}
              </p>

              {/* Service Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {service.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-md bg-white/10 border border-white/15 text-[11px] font-semibold text-slate-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 2. Core Strategic Deliverables Framework */}
            <div className="bg-black/35 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-xl border border-white/20 space-y-6 text-white">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white font-display flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#E25C43]" />
                  <span>{labels.deliverablesTitle}</span>
                </h2>
                <p className="text-xs text-slate-200 mt-1">
                  {language === "ar" 
                    ? "┘à╪¼┘à┘ê╪╣╪⌐ ┘à╪¬┘â╪º┘à┘ä╪⌐ ┘à┘å ╪º┘ä╪¬┘é╪º╪▒┘è╪▒ ┘ê╪º┘ä┘å┘à╪º╪░╪¼ ┘ê╪«╪▒╪º╪ª╪╖ ╪º┘ä╪╣┘à┘ä ╪º┘ä┘à╪╣╪¬┘à╪»╪⌐ ╪º┘ä╪¬┘è ┘è╪¬┘à ╪¬╪│┘ä┘è┘à┘ç╪º ╪«┘ä╪º┘ä ╪º┘ä┘à╪┤╪▒┘ê╪╣:" 
                    : "Tangible reports, financial models, and strategic blueprints provided during the engagement:"}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.deliverables.map((del, dIdx) => (
                  <div
                    key={dIdx}
                    className="p-4 rounded-xl bg-white/10 border border-white/15 shadow-md flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-white leading-snug">
                        {del}
                      </div>
                      <div className="text-[10px] text-slate-300 mt-0.5">
                        {language === "ar" ? "┘ê╪½┘è┘é╪⌐ ╪¬┘å┘ü┘è╪░┘è╪⌐ ┘à╪╣╪¬┘à╪»╪⌐ ┘ê┘à┘ê╪½┘é╪⌐" : "Verified operational artifact"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Structured 3-Phase Execution Roadmap */}
            {service.executionPhases && service.executionPhases.length > 0 && (
              <div className="bg-black/35 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-xl border border-white/20 space-y-6 text-white">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white font-display flex items-center gap-2">
                    <Target className="w-5 h-5 text-[#E25C43]" />
                    <span>{labels.phasesTitle}</span>
                  </h2>
                  <p className="text-xs text-slate-200 mt-1">
                    {language === "ar"
                      ? "┘å╪¬╪¿╪╣ ┘à╪│╪º╪▒╪º┘ï ╪º╪│╪¬╪┤╪º╪▒┘è╪º┘ï ┘à┘å╪╕┘à╪º┘ï ┘è╪╢┘à┘å ╪¬╪¡┘é┘è┘é ╪º┘ä┘à╪│╪¬┘ç╪»┘ü╪º╪¬ ╪¿╪»┘é╪⌐ ┘ê╪º┘å╪╢╪¿╪º╪╖:"
                      : "A disciplined step-by-step approach ensuring clear milestone accountability:"}
                  </p>
                </div>

                <div className="space-y-3.5">
                  {service.executionPhases.map((phase, pIdx) => (
                    <div
                      key={pIdx}
                      className="p-4 sm:p-5 rounded-xl bg-white/10 border border-white/15 shadow-md flex flex-col sm:flex-row items-start sm:items-center gap-4"
                    >
                      <div className="w-9 h-9 rounded-lg bg-[#E25C43] text-white font-extrabold flex items-center justify-center text-xs shrink-0 font-display">
                        {phase.phase}
                      </div>
                      <div className="space-y-0.5 flex-1">
                        <h3 className="text-sm font-bold text-white">
                          {phase.title}
                        </h3>
                        <p className="text-xs text-slate-100 leading-relaxed font-normal">
                          {phase.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Ideal Organization Profile */}
            <div className="bg-black/35 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-xl border border-white/20 space-y-3 text-white">
              <h2 className="text-base sm:text-lg font-bold text-white font-display flex items-center gap-2">
                <Target className="w-4 h-4 text-[#E25C43]" />
                <span>{labels.idealForTitle}</span>
              </h2>
              <p className="text-xs text-slate-200">
                {labels.idealForSubtitle}
              </p>
              <div className="p-4 rounded-xl bg-white/10 border border-white/15 shadow-md text-xs text-slate-100 font-medium leading-relaxed">
                {service.idealFor}
              </div>
            </div>

          </div>

          {/* Right Sidebar: Direct Consultation Form (4 cols) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-32">
            
            <div className="bg-black/35 backdrop-blur-xl rounded-2xl p-6 sm:p-7 shadow-xl border border-white/20 space-y-4 text-white">
              <div>
                <h3 className="text-base font-bold text-white font-display">
                  {labels.sidebarTitle}
                </h3>
                <p className="text-xs text-slate-200 mt-1">
                  {labels.sidebarDesc}
                </p>
              </div>

              {submitted ? (
                <div className="py-6 text-center space-y-2 bg-emerald-500/20 rounded-xl p-4 border border-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <h4 className="text-xs font-bold text-white">
                    {labels.successTitle}
                  </h4>
                  <p className="text-[11px] text-slate-200">
                    {labels.successDesc}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleQuickSubmit} className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-slate-300">
                      {labels.inputName}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={language === "ar" ? "╪º┘ä╪º╪│┘à" : "Your Name"}
                      className="w-full px-3.5 py-2 rounded-lg bg-white/10 border border-white/20 text-xs text-white placeholder:text-slate-300 focus:outline-none focus:border-[#E25C43]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-slate-300">
                      {labels.inputEmail}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full px-3.5 py-2 rounded-lg bg-white/10 border border-white/20 text-xs text-white placeholder:text-slate-300 focus:outline-none focus:border-[#E25C43]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-slate-300">
                      {labels.inputPhone}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+92 345 0000000"
                      className="w-full px-3.5 py-2 rounded-lg bg-white/10 border border-white/20 text-xs text-white placeholder:text-slate-300 focus:outline-none focus:border-[#E25C43]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-slate-300">
                      {labels.inputCompany}
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder={language === "ar" ? "╪º╪│┘à ╪º┘ä╪┤╪▒┘â╪⌐" : "Company / Firm"}
                      className="w-full px-3.5 py-2 rounded-lg bg-white/10 border border-white/20 text-xs text-white placeholder:text-slate-300 focus:outline-none focus:border-[#E25C43]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 px-4 rounded-full bg-[#A33C29] hover:bg-[#8E3221] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 mt-2"
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

                  <div className="text-[10px] text-slate-300 text-center flex items-center justify-center gap-1.5 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#E25C43] shrink-0" />
                    <span>{labels.confidential}</span>
                  </div>
                </form>
              )}
            </div>

            {/* Related Capabilities */}
            <div className="bg-black/35 backdrop-blur-xl rounded-2xl p-5 shadow-xl border border-white/20 space-y-3 text-white">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-200 font-display">
                {labels.relatedTitle}
              </h4>
              <div className="space-y-2">
                {relatedServices.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/services/${rel.id}`}
                    className="p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 transition-colors flex items-center justify-between group block text-white"
                  >
                    <div className="truncate pr-2">
                      <div className="text-xs font-bold text-white truncate">
                        {rel.title}
                      </div>
                      <div className="text-[10px] text-slate-300 truncate">
                        {rel.metrics}
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E25C43] group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform shrink-0" />
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