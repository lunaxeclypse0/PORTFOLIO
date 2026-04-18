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
      fontFamily: {
        sans: ["Outfit", "Geist", "Satoshi", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Geist Mono", "monospace"],
      },
      colors: {
        accent: {
          DEFAULT: "#22d3ee",    // cyan-400 (dark mode)
          light: "#0891b2",      // cyan-600 (light mode)
          hover: "#67e8f9",      // cyan-300
        },
      },
      animation: {
        shimmer: "shimmer 2s infinite linear",
        float: "float 4s ease-in-out infinite",
        fadeSlideUp: "fadeSlideUp 0.5s ease-out forwards",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        fadeSlideUp: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      boxShadow: {
        glow: "0 0 20px rgba(34, 211, 238, 0.15)",
        "glow-sm": "0 0 10px rgba(34, 211, 238, 0.1)",
        card: "0 20px 40px -15px rgba(0,0,0,0.4)",
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#e4e4e7",
            a: { color: "#22d3ee" },
            strong: { color: "#f4f4f5" },
            code: { color: "#22d3ee" },
            "code::before": { content: '""' },
            "code::after": { content: '""' },
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
