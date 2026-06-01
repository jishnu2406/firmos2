"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  LayoutDashboard,
  FolderKanban,
  Users,
  FileText,
  Settings,
  Brain,
  BarChart3,
  Calendar,
  Building2,
  ArrowRight,
  Clock,
  Sparkles,
  Hash,
  X,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { cn } from "@/components/ui";

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  category: string;
  action: () => void;
  keywords?: string[];
}

export const CommandPalette: React.FC = () => {
  const router = useRouter();
  const { commandPaletteOpen, setCommandPaletteOpen } = useAppStore();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const items: CommandItem[] = [
    // Navigation
    {
      id: "nav-dashboard",
      label: "Dashboard",
      description: "Go to command center",
      icon: <LayoutDashboard size={16} />,
      category: "Navigation",
      action: () => router.push("/"),
      keywords: ["home", "overview"],
    },
    {
      id: "nav-projects",
      label: "Projects",
      description: "View all projects",
      icon: <FolderKanban size={16} />,
      category: "Navigation",
      action: () => router.push("/projects"),
      keywords: ["work", "portfolio"],
    },
    {
      id: "nav-people",
      label: "Team",
      description: "View team directory",
      icon: <Users size={16} />,
      category: "Navigation",
      action: () => router.push("/people"),
      keywords: ["team", "staff", "employees"],
    },
    {
      id: "nav-clients",
      label: "Clients",
      description: "View all clients",
      icon: <Building2 size={16} />,
      category: "Navigation",
      action: () => router.push("/clients"),
      keywords: ["customers", "accounts"],
    },
    {
      id: "nav-calendar",
      label: "Calendar",
      description: "View schedule",
      icon: <Calendar size={16} />,
      category: "Navigation",
      action: () => router.push("/calendar"),
      keywords: ["schedule", "events", "meetings"],
    },
    {
      id: "nav-finance",
      label: "Finance",
      description: "Financial overview",
      icon: <BarChart3 size={16} />,
      category: "Navigation",
      action: () => router.push("/finance"),
      keywords: ["money", "revenue", "billing"],
    },
    {
      id: "nav-ai",
      label: "NEXUS Mind",
      description: "AI Intelligence Hub",
      icon: <Brain size={16} />,
      category: "Navigation",
      action: () => router.push("/ai"),
      keywords: ["artificial intelligence", "assistant"],
    },
    {
      id: "nav-settings",
      label: "Settings",
      description: "Workspace settings",
      icon: <Settings size={16} />,
      category: "Navigation",
      action: () => router.push("/settings"),
      keywords: ["preferences", "config"],
    },
    // Quick Actions
    {
      id: "action-new-project",
      label: "New Project",
      description: "Create a new project",
      icon: <FolderKanban size={16} />,
      category: "Quick Actions",
      action: () => router.push("/projects?new=true"),
      keywords: ["create", "add"],
    },
    {
      id: "action-new-task",
      label: "New Task",
      description: "Create a new task",
      icon: <FileText size={16} />,
      category: "Quick Actions",
      action: () => router.push("/tasks?new=true"),
      keywords: ["create", "add", "todo"],
    },
    {
      id: "action-ai-chat",
      label: "Ask AI",
      description: "Start a conversation with NEXUS Mind",
      icon: <Sparkles size={16} />,
      category: "Quick Actions",
      action: () => {
        useAppStore.getState().setAiPanelOpen(true);
      },
      keywords: ["assistant", "help", "ai", "chat"],
    },
  ];

  // Filter items based on query
  const filteredItems = query.trim()
    ? items.filter((item) => {
        const searchStr =
          `${item.label} ${item.description || ""} ${(item.keywords || []).join(" ")}`.toLowerCase();
        return query
          .toLowerCase()
          .split(" ")
          .every((word) => searchStr.includes(word));
      })
    : items;

  // Group by category
  const groups = filteredItems.reduce(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, CommandItem[]>
  );

  // Keyboard handling
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
        return;
      }

      if (!commandPaletteOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((i) =>
            Math.min(i + 1, filteredItems.length - 1)
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((i) => Math.max(i - 1, 0));
          break;
        case "Enter":
          e.preventDefault();
          if (filteredItems[selectedIndex]) {
            filteredItems[selectedIndex].action();
            setCommandPaletteOpen(false);
          }
          break;
        case "Escape":
          e.preventDefault();
          setCommandPaletteOpen(false);
          break;
      }
    },
    [commandPaletteOpen, setCommandPaletteOpen, filteredItems, selectedIndex]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (commandPaletteOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [commandPaletteOpen]);

  // Scroll selected item into view
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const selected = list.querySelector("[data-selected=true]");
    if (selected) {
      selected.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  let flatIndex = -1;

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setCommandPaletteOpen(false)}
          />

          {/* Palette */}
          <motion.div
            className="fixed top-[20%] left-1/2 z-50 w-full max-w-xl -translate-x-1/2"
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
            }}
          >
            <div
              className="overflow-hidden rounded-2xl border border-[var(--border)] shadow-2xl"
              style={{
                backgroundColor: "var(--surface)",
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
              }}
            >
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 border-b border-[var(--border)]">
                <Search
                  size={18}
                  className="text-[var(--text-tertiary)] shrink-0"
                />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  placeholder="Search commands, pages, projects..."
                  className="flex-1 h-12 bg-transparent text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none"
                />
                <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--text-tertiary)] font-mono">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div
                ref={listRef}
                className="max-h-[320px] overflow-y-auto p-2"
              >
                {Object.keys(groups).length === 0 ? (
                  <div className="py-8 text-center">
                    <p className="text-sm text-[var(--text-tertiary)]">
                      No results found for &ldquo;{query}&rdquo;
                    </p>
                  </div>
                ) : (
                  Object.entries(groups).map(([category, categoryItems]) => (
                    <div key={category} className="mb-2">
                      <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
                        {category}
                      </p>
                      {categoryItems.map((item) => {
                        flatIndex++;
                        const isSelected = flatIndex === selectedIndex;
                        const currentIndex = flatIndex;

                        return (
                          <button
                            key={item.id}
                            data-selected={isSelected}
                            className={cn(
                              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors duration-100",
                              isSelected
                                ? "bg-[var(--accent-2)]/10 text-[var(--accent-2)]"
                                : "text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]"
                            )}
                            onClick={() => {
                              item.action();
                              setCommandPaletteOpen(false);
                            }}
                            onMouseEnter={() =>
                              setSelectedIndex(currentIndex)
                            }
                          >
                            <span
                              className={cn(
                                "shrink-0",
                                isSelected
                                  ? "text-[var(--accent-2)]"
                                  : "text-[var(--text-tertiary)]"
                              )}
                            >
                              {item.icon}
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">
                                {item.label}
                              </p>
                              {item.description && (
                                <p className="text-xs text-[var(--text-tertiary)] truncate">
                                  {item.description}
                                </p>
                              )}
                            </div>
                            {isSelected && (
                              <ArrowRight
                                size={14}
                                className="shrink-0 text-[var(--accent-2)]"
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-4 py-2 border-t border-[var(--border)]">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-[10px] text-[var(--text-tertiary)]">
                    <kbd className="px-1 py-0.5 rounded bg-[var(--surface-hover)] border border-[var(--border)] font-mono">
                      ↑↓
                    </kbd>
                    Navigate
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-[var(--text-tertiary)]">
                    <kbd className="px-1 py-0.5 rounded bg-[var(--surface-hover)] border border-[var(--border)] font-mono">
                      ↵
                    </kbd>
                    Open
                  </span>
                </div>
                <span className="flex items-center gap-1 text-[10px] text-[var(--text-tertiary)]">
                  <Sparkles size={10} />
                  Powered by NEXUS Mind
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
