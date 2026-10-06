"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { contactDetails, officeLocations } from "@/data/companyData";
import { useLanguage } from "@/context/LanguageContext";
import { 
  ArrowRight, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle2
} from "lucide-react";

const COPY = {
  en: {
    stay: "STAY INFORMED",
    newsTitle: "Practical Insights on Operational Excellence",
    newsText: "Ideas on Lean Six Sigma, strategy, quality, ERP, and digital transformation—straight to your inbox.",
    thanks: "Thank you, you're subscribed.",
    emailPh: "Enter your email",
    emailLabel: "Email address",
    subscribe: "SUBSCRIBE",
    about: "Consulting, training, and digital implementation that help organizations perform better—from strategy to shop floor.",
    whatWeDo: "WHAT WE DO",
    oe: "Operational Excellence",
    sp: "Strategy & Performance",
    qrc: "Quality, Risk & Compliance",
    training: "Training Programs",
    erp: "ERP & Digital Transformation",
    nav: "NAVIGATION",
    aboutUs: "About Us",
    services: "Our Services",
    think: "What We Think",
    blog: "Blog",
    contact: "Contact Us",
    office: "HEAD OFFICE",
    response: "1-Day Response",
    address: "Lahore, Punjab, Pakistan",
    contactCta: "Contact Us & Submit Inquiry",
    rights: "All rights reserved.",
    who: "Who We Are",
    what: "What We Do",
    admin: "Staff Admin",
  },
  ar: {
    stay: "ابقَ على اطلاع",
    newsTitle: "رؤى عملية حول التميز التشغيلي",
    newsText: "أفكار حول لين ستة سيجما والاستراتيجية والجودة وERP والتحول الرقمي، تصلك مباشرة إلى بريدك.",
    thanks: "شكراً لك، تم اشتراكك.",
    emailPh: "أدخل بريدك الإلكتروني",
    emailLabel: "البريد الإلكتروني",
    subscribe: "اشترك",
    about: "استشارات وتدريب وتطبيق رقمي يساعد المؤسسات على تحسين أدائها، من الاستراتيجية إلى أرض المصنع.",
    whatWeDo: "ما نقوم به",
    oe: "التميز التشغيلي",
    sp: "الاستراتيجية والأداء",
    qrc: "الجودة والمخاطر والامتثال",
    training: "البرامج التدريبية",
    erp: "ERP والتحول الرقمي",
    nav: "التنقل",
    aboutUs: "من نحن",
    services: "خدماتنا",
    think: "رؤيتنا",
    blog: "المدونة",
    contact: "تواصل معنا",
    office: "المكتب الرئيسي",
    response: "رد خلال يوم واحد",
    address: "لاهور، البنجاب، باكستان",
    contactCta: "تواصل معنا وأرسل استفسارك",
    rights: "جميع الحقوق محفوظة.",
    who: "من نحن",
    what: "ما نقوم به",
    admin: "دخول الموظفين",
  },
};

export default function Footer() {
  const { language } = useLanguage();
  const c = COPY[language === "ar" ? "ar" : "en"];
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      const emailToSend = email;
      setEmail("");
      try {
        await fetch("/api/newsletter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: emailToSend, source: "Website Footer", website: hp })
        });
      } catch (err) {
        console.error("Newsletter error:", err);
      }
    }
  };

  const linkCls = "text-slate-300 hover:text-white hover:underline underline-offset-4 transition-colors";
  const headCls = "text-[11px] font-semibold text-slate-400 uppercase tracking-[0.14em]";
  const isAr = language === "ar";

  return (
    <footer className="relative bg-ink dark:bg-night-950 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end py-14 sm:py-16 border-b border-white/10">
          <div className="lg:col-span-7 space-y-3">
            <p className={headCls}>{c.stay}</p>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">{c.newsTitle}</h3>
            <p className="text-sm text-slate-400 max-w-xl leading-relaxed">{c.newsText}</p>
          </div>
          <div className="lg:col-span-5">
            {subscribed ? (
              <p className="flex items-center gap-2 text-sm text-white" role="status">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                {c.thanks}
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="relative flex items-stretch border-b border-white/40 focus-within:border-white">
                <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-0 top-0 opacity-0 pointer-events-none -z-10 w-px h-px opacity-0" value={hp} onChange={(e) => setHp(e.target.value)} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={c.emailPh}
                  aria-label={c.emailLabel}
                  className="flex-1 min-w-0 py-3 bg-transparent text-base text-white placeholder:text-slate-500 focus:outline-none"
                />
                <button type="submit" className="ps-4 text-sm font-semibold text-white hover:text-steel-light inline-flex items-center gap-1.5">
                  {c.subscribe}
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-10 py-14">
          <div className="col-span-2 lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3" translate="no" dir="ltr">
              <span className="relative w-9 h-9 shrink-0 bg-white rounded-sm p-1">
                <span className="relative block w-full h-full">
                  <Image sizes="40px" src="/images/logo-symbol.png" alt="" fill className="object-contain" />
                </span>
              </span>
              <span className="text-xl font-bold text-white font-display">Factual Solutions</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">{c.about}</p>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h4 className={headCls}>{c.whatWeDo}</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/services/operational-excellence" className={linkCls}>{c.oe}</Link></li>
              <li><Link href="/services/strategy-performance" className={linkCls}>{c.sp}</Link></li>
              <li><Link href="/services/quality-risk-compliance" className={linkCls}>{c.qrc}</Link></li>
              <li><Link href="/services?line=training#training" className={linkCls}>{c.training}</Link></li>
              <li><Link href="/services/erp-implementation" className={linkCls}>{c.erp}</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h4 className={headCls}>{c.nav}</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/about" className={linkCls}>{c.aboutUs}</Link></li>
              <li><Link href="/services" className={linkCls}>{c.services}</Link></li>
              <li><Link href="/what-we-think" className={linkCls}>{c.think}</Link></li>
              <li><Link href="/blog" className={linkCls}>{c.blog}</Link></li>
              <li><Link href="/contact" className={linkCls}>{c.contact}</Link></li>
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-3 space-y-4">
            <h4 className={headCls}>{c.office}</h4>
            <address className="not-italic space-y-2.5 text-sm text-slate-300">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{isAr ? c.address : officeLocations[0].address}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-slate-500 shrink-0" aria-hidden="true" />
                <a href={`tel:${contactDetails.phone.replace(/\s/g, "")}`} dir="ltr" className="hover:text-white">{contactDetails.phone}</a>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-slate-500 shrink-0" aria-hidden="true" />
                <a href={`mailto:${contactDetails.email}`} className="hover:text-white break-all">{contactDetails.email}</a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom line */}
        <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>&copy; {new Date().getFullYear()} <span translate="no">Factual Solutions</span>. {c.rights}</p>
          <Link href="/admin" className="hover:text-white transition-colors">{c.admin}</Link>
        </div>
      </div>
    </footer>
  );
}
