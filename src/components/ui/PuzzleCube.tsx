"use client";

import React, { useEffect, useRef } from "react";

/**
 * Hero puzzle cube in the exact logo colors. Pure CSS does the entrance:
 * the three pieces fly in from three directions and lock together, the
 * knobs pop in, then a soft ring pulses from the joint and the cube floats.
 *
 * On desktop pointers the cube also tilts toward the cursor and the pieces
 * shift at different depths. That runs in a single rAF and only writes two
 * CSS variables, so it never triggers layout. Skipped for touch and for
 * reduced-motion visitors.
 */
export default function PuzzleCube({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const zone = (el.closest("section") as HTMLElement) || el;

    let raf = 0;
    let tx = 0, ty = 0, x = 0, y = 0;
    const tick = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      el.style.setProperty("--px", x.toFixed(3));
      el.style.setProperty("--py", y.toFixed(3));
      raf = Math.abs(tx - x) > 0.001 || Math.abs(ty - y) > 0.001 ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const onMove = (e: PointerEvent) => {
      const r = zone.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
      kick();
    };
    const onLeave = () => { tx = 0; ty = 0; kick(); };
    zone.addEventListener("pointermove", onMove, { passive: true });
    zone.addEventListener("pointerleave", onLeave);
    return () => {
      zone.removeEventListener("pointermove", onMove);
      zone.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className={`fs-cube-tilt ${className}`} aria-hidden="true">
      <svg viewBox="0 0 240 240" className="fs-cube w-full h-auto overflow-visible">
        <g className="fs-depth" style={{ "--z": 1.4 } as React.CSSProperties}>
          <g className="fs-piece fs-piece-top">
            <path d="M120 22 L208 72 L120 122 L32 72 Z" fill="#25346B" stroke="#FFFFFF" strokeWidth="3" strokeLinejoin="round" />
            <circle className="fs-knob" style={{ "--k": 0 } as React.CSSProperties} cx="73" cy="42" r="11" fill="#25346B" stroke="#FFFFFF" strokeWidth="3" />
            <circle className="fs-knob" style={{ "--k": 1 } as React.CSSProperties} cx="167" cy="42" r="11" fill="#25346B" stroke="#FFFFFF" strokeWidth="3" />
            <circle cx="76" cy="97" r="10" fill="#25346B" />
          </g>
        </g>
        <g className="fs-depth" style={{ "--z": 0.8 } as React.CSSProperties}>
          <g className="fs-piece fs-piece-left">
            <path d="M32 80 L116 128 L116 226 L32 178 Z" fill="#9BB3D9" stroke="#FFFFFF" strokeWidth="3" strokeLinejoin="round" />
            <circle className="fs-knob" style={{ "--k": 2 } as React.CSSProperties} cx="26" cy="129" r="11" fill="#9BB3D9" stroke="#FFFFFF" strokeWidth="3" />
            <circle className="fs-knob" style={{ "--k": 3 } as React.CSSProperties} cx="71" cy="207" r="11" fill="#9BB3D9" stroke="#FFFFFF" strokeWidth="3" />
            <circle cx="116" cy="176" r="10" fill="#9BB3D9" />
          </g>
        </g>
        <g className="fs-depth" style={{ "--z": 1.1 } as React.CSSProperties}>
          <g className="fs-piece fs-piece-right">
            <path d="M124 128 L208 80 L208 178 L124 226 Z" fill="#9B391E" stroke="#FFFFFF" strokeWidth="3" strokeLinejoin="round" />
            <circle className="fs-knob" style={{ "--k": 4 } as React.CSSProperties} cx="214" cy="129" r="11" fill="#9B391E" stroke="#FFFFFF" strokeWidth="3" />
            <circle className="fs-knob" style={{ "--k": 5 } as React.CSSProperties} cx="169" cy="207" r="11" fill="#9B391E" stroke="#FFFFFF" strokeWidth="3" />
            <circle cx="164" cy="97" r="10" fill="#9B391E" />
          </g>
        </g>
        <circle className="fs-ring" cx="120" cy="125" r="16" fill="none" stroke="#9BB3D9" strokeWidth="2" />
        <circle className="fs-ring fs-ring-2" cx="120" cy="125" r="16" fill="none" stroke="#9B391E" strokeWidth="1.5" />
      </svg>
    </div>
  );
}
