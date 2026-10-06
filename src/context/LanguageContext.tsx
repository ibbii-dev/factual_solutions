"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Language, translations, TranslationDictionary } from "@/data/translations";
import {
  LANG_STORAGE_KEY,
  RTL_LANGS,
  clearMachineLang,
  readMachineLang,
  setMachineLang,
} from "@/lib/i18n";
import GoogleTranslateLoader from "@/components/i18n/GoogleTranslateLoader";

interface LanguageContextType {
  /** Language of the site's own content: "en" or "ar". */
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  /** Language the visitor chose in the menu (may be a machine-translated one, e.g. "fr"). */
  activeLanguage: string;
  /** Switch to any language from the menu. */
  selectLanguage: (code: string) => void;
  t: TranslationDictionary;
  dir: "ltr" | "rtl";
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function applyDocumentLang(code: string) {
  const el = document.documentElement;
  el.lang = code;
  el.dir = RTL_LANGS.includes(code) ? "rtl" : "ltr";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [machineLang, setMachineLangState] = useState<string | null>(null);

  useEffect(() => {
    let machine = readMachineLang();
    let saved = localStorage.getItem(LANG_STORAGE_KEY) as Language | null;

    // Arabic used to go through Google Translate; it now has hand-written content.
    if (machine === "ar") {
      clearMachineLang();
      machine = null;
      saved = "ar";
      localStorage.setItem(LANG_STORAGE_KEY, "ar");
    }

    if (machine) {
      setMachineLangState(machine);
      setLanguageState("en");
      applyDocumentLang(machine);
    } else {
      const lang: Language = saved === "ar" ? "ar" : "en";
      setLanguageState(lang);
      applyDocumentLang(lang);
    }
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {}
    applyDocumentLang(lang);
  }, []);

  const selectLanguage = useCallback(
    (code: string) => {
      if (code === "en" || code === "ar") {
        if (machineLang) {
          // Leaving a machine translation: Google has rewritten the page text,
          // so reload to get the original content back.
          clearMachineLang();
          try {
            localStorage.setItem(LANG_STORAGE_KEY, code);
          } catch {}
          window.location.reload();
          return;
        }
        setLanguage(code);
        return;
      }
      // Machine-translated languages translate the English content.
      try {
        localStorage.setItem(LANG_STORAGE_KEY, "en");
      } catch {}
      setMachineLang(code);
      window.location.reload();
    },
    [machineLang, setLanguage]
  );

  const toggleLanguage = useCallback(() => selectLanguage(language === "en" ? "ar" : "en"), [language, selectLanguage]);

  const isRTL = language === "ar";

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        activeLanguage: machineLang || language,
        selectLanguage,
        t: translations[language],
        dir: isRTL ? "rtl" : "ltr",
        isRTL,
      }}
    >
      {children}
      {machineLang && <GoogleTranslateLoader />}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
