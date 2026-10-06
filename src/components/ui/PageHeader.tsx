import React from "react";

/**
 * Shared page header: a full-bleed navy band with a plain label, a large
 * left-aligned serif title and a lede. Matches the homepage hero.
 */
export default function PageHeader({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  lede?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="relative w-screen left-1/2 -translate-x-1/2 bg-navy dark:bg-night-900 text-white mb-14 sm:mb-20 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 pb-14 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <p className="fs-hero-in fs-label fs-label-light lg:col-span-3 self-start pt-4">{eyebrow}</p>
          <div className="lg:col-span-9 space-y-6">
            <h1 className="fs-page-in text-[2.4rem] sm:text-6xl lg:text-[4.25rem] font-semibold font-display tracking-[-0.03em] leading-[1.04] max-w-4xl">
              {title}
            </h1>
            {lede && <div className="fs-hero-in lede text-[#E4E9F3] max-w-2xl" style={{ "--fs-delay": "0.15s" } as React.CSSProperties}>{lede}</div>}
            {children}
          </div>
        </div>
      </div>
    </header>
  );
}
