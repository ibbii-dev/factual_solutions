"use client";

import React, { useEffect, useRef, useState } from "react";
import { ShieldCheck, AlertCircle } from "lucide-react";

interface GoogleRecaptchaProps {
  onVerify: (token: string | null) => void;
  language?: string;
  theme?: "light" | "dark";
  className?: string;
}

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      render: (
        container: HTMLElement | string,
        parameters: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: "light" | "dark";
          hl?: string;
        }
      ) => number;
      reset: (widgetId?: number) => void;
      getResponse: (widgetId?: number) => string;
    };
    onGoogleRecaptchaLoad?: () => void;
  }
}

// Google official test key (always passes verification, can be overridden by environment variable)
const DEFAULT_SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";

export default function GoogleRecaptcha({
  onVerify,
  language = "en",
  theme,
  className = "",
}: GoogleRecaptchaProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<number | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Detect dark mode if not explicitly provided
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">(theme || "light");

  useEffect(() => {
    if (theme) {
      setCurrentTheme(theme);
    } else {
      const isDark = document.documentElement.classList.contains("dark");
      setCurrentTheme(isDark ? "dark" : "light");
    }
  }, [theme]);

  useEffect(() => {
    let isMounted = true;

    function renderWidget() {
      if (!isMounted || !containerRef.current || !window.grecaptcha || widgetIdRef.current !== null) {
        return;
      }

      try {
        const widgetId = window.grecaptcha.render(containerRef.current, {
          sitekey: DEFAULT_SITE_KEY,
          theme: currentTheme,
          hl: language === "ar" ? "ar" : "en",
          callback: (token: string) => {
            if (isMounted) onVerify(token);
          },
          "expired-callback": () => {
            if (isMounted) onVerify(null);
          },
          "error-callback": () => {
            if (isMounted) {
              onVerify(null);
              setLoadError(true);
            }
          },
        });
        widgetIdRef.current = widgetId;
        setIsReady(true);
      } catch (err) {
        console.error("reCAPTCHA render error:", err);
      }
    }

    // Load reCAPTCHA script if not already present
    const scriptId = "google-recaptcha-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = `https://www.google.com/recaptcha/api.js?onload=onGoogleRecaptchaLoad&render=explicit&hl=${language === "ar" ? "ar" : "en"}`;
      script.async = true;
      script.defer = true;
      script.onerror = () => {
        if (isMounted) setLoadError(true);
      };

      window.onGoogleRecaptchaLoad = () => {
        if (window.grecaptcha && isMounted) {
          window.grecaptcha.ready(renderWidget);
        }
      };

      document.body.appendChild(script);
    } else if (window.grecaptcha) {
      window.grecaptcha.ready(renderWidget);
    }

    return () => {
      isMounted = false;
      // Note: We don't remove the script on unmount so subsequent pages don't re-download it
      widgetIdRef.current = null;
    };
  }, [currentTheme, language, onVerify]);

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 dark:text-slate-200">
        <ShieldCheck className="w-3.5 h-3.5 text-accent" />
        <span>{language === "ar" ? "التحقق الأمني (Google reCAPTCHA)" : "Google reCAPTCHA Verification"}</span>
      </div>

      <div className="min-h-[78px] flex items-center">
        {loadError ? (
          <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>
              {language === "ar"
                ? "تعذر تحميل خدمة التحقق من Google. يرجى التحقق من اتصال الإنترنت أو تعطيل مانع الإعلانات."
                : "Unable to load Google reCAPTCHA. Please check your internet connection or ad-blocker."}
            </span>
          </div>
        ) : (
          <div ref={containerRef} className="recaptcha-wrapper" />
        )}
      </div>
    </div>
  );
}
