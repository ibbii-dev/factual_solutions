import type { Config } from "tailwindcss";

/**
 * Factual Solutions colours: the "classic" card-style design (restored 2026-10-21 at the
 * owner's request) on top of the token system.
 *
 *  - Brand palette (exact logo colours), used by the site's components:
 *      navy #25346B · steel #9BB3D9 · rust #9B391E · ink text #0E1A38 · paper #F6F8FC
 *      night-* = the midnight navy dark theme.
 *  - Theme tokens (src/styles/tokens.css), used by the admin panel, forms and data-driven pages:
 *      bg, surface, band, line, ink, heading, muted, primary, action, accent, tint, status colours.
 *    Their values are the same brand colours, so both read as one design.
 * Dark mode: <html data-theme="dark">, so `dark:` variants follow the theme switch.
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
    extend: {
      colors: {
        // Brand palette (exact logo colours)
        navy: {
          DEFAULT: "#25346B",
          50: "#EEF1F8",
          100: "#DADFEE",
          200: "#B5BEDC",
          300: "#8A97C3",
          400: "#5D6CA3",
          500: "#3C4C87",
          600: "#2D3D78",
          700: "#25346B",
          800: "#1D2954",
          900: "#161F40",
          950: "#0E142A",
        },
        steel: { DEFAULT: "#9BB3D9", light: "#C7D4EA", dark: "#7690BE" },
        rust: { DEFAULT: "#9B391E", light: "#E07856", dark: "#7E2E18" },
        // Secondary text tuned to stay above 4.5:1 on the light canvas
        slate: { 500: "#56627A" },
        paper: { DEFAULT: "#F6F8FC", deep: "#EEF2FA", line: "#E4E9F2" },
        night: {
          950: "#050B1C",
          900: "#081229",
          850: "#0B1733",
          800: "#0F1D3F",
          700: "#16284F",
          600: "#1F3563",
        },
        brand: {
          navy: "#25346B",
          "navy-dark": "#161F40",
          "navy-light": "#3C4C87",
          rust: "#9B391E",
          "rust-dark": "#7E2E18",
          "rust-light": "#E07856",
          steel: "#9BB3D9",
          "steel-light": "#C7D4EA",
          "steel-dark": "#7690BE",
          slate: "#F2F5FB",
          card: "#FFFFFF",
          "card-dark": "#0F1D3F",
        },

        // Theme tokens (values follow light/dark automatically)
        bg: token("bg"),
        canvas: token("bg"),
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
        focus: token("primary"),
        tint: token("tint"),
        success: token("success"),
        warning: token("warning"),
        danger: token("danger"),
        scrim: token("scrim"),
        piece: { navy: token("piece-navy"), sky: token("piece-sky"), brick: token("piece-brick") },
      },
      borderColor: { DEFAULT: token("line") },
      ringColor: { DEFAULT: token("primary") },
      // Type scale for the token-based pages; headings are Plus Jakarta Sans 700 (globals.css).
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
        card: "0 1px 2px rgba(14,26,56,0.04), 0 8px 24px -12px rgba(14,26,56,0.12)",
        lift: "0 2px 4px rgba(14,26,56,0.05), 0 22px 44px -18px rgba(37,52,107,0.30)",
        cta: "0 10px 24px -10px rgba(155,57,30,0.55)",
      },
      backgroundImage: {
        "brand-tri": "linear-gradient(90deg, #25346B 0 33.33%, #9BB3D9 33.33% 66.66%, #9B391E 66.66% 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
