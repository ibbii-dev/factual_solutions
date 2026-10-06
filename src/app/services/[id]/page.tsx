"use client";

import React, { useRef, useState } from "react";
import GoogleRecaptcha, { GoogleRecaptchaHandle, RECAPTCHA_ENABLED } from "@/components/ui/GoogleRecaptcha";
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
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [formError, setFormError] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const recaptchaRef = useRef<GoogleRecaptchaHandle>(null);

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isAr = language === "ar";
    if (RECAPTCHA_ENABLED && !recaptchaToken) {
      setFormError(isAr ? "يرجى تأكيد التحقق الأمني (أنا لست روبوتاً) قبل الإرسال." : "Please tick \"I'm not a robot\" before sending.");
      return;
    }
    setFormError("");
    setIsSubmitting(true);

    const payload = {
      fullName: formData.name,
      workEmail: formData.email,
      phone: formData.phone,
      companyName: formData.company,
      serviceOfInterest: service?.title || "Specific Service Inquiry",
      message: formData.message || `Direct consultation request for ${service?.title}`
    };

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, recaptchaToken, website: honeypot })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success === false) {
        recaptchaRef.current?.reset();
        setRecaptchaToken(null);
        setFormError(data.message || (isAr ? "تعذر إرسال الطلب. حاول مرة أخرى." : "We couldn't send your request. Please try again."));
        setIsSubmitting(false);
        return;
      }
      saveInquiry(payload);
    } catch (err) {
      console.error("API error:", err);
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
      setFormError(isAr ? "تعذر الاتصال. حاول مرة أخرى." : "Connection problem. Please try again.");
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    setSubmitted(true);
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

  const h2 = "text-2xl sm:text-3xl font-bold font-display text-ink dark:text-white";
  const sectionCls = "border-t border-ink/15 dark:border-white/15 pt-8 space-y-5";

  return (
    <div className="pb-20 sm:pb-28 min-h-screen text-ink dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="pt-32 sm:pt-40 pb-12 border-b border-ink/15 dark:border-white/15 mb-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <nav aria-label="Breadcrumb" className="lg:col-span-3 text-sm text-slate-500 dark:text-slate-400 pt-3 space-x-2 rtl:space-x-reverse">
            <Link href="/" className="hover:text-ink dark:hover:text-white">{labels.breadcrumbHome}</Link>
            <span aria-hidden="true">/</span>
            <Link href="/services" className="hover:text-ink dark:hover:text-white">{labels.breadcrumbServices}</Link>
          </nav>
          <div className="lg:col-span-9 space-y-6">
            <p className="eyebrow">{pillar?.title}</p>
            <h1 className="text-[2.4rem] sm:text-6xl font-bold font-display tracking-[-0.02em] leading-[1.05] max-w-4xl">{service.title}</h1>
            <p className="lede text-slate-700 dark:text-slate-300 max-w-2xl">{service.shortDescription}</p>
            <dl className="flex flex-wrap gap-x-10 gap-y-3 pt-2 text-sm">
              <div>
                <dt className="text-slate-500 dark:text-slate-400">{labels.statsTimeline}</dt>
                <dd className="font-semibold">{service.duration}</dd>
              </div>
              <div>
                <dt className="text-slate-500 dark:text-slate-400">{labels.statsDeliverables}</dt>
                <dd className="font-semibold">{service.deliverables.length} {language === "ar" ? "مجالات" : "focus areas"}</dd>
              </div>
            </dl>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
          <div className="lg:col-span-8 space-y-14">
            <section className={sectionCls}>
              <h2 className={h2}>{labels.overviewTitle}</h2>
              <p className="text-base sm:text-[17px] text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl">{service.fullDescription}</p>
              {service.tags.length > 0 && (
                <p className="text-sm text-slate-500 dark:text-slate-400">{service.tags.join(" · ")}</p>
              )}
            </section>

            <section className={sectionCls}>
              <h2 className={h2}>{labels.deliverablesTitle}</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 border-t border-ink/10 dark:border-white/10">
                {service.deliverables.map((del, dIdx) => (
                  <li key={dIdx} className="flex gap-4 py-3.5 border-b border-ink/10 dark:border-white/10 text-[15px] text-ink dark:text-white">
                    <span className="section-no text-xs w-6 shrink-0 pt-0.5">{String(dIdx + 1).padStart(2, "0")}</span>
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </section>

            {service.executionPhases && service.executionPhases.length > 0 && (
              <section className={sectionCls}>
                <h2 className={h2}>{labels.phasesTitle}</h2>
                <ol className="space-y-6">
                  {service.executionPhases.map((phase, pIdx) => (
                    <li key={pIdx} className="grid grid-cols-12 gap-4">
                      <span className="col-span-2 sm:col-span-1 section-no text-xl">{phase.phase}</span>
                      <div className="col-span-10 sm:col-span-11 space-y-1">
                        <h3 className="text-lg font-bold font-display text-ink dark:text-white">{phase.title}</h3>
                        <p className="text-[15px] text-slate-700 dark:text-slate-300 leading-relaxed">{phase.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            <section className={sectionCls}>
              <h2 className={h2}>{labels.idealForTitle}</h2>
              <p className="text-base sm:text-[17px] text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl">{service.idealFor}</p>
            </section>
          </div>

          {/* Right Sidebar: Direct Consultation Form (4 cols) */}
          <aside className="lg:col-span-4 space-y-12 lg:sticky lg:top-28">
            
            <div className="border-t-2 border-ink dark:border-white pt-6 space-y-5 text-ink dark:text-white">
              <div>
                <h3 className="text-xl font-bold text-ink dark:text-white font-display">
                  {labels.sidebarTitle}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                  {labels.sidebarDesc}
                </p>
              </div>

              {submitted ? (
                <div className="py-4 space-y-2" role="status">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  <h4 className="text-xs font-bold text-ink dark:text-white">
                    {labels.successTitle}
                  </h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-200">
                    {labels.successDesc}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleQuickSubmit} className="space-y-5">
                  <div className="space-y-1">
                    <label className="text-[13px] font-medium text-slate-600 dark:text-slate-400">
                      {labels.inputName}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={language === "ar" ? "الاسم" : "Your Name"}
                      className="w-full px-0 py-2 bg-transparent border-0 border-b border-ink/25 dark:border-white/25 text-[15px] text-ink dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-ink dark:focus:border-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[13px] font-medium text-slate-600 dark:text-slate-400">
                      {labels.inputEmail}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full px-0 py-2 bg-transparent border-0 border-b border-ink/25 dark:border-white/25 text-[15px] text-ink dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-ink dark:focus:border-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[13px] font-medium text-slate-600 dark:text-slate-400">
                      {labels.inputPhone}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+92 345 0000000"
                      className="w-full px-0 py-2 bg-transparent border-0 border-b border-ink/25 dark:border-white/25 text-[15px] text-ink dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-ink dark:focus:border-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[13px] font-medium text-slate-600 dark:text-slate-400">
                      {labels.inputCompany}
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder={language === "ar" ? "اسم الشركة" : "Company / Firm"}
                      className="w-full px-0 py-2 bg-transparent border-0 border-b border-ink/25 dark:border-white/25 text-[15px] text-ink dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-ink dark:focus:border-white"
                    />
                  </div>

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
                      if (token) setFormError("");
                    }}
                  />
                  {formError && (
                    <p role="alert" className="text-[11px] text-rose-700 dark:text-rose-300 font-semibold">
                      {formError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting || (RECAPTCHA_ENABLED && !recaptchaToken)}
                    className="w-full py-3.5 px-4 bg-ink hover:bg-navy dark:bg-white dark:text-ink disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2"
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

                  <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-accent shrink-0" />
                    <span>{labels.confidential}</span>
                  </div>
                </form>
              )}
            </div>

            {/* Related */}
            <div className="space-y-3">
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{labels.relatedTitle}</h4>
              <ul className="border-t border-ink/15 dark:border-white/15">
                {relatedServices.map((rel) => (
                  <li key={rel.id} className="border-b border-ink/10 dark:border-white/10">
                    <Link href={`/services/${rel.id}`} className="group flex items-center justify-between gap-3 py-3 text-[15px] text-ink dark:text-white hover:text-accent">
                      <span>{rel.title}</span>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-accent rtl:rotate-180 shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </aside>

        </div>

      </div>
    </div>
  );
}
