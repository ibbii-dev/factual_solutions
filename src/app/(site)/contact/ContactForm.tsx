"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import GoogleRecaptcha, { GoogleRecaptchaHandle, RECAPTCHA_ENABLED } from "@/components/ui/GoogleRecaptcha";
import { contactLinks } from "@/data/navigation";

export const TOPICS = ["Consulting", "Training", "ERP & Digital", "Not sure yet"] as const;
export type Topic = (typeof TOPICS)[number];

type Fields = { fullName: string; workEmail: string; companyName: string; phone: string; message: string };
type FieldErrors = Partial<Record<"fullName" | "workEmail" | "recaptcha", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Contact form: saves to /api/inquiries, which shows up in the admin Inquiries tab. */
export default function ContactForm({ initialTopic }: { initialTopic?: Topic }) {
  const [fields, setFields] = useState<Fields>({ fullName: "", workEmail: "", companyName: "", phone: "", message: "" });
  const [topic, setTopic] = useState<Topic | "">(initialTopic ?? "");
  const [honeypot, setHoneypot] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [failMessage, setFailMessage] = useState("");
  const recaptchaRef = useRef<GoogleRecaptchaHandle>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const set = (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields((f) => ({ ...f, [key]: e.target.value }));

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (!fields.fullName.trim()) next.fullName = "Please enter your name.";
    if (!EMAIL_RE.test(fields.workEmail.trim())) next.workEmail = "Please enter a valid email address.";
    if (RECAPTCHA_ENABLED && !token) next.recaptcha = "Please tick the “I'm not a robot” box.";
    return next;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (found.fullName) return nameRef.current?.focus();
    if (found.workEmail) return emailRef.current?.focus();
    if (found.recaptcha) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...fields,
          serviceOfInterest: topic || "Not sure yet",
          recaptchaToken: token,
          website: honeypot,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setStatus("sent");
        return;
      }
      if (data.code === "RECAPTCHA_FAILED") {
        recaptchaRef.current?.reset();
        setToken(null);
      }
      setFailMessage(data.message || "Something went wrong while sending.");
      setStatus("failed");
    } catch {
      setFailMessage("We couldn't reach the server. Please check your connection.");
      setStatus("failed");
    }
  };

  if (status === "sent") {
    const firstName = fields.fullName.trim().split(/\s+/)[0];
    return (
      <div role="status" className="fs-card p-8 flex flex-col gap-4">
        <p className="eyebrow">Message sent</p>
        <h2 className="text-h2 text-heading">Thank you, {firstName}.</h2>
        <p className="text-body text-muted">
          Your message is with us. We&apos;ll be in touch at <span className="text-ink font-medium">{fields.workEmail.trim()}</span> to
          arrange a conversation.
        </p>
        <p className="text-body text-muted">
          Need us sooner? Call <a href={contactLinks.phoneHref} className="text-primary font-semibold underline underline-offset-4">{contactLinks.phone}</a>.
        </p>
        <Link href="/blog" className="btn-secondary self-start mt-2">Read our insights</Link>
      </div>
    );
  }

  const inputClass = (invalid?: boolean) => `fs-input ${invalid ? "border-danger focus:border-danger focus:ring-danger/20" : ""}`;

  return (
    <form noValidate onSubmit={onSubmit} className="fs-card p-6 sm:p-8 flex flex-col gap-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="cf-name" className="text-small font-semibold text-ink">Full name *</label>
          <input
            ref={nameRef}
            id="cf-name"
            name="fullName"
            autoComplete="name"
            required
            maxLength={120}
            value={fields.fullName}
            onChange={set("fullName")}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "cf-name-error" : undefined}
            placeholder="Your name"
            className={inputClass(Boolean(errors.fullName))}
          />
          {errors.fullName && <p id="cf-name-error" className="text-small text-danger">{errors.fullName}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="cf-email" className="text-small font-semibold text-ink">Work email *</label>
          <input
            ref={emailRef}
            id="cf-email"
            name="workEmail"
            type="email"
            autoComplete="email"
            required
            value={fields.workEmail}
            onChange={set("workEmail")}
            aria-invalid={Boolean(errors.workEmail)}
            aria-describedby={errors.workEmail ? "cf-email-error" : undefined}
            placeholder="you@company.com"
            className={inputClass(Boolean(errors.workEmail))}
          />
          {errors.workEmail && <p id="cf-email-error" className="text-small text-danger">{errors.workEmail}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="cf-company" className="text-small font-semibold text-ink">Company</label>
          <input id="cf-company" name="companyName" autoComplete="organization" value={fields.companyName} onChange={set("companyName")} placeholder="Organisation name" className={inputClass()} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="cf-phone" className="text-small font-semibold text-ink">Phone</label>
          <input id="cf-phone" name="phone" type="tel" autoComplete="tel" value={fields.phone} onChange={set("phone")} placeholder="+92 …" className={inputClass()} />
        </div>
      </div>

      <fieldset className="flex flex-col gap-2.5">
        <legend className="text-small font-semibold text-ink mb-2.5">What can we help with?</legend>
        <div className="flex flex-wrap gap-2">
          {TOPICS.map((t) => (
            <label key={t} className="cursor-pointer">
              <input type="radio" name="topic" value={t} checked={topic === t} onChange={() => setTopic(t)} className="peer sr-only" />
              <span className="inline-flex items-center min-h-[44px] px-4 rounded-full border text-small font-semibold transition-colors border-line bg-bg text-heading hover:border-primary peer-checked:bg-primary peer-checked:border-primary peer-checked:text-on-solid peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2">
                {t}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col gap-2">
        <label htmlFor="cf-message" className="text-small font-semibold text-ink">Message</label>
        <textarea
          id="cf-message"
          name="message"
          rows={5}
          maxLength={5000}
          value={fields.message}
          onChange={set("message")}
          placeholder="What would you like to improve? Any timelines or context help us prepare."
          className={`${inputClass()} resize-y`}
        />
      </div>

      {/* Honeypot: hidden from people, filled in by spam bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>

      {RECAPTCHA_ENABLED && (
        <div className="flex flex-col gap-2">
          <GoogleRecaptcha
            ref={recaptchaRef}
            onVerify={(t) => {
              setToken(t);
              if (t) setErrors((e) => ({ ...e, recaptcha: undefined }));
            }}
          />
          {errors.recaptcha && <p className="text-small text-danger">{errors.recaptcha}</p>}
        </div>
      )}

      {status === "failed" && (
        <div role="alert" className="rounded-xl border border-danger/30 bg-danger/10 p-4 text-small text-ink">
          <p className="font-semibold text-danger">Your message wasn&apos;t sent.</p>
          <p className="mt-1">
            {failMessage} Please try again, or call us on{" "}
            <a href={contactLinks.phoneHref} className="font-semibold text-primary underline underline-offset-4">{contactLinks.phone}</a>.
          </p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <button type="submit" disabled={status === "sending"} className="btn-primary disabled:opacity-60 disabled:cursor-wait">
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        <p className="text-small text-muted">We only use your details to reply to you.</p>
      </div>
    </form>
  );
}
