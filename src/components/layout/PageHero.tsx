import React from "react";
import Link from "next/link";

type Crumb = { name: string; href: string };

/**
 * Deep navy hero that starts every public page (modern layer). Leaves room for the
 * fixed header, which sits over it with light text. Glows and the dot grid are decoration.
 */
export default function PageHero({
  eyebrow,
  title,
  lede,
  crumbs,
  aside,
  children,
  size = "page",
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  lede?: React.ReactNode;
  crumbs?: Crumb[];
  /** Optional right-hand column (photo, panel). */
  aside?: React.ReactNode;
  /** Buttons or extra content under the lede. */
  children?: React.ReactNode;
  /** "home" is taller with a larger headline. */
  size?: "home" | "page";
}) {
  const home = size === "home";
  // Skip the pill when it would only repeat the last breadcrumb.
  const last = crumbs?.[crumbs.length - 1]?.name;
  const showEyebrow = Boolean(eyebrow) && !(typeof eyebrow === "string" && last && eyebrow.toLowerCase() === last.toLowerCase());
  return (
    <section className="fs-deep fs-dots">
      <div aria-hidden="true" className="fs-glow fs-glow-navy w-[56rem] h-[56rem] -right-64 -top-80" />
      <div aria-hidden="true" className="fs-glow fs-glow-brick w-[44rem] h-[44rem] -left-72 -bottom-96" />
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 lg:pt-36 ${home ? "pb-20 lg:pb-28" : "pb-14 lg:pb-20"} grid lg:grid-cols-12 gap-10 lg:gap-12 items-center`}
      >
        <div className={`flex flex-col gap-5 ${aside ? "lg:col-span-7" : "lg:col-span-9"}`}>
          {crumbs && (
            <nav aria-label="Breadcrumb" className="fs-hero-in text-small text-on-deep-muted">
              <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
                {crumbs.map((c, i) => (
                  <li key={c.href} className="flex items-center gap-1.5">
                    {i === crumbs.length - 1 ? (
                      <span aria-current="page" className="text-on-deep">{c.name}</span>
                    ) : (
                      <>
                        <Link href={c.href} className="hover:text-on-deep underline-offset-4 hover:underline">{c.name}</Link>
                        <span aria-hidden="true">/</span>
                      </>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}
          {showEyebrow && (
            <p className="fs-hero-in self-start inline-flex items-center gap-2.5 rounded-full px-4 py-2 fs-glass text-small font-semibold text-on-deep">
              <span aria-hidden="true" className="fs-pulse w-2 h-2 rounded-full bg-piece-sky" />
              {eyebrow}
            </p>
          )}
          <h1
            className={`fs-hero-in text-on-deep ${home ? "text-[clamp(2.75rem,1.6rem+4.4vw,5rem)] leading-[0.98] tracking-[-0.035em]" : "text-display"}`}
            style={{ "--fs-delay": "0.06s" } as React.CSSProperties}
          >
            {title}
          </h1>
          {lede && (
            <div className="fs-hero-in text-lede text-on-deep-muted max-w-2xl" style={{ "--fs-delay": "0.14s" } as React.CSSProperties}>
              {lede}
            </div>
          )}
          {children && (
            <div className="fs-hero-in pt-1" style={{ "--fs-delay": "0.22s" } as React.CSSProperties}>
              {children}
            </div>
          )}
        </div>
        {aside && (
          <div className="fs-hero-in lg:col-span-5" style={{ "--fs-delay": "0.2s" } as React.CSSProperties}>
            {aside}
          </div>
        )}
      </div>
    </section>
  );
}

/** Small uppercase label used above section headings. */
export function SectionLabel({ children, onDeep = false }: { children: React.ReactNode; onDeep?: boolean }) {
  return <p className={`text-label uppercase ${onDeep ? "text-on-deep-accent" : "text-accent"}`}>{children}</p>;
}
