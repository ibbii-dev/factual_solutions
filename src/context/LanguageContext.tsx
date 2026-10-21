"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Language, translations, TranslationDictionary } from "@/data/translations";
import { RTL_LANGS, clearMachineLang, readMachineLang, setMachineLang } from "@/lib/i18n";
import GoogleTranslateLoader from "@/components/i18n/GoogleTranslateLoader";

interface LanguageContextType {
  /** Language of the site's own content. Always English; other languages are machine-translated. */
  language: Language;
  /** Language the visitor chose in the menu (e.g. "ar", "fr"). */
  activeLanguage: string;
  /** Switch to any language from the menu. */
  selectLanguage: (code: string) => void;
  /** English copy used by the home and page components. */
  t: TranslationDictionary;
  dir: "ltr" | "rtl";
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [machineLang, setMachineLangState] = useState<string | null>(null);

  useEffect(() => {
    setMachineLangState(readMachineLang());
  }, []);

  const selectLanguage = useCallback(
    (code: string) => {
      if (code === "en") {
        if (!machineLang) return;
        // Google has rewritten the page text, so reload to get the original back.
        clearMachineLang();
        window.location.reload();
        return;
      }
      setMachineLang(code);
      window.location.reload();
    },
    [machineLang]
  );

  const activeLanguage = machineLang || "en";
  const isRTL = RTL_LANGS.includes(activeLanguage);

  return (
    <LanguageContext.Provider
      value={{ language: "en", activeLanguage, selectLanguage, t: translations.en, dir: isRTL ? "rtl" : "ltr", isRTL }}
    >
      {children}
      {machineLang && <GoogleTranslateLoader />}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
