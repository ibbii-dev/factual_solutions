import React from "react";

/**
 * Section heading in the house style: a small rust label with the three-color
 * bar, a bold headline whose second part is set in navy (steel in dark mode),
 * and an optional lede beside it (split) or under it (center).
 */
export default function SectionHeading({
  id,
  label,
  title,
  highlight,
  lede,
  align = "split",
  className = "",
}: {
  id?: string;
  label: React.ReactNode;
  title: React.ReactNode;
  highlight?: React.ReactNode;
  lede?: React.ReactNode;
  align?: "split" | "center";
  className?: string;
}) {
  const heading = (
    <h2 id={id} className="text-[2rem] sm:text-[2.6rem] font-extrabold leading-[1.1] tracking-[-0.025em] text-ink dark:text-white">
      {title}
      {highlight && (
        <>
          <br />
          <span className="text-navy dark:text-steel">{highlight}</span>
        </>
      )}
    </h2>
  );

  if (align === "center") {
    return (
      <div data-reveal className={`max-w-3xl mx-auto text-center flex flex-col items-center gap-4 ${className}`}>
        <p className="fs-label items-center">{label}</p>
        {heading}
        {lede && <p className="lede text-slate-600 dark:text-slate-300">{lede}</p>}
      </div>
    );
  }

  return (
    <div data-reveal className={`grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 items-end ${className}`}>
      <div className="lg:col-span-7 flex flex-col gap-4">
        <p className="fs-label">{label}</p>
        {heading}
      </div>
      {lede && <div className="lg:col-span-5 lede text-slate-600 dark:text-slate-300">{lede}</div>}
    </div>
  );
}
