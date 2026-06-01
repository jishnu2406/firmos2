"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FolderKanban,
  LayoutGrid,
  List as ListIcon,
  Kanban as KanbanIcon,
  Plus,
  Search,
  SlidersHorizontal,
  Calendar,
  DollarSign,
  User,
  MoreVertical,
  CheckCircle2,
  Clock,
  AlertCircle
} from "lucide-react";
import {
  cn,
  Button,
  Badge,
  Card,
  Avatar,
  ProgressBar,
  Input
} from "@/components/ui";

// Realistic project dataset
const DEMO_PROJECTS = [
  {
    id: "p1",
    name: "Skyline Residences",
    client: "Alturas Properties",
    type: "Residential Development",
    status: "Active",
    priority: "High",
    budget: "$4.2M",
    progress: 68,
    dueDate: "2026-10-15",
    phase: "Detailed Design",
    cover: "linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)",
    team: [
      { name: "Sarah Connor", fallback: "SC" },
      { name: "David Miller", fallback: "DM" },
      { name: "Jessica Carter", fallback: "JC" }
    ]
  },
  {
    id: "p2",
    name: "Marina Eco-Resort",
    client: "Green Horizon Group",
    type: "Commercial Hospitality",
    status: "Active",
    priority: "Urgent",
    budget: "$12.5M",
    progress: 35,
    dueDate: "2027-04-30",
    phase: "Concept & Planning",
    cover: "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)",
    team: [
      { name: "Marcus Vance", fallback: "MV" },
      { name: "Elena Rostova", fallback: "ER" },
      { name: "Sarah Connor", fallback: "SC" },
      { name: "Tom Red", fallback: "TR" }
    ]
  },
  {
    id: "p3",
    name: "Centennial Art Gallery",
    client: "City Council",
    type: "Public Cultural",
    status: "Active",
    priority: "Medium",
    budget: "$8.7M",
    progress: 82,
    dueDate: "2026-08-01",
    phase: "Construction Admin",
    cover: "linear-gradient(135deg, #f59e0b 0%, #e11d48 100%)",
    team: [
      { name: "Jessica Carter", fallback: "JC" },
      { name: "Alex Wong", fallback: "AW" }
    ]
  },
  {
    id: "p4",
    name: "Nexus Headquarters",
    client: "Nexus Corp",
    type: "Corporate Headquarters",
    status: "On Hold",
    priority: "High",
    budget: "$22.0M",
    progress: 15,
    dueDate: "2027-12-15",
    phase: "Schematic Design",
    cover: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
    team: [
      { name: "Marcus Vance", fallback: "MV" },
      { name: "David Miller", fallback: "DM" }
    ]
  },
  {
    id: "p5",
    name: "Sandalwood Wellness Spa",
    client: "Solaia Group",
    type: "Interior Fitout",
    status: "Completed",
    priority: "Low",
    budget: "$1.8M",
    progress: 100,
    dueDate: "2026-02-15",
    phase: "Handover",
    cover: "linear-gradient(135deg, #f43f5e 0%, #f97316 100%)",
    team: [
      { name: "Elena Rostova", fallback: "ER" },
      { name: "Chloe Dupont", fallback: "CD" }
    ]
  },
  {
    id: "p6",
    name: "Vanguard Creative Agency",
    client: "Vanguard Media",
    type: "Office Fitout",
    status: "Draft",
    priority: "Medium",
    budget: "$950K",
    progress: 5,
    dueDate: "2026-11-01",
    phase: "Briefing",
    cover: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
    team: [
      { name: "Alex Wong", fallback: "AW" }
    ]
  },
  {
    id: "p7",
    name: "Oakridge Villa",
    client: "Arthur Pendragon",
    type: "Luxury Residential",
    status: "Active",
    priority: "High",
    budget: "$3.5M",
    progress: 50,
    dueDate: "2026-12-20",
    phase: "Tendering",
    cover: "linear-gradient(135deg, #06b6d4 0%, #10b981 100%)",
    team: [
      { name: "Chloe Dupont", fallback: "CD" },
      { name: "David Miller", fallback: "DM" }
    ]
  },
  {
    id: "p8",
    name: "Pulse Innovation Lab",
    client: "Pulse Technologies",
    type: "Industrial R&D",
    status: "Archived",
    priority: "Medium",
    budget: "$6.4M",
    progress: 100,
    dueDate: "2025-09-30",
    phase: "Closed",
    cover: "linear-gradient(135deg, #6b7280 0%, #4b5563 100%)",
    team: [
      { name: "Marcus Vance", fallback: "MV" },
      { name: "Jessica Carter", fallback: "JC" }
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as "spring", stiffness: 100, damping: 15 } }
};

export default function ProjectsPage() {
  const [view, setView] = useState<"grid" | "list" | "board">("grid");
  const [filter, setFilter] = useState<string>("All");
  const [search, setSearch] = useState<string>("");

  const filteredProjects = DEMO_PROJECTS.filter((project) => {
    const matchesFilter = filter === "All" || project.status === filter;
    const matchesSearch =
      project.name.toLowerCase().includes(search.toLowerCase()) ||
      project.client.toLowerCase().includes(search.toLowerCase()) ||
      project.type.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getPriorityVariant = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "urgent":
        return "error";
      case "high":
        return "warning";
      case "medium":
        return "primary";
      default:
        return "default";
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "success";
      case "active":
        return "info";
      case "on hold":
        return "warning";
      case "draft":
        return "default";
      default:
        return "default";
    }
  };

  // Grouped columns for board view
  const BOARD_COLUMNS = ["Draft", "Active", "On Hold", "Completed"];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-[var(--text-primary)]">Projects</h1>
          <p className="text-sm text-[var(--text-secondary)]">
            Manage your firm's pipeline, active engagements, and archival records.
          </p>
        </div>
        <Button className="w-full md:w-auto self-start flex items-center gap-2">
          <Plus size={16} />
          New Project
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-[var(--surface)] border border-[var(--border)] p-4 rounded-xl">
        <div className="flex flex-wrap items-center gap-2">
          {["All", "Active", "On Hold", "Completed", "Archived"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
                filter === status
                  ? "bg-[var(--accent-2)]/15 text-[var(--accent-2)] border border-[var(--accent-2)]/25"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] border border-transparent"
              )}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-64">
            <Input
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<Search size={14} />}
              className="w-full"
            />
          </div>

          <div className="flex items-center border border-[var(--border)] rounded-lg bg-[var(--surface-hover)] p-0.5 shrink-0">
            <button
              onClick={() => setView("grid")}
              className={cn(
                "p-1.5 rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all",
                view === "grid" && "bg-[var(--surface)] text-[var(--accent-2)] shadow-sm"
              )}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setView("list")}
              className={cn(
                "p-1.5 rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all",
                view === "list" && "bg-[var(--surface)] text-[var(--accent-2)] shadow-sm"
              )}
            >
              <ListIcon size={16} />
            </button>
            <button
              onClick={() => setView("board")}
              className={cn(
                "p-1.5 rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all",
                view === "board" && "bg-[var(--surface)] text-[var(--accent-2)] shadow-sm"
              )}
            >
              <KanbanIcon size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Content Views */}
      <AnimatePresence mode="wait">
        {filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center bg-[var(--surface)] border border-[var(--border)] rounded-xl"
          >
            <FolderKanban className="text-[var(--text-tertiary)] mb-4" size={48} />
            <h3 className="text-lg font-medium text-[var(--text-primary)]">No projects found</h3>
            <p className="text-sm text-[var(--text-secondary)] max-w-sm mt-1">
              We couldn't find any projects matching your criteria. Try adjusting your search or filters.
            </p>
          </motion.div>
        ) : view === "grid" ? (
          <motion.div
            key="grid-view"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredProjects.map((project) => (
              <motion.div key={project.id} variants={itemVariants}>
                <Card className="overflow-hidden flex flex-col h-[340px]" hover padding="none">
                  {/* Decorative Banner Cover */}
                  <div
                    style={{ background: project.cover }}
                    className="h-24 w-full relative flex items-start justify-between p-3"
                  >
                    <Badge variant={getStatusVariant(project.status)} size="sm">
                      {project.status}
                    </Badge>
                    <button className="h-7 w-7 rounded-lg bg-black/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/40 transition-colors">
                      <MoreVertical size={14} />
                    </button>
                  </div>

                  {/* Body */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className="text-[10px] font-semibold tracking-wider text-[var(--text-tertiary)] uppercase">
                          {project.type}
                        </span>
                        <Badge variant={getPriorityVariant(project.priority)} size="sm">
                          {project.priority}
                        </Badge>
                      </div>

                      <h3 className="text-base font-semibold text-[var(--text-primary)] line-clamp-1 hover:text-[var(--accent-2)] transition-colors cursor-pointer"
                          onClick={() => window.location.href = `/projects/${project.id}`}>
                        {project.name}
                      </h3>
                      <p className="text-xs text-[var(--text-secondary)]">Client: {project.client}</p>
                    </div>

                    <div className="space-y-3 mt-4">
                      {/* Phase Info */}
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[var(--text-secondary)]">Phase</span>
                        <span className="font-medium text-[var(--text-primary)]">{project.phase}</span>
                      </div>

                      {/* Progress bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] text-[var(--text-tertiary)] font-medium">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <ProgressBar value={project.progress} size="sm" variant={project.status === "Completed" ? "success" : "default"} />
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between mt-4">
                      {/* Avatars */}
                      <div className="flex -space-x-1.5 overflow-hidden">
                        {project.team.slice(0, 3).map((member, i) => (
                          <Avatar
                            key={i}
                            fallback={member.fallback}
                            size="xs"
                            className="ring-2 ring-[var(--surface)]"
                            title={member.name}
                          />
                        ))}
                        {project.team.length > 3 && (
                          <div className="h-6 w-6 rounded-full bg-[var(--surface-hover)] border border-[var(--border)] flex items-center justify-center text-[9px] font-bold text-[var(--text-secondary)] ring-2 ring-[var(--surface)]">
                            +{project.team.length - 3}
                          </div>
                        )}
                      </div>

                      {/* Due Date */}
                      <span className="text-[10px] font-medium text-[var(--text-tertiary)] flex items-center gap-1">
                        <Calendar size={11} />
                        {project.dueDate}
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : view === "list" ? (
          <motion.div
            key="list-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="overflow-x-auto bg-[var(--surface)] border border-[var(--border)] rounded-xl"
          >
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--surface-hover)] text-xs text-[var(--text-tertiary)] uppercase tracking-wider">
                  <th className="p-4 font-medium">Project Name</th>
                  <th className="p-4 font-medium">Type</th>
                  <th className="p-4 font-medium">Client</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Priority</th>
                  <th className="p-4 font-medium">Progress</th>
                  <th className="p-4 font-medium">Budget</th>
                  <th className="p-4 font-medium">Due Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)] text-sm text-[var(--text-primary)]">
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-[var(--surface-hover)]/40 transition-colors">
                    <td className="p-4 font-medium">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-semibold shrink-0"
                          style={{ background: project.cover }}
                        >
                          {project.name[0]}
                        </div>
                        <div>
                          <div className="font-semibold hover:text-[var(--accent-2)] cursor-pointer"
                               onClick={() => window.location.href = `/projects/${project.id}`}>
                            {project.name}
                          </div>
                          <div className="text-xs text-[var(--text-tertiary)]">{project.phase}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-[var(--text-secondary)]">{project.type}</td>
                    <td className="p-4 text-[var(--text-secondary)]">{project.client}</td>
                    <td className="p-4">
                      <Badge variant={getStatusVariant(project.status)} size="sm">
                        {project.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge variant={getPriorityVariant(project.priority)} size="sm">
                        {project.priority}
                      </Badge>
                    </td>
                    <td className="p-4 w-44">
                      <div className="flex items-center gap-2">
                        <ProgressBar value={project.progress} className="flex-1" size="sm" variant={project.status === "Completed" ? "success" : "default"} />
                        <span className="text-xs font-semibold tabular-nums text-[var(--text-secondary)]">
                          {project.progress}%
                        </span>
                      </div>
                    </td>
                    <td className="p-4 font-medium tabular-nums">{project.budget}</td>
                    <td className="p-4 text-xs text-[var(--text-secondary)]">{project.dueDate}</td>
                    <td className="p-4 text-right">
                      <button className="p-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-md hover:bg-[var(--surface-hover)]">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        ) : (
          <motion.div
            key="board-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start"
          >
            {BOARD_COLUMNS.map((columnStatus) => {
              const columnProjects = filteredProjects.filter(
                (p) => p.status === columnStatus || (columnStatus === "Draft" && p.status === "Draft")
              );
              return (
                <div
                  key={columnStatus}
                  className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4 space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-[var(--border)] pb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-[var(--text-primary)]">{columnStatus}</span>
                      <span className="h-5 px-1.5 rounded bg-[var(--surface-hover)] text-xs text-[var(--text-secondary)] font-medium flex items-center justify-center">
                        {columnProjects.length}
                      </span>
                    </div>
                    <button className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] p-0.5 rounded">
                      <Plus size={14} />
                    </button>
                  </div>

                  <div className="space-y-3 min-h-[300px] overflow-y-auto max-h-[60vh] scrollbar-thin">
                    {columnProjects.map((project) => (
                      <Card
                        key={project.id}
                        className="p-3 border border-[var(--border)] hover:border-[var(--accent-2)]/30 transition-all shadow-sm select-none"
                        hover
                        onClick={() => window.location.href = `/projects/${project.id}`}
                      >
                        <div className="space-y-3">
                          <div className="flex justify-between items-start gap-2">
                            <span className="text-[9px] font-semibold text-[var(--text-tertiary)] uppercase tracking-wider">
                              {project.type}
                            </span>
                            <Badge variant={getPriorityVariant(project.priority)} size="sm">
                              {project.priority}
                            </Badge>
                          </div>

                          <h4 className="font-semibold text-sm text-[var(--text-primary)] line-clamp-2 hover:text-[var(--accent-2)] transition-colors">
                            {project.name}
                          </h4>

                          <div className="flex justify-between items-center text-[10px] text-[var(--text-secondary)]">
                            <span>Client: {project.client}</span>
                            <span className="font-semibold">{project.budget}</span>
                          </div>

                          <div className="space-y-1">
                            <div className="flex justify-between text-[9px] text-[var(--text-tertiary)]">
                              <span>Progress</span>
                              <span>{project.progress}%</span>
                            </div>
                            <ProgressBar value={project.progress} size="sm" />
                          </div>

                          <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between">
                            <div className="flex -space-x-1">
                              {project.team.slice(0, 3).map((member, idx) => (
                                <Avatar
                                  key={idx}
                                  fallback={member.fallback}
                                  size="xs"
                                  className="ring-1 ring-[var(--surface)]"
                                />
                              ))}
                            </div>
                            <span className="text-[9px] font-medium text-[var(--text-tertiary)] flex items-center gap-0.5">
                              <Calendar size={10} />
                              {project.dueDate}
                            </span>
                          </div>
                        </div>
                      </Card>
                    ))}
                    {columnProjects.length === 0 && (
                      <div className="flex flex-col items-center justify-center py-10 border border-dashed border-[var(--border)] rounded-lg text-center">
                        <FolderKanban size={24} className="text-[var(--text-tertiary)] mb-2" />
                        <span className="text-xs text-[var(--text-tertiary)] font-medium">No projects in this stage</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
