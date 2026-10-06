import React from "react";

/** Shared editorial page header: plain label, large left-aligned serif title, lede, closing hairline. */
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
    <header className="pt-32 sm:pt-40 mb-12 sm:mb-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <p className="lg:col-span-3 eyebrow pt-3">{eyebrow}</p>
        <div className="lg:col-span-9 space-y-6">
          <h1 className="text-[2.4rem] sm:text-6xl lg:text-[4.25rem] font-bold font-display tracking-[-0.02em] leading-[1.04] text-ink dark:text-white max-w-4xl">
            {title}
          </h1>
          {lede && <div className="lede text-slate-700 dark:text-slate-300 max-w-2xl">{lede}</div>}
          {children}
        </div>
      </div>
      <div className="fs-rule mt-12 sm:mt-16 border-t border-ink/15 dark:border-white/15" style={{ "--d": "250ms" } as React.CSSProperties} aria-hidden="true" />
    </header>
  );
}
