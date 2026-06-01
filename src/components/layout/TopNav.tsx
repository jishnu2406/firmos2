"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Bell,
  Search,
  ChevronRight,
  Plus,
  Settings,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { Button, Avatar, Badge, cn } from "@/components/ui";

// Breadcrumb helper
function getBreadcrumbs(pathname: string): { label: string; href: string }[] {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return [{ label: "Dashboard", href: "/" }];

  const labelMap: Record<string, string> = {
    projects: "Projects",
    tasks: "Tasks",
    people: "People",
    clients: "Clients",
    assets: "Asset Library",
    finance: "Finance",
    invoices: "Invoices",
    reports: "Reports",
    ai: "NEXUS Mind",
    agents: "AI Agents",
    settings: "Settings",
    knowledge: "Knowledge Base",
    brand: "Brand Kit",
    messages: "Messages",
    command: "Command Center",
    "org-chart": "Org Chart",
    calendar: "Calendar",
    documents: "Documents",
    search: "Search",
    integrations: "Integrations",
  };

  return [
    { label: "Home", href: "/" },
    ...segments.map((seg, i) => ({
      label: labelMap[seg] || seg.charAt(0).toUpperCase() + seg.slice(1),
      href: "/" + segments.slice(0, i + 1).join("/"),
    })),
  ];
}

export const TopNav: React.FC = () => {
  const pathname = usePathname();
  const {
    sidebarCollapsed,
    toggleCommandPalette,
    toggleNotificationPanel,
    unreadNotifications,
    currentUser,
  } = useAppStore();

  const breadcrumbs = getBreadcrumbs(pathname);

  return (
    <motion.header
      className="sticky top-0 z-30 h-14 border-b border-[var(--border)] flex items-center justify-between px-6 shrink-0"
      style={{
        backgroundColor: "var(--glass-bg)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
      }}
    >
      {/* Left: Breadcrumbs */}
      <div className="flex items-center gap-1.5 min-w-0">
        {breadcrumbs.map((crumb, i) => (
          <React.Fragment key={crumb.href}>
            {i > 0 && (
              <ChevronRight
                size={12}
                className="text-[var(--text-tertiary)] shrink-0"
              />
            )}
            <span
              className={cn(
                "text-sm truncate",
                i === breadcrumbs.length - 1
                  ? "font-semibold text-[var(--text-primary)]"
                  : "text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] cursor-pointer transition-colors"
              )}
            >
              {crumb.label}
            </span>
          </React.Fragment>
        ))}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1">
        {/* Quick actions */}
        <Button variant="ghost" size="sm" className="hidden md:flex gap-1.5">
          <Plus size={14} />
          <span>New</span>
        </Button>

        {/* Search */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleCommandPalette}
          className="hidden md:flex"
        >
          <Search size={16} />
        </Button>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleNotificationPanel}
          className="relative"
        >
          <Bell size={16} />
          {unreadNotifications > 0 && (
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-[var(--error)] ring-2 ring-[var(--bg)]" />
          )}
        </Button>

        {/* Settings */}
        <Button variant="ghost" size="icon" asChild>
          <a href="/settings">
            <Settings size={16} />
          </a>
        </Button>
      </div>
    </motion.header>
  );
};

export default TopNav;
