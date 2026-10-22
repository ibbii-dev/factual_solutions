"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { CheckCircle2, Mail, X } from "lucide-react";
import NewsletterSignup, { SUBSCRIBE_KEY } from "@/components/blog/NewsletterSignup";
import { useUserAuth } from "@/context/UserAuthContext";

const DELAY_MS = 3000;
/** After "No thanks" the pop-up stays away this long; subscribers never see it again. */
const SNOOZE_DAYS = 7;
const HIDDEN_ON = ["/portal", "/privacy", "/terms"];
let firstPage = true;

function shouldShow(): boolean {
  try {
    const v = localStorage.getItem(SUBSCRIBE_KEY);
    if (v === "subscribed") return false;
    if (v && Date.now() - Number(v) < SNOOZE_DAYS * 864e5) return false;
    return true;
  } catch {
    // Storage blocked: show it once per page load at most.
    return true;
  }
}

/** Newsletter invitation that slides in 3 seconds after a visitor arrives. */
export default function SubscribePopup() {
  const pathname = usePathname() || "/";
  const { isAuthModalOpen, user } = useUserAuth();
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  // Read when the timer fires, so the sign-in check finishing doesn't restart the 3 seconds.
  const signedIn = useRef(false);
  signedIn.current = Boolean(user);

  useEffect(() => {
    if (HIDDEN_ON.some((p) => pathname.startsWith(p))) return;
    // Count from when the visitor opened the site (page load time included), not from when this script started.
    const delay = firstPage ? Math.max(300, DELAY_MS - performance.now()) : DELAY_MS;
    firstPage = false;
    const timer = window.setTimeout(() => {
      // Skip signed-in clients, don't cover another open window (sign-in), and don't repeat for people who said no.
      if (signedIn.current || document.querySelector("[role=dialog],[role=alertdialog]")) return;
      if (shouldShow()) setOpen(true);
    }, delay);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  const close = useCallback(() => {
    setOpen(false);
    if (!done) {
      try {
        localStorage.setItem(SUBSCRIBE_KEY, String(Date.now()));
      } catch {
        /* ignore */
      }
    }
  }, [done]);

  // Escape closes; the page behind stays still while it is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      root.style.overflow = prev;
    };
  }, [open, close]);

  if (!open || isAuthModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-4">
      <button type="button" aria-label="Close" tabIndex={-1} onClick={close} className="absolute inset-0 bg-[#0E1A38]/55 backdrop-blur-sm" />
      <div role="dialog" aria-modal="true" aria-labelledby="subscribe-title" className="fs-menu-in relative w-full max-w-md fs-card overflow-hidden">
        <div aria-hidden="true" className="h-1 bg-brand-tri" />
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute top-3 end-3 w-10 h-10 rounded-full inline-flex items-center justify-center text-slate-500 hover:text-ink hover:bg-paper-deep dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/5"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="p-6 sm:p-8 space-y-4">
          <span className="fs-icon bg-navy"><Mail className="w-5 h-5" aria-hidden="true" /></span>
          {done ? (
            <div className="space-y-2" role="status">
              <h2 id="subscribe-title" className="text-2xl font-extrabold font-display text-ink dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-success" aria-hidden="true" /> You&apos;re subscribed
              </h2>
              <p className="text-[15px] text-slate-600 dark:text-slate-300">New articles will arrive in your inbox. Thank you!</p>
              <button type="button" onClick={close} className="btn-secondary mt-2">Close</button>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <p className="fs-label">Stay informed</p>
                <h2 id="subscribe-title" className="text-2xl font-extrabold font-display leading-tight text-ink dark:text-white">
                  Practical insights on operational excellence
                </h2>
                <p className="text-[15px] text-slate-600 dark:text-slate-300">
                  Ideas on Lean Six Sigma, strategy, quality, ERP and digital transformation, straight to your inbox. No spam.
                </p>
              </div>
              <NewsletterSignup source="Website Pop-up" inputId="popup-email" autoFocus onSubscribed={() => setDone(true)} />
              <button type="button" onClick={close} className="w-full text-center text-sm text-slate-500 hover:text-ink dark:text-slate-400 dark:hover:text-white min-h-[40px]">
                No thanks
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
