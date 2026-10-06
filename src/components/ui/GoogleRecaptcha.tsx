"use client";

import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { ShieldCheck, AlertCircle } from "lucide-react";
import { loadScript } from "@/lib/loadScript";

/**
 * Google reCAPTCHA v2 ("I'm not a robot" checkbox).
 *
 * - Uses the real site key from NEXT_PUBLIC_RECAPTCHA_SITE_KEY.
 * - Google's public test key is used only in local development.
 * - The ~150 KB Google script is downloaded only when the widget is about to
 *   scroll into view, so pages without a form (and visitors who never reach
 *   it) pay nothing.
 * - The token is verified on the server (src/lib/recaptcha.ts).
 */

const GOOGLE_TEST_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";

export const RECAPTCHA_SITE_KEY: string | null =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim() ||
  (process.env.NODE_ENV !== "production" ? GOOGLE_TEST_SITE_KEY : null);

/** False until the real key is configured in production; forms then submit without the widget. */
export const RECAPTCHA_ENABLED = Boolean(RECAPTCHA_SITE_KEY);

type Grecaptcha = {
  ready: (cb: () => void) => void;
  render: (
    container: HTMLElement,
    params: {
      sitekey: string;
      callback: (token: string) => void;
      "expired-callback"?: () => void;
      "error-callback"?: () => void;
      theme?: "light" | "dark";
      size?: "normal" | "compact";
    }
  ) => number;
  reset: (widgetId?: number) => void;
};

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
  }
}

export interface GoogleRecaptchaHandle {
  /** Clears the checkbox (tokens are single-use, so call this after a failed submit). */
  reset: () => void;
}

interface GoogleRecaptchaProps {
  onVerify: (token: string | null) => void;
  language?: string;
  theme?: "light" | "dark";
  className?: string;
  compact?: boolean;
}

const GoogleRecaptcha = forwardRef<GoogleRecaptchaHandle, GoogleRecaptchaProps>(function GoogleRecaptcha(
  { onVerify, language = "en", theme, className = "", compact = false },
  ref
) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<number | null>(null);
  const onVerifyRef = useRef(onVerify);
  onVerifyRef.current = onVerify;

  const [inView, setInView] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [rendered, setRendered] = useState(false);

  const isAr = language === "ar";
  const hl = isAr ? "ar" : "en";

  useImperativeHandle(ref, () => ({
    reset: () => {
      if (window.grecaptcha && widgetIdRef.current !== null) {
        try {
          window.grecaptcha.reset(widgetIdRef.current);
        } catch {}
      }
      onVerifyRef.current(null);
    },
  }));

  // 1) Wait until the widget is near the viewport before downloading anything.
  useEffect(() => {
    if (!RECAPTCHA_ENABLED || !hostRef.current) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" }
    );
    io.observe(hostRef.current);
    // Also load as soon as the visitor starts filling the form.
    const form = hostRef.current.closest("form");
    const onFocus = () => setInView(true);
    form?.addEventListener("focusin", onFocus, { once: true });
    return () => {
      io.disconnect();
      form?.removeEventListener("focusin", onFocus);
    };
  }, []);

  const renderWidget = useCallback(() => {
    const host = hostRef.current;
    const g = window.grecaptcha;
    if (!host || !g || !RECAPTCHA_SITE_KEY) return;
    // A widget can only be rendered once per element, so always use a fresh child.
    host.innerHTML = "";
    const slot = document.createElement("div");
    host.appendChild(slot);
    const dark = theme ? theme === "dark" : document.documentElement.classList.contains("dark");
    try {
      widgetIdRef.current = g.render(slot, {
        sitekey: RECAPTCHA_SITE_KEY,
        theme: dark ? "dark" : "light",
        size: compact ? "compact" : "normal",
        callback: (token) => onVerifyRef.current(token),
        "expired-callback": () => onVerifyRef.current(null),
        "error-callback": () => {
          onVerifyRef.current(null);
          setLoadError(true);
        },
      });
      setRendered(true);
    } catch (err) {
      console.error("reCAPTCHA render error:", err);
    }
  }, [theme, compact]);

  // 2) Load Google's script once, then render. Re-render when the language changes.
  useEffect(() => {
    if (!inView || !RECAPTCHA_SITE_KEY) return;
    let cancelled = false;
    onVerifyRef.current(null);
    // Google's script can only be loaded once per page; it keeps the language of the first load.
    loadScript(`https://www.google.com/recaptcha/api.js?render=explicit&hl=${hl}`, "google-recaptcha")
      .then(() => {
        if (cancelled) return;
        const wait = (tries = 0) => {
          if (cancelled) return;
          if (window.grecaptcha?.render) window.grecaptcha.ready(renderWidget);
          else if (tries < 50) setTimeout(() => wait(tries + 1), 100);
          else setLoadError(true);
        };
        wait();
      })
      .catch(() => !cancelled && setLoadError(true));
    return () => {
      cancelled = true;
      widgetIdRef.current = null;
    };
  }, [inView, hl, renderWidget]);

  if (!RECAPTCHA_ENABLED) return null;

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 dark:text-slate-200">
        <ShieldCheck className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
        <span>{isAr ? "تحقق أمني" : "Security check"}</span>
      </div>

      <div className="min-h-[78px] flex items-center">
        {loadError ? (
          <div role="alert" className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>
              {isAr
                ? "تعذر تحميل التحقق الأمني من Google. تحقق من اتصالك أو عطّل مانع الإعلانات ثم أعد تحميل الصفحة."
                : "The security check couldn't load. Please check your connection or ad-blocker, then reload the page."}
            </span>
          </div>
        ) : (
          <div className="relative">
            {!rendered && (
              <div
                className="w-[304px] max-w-full h-[78px] rounded-md border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 animate-pulse"
                aria-hidden="true"
              />
            )}
            <div ref={hostRef} className={rendered ? "" : "absolute inset-0"} />
          </div>
        )}
      </div>

      <p className="text-[10px] leading-snug text-slate-500 dark:text-slate-400">
        {isAr ? "هذا الموقع محمي بواسطة reCAPTCHA وتنطبق " : "Protected by reCAPTCHA. Google "}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-700 dark:hover:text-slate-200">
          {isAr ? "سياسة الخصوصية" : "Privacy Policy"}
        </a>
        {isAr ? " و" : " and "}
        <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-700 dark:hover:text-slate-200">
          {isAr ? "شروط الخدمة" : "Terms of Service"}
        </a>
        {isAr ? " الخاصة بـ Google." : " apply."}
      </p>
    </div>
  );
});

export default GoogleRecaptcha;
