import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        electric: "#00FF94",
        cyber: "#2979FF",
        alert: "#FF9800",
        dark: {
          base: "#0A0E1A",
          card: "#131824",
          border: "#1E2433",
        },
      },
      fontFamily: {
        sans: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "sans-serif"],
        mono: ["Courier New", "Consolas", "Monaco", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 5px #00FF94, 0 0 10px #00FF94" },
          "100%": { boxShadow: "0 0 10px #00FF94, 0 0 20px #00FF94, 0 0 30px #00FF94" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
