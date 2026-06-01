"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  DollarSign,
  Clock,
  AlertTriangle,
  Briefcase,
  Users,
  FileText,
  TrendingUp,
  ChevronRight,
  Plus,
  Play,
  CheckCircle,
  FileDown,
  ChevronDown,
  UserPlus
} from "lucide-react";
import {
  cn,
  Button,
  Badge,
  Card,
  Avatar,
  ProgressBar,
  StatCard
} from "@/components/ui";

// Mock Project Database matching the seeded data
const PROJECTS_DB: Record<string, any> = {
  p1: {
    id: "p1",
    name: "Dubai Creek Tower",
    client: "Emaar Properties",
    type: "Supertall Structure",
    status: "Active",
    priority: "High",
    budget: "$4.2M",
    actualCost: "$2.8M",
    progress: 68,
    dueDate: "2026-10-15",
    startDate: "2024-03-01",
    location: "Dubai, UAE",
    brief: "A landmark observation tower designed as the centerpiece of Dubai Creek Harbour. The project combines extreme structural engineering with elegant architectural design, representing a lily bud anchored by tension cables.",
    phase: "Detailed Design",
    cover: "linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)",
    team: [
      { name: "Norman Foster", fallback: "NF", role: "Design Principal" },
      { name: "Mouzhan Majidi", fallback: "MM", role: "Project Director" },
      { name: "Laura Chen", fallback: "LC", role: "Lead Architect" }
    ],
    milestones: [
      { name: "Concept Approval", date: "2024-06-12", status: "Completed" },
      { name: "Schematic Design Signed", date: "2024-11-20", status: "Completed" },
      { name: "Detailed Design Submission", date: "2025-09-15", status: "In Progress" },
      { name: "Tender Issuance", date: "2026-03-01", status: "Pending" }
    ],
    tasks: [
      { id: "t1", title: "Refine aerodynamic cable calculations", status: "IN_REVIEW", priority: "URGENT", assignee: "Norman Foster", due: "2026-06-05" },
      { id: "t2", title: "Complete facade cladding shop drawings", status: "IN_PROGRESS", priority: "HIGH", assignee: "Laura Chen", due: "2026-06-18" },
      { id: "t3", title: "Select main lobby stone finishes", status: "TODO", priority: "MEDIUM", assignee: "Marcus Williams", due: "2026-07-02" },
      { id: "t4", title: "Finalize MEP vertical riser layouts", status: "DONE", priority: "HIGH", assignee: "Mouzhan Majidi", due: "2026-05-15" }
    ],
    documents: [
      { name: "A-101_Ground_Floor_Plan.dwg", size: "18.4 MB", uploadedBy: "Laura Chen", date: "2026-05-24" },
      { name: "Structural_Wind_Analysis_Report.pdf", size: "4.2 MB", uploadedBy: "Norman Foster", date: "2026-05-12" },
      { name: "Facade_Cladding_Material_Spec.pdf", size: "1.1 MB", uploadedBy: "Laura Chen", date: "2026-05-02" }
    ]
  },
  p2: {
    id: "p2",
    name: "Apple Park Visitor Center Expansion",
    client: "Apple Inc.",
    type: "Commercial Hospitality",
    status: "Active",
    priority: "Urgent",
    budget: "$12.5M",
    actualCost: "$4.1M",
    progress: 35,
    dueDate: "2027-04-30",
    startDate: "2025-01-10",
    location: "Cupertino, California",
    brief: "Extension of the iconic visitor pavilion at Apple Park. Adding carbon-fiber roofed indoor-outdoor dining and immersive AR experience zones using ultra-clear curved structural glass facades.",
    phase: "Concept & Planning",
    cover: "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)",
    team: [
      { name: "David Nelson", fallback: "DN", role: "Design Principal" },
      { name: "Sofia Rossi", fallback: "SR", role: "Project Manager" },
      { name: "James Okoye", fallback: "JO", role: "Senior Architect" }
    ],
    milestones: [
      { name: "Site Context Survey", date: "2025-02-15", status: "Completed" },
      { name: "Carbon Fiber Roof Analysis", date: "2025-05-01", status: "Completed" },
      { name: "Glass Fabrication Prototypes", date: "2026-08-10", status: "Pending" }
    ],
    tasks: [
      { id: "t2-1", title: "Glass vendor site audit in Germany", status: "IN_PROGRESS", priority: "HIGH", assignee: "David Nelson", due: "2026-06-10" },
      { id: "t2-2", title: "Review structural carbon deflection models", status: "TODO", priority: "URGENT", assignee: "James Okoye", due: "2026-06-12" },
      { id: "t2-3", title: "Landscape interface detailing", status: "TODO", priority: "MEDIUM", assignee: "Aiko Tanaka", due: "2026-07-20" }
    ],
    documents: [
      { name: "C-201_Site_Plan_Revision_3.dwg", size: "14.1 MB", uploadedBy: "Sofia Rossi", date: "2026-05-28" },
      { name: "Carbon_Fiber_Slab_Deflection.xlsx", size: "2.8 MB", uploadedBy: "James Okoye", date: "2026-05-20" }
    ]
  }
};

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<"overview" | "tasks" | "documents" | "team" | "budget">("overview");
  
  // Resolve project by ID, defaulting to p1 (Dubai Creek Tower) if parameter is not found
  const projectId = params?.id || "p1";
  const project = PROJECTS_DB[projectId] || PROJECTS_DB["p1"];

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
      case "in_review":
      case "in progress":
        return "info";
      case "todo":
        return "default";
      default:
        return "default";
    }
  };

  return (
    <div className="space-y-6">
      {/* Project Hero Header */}
      <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
        <div
          style={{ background: project.cover, opacity: 0.15 }}
          className="absolute inset-0 h-40 blur-md pointer-events-none"
        />
        <div className="relative p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="primary" size="sm">
                {project.type}
              </Badge>
              <Badge variant="info" size="sm">
                {project.status}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold text-[var(--text-primary)]">{project.name}</h1>
            <p className="text-sm text-[var(--text-secondary)] flex items-center gap-1.5">
              <span className="font-semibold text-[var(--text-primary)]">{project.client}</span>
              &bull;
              <span>{project.location}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button variant="outline" size="sm" className="flex items-center gap-1.5">
              <FileDown size={14} />
              Export Brief
            </Button>
            <Button size="sm" className="flex items-center gap-1.5">
              <Plus size={14} />
              Add Task
            </Button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="border-t border-[var(--border)] px-6 bg-[var(--surface-hover)]/30 flex overflow-x-auto scrollbar-none">
          {(["overview", "tasks", "documents", "team", "budget"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "py-3.5 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 border-transparent transition-all duration-200 shrink-0",
                activeTab === tab
                  ? "border-[var(--accent-2)] text-[var(--accent-2)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Contents */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Project Brief */}
                <Card className="space-y-4">
                  <h3 className="text-base font-semibold text-[var(--text-primary)]">Project Brief</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {project.brief}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2 border-t border-[var(--border)]">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[var(--text-tertiary)]">Start Date</span>
                      <p className="text-sm font-semibold text-[var(--text-primary)] mt-0.5">{project.startDate}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[var(--text-tertiary)]">Due Date</span>
                      <p className="text-sm font-semibold text-[var(--text-primary)] mt-0.5">{project.dueDate}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[var(--text-tertiary)]">Active Phase</span>
                      <p className="text-sm font-semibold text-[var(--text-primary)] mt-0.5">{project.phase}</p>
                    </div>
                  </div>
                </Card>

                {/* Phase & Milestones Timeline */}
                <Card className="space-y-4">
                  <h3 className="text-base font-semibold text-[var(--text-primary)]">Milestones Timeline</h3>
                  <div className="relative border-l-2 border-[var(--border)] ml-3 pl-6 space-y-6 py-2">
                    {project.milestones.map((m: any, idx: number) => (
                      <div key={idx} className="relative">
                        {/* Dot indicator */}
                        <span
                          className={cn(
                            "absolute -left-[31px] top-0.5 h-4 w-4 rounded-full border-2 border-[var(--bg)] flex items-center justify-center",
                            m.status === "Completed"
                              ? "bg-[var(--success)]"
                              : m.status === "In Progress"
                              ? "bg-[var(--accent-2)]"
                              : "bg-[var(--surface-hover)]"
                          )}
                        />
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                          <span className="font-semibold text-sm text-[var(--text-primary)]">{m.name}</span>
                          <span className="text-xs text-[var(--text-tertiary)] tabular-nums">{m.date}</span>
                        </div>
                        <Badge
                          variant={m.status === "Completed" ? "success" : m.status === "In Progress" ? "primary" : "default"}
                          size="sm"
                          className="mt-1"
                        >
                          {m.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Right column */}
              <div className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-1 gap-4">
                  <StatCard label="Overall Progress" value={`${project.progress}%`} trend="up" change={{ value: 4, label: "this wk" }} />
                  <StatCard label="Phase Budget" value={project.budget} />
                  <StatCard label="Actual Cost" value={project.actualCost} />
                </div>

                {/* Compact Team */}
                <Card className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-[var(--text-primary)]">Key Stakeholders</h3>
                    <button className="text-xs font-semibold text-[var(--accent-2)] hover:underline">Manage</button>
                  </div>
                  <div className="space-y-3">
                    {project.team.map((t: any, idx: number) => (
                      <div key={idx} className="flex items-center gap-3">
                        <Avatar fallback={t.fallback} size="sm" />
                        <div>
                          <div className="text-sm font-semibold text-[var(--text-primary)]">{t.name}</div>
                          <div className="text-xs text-[var(--text-tertiary)]">{t.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "tasks" && (
            <Card className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-[var(--text-primary)]">Project Tasks</h3>
                  <p className="text-xs text-[var(--text-secondary)]">Manage direct engineering and design deliverables.</p>
                </div>
                <Button size="sm" className="flex items-center gap-1">
                  <Plus size={14} />
                  Add Task
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[var(--border)] text-xs text-[var(--text-tertiary)] uppercase tracking-wider bg-[var(--surface-hover)]/40">
                      <th className="p-3 font-semibold">Deliverable</th>
                      <th className="p-3 font-semibold">Assignee</th>
                      <th className="p-3 font-semibold">Status</th>
                      <th className="p-3 font-semibold">Priority</th>
                      <th className="p-3 font-semibold">Due Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)] text-sm text-[var(--text-primary)]">
                    {project.tasks.map((task: any) => (
                      <tr key={task.id} className="hover:bg-[var(--surface-hover)]/30 transition-colors">
                        <td className="p-3 font-medium">{task.title}</td>
                        <td className="p-3 text-[var(--text-secondary)]">{task.assignee}</td>
                        <td className="p-3">
                          <Badge variant={getStatusVariant(task.status)} size="sm">
                            {task.status}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <Badge variant={getPriorityVariant(task.priority)} size="sm">
                            {task.priority}
                          </Badge>
                        </td>
                        <td className="p-3 text-xs text-[var(--text-secondary)] tabular-nums">{task.due}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {activeTab === "documents" && (
            <Card className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-[var(--text-primary)]">Asset Register</h3>
                  <p className="text-xs text-[var(--text-secondary)]">Design blueprints, contracts, and calculations vault.</p>
                </div>
                <Button size="sm" className="flex items-center gap-1">
                  <Plus size={14} />
                  Upload
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.documents.map((doc: any, idx: number) => (
                  <Card key={idx} variant="bordered" className="p-3 hover:border-[var(--accent-2)]/30 transition-all flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded bg-amber-500/10 text-amber-500 shrink-0">
                        <FileText size={18} />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-sm font-semibold text-[var(--text-primary)] line-clamp-1" title={doc.name}>
                          {doc.name}
                        </h4>
                        <p className="text-xs text-[var(--text-tertiary)]">{doc.size}</p>
                        <p className="text-[10px] text-[var(--text-secondary)]">By {doc.uploadedBy} on {doc.date}</p>
                      </div>
                    </div>
                    <button className="text-[var(--text-secondary)] hover:text-[var(--accent-2)] p-1 rounded hover:bg-[var(--surface-hover)]">
                      <FileDown size={14} />
                    </button>
                  </Card>
                ))}
              </div>
            </Card>
          )}

          {activeTab === "team" && (
            <Card className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-[var(--text-primary)]">Assigned Resources</h3>
                  <p className="text-xs text-[var(--text-secondary)]">FTE (Full Time Equivalent) staff allocated to this project.</p>
                </div>
                <Button size="sm" variant="secondary" className="flex items-center gap-1">
                  <UserPlus size={14} />
                  Invite Member
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.team.map((m: any, idx: number) => (
                  <Card key={idx} padding="md" className="flex items-center gap-4 border border-[var(--border)]">
                    <Avatar fallback={m.fallback} size="lg" />
                    <div>
                      <h4 className="text-base font-semibold text-[var(--text-primary)]">{m.name}</h4>
                      <p className="text-xs text-[var(--text-secondary)]">{m.role}</p>
                      <div className="mt-2 flex items-center gap-1.5">
                        <span className="text-[10px] uppercase font-bold text-[var(--text-tertiary)]">Allocation</span>
                        <Badge variant="primary" size="sm">
                          80% FTE
                        </Badge>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          )}

          {activeTab === "budget" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Budget breakdown */}
              <Card className="lg:col-span-2 space-y-4">
                <h3 className="text-base font-semibold text-[var(--text-primary)]">Cost Breakdown</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-[var(--text-secondary)] font-medium mb-1">
                      <span>Detailed Engineering</span>
                      <span className="font-semibold text-[var(--text-primary)]">$1.4M / $1.8M</span>
                    </div>
                    <ProgressBar value={77} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm text-[var(--text-secondary)] font-medium mb-1">
                      <span>Structural Consulting</span>
                      <span className="font-semibold text-[var(--text-primary)]">$600K / $800K</span>
                    </div>
                    <ProgressBar value={75} variant="warning" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm text-[var(--text-secondary)] font-medium mb-1">
                      <span>Sustainability Advisory</span>
                      <span className="font-semibold text-[var(--text-primary)]">$200K / $400K</span>
                    </div>
                    <ProgressBar value={50} variant="success" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm text-[var(--text-secondary)] font-medium mb-1">
                      <span>Visualisation & Renderings</span>
                      <span className="font-semibold text-[var(--text-primary)]">$600K / $1.2M</span>
                    </div>
                    <ProgressBar value={50} variant="error" />
                  </div>
                </div>
              </Card>

              {/* Invoices list */}
              <Card className="space-y-4">
                <h3 className="text-base font-semibold text-[var(--text-primary)]">Recent Invoices</h3>
                <div className="divide-y divide-[var(--border)]">
                  <div className="py-2.5 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-[var(--text-primary)]">INV-2026-001</div>
                      <div className="text-xs text-[var(--text-tertiary)]">Due: 2026-06-15</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-[var(--text-primary)]">$120,000</div>
                      <Badge variant="success" size="sm">Paid</Badge>
                    </div>
                  </div>
                  <div className="py-2.5 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-[var(--text-primary)] opacity-90">INV-2026-002</div>
                      <div className="text-xs text-[var(--text-tertiary)]">Due: 2026-07-01</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-[var(--text-primary)]">$85,000</div>
                      <Badge variant="primary" size="sm">Sent</Badge>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
