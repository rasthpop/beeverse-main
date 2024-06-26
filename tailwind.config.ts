import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    // fontSize: {
    //   xs: '10px',
    //   sm: '0.8rem',
    //   base: '1rem',
    //   xl: '1.25rem',
    //   '2xl': '1.563rem',
    //   '3xl': '1.953rem',
    //   '4xl': '2.441rem',
    //   '5xl': '3.052rem',
    // },
    extend: {
      backgroundImage:{
        'R1': "url('icons/level/R1.png')"
      },
      colors: {
        background: "#1C1F24",
        foreground: "#EDEDED",
        backdrop: "#835339",
		border: "#521A0C",
        hover: "#1C1F24",
        hint: "#CBC7C6",
		ring: "transparent",
		overlay: "#D9D9D9",
		gold: "#FFEC45",
        primary: {
          DEFAULT: "#A67752",
          foreground: "#FFFFFF"
        },
        "gradient-a": "#FF6914",
        "gradient-b": "#FFF571",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
		'montserrat': ['Inter', ...fontFamily.sans],
      },
      boxShadow: {
        'primary-main': "0px 0px 40px 0px #FF691495",
        "primary-max": "0px 0px 72px 0px #FF6914"
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
} satisfies Config

export default config