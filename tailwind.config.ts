import type { Config } from "tailwindcss";

/**
 * Factual Solutions design tokens: the exact colors of the logo.
 *   Navy  #25346B  (top puzzle piece)
 *   Steel #9BB3D9  (left puzzle piece)
 *   Rust  #9B391E  (right puzzle piece)
 *   Ink   #0A0A0A  (wordmark lettering)
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
          light: "#F2A68E",
          dark: "#7E2E18",
        },
        ink: "#0A0A0A",
        // secondary text: 8.2:1 on white
        slate: { 500: "#4A4F5C" },
        paper: { DEFAULT: "#FFFFFF", deep: "#F2F5FB", line: "#E3E8F2" },
        // Dark mode is built on the logo navy itself (#25346B), with one deeper and one lighter step
        night: {
          950: "#1A2550",
          900: "#25346B",
          850: "#2C3C79",
          800: "#1F2C5C",
          700: "#34468A",
          600: "#3E52A0",
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
          "rust-light": "#F2A68E",
          steel: "#9BB3D9",
          "steel-light": "#C7D4EA",
          "steel-dark": "#7690BE",
          slate: "#F2F5FB",
          card: "#FFFFFF",
          "card-dark": "#1F2C5C",
        },
      },
      // Only 400 and 600 are loaded; map "bold" to 600 so nothing is faux-bolded.
      fontWeight: { bold: "600", extrabold: "600", black: "600" },
      fontFamily: {
        brand: ["var(--font-brand)", "'Segoe UI'", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-display)", "'Century Gothic'", "Futura", "-apple-system", "'Segoe UI'", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "system-ui", "Roboto", "Arial", "sans-serif"],
        sans: ["var(--font-body)", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "system-ui", "Roboto", "Arial", "sans-serif"],
      },
      // Editorial system: almost no elevation. Surfaces are separated by
      // hairline rules, not shadows; only floating menus keep a soft shadow.
      boxShadow: {
        card: "none",
        lift: "none",
        cta: "none",
        xs: "none",
        sm: "none",
        DEFAULT: "none",
        md: "none",
        lg: "0 18px 40px -24px rgba(37,52,107,0.28)",
        xl: "0 18px 40px -24px rgba(37,52,107,0.28)",
        "2xl": "0 24px 48px -24px rgba(37,52,107,0.32)",
      },
      // Tight, print-like corners everywhere (pills stay round via rounded-full).
      borderRadius: {
        sm: "2px",
        DEFAULT: "3px",
        md: "3px",
        lg: "3px",
        xl: "4px",
        "2xl": "4px",
        "3xl": "6px",
      },
      backgroundImage: {
        // kept for compatibility; renders as a quiet single hairline now
        "brand-tri": "linear-gradient(90deg, currentColor, currentColor)",
      },
    },
  },
  plugins: [],
};
export default config;
