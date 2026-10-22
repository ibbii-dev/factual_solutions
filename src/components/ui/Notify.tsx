"use client";

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from "lucide-react";

/**
 * In-site notifications, replacing the browser's alert()/confirm() boxes:
 *  - toast({ tone, title, message }): a bar in the top-right corner that fades after a few seconds
 *  - confirm({ title, message, confirmLabel, danger }): a styled dialog that resolves to true/false
 * Wrap a page tree in <NotifyProvider> and call useNotify() inside it.
 */

type Tone = "success" | "error" | "warning" | "info";
type Toast = { id: number; tone: Tone; title: string; message?: string };
type ConfirmOptions = { title: string; message?: string; confirmLabel?: string; cancelLabel?: string; danger?: boolean };
type NotifyContextType = {
  toast: (t: { tone?: Tone; title: string; message?: string }) => void;
  confirm: (o: ConfirmOptions) => Promise<boolean>;
};

const NotifyContext = createContext<NotifyContextType | null>(null);

const TONES: Record<Tone, { Icon: typeof Info; bar: string; icon: string }> = {
  success: { Icon: CheckCircle2, bar: "bg-success", icon: "text-success" },
  error: { Icon: XCircle, bar: "bg-danger", icon: "text-danger" },
  warning: { Icon: AlertTriangle, bar: "bg-warning", icon: "text-warning" },
  info: { Icon: Info, bar: "bg-primary", icon: "text-primary" },
};

export function NotifyProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [dialog, setDialog] = useState<(ConfirmOptions & { resolve: (ok: boolean) => void }) | null>(null);
  const nextId = useRef(1);
  const cancelRef = useRef<HTMLButtonElement>(null);

  const dismiss = useCallback((id: number) => setToasts((t) => t.filter((x) => x.id !== id)), []);

  const toast = useCallback<NotifyContextType["toast"]>(
    ({ tone = "success", title, message }) => {
      const id = nextId.current++;
      setToasts((t) => [...t.slice(-3), { id, tone, title, message }]);
      window.setTimeout(() => dismiss(id), tone === "error" || tone === "warning" ? 8000 : 5000);
    },
    [dismiss]
  );

  const confirm = useCallback<NotifyContextType["confirm"]>(
    (o) => new Promise<boolean>((resolve) => setDialog({ ...o, resolve })),
    []
  );

  const close = useCallback(
    (ok: boolean) => {
      dialog?.resolve(ok);
      setDialog(null);
    },
    [dialog]
  );

  // Escape cancels; focus starts on the safe choice (Cancel).
  useEffect(() => {
    if (!dialog) return;
    cancelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [dialog, close]);

  return (
    <NotifyContext.Provider value={{ toast, confirm }}>
      {children}

      {/* Toast bars */}
      <div aria-live="polite" className="fixed top-4 inset-x-4 sm:inset-x-auto sm:right-4 z-[200] flex flex-col items-stretch sm:items-end gap-2 pointer-events-none">
        {toasts.map((t) => {
          const { Icon, bar, icon } = TONES[t.tone];
          return (
            <div
              key={t.id}
              role={t.tone === "error" ? "alert" : "status"}
              className="fs-menu-in pointer-events-auto relative w-full sm:w-96 overflow-hidden rounded-xl border border-line bg-bg shadow-lift flex items-start gap-3 p-4 pe-10"
            >
              <span aria-hidden="true" className={`absolute inset-y-0 start-0 w-1 ${bar}`} />
              <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${icon}`} aria-hidden="true" />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-heading">{t.title}</p>
                {t.message && <p className="text-sm text-muted mt-0.5 break-words">{t.message}</p>}
              </div>
              <button type="button" onClick={() => dismiss(t.id)} aria-label="Dismiss" className="absolute top-2.5 end-2.5 w-7 h-7 rounded-lg inline-flex items-center justify-center text-muted hover:text-heading hover:bg-band">
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Confirm dialog */}
      {dialog && (
        <div className="fixed inset-0 z-[210] flex items-center justify-center p-4">
          <button type="button" aria-label="Cancel" tabIndex={-1} onClick={() => close(false)} className="absolute inset-0 bg-[#0E1A38]/60 backdrop-blur-sm" />
          <div role="alertdialog" aria-modal="true" aria-labelledby="notify-title" aria-describedby={dialog.message ? "notify-message" : undefined} className="fs-menu-in relative w-full max-w-md rounded-2xl border border-line bg-bg shadow-lift p-6 space-y-5">
            <div className="flex items-start gap-3">
              <span className={`w-10 h-10 shrink-0 rounded-full inline-flex items-center justify-center ${dialog.danger ? "bg-danger/10 text-danger" : "bg-primary/10 text-primary"}`}>
                {dialog.danger ? <AlertTriangle className="w-5 h-5" aria-hidden="true" /> : <Info className="w-5 h-5" aria-hidden="true" />}
              </span>
              <div className="space-y-1">
                <h2 id="notify-title" className="text-lg font-bold text-heading">{dialog.title}</h2>
                {dialog.message && <p id="notify-message" className="text-sm text-muted">{dialog.message}</p>}
              </div>
            </div>
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
              <button ref={cancelRef} type="button" onClick={() => close(false)} className="min-h-[44px] px-5 rounded-xl border border-line text-sm font-semibold text-heading hover:bg-band">
                {dialog.cancelLabel || "Cancel"}
              </button>
              <button
                type="button"
                onClick={() => close(true)}
                className={`min-h-[44px] px-5 rounded-xl text-sm font-semibold ${dialog.danger ? "bg-danger text-on-solid hover:opacity-90" : "bg-action text-on-action hover:bg-action-hover"}`}
              >
                {dialog.confirmLabel || "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </NotifyContext.Provider>
  );
}

export function useNotify(): NotifyContextType {
  const ctx = useContext(NotifyContext);
  if (!ctx) throw new Error("useNotify must be used inside <NotifyProvider>");
  return ctx;
}
