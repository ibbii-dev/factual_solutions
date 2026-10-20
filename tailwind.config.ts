import type { Config } from "tailwindcss";

/**
 * Colours come only from src/styles/tokens.css (Option B "Sky Open").
 * `colors` replaces Tailwind's default palette on purpose: slate, emerald, white
 * and friends do not exist here, so every colour in the UI is a named token.
 */
const token = (name: string) => `rgb(var(--c-${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      inherit: "inherit",
      bg: token("bg"),
      surface: token("surface"),
      band: token("band"),
      line: token("line"),
      ink: token("ink"),
      heading: token("heading"),
      muted: token("muted"),
      primary: token("primary"),
      action: { DEFAULT: token("action"), hover: token("action-hover") },
      "on-action": token("on-action"),
      "on-solid": token("on-solid"),
      accent: token("accent"),
      tint: token("tint"),
      success: token("success"),
      warning: token("warning"),
      danger: token("danger"),
      scrim: token("scrim"),
      piece: { navy: token("piece-navy"), sky: token("piece-sky"), brick: token("piece-brick") },
    },
    extend: {
      // Plain `border`, `divide-*` and `ring` without a colour use these.
      borderColor: { DEFAULT: token("line") },
      ringColor: { DEFAULT: token("primary") },
      // Type scale (approved 2026-10-20, Option A). Headings are Manrope 700 via the
      // h1–h6 rule in globals.css; these set size, line height and tracking.
      // Headings shrink smoothly from phone to desktop.
      fontSize: {
        display: ["clamp(2.25rem, 1.6rem + 2.8vw, 3.5rem)", { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "700" }],
        h1: ["clamp(2rem, 1.5rem + 2vw, 2.75rem)", { lineHeight: "1.1", letterSpacing: "-0.025em", fontWeight: "700" }],
        h2: ["clamp(1.75rem, 1.45rem + 1.2vw, 2.25rem)", { lineHeight: "1.15", letterSpacing: "-0.025em", fontWeight: "700" }],
        h3: ["clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem)", { lineHeight: "1.25", letterSpacing: "-0.02em", fontWeight: "700" }],
        lede: ["1.1875rem", { lineHeight: "1.6" }],
        body: ["1.0625rem", { lineHeight: "1.65" }],
        small: ["0.875rem", { lineHeight: "1.5" }],
        label: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.14em", fontWeight: "700" }],
      },
      fontFamily: {
        display: ["var(--font-display)", "'Segoe UI'", "system-ui", "-apple-system", "sans-serif"],
        body: ["var(--font-body)", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "system-ui", "Roboto", "Arial", "sans-serif"],
        sans: ["var(--font-body)", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "system-ui", "Roboto", "Arial", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgb(var(--c-scrim) / 0.04), 0 8px 24px -12px rgb(var(--c-scrim) / 0.12)",
        lift: "0 2px 4px rgb(var(--c-scrim) / 0.05), 0 22px 44px -18px rgb(var(--c-scrim) / 0.25)",
      },
    },
  },
  plugins: [],
};
export default config;
