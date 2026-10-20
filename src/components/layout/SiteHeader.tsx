"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { ChatIcon, ChevronDownIcon, ClockIcon, CloseIcon, MailIcon, MenuIcon, PhoneIcon } from "@/components/layout/Icons";
import { bookingHref, contactLinks, mainNav, serviceLines, type ServiceLine } from "@/data/navigation";

// Full class names so Tailwind keeps them.
const PIECE: Record<ServiceLine["piece"], { mark: string; soft: string }> = {
  navy: { mark: "bg-piece-navy", soft: "bg-piece-navy/10" },
  sky: { mark: "bg-piece-sky", soft: "bg-piece-sky/20" },
  brick: { mark: "bg-piece-brick", soft: "bg-piece-brick/10" },
};

/**
 * Header "Option B · Contact strip" (approved 2026-10-20): a contact strip on
 * large screens, a sticky bar with a Services menu, and a slide-in menu on phones.
 */
export default function SiteHeader() {
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Close menus when the page changes.
  useEffect(() => {
    setServicesOpen(false);
    setDrawerOpen(false);
  }, [pathname]);

  // Escape closes whichever menu is open; a click outside closes the Services menu.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setServicesOpen(false);
      setDrawerOpen((open) => {
        if (open) menuButtonRef.current?.focus();
        return false;
      });
    };
    const onClick = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) setServicesOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  // While the phone menu is open: no page scrolling, focus on the close button.
  useEffect(() => {
    if (!drawerOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
  }, [drawerOpen]);

  const closeDrawer = () => {
    setDrawerOpen(false);
    menuButtonRef.current?.focus();
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const servicesActive = servicesOpen || pathname.startsWith("/services");

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-bg focus:px-4 focus:py-2 focus:text-heading focus:shadow-lift"
      >
        Skip to content
      </a>

      {/* Contact strip: large screens only (phones get a call button instead). */}
      <div className="hidden lg:block bg-surface border-b border-line text-small text-muted">
        <div className="max-w-7xl mx-auto px-8 h-10 flex items-center gap-6">
          <a href={contactLinks.phoneHref} className="inline-flex items-center gap-1.5 hover:text-heading">
            <PhoneIcon />
            {contactLinks.phone}
          </a>
          <a href={contactLinks.emailHref} className="inline-flex items-center gap-1.5 hover:text-heading">
            <MailIcon />
            {contactLinks.email}
          </a>
          <span className="inline-flex items-center gap-1.5">
            <ClockIcon />
            {contactLinks.hours}
          </span>
          <a
            href={contactLinks.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="ms-auto inline-flex items-center gap-1.5 font-semibold text-heading hover:text-primary"
          >
            <ChatIcon />
            WhatsApp us
          </a>
        </div>
      </div>

      <header className="sticky top-0 z-40 bg-bg border-b border-line">
        <div className="max-w-7xl mx-auto h-16 lg:h-20 px-4 sm:px-6 lg:px-8 flex items-center gap-4 lg:gap-8">
          <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="Factual Solutions home">
            <span className="fs-logo-tile shrink-0">
              <Image src="/images/logo-symbol.png" alt="" width={42} height={42} priority className="w-9 h-9 lg:w-[42px] lg:h-[42px]" />
            </span>
            <span className="flex flex-col">
              <span className="font-display text-lg leading-tight text-heading">Factual Solutions</span>
              <span className="hidden sm:block text-xs font-semibold uppercase tracking-[0.08em] text-muted">
                Consulting · Training · ERP
              </span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Main" className="hidden lg:flex flex-1 justify-center">
            <ul className="flex items-center gap-1 text-base font-medium">
              <li>
                <div ref={servicesRef}>
                  <button
                    type="button"
                    aria-expanded={servicesOpen}
                    aria-controls="services-menu"
                    onClick={() => setServicesOpen((open) => !open)}
                    className={`inline-flex items-center gap-1 min-h-[44px] px-3.5 rounded-full transition-colors ${
                      servicesActive ? "bg-band text-heading" : "text-muted hover:text-heading"
                    }`}
                  >
                    Services
                    <ChevronDownIcon className={`w-4 h-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                  </button>

                  {servicesOpen && (
                    <div id="services-menu" className="absolute inset-x-0 top-full pt-3 px-8">
                      <div className="fs-menu-in mx-auto max-w-3xl grid grid-cols-5 overflow-hidden rounded-2xl border border-line bg-bg shadow-lift">
                        <ul className="col-span-3 p-3">
                          {serviceLines.map((line) => (
                            <li key={line.id}>
                              <Link href={line.href} className="flex gap-3.5 rounded-xl p-3.5 hover:bg-surface transition-colors">
                                <span className={`w-10 h-10 shrink-0 rounded-[10px] inline-flex items-center justify-center ${PIECE[line.piece].soft}`}>
                                  <span className={`w-3.5 h-3.5 rounded-[3px] ${PIECE[line.piece].mark}`} />
                                </span>
                                <span className="flex flex-col gap-1">
                                  <span className="font-display text-base text-heading">{line.title}</span>
                                  <span className="text-small text-muted font-normal">{line.description}</span>
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <div className="col-span-2 flex flex-col gap-3 bg-band p-6">
                          <span className="text-label uppercase text-heading">Not sure where to start?</span>
                          <span className="font-display text-lg leading-snug text-heading">
                            Tell us what you want to improve and we&apos;ll suggest the right fit.
                          </span>
                          <Link href="/contact" className="btn-secondary mt-auto min-h-[44px] text-small">
                            Contact us
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </li>
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`inline-flex items-center min-h-[44px] px-3.5 rounded-full transition-colors ${
                      isActive(item.href) ? "bg-band text-heading" : "text-muted hover:text-heading"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <Link href={bookingHref} className="btn-primary min-h-[46px] text-base">
              Book a consultation
            </Link>
          </div>

          {/* Phone controls */}
          <div className="ms-auto flex items-center gap-2 lg:hidden">
            <a
              href={contactLinks.phoneHref}
              aria-label={`Call ${contactLinks.phone}`}
              className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-band text-heading"
            >
              <PhoneIcon className="w-5 h-5" />
            </a>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-expanded={drawerOpen}
              aria-controls="phone-menu"
              aria-label="Open menu"
              className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-line bg-bg text-heading"
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      {/* Phone menu: slides in from the right over a dimmed page. */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" aria-label="Close menu" tabIndex={-1} onClick={closeDrawer} className="absolute inset-0 bg-scrim/50" />
          <div
            id="phone-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fs-drawer-in absolute inset-y-0 right-0 w-[min(20rem,88vw)] bg-bg flex flex-col px-5 pt-3 pb-5 overflow-y-auto"
          >
            <div className="flex justify-end">
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeDrawer}
                aria-label="Close menu"
                className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-line text-heading"
              >
                <CloseIcon />
              </button>
            </div>
            <nav aria-label="Main" className="flex flex-col">
              <span className="pt-3 pb-1.5 text-label uppercase text-muted">Services</span>
              {serviceLines.map((line) => (
                <Link
                  key={line.id}
                  href={line.href}
                  className="flex items-center gap-2.5 min-h-[48px] text-body font-semibold text-heading"
                >
                  <span className={`w-2.5 h-2.5 rounded-[3px] ${PIECE[line.piece].mark}`} />
                  {line.title}
                </Link>
              ))}
              <span className="h-px bg-line my-2.5" />
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="flex items-center min-h-[48px] text-body font-semibold text-heading"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto pt-6 flex flex-col gap-3">
              <div className="flex flex-col gap-2 rounded-xl bg-surface p-3.5 text-small text-muted">
                <a href={contactLinks.phoneHref}>{contactLinks.phone}</a>
                <a href={contactLinks.emailHref} className="break-all">{contactLinks.email}</a>
                <span>{contactLinks.hours}</span>
              </div>
              <ThemeToggle withLabel className="self-start px-3" />
              <Link href={bookingHref} className="btn-primary">
                Book a consultation
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
