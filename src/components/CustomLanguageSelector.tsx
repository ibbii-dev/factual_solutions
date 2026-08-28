"use client";

import React, { useState, useEffect, useRef } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";

interface LanguageOption {
  code: string;
  label: string;
  native: string;
  flag: string;
}

const languages: LanguageOption[] = [
  { code: "en", label: "English", native: "English", flag: "🇺🇸" },
  { code: "ar", label: "Arabic", native: "العربية", flag: "🇸🇦" },
  { code: "ur", label: "Urdu", native: "اردو", flag: "🇵🇰" },
  { code: "tr", label: "Turkish", native: "Türkçe", flag: "🇹🇷" },
  { code: "es", label: "Spanish", native: "Español", flag: "🇪🇸" },
  { code: "fr", label: "French", native: "Français", flag: "🇫🇷" },
  { code: "de", label: "German", native: "Deutsch", flag: "🇩🇪" },
  { code: "zh-CN", label: "Chinese", native: "简体中文", flag: "🇨🇳" }
];

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
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 text-[#152238] dark:text-white bg-[#8EA9D3]/20 dark:bg-white/10 hover:bg-[#8EA9D3]/30 dark:hover:bg-white/20 border border-[#8EA9D3]/30 dark:border-white/10 shadow-sm"
        aria-expanded={isOpen}
      >
        <span className="text-sm">{selectedLanguage.flag}</span>
        <span className="font-semibold">{selectedLanguage.native}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-500 dark:text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180 text-brand-rust" : ""}`} />
      </button>

      {/* Modern Luxury Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-white dark:bg-[#0E182A] border border-[#8EA9D3]/30 dark:border-slate-700/80 shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150 divide-y divide-slate-100 dark:divide-slate-800/60">
          <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Globe className="w-3 h-3 text-brand-rust" />
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
                      ? "bg-[#152238] text-white dark:bg-brand-rust dark:text-white"
                      : "text-[#152238] dark:text-slate-200 hover:bg-[#F2F7FD] dark:hover:bg-[#1A2942]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{lang.flag}</span>
                    <div className="flex flex-col">
                      <span className="font-bold leading-tight">{lang.native}</span>
                      <span className={`text-[10px] ${isSelected ? "text-slate-300" : "text-slate-400"}`}>
                        {lang.label}
                      </span>
                    </div>
                  </div>

                  {isSelected && <Check className="w-3.5 h-3.5 text-brand-steel-light dark:text-white shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
