"use client";

import React from "react";
import { contactDetails } from "@/data/companyData";
import { useLanguage } from "@/context/LanguageContext";

export default function WhatsAppButton() {
  const { language } = useLanguage();

  // Clean phone number for WhatsApp wa.me link
  const rawPhone = contactDetails.phone.replace(/[^0-9]/g, "");
  const defaultMessage = language === "ar" 
    ? "مرحباً فاكتشوال سوليوشنز، أود الاستفسار عن خدمات الاستشارات وتخطيط الأعمال."
    : "Hello Factual Solutions, I would like to inquire about your business consulting services.";

  const whatsappUrl = `https://wa.me/${rawPhone}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div className="fixed bottom-5 left-5 sm:bottom-7 sm:left-7 z-50 flex flex-col items-start print:hidden">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-2.5 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-full bg-white/95 dark:bg-gradient-to-r dark:from-[#10192A] dark:to-[#15243E] border border-slate-200/90 dark:border-brand-steel/40 text-[#152238] dark:text-white shadow-xl shadow-slate-200/60 dark:shadow-2xl dark:shadow-black/60 hover:border-emerald-500 dark:hover:border-emerald-400/80 transition-all duration-300 hover:scale-105 backdrop-blur-md"
        aria-label="Contact Factual Solutions on WhatsApp"
      >
        {/* Pulsating Online Status Dot */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white dark:border-[#10192A]"></span>
        </span>

        {/* WhatsApp Icon with Brand Accent */}
        <div className="w-8 h-8 rounded-full bg-emerald-500/15 dark:bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
          <svg
            className="w-4 h-4 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.301-.15-1.781-.879-2.057-.98-.276-.1-.477-.15-.678.15-.201.3-.778.98-.954 1.18-.175.2-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.495-.896-.799-1.501-1.787-1.677-2.088-.175-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.201-.301.301-.502.1-.201.05-.376-.025-.527-.075-.15-.678-1.634-.929-2.237-.245-.588-.494-.508-.678-.517l-.578-.01c-.201 0-.527.075-.803.376s-1.054 1.03-1.054 2.511c0 1.482 1.079 2.912 1.23 3.113.15.201 2.123 3.242 5.143 4.547.718.31 1.279.496 1.716.635.722.23 1.379.197 1.898.12.578-.087 1.781-.728 2.032-1.431.251-.703.251-1.305.175-1.431-.075-.125-.276-.201-.577-.351zM12.042 21.996h-.008a9.93 9.93 0 0 1-5.068-1.391l-.364-.216-3.766.988 1.005-3.67-.237-.378a9.92 9.92 0 0 1-1.523-5.275c0-5.485 4.464-9.95 9.955-9.95 2.657 0 5.155 1.036 7.032 2.915a9.88 9.88 0 0 1 2.913 7.034c0 5.487-4.465 9.953-9.957 9.953z" />
          </svg>
        </div>

        {/* Brand Text - Simple, clean "WhatsApp" */}
        <span className="text-xs sm:text-sm font-semibold tracking-wide text-slate-800 dark:text-slate-100 pr-1">
          {language === "ar" ? "واتساب" : "WhatsApp"}
        </span>
      </a>
    </div>
  );
}
