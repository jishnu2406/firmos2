"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
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
  AlignLeft,
  Sparkles,
  CheckCircle2
} from "lucide-react";
import { useTheme } from "@/lib/theme-provider";
import { useAppStore } from "@/lib/store";
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
  const router = useRouter();
  const { currentUser, setCurrentUser } = useAppStore();
  const [activeSection, setActiveSection] = useState<string>("appearance");
  const { theme, setTheme, font, setFont, themes, fonts } = useTheme();

  const [density, setDensity] = useState<"compact" | "default" | "comfortable">("default");
  const [sidebarPos, setSidebarPos] = useState<"left" | "right">("left");

  // Profile Form state
  const [name, setName] = useState("Norman Foster");
  const [email, setEmail] = useState("norman@fosterandpartners.com");

  // Fresh onboarding state variables
  const [newOrgName, setNewOrgName] = useState("");
  const [newOrgType, setNewOrgType] = useState("ARCHITECTURE");
  const [newOwnerName, setNewOwnerName] = useState("");
  const [newOwnerEmail, setNewOwnerEmail] = useState("");
  const [newBrandColor, setNewBrandColor] = useState("#6366f1");
  const [isResetting, setIsResetting] = useState(false);

  const handleWorkspaceReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirm("Are you absolutely sure you want to proceed? This will delete all seed data database records and initialize a completely fresh empty studio workspace!")) {
      return;
    }
    setIsResetting(true);
    try {
      const res = await fetch("/api/workspace/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orgName: newOrgName,
          ownerName: newOwnerName,
          ownerEmail: newOwnerEmail,
          orgType: newOrgType,
          brandColor: newBrandColor
        })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Reset failed");
      }
      setCurrentUser(data.user);
      alert(`Workspace "${newOrgName}" successfully initialized! Let's check out your new dashboard.`);
      router.push("/");
    } catch (err: any) {
      console.error(err);
      alert("Failed to initialize workspace: " + err.message);
    } finally {
      setIsResetting(false);
    }
  };

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

          {activeSection === "workspace" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-semibold text-[var(--text-primary)] flex items-center gap-2">
                  <Sliders size={16} className="text-[var(--accent-2)]" />
                  Workspace Setup & Clean Slate
                </h3>
                <p className="text-xs text-[var(--text-secondary)]">
                  Configure your own customized design studio, wipe demo datasets, and start fresh.
                </p>
              </div>

              {/* Current Status */}
              <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-hover)]/30 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Current Workspace</p>
                  <p className="text-base font-bold text-[var(--text-primary)] mt-1">{currentUser?.orgName || "Demo Firm"}</p>
                  <p className="text-xs text-[var(--text-tertiary)] mt-0.5">Role: {currentUser?.role?.toUpperCase() || "MEMBER"} · Plan: {currentUser?.orgPlan || "ENTERPRISE"}</p>
                </div>
                <Badge variant="primary" dot>ACTIVE</Badge>
              </div>

              {/* Warning box */}
              <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10 text-red-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-xs text-red-400">
                  <ShieldAlert size={14} />
                  DANGER ZONE: RESET TO FRESH WORKSPACE
                </div>
                <p className="text-[11px] leading-relaxed text-red-400">
                  Initializing a fresh workspace will permanently **wipe out all Foster & Partners demo records** (all projects, milestones, tasks, financial records, assets, and users) from the local SQLite database. It will immediately seed a brand new organization and set you up as the master owner.
                </p>
              </div>

              {/* Workspace Setup Form */}
              <form onSubmit={handleWorkspaceReset} className="space-y-4 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[var(--text-secondary)]">Your Studio Name</label>
                    <Input
                      placeholder="e.g. Lalgi Architects"
                      value={newOrgName}
                      onChange={(e) => setNewOrgName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[var(--text-secondary)]">Studio Specialization</label>
                    <select
                      className="w-full flex h-10 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs text-[var(--text-primary)] outline-none focus:border-[var(--accent-2)] transition-colors"
                      value={newOrgType}
                      onChange={(e) => setNewOrgType(e.target.value)}
                    >
                      <option value="ARCHITECTURE">Architecture Firm</option>
                      <option value="INTERIOR_DESIGN">Interior Design Studio</option>
                      <option value="PRODUCTION">Production / Fitout Agency</option>
                      <option value="GRAPHIC_DESIGN">Graphic Design Agency</option>
                      <option value="BRAND_AGENCY">Brand & Strategy Firm</option>
                      <option value="MIXED">Mixed Creative Agency</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[var(--text-secondary)]">Founder / Owner Name</label>
                    <Input
                      placeholder="e.g. Jishnu Lalgi"
                      value={newOwnerName}
                      onChange={(e) => setNewOwnerName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[var(--text-secondary)]">Founder Email Address</label>
                    <Input
                      type="email"
                      placeholder="e.g. jishnu@yourdomain.com"
                      value={newOwnerEmail}
                      onChange={(e) => setNewOwnerEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Swatches */}
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-semibold text-[var(--text-secondary)]">Studio Primary Brand Accent</label>
                  <div className="flex flex-wrap items-center gap-2">
                    {[
                      { hex: "#6366f1", name: "Indigo Classic" },
                      { hex: "#00d4ff", name: "Blueprint Blue" },
                      { hex: "#4ade80", name: "Eco Green" },
                      { hex: "#fb7185", name: "Quartz Rose" },
                      { hex: "#f59e0b", name: "Warm Amber" },
                      { hex: "#ec4899", name: "Magenta Pop" },
                      { hex: "#a855f7", name: "Purple Dream" }
                    ].map((col) => (
                      <button
                        type="button"
                        key={col.hex}
                        onClick={() => setNewBrandColor(col.hex)}
                        className={cn(
                          "h-8 px-3 rounded-lg text-[10px] font-semibold flex items-center gap-1.5 border transition-all active:scale-[0.98]",
                          newBrandColor === col.hex
                            ? "border-[var(--accent-2)] bg-[var(--surface-hover)] shadow-sm"
                            : "border-[var(--border)] hover:bg-[var(--surface-hover)] bg-[var(--surface)] text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]"
                        )}
                      >
                        <div style={{ backgroundColor: col.hex }} className="h-3 w-3 rounded-full shrink-0" />
                        {col.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-[var(--border)]">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isResetting}
                    className="gap-2 border-red-500/20 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-bold"
                  >
                    {isResetting ? "Resetting and Seed-clearing..." : "Initialize Fresh Workspace"}
                  </Button>
                </div>
              </form>
            </div>
          )}

          {activeSection !== "appearance" && activeSection !== "profile" && activeSection !== "workspace" && (
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
