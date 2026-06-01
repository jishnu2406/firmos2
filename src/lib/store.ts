// NEXUS OS — Zustand Store

import { create } from "zustand";
import { persist } from "zustand/middleware";

// Types
export interface UserPreferences {
  theme: string;
  font: string;
  fontSize: "sm" | "md" | "lg";
  sidebarCollapsed: boolean;
  sidebarPosition: "left" | "right";
  density: "compact" | "default" | "comfortable";
  language: string;
  timezone: string;
  dateFormat: string;
  currency: string;
  aiVoice: boolean;
}

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: string;
  orgId: string;
  orgName: string;
  orgSlug: string;
  orgPlan: string;
  orgLogoUrl?: string;
  permissions: string[];
}

// Demo user for development
const DEMO_USER: CurrentUser = {
  id: "user_demo_001",
  name: "Alexandra Chen",
  email: "alex@fosterpartners.com",
  image: "",
  role: "ceo",
  orgId: "org_demo_001",
  orgName: "Foster & Partners",
  orgSlug: "foster-partners",
  orgPlan: "ENTERPRISE",
  orgLogoUrl: "",
  permissions: ["*"],
};

// App Store
interface AppState {
  // UI State
  sidebarCollapsed: boolean;
  sidebarHovered: boolean;
  commandPaletteOpen: boolean;
  notificationPanelOpen: boolean;
  aiPanelOpen: boolean;
  contextPanelOpen: boolean;
  contextPanelContent: string | null;
  activePage: string;
  searchQuery: string;

  // User
  currentUser: CurrentUser | null;
  preferences: UserPreferences;

  // Notifications
  unreadNotifications: number;

  // Actions
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setSidebarHovered: (hovered: boolean) => void;
  toggleCommandPalette: () => void;
  setCommandPaletteOpen: (open: boolean) => void;
  toggleNotificationPanel: () => void;
  setNotificationPanelOpen: (open: boolean) => void;
  toggleAiPanel: () => void;
  setAiPanelOpen: (open: boolean) => void;
  setContextPanel: (open: boolean, content?: string | null) => void;
  setActivePage: (page: string) => void;
  setSearchQuery: (query: string) => void;
  setCurrentUser: (user: CurrentUser | null) => void;
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
  setUnreadNotifications: (count: number) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Initial UI state
      sidebarCollapsed: false,
      sidebarHovered: false,
      commandPaletteOpen: false,
      notificationPanelOpen: false,
      aiPanelOpen: false,
      contextPanelOpen: false,
      contextPanelContent: null,
      activePage: "/",
      searchQuery: "",

      // Demo user
      currentUser: null,

      // Default preferences
      preferences: {
        theme: "obsidian",
        font: "system",
        fontSize: "md",
        sidebarCollapsed: false,
        sidebarPosition: "left",
        density: "default",
        language: "en",
        timezone: "UTC",
        dateFormat: "MMM dd, yyyy",
        currency: "USD",
        aiVoice: false,
      },

      unreadNotifications: 5,

      // Actions
      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setSidebarCollapsed: (collapsed) =>
        set({ sidebarCollapsed: collapsed }),
      setSidebarHovered: (hovered) =>
        set({ sidebarHovered: hovered }),
      toggleCommandPalette: () =>
        set((state) => ({ commandPaletteOpen: !state.commandPaletteOpen })),
      setCommandPaletteOpen: (open) =>
        set({ commandPaletteOpen: open }),
      toggleNotificationPanel: () =>
        set((state) => ({
          notificationPanelOpen: !state.notificationPanelOpen,
        })),
      setNotificationPanelOpen: (open) =>
        set({ notificationPanelOpen: open }),
      toggleAiPanel: () =>
        set((state) => ({ aiPanelOpen: !state.aiPanelOpen })),
      setAiPanelOpen: (open) =>
        set({ aiPanelOpen: open }),
      setContextPanel: (open, content = null) =>
        set({ contextPanelOpen: open, contextPanelContent: content }),
      setActivePage: (page) =>
        set({ activePage: page }),
      setSearchQuery: (query) =>
        set({ searchQuery: query }),
      setCurrentUser: (user) =>
        set({ currentUser: user }),
      updatePreferences: (prefs) =>
        set((state) => ({
          preferences: { ...state.preferences, ...prefs },
        })),
      setUnreadNotifications: (count) =>
        set({ unreadNotifications: count }),
    }),
    {
      name: "nexus-os-store",
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
        preferences: state.preferences,
      }),
    }
  )
);

// Selector hooks for performance
export const useSidebarCollapsed = () =>
  useAppStore((s) => s.sidebarCollapsed);
export const useCurrentUser = () =>
  useAppStore((s) => s.currentUser);
export const usePreferences = () =>
  useAppStore((s) => s.preferences);
export const useCommandPalette = () =>
  useAppStore((s) => ({
    open: s.commandPaletteOpen,
    toggle: s.toggleCommandPalette,
    setOpen: s.setCommandPaletteOpen,
  }));
