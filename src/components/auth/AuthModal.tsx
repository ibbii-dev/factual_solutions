"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { X, AlertCircle, ShieldCheck } from "lucide-react";
import BrandMark from "@/components/ui/BrandMark";
import { useUserAuth } from "@/context/UserAuthContext";
import { loadScript } from "@/lib/loadScript";

type GoogleId = {
  initialize: (opts: object) => void;
  renderButton: (el: HTMLElement, opts: object) => void;
};

/** Client portal sign-in: Google only, verified on the server (see UserAuthContext). */
export default function AuthModal() {
  const router = useRouter();
  const { isAuthModalOpen, closeAuthModal, loginWithGoogle, signInEnabled } = useUserAuth();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  useEffect(() => {
    if (isAuthModalOpen) setError("");
  }, [isAuthModalOpen]);

  // Escape closes the window.
  useEffect(() => {
    if (!isAuthModalOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeAuthModal();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isAuthModalOpen, closeAuthModal]);

  // Google's script is only downloaded when this window opens.
  useEffect(() => {
    if (!isAuthModalOpen || !clientId || !signInEnabled) return;
    let alive = true;
    loadScript("https://accounts.google.com/gsi/client", "google-gsi-client")
      .then(() => {
        const id = (window as unknown as { google?: { accounts?: { id?: GoogleId } } }).google?.accounts?.id;
        if (!alive || !id || !buttonRef.current) return;
        id.initialize({
          client_id: clientId,
          auto_select: false,
          cancel_on_tap_outside: true,
          callback: async (response: { credential?: string }) => {
            if (!response?.credential) return;
            setBusy(true);
            setError("");
            const failure = await loginWithGoogle(response.credential);
            setBusy(false);
            if (failure) setError(failure);
            else router.push("/portal");
          },
        });
        buttonRef.current.innerHTML = "";
        id.renderButton(buttonRef.current, { theme: "outline", size: "large", text: "continue_with", shape: "pill", width: 300 });
      })
      .catch(() => alive && setError("Google sign-in could not be loaded. Please try again later."));
    return () => {
      alive = false;
    };
  }, [isAuthModalOpen, clientId, signInEnabled, loginWithGoogle, router]);

  if (!isAuthModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button type="button" aria-label="Close" tabIndex={-1} onClick={closeAuthModal} className="fixed inset-0 bg-[#0E1A38]/60 backdrop-blur-sm" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
        className="fs-menu-in relative w-full max-w-md fs-card overflow-hidden"
      >
        <div className="relative p-6 sm:p-7 pb-5 border-b border-paper-line dark:border-white/10">
          <button
            type="button"
            onClick={closeAuthModal}
            className="absolute top-4 right-4 w-11 h-11 rounded-full text-slate-500 hover:text-ink dark:text-slate-300 dark:hover:text-white flex items-center justify-center transition-colors"
            aria-label="Close sign-in"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-9 h-9 shrink-0 dark:bg-white dark:rounded-lg dark:p-1"><BrandMark className="w-full h-full overflow-visible" /></span>
            <span className="eyebrow">Client portal</span>
          </div>
          <h2 id="auth-title" className="text-xl font-bold text-ink dark:text-white font-display">Sign in to your account</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            See the inquiries you have sent us and our replies.
          </p>
        </div>

        <div className="p-6 sm:p-7 space-y-4">
          {error && (
            <div role="alert" className="p-3 rounded-xl bg-danger/10 border border-danger/30 text-danger text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {signInEnabled && clientId ? (
            <div className="flex flex-col items-center gap-3">
              <div ref={buttonRef} className="min-h-[44px] flex justify-center" aria-busy={busy} />
              <p className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                Verified securely with your Google account.
              </p>
            </div>
          ) : (
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Client sign-in is coming soon. In the meantime, contact us and we&apos;ll reply by email.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
