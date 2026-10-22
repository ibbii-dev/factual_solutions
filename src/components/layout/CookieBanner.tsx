"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";
import { OPEN_SETTINGS_EVENT, getConsent, setConsent, type Consent } from "@/lib/consent";
import { clearMachineLang, readMachineLang } from "@/lib/i18n";

/** Bottom bar asking visitors to accept or decline optional (Google) cookies. Reopened from the footer. */
export default function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (getConsent() === null) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, reopen);
  }, []);

  const choose = (value: Consent) => {
    setConsent(value);
    setOpen(false);
    // Declining switches off Google Translate too: go back to the original English page.
    if (value === "essential" && readMachineLang()) {
      clearMachineLang();
      window.location.reload();
    }
  };

  if (!open) return null;

  return (
    <div role="region" aria-label="Cookie consent" className="fixed inset-x-0 bottom-0 z-[95] p-3 sm:p-4 pointer-events-none">
      <div className="fs-menu-in pointer-events-auto max-w-4xl mx-auto fs-card shadow-lift p-4 sm:p-5 flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex items-start gap-3 flex-1">
          <span className="fs-icon !w-10 !h-10 bg-navy shrink-0"><Cookie className="w-5 h-5" aria-hidden="true" /></span>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            We use essential cookies to run the site. With your permission, we also use Google services that set their own cookies:
            spam protection on forms, Google sign-in and translation.{" "}
            <Link href="/privacy" className="text-navy dark:text-steel-light underline underline-offset-4">Privacy Policy</Link>
          </p>
        </div>
        <div className="flex flex-col-reverse sm:flex-row gap-2 shrink-0">
          <button type="button" onClick={() => choose("essential")} className="btn-secondary !min-h-[44px] text-sm">
            Decline
          </button>
          <button type="button" onClick={() => choose("all")} className="btn-primary !min-h-[44px] text-sm">
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
