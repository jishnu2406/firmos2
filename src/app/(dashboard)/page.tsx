"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FolderKanban,
  Users,
  TrendingUp,
  DollarSign,
  Clock,
  AlertTriangle,
  Calendar,
  FileText,
  Brain,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  CheckCircle2,
  Target,
  Zap,
  Activity,
  Building2,
  Plus,
  MoreHorizontal,
  ExternalLink,
  Star,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { Button, Badge, Card, Avatar, StatCard, ProgressBar, cn } from "@/components/ui";

// Animated counter hook
function useAnimatedValue(target: number, duration = 1000) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const start = 0;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setValue(Math.round(start + (target - start) * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return value;
}

// Demo data
const ACTIVE_PROJECTS = [
  {
    id: "1",
    name: "Sky Tower Complex",
    client: "Skyline Developments",
    phase: "Design Development",
    progress: 72,
    budget: { used: 1700000, total: 2400000 },
    status: "ACTIVE",
    priority: "HIGH",
    dueDate: "Mar 15, 2025",
    team: ["AC", "JW", "SM"],
    coverColor: "from-blue-500/20 to-indigo-500/20",
  },
  {
    id: "2",
    name: "Marina Bay Residences",
    client: "Bay Properties Ltd",
    phase: "Documentation",
    progress: 85,
    budget: { used: 890000, total: 1050000 },
    status: "ACTIVE",
    priority: "URGENT",
    dueDate: "Jan 28, 2025",
    team: ["DK", "ER", "MT"],
    coverColor: "from-amber-500/20 to-orange-500/20",
  },
  {
    id: "3",
    name: "Heritage Museum Expansion",
    client: "National Heritage Trust",
    phase: "Schematic Design",
    progress: 35,
    budget: { used: 420000, total: 1800000 },
    status: "ACTIVE",
    priority: "MEDIUM",
    dueDate: "Jun 30, 2025",
    team: ["AC", "SM", "LR"],
    coverColor: "from-emerald-500/20 to-teal-500/20",
  },
  {
    id: "4",
    name: "Urban Park Pavilion",
    client: "City Council",
    phase: "Concept",
    progress: 15,
    budget: { used: 45000, total: 350000 },
    status: "ACTIVE",
    priority: "LOW",
    dueDate: "Sep 10, 2025",
    team: ["JW", "ER"],
    coverColor: "from-purple-500/20 to-pink-500/20",
  },
];

const RECENT_ACTIVITY = [
  {
    id: "1",
    user: "Sarah Mitchell",
    avatar: "SM",
    action: "uploaded 12 drawings to",
    target: "Sky Tower Complex",
    time: "5 min ago",
    type: "upload",
  },
  {
    id: "2",
    user: "NEXUS Mind",
    avatar: "AI",
    action: "generated progress report for",
    target: "Marina Bay Residences",
    time: "12 min ago",
    type: "ai",
  },
  {
    id: "3",
    user: "James Wong",
    avatar: "JW",
    action: "completed milestone in",
    target: "Heritage Museum",
    time: "1 hour ago",
    type: "milestone",
  },
  {
    id: "4",
    user: "David Kim",
    avatar: "DK",
    action: "sent invoice #INV-2024-089 to",
    target: "Bay Properties",
    time: "2 hours ago",
    type: "invoice",
  },
  {
    id: "5",
    user: "Emma Roberts",
    avatar: "ER",
    action: "created new task in",
    target: "Urban Park Pavilion",
    time: "3 hours ago",
    type: "task",
  },
];

const UPCOMING_DEADLINES = [
  {
    id: "1",
    title: "Client Presentation — Marina Bay",
    date: "Tomorrow",
    project: "Marina Bay Residences",
    urgent: true,
  },
  {
    id: "2",
    title: "Design Review — Sky Tower",
    date: "Dec 5",
    project: "Sky Tower Complex",
    urgent: false,
  },
  {
    id: "3",
    title: "Tender Submission — Cultural Center",
    date: "Dec 12",
    project: "Cultural Center",
    urgent: true,
  },
  {
    id: "4",
    title: "Phase Completion — Heritage Museum",
    date: "Dec 18",
    project: "Heritage Museum",
    urgent: false,
  },
];

const TEAM_UTILIZATION = [
  { name: "Alexandra Chen", role: "Principal", utilization: 95, status: "busy" as const },
  { name: "James Wong", role: "Senior Architect", utilization: 80, status: "online" as const },
  { name: "Sarah Mitchell", role: "Project Architect", utilization: 60, status: "online" as const },
  { name: "David Kim", role: "Finance Director", utilization: 100, status: "busy" as const },
  { name: "Emma Roberts", role: "Designer", utilization: 45, status: "online" as const },
  { name: "Michael Torres", role: "Visualization", utilization: 75, status: "away" as const },
];

// Stagger animation
const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function DashboardPage() {
  const { currentUser } = useAppStore();
  const projectCount = useAnimatedValue(8);
  const taskCount = useAnimatedValue(47);
  const revenue = useAnimatedValue(2840000);
  const utilization = useAnimatedValue(76);

  const formatCurrency = (val: number) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `$${(val / 1000).toFixed(0)}K`;
    return `$${val}`;
  };

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6">
      {/* Header */}
      <motion.div variants={fadeUp} className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Good morning, {currentUser?.name?.split(" ")[0] || "there"} 👋
          </h1>
          <p className="text-sm text-[var(--text-tertiary)] mt-1">
            Here&apos;s what&apos;s happening across your workspace today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            <Calendar size={14} />
            Dec 1, 2024
          </Button>
          <Button variant="primary" size="sm">
            <Plus size={14} />
            New Project
          </Button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Active Projects"
          value={projectCount}
          change={{ value: 12, label: "vs last month" }}
          trend="up"
          icon={<FolderKanban size={20} />}
        />
        <StatCard
          label="Open Tasks"
          value={taskCount}
          change={{ value: -8, label: "vs last week" }}
          trend="down"
          icon={<CheckCircle2 size={20} />}
        />
        <StatCard
          label="Revenue YTD"
          value={formatCurrency(revenue)}
          change={{ value: 23, label: "vs last year" }}
          trend="up"
          icon={<DollarSign size={20} />}
        />
        <StatCard
          label="Team Utilization"
          value={`${utilization}%`}
          change={{ value: 5, label: "vs last month" }}
          trend="up"
          icon={<Activity size={20} />}
        />
      </motion.div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Projects — 2 cols */}
        <motion.div variants={fadeUp} className="lg:col-span-2">
          <Card padding="none">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
              <div className="flex items-center gap-2">
                <FolderKanban size={16} className="text-[var(--accent-2)]" />
                <h2 className="text-sm font-semibold text-[var(--text-primary)]">
                  Active Projects
                </h2>
                <Badge variant="primary" size="sm">
                  {ACTIVE_PROJECTS.length}
                </Badge>
              </div>
              <Button variant="ghost" size="sm">
                View All
                <ExternalLink size={12} />
              </Button>
            </div>
            <div className="divide-y divide-[var(--border)]">
              {ACTIVE_PROJECTS.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className="flex items-center gap-4 px-5 py-3.5 hover:bg-[var(--surface-hover)] transition-colors cursor-pointer group"
                >
                  {/* Color dot */}
                  <div
                    className={cn(
                      "h-10 w-10 rounded-xl bg-gradient-to-br flex items-center justify-center shrink-0",
                      project.coverColor
                    )}
                  >
                    <Building2
                      size={16}
                      className="text-[var(--text-primary)]"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-[var(--text-primary)] truncate group-hover:text-[var(--accent-2)] transition-colors">
                        {project.name}
                      </p>
                      <Badge
                        variant={
                          project.priority === "URGENT"
                            ? "error"
                            : project.priority === "HIGH"
                              ? "warning"
                              : "default"
                        }
                        size="sm"
                      >
                        {project.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-[var(--text-tertiary)] mt-0.5">
                      {project.client} · {project.phase}
                    </p>
                  </div>

                  {/* Progress */}
                  <div className="w-24 hidden md:block">
                    <ProgressBar
                      value={project.progress}
                      size="sm"
                      variant={
                        project.progress > 80
                          ? "success"
                          : project.progress > 50
                            ? "default"
                            : "warning"
                      }
                    />
                    <p className="text-[10px] text-[var(--text-tertiary)] mt-1 text-right">
                      {project.progress}%
                    </p>
                  </div>

                  {/* Team avatars */}
                  <div className="flex -space-x-2 hidden sm:flex">
                    {project.team.map((member) => (
                      <Avatar
                        key={member}
                        fallback={member}
                        size="xs"
                        className="ring-2 ring-[var(--surface)]"
                      />
                    ))}
                  </div>

                  {/* Due date */}
                  <p className="text-xs text-[var(--text-tertiary)] whitespace-nowrap hidden lg:block">
                    {project.dueDate}
                  </p>

                  <Button variant="ghost" size="icon-sm" className="opacity-0 group-hover:opacity-100">
                    <MoreHorizontal size={14} />
                  </Button>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Right column */}
        <motion.div variants={fadeUp} className="space-y-6">
          {/* Upcoming Deadlines */}
          <Card padding="none">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-[var(--warning)]" />
                <h2 className="text-sm font-semibold text-[var(--text-primary)]">
                  Upcoming
                </h2>
              </div>
            </div>
            <div className="divide-y divide-[var(--border)]">
              {UPCOMING_DEADLINES.map((deadline, i) => (
                <motion.div
                  key={deadline.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  className="flex items-start gap-3 px-5 py-3 hover:bg-[var(--surface-hover)] transition-colors cursor-pointer"
                >
                  <div
                    className={cn(
                      "h-2 w-2 rounded-full mt-1.5 shrink-0",
                      deadline.urgent
                        ? "bg-[var(--error)]"
                        : "bg-[var(--text-tertiary)]"
                    )}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[var(--text-primary)] font-medium truncate">
                      {deadline.title}
                    </p>
                    <p className="text-xs text-[var(--text-tertiary)]">
                      {deadline.project}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "text-xs font-medium whitespace-nowrap",
                      deadline.urgent
                        ? "text-[var(--error)]"
                        : "text-[var(--text-tertiary)]"
                    )}
                  >
                    {deadline.date}
                  </span>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* AI Activity */}
          <Card padding="none">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
              <div className="flex items-center gap-2">
                <Brain size={16} className="text-purple-400" />
                <h2 className="text-sm font-semibold text-[var(--text-primary)]">
                  AI Insights
                </h2>
                <Badge variant="primary" size="sm" dot>
                  Live
                </Badge>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <div className="p-3 rounded-xl bg-[var(--warning)]/5 border border-[var(--warning)]/10">
                <div className="flex items-start gap-2">
                  <AlertTriangle
                    size={14}
                    className="text-[var(--warning)] mt-0.5 shrink-0"
                  />
                  <div>
                    <p className="text-xs font-medium text-[var(--text-primary)]">
                      Budget Alert
                    </p>
                    <p className="text-xs text-[var(--text-tertiary)] mt-0.5">
                      Marina Bay Residences at 85% budget. Review recommended.
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[var(--success)]/5 border border-[var(--success)]/10">
                <div className="flex items-start gap-2">
                  <Zap
                    size={14}
                    className="text-[var(--success)] mt-0.5 shrink-0"
                  />
                  <div>
                    <p className="text-xs font-medium text-[var(--text-primary)]">
                      Efficiency Gain
                    </p>
                    <p className="text-xs text-[var(--text-tertiary)] mt-0.5">
                      Team velocity increased 12% this week. Sky Tower on track for
                      early completion.
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[var(--accent-2)]/5 border border-[var(--accent-2)]/10">
                <div className="flex items-start gap-2">
                  <Target
                    size={14}
                    className="text-[var(--accent-2)] mt-0.5 shrink-0"
                  />
                  <div>
                    <p className="text-xs font-medium text-[var(--text-primary)]">
                      Recommendation
                    </p>
                    <p className="text-xs text-[var(--text-tertiary)] mt-0.5">
                      Emma Roberts has capacity. Consider assigning to Heritage
                      Museum schematic work.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Utilization */}
        <motion.div variants={fadeUp}>
          <Card padding="none">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
              <div className="flex items-center gap-2">
                <Users size={16} className="text-[var(--info)]" />
                <h2 className="text-sm font-semibold text-[var(--text-primary)]">
                  Team Utilization
                </h2>
              </div>
              <Button variant="ghost" size="sm">
                Manage
              </Button>
            </div>
            <div className="divide-y divide-[var(--border)]">
              {TEAM_UTILIZATION.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  className="flex items-center gap-3 px-5 py-3 hover:bg-[var(--surface-hover)] transition-colors"
                >
                  <Avatar
                    fallback={member.name}
                    size="sm"
                    status={
                      member.status === "busy"
                        ? "busy"
                        : member.status === "away"
                          ? "away"
                          : "online"
                    }
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                      {member.name}
                    </p>
                    <p className="text-xs text-[var(--text-tertiary)]">
                      {member.role}
                    </p>
                  </div>
                  <div className="w-20">
                    <ProgressBar
                      value={member.utilization}
                      size="sm"
                      variant={
                        member.utilization >= 90
                          ? "error"
                          : member.utilization >= 70
                            ? "warning"
                            : "success"
                      }
                    />
                  </div>
                  <span
                    className={cn(
                      "text-xs font-medium w-10 text-right tabular-nums",
                      member.utilization >= 90
                        ? "text-[var(--error)]"
                        : member.utilization >= 70
                          ? "text-[var(--warning)]"
                          : "text-[var(--success)]"
                    )}
                  >
                    {member.utilization}%
                  </span>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div variants={fadeUp}>
          <Card padding="none">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
              <div className="flex items-center gap-2">
                <Activity size={16} className="text-[var(--success)]" />
                <h2 className="text-sm font-semibold text-[var(--text-primary)]">
                  Recent Activity
                </h2>
              </div>
            </div>
            <div className="divide-y divide-[var(--border)]">
              {RECENT_ACTIVITY.map((activity, i) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  className="flex items-start gap-3 px-5 py-3 hover:bg-[var(--surface-hover)] transition-colors cursor-pointer"
                >
                  {activity.type === "ai" ? (
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center shrink-0">
                      <Brain size={12} className="text-white" />
                    </div>
                  ) : (
                    <Avatar
                      fallback={activity.avatar}
                      size="sm"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[var(--text-secondary)]">
                      <span className="font-medium text-[var(--text-primary)]">
                        {activity.user}
                      </span>{" "}
                      {activity.action}{" "}
                      <span className="font-medium text-[var(--accent-2)]">
                        {activity.target}
                      </span>
                    </p>
                    <p className="text-[10px] text-[var(--text-tertiary)] mt-0.5">
                      {activity.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
