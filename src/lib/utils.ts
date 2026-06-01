/**
 * DNAX.ai Os — Utility Functions
 *
 * Core utilities for classNames, formatting, and timing helpers.
 * All functions are fully typed with zero external dependencies beyond
 * clsx + tailwind-merge (already in package.json).
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/* ============================================================================
   className Merge — cn()
   Combines clsx conditional logic with tailwind-merge deduplication.
   ============================================================================ */

/**
 * Merge class names with Tailwind CSS conflict resolution.
 *
 * @example
 *   cn("px-4 py-2", isActive && "bg-accent", className)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/* ============================================================================
   Type-Safe Variant Helper
   Similar to CVA but minimal — generates class strings from a variant map.
   ============================================================================ */

type VariantConfig<V extends Record<string, Record<string, string>>> = {
  base?: string;
  variants: V;
  defaultVariants?: {
    [K in keyof V]?: keyof V[K];
  };
  compoundVariants?: Array<
    {
      [K in keyof V]?: keyof V[K];
    } & { className: string }
  >;
};

type VariantProps<V extends Record<string, Record<string, string>>> = {
  [K in keyof V]?: keyof V[K];
} & { className?: string };

/**
 * Create a type-safe variant class builder.
 *
 * @example
 *   const button = variants({
 *     base: "px-4 py-2 rounded-md font-medium",
 *     variants: {
 *       intent: {
 *         primary: "bg-accent text-text-inverse",
 *         secondary: "bg-surface text-text-primary border border-border",
 *         ghost: "bg-transparent text-text-secondary hover:bg-surface-hover",
 *       },
 *       size: {
 *         sm: "text-body-sm h-8",
 *         md: "text-body h-9",
 *         lg: "text-body-lg h-10",
 *       },
 *     },
 *     defaultVariants: { intent: "primary", size: "md" },
 *   });
 *
 *   button({ intent: "secondary", size: "lg" })
 *   // => "px-4 py-2 rounded-md font-medium bg-surface text-text-primary border border-border text-body-lg h-10"
 */
export function variants<V extends Record<string, Record<string, string>>>(
  config: VariantConfig<V>
) {
  return (props?: VariantProps<V>): string => {
    const { base = "", variants: variantDefs, defaultVariants = {}, compoundVariants = [] } = config;
    const resolved = { ...defaultVariants, ...props } as Record<string, string | undefined>;

    const variantClasses: string[] = [];

    for (const [key, value] of Object.entries(resolved)) {
      if (key === "className" || value === undefined) continue;
      const variantGroup = variantDefs[key];
      if (variantGroup && value in variantGroup) {
        variantClasses.push(variantGroup[value]);
      }
    }

    // Evaluate compound variants
    for (const compound of compoundVariants) {
      const { className: compoundClass, ...conditions } = compound;
      const matches = Object.entries(conditions).every(
        ([key, value]) => resolved[key] === value
      );
      if (matches) {
        variantClasses.push(compoundClass);
      }
    }

    return cn(base, ...variantClasses, props?.className);
  };
}

/* ============================================================================
   Date Formatting
   ============================================================================ */

/**
 * Format a date into a human-readable string.
 *
 * @param date  - Date instance or ISO string
 * @param style - "short" | "medium" | "long" | "relative"
 */
export function formatDate(
  date: Date | string | number,
  style: "short" | "medium" | "long" | "relative" = "medium"
): string {
  const d = date instanceof Date ? date : new Date(date);

  if (style === "relative") {
    return formatRelativeTime(d);
  }

  const options: Intl.DateTimeFormatOptions =
    style === "short"
      ? { month: "short", day: "numeric" }
      : style === "medium"
        ? { month: "short", day: "numeric", year: "numeric" }
        : {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          };

  return new Intl.DateTimeFormat("en-US", options).format(d);
}

/**
 * Format a date as a relative time string ("2 hours ago", "in 3 days").
 */
function formatRelativeTime(date: Date): string {
  const now = Date.now();
  const diff = now - date.getTime();
  const absDiff = Math.abs(diff);
  const isPast = diff > 0;

  const seconds = Math.floor(absDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  const fmt = (value: number, unit: Intl.RelativeTimeFormatUnit) =>
    new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
      isPast ? -value : value,
      unit
    );

  if (seconds < 60) return fmt(seconds, "second");
  if (minutes < 60) return fmt(minutes, "minute");
  if (hours < 24) return fmt(hours, "hour");
  if (days < 7) return fmt(days, "day");
  if (weeks < 5) return fmt(weeks, "week");
  if (months < 12) return fmt(months, "month");
  return fmt(years, "year");
}

/* ============================================================================
   Number Formatting
   ============================================================================ */

/**
 * Format a number with locale-aware separators and optional precision.
 *
 * @example
 *   formatNumber(1234567.89)       // "1,234,567.89"
 *   formatNumber(0.156, { style: "percent" }) // "15.6%"
 */
export function formatNumber(
  value: number,
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat("en-US", options).format(value);
}

/**
 * Format a number as compact (1.2K, 3.4M, etc.).
 */
export function formatCompact(value: number): string {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1,
  }).format(value);
}

/* ============================================================================
   Currency Formatting
   ============================================================================ */

/**
 * Format a number as currency.
 *
 * @example
 *   formatCurrency(1234.5)                // "$1,234.50"
 *   formatCurrency(1234.5, "EUR")         // "€1,234.50"
 */
export function formatCurrency(
  value: number,
  currency: string = "USD",
  locale: string = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/* ============================================================================
   Debounce
   ============================================================================ */

/**
 * Returns a debounced version of the provided function.
 * The function will only execute after `delay` ms of inactivity.
 *
 * @example
 *   const debouncedSearch = debounce((query: string) => search(query), 300);
 */
export function debounce<T extends (...args: Parameters<T>) => void>(
  fn: T,
  delay: number
): T & { cancel: () => void } {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const debounced = ((...args: Parameters<T>) => {
    if (timeoutId !== null) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, delay);
  }) as T & { cancel: () => void };

  debounced.cancel = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return debounced;
}

/* ============================================================================
   Throttle
   ============================================================================ */

/**
 * Returns a throttled version of the provided function.
 * The function will execute at most once every `limit` ms.
 *
 * @example
 *   const throttledScroll = throttle(() => updatePosition(), 100);
 */
export function throttle<T extends (...args: Parameters<T>) => void>(
  fn: T,
  limit: number
): T & { cancel: () => void } {
  let inThrottle = false;
  let lastArgs: Parameters<T> | null = null;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const throttled = ((...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      timeoutId = setTimeout(() => {
        inThrottle = false;
        if (lastArgs !== null) {
          fn(...(lastArgs as any));
          lastArgs = null;
        }
      }, limit);
    } else {
      lastArgs = args;
    }
  }) as T & { cancel: () => void };

  throttled.cancel = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    inThrottle = false;
    lastArgs = null;
  };

  return throttled;
}

/* ============================================================================
   Miscellaneous Helpers
   ============================================================================ */

/**
 * Clamp a number between a min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Generate a random ID string (for keys, IDs, etc.).
 * Not cryptographically secure — use crypto.randomUUID() for that.
 */
export function generateId(length: number = 8): string {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
}

/**
 * Sleep for a given number of milliseconds.
 * Useful in async sequences for staggering or delays.
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Truncate a string to a maximum length, adding an ellipsis if truncated.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 1).trimEnd() + "…";
}

/**
 * Type guard: checks if a value is not null or undefined.
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}
