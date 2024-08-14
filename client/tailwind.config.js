/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#E43030",
          light: "#FF6F61",
          dark: "#A6201A",
        },
        secondary: {
          DEFAULT: "#282828",
          light: "#3C3C3C",
          dark: "#1C1C1C",
        },
        gray: {
          50: "#F9FAFB",
          100: "#F7F8FA",
          200: "#EAECF0",
          300: "#D0D5DD",
          400: "#B3BAC5",
          500: "#667085",
          600: "#475467",
          700: "#344054",
          800: "#1F2937",
          900: "#101828",
        },
        white: {
          DEFAULT: "#FFFFFF",
          100: "#F4F4F4",
          200: "#EDF0F8",
        },
        black: {
          DEFAULT: "#000000",
          100: "#3D4258",
        },
        blue: {
          100: "#E0F2FE",
          600: "#2563EB",
        },
        red: {
          100: "#FEE2E2",
          600: "#DC2626",
        },
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
        30: "7.5rem",
        88: "22rem",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
        md: "0 4px 6px rgba(0, 0, 0, 0.1)",
        lg: "0 10px 15px rgba(0, 0, 0, 0.1)",
        xl: "0 20px 25px rgba(0, 0, 0, 0.1)",
        "2xl": "0 25px 50px rgba(0, 0, 0, 0.25)",
      },
      maxWidth: {
        "8xl": "90rem",
        "9xl": "100rem",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
      borderRadius: {
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      zIndex: {
        60: "60",
        70: "70",
        80: "80",
        90: "90",
        100: "100",
      },
      opacity: {
        10: "0.1",
        90: "0.9",
      },
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
        colors: "color, background-color, border-color",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
}
