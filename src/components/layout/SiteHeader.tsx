"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { ChevronDownIcon, CloseIcon, MenuIcon, PhoneIcon } from "@/components/layout/Icons";
import { bookingHref, contactLinks, mainNav, serviceLines, servicesLabel, type ServiceLine } from "@/data/navigation";

// Full class names so Tailwind keeps them.
const PIECE: Record<ServiceLine["piece"], { mark: string; soft: string }> = {
  navy: { mark: "bg-piece-navy", soft: "bg-piece-navy/10" },
  sky: { mark: "bg-piece-sky", soft: "bg-piece-sky/20" },
  brick: { mark: "bg-piece-brick", soft: "bg-piece-brick/10" },
};

/**
 * Site header (modern layer, approved 2026-10-20): fixed over the deep navy hero that
 * starts every page (see components/layout/PageHero.tsx), transparent with light text at
 * the top, solid once the page scrolls. Services menu on large screens; slide-in menu
 * with a call button on phones.
 */
export default function SiteHeader() {
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Close menus when the page changes.
  useEffect(() => {
    setServicesOpen(false);
    setDrawerOpen(false);
  }, [pathname]);

  // Solid header once the page has scrolled a little.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
  // Light text over the deep hero until the page scrolls (or the Services menu opens).
  const onDeep = !scrolled && !servicesOpen;

  const navItem = (active: boolean) =>
    `inline-flex items-center gap-1 min-h-[44px] px-3.5 rounded-full transition-colors ${
      onDeep
        ? active
          ? "bg-on-deep/10 text-on-deep"
          : "text-on-deep-muted hover:text-on-deep"
        : active
          ? "bg-band text-heading"
          : "text-muted hover:text-heading"
    }`;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-bg focus:px-4 focus:py-2 focus:text-heading focus:shadow-lift"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-40 border-b transition-[background-color,box-shadow,border-color] duration-300 ${
          onDeep ? "bg-transparent border-on-deep/10" : "bg-bg border-line shadow-card"
        }`}
      >
        <div className="max-w-7xl mx-auto h-16 lg:h-20 px-4 sm:px-6 lg:px-8 flex items-center gap-4 lg:gap-8">
          <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="Factual Solutions home">
            <span className={`shrink-0 inline-flex rounded-[10px] p-[3px] ${onDeep ? "bg-on-deep" : "fs-logo-tile"}`}>
              <Image src="/images/logo-symbol.png" alt="" width={42} height={42} priority className="w-8 h-8 lg:w-9 lg:h-9" />
            </span>
            <span className="flex flex-col">
              <span className={`font-display text-lg leading-tight ${onDeep ? "text-on-deep" : "text-heading"}`}>Factual Solutions</span>
              <span className={`hidden sm:block text-xs font-semibold uppercase tracking-[0.08em] ${onDeep ? "text-on-deep-muted" : "text-muted"}`}>
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
                    className={navItem(servicesActive)}
                  >
                    {servicesLabel}
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
                          <Link href="/services" className="btn-secondary mt-auto min-h-[44px] text-small">
                            All services
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </li>
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} aria-current={isActive(item.href) ? "page" : undefined} className={navItem(isActive(item.href))}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle onDeep={onDeep} />
            <Link href={bookingHref} className={`btn-primary min-h-[46px] text-base ${onDeep ? "!bg-deep-action" : ""}`}>
              Book a consultation
            </Link>
          </div>

          {/* Phone controls */}
          <div className="ms-auto flex items-center gap-2 lg:hidden">
            <a
              href={contactLinks.phoneHref}
              aria-label={`Call ${contactLinks.phone}`}
              className={`inline-flex items-center justify-center w-11 h-11 rounded-full ${onDeep ? "bg-on-deep/10 text-on-deep" : "bg-band text-heading"}`}
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
              className={`inline-flex items-center justify-center w-11 h-11 rounded-full border ${onDeep ? "border-on-deep/25 text-on-deep" : "border-line bg-bg text-heading"}`}
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
              <Link href="/services" className="pt-3 pb-1.5 text-label uppercase text-muted hover:text-heading">{servicesLabel}</Link>
              {serviceLines.map((line) => (
                <Link key={line.id} href={line.href} className="flex items-center gap-2.5 min-h-[48px] text-body font-semibold text-heading">
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
