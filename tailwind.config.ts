import type { Config } from "tailwindcss";

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
        brand: {
          navy: "#152238",
          "navy-dark": "#0B1320",
          "navy-light": "#1E3150",
          rust: "#A33C29",
          "rust-dark": "#842F1F",
          "rust-light": "#BF4A33",
          steel: "#8EA9D3",
          "steel-light": "#B5C8E6",
          "steel-dark": "#6B88B5",
          slate: "#F1F5F9",
          card: "#FFFFFF",
          "card-dark": "#111B2E",
        },
      },
      fontFamily: {
        display: ["'Plus Jakarta Sans'", "sans-serif"],
        body: ["Inter", "sans-serif"],
        sans: ["Inter", "'Plus Jakarta Sans'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
