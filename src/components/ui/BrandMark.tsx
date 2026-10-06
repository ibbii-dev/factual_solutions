import React from "react";

/**
 * The Factual Solutions puzzle-cube mark, drawn inline in the exact logo
 * colors (navy #25346B, steel #9BB3D9, rust #9B391E). Inline SVG means no
 * image request and crisp edges at any size. On hover of a parent `.group`
 * the three pieces ease apart slightly and settle back.
 */
export default function BrandMark({ className = "", title, outline = false }: { className?: string; title?: string; outline?: boolean }) {
  const stroke = outline ? { stroke: "#FFFFFF", strokeWidth: 5, strokeLinejoin: "round" as const } : {};
  return (
    <svg viewBox="0 0 240 240" className={`fs-mark ${className}`} role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      <g className="fs-mark-top">
        <path d="M120 22 L208 72 L120 122 L32 72 Z" fill="#25346B" {...stroke} />
        <circle cx="73" cy="43" r="13" fill="#25346B" {...stroke} />
        <circle cx="167" cy="43" r="13" fill="#25346B" {...stroke} />
      </g>
      <g className="fs-mark-left">
        <path d="M30 82 L115 130 L115 228 L30 180 Z" fill="#9BB3D9" {...stroke} />
        <circle cx="24" cy="131" r="13" fill="#9BB3D9" {...stroke} />
        <circle cx="70" cy="208" r="13" fill="#9BB3D9" {...stroke} />
      </g>
      <g className="fs-mark-right">
        <path d="M125 130 L210 82 L210 180 L125 228 Z" fill="#9B391E" {...stroke} />
        <circle cx="216" cy="131" r="13" fill="#9B391E" {...stroke} />
        <circle cx="170" cy="208" r="13" fill="#9B391E" {...stroke} />
      </g>
    </svg>
  );
}
