import React from "react";

/**
 * Shared page header: a centered pill label, a large bold title and a lede over
 * the soft brand glow. Rendered inside each page's max-width container, so it
 * breaks out to full width for the glow and re-centers its own content.
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
    <header className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden mb-10 sm:mb-14">
      <div className="fs-glow" aria-hidden="true" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-32 sm:pt-40 pb-6 sm:pb-8 flex flex-col items-center text-center gap-5">
        <p className="fs-hero-in fs-pill">{eyebrow}</p>
        <h1 className="fs-page-in text-[2.4rem] sm:text-[3.4rem] lg:text-[3.9rem] font-extrabold tracking-[-0.03em] leading-[1.06] text-ink dark:text-white">
          {title}
        </h1>
        {lede && (
          <div className="fs-hero-in lede text-slate-600 dark:text-slate-300 max-w-2xl" style={{ "--fs-delay": "0.12s" } as React.CSSProperties}>
            {lede}
          </div>
        )}
        {children && <div className="fs-hero-in pt-2" style={{ "--fs-delay": "0.2s" } as React.CSSProperties}>{children}</div>}
      </div>
    </header>
  );
}
