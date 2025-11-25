import {heroui} from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      colors:{
        "gris-muy-fuerte": "#1B2E87",
        "gris-fuerte": "#3857E7",
        "gris-intermedio": "#CDD9FD",
        "gris-claro": "#E5EAF8"
        // "gris-fuerte": "#8C8C8C",
        // "gris-intermedio": "#B2B1B1",
        // "gris-claro": "#D9D9D9"
      }
    },
  },
  darkMode: "class",
  plugins: [heroui()],
}

module.exports = config;