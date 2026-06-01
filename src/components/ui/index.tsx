"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

/* ========================================================================
   BUTTON
   ======================================================================== */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-2)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97] select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--accent)] text-[var(--text-inverse)] hover:opacity-90 shadow-sm",
        secondary:
          "bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border)] hover:bg-[var(--surface-hover)] hover:border-[var(--border-hover)]",
        ghost:
          "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]",
        outline:
          "border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--surface)] hover:border-[var(--border-hover)]",
        danger:
          "bg-[var(--error)] text-white hover:opacity-90",
        success:
          "bg-[var(--success)] text-white hover:opacity-90",
        link: "text-[var(--accent-2)] underline-offset-4 hover:underline p-0 h-auto",
        icon: "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] rounded-lg",
      },
      size: {
        xs: "h-7 px-2.5 text-xs rounded-md",
        sm: "h-8 px-3 text-xs",
        md: "h-9 px-4 text-sm",
        lg: "h-10 px-5 text-sm",
        xl: "h-12 px-6 text-base",
        icon: "h-9 w-9",
        "icon-sm": "h-7 w-7",
        "icon-lg": "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

/* ========================================================================
   INPUT
   ======================================================================== */
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]">
            {leftIcon}
          </div>
        )}
        <input
          className={cn(
            "flex h-9 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] transition-colors duration-200",
            "focus:outline-none focus:ring-2 focus:ring-[var(--accent-2)] focus:border-transparent",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            leftIcon ? "pl-10" : "",
            rightIcon ? "pr-10" : "",
            error ? "border-[var(--error)] focus:ring-[var(--error)]" : "",
            className
          )}
          ref={ref}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]">
            {rightIcon}
          </div>
        )}
        {error && (
          <p className="mt-1.5 text-xs text-[var(--error)] animate-in fade-in slide-in-from-top-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

/* ========================================================================
   BADGE
   ======================================================================== */
const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--surface-hover)] text-[var(--text-secondary)] border border-[var(--border)]",
        primary:
          "bg-[var(--accent-2)]/15 text-[var(--accent-2)] border border-[var(--accent-2)]/20",
        success:
          "bg-[var(--success)]/15 text-[var(--success)] border border-[var(--success)]/20",
        warning:
          "bg-[var(--warning)]/15 text-[var(--warning)] border border-[var(--warning)]/20",
        error:
          "bg-[var(--error)]/15 text-[var(--error)] border border-[var(--error)]/20",
        info:
          "bg-[var(--info)]/15 text-[var(--info)] border border-[var(--info)]/20",
      },
      size: {
        sm: "px-1.5 py-0.5 text-[10px]",
        md: "px-2 py-0.5 text-xs",
        lg: "px-2.5 py-1 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant,
  size,
  dot,
  children,
  ...props
}) => {
  return (
    <span className={cn(badgeVariants({ variant, size, className }))} {...props}>
      {dot && (
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{
            backgroundColor: "currentColor",
          }}
        />
      )}
      {children}
    </span>
  );
};

/* ========================================================================
   AVATAR
   ======================================================================== */
export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  status?: "online" | "offline" | "busy" | "away";
}

const avatarSizes = {
  xs: "h-6 w-6 text-[10px]",
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

const statusColors = {
  online: "bg-emerald-500",
  offline: "bg-gray-400",
  busy: "bg-red-500",
  away: "bg-amber-500",
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  fallback,
  size = "md",
  status,
  className,
  ...props
}) => {
  const initials = fallback
    ? fallback
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <div className={cn("relative inline-flex shrink-0", className)} {...props}>
      <div
        className={cn(
          "rounded-full flex items-center justify-center overflow-hidden",
          "bg-gradient-to-br from-[var(--accent-2)] to-[var(--accent)] text-white font-medium",
          avatarSizes[size]
        )}
      >
        {src ? (
          <img
            src={src}
            alt={alt || fallback || "Avatar"}
            className="h-full w-full object-cover"
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>
      {status && (
        <span
          className={cn(
            "absolute bottom-0 right-0 block rounded-full ring-2 ring-[var(--bg)]",
            statusColors[status],
            size === "xs" || size === "sm" ? "h-2 w-2" : "h-3 w-3"
          )}
        />
      )}
    </div>
  );
};

/* ========================================================================
   CARD
   ======================================================================== */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "bordered" | "elevated";
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

export const Card: React.FC<CardProps> = ({
  variant = "default",
  hover = false,
  padding = "md",
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        "rounded-xl transition-all duration-200",
        variant === "default" &&
          "bg-[var(--surface)] border border-[var(--border)]",
        variant === "glass" &&
          "glass border border-[var(--glass-border)]",
        variant === "bordered" &&
          "border border-[var(--border)]",
        variant === "elevated" &&
          "bg-[var(--surface)] border border-[var(--border)] shadow-lg shadow-black/5",
        hover &&
          "hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/10 hover:border-[var(--border-hover)] cursor-pointer",
        padding === "sm" && "p-3",
        padding === "md" && "p-4",
        padding === "lg" && "p-6",
        padding === "none" && "",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

/* ========================================================================
   SKELETON
   ======================================================================== */
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = "text",
  width,
  height,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "skeleton-shimmer",
        variant === "text" && "h-4 rounded",
        variant === "circular" && "rounded-full",
        variant === "rectangular" && "rounded-xl",
        className
      )}
      style={{ width, height }}
      {...props}
    />
  );
};

/* ========================================================================
   STAT CARD
   ======================================================================== */
export interface StatCardProps {
  label: string;
  value: string | number;
  change?: { value: number; label: string };
  icon?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  loading?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  change,
  icon,
  trend,
  loading,
}) => {
  if (loading) {
    return (
      <Card padding="md">
        <div className="space-y-3">
          <Skeleton width={100} />
          <Skeleton width={60} height={32} />
          <Skeleton width={80} />
        </div>
      </Card>
    );
  }

  return (
    <Card padding="md" hover>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
            {label}
          </p>
          <p className="text-2xl font-semibold text-[var(--text-primary)] tabular-nums">
            {value}
          </p>
          {change && (
            <p
              className={cn(
                "text-xs font-medium flex items-center gap-1",
                trend === "up" && "text-[var(--success)]",
                trend === "down" && "text-[var(--error)]",
                trend === "neutral" && "text-[var(--text-tertiary)]"
              )}
            >
              {trend === "up" && "↑"}
              {trend === "down" && "↓"}
              {change.value > 0 ? "+" : ""}
              {change.value}% {change.label}
            </p>
          )}
        </div>
        {icon && (
          <div className="p-2 rounded-lg bg-[var(--accent-2)]/10 text-[var(--accent-2)]">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};

/* ========================================================================
   EMPTY STATE
   ======================================================================== */
export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {icon && (
        <div className="mb-4 p-4 rounded-2xl bg-[var(--surface-hover)] text-[var(--text-tertiary)]">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
        {title}
      </h3>
      <p className="text-sm text-[var(--text-tertiary)] max-w-sm mb-6">
        {description}
      </p>
      {action}
    </div>
  );
};

/* ========================================================================
   SEPARATOR
   ======================================================================== */
export const Separator: React.FC<{
  orientation?: "horizontal" | "vertical";
  className?: string;
}> = ({ orientation = "horizontal", className }) => (
  <div
    className={cn(
      "shrink-0 bg-[var(--border)]",
      orientation === "horizontal" ? "h-px w-full" : "w-px h-full",
      className
    )}
  />
);

/* ========================================================================
   TOOLTIP (simple CSS version)
   ======================================================================== */
export const Tooltip: React.FC<{
  content: string;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
}> = ({ content, children, side = "top" }) => {
  return (
    <div className="group relative inline-flex">
      {children}
      <div
        className={cn(
          "absolute z-50 px-2 py-1 text-xs font-medium rounded-md whitespace-nowrap",
          "bg-[var(--text-primary)] text-[var(--bg)]",
          "opacity-0 scale-95 pointer-events-none transition-all duration-150",
          "group-hover:opacity-100 group-hover:scale-100",
          side === "top" && "bottom-full left-1/2 -translate-x-1/2 mb-2",
          side === "bottom" && "top-full left-1/2 -translate-x-1/2 mt-2",
          side === "left" && "right-full top-1/2 -translate-y-1/2 mr-2",
          side === "right" && "left-full top-1/2 -translate-y-1/2 ml-2"
        )}
      >
        {content}
      </div>
    </div>
  );
};

/* ========================================================================
   PROGRESS BAR
   ======================================================================== */
export const ProgressBar: React.FC<{
  value: number;
  max?: number;
  variant?: "default" | "success" | "warning" | "error";
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}> = ({
  value,
  max = 100,
  variant = "default",
  size = "md",
  showLabel = false,
  className,
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "w-full rounded-full overflow-hidden bg-[var(--surface-hover)]",
          size === "sm" && "h-1",
          size === "md" && "h-2",
          size === "lg" && "h-3"
        )}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            variant === "default" && "bg-[var(--accent-2)]",
            variant === "success" && "bg-[var(--success)]",
            variant === "warning" && "bg-[var(--warning)]",
            variant === "error" && "bg-[var(--error)]"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <p className="mt-1 text-xs text-[var(--text-tertiary)] text-right">
          {Math.round(percentage)}%
        </p>
      )}
    </div>
  );
};
