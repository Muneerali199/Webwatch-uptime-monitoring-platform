import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html', 
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(240 3.7% 15.9%)",
        input: "hsl(240 3.7% 15.9%)",
        ring: "hsl(240 4.9% 83.9%)",
        background: "hsl(240 10% 3.9%)",
        foreground: "hsl(0 0% 98%)",
        primary: {
          DEFAULT: "hsl(180 100% 50%)",
          foreground: "hsl(0 0% 98%)",
          50: "hsl(180 100% 95%)",
          100: "hsl(180 100% 90%)",
          200: "hsl(180 100% 80%)",
          300: "hsl(180 100% 70%)",
          400: "hsl(180 100% 60%)",
          500: "hsl(180 100% 50%)",
          600: "hsl(180 100% 40%)",
          700: "hsl(180 100% 30%)",
          800: "hsl(180 100% 20%)",
          900: "hsl(180 100% 10%)",
        },
        secondary: {
          DEFAULT: "hsl(270 100% 60%)",
          foreground: "hsl(0 0% 98%)",
          50: "hsl(270 100% 95%)",
          100: "hsl(270 100% 90%)",
          200: "hsl(270 100% 80%)",
          300: "hsl(270 100% 70%)",
          400: "hsl(270 100% 65%)",
          500: "hsl(270 100% 60%)",
          600: "hsl(270 100% 50%)",
          700: "hsl(270 100% 40%)",
          800: "hsl(270 100% 30%)",
          900: "hsl(270 100% 20%)",
        },
        accent: {
          DEFAULT: "hsl(328 100% 54%)",
          foreground: "hsl(0 0% 98%)",
          50: "hsl(328 100% 95%)",
          100: "hsl(328 100% 90%)",
          200: "hsl(328 100% 80%)",
          300: "hsl(328 100% 70%)",
          400: "hsl(328 100% 60%)",
          500: "hsl(328 100% 54%)",
          600: "hsl(328 100% 45%)",
          700: "hsl(328 100% 35%)",
          800: "hsl(328 100% 25%)",
          900: "hsl(328 100% 15%)",
        },
        success: {
          DEFAULT: "hsl(142 76% 45%)",
          foreground: "hsl(0 0% 98%)",
          50: "hsl(142 76% 95%)",
          100: "hsl(142 76% 90%)",
          200: "hsl(142 76% 80%)",
          300: "hsl(142 76% 70%)",
          400: "hsl(142 76% 60%)",
          500: "hsl(142 76% 45%)",
          600: "hsl(142 76% 35%)",
          700: "hsl(142 76% 25%)",
          800: "hsl(142 76% 15%)",
          900: "hsl(142 76% 5%)",
        },
        warning: {
          DEFAULT: "hsl(35 100% 50%)",
          foreground: "hsl(0 0% 98%)",
        },
        error: {
          DEFAULT: "hsl(358 100% 54%)",
          foreground: "hsl(0 0% 98%)",
        },
        muted: {
          DEFAULT: "hsl(240 3.7% 15.9%)",
          foreground: "hsl(240 5% 64.9%)",
        },
        card: {
          DEFAULT: "hsl(240 5% 9%)",
          foreground: "hsl(0 0% 98%)",
        },
        popover: {
          DEFAULT: "hsl(240 10% 3.9%)",
          foreground: "hsl(0 0% 98%)",
        },
      },
      borderRadius: {
        lg: "0.5rem",
        md: "calc(0.5rem - 2px)",
        sm: "calc(0.5rem - 4px)",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
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
        gradient: {
          '0%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
          '100%': {
            backgroundPosition: '0% 50%',
          },
        },
        pulse: {
          '0%, 100%': {
            opacity: 1,
          },
          '50%': {
            opacity: 0.5,
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        gradient: 'gradient 15s ease infinite',
        pulse: 'pulse 3s infinite',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}