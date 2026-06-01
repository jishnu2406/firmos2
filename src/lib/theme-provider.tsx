/**
 * DNAX.ai Os — Theme Provider
 *
 * React context provider for theme and font management.
 * Reads/writes preferences to localStorage. Sets the `data-theme` attribute
 * on <html> and applies the appropriate font className / CSS variable.
 *
 * Usage:
 *   // In layout.tsx:
 *   <ThemeProvider><App /></ThemeProvider>
 *
 *   // In any component:
 *   const { theme, setTheme, font, setFont, themes, fonts } = useTheme();
 */

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  FONTS,
  getFontById,
  getFontFamilyValue,
  MONO_FONT,
  type FontDefinition,
  type FontId,
} from "./fonts";

/* ============================================================================
   Theme Metadata
   ============================================================================ */

export interface ThemeDefinition {
  /** Unique slug identifier (used in data-theme attribute) */
  id: string;
  /** Human-readable display name */
  name: string;
  /** Whether this is a dark or light theme */
  isDark: boolean;
  /** Preview colors for a theme picker UI */
  preview: {
    bg: string;
    surface: string;
    accent: string;
    accent2: string;
  };
}

export const THEMES: readonly ThemeDefinition[] = [
  {
    id: "obsidian",
    name: "Obsidian",
    isDark: true,
    preview: { bg: "#0a0a0a", surface: "#111111", accent: "#ffffff", accent2: "#6366f1" },
  },
  {
    id: "arctic",
    name: "Arctic",
    isDark: false,
    preview: { bg: "#f8f8f8", surface: "#ffffff", accent: "#000000", accent2: "#6366f1" },
  },
  {
    id: "midnight-navy",
    name: "Midnight Navy",
    isDark: true,
    preview: { bg: "#070b14", surface: "#0d1424", accent: "#60a5fa", accent2: "#818cf8" },
  },
  {
    id: "warm-sand",
    name: "Warm Sand",
    isDark: false,
    preview: { bg: "#f5f0e8", surface: "#faf7f2", accent: "#1a1714", accent2: "#b5602a" },
  },
  {
    id: "forest",
    name: "Forest",
    isDark: true,
    preview: { bg: "#0c130d", surface: "#111a12", accent: "#4ade80", accent2: "#86efac" },
  },
  {
    id: "graphite",
    name: "Graphite",
    isDark: true,
    preview: { bg: "#1a1a1a", surface: "#242424", accent: "#e5e5e5", accent2: "#a3a3a3" },
  },
  {
    id: "rose-quartz",
    name: "Rose Quartz",
    isDark: true,
    preview: { bg: "#1a0a0e", surface: "#22101a", accent: "#fb7185", accent2: "#fda4af" },
  },
  {
    id: "blueprint",
    name: "Blueprint",
    isDark: true,
    preview: { bg: "#03071e", surface: "#05101f", accent: "#00d4ff", accent2: "#0ea5e9" },
  },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];

/* ============================================================================
   Context Types
   ============================================================================ */

interface ThemeContextValue {
  /** Currently active theme ID */
  theme: ThemeId;
  /** Set the active theme (persists to localStorage) */
  setTheme: (id: ThemeId) => void;

  /** Currently active font ID */
  font: FontId;
  /** Set the active font (persists to localStorage) */
  setFont: (id: FontId) => void;

  /** Full list of available themes with metadata */
  themes: readonly ThemeDefinition[];
  /** Full list of available fonts with metadata */
  fonts: readonly FontDefinition[];

  /** Whether the current theme is dark */
  isDark: boolean;

  /** The resolved theme definition for the current theme */
  resolvedTheme: ThemeDefinition;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

/* ============================================================================
   Storage Keys
   ============================================================================ */

const STORAGE_KEY_THEME = "dnax-os-theme";
const STORAGE_KEY_FONT = "dnax-os-font";
const DEFAULT_THEME: ThemeId = "obsidian";
const DEFAULT_FONT: FontId = "inter";

/* ============================================================================
   Provider Component
   ============================================================================ */

interface ThemeProviderProps {
  children: ReactNode;
  /** Override the default theme (useful for SSR or testing) */
  defaultTheme?: ThemeId;
  /** Override the default font */
  defaultFont?: FontId;
}

export function ThemeProvider({
  children,
  defaultTheme = DEFAULT_THEME,
  defaultFont = DEFAULT_FONT,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeId>(defaultTheme);
  const [font, setFontState] = useState<FontId>(defaultFont);
  const [mounted, setMounted] = useState(false);

  /* ----- Hydrate from localStorage on mount ----- */
  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem(STORAGE_KEY_THEME) as ThemeId | null;
      const storedFont = localStorage.getItem(STORAGE_KEY_FONT) as FontId | null;

      if (storedTheme && THEMES.some((t) => t.id === storedTheme)) {
        setThemeState(storedTheme);
      }
      if (storedFont && FONTS.some((f) => f.id === storedFont)) {
        setFontState(storedFont);
      }
    } catch {
      // localStorage unavailable (SSR, privacy mode, etc.)
    }
    setMounted(true);
  }, []);

  /* ----- Apply theme to document ----- */
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);

    // Persist
    try {
      localStorage.setItem(STORAGE_KEY_THEME, theme);
    } catch {
      // Ignore write failures
    }
  }, [theme, mounted]);

  /* ----- Apply font to document ----- */
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    const fontDef = getFontById(font);

    // Remove all font classNames first
    FONTS.forEach((f) => {
      if (f.className) {
        f.className.split(" ").forEach((c) => {
          if (c) root.classList.remove(c);
        });
      }
    });

    // Always apply mono font className
    if (MONO_FONT.className) {
      MONO_FONT.className.split(" ").forEach((c) => {
        if (c) root.classList.add(c);
      });
    }
    // Apply mono variable
    if (MONO_FONT.variable) {
      MONO_FONT.variable.split(" ").forEach((c) => {
        if (c) root.classList.add(c);
      });
    }

    // Apply the selected font className (sets the CSS variable for Google fonts)
    if (fontDef.className) {
      fontDef.className.split(" ").forEach((c) => {
        if (c) root.classList.add(c);
      });
    }

    // For system fonts, apply the font-family directly via CSS variable
    const systemStack = getFontFamilyValue(font);
    if (systemStack) {
      root.style.setProperty("--font-family-sans", systemStack);
    } else {
      root.style.removeProperty("--font-family-sans");
    }

    // Persist
    try {
      localStorage.setItem(STORAGE_KEY_FONT, font);
    } catch {
      // Ignore write failures
    }
  }, [font, mounted]);

  /* ----- Theme setter with validation ----- */
  const setTheme = useCallback((id: ThemeId) => {
    if (THEMES.some((t) => t.id === id)) {
      setThemeState(id);
    }
  }, []);

  /* ----- Font setter with validation ----- */
  const setFont = useCallback((id: FontId) => {
    if (FONTS.some((f) => f.id === id)) {
      setFontState(id);
    }
  }, []);

  /* ----- Derived values ----- */
  const resolvedTheme = useMemo(
    () => THEMES.find((t) => t.id === theme) ?? THEMES[0],
    [theme]
  );

  const isDark = resolvedTheme.isDark;

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      font,
      setFont,
      themes: THEMES,
      fonts: FONTS,
      isDark,
      resolvedTheme,
    }),
    [theme, setTheme, font, setFont, isDark, resolvedTheme]
  );

  /* ----- Prevent flash of wrong theme ----- */
  if (!mounted) {
    return (
      <ThemeContext.Provider value={value}>
        <div style={{ visibility: "hidden" }}>{children}</div>
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

/* ============================================================================
   useTheme Hook
   ============================================================================ */

/**
 * Access the current theme and font state, along with setters and metadata.
 *
 * @throws Error if used outside of <ThemeProvider>
 *
 * @example
 *   const { theme, setTheme, isDark, themes, fonts } = useTheme();
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error(
      "useTheme() must be used within a <ThemeProvider>. " +
        "Wrap your application root in <ThemeProvider> to provide theme context."
    );
  }
  return context;
}

/* ============================================================================
   Inline Theme Script (prevents flash of unstyled content)
   Place this in <head> of your HTML for instant theme application on load.
   ============================================================================ */

/**
 * Returns a script string that immediately applies the stored theme
 * before React hydrates. Use in layout.tsx or _document.tsx:
 *
 * @example
 *   <script dangerouslySetInnerHTML={{ __html: getThemeScript() }} />
 */
export function getThemeScript(): string {
  return `
    (function() {
      try {
        var theme = localStorage.getItem('${STORAGE_KEY_THEME}');
        if (theme) {
          document.documentElement.setAttribute('data-theme', theme);
        }
      } catch(e) {}
    })();
  `.trim();
}
