import { Poppins } from "next/font/google";
import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

const config = {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
        "sm-320": { max: "320px" },
        md1150: { max: "1150px" },
      },
    },
    extend: {
      boxShadow: {
        custom: "0px 5px 30px rgba(255, 255, 255, 0.2)",
        innerBottom: "inset 0 -10px 15px rgba(0, 0, 0, 0.3)",
      },
      borderRadius: {
        custom: "100px",
      },
      colors: {
        customRed: "#FF1717",
        customGreen: "rgba(0, 208, 89, 1)",
      },
      fontFamily: {
        sans: ["var(--font-base)", ...fontFamily.sans],
        // Poppins: ['var(--font-poppins)', ...fontFamily.poppins]
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
