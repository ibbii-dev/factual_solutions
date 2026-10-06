import type { Config } from "tailwindcss";

/**
 * Factual Solutions design tokens: the exact colors of the logo.
 *   Navy  #25346B  (top puzzle piece)
 *   Steel #9BB3D9  (left puzzle piece)
 *   Rust  #9B391E  (right puzzle piece)
 *   Ink   #0E1A38  (text)
 * Theme-aware tokens (accent, focus, surface…) read RGB channels from CSS
 * variables defined in globals.css so they adapt between light and dark.
 */
const v = (name: string) => `rgb(var(${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Exact logo colors (sampled from the original logo file)
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
        steel: {
          DEFAULT: "#9BB3D9",
          light: "#C7D4EA",
          dark: "#7690BE",
        },
        rust: {
          DEFAULT: "#9B391E",
          light: "#E07856",
          dark: "#7E2E18",
        },
        ink: "#0E1A38",
        // secondary text tuned to stay above 4.5:1 on the light canvas
        slate: { 500: "#56627A" },
        paper: { DEFAULT: "#F6F8FC", deep: "#EEF2FA", line: "#E4E9F2" },
        // Dark theme: deep midnight navy surfaces
        night: {
          950: "#050B1C",
          900: "#081229",
          850: "#0B1733",
          800: "#0F1D3F",
          700: "#16284F",
          600: "#1F3563",
        },
        // Theme-aware semantic tokens
        accent: v("--fs-accent"),
        focus: v("--fs-focus"),
        surface: v("--fs-surface"),
        canvas: v("--fs-canvas"),

        // Legacy aliases (kept so existing class names keep working)
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
