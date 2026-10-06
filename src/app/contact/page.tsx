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
import PageHeader from "@/components/ui/PageHeader";
import PartnerBookingWidget from "@/components/calendar/PartnerBookingWidget";
import GoogleRecaptcha, { GoogleRecaptchaHandle, RECAPTCHA_ENABLED } from "@/components/ui/GoogleRecaptcha";

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
  const [honeypot, setHoneypot] = useState("");
  const recaptchaRef = useRef<GoogleRecaptchaHandle>(null);

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

    if (RECAPTCHA_ENABLED && !recaptchaToken) {
      setCaptchaError(
        language === "ar"
          ? "يرجى تأكيد التحقق الأمني (أنا لست روبوتاً) قبل الإرسال."
          : "Please tick \"I'm not a robot\" before sending."
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

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, recaptchaToken, website: honeypot }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success === false) {
        recaptchaRef.current?.reset();
        setRecaptchaToken(null);
        setCaptchaError(
          data.message ||
            (language === "ar" ? "تعذر إرسال الرسالة. حاول مرة أخرى." : "We couldn't send your message. Please try again.")
        );
        setIsSubmitting(false);
        return;
      }
      saveInquiry(payload);
      if (data.aiAssessment) {
        setAiAssessment(data.aiAssessment);
      }
    } catch (err) {
      console.error("API error:", err);
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
      setCaptchaError(
        language === "ar" ? "تعذر الاتصال. تحقق من الإنترنت وحاول مرة أخرى." : "Connection problem. Please check your internet and try again."
      );
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const selectService = (serviceTitle: string) => {
    setFormData((prev) => ({ ...prev, serviceOfInterest: serviceTitle }));
    setIsDropdownOpen(false);
  };

  return (
    <div className="pb-20 sm:pb-24 min-h-screen text-ink dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <PageHeader eyebrow={language === "ar" ? "تواصل معنا" : "Contact us"} title={c.headline} lede={c.subheadline}>
          <div className="flex flex-wrap gap-x-8 gap-y-2 pt-2" role="tablist">
            {([["inquiry", language === "ar" ? "أرسل رسالة" : "Send a message"], ["calendar", language === "ar" ? "احجز نقاشاً" : "Book a discussion"]] as const).map(([mode, label]) => (
              <button
                key={mode}
                type="button"
                role="tab"
                aria-selected={activeMode === mode}
                onClick={() => setActiveMode(mode)}
                className={`py-1 text-[15px] border-b transition-colors ${
                  activeMode === mode
                    ? "border-ink text-ink dark:border-white dark:text-white font-semibold"
                    : "border-transparent text-slate-500 hover:text-ink dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </PageHeader>

        {activeMode === "calendar" ? (
          <div className="max-w-4xl mb-16">
            <PartnerBookingWidget />
          </div>
        ) : (
          /* Form and Hub Details Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start mb-16">
            
            {/* Left: Consultation Form (7 cols) */}
            <div className="lg:col-span-7 text-ink dark:text-white">
              {submitted ? (
              <div className="py-6 space-y-6 text-left">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-ink dark:text-white">{c.successTitle}</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-100 font-medium">
                      {c.successMessage.replace("{name}", formData.fullName)}
                    </p>
                  </div>
                </div>

                {/* AI Agent Diagnostic Card */}
                {aiAssessment && (
                  <div className="p-5 rounded-xl bg-navy-50 dark:bg-white/10 border border-slate-200 dark:border-white/15 space-y-3.5 shadow-md text-ink dark:text-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-rust text-white flex items-center justify-center">
                          <Bot className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-bold text-ink dark:text-white uppercase tracking-wider">
                          Preliminary Assessment
                        </span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-white/15 text-ink dark:text-white border border-slate-300 dark:border-white/15">
                        {aiAssessment.industryCategory}
                      </span>
                    </div>

                    <div className="space-y-0.5">
                      <div className="text-[10px] font-bold text-slate-500 dark:text-slate-300 uppercase">Consulting Focus Area</div>
                      <div className="text-xs font-bold text-ink dark:text-white">{aiAssessment.recommendedConsultingPath}</div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-[10px] font-bold text-slate-500 dark:text-slate-300 uppercase">Key Milestone Focus Points:</div>
                      <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-100 font-medium">
                        {aiAssessment.keyStrategicFocus.map((pt, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-4 h-4 rounded-full bg-rust/20 text-accent font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-200/70 dark:bg-white/10 border border-slate-300 dark:border-white/15 text-[11px] text-slate-700 dark:text-slate-100 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-accent shrink-0" />
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
                    className="px-6 py-2 rounded-xl bg-rust text-white text-xs font-bold hover:bg-rust-dark transition-colors shadow-cta"
                  >
                    {c.sendAnother}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-7">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-ink dark:text-white mb-2 font-display">
                    {c.formTitle}
                  </h2>
                  <p className="text-[15px] text-slate-600 dark:text-slate-400">
                    {c.formSubtitle}
                  </p>
                </div>

                {/* Name & Work Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                  <div className="space-y-1">
                    <label className="text-[13px] font-medium text-slate-600 dark:text-slate-400">
                      {c.fullNameLabel}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder={language === "ar" ? "الاسم الكريم" : "Your Name"}
                      className="w-full px-0 py-2.5 bg-transparent border-0 border-b border-ink/25 dark:border-white/25 text-[15px] text-ink dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-ink dark:focus:border-white transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[13px] font-medium text-slate-600 dark:text-slate-400">
                      {c.emailLabel}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.workEmail}
                      onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full px-0 py-2.5 bg-transparent border-0 border-b border-ink/25 dark:border-white/25 text-[15px] text-ink dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-ink dark:focus:border-white transition-colors"
                    />
                  </div>
                </div>

                {/* Company & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                  <div className="space-y-1">
                    <label className="text-[13px] font-medium text-slate-600 dark:text-slate-400">
                      {c.companyLabel}
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="Company / Enterprise"
                      className="w-full px-0 py-2.5 bg-transparent border-0 border-b border-ink/25 dark:border-white/25 text-[15px] text-ink dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-ink dark:focus:border-white transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[13px] font-medium text-slate-600 dark:text-slate-400">
                      {c.phoneLabel}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+92 300 000 0000"
                      className="w-full px-0 py-2.5 bg-transparent border-0 border-b border-ink/25 dark:border-white/25 text-[15px] text-ink dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-ink dark:focus:border-white transition-colors"
                    />
                  </div>
                </div>

                {/* Service of Interest Dropdown */}
                <div className="space-y-1 relative" ref={dropdownRef}>
                  <label className="text-[13px] font-medium text-slate-600 dark:text-slate-400">
                    {c.serviceLabel}
                  </label>
                  
                  <div
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full py-2.5 bg-transparent border-b border-ink/25 dark:border-white/25 text-[15px] text-ink dark:text-white cursor-pointer flex items-center justify-between"
                  >
                    <span className={formData.serviceOfInterest ? "text-ink dark:text-white font-medium" : "text-slate-500 dark:text-slate-300"}>
                      {formData.serviceOfInterest || (language === "ar" ? "اختر الخدمة المطلوبة" : "Select Service Area")}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-500 dark:text-slate-300 transition-transform duration-200 ${isDropdownOpen ? "rotate-180 text-accent" : ""}`} />
                  </div>

                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-canvas dark:bg-night-900 border border-ink/10 dark:border-white/15 shadow-lg p-1 z-50 max-h-72 overflow-y-auto">
                      {allServices.map((srv) => (
                        <div
                          key={srv.id}
                          onClick={() => selectService(srv.title)}
                          className={`px-3 py-2 text-sm flex items-center justify-between cursor-pointer transition-colors ${
                            formData.serviceOfInterest === srv.title
                              ? "bg-slate-200 dark:bg-white/20 text-ink dark:text-white font-bold"
                              : "hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200"
                          }`}
                        >
                          <span>{srv.title}</span>
                          {formData.serviceOfInterest === srv.title && <Check className="w-3.5 h-3.5 text-accent" />}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="text-[13px] font-medium text-slate-600 dark:text-slate-400">
                    {c.messageLabel}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={language === "ar" ? "اشرح احتياجات مشروعك وأهداف العمل..." : "Briefly describe your requirements or strategic objectives..."}
                    className="w-full px-0 py-2.5 bg-transparent border-0 border-b border-ink/25 dark:border-white/25 text-[15px] text-ink dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-ink dark:focus:border-white transition-colors resize-none"
                  />
                </div>

                {/* Google reCAPTCHA Security Verification */}
                <div className="pt-1">
                  {/* Honeypot: hidden from people, bots fill it in */}
                  <div aria-hidden="true" className="absolute left-0 top-0 opacity-0 pointer-events-none -z-10 w-px h-px overflow-hidden">
                    <label>
                      Website
                      <input type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                    </label>
                  </div>
                  <GoogleRecaptcha
                    ref={recaptchaRef}
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
                  disabled={isSubmitting || (RECAPTCHA_ENABLED && !recaptchaToken)}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-ink hover:bg-navy dark:bg-white dark:text-ink text-white text-sm font-semibold transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{isSubmitting ? (language === "ar" ? "جارٍ الإرسال والتحليل الذكي..." : "Submitting & Generating Assessment...") : c.submitButton}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1 rtl:rotate-180" />
                </button>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                  <span>{c.confidentialNote}</span>
                </div>
              </form>
            )}
          </div>

          {/* Right: direct details, set as a simple list */}
          <aside className="lg:col-span-4 lg:col-start-9 space-y-10 text-ink dark:text-white">
            <div className="space-y-4">
              <h3 className="font-sans text-[11px] uppercase font-semibold tracking-[0.14em] text-slate-500 dark:text-slate-400">{c.directContactTitle}</h3>
              <dl className="border-t border-ink/15 dark:border-white/15">
                <div className="py-4 border-b border-ink/10 dark:border-white/10">
                  <dt className="text-[13px] text-slate-500 dark:text-slate-400">{c.corporateEmail}</dt>
                  <dd><a href={`mailto:${contactDetails.email}`} className="text-[17px] font-semibold hover:underline underline-offset-4 break-all">{contactDetails.email}</a></dd>
                </div>
                <div className="py-4 border-b border-ink/10 dark:border-white/10">
                  <dt className="text-[13px] text-slate-500 dark:text-slate-400">{c.directPhone}</dt>
                  <dd><a href={`tel:${contactDetails.phone.replace(/\s+/g, "")}`} dir="ltr" className="text-[17px] font-semibold hover:underline underline-offset-4">{contactDetails.phone}</a></dd>
                </div>
                <div className="py-4 border-b border-ink/10 dark:border-white/10">
                  <dt className="text-[13px] text-slate-500 dark:text-slate-400">{language === "ar" ? "واتساب" : "WhatsApp"}</dt>
                  <dd>
                    <a
                      href={`https://wa.me/${contactDetails.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(language === "ar" ? "مرحباً فاكتشوال سوليوشنز، أود الاستفسار عن استشارات الأعمال." : "Hello Factual Solutions, I would like to inquire about your business consulting services.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      dir="ltr"
                      className="text-[17px] font-semibold hover:underline underline-offset-4"
                    >
                      {contactDetails.phone}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="space-y-4">
              <h3 className="font-sans text-[11px] uppercase font-semibold tracking-[0.14em] text-slate-500 dark:text-slate-400">{c.headOfficeTitle}</h3>
              {officeLocations.map((loc) => (
                <address key={loc.city} className="not-italic border-t border-ink/15 dark:border-white/15 pt-4 space-y-1">
                  <p className="text-[17px] font-semibold flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true" />
                    {language === "ar" ? "لاهور، باكستان" : `${loc.city}, ${loc.country}`}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 ps-6">{loc.address}</p>
                </address>
              ))}
            </div>
          </aside>

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
