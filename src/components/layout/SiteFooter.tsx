import React from "react";
import Image from "next/image";
import Link from "next/link";
import { bookingHref, contactLinks, mainNav, serviceLines, servicesLabel } from "@/data/navigation";

/** Footer (modern layer): deep navy call-to-action panel, then links and contact details. */
export default function SiteFooter() {
  return (
    <footer className="bg-surface border-t border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8 flex flex-col gap-14">
        <div data-reveal className="fs-deep rounded-[2rem] px-6 py-12 sm:px-12 sm:py-16 flex flex-col lg:flex-row lg:items-center gap-8">
          <div aria-hidden="true" className="fs-glow fs-glow-sky w-[36rem] h-[36rem] -right-40 -top-64" />
          <div aria-hidden="true" className="fs-glow fs-glow-brick w-[28rem] h-[28rem] -left-40 -bottom-72" />
          <h2 className="flex-1 text-h1 text-on-deep">Ready to improve how your organisation works?</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href={contactLinks.phoneHref} className="inline-flex items-center justify-center min-h-[52px] px-6 rounded-full border border-on-deep/40 text-on-deep font-semibold hover:border-on-deep transition-colors">
              Call {contactLinks.phone}
            </a>
            <Link href={bookingHref} className="btn-primary !bg-deep-action min-h-[52px]">
              Book a consultation
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-small text-muted">
          <div className="col-span-2 lg:col-span-1 flex flex-col gap-3.5">
            <Link href="/" className="flex items-center gap-2.5 self-start">
              <span className="fs-logo-tile shrink-0">
                <Image src="/images/logo-symbol.png" alt="" width={34} height={34} className="w-[34px] h-[34px]" />
              </span>
              <span className="font-display text-lg text-heading">Factual Solutions</span>
            </Link>
            <p className="max-w-xs">Consulting, training and ERP &amp; digital transformation that help organisations perform better.</p>
          </div>

          <nav aria-label={servicesLabel} className="flex flex-col gap-2.5">
            <h2 className="text-label uppercase text-heading">{servicesLabel}</h2>
            {serviceLines.map((line) => (
              <Link key={line.id} href={line.href} className="hover:text-heading">
                {line.title}
              </Link>
            ))}
          </nav>

          <nav aria-label="Company" className="flex flex-col gap-2.5">
            <h2 className="text-label uppercase text-heading">Company</h2>
            {mainNav.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-heading">
                {item.label}
              </Link>
            ))}
            <Link href="/contact" className="hover:text-heading">Contact</Link>
          </nav>

          <div className="col-span-2 lg:col-span-1 flex flex-col gap-2.5">
            <h2 className="text-label uppercase text-heading">Get in touch</h2>
            <a href={contactLinks.phoneHref} className="hover:text-heading">{contactLinks.phone}</a>
            <a href={contactLinks.emailHref} className="hover:text-heading break-all">{contactLinks.email}</a>
            <a href={contactLinks.whatsappHref} target="_blank" rel="noopener noreferrer" className="hover:text-heading">
              WhatsApp
            </a>
            <span>{contactLinks.hours}</span>
            <span>{contactLinks.city}</span>
          </div>
        </div>

        <p className="pt-5 border-t border-line text-small text-muted">
          © {new Date().getFullYear()} Factual Solutions. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
