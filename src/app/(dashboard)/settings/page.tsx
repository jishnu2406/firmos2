"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Palette,
  User,
  Sliders,
  Bell,
  Blocks,
  ShieldAlert,
  Camera,
  Layout,
  Type,
  AlignLeft
} from "lucide-react";
import { useTheme } from "@/lib/theme-provider";
import {
  cn,
  Button,
  Badge,
  Card,
  Avatar,
  Input
} from "@/components/ui";

const SETTINGS_SECTIONS = [
  { id: "appearance", name: "Appearance", icon: Palette },
  { id: "profile", name: "User Profile", icon: User },
  { id: "workspace", name: "Workspace", icon: Sliders },
  { id: "notifications", name: "Notifications", icon: Bell },
  { id: "integrations", name: "Integrations", icon: Blocks },
  { id: "security", name: "Security", icon: ShieldAlert }
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<string>("appearance");
  const { theme, setTheme, font, setFont, themes, fonts } = useTheme();

  const [density, setDensity] = useState<"compact" | "default" | "comfortable">("default");
  const [sidebarPos, setSidebarPos] = useState<"left" | "right">("left");

  // Profile Form state
  const [name, setName] = useState("Norman Foster");
  const [email, setEmail] = useState("norman@fosterandpartners.com");

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-semibold text-[var(--text-primary)]">Control Center Settings</h1>
        <p className="text-sm text-[var(--text-secondary)]">
          Manage system interface themes, typography, user preferences, and profile setups.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Side Section Selector */}
        <Card padding="sm" className="w-full lg:w-64 shrink-0 space-y-1">
          {SETTINGS_SECTIONS.map((sec) => {
            const Icon = sec.icon;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg transition-all text-left",
                  activeSection === sec.id
                    ? "bg-[var(--accent-2)]/15 text-[var(--accent-2)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
                )}
              >
                <Icon size={14} className="shrink-0" />
                {sec.name}
              </button>
            );
          })}
        </Card>

        {/* Right Side Settings Panel */}
        <Card className="flex-1 w-full space-y-6">
          {activeSection === "appearance" && (
            <div className="space-y-6">
              {/* Theme Selector */}
              <div className="space-y-3">
                <div>
                  <h3 className="text-base font-semibold text-[var(--text-primary)] flex items-center gap-2">
                    <Palette size={16} className="text-[var(--accent-2)]" />
                    Color Palette Themes
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Switch between 8 curated, harmony-tailored dark and light workspace designs.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                  {themes.map((t) => {
                    const isSelected = theme === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setTheme(t.id)}
                        className={cn(
                          "p-3 rounded-xl border transition-all text-left space-y-3 relative overflow-hidden group active:scale-[0.98]",
                          isSelected
                            ? "border-[var(--accent-2)] bg-[var(--surface-hover)] ring-1 ring-[var(--accent-2)]"
                            : "border-[var(--border)] hover:border-[var(--border-hover)] hover:bg-[var(--surface-hover)]/30 bg-[var(--surface)]"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-xs text-[var(--text-primary)]">{t.name}</span>
                          {t.isDark ? (
                            <Badge variant="default" size="sm" className="text-[8px] uppercase tracking-wider font-bold">Dark</Badge>
                          ) : (
                            <Badge variant="primary" size="sm" className="text-[8px] uppercase tracking-wider font-bold">Light</Badge>
                          )}
                        </div>

                        {/* Swatch color previews */}
                        <div className="flex items-center gap-1.5 pt-1.5">
                          <div
                            style={{ backgroundColor: t.preview.bg }}
                            className="h-4 w-4 rounded-full border border-[var(--border)]"
                            title="Background"
                          />
                          <div
                            style={{ backgroundColor: t.preview.surface }}
                            className="h-4 w-4 rounded-full border border-[var(--border)]"
                            title="Surface"
                          />
                          <div
                            style={{ backgroundColor: t.preview.accent }}
                            className="h-4 w-4 rounded-full"
                            title="Accent Primary"
                          />
                          <div
                            style={{ backgroundColor: t.preview.accent2 }}
                            className="h-4 w-4 rounded-full"
                            title="Accent Secondary"
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Font Selector */}
              <div className="space-y-3 pt-4 border-t border-[var(--border)]">
                <div>
                  <h3 className="text-base font-semibold text-[var(--text-primary)] flex items-center gap-2">
                    <Type size={16} className="text-[var(--accent-2)]" />
                    System Typography Font
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Tailor screen reading layouts with 8 high-premium font families.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                  {fonts.map((f) => {
                    const isSelected = font === f.id;
                    return (
                      <button
                        key={f.id}
                        onClick={() => setFont(f.id as any)}
                        className={cn(
                          "p-3 rounded-xl border transition-all text-left space-y-2 active:scale-[0.98]",
                          isSelected
                            ? "border-[var(--accent-2)] bg-[var(--surface-hover)] ring-1 ring-[var(--accent-2)]"
                            : "border-[var(--border)] hover:border-[var(--border-hover)] hover:bg-[var(--surface-hover)]/30 bg-[var(--surface)]"
                        )}
                      >
                        <span className="font-semibold text-xs text-[var(--text-primary)] block">{f.name}</span>
                        <span className="text-[10px] text-[var(--text-secondary)] line-clamp-1 block">
                          Aa Bb Cc Dd Ee Ff 123
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Interface density */}
              <div className="space-y-4 pt-4 border-t border-[var(--border)]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base font-semibold text-[var(--text-primary)] flex items-center gap-2">
                      <Layout size={16} className="text-[var(--accent-2)]" />
                      Interface Density Scale
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)]">Set workspace comfort margin spacing levels.</p>
                  </div>

                  <div className="flex items-center border border-[var(--border)] rounded-lg bg-[var(--surface-hover)] p-0.5 self-start">
                    {(["compact", "default", "comfortable"] as const).map((lvl) => (
                      <button
                        key={lvl}
                        onClick={() => setDensity(lvl)}
                        className={cn(
                          "px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] transition-all",
                          density === lvl && "bg-[var(--surface)] text-[var(--accent-2)] shadow-sm"
                        )}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sidebar position */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-t border-[var(--border)]">
                  <div>
                    <h3 className="text-base font-semibold text-[var(--text-primary)] flex items-center gap-2">
                      <AlignLeft size={16} className="text-[var(--accent-2)]" />
                      Command Sidebar Alignment
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)]">Position the master navigation panel.</p>
                  </div>

                  <div className="flex items-center border border-[var(--border)] rounded-lg bg-[var(--surface-hover)] p-0.5 self-start">
                    {(["left", "right"] as const).map((pos) => (
                      <button
                        key={pos}
                        onClick={() => setSidebarPos(pos)}
                        className={cn(
                          "px-4 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] transition-all",
                          sidebarPos === pos && "bg-[var(--surface)] text-[var(--accent-2)] shadow-sm"
                        )}
                      >
                        {pos} Side
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "profile" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-semibold text-[var(--text-primary)]">User Profile Identity</h3>
                <p className="text-xs text-[var(--text-secondary)]">Manage your account information and avatar handles.</p>
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 pb-4 border-b border-[var(--border)]">
                <div className="relative group">
                  <Avatar fallback="NF" size="xl" className="ring-4 ring-[var(--border)]" />
                  <button className="absolute inset-0 bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                    <Camera size={18} />
                  </button>
                </div>
                <div className="space-y-1">
                  <h4 className="font-semibold text-sm text-[var(--text-primary)]">{name}</h4>
                  <p className="text-xs text-[var(--text-secondary)]">Design Principal & Owner</p>
                  <Badge variant="primary" size="sm">Foster & Partners</Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[var(--text-secondary)]">Full Legal Name</label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[var(--text-secondary)]">Registered E-mail</label>
                  <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-[var(--border)]">
                <Button size="sm">Save Changes</Button>
              </div>
            </div>
          )}

          {activeSection !== "appearance" && activeSection !== "profile" && (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <Sliders size={48} className="text-[var(--text-tertiary)] mb-4" />
              <h3 className="text-lg font-medium text-[var(--text-primary)]">Section Under Integration</h3>
              <p className="text-sm text-[var(--text-secondary)] max-w-sm mt-1">
                The {SETTINGS_SECTIONS.find((s) => s.id === activeSection)?.name} section is configured in Prisma DB and will reflect once live endpoints are completed.
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
