import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        cloud: {
          50: "#eef5ff",
          100: "#d9e8ff",
          200: "#bcd8ff",
          300: "#8ec1ff",
          400: "#599fff",
          500: "#3478ff",
          600: "#1b57f5",
          700: "#1443e1",
          800: "#1736b6",
          900: "#19338f",
          950: "#142057",
        },
        aws: { DEFAULT: "#FF9900", dark: "#232F3E" },
        gcp: { DEFAULT: "#4285F4", dark: "#1A73E8" },
        azure: { DEFAULT: "#0078D4", dark: "#005A9E" },
        terminal: {
          bg: "#0d1117",
          text: "#c9d1d9",
          green: "#3fb950",
          red: "#f85149",
          yellow: "#d29922",
          blue: "#58a6ff",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "typing": "typing 1.5s steps(3) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        typing: {
          "0%": { content: "''" },
          "33%": { content: "'.'" },
          "66%": { content: "'..'" },
          "100%": { content: "'...'" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
