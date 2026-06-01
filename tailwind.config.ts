/**
 * NEXUS OS — Tailwind CSS v4 Configuration
 *
 * NOTE: Tailwind CSS v4 uses CSS-based configuration by default (see globals.css
 * with @theme inline blocks). This config file provides a JS-based extension point
 * for plugins and advanced customization.
 *
 * The primary design tokens (colors, spacing, border-radius, shadows, animations)
 * are defined in src/app/globals.css via @theme inline, which is the canonical
 * Tailwind v4 approach. This file supplements those with additional plugin config.
 */

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* ----------------------------------------------------------------
         Colors — mapped to CSS custom properties defined in themes.css
         These supplement the @theme inline block in globals.css
         ---------------------------------------------------------------- */
      colors: {
        bg: {
          DEFAULT: "var(--bg)",
          secondary: "var(--bg-secondary)",
        },
        surface: {
          DEFAULT: "var(--surface)",
          hover: "var(--surface-hover)",
          active: "var(--surface-active)",
        },
        border: {
          DEFAULT: "var(--border)",
          hover: "var(--border-hover)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          tertiary: "var(--text-tertiary)",
          inverse: "var(--text-inverse)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
          "2": "var(--accent-2)",
          "2-hover": "var(--accent-2-hover)",
        },
        success: "var(--success)",
        warning: "var(--warning)",
        error: "var(--error)",
        info: "var(--info)",
        glass: {
          bg: "var(--glass-bg)",
          border: "var(--glass-border)",
        },
        skeleton: {
          base: "var(--skeleton-base)",
          shine: "var(--skeleton-shine)",
        },
      },

      /* ----------------------------------------------------------------
         Spacing — custom additions beyond Tailwind defaults
         ---------------------------------------------------------------- */
      spacing: {
        "4.5": "1.125rem",
        "13": "3.25rem",
        "15": "3.75rem",
        "18": "4.5rem",
        "88": "22rem",
        "92": "23rem",
        "100": "25rem",
        "120": "30rem",
        "128": "32rem",
        "144": "36rem",
      },

      /* ----------------------------------------------------------------
         Border Radius
         ---------------------------------------------------------------- */
      borderRadius: {
        sm: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "20px",
        "3xl": "24px",
      },

      /* ----------------------------------------------------------------
         Font Family
         ---------------------------------------------------------------- */
      fontFamily: {
        sans: [
          "var(--font-family-sans)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
        mono: [
          "var(--font-family-mono)",
          "ui-monospace",
          "'Cascadia Code'",
          "monospace",
        ],
        display: [
          "var(--font-family-display)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },

      /* ----------------------------------------------------------------
         Box Shadows
         ---------------------------------------------------------------- */
      boxShadow: {
        xs: "0 1px 2px rgba(0, 0, 0, 0.04)",
        subtle: "0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)",
        card: "0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)",
        elevated: "0 4px 16px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08)",
        float: "0 8px 32px rgba(0, 0, 0, 0.16), 0 4px 8px rgba(0, 0, 0, 0.1)",
        overlay: "0 16px 48px rgba(0, 0, 0, 0.24), 0 8px 16px rgba(0, 0, 0, 0.12)",
        glow: "0 0 20px rgba(99, 102, 241, 0.15)",
      },

      /* ----------------------------------------------------------------
         Animations
         ---------------------------------------------------------------- */
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeDown: {
          from: { opacity: "0", transform: "translateY(-8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        slideInRight: {
          from: { opacity: "0", transform: "translateX(16px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        slideInLeft: {
          from: { opacity: "0", transform: "translateX(-16px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        countUp: {
          from: { opacity: "0", transform: "translateY(100%)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        shimmer: "shimmer 2s ease-in-out infinite",
        "fade-in": "fadeIn 200ms ease-out",
        "fade-up": "fadeUp 300ms ease-out",
        "fade-down": "fadeDown 300ms ease-out",
        "scale-in": "scaleIn 200ms ease-out",
        "slide-in-right": "slideInRight 300ms ease-out",
        "slide-in-left": "slideInLeft 300ms ease-out",
        "spin-slow": "spin 3s linear infinite",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
        "count-up": "countUp 600ms ease-out forwards",
      },

      /* ----------------------------------------------------------------
         Transition durations & timing functions
         ---------------------------------------------------------------- */
      transitionDuration: {
        "0": "0ms",
        "150": "150ms",
        "200": "200ms",
        "250": "250ms",
        "300": "300ms",
        "400": "400ms",
        "500": "500ms",
      },
      transitionTimingFunction: {
        "ease-spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "ease-smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
        "ease-out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
      },

      /* ----------------------------------------------------------------
         Screens (breakpoints)
         ---------------------------------------------------------------- */
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1920px",
      },
    },
  },
  plugins: [],
};

export default config;
