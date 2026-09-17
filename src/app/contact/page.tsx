"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Briefcase, 
  Compass, 
  ChevronDown, 
  Check,
  Sparkles,
  Bot
} from "lucide-react";
import { officeLocations, contactDetails } from "@/data/companyData";
import { allServices } from "@/data/servicesData";
import { saveInquiry } from "@/data/inquiriesStore";
import { useLanguage } from "@/context/LanguageContext";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface AiAssessmentData {
  clientName: string;
  industryCategory: string;
  executiveSummary: string;
  keyStrategicFocus: string[];
  recommendedConsultingPath: string;
}

function ContactContent() {
  const searchParams = useSearchParams();
  const prefilledService = searchParams.get("service") || "";
  const { t, language, isRTL } = useLanguage();
  const c = t.contactPage;

  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    companyName: "",
    phone: "",
    serviceOfInterest: prefilledService,
    message: "",
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiAssessment, setAiAssessment] = useState<AiAssessmentData | null>(null);

  useEffect(() => {
    if (prefilledService) {
      setFormData((prev) => ({ ...prev, serviceOfInterest: prefilledService }));
    }
  }, [prefilledService]);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      fullName: formData.fullName,
      workEmail: formData.workEmail,
      companyName: formData.companyName || "",
      phone: formData.phone || "",
      serviceOfInterest: formData.serviceOfInterest || "General Consultation",
      message: formData.message,
    };

    saveInquiry(payload);

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.aiAssessment) {
        setAiAssessment(data.aiAssessment);
      }
    } catch (err) {
      console.error("API error:", err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

  const selectService = (serviceTitle: string) => {
    setFormData((prev) => ({ ...prev, serviceOfInterest: serviceTitle }));
    setIsDropdownOpen(false);
  };

  const businessServicesList = allServices.filter((s) => s.category === "business");
  const consultancyServicesList = allServices.filter((s) => s.category === "consultancy");

  return (
    <div className="pt-32 sm:pt-36 pb-20 sm:pb-24 min-h-screen bg-[#FAFBFD] dark:bg-[#0B1320] text-[#152238] dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Hero */}
        <ScrollReveal variant="fade-up" className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#A33C29]/10 text-[#A33C29] text-[11px] font-bold uppercase tracking-widest">
            <span>DIRECT ENGAGEMENT</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#152238] dark:text-white font-display">
            {c.headline}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            {c.subheadline}
          </p>
        </ScrollReveal>

        {/* Form and Hub Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left: Consultation Form (7 cols) */}
          <ScrollReveal variant="fade-up" delay={0.1} duration={0.65} className="lg:col-span-7 bg-white dark:bg-[#111C2E] rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xs border border-slate-200/90 dark:border-slate-800">
            {submitted ? (
              <div className="py-6 space-y-6 text-left">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                  <div>
                    <h3 className="text-sm sm:text-base font-bold">{c.successTitle}</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      {c.successMessage.replace("{name}", formData.fullName)}
                    </p>
                  </div>
                </div>

                {/* AI Agent Diagnostic Card */}
                {aiAssessment && (
                  <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-[#A33C29] text-white flex items-center justify-center">
                          <Bot className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-bold text-[#152238] dark:text-white uppercase tracking-wider">
                          JARVIS AI Preliminary Diagnostic
                        </span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {aiAssessment.industryCategory}
                      </span>
                    </div>

                    <div className="space-y-0.5">
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Consulting Focus Area</div>
                      <div className="text-xs font-bold text-[#152238] dark:text-white">{aiAssessment.recommendedConsultingPath}</div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Key Milestone Focus Points:</div>
                      <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                        {aiAssessment.keyStrategicFocus.map((pt, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-4 h-4 rounded-full bg-[#A33C29]/15 text-[#A33C29] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-400 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#A33C29] shrink-0" />
                      <span>An executive summary and confirmation email have been dispatched to <strong>{formData.workEmail}</strong>.</span>
                    </div>
                  </div>
                )}

                <div className="text-center pt-2">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setAiAssessment(null);
                      setFormData({
                        fullName: "",
                        workEmail: "",
                        companyName: "",
                        phone: "",
                        serviceOfInterest: "",
                        message: "",
                      });
                    }}
                    className="px-6 py-2 rounded-full bg-[#A33C29] text-white text-xs font-bold hover:bg-[#8E3221] transition-colors"
                  >
                    {c.sendAnother}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-[#152238] dark:text-white mb-0.5 font-display">
                    {c.formTitle}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {c.formSubtitle}
                  </p>
                </div>

                {/* Name & Work Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                      {c.fullNameLabel}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder={language === "ar" ? "الاسم الكريم" : "Your Name"}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-[#152238] dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#A33C29] transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                      {c.emailLabel}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.workEmail}
                      onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-[#152238] dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#A33C29] transition-all"
                    />
                  </div>
                </div>

                {/* Company & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                      {c.companyLabel}
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="Company / Enterprise"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-[#152238] dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#A33C29] transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                      {c.phoneLabel}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+92 300 000 0000"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-[#152238] dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#A33C29] transition-all"
                    />
                  </div>
                </div>

                {/* Service of Interest Dropdown */}
                <div className="space-y-1 relative" ref={dropdownRef}>
                  <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                    {c.serviceLabel}
                  </label>
                  
                  <div
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-[#152238] dark:text-white cursor-pointer flex items-center justify-between"
                  >
                    <span className={formData.serviceOfInterest ? "text-[#152238] dark:text-white font-medium" : "text-slate-400"}>
                      {formData.serviceOfInterest || (language === "ar" ? "اختر الخدمة المطلوبة" : "Select Service Area")}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180 text-[#A33C29]" : ""}`} />
                  </div>

                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1.5 rounded-xl bg-white dark:bg-[#0E182A] border border-slate-200 dark:border-slate-700 shadow-xl p-3 z-50 max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                      
                      <div className="pb-2">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 px-2 flex items-center gap-1.5">
                          <Briefcase className="w-3 h-3" />
                          <span>Business Solutions</span>
                        </div>
                        <div className="space-y-0.5">
                          {businessServicesList.map((srv) => (
                            <div
                              key={srv.id}
                              onClick={() => selectService(srv.title)}
                              className={`px-3 py-1.5 rounded-lg text-xs flex items-center justify-between cursor-pointer transition-colors ${
                                formData.serviceOfInterest === srv.title
                                  ? "bg-[#152238] text-white font-bold"
                                  : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
                              }`}
                            >
                              <span>{srv.title}</span>
                              {formData.serviceOfInterest === srv.title && <Check className="w-3.5 h-3.5" />}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#A33C29] mb-1 px-2 flex items-center gap-1.5">
                          <Compass className="w-3 h-3" />
                          <span>Consultancy Services</span>
                        </div>
                        <div className="space-y-0.5">
                          {consultancyServicesList.map((srv) => (
                            <div
                              key={srv.id}
                              onClick={() => selectService(srv.title)}
                              className={`px-3 py-1.5 rounded-lg text-xs flex items-center justify-between cursor-pointer transition-colors ${
                                formData.serviceOfInterest === srv.title
                                  ? "bg-[#A33C29] text-white font-bold"
                                  : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
                              }`}
                            >
                              <span>{srv.title}</span>
                              {formData.serviceOfInterest === srv.title && <Check className="w-3.5 h-3.5" />}
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                    {c.messageLabel}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={language === "ar" ? "اشرح احتياجات مشروعك وأهداف العمل..." : "Briefly describe your requirements or strategic objectives..."}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-[#152238] dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#A33C29] transition-all resize-none"
                  />
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-full bg-[#A33C29] hover:bg-[#8E3221] text-white text-xs font-bold transition-all duration-200 shadow-xs flex items-center justify-center gap-2 group disabled:opacity-50"
                >
                  <span>{isSubmitting ? (language === "ar" ? "جارٍ الإرسال والتحليل الذكي..." : "Submitting & Generating Assessment...") : c.submitButton}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1 rtl:rotate-180" />
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#A33C29]" />
                  <span>{c.confidentialNote}</span>
                </div>
              </form>
            )}
          </ScrollReveal>

          {/* Right: Contact Details (5 cols) */}
          <ScrollReveal variant="fade-up" delay={0.2} duration={0.65} className="lg:col-span-5 space-y-6">
            
            {/* Direct Contact Card */}
            <div className="bg-white dark:bg-[#111C2E] rounded-2xl p-6 sm:p-7 shadow-xs border border-slate-200/90 dark:border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-[#152238] dark:text-white font-display">
                {c.directContactTitle}
              </h3>
              
              <div className="space-y-3">
                <a
                  href={`mailto:${contactDetails.email}`}
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-slate-300 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#A33C29]/15 text-[#A33C29] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-semibold">
                      {c.corporateEmail}
                    </div>
                    <div className="text-xs font-bold text-[#152238] dark:text-white group-hover:text-[#A33C29] transition-colors">
                      {contactDetails.email}
                    </div>
                  </div>
                </a>

                <a
                  href={`tel:${contactDetails.phone.replace(/\s+/g, '')}`}
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-slate-300 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#152238]/10 text-[#152238] dark:text-slate-300 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-semibold">
                      {c.directPhone}
                    </div>
                    <div className="text-xs font-bold text-[#152238] dark:text-white group-hover:text-[#A33C29] transition-colors">
                      {contactDetails.phone}
                    </div>
                  </div>
                </a>

                {/* WhatsApp Quick Direct Connect */}
                <a
                  href={`https://wa.me/${contactDetails.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(language === "ar" ? "مرحباً فاكتشوال سوليوشنز، أود الاستفسار عن استشارات الأعمال." : "Hello Factual Solutions, I would like to inquire about your business consulting services.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-3 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/20 hover:border-emerald-500 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.301-.15-1.781-.879-2.057-.98-.276-.1-.477-.15-.678.15-.201.3-.778.98-.954 1.18-.175.2-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.495-.896-.799-1.501-1.787-1.677-2.088-.175-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.201-.301.301-.502.1-.201.05-.376-.025-.527-.075-.15-.678-1.634-.929-2.237-.245-.588-.494-.508-.678-.517l-.578-.01c-.201 0-.527.075-.803.376s-1.054 1.03-1.054 2.511c0 1.482 1.079 2.912 1.23 3.113.15.201 2.123 3.242 5.143 4.547.718.31 1.279.496 1.716.635.722.23 1.379.197 1.898.12.578-.087 1.781-.728 2.032-1.431.251-.703.251-1.305.175-1.431-.075-.125-.276-.201-.577-.351zM12.042 21.996h-.008a9.93 9.93 0 0 1-5.068-1.391l-.364-.216-3.766.988 1.005-3.67-.237-.378a9.92 9.92 0 0 1-1.523-5.275c0-5.485 4.464-9.95 9.955-9.95 2.657 0 5.155 1.036 7.032 2.915a9.88 9.88 0 0 1 2.913 7.034c0 5.487-4.465 9.953-9.957 9.953z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10px] text-emerald-700 dark:text-emerald-400 uppercase font-semibold">
                      {language === "ar" ? "واتساب المباشر" : "WhatsApp Quick Chat"}
                    </div>
                    <div className="text-xs font-bold text-[#152238] dark:text-white group-hover:text-emerald-500 transition-colors">
                      {contactDetails.phone}
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Office Locations */}
            <div className="bg-white dark:bg-[#111C2E] rounded-2xl p-6 sm:p-7 shadow-xs border border-slate-200/90 dark:border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-[#152238] dark:text-white font-display">
                {c.headOfficeTitle}
              </h3>
              
              <div className="space-y-2.5">
                {officeLocations.map((loc) => (
                  <div
                    key={loc.city}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-xs text-[#152238] dark:text-white flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#A33C29] shrink-0" />
                        <span>{language === "ar" ? "لاهور، باكستان" : `${loc.city}, ${loc.country}`}</span>
                      </div>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-[#A33C29]/10 text-[#A33C29]">
                        {language === "ar" ? "المقر الرئيسي" : loc.tag}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 pl-5">
                      {loc.address}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </ScrollReveal>

        </div>

      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAFBFD] dark:bg-[#0B1320] pt-32 text-center text-slate-400">Loading Contact...</div>}>
      <ContactContent />
    </Suspense>
  );
}
