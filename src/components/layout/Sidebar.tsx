"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Radar,
  FolderKanban,
  CheckSquare,
  Calendar,
  FileText,
  Users,
  Building2,
  Network,
  Image,
  BookOpen,
  Palette,
  BarChart3,
  Receipt,
  PieChart,
  Brain,
  Bot,
  Search,
  Settings,
  Plug,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Bell,
  LogOut,
  ChevronsUpDown,
  Plus,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { NAV_ITEMS } from "@/lib/constants";
import { Avatar, Badge, Button, Tooltip, Separator, cn } from "@/components/ui";

// Icon map
const iconMap: Record<string, React.FC<{ size?: number; className?: string }>> = {
  LayoutDashboard,
  Radar,
  FolderKanban,
  CheckSquare,
  Calendar,
  FileText,
  Users,
  Building2,
  Network,
  Image,
  BookOpen,
  Palette,
  BarChart3,
  Receipt,
  PieChart,
  Brain,
  Bot,
  Search,
  Settings,
  Plug,
};

const SIDEBAR_EXPANDED = 256;
const SIDEBAR_COLLAPSED = 72;

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const {
    sidebarCollapsed,
    sidebarHovered,
    setSidebarCollapsed,
    setSidebarHovered,
    currentUser,
    toggleCommandPalette,
    toggleAiPanel,
    toggleNotificationPanel,
    unreadNotifications,
  } = useAppStore();

  const isExpanded = !sidebarCollapsed || sidebarHovered;

  return (
    <motion.aside
      className="fixed top-0 left-0 z-40 h-screen flex flex-col border-r border-[var(--border)] select-none"
      style={{
        backgroundColor: "var(--glass-bg)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
      }}
      animate={{
        width: isExpanded ? SIDEBAR_EXPANDED : SIDEBAR_COLLAPSED,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      onMouseEnter={() => {
        if (sidebarCollapsed) setSidebarHovered(true);
      }}
      onMouseLeave={() => {
        if (sidebarCollapsed) setSidebarHovered(false);
      }}
    >
      {/* Org header */}
      <div className="flex items-center gap-3 px-4 h-14 border-b border-[var(--border)] shrink-0">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[var(--accent-2)] to-[var(--accent)] flex items-center justify-center text-white font-bold text-sm shrink-0">
          N
        </div>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="flex items-center justify-between flex-1 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <div className="truncate">
                <p className="text-sm font-semibold text-[var(--text-primary)] truncate">
                  {currentUser?.orgName || "NEXUS OS"}
                </p>
                <p className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider">
                  {currentUser?.orgPlan || "Enterprise"}
                </p>
              </div>
              <Button variant="ghost" size="icon-sm">
                <ChevronsUpDown size={14} />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Search trigger */}
      <div className="px-3 py-2 shrink-0">
        <button
          onClick={toggleCommandPalette}
          className={cn(
            "w-full flex items-center gap-2 rounded-lg transition-colors duration-200",
            "text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]",
            "hover:bg-[var(--surface-hover)]",
            isExpanded ? "px-3 py-2" : "px-0 py-2 justify-center"
          )}
        >
          <Search size={16} className="shrink-0" />
          {isExpanded && (
            <>
              <span className="text-sm flex-1 text-left">Search...</span>
              <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--surface-hover)] border border-[var(--border)] font-mono">
                ⌘K
              </kbd>
            </>
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-1 scrollbar-thin">
        {NAV_ITEMS.map((group) => (
          <div key={group.group} className="mb-3">
            <AnimatePresence>
              {isExpanded && (
                <motion.p
                  className="px-3 mb-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1 }}
                >
                  {group.group}
                </motion.p>
              )}
            </AnimatePresence>
            {group.items.map((item) => {
              const Icon = iconMap[item.icon];
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Tooltip
                  key={item.href}
                  content={item.name}
                  side="right"
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg transition-all duration-200 mb-0.5 group",
                      isExpanded ? "px-3 py-2" : "px-0 py-2 justify-center",
                      isActive
                        ? "bg-[var(--accent-2)]/10 text-[var(--accent-2)]"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
                    )}
                  >
                    {Icon && (
                      <Icon
                        size={18}
                        className={cn(
                          "shrink-0 transition-colors",
                          isActive
                            ? "text-[var(--accent-2)]"
                            : "text-[var(--text-tertiary)] group-hover:text-[var(--text-secondary)]"
                        )}
                      />
                    )}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.span
                          className="text-sm font-medium truncate"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.1 }}
                        >
                          {item.name}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Link>
                </Tooltip>
              );
            })}
          </div>
        ))}
      </nav>

      {/* AI Assistant orb */}
      <div className="px-3 py-2 shrink-0">
        <button
          onClick={toggleAiPanel}
          className={cn(
            "w-full flex items-center gap-3 rounded-xl py-2.5 transition-all duration-300",
            "bg-gradient-to-r from-[var(--accent-2)]/10 to-[var(--accent-2)]/5",
            "border border-[var(--accent-2)]/20 hover:border-[var(--accent-2)]/40",
            "hover:from-[var(--accent-2)]/15 hover:to-[var(--accent-2)]/10",
            "group",
            isExpanded ? "px-3" : "px-0 justify-center"
          )}
        >
          <div className="relative shrink-0">
            <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[var(--accent-2)] to-purple-500 flex items-center justify-center animate-pulse-slow">
              <Sparkles size={14} className="text-white" />
            </div>
            <div className="absolute inset-0 rounded-full bg-[var(--accent-2)]/20 animate-ping-slow" />
          </div>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                className="text-left"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
              >
                <p className="text-sm font-medium text-[var(--accent-2)]">
                  NEXUS Mind
                </p>
                <p className="text-[10px] text-[var(--text-tertiary)]">
                  AI Assistant
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      <Separator />

      {/* User section */}
      <div className="px-3 py-3 shrink-0 flex items-center gap-2">
        <Avatar
          fallback={currentUser?.name || "U"}
          size="sm"
          status="online"
        />
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="flex items-center justify-between flex-1 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
              <div className="truncate">
                <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                  {currentUser?.name}
                </p>
                <p className="text-[10px] text-[var(--text-tertiary)] capitalize">
                  {currentUser?.role}
                </p>
              </div>
              <div className="flex items-center gap-0.5">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={toggleNotificationPanel}
                  className="relative"
                >
                  <Bell size={14} />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-[var(--error)] text-[9px] text-white flex items-center justify-center font-bold">
                      {unreadNotifications}
                    </span>
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                >
                  {sidebarCollapsed ? (
                    <ChevronRight size={14} />
                  ) : (
                    <ChevronLeft size={14} />
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
