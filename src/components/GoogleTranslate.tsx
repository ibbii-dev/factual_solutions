"use client";

import React, { useEffect } from "react";

export default function GoogleTranslate() {
  useEffect(() => {
    // Define the initialization function globally so the script can find it
    (window as any).googleTranslateElementInit = () => {
      try {
        if ((window as any).google && (window as any).google.translate) {
          new (window as any).google.translate.TranslateElement(
            { 
              pageLanguage: "en",
              includedLanguages: "ar,ur,en,tr,es,fr,de,zh-CN",
              autoDisplay: false
            },
            "google_translate_element"
          );
        }
      } catch (err) {
        console.error("Google Translate Init error", err);
      }
    };

    // Check if script already exists to avoid duplicate injections
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else if ((window as any).googleTranslateElementInit) {
      (window as any).googleTranslateElementInit();
    }
  }, []);

  return (
    <div className="google-translate-wrapper inline-flex items-center">
      <div id="google_translate_element" className="notranslate" />
    </div>
  );
}
