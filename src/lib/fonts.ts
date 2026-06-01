/**
 * DNAX.ai Os — Font Configuration
 *
 * Provides 8 font options via next/font/google (where available)
 * with system-stack fallbacks for fonts not in Google Fonts.
 *
 * Usage:
 *   import { FONTS, getFontById } from "@/lib/fonts";
 *   const font = getFontById("inter");
 *   <div className={font.className}>...</div>
 */

import { Inter, DM_Sans, Sora, Geist, Geist_Mono } from "next/font/google";

/* ---------------------------------------------------------------------------
   Google Font Instances
   --------------------------------------------------------------------------- */

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-family-sans",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-family-sans",
});

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-family-sans",
});

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-family-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-family-mono",
});

/* ---------------------------------------------------------------------------
   Font Definition Type
   --------------------------------------------------------------------------- */

export interface FontDefinition {
  /** Unique identifier used in configuration and persistence */
  id: string;
  /** Human-readable display name */
  name: string;
  /** CSS className to apply to a root element (sets the CSS variable) */
  className: string;
  /** CSS variable name this font uses */
  variable: string;
  /** Preview text to show in a font picker */
  preview: string;
  /** Whether this is a system font stack (no download needed) */
  isSystem: boolean;
}

/* ---------------------------------------------------------------------------
   System Font Stacks
   For fonts not available via Google Fonts, we define CSS-only fallback stacks
   that closely match the look & feel of the target typeface.
   --------------------------------------------------------------------------- */

/**
 * Satoshi — a popular geometric sans from Indian Type Foundry.
 * Falls back to: DM Sans → system-ui geometric chain.
 */
const SATOSHI_STACK =
  '"Satoshi", "DM Sans", "Geist", system-ui, -apple-system, sans-serif';

/**
 * Editorial New — a modern editorial serif.
 * Falls back to: Charter → Georgia → serif chain.
 */
const EDITORIAL_STACK =
  '"Editorial New", "Charter", "Georgia", "Noto Serif", serif';

/**
 * Helvetica Neue — the classic neutral sans.
 * Falls back to system sans-serif which includes Helvetica on macOS.
 */
const HELVETICA_STACK =
  '"Helvetica Neue", "Helvetica", "Arial", system-ui, sans-serif';

/* ---------------------------------------------------------------------------
   Font Registry — all 8 fonts
   --------------------------------------------------------------------------- */

export const FONTS: readonly FontDefinition[] = [
  {
    id: "system",
    name: "System",
    className: "",
    variable: "--font-family-sans",
    preview: "The quick brown fox jumps over the lazy dog",
    isSystem: true,
  },
  {
    id: "inter",
    name: "Inter",
    className: inter.className,
    variable: inter.variable,
    preview: "The quick brown fox jumps over the lazy dog",
    isSystem: false,
  },
  {
    id: "geist",
    name: "Geist",
    className: geist.className,
    variable: geist.variable,
    preview: "The quick brown fox jumps over the lazy dog",
    isSystem: false,
  },
  {
    id: "sora",
    name: "Sora",
    className: sora.className,
    variable: sora.variable,
    preview: "The quick brown fox jumps over the lazy dog",
    isSystem: false,
  },
  {
    id: "dm-sans",
    name: "DM Sans",
    className: dmSans.className,
    variable: dmSans.variable,
    preview: "The quick brown fox jumps over the lazy dog",
    isSystem: false,
  },
  {
    id: "satoshi",
    name: "Satoshi",
    className: "",
    variable: "--font-family-sans",
    preview: "The quick brown fox jumps over the lazy dog",
    isSystem: true,
  },
  {
    id: "editorial",
    name: "Editorial New",
    className: "",
    variable: "--font-family-sans",
    preview: "The quick brown fox jumps over the lazy dog",
    isSystem: true,
  },
  {
    id: "helvetica",
    name: "Helvetica Neue",
    className: "",
    variable: "--font-family-sans",
    preview: "The quick brown fox jumps over the lazy dog",
    isSystem: true,
  },
] as const;

/** Mono font — always available for code/terminal contexts */
export const MONO_FONT = geistMono;

/** Map of font ID → system font stack (only for system fonts) */
export const SYSTEM_FONT_STACKS: Record<string, string> = {
  system:
    'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  satoshi: SATOSHI_STACK,
  editorial: EDITORIAL_STACK,
  helvetica: HELVETICA_STACK,
};

/* ---------------------------------------------------------------------------
   Font Lookup Helpers
   --------------------------------------------------------------------------- */

/**
 * Get a FontDefinition by its id.
 * Falls back to "inter" if the requested ID is not found.
 */
export function getFontById(id: string): FontDefinition {
  return FONTS.find((f) => f.id === id) ?? FONTS[1]; // Default → Inter
}

/**
 * Get the CSS font-family value to apply to the document root
 * when the user selects a given font.
 */
export function getFontFamilyValue(id: string): string | null {
  const stack = SYSTEM_FONT_STACKS[id];
  if (stack) return stack;
  // For Google Fonts, the className handles it — no inline style needed
  return null;
}

/**
 * Available font IDs as a union type for type-safe usage.
 */
export type FontId =
  | "system"
  | "inter"
  | "geist"
  | "sora"
  | "dm-sans"
  | "satoshi"
  | "editorial"
  | "helvetica";
