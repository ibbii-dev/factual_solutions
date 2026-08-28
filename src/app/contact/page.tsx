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
  Check
} from "lucide-react";
import { officeLocations, contactDetails } from "@/data/companyData";
import { allServices } from "@/data/servicesData";
import { saveInquiry } from "@/data/inquiriesStore";
import { useLanguage } from "@/context/LanguageContext";

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

    // Save locally for instant reactivity
    saveInquiry(payload);

    // Send to backend API
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

  const selectService = (serviceTitle: string) => {
    setFormData((prev) => ({ ...prev, serviceOfInterest: serviceTitle }));
    setIsDropdownOpen(false);
  };

  const businessServicesList = allServices.filter((s) => s.category === "business");
  const consultancyServicesList = allServices.filter((s) => s.category === "consultancy");

  return (
    <div className="pt-28 sm:pt-32 pb-20 sm:pb-24 min-h-screen bg-[#EBF1FA] dark:bg-[#0B1320] text-[#152238] dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-14">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#152238] dark:text-white font-display">
            {c.headline}
          </h1>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {c.subheadline}
          </p>
        </div>

        {/* Form and Hub Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left: Consultation Form (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-[#111C2E] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm border border-[#8EA9D3]/30 dark:border-slate-800">
            {submitted ? (
              <div className="text-center py-10 space-y-5">
                <div className="w-14 h-14 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#152238] dark:text-white font-display">
                    {c.successTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                    {c.successMessage.replace("{name}", formData.fullName)}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      fullName: "",
                      workEmail: "",
                      companyName: "",
                      phone: "",
                      serviceOfInterest: "",
                      message: "",
                    });
                  }}
                  className="px-6 py-2.5 rounded-xl bg-brand-rust text-white text-xs font-semibold hover:bg-brand-rust-light transition-colors shadow-sm"
                >
                  {c.sendAnother}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#152238] dark:text-white mb-1 font-display">
                    {c.formTitle}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {c.formSubtitle}
                  </p>
                </div>

                {/* Name & Work Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#152238] dark:text-slate-300">
                      {c.fullNameLabel}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder={language === "ar" ? "الاسم الكريم" : "Your Name"}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F2F7FD] dark:bg-[#15233A] border border-[#8EA9D3]/40 dark:border-slate-700 text-sm text-[#152238] dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#152238] dark:focus:border-brand-steel transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#152238] dark:text-slate-300">
                      {c.emailLabel}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.workEmail}
                      onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F2F7FD] dark:bg-[#15233A] border border-[#8EA9D3]/40 dark:border-slate-700 text-sm text-[#152238] dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#152238] dark:focus:border-brand-steel transition-all"
                    />
                  </div>
                </div>

                {/* Company & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#152238] dark:text-slate-300">
                      {c.companyLabel}
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder={language === "ar" ? "اسم الشركة أو المشروع" : "Your Business or Firm"}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F2F7FD] dark:bg-[#15233A] border border-[#8EA9D3]/40 dark:border-slate-700 text-sm text-[#152238] dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#152238] dark:focus:border-brand-steel transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#152238] dark:text-slate-300">
                      {c.phoneLabel}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+92 345 0000000"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F2F7FD] dark:bg-[#15233A] border border-[#8EA9D3]/40 dark:border-slate-700 text-sm text-[#152238] dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#152238] dark:focus:border-brand-steel transition-all"
                    />
                  </div>
                </div>

                {/* Custom Mobile-Friendly Custom Service Dropdown */}
                <div className="space-y-1.5 relative" ref={dropdownRef}>
                  <label className="text-xs font-semibold text-[#152238] dark:text-slate-300">
                    {c.serviceLabel}
                  </label>
                  
                  {/* Dropdown Trigger */}
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F2F7FD] dark:bg-[#15233A] border border-[#8EA9D3]/40 dark:border-slate-700 text-sm text-start flex items-center justify-between text-[#152238] dark:text-white focus:outline-none focus:border-[#152238] dark:focus:border-brand-steel transition-all"
                  >
                    <span className={formData.serviceOfInterest ? "text-[#152238] dark:text-white font-semibold" : "text-slate-400"}>
                      {formData.serviceOfInterest || c.servicePlaceholder}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${isDropdownOpen ? "rotate-180 text-brand-rust" : ""}`} />
                  </button>

                  {/* Custom Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1.5 z-50 bg-white dark:bg-[#101826] border border-[#8EA9D3]/40 dark:border-slate-700 rounded-2xl shadow-2xl max-h-72 overflow-y-auto p-2 space-y-3 divide-y divide-slate-100 dark:divide-slate-800">
                      
                      {/* Business Solutions Group */}
                      <div className="space-y-1 pt-1 first:pt-0">
                        <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#152238] dark:text-brand-steel-light flex items-center gap-1.5 font-display">
                          <Briefcase className="w-3.5 h-3.5" />
                          <span>{t.nav.businessSolutions}</span>
                        </div>
                        {businessServicesList.map((service) => (
                          <button
                            key={service.id}
                            type="button"
                            onClick={() => selectService(service.title)}
                            className={`w-full text-start px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors flex items-center justify-between ${
                              formData.serviceOfInterest === service.title
                                ? "bg-[#152238] text-white"
                                : "text-slate-800 dark:text-slate-200 hover:bg-[#F2F7FD] dark:hover:bg-[#1E3150]/60"
                            }`}
                          >
                            <span>{service.title}</span>
                            {formData.serviceOfInterest === service.title && (
                              <Check className="w-4 h-4 text-brand-steel-light shrink-0" />
                            )}
                          </button>
                        ))}
                      </div>

                      {/* Consultancy Advisory Group */}
                      <div className="space-y-1 pt-2">
                        <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-rust dark:text-brand-rust-light flex items-center gap-1.5 font-display">
                          <Compass className="w-3.5 h-3.5" />
                          <span>{t.nav.consultancyServices}</span>
                        </div>
                        {consultancyServicesList.map((service) => (
                          <button
                            key={service.id}
                            type="button"
                            onClick={() => selectService(service.title)}
                            className={`w-full text-start px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors flex items-center justify-between ${
                              formData.serviceOfInterest === service.title
                                ? "bg-brand-rust text-white"
                                : "text-slate-800 dark:text-slate-200 hover:bg-[#F2F7FD] dark:hover:bg-[#1E3150]/60"
                            }`}
                          >
                            <span>{service.title}</span>
                            {formData.serviceOfInterest === service.title && (
                              <Check className="w-4 h-4 text-white shrink-0" />
                            )}
                          </button>
                        ))}
                      </div>

                    </div>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#152238] dark:text-slate-300">
                    {c.messageLabel}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={c.messagePlaceholder}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F2F7FD] dark:bg-[#15233A] border border-[#8EA9D3]/40 dark:border-slate-700 text-sm text-[#152238] dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#152238] dark:focus:border-brand-steel transition-all"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-brand-rust hover:bg-brand-rust-light text-white text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span>{c.submittingButton}</span>
                  ) : (
                    <>
                      <span>{c.submitButton}</span>
                      <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-xs text-slate-600 dark:text-slate-400 pt-1">
                  <ShieldCheck className="w-4 h-4 text-[#152238] dark:text-brand-steel-light shrink-0" />
                  <span>{c.confidentialNote}</span>
                </div>

              </form>
            )}
          </div>

          {/* Right: Contact Details & Head Office (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Contact Card */}
            <div className="bg-white dark:bg-[#111C2E] rounded-3xl p-6 sm:p-8 shadow-sm border border-[#8EA9D3]/30 dark:border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-[#152238] dark:text-white uppercase tracking-wider font-display">
                {c.directContactTitle}
              </h3>

              <div className="space-y-3">
                <a
                  href={`tel:${contactDetails.phone}`}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#F2F7FD] dark:bg-[#15233A] hover:bg-[#E2ECF9] transition-colors text-[#152238] dark:text-white font-medium"
                >
                  <div className="w-9 h-9 rounded-xl bg-brand-rust/15 text-brand-rust flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold uppercase">{c.directPhone}</div>
                    <div className="font-bold text-[#152238] dark:text-white">{contactDetails.phone}</div>
                  </div>
                </a>

                <a
                  href={`mailto:${contactDetails.email}`}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#F2F7FD] dark:bg-[#15233A] hover:bg-[#E2ECF9] transition-colors text-[#152238] dark:text-white font-medium"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#8EA9D3]/20 text-[#152238] dark:text-brand-steel-light flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold uppercase">{c.corporateEmail}</div>
                    <div className="font-bold text-[#152238] dark:text-white truncate">{contactDetails.email}</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Head Office Location */}
            <div className="bg-white dark:bg-[#111C2E] rounded-3xl p-6 sm:p-8 shadow-sm border border-[#8EA9D3]/30 dark:border-slate-800 space-y-4">
              <h4 className="text-sm font-bold text-[#152238] dark:text-white uppercase tracking-wider font-display">
                {c.headOfficeTitle}
              </h4>

              <div className="space-y-3">
                {officeLocations.map((loc) => (
                  <div key={loc.city} className="p-3.5 rounded-2xl bg-[#F2F7FD] dark:bg-[#15233A] border border-[#8EA9D3]/20 dark:border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-[#152238] dark:text-white flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-brand-rust" /> {language === "ar" ? "لاهور، باكستان" : `${loc.city}, ${loc.country}`}
                      </span>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#8EA9D3]/20 dark:bg-slate-700 text-[#152238] dark:text-slate-300">
                        {language === "ar" ? "المقر الرئيسي" : loc.tag}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {language === "ar" ? "لاهور، البنجاب، باكستان" : loc.address}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center text-slate-400">Loading contact page...</div>}>
      <ContactContent />
    </Suspense>
  );
}
