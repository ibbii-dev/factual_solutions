"use client";

import React, { useState, useEffect, useRef } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";

interface LanguageOption {
  code: string;
  label: string;
  native: string;
}

const languages: LanguageOption[] = [
  { code: "en", label: "English", native: "English" },
  { code: "ar", label: "Arabic", native: "العربية" },
  { code: "ur", label: "Urdu", native: "اردو" },
  { code: "tr", label: "Turkish", native: "Türkçe" },
  { code: "es", label: "Spanish", native: "Español" },
  { code: "fr", label: "French", native: "Français" },
  { code: "de", label: "German", native: "Deutsch" },
  { code: "zh-CN", label: "Chinese", native: "简体中文" }
];

function FlagIcon({ code, className = "w-4 h-3 rounded-[2px] shadow-xs inline-block shrink-0" }: { code: string; className?: string }) {
  switch (code) {
    case "en":
      return (
        <svg className={className} viewBox="0 0 640 480" aria-hidden="true">
          <g fillRule="evenodd">
            <path fill="#bd3d44" d="M0 0h640v480H0z"/>
            <path stroke="#fff" strokeWidth="37" d="M0 55.4h640M0 129.2h640M0 203h640M0 277h640M0 350.8h640M0 424.6h640"/>
            <path fill="#192f5d" d="M0 0h260v259H0z"/>
            <g fill="#fff">
              <circle cx="36" cy="30" r="10"/>
              <circle cx="98" cy="30" r="10"/>
              <circle cx="160" cy="30" r="10"/>
              <circle cx="222" cy="30" r="10"/>
              <circle cx="67" cy="65" r="10"/>
              <circle cx="129" cy="65" r="10"/>
              <circle cx="191" cy="65" r="10"/>
              <circle cx="36" cy="100" r="10"/>
              <circle cx="98" cy="100" r="10"/>
              <circle cx="160" cy="100" r="10"/>
              <circle cx="222" cy="100" r="10"/>
              <circle cx="67" cy="135" r="10"/>
              <circle cx="129" cy="135" r="10"/>
              <circle cx="191" cy="135" r="10"/>
              <circle cx="36" cy="170" r="10"/>
              <circle cx="98" cy="170" r="10"/>
              <circle cx="160" cy="170" r="10"/>
              <circle cx="222" cy="170" r="10"/>
              <circle cx="67" cy="205" r="10"/>
              <circle cx="129" cy="205" r="10"/>
              <circle cx="191" cy="205" r="10"/>
            </g>
          </g>
        </svg>
      );
    case "ar":
      return (
        <svg className={className} viewBox="0 0 640 480" aria-hidden="true">
          <path fill="#006C35" d="M0 0h640v480H0z"/>
          <path fill="#fff" d="M190 280h260v16H190zm260-2v20l25-10zm-275-8h15v32h-15z"/>
          <path fill="#fff" d="M190 190h260v35H190z" opacity="0.95"/>
          <text x="320" y="218" fill="#006C35" fontSize="24" fontWeight="bold" textAnchor="middle">SA</text>
        </svg>
      );
    case "ur":
      return (
        <svg className={className} viewBox="0 0 640 480" aria-hidden="true">
          <path fill="#01411C" d="M0 0h640v480H0z"/>
          <path fill="#fff" d="M0 0h160v480H0z"/>
          <circle cx="400" cy="240" r="110" fill="#fff"/>
          <circle cx="430" cy="220" r="100" fill="#01411C"/>
          <polygon fill="#fff" points="430,195 440,225 470,225 445,245 455,275 430,255 405,275 415,245 390,225 420,225" transform="scale(0.55) translate(360, 160)"/>
        </svg>
      );
    case "tr":
      return (
        <svg className={className} viewBox="0 0 640 480" aria-hidden="true">
          <path fill="#E30A17" d="M0 0h640v480H0z"/>
          <circle cx="280" cy="240" r="120" fill="#fff"/>
          <circle cx="310" cy="240" r="96" fill="#E30A17"/>
          <polygon fill="#fff" points="360,200 375,235 410,235 380,255 392,290 360,270 328,290 340,255 310,235 345,235" transform="scale(0.5) translate(340, 200)"/>
        </svg>
      );
    case "es":
      return (
        <svg className={className} viewBox="0 0 640 480" aria-hidden="true">
          <path fill="#AA151B" d="M0 0h640v480H0z"/>
          <path fill="#F1BF00" d="M0 120h640v240H0z"/>
        </svg>
      );
    case "fr":
      return (
        <svg className={className} viewBox="0 0 640 480" aria-hidden="true">
          <path fill="#002654" d="M0 0h213.3v480H0z"/>
          <path fill="#fff" d="M213.3 0h213.4v480H213.3z"/>
          <path fill="#ED2939" d="M426.7 0H640v480H426.7z"/>
        </svg>
      );
    case "de":
      return (
        <svg className={className} viewBox="0 0 640 480" aria-hidden="true">
          <path fill="#000" d="M0 0h640v160H0z"/>
          <path fill="#DD0000" d="M0 160h640v160H0z"/>
          <path fill="#FFCE00" d="M0 320h640v160H0z"/>
        </svg>
      );
    case "zh-CN":
      return (
        <svg className={className} viewBox="0 0 640 480" aria-hidden="true">
          <path fill="#DE2910" d="M0 0h640v480H0z"/>
          <polygon fill="#FFDE00" points="130,70 145,115 190,115 155,140 170,185 130,160 90,185 105,140 70,115 115,115"/>
        </svg>
      );
    default:
      return <Globe className={className} />;
  }
}

export default function CustomLanguageSelector() {
  const [currentLang, setCurrentLang] = useState<string>("en");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Helper to read cookies
  const getCookie = (name: string) => {
    if (typeof document === "undefined") return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
    return null;
  };

  useEffect(() => {
    // Check saved language
    const googTransCookie = getCookie("googtrans");
    let activeLang = "en";
    if (googTransCookie) {
      const parts = googTransCookie.split("/");
      const lang = parts[parts.length - 1];
      if (lang) {
        activeLang = lang;
        setCurrentLang(lang);
      }
    }

    // Apply RTL if Arabic or Urdu
    if (activeLang === "ar" || activeLang === "ur") {
      document.documentElement.dir = "rtl";
      document.documentElement.lang = activeLang;
    } else {
      document.documentElement.dir = "ltr";
      document.documentElement.lang = activeLang;
    }

    // Initialize Google Translate Script silently in background
    (window as any).googleTranslateElementInit = () => {
      try {
        if ((window as any).google && (window as any).google.translate) {
          new (window as any).google.translate.TranslateElement(
            {
              pageLanguage: "en",
              autoDisplay: false
            },
            "google_translate_hidden_element"
          );
        }
      } catch (e) {
        console.error("Translate init error:", e);
      }
    };

    if (!document.getElementById("google-translate-hidden-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-hidden-script";
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (langCode: string) => {
    setCurrentLang(langCode);
    setIsOpen(false);

    // Apply RTL/LTR immediately
    if (langCode === "ar" || langCode === "ur") {
      document.documentElement.dir = "rtl";
      document.documentElement.lang = langCode;
    } else {
      document.documentElement.dir = "ltr";
      document.documentElement.lang = langCode;
    }

    // Set cookie across domains and paths
    const domain = window.location.hostname;
    document.cookie = `googtrans=/en/${langCode}; path=/;`;
    document.cookie = `googtrans=/en/${langCode}; path=/; domain=${domain};`;
    document.cookie = `googtrans=/en/${langCode}; path=/; domain=.${domain};`;

    // Trigger select element in Google Translate hidden DOM if present
    const selectElem = document.querySelector("#google_translate_hidden_element select") as HTMLSelectElement | null;
    if (selectElem) {
      selectElem.value = langCode;
      selectElem.dispatchEvent(new Event("change"));
    } else {
      window.location.reload();
    }
  };

  const selectedLanguage = languages.find((l) => l.code === currentLang) || languages[0];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Hidden container for Google Translate engine */}
      <div id="google_translate_hidden_element" className="hidden" aria-hidden="true" />

      {/* Modern Luxury Language Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-xs font-bold transition-all duration-200 text-slate-800 dark:text-white bg-slate-100/90 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 border border-slate-200/80 dark:border-white/20 shadow-xs shrink-0 select-none"
        aria-expanded={isOpen}
      >
        <FlagIcon code={selectedLanguage.code} className="w-4 h-3 rounded-[2px] shadow-xs shrink-0" />
        <span className="font-semibold hidden sm:inline">{selectedLanguage.native}</span>
        <span className="font-bold sm:hidden text-[10px] tracking-wider uppercase">{selectedLanguage.code.slice(0, 2)}</span>
        <ChevronDown className={`w-3 sm:w-3.5 h-3 sm:h-3.5 text-slate-500 dark:text-slate-300 transition-transform duration-200 ${isOpen ? "rotate-180 text-[#E25C43]" : ""}`} />
      </button>

      {/* Modern Luxury Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-white/95 dark:bg-[#0A1120]/95 backdrop-blur-2xl border border-slate-200 dark:border-white/20 shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150 divide-y divide-slate-100 dark:divide-white/10 text-slate-800 dark:text-white">
          <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-300 flex items-center gap-1.5">
            <Globe className="w-3 h-3 text-[#E25C43]" />
            <span>Select Language / اختر اللغة</span>
          </div>

          <div className="py-1 space-y-0.5 max-h-64 overflow-y-auto">
            {languages.map((lang) => {
              const isSelected = currentLang === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => changeLanguage(lang.code)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                    isSelected
                      ? "bg-slate-100 dark:bg-white/20 text-slate-900 dark:text-white font-bold"
                      : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <FlagIcon code={lang.code} className="w-4 h-3 rounded-[2px] shadow-xs shrink-0" />
                    <div className="flex flex-col">
                      <span className="font-bold leading-tight">{lang.native}</span>
                      <span className={`text-[10px] ${isSelected ? "text-slate-600 dark:text-slate-200" : "text-slate-400 dark:text-slate-400"}`}>
                        {lang.label}
                      </span>
                    </div>
                  </div>

                  {isSelected && <Check className="w-3.5 h-3.5 text-[#E25C43] shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
