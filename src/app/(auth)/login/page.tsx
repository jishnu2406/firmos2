"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  ArrowRight,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Shield,
  Sliders,
  Building2,
  ShieldAlert
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { Button, Input, Separator, cn } from "@/components/ui";

const DEMO_USER = {
  id: "user_demo_001",
  name: "Alexandra Chen",
  email: "alex@fosterpartners.com",
  role: "ceo",
  orgId: "org_demo_001",
  orgName: "Foster & Partners",
  orgSlug: "foster-partners",
  orgPlan: "ENTERPRISE",
  permissions: ["*"],
};

export default function LoginPage() {
  const router = useRouter();
  const { setCurrentUser } = useAppStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fresh Onboarding Modal States
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [newOrgName, setNewOrgName] = useState("");
  const [newOrgType, setNewOrgType] = useState("ARCHITECTURE");
  const [newOwnerName, setNewOwnerName] = useState("");
  const [newOwnerEmail, setNewOwnerEmail] = useState("");
  const [newBrandColor, setNewBrandColor] = useState("#6366f1");
  const [isOnboarding, setIsOnboarding] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate auth
    await new Promise((r) => setTimeout(r, 1000));
    setCurrentUser(DEMO_USER);
    router.push("/");
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setCurrentUser(DEMO_USER);
    router.push("/");
  };

  const handleWorkspaceReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsOnboarding(true);
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
      alert(`Workspace "${newOrgName}" successfully created and database cleared!`);
      router.push("/");
    } catch (err: any) {
      console.error(err);
      alert("Failed to initialize workspace: " + err.message);
    } finally {
      setIsOnboarding(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:flex-1 relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-2)] via-purple-600 to-blue-800 opacity-90" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(99,102,241,0.3),transparent_50%)]" />
          {/* Animated orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-white/5 blur-3xl"
            animate={{
              x: [0, 50, -30, 0],
              y: [0, -30, 50, 0],
              scale: [1, 1.1, 0.95, 1],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-400/10 blur-3xl"
            animate={{
              x: [0, -40, 30, 0],
              y: [0, 40, -30, 0],
              scale: [1, 0.9, 1.1, 1],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/10">
              <Sparkles size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight">NEXUS OS</span>
          </motion.div>

          {/* Main text */}
          <motion.div
            className="max-w-lg space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold leading-tight tracking-tight">
              Command.
              <br />
              Create.
              <br />
              <span className="text-white/60">Conquer.</span>
            </h1>
            <p className="text-lg text-white/70 leading-relaxed max-w-md">
              The AI-native command center for architectural, design, and
              creative studios. Enterprise-grade project management meets
              intelligent automation.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex items-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {[
              { value: "500+", label: "Studios" },
              { value: "12K+", label: "Projects" },
              { value: "99.9%", label: "Uptime" },
              { value: "4.9★", label: "Rating" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-white/50 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Right panel — login form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <motion.div
          className="w-full max-w-sm space-y-8"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 justify-center mb-8">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[var(--accent-2)] to-purple-600 flex items-center justify-center text-white">
              <Sparkles size={20} />
            </div>
            <span className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
              NEXUS OS
            </span>
          </div>

          {/* Header */}
          <div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">
              Welcome back
            </h2>
            <p className="text-sm text-[var(--text-tertiary)] mt-1">
              Sign in to your workspace
            </p>
          </div>

          {/* Action triggers: Demo vs Fresh */}
          <div className="space-y-3">
            <Button
              variant="secondary"
              size="lg"
              className="w-full border-[var(--accent-2)]/35 hover:border-[var(--accent-2)]/50 hover:bg-[var(--accent-2)]/5"
              onClick={handleDemoLogin}
              disabled={isLoading}
            >
              <Sparkles size={16} className="text-[var(--accent-2)]" />
              <span>Enter Demo Workspace</span>
              <ArrowRight size={14} className="ml-auto animate-pulse" />
            </Button>

            <Button
              variant="secondary"
              size="lg"
              className="w-full border-red-500/30 hover:border-red-500/50 hover:bg-red-500/5 text-red-200"
              onClick={() => setShowOnboarding(true)}
              disabled={isLoading}
            >
              <Sliders size={16} className="text-red-400" />
              <span>Initialize Fresh Studio</span>
              <Sparkles size={14} className="ml-auto text-amber-400 shrink-0" />
            </Button>
          </div>

          <div className="relative">
            <Separator />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--bg)] px-3 text-xs text-[var(--text-tertiary)]">
              or sign in with
            </span>
          </div>

          {/* SSO buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button variant="secondary" size="md" className="gap-2">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </Button>
            <Button variant="secondary" size="md" className="gap-2">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M11.4 24H0V12.6L11.4 0v7.2H24v5.4H11.4V24zm1.2-11.4H24V24H12.6V12.6z" fill="#00A4EF"/>
              </svg>
              Microsoft
            </Button>
          </div>

          <div className="relative">
            <Separator />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--bg)] px-3 text-xs text-[var(--text-tertiary)]">
              or continue with email
            </span>
          </div>

          {/* Email/password form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail size={16} />}
            />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock size={16} />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="hover:text-[var(--text-primary)] transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
            />
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-[var(--text-secondary)] cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-[var(--border)]"
                />
                Remember me
              </label>
              <a
                href="#"
                className="text-sm text-[var(--accent-2)] hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
              {!isLoading && <ArrowRight size={16} />}
            </Button>
          </form>

          {/* Footer */}
          <div className="text-center space-y-2">
            <p className="text-sm text-[var(--text-tertiary)]">
              Don&apos;t have an account?{" "}
              <a href="#" className="text-[var(--accent-2)] hover:underline font-medium">
                Request access
              </a>
            </p>
            <div className="flex items-center justify-center gap-1 text-xs text-[var(--text-tertiary)]">
              <Shield size={12} />
              <span>SOC 2 Type II · GDPR · ISO 27001</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Onboarding Clean Slate Modal Overlay */}
      <AnimatePresence>
        {showOnboarding && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop blur */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isOnboarding && setShowOnboarding(false)}
            />

            {/* Modal Body */}
            <motion.div
              className="relative z-10 w-full max-w-lg rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-2xl space-y-6"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", duration: 0.4 }}
            >
              <div>
                <h3 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
                  <Sliders size={20} className="text-red-400" />
                  Clean Slate Onboarding Setup
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  Create your own custom design studio. This will clear the demo database and launch a fresh, personalized workspace.
                </p>
              </div>

              {/* Danger callout */}
              <div className="p-3.5 rounded-xl bg-red-500/5 border border-red-500/10 text-red-300 text-[11px] leading-relaxed">
                <div className="flex items-center gap-1.5 font-bold text-red-400 mb-1">
                  <ShieldAlert size={14} />
                  DATABASE WIPE NOTICE
                </div>
                All preloaded Foster & Partners records (milestones, tasks, mock assets, invoices) in your Supabase database will be permanently reset to empty slates.
              </div>

              {/* Onboarding Form */}
              <form onSubmit={handleWorkspaceReset} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    <label className="text-xs font-semibold text-[var(--text-secondary)]">Specialization</label>
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
                    <label className="text-xs font-semibold text-[var(--text-secondary)]">Founder Name</label>
                    <Input
                      placeholder="e.g. Jishnu Lalgi"
                      value={newOwnerName}
                      onChange={(e) => setNewOwnerName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[var(--text-secondary)]">Business Email</label>
                    <Input
                      type="email"
                      placeholder="e.g. jishnu@yourdomain.com"
                      value={newOwnerEmail}
                      onChange={(e) => setNewOwnerEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  <label className="text-xs font-semibold text-[var(--text-secondary)]">Studio Brand Accent Color</label>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {[
                      { hex: "#6366f1", name: "Indigo" },
                      { hex: "#00d4ff", name: "Blueprint" },
                      { hex: "#4ade80", name: "Green" },
                      { hex: "#fb7185", name: "Quartz" },
                      { hex: "#f59e0b", name: "Amber" },
                      { hex: "#a855f7", name: "Purple" }
                    ].map((col) => (
                      <button
                        type="button"
                        key={col.hex}
                        onClick={() => setNewBrandColor(col.hex)}
                        className={cn(
                          "h-7 px-2.5 rounded-lg text-[9px] font-bold flex items-center gap-1.5 border transition-all active:scale-[0.98]",
                          newBrandColor === col.hex
                            ? "border-[var(--accent-2)] bg-[var(--surface-hover)]"
                            : "border-[var(--border)] hover:bg-[var(--surface-hover)] bg-[var(--surface)] text-[var(--text-tertiary)]"
                        )}
                      >
                        <div style={{ backgroundColor: col.hex }} className="h-2.5 w-2.5 rounded-full shrink-0" />
                        {col.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit / Cancel Actions */}
                <div className="flex items-center justify-end gap-2 pt-4 border-t border-[var(--border)]">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowOnboarding(false)}
                    disabled={isOnboarding}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    disabled={isOnboarding}
                    className="bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-bold"
                  >
                    {isOnboarding ? "Initializing Fresh Studio..." : "Create Clean Studio Workspace"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
