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
  Bot,
  Calendar
} from "lucide-react";
import { officeLocations, contactDetails } from "@/data/companyData";
import { allServices } from "@/data/servicesData";
import { saveInquiry } from "@/data/inquiriesStore";
import { useLanguage } from "@/context/LanguageContext";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import PartnerBookingWidget from "@/components/calendar/PartnerBookingWidget";
import GoogleRecaptcha from "@/components/ui/GoogleRecaptcha";

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
  const [activeMode, setActiveMode] = useState<"inquiry" | "calendar">("inquiry");
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState("");

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

    if (!recaptchaToken) {
      setCaptchaError(
        language === "ar"
          ? "يرجى تأكيد التحقق الأمني عبر Google reCAPTCHA أدناه قبل الإرسال."
          : "Please complete the Google reCAPTCHA verification below before submitting."
      );
      return;
    }

    setCaptchaError("");
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

  return (
    <div className="pt-24 sm:pt-32 pb-20 sm:pb-24 min-h-screen bg-transparent text-[#152238] dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Hero */}
        {/* Page Hero */}
        <ScrollReveal variant="fade-up" className="text-center max-w-3xl mx-auto space-y-3 mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100/90 dark:bg-black/45 backdrop-blur-md text-slate-800 dark:text-white border border-slate-200/80 dark:border-white/20 text-[10.5px] sm:text-[11px] font-bold uppercase tracking-wider sm:tracking-widest shadow-xs">
            <span>DIRECT ENGAGEMENT</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight font-display drop-shadow-xs">
            {c.headline}
          </h1>
          <p className="text-xs sm:text-base md:text-lg text-slate-600 dark:text-slate-100 max-w-2xl mx-auto leading-relaxed font-medium">
            {c.subheadline}
          </p>

          {/* Mode Switcher Tabs */}
          <div className="pt-4 flex items-center justify-center">
            <div className="inline-flex p-1 rounded-2xl bg-slate-100/90 dark:bg-black/45 backdrop-blur-md border border-slate-200/80 dark:border-white/20 shadow-md">
              <button
                type="button"
                onClick={() => setActiveMode("inquiry")}
                className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeMode === "inquiry"
                    ? "bg-[#A33C29] text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Bot className="w-3.5 h-3.5 text-[#E25C43]" />
                <span>Advisory Inquiry &amp; AI Diagnostic</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMode("calendar")}
                className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeMode === "calendar"
                    ? "bg-[#A33C29] text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Partner Calendar (30-Min Discovery)</span>
              </button>
            </div>
          </div>
        </ScrollReveal>

        {activeMode === "calendar" ? (
          <div className="max-w-4xl mx-auto mb-16">
            <PartnerBookingWidget />
          </div>
        ) : (
          /* Form and Hub Details Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Left: Consultation Form (7 cols) */}
            <ScrollReveal variant="fade-up" delay={0.1} duration={0.65} className="lg:col-span-7 bg-white/90 dark:bg-black/45 backdrop-blur-md rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl border border-slate-200/80 dark:border-white/20 text-slate-900 dark:text-white">
              {submitted ? (
              <div className="py-6 space-y-6 text-left">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">{c.successTitle}</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-100 font-medium">
                      {c.successMessage.replace("{name}", formData.fullName)}
                    </p>
                  </div>
                </div>

                {/* AI Agent Diagnostic Card */}
                {aiAssessment && (
                  <div className="p-5 rounded-xl bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/15 space-y-3.5 shadow-md text-slate-900 dark:text-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-[#A33C29] text-white flex items-center justify-center">
                          <Bot className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                          JARVIS AI Preliminary Diagnostic
                        </span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-white/15 text-slate-800 dark:text-white border border-slate-300 dark:border-white/15">
                        {aiAssessment.industryCategory}
                      </span>
                    </div>

                    <div className="space-y-0.5">
                      <div className="text-[10px] font-bold text-slate-500 dark:text-slate-300 uppercase">Consulting Focus Area</div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">{aiAssessment.recommendedConsultingPath}</div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-[10px] font-bold text-slate-500 dark:text-slate-300 uppercase">Key Milestone Focus Points:</div>
                      <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-100 font-medium">
                        {aiAssessment.keyStrategicFocus.map((pt, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-4 h-4 rounded-full bg-[#E25C43]/20 text-[#E25C43] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-200/70 dark:bg-white/10 border border-slate-300 dark:border-white/15 text-[11px] text-slate-700 dark:text-slate-100 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#E25C43] shrink-0" />
                      <span>An executive summary and confirmation email have been dispatched to <strong>{formData.workEmail}</strong>.</span>
                    </div>
                  </div>
                )}

                <div className="text-center pt-2">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setAiAssessment(null);
                      setRecaptchaToken(null);
                      setCaptchaError("");
                      setFormData({
                        fullName: "",
                        workEmail: "",
                        companyName: "",
                        phone: "",
                        serviceOfInterest: "",
                        message: "",
                      });
                    }}
                    className="px-6 py-2 rounded-full bg-[#A33C29] text-white text-xs font-bold hover:bg-[#8E3221] transition-colors shadow-md"
                  >
                    {c.sendAnother}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-0.5 font-display">
                    {c.formTitle}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-200">
                    {c.formSubtitle}
                  </p>
                </div>

                {/* Name & Work Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-200">
                      {c.fullNameLabel}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder={language === "ar" ? "الاسم الكريم" : "Your Name"}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/20 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-300 focus:outline-none focus:border-[#E25C43] transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-200">
                      {c.emailLabel}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.workEmail}
                      onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/20 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-300 focus:outline-none focus:border-[#E25C43] transition-all"
                    />
                  </div>
                </div>

                {/* Company & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-200">
                      {c.companyLabel}
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="Company / Enterprise"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/20 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-300 focus:outline-none focus:border-[#E25C43] transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-200">
                      {c.phoneLabel}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+92 300 000 0000"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/20 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-300 focus:outline-none focus:border-[#E25C43] transition-all"
                    />
                  </div>
                </div>

                {/* Service of Interest Dropdown */}
                <div className="space-y-1 relative" ref={dropdownRef}>
                  <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-200">
                    {c.serviceLabel}
                  </label>
                  
                  <div
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/20 text-xs text-slate-900 dark:text-white cursor-pointer flex items-center justify-between"
                  >
                    <span className={formData.serviceOfInterest ? "text-slate-900 dark:text-white font-medium" : "text-slate-500 dark:text-slate-300"}>
                      {formData.serviceOfInterest || (language === "ar" ? "اختر الخدمة المطلوبة" : "Select Service Area")}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-500 dark:text-slate-300 transition-transform duration-200 ${isDropdownOpen ? "rotate-180 text-[#E25C43]" : ""}`} />
                  </div>

                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1.5 rounded-xl bg-white dark:bg-[#0A1120]/95 backdrop-blur-2xl border border-slate-200 dark:border-white/20 shadow-2xl p-2 z-50 max-h-72 overflow-y-auto space-y-0.5">
                      {allServices.map((srv) => (
                        <div
                          key={srv.id}
                          onClick={() => selectService(srv.title)}
                          className={`px-3 py-2 rounded-lg text-xs flex items-center justify-between cursor-pointer transition-colors ${
                            formData.serviceOfInterest === srv.title
                              ? "bg-slate-200 dark:bg-white/20 text-slate-900 dark:text-white font-bold"
                              : "hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200"
                          }`}
                        >
                          <span>{srv.title}</span>
                          {formData.serviceOfInterest === srv.title && <Check className="w-3.5 h-3.5 text-[#E25C43]" />}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-200">
                    {c.messageLabel}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={language === "ar" ? "اشرح احتياجات مشروعك وأهداف العمل..." : "Briefly describe your requirements or strategic objectives..."}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-white/10 border border-slate-200 dark:border-white/20 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-300 focus:outline-none focus:border-[#E25C43] transition-all resize-none"
                  />
                </div>

                {/* Google reCAPTCHA Security Verification */}
                <div className="pt-1">
                  <GoogleRecaptcha
                    language={language}
                    onVerify={(token) => {
                      setRecaptchaToken(token);
                      if (token) setCaptchaError("");
                    }}
                  />
                  {captchaError && (
                    <p className="text-[11px] text-rose-600 dark:text-rose-400 font-semibold pt-1">
                      {captchaError}
                    </p>
                  )}
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting || !recaptchaToken}
                  className="w-full py-3 rounded-full bg-[#E25C43] hover:bg-[#c94a33] text-white text-xs font-bold transition-all duration-200 shadow-lg flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{isSubmitting ? (language === "ar" ? "جارٍ الإرسال والتحليل الذكي..." : "Submitting & Generating Assessment...") : c.submitButton}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1 rtl:rotate-180" />
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 dark:text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#E25C43]" />
                  <span>{c.confidentialNote}</span>
                </div>
              </form>
            )}
          </ScrollReveal>

          {/* Right: Contact Details (5 cols) */}
          <ScrollReveal variant="fade-up" delay={0.2} duration={0.65} className="lg:col-span-5 space-y-6">
            
            {/* Direct Contact Card */}
            <div className="bg-white/90 dark:bg-black/45 backdrop-blur-md rounded-2xl p-6 sm:p-7 shadow-xl border border-slate-200/80 dark:border-white/20 space-y-4 text-slate-900 dark:text-white">
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
                {c.directContactTitle}
              </h3>
              
              <div className="space-y-3">
                <a
                  href={`mailto:${contactDetails.email}`}
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-white/10 border border-slate-200/80 dark:border-white/20 hover:border-slate-300 dark:hover:border-white/40 transition-colors shadow-xs group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#E25C43]/20 text-[#E25C43] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-300 uppercase font-semibold">
                      {c.corporateEmail}
                    </div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#E25C43] transition-colors">
                      {contactDetails.email}
                    </div>
                  </div>
                </a>

                <a
                  href={`tel:${contactDetails.phone.replace(/\s+/g, '')}`}
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-white/10 border border-slate-200/80 dark:border-white/20 hover:border-slate-300 dark:hover:border-white/40 transition-colors shadow-xs group"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-white/15 text-slate-800 dark:text-white flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-300 uppercase font-semibold">
                      {c.directPhone}
                    </div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#E25C43] transition-colors">
                      {contactDetails.phone}
                    </div>
                  </div>
                </a>

                {/* WhatsApp Quick Direct Connect */}
                <a
                  href={`https://wa.me/${contactDetails.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(language === "ar" ? "مرحباً فاكتشوال سوليوشنز، أود الاستفسار عن استشارات الأعمال." : "Hello Factual Solutions, I would like to inquire about your business consulting services.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-3 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/30 hover:border-emerald-400 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/25 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 fill-current" viewBox="24 24">
                      <path d="M17.472 14.382c-.301-.15-1.781-.879-2.057-.98-.276-.1-.477-.15-.678.15-.201.3-.778.98-.954 1.18-.175.2-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.495-.896-.799-1.501-1.787-1.677-2.088-.175-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.201-.301.301-.502.1-.201.05-.376-.025-.527-.075-.15-.678-1.634-.929-2.237-.245-.588-.494-.508-.678-.517l-.578-.01c-.201 0-.527.075-.803.376s-1.054 1.03-1.054 2.511c0 1.482 1.079 2.912 1.23 3.113.15.201 2.123 3.242 5.143 4.547.718.31 1.279.496 1.716.635.722.23 1.379.197 1.898.12.578-.087 1.781-.728 2.032-1.431.251-.703.251-1.305.175-1.431-.075-.125-.276-.201-.577-.351zM12.042 21.996h-.008a9.93 9.93 0 0 1-5.068-1.391l-.364-.216-3.766.988 1.005-3.67-.237-.378a9.92 9.92 0 0 1-1.523-5.275c0-5.485 4.464-9.95 9.955-9.95 2.657 0 5.155 1.036 7.032 2.915a9.88 9.88 0 0 1 2.913 7.034c0 5.487-4.465 9.953-9.957 9.953z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10px] text-emerald-600 dark:text-emerald-300 uppercase font-semibold">
                      {language === "ar" ? "واتساب المباشر" : "WhatsApp Quick Chat"}
                    </div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {contactDetails.phone}
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Office Locations */}
            <div className="bg-white/90 dark:bg-black/45 backdrop-blur-md rounded-2xl p-6 sm:p-7 shadow-xl border border-slate-200/80 dark:border-white/20 space-y-4 text-slate-900 dark:text-white">
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
                {c.headOfficeTitle}
              </h3>
              
              <div className="space-y-2.5">
                {officeLocations.map((loc) => (
                  <div
                    key={loc.city}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-white/10 border border-slate-200/80 dark:border-white/20 shadow-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#E25C43] shrink-0" />
                        <span>{language === "ar" ? "لاهور، باكستان" : `${loc.city}, ${loc.country}`}</span>
                      </div>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-[#E25C43]/20 text-[#E25C43] border border-[#E25C43]/30">
                        {language === "ar" ? "المقر الرئيسي" : loc.tag}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-200 pl-5 font-medium">
                      {loc.address}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </ScrollReveal>

        </div>
      )}

      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 text-center text-slate-400">Loading Contact...</div>}>
      <ContactContent />
    </Suspense>
  );
}
