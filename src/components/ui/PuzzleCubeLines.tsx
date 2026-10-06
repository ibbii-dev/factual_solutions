import React from "react";

/**
 * Line-drawn isometric "puzzle cube" — the logo idea redrawn as a technical
 * drawing. Strokes draw themselves in on load (pure CSS), then the cube drifts
 * very slowly. Decorative only.
 */
const T = { top: [200, 40], ul: [62, 120], ur: [338, 120], c: [200, 200], ll: [62, 360], lr: [338, 360], b: [200, 440] };
const mid = (a: number[], b: number[]) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
const p = (pt: number[]) => `${pt[0]} ${pt[1]}`;

type Line = { d: string; tone: "steel" | "white" | "rust"; w?: number };

const faces: Line[] = [
  // outlines
  { d: `M${p(T.top)} L${p(T.ur)} L${p(T.c)} L${p(T.ul)} Z`, tone: "steel", w: 1.6 },
  { d: `M${p(T.ul)} L${p(T.c)} L${p(T.b)} L${p(T.ll)} Z`, tone: "white", w: 1.6 },
  { d: `M${p(T.c)} L${p(T.ur)} L${p(T.lr)} L${p(T.b)} Z`, tone: "rust", w: 1.6 },
  // piece divisions
  { d: `M${p(mid(T.top, T.ur))} L${p(mid(T.ul, T.c))}`, tone: "steel" },
  { d: `M${p(mid(T.top, T.ul))} L${p(mid(T.ur, T.c))}`, tone: "steel" },
  { d: `M${p(mid(T.ul, T.c))} L${p(mid(T.ll, T.b))}`, tone: "white" },
  { d: `M${p(mid(T.ul, T.ll))} L${p(mid(T.c, T.b))}`, tone: "white" },
  { d: `M${p(mid(T.ur, T.c))} L${p(mid(T.lr, T.b))}`, tone: "rust" },
  { d: `M${p(mid(T.ur, T.lr))} L${p(mid(T.c, T.b))}`, tone: "rust" },
];

// small puzzle "knobs" sitting on the division lines
const knobs: { x: number; y: number; tone: Line["tone"] }[] = [
  { ...xy(mid(mid(T.top, T.ur), mid(T.top, T.ul))), tone: "steel" },
  { ...xy(mid(mid(T.ur, T.c), mid(T.top, T.ur))), tone: "steel" },
  { ...xy(mid(mid(T.ul, T.c), mid(T.ul, T.ll))), tone: "white" },
  { ...xy(mid(mid(T.ll, T.b), mid(T.c, T.b))), tone: "white" },
  { ...xy(mid(mid(T.ur, T.c), mid(T.ur, T.lr))), tone: "rust" },
  { ...xy(mid(mid(T.lr, T.b), mid(T.c, T.b))), tone: "rust" },
];
function xy(pt: number[]) {
  return { x: pt[0], y: pt[1] };
}

const stroke = { steel: "#B4CDF0", white: "rgba(255,255,255,0.75)", rust: "#E07A5F" };

export default function PuzzleCubeLines({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 480" className={`fs-cube ${className}`} aria-hidden="true" focusable="false">
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        {faces.map((l, i) => (
          <path
            key={i}
            d={l.d}
            pathLength={1}
            stroke={stroke[l.tone]}
            strokeWidth={l.w ?? 1}
            className="fs-line"
            style={{ "--i": i } as React.CSSProperties}
          />
        ))}
        {knobs.map((k, i) => (
          <circle
            key={`k${i}`}
            cx={k.x}
            cy={k.y}
            r={9}
            pathLength={1}
            stroke={stroke[k.tone]}
            strokeWidth={1}
            className="fs-line"
            style={{ "--i": faces.length + i } as React.CSSProperties}
          />
        ))}
        {/* construction marks: tiny ticks at the vertices */}
        {Object.values(T).map((pt, i) => (
          <circle key={`v${i}`} cx={pt[0]} cy={pt[1]} r={2.2} fill="#B4CDF0" className="fs-dot" style={{ "--i": i } as React.CSSProperties} />
        ))}
      </g>
    </svg>
  );
}
