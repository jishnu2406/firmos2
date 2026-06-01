"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Sparkles,
  Search,
  Cpu,
  Terminal,
  Play,
  Pause,
  Clock,
  Compass,
  ArrowRight,
  TrendingUp,
  Coins,
  ShieldCheck,
  Bot
} from "lucide-react";
import {
  cn,
  Button,
  Badge,
  Card,
  StatCard,
  Input
} from "@/components/ui";

const AI_AGENTS_DB = [
  { id: "a1", name: "Budget Guardian", role: "Financial Auditor", desc: "Monitors active project billable thresholds, cross-references direct time card entries against base design contract limits, and flags high burn rate phases.", status: "Active", lastRun: "10 mins ago" },
  { id: "a2", name: "Deadline Sentinel", role: "Milestone Planner", desc: "Analyzes project Gantt baseline paths, monitors completed deliverables, and alerts project managers to structural delay risks.", status: "Active", lastRun: "1 hour ago" },
  { id: "a3", name: "Brief Analyzer", role: "Concept Ingestor", desc: "Digests raw client documents, extracts legal drawing specifications, builds initial phase logs, and generates creative FF&E logs.", status: "Active", lastRun: "2 hours ago" },
  { id: "a4", name: "Invoice Chaser", role: "Accounts Receivable", desc: "Tracks sent billings, cross-checks Stripe payment links, drafts reminders to accounts payable, and schedules automated email reminders.", status: "Paused", lastRun: "1 day ago" },
  { id: "a5", name: "Knowledge Curator", role: "RAG System Indexer", desc: "Crawls local CAD registers, DWG structures, and compliance logs to semantically index global architectural details.", status: "Active", lastRun: "4 mins ago" },
  { id: "a6", name: "Report Writer", role: "Executive Assistant", desc: "Compiles weekly project health briefs, active billing summaries, and stakeholder updates into print-ready PDF formats.", status: "Paused", lastRun: "3 days ago" }
];

export default function AIHubPage() {
  const [agents, setAgents] = useState(AI_AGENTS_DB);
  const [search, setSearch] = useState("");

  const toggleAgentStatus = (id: string) => {
    setAgents(
      agents.map((agent) =>
        agent.id === id
          ? { ...agent, status: agent.status === "Active" ? "Paused" : "Active" }
          : agent
      )
    );
  };

  const filteredAgents = agents.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Premium Hero Gradient Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-[var(--glass-border)] bg-[var(--surface)] p-6 md:p-8">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 pointer-events-none opacity-40 blur-xl" />
        
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-wider">
              <Sparkles size={11} />
              AI-Native Intelligence Hub
            </div>
            <h1 className="text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">DNAX.ai Mind</h1>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Consolidate firm knowledge, execute autonomous agents, optimize engineering schedules, and chat directly with drawing vaults through semantic RAG networks.
            </p>
            <div className="pt-2">
              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 shadow-lg shadow-indigo-600/20">
                Initialize Search
                <ArrowRight size={14} />
              </Button>
            </div>
          </div>

          <div className="shrink-0 flex items-center justify-center p-6 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 relative group">
            <Brain size={64} className="text-indigo-400 animate-pulse" />
            <div className="absolute -inset-1 rounded-2xl bg-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
          </div>
        </div>
      </div>

      {/* RAG statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="AI Ingested Queries" value="1,420" trend="up" change={{ value: 18.2, label: "today" }} />
        <StatCard label="Model Tokens Ingested" value="12.4M" trend="neutral" />
        <StatCard label="Autonomous Executions" value="482" trend="up" change={{ value: 5.4, label: "this wk" }} />
        <StatCard label="Cost Savings Ratio" value="1:4.8" trend="up" change={{ value: 12, label: "vs last mo" }} />
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-5 space-y-4 hover:border-indigo-500/30 transition-all border border-[var(--border)]">
          <div className="h-10 w-10 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
            <Cpu size={20} />
          </div>
          <h3 className="text-base font-bold text-[var(--text-primary)]">Semantic Drawing Search</h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Query entire project archives (dwg, specifications, structural reports) using semantic NLP queries like "Find all fire escape stairs in Battersea Phase 4."
          </p>
          <Button variant="outline" size="sm" className="w-full text-indigo-400 border-indigo-500/20 hover:bg-indigo-500/10">Launch Search</Button>
        </Card>

        <Card className="p-5 space-y-4 hover:border-indigo-500/30 transition-all border border-[var(--border)]">
          <div className="h-10 w-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
            <Compass size={20} />
          </div>
          <h3 className="text-base font-bold text-[var(--text-primary)]">Schedule Optimizer</h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Ingest active milestones and team capacities, optimize critical paths automatically, resolve structural overlaps, and balance over-allocations with smart path finding.
          </p>
          <Button variant="outline" size="sm" className="w-full text-purple-400 border-purple-500/20 hover:bg-purple-500/10">Optimize Path</Button>
        </Card>

        <Card className="p-5 space-y-4 hover:border-indigo-500/30 transition-all border border-[var(--border)]">
          <div className="h-10 w-10 rounded-lg bg-pink-500/10 text-pink-400 flex items-center justify-center shrink-0">
            <Terminal size={20} />
          </div>
          <h3 className="text-base font-bold text-[var(--text-primary)]">Autonomous Agent Engine</h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Deploy background AI agents that continuously audit active budgets, track deadlines, generate reports, send invoice notifications, and index specifications.
          </p>
          <Button variant="outline" size="sm" className="w-full text-pink-400 border-pink-500/20 hover:bg-pink-500/10">Configure Engines</Button>
        </Card>
      </div>

      {/* Autonomous Agents Management Section */}
      <Card className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-[var(--text-primary)]">Autonomous Background Agents</h3>
            <p className="text-xs text-[var(--text-secondary)]">Manage active agent state triggers, audit runs, and detailed execution outputs.</p>
          </div>
          <div className="relative w-full md:w-64">
            <Input
              placeholder="Search active agents..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<Search size={14} />}
              className="w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredAgents.map((agent) => (
              <motion.div
                key={agent.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
              >
                <Card className="p-4 border border-[var(--border)] flex flex-col justify-between h-[230px]" hover>
                  <div>
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-[var(--text-primary)] flex items-center gap-1.5">
                          <Bot size={15} className="text-indigo-400" />
                          {agent.name}
                        </h4>
                        <span className="text-[10px] text-[var(--text-tertiary)] uppercase font-semibold">
                          {agent.role}
                        </span>
                      </div>
                      <Badge variant={agent.status === "Active" ? "success" : "default"} size="sm">
                        {agent.status}
                      </Badge>
                    </div>

                    <p className="text-xs text-[var(--text-secondary)] mt-2 leading-relaxed line-clamp-4">
                      {agent.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between mt-3 text-[10px] text-[var(--text-tertiary)]">
                    <span className="flex items-center gap-1">
                      <Clock size={11} />
                      Last run: {agent.lastRun}
                    </span>
                    <button
                      onClick={() => toggleAgentStatus(agent.id)}
                      className={cn(
                        "flex items-center gap-1 px-2.5 py-1 rounded font-semibold transition-colors active:scale-95",
                        agent.status === "Active"
                          ? "bg-[var(--error)]/10 text-[var(--error)] hover:bg-[var(--error)]/25"
                          : "bg-[var(--success)]/10 text-[var(--success)] hover:bg-[var(--success)]/25"
                      )}
                    >
                      {agent.status === "Active" ? (
                        <>
                          <Pause size={10} />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play size={10} />
                          Activate
                        </>
                      )}
                    </button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Card>
    </div>
  );
}
