"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

/** Compact newsletter sign-up for light cards (the blog sidebar). Uses the same API as the footer. */
export default function NewsletterSignup({ source = "Blog Sidebar" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source, website: hp }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setStatus("done");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.message || "Please check the address and try again.");
      }
    } catch {
      setStatus("error");
      setMessage("We couldn't reach the server. Please try again.");
    }
  };

  if (status === "done") {
    return (
      <p role="status" className="flex items-start gap-2 text-sm text-ink dark:text-white">
        <CheckCircle2 className="w-4 h-4 mt-0.5 text-success shrink-0" aria-hidden="true" />
        Thanks for subscribing. New articles will arrive in your inbox.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-2.5">
      <label htmlFor="sidebar-email" className="sr-only">Email address</label>
      <input
        id="sidebar-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
        autoComplete="email"
        className="fs-input !py-2.5"
      />
      <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <input type="text" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
      </div>
      <button type="submit" disabled={status === "sending"} className="btn-primary w-full disabled:opacity-60">
        {status === "sending" ? "Subscribing…" : "Subscribe"}
        <ArrowRight className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
      </button>
      {status === "error" && <p role="alert" className="text-xs text-danger">{message}</p>}
    </form>
  );
}
