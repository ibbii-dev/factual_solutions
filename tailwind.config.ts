import type { Config } from "tailwindcss";

/**
 * Factual Solutions design tokens — derived directly from the logo:
 *   Navy  #1F3A7D  (top puzzle face)
 *   Steel #82A9E2  (left puzzle face)
 *   Rust  #A2351E  (right puzzle face)
 *   Ink   #0E1A38  (wordmark, deepened toward the logo navy)
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
        // Fixed logo colors
        navy: {
          DEFAULT: "#1F3A7D",
          50: "#EEF2FA",
          100: "#DCE4F4",
          200: "#B9C8E8",
          300: "#8EA6D6",
          400: "#5C7BBE",
          500: "#3A5BA3",
          600: "#2A4A92",
          700: "#1F3A7D",
          800: "#182E63",
          900: "#12234B",
          950: "#0B1631",
        },
        steel: {
          DEFAULT: "#82A9E2",
          light: "#B4CDF0",
          dark: "#5E86C4",
        },
        rust: {
          DEFAULT: "#A2351E",
          light: "#C2482C",
          dark: "#872A17",
        },
        ink: "#0E1A38",
        // slate-500 tuned darker so muted text stays above 4.5:1 on the warm paper background
        slate: { 500: "#566173" },
        paper: { DEFAULT: "#F7F5F0", deep: "#EFECE4", line: "#DDD8CC" },
        // Navy-tinted dark surfaces (dark mode)
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
          navy: "#1F3A7D",
          "navy-dark": "#12234B",
          "navy-light": "#3A5BA3",
          rust: "#A2351E",
          "rust-dark": "#872A17",
          "rust-light": "#DA6A4F",
          steel: "#82A9E2",
          "steel-light": "#B4CDF0",
          "steel-dark": "#5E86C4",
          slate: "#F4F6FB",
          card: "#FFFFFF",
          "card-dark": "#0F1D3F",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "Cambria", "'Times New Roman'", "serif"],
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
        lg: "0 18px 40px -24px rgba(14,26,56,0.28)",
        xl: "0 18px 40px -24px rgba(14,26,56,0.28)",
        "2xl": "0 24px 48px -24px rgba(14,26,56,0.32)",
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
