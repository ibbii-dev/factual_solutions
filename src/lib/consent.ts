"use client";

import { useEffect, useState } from "react";

/**
 * Cookie consent.
 *  - "essential": only what the site needs (sign-in sessions, theme, the language you pick).
 *  - "all": also Google services that set their own cookies: reCAPTCHA on the contact form,
 *    Google sign-in and Google Translate. Until then those load only after the visitor allows them.
 * Stored as the "fs_consent" cookie for 180 days.
 */
export type Consent = "all" | "essential";
const COOKIE = "fs_consent";
const EVENT = "fs-consent";
export const OPEN_SETTINGS_EVENT = "fs-open-cookie-settings";

export function getConsent(): Consent | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(/(?:^|;\s*)fs_consent=(all|essential)/);
  return (m?.[1] as Consent) ?? null;
}

export function setConsent(value: Consent) {
  document.cookie = `${COOKIE}=${value}; path=/; max-age=${60 * 60 * 24 * 180}; SameSite=Lax`;
  window.dispatchEvent(new CustomEvent(EVENT, { detail: value }));
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}

/** Current choice, kept in sync across components (null until the visitor answers). */
export function useConsent(): Consent | null {
  const [consent, setState] = useState<Consent | null>(null);
  useEffect(() => {
    setState(getConsent());
    const on = (e: Event) => setState((e as CustomEvent<Consent>).detail);
    window.addEventListener(EVENT, on);
    return () => window.removeEventListener(EVENT, on);
  }, []);
  return consent;
}
