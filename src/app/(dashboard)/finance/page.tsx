"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  DollarSign,
  TrendingUp,
  Clock,
  Activity,
  ArrowUpRight,
  ShieldCheck,
  Plus,
  FileText,
  FileDown,
  Building,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import {
  cn,
  Button,
  Badge,
  Card,
  StatCard,
  ProgressBar
} from "@/components/ui";

// Mock financial statistics corresponding to our seeded dataset
const REVENUE_DATA = [
  { month: "Jun 25", value: 340000, formatted: "$340K" },
  { month: "Jul 25", value: 410000, formatted: "$410K" },
  { month: "Aug 25", value: 380000, formatted: "$380K" },
  { month: "Sep 25", value: 520000, formatted: "$520K" },
  { month: "Oct 25", value: 490000, formatted: "$490K" },
  { month: "Nov 25", value: 610000, formatted: "$610K" },
  { month: "Dec 25", value: 750000, formatted: "$750K" },
  { month: "Jan 26", value: 540000, formatted: "$540K" },
  { month: "Feb 26", value: 680000, formatted: "$680K" },
  { month: "Mar 26", value: 720000, formatted: "$720K" },
  { month: "Apr 26", value: 890000, formatted: "$890K" },
  { month: "May 26", value: 950000, formatted: "$950K" }
];

const RECENT_INVOICES = [
  { id: "INV-2026-001", client: "Emaar Properties", project: "Dubai Creek Tower", amount: "$120,000", status: "Paid", date: "2026-05-15" },
  { id: "INV-2026-002", client: "Apple Inc.", project: "Apple Park Visitor Center", amount: "$85,000", status: "Sent", date: "2026-05-20" },
  { id: "INV-2026-003", client: "Bloomberg LP", project: "Bloomberg European HQ", amount: "$45,000", status: "Paid", date: "2026-05-10" },
  { id: "INV-2026-004", client: "NEOM Company", project: "NEOM Industrial City", amount: "$320,000", status: "Paid", date: "2026-04-30" },
  { id: "INV-2026-005", client: "Battersea Power Station", project: "Battersea Phase 4", amount: "$95,000", status: "Overdue", date: "2026-04-15" },
  { id: "INV-2026-006", client: "Emaar Properties", project: "Dubai Creek Tower", amount: "$140,000", status: "Sent", date: "2026-05-28" },
  { id: "INV-2026-007", client: "Green Horizon Group", project: "Marina Eco-Resort", amount: "$60,000", status: "Draft", date: "2026-05-30" },
  { id: "INV-2026-008", client: "Bloomberg LP", project: "Bloomberg European HQ", amount: "$35,000", status: "Overdue", date: "2026-04-01" }
];

const TOP_CLIENTS = [
  { name: "NEOM Company", revenue: "$22.0M", share: 42, logo: "N" },
  { name: "Apple Inc.", revenue: "$12.5M", share: 24, logo: "A" },
  { name: "Bloomberg LP", revenue: "$8.7M", share: 16, logo: "B" },
  { name: "Emaar Properties", revenue: "$6.4M", share: 12, logo: "E" },
  { name: "Battersea Power Station", revenue: "$3.5M", share: 6, logo: "BA" }
];

export default function FinanceDashboardPage() {
  const getInvoiceStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "success";
      case "sent":
        return "info";
      case "overdue":
        return "error";
      default:
        return "default";
    }
  };

  // Find max value in monthly revenue to calculate relative height percentages
  const maxRevenueValue = Math.max(...REVENUE_DATA.map((d) => d.value));

  return (
    <div className="space-y-6">
      {/* Role-gated Warning Banner */}
      <div className="bg-gradient-to-r from-[var(--info)]/10 to-[var(--accent-2)]/10 border border-[var(--info)]/20 p-4 rounded-xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[var(--info)]/15 text-[var(--info)] shrink-0">
            <ShieldCheck size={18} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[var(--text-primary)]">Restricted Access Module</h4>
            <p className="text-xs text-[var(--text-secondary)]">
              This financial ledger is only visible to directors, founders, and designated CFO roles. Actions are fully audited.
            </p>
          </div>
        </div>
        <Badge variant="info" size="sm">CFO Access Enabled</Badge>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-[var(--text-primary)]">Financial Operations</h1>
          <p className="text-sm text-[var(--text-secondary)]">
            Analyze consolidated billings, forecast pipelines, and review dynamic invoices.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1.5"
                  onClick={() => window.location.href = '/finance/invoices'}>
            <FileText size={14} />
            Invoice Ledger
          </Button>
          <Button size="sm" className="flex items-center gap-1.5">
            <Plus size={14} />
            Record Transaction
          </Button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total ARR Revenue"
          value="$53.1M"
          trend="up"
          change={{ value: 12.4, label: "MoM" }}
          icon={<DollarSign size={16} />}
        />
        <StatCard
          label="Outstanding Receivables"
          value="$620,000"
          trend="down"
          change={{ value: 2.1, label: "vs last mo" }}
          icon={<Clock size={16} />}
        />
        <StatCard
          label="Net Profit Margin"
          value="34.8%"
          trend="up"
          change={{ value: 0.8, label: "this quarter" }}
          icon={<TrendingUp size={16} />}
        />
        <StatCard
          label="Estimated Burn Rate"
          value="$1.2M/mo"
          trend="neutral"
          icon={<Activity size={16} />}
        />
      </div>

      {/* Grid: Revenue Chart + Top Clients */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart Card */}
        <Card className="lg:col-span-2 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-[var(--text-primary)]">Monthly Billings</h3>
              <Button variant="ghost" size="xs" className="flex items-center gap-1">
                <FileDown size={12} />
                Export CSV
              </Button>
            </div>
            <p className="text-xs text-[var(--text-secondary)]">Revenue recognized across all global architectural commissions.</p>
          </div>

          {/* Simple custom bar chart rendered using CSS flex and gradients */}
          <div className="h-64 flex items-end gap-3 pt-6 border-b border-[var(--border)] relative px-2">
            {REVENUE_DATA.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center h-full justify-end group">
                {/* Tooltip on hover */}
                <div className="absolute bottom-full mb-1 opacity-0 group-hover:opacity-100 transition-opacity bg-[var(--text-primary)] text-[var(--bg)] text-[10px] font-bold px-2 py-0.5 rounded pointer-events-none scale-95 group-hover:scale-100 duration-150 transform origin-bottom">
                  {d.formatted}
                </div>

                {/* The bar */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.value / maxRevenueValue) * 100}%` }}
                  transition={{ type: "spring", stiffness: 80, damping: 15, delay: i * 0.02 }}
                  className="w-full bg-gradient-to-t from-[var(--accent-2)] to-[var(--accent)] rounded-t-md hover:opacity-85 cursor-pointer relative"
                />

                {/* Label */}
                <span className="text-[10px] text-[var(--text-tertiary)] font-medium mt-2 whitespace-nowrap">
                  {d.month}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Clients ranked card */}
        <Card className="space-y-4">
          <div>
            <h3 className="text-base font-semibold text-[var(--text-primary)]">Top Client Billings</h3>
            <p className="text-xs text-[var(--text-secondary)]">Clients generating the largest billing shares.</p>
          </div>

          <div className="space-y-4">
            {TOP_CLIENTS.map((c, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded bg-[var(--accent-2)]/10 text-[var(--accent-2)] text-[10px] font-bold flex items-center justify-center">
                      {c.logo}
                    </div>
                    <span className="font-semibold text-[var(--text-primary)]">{c.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-[var(--text-primary)]">{c.revenue}</span>
                    <span className="text-[10px] text-[var(--text-tertiary)] ml-1">({c.share}%)</span>
                  </div>
                </div>
                <ProgressBar value={c.share} size="sm" variant={idx === 0 ? "default" : idx === 1 ? "success" : "warning"} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Invoices Table */}
      <Card className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-[var(--text-primary)]">Recent Billable Invoices</h3>
            <p className="text-xs text-[var(--text-secondary)]">Overview of the last 8 invoices processed by finance.</p>
          </div>
          <Button variant="outline" size="sm" className="flex items-center gap-1"
                  onClick={() => window.location.href = '/finance/invoices'}>
            View All Ledger
            <ArrowUpRight size={14} />
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--surface-hover)]/35 text-xs text-[var(--text-tertiary)] uppercase tracking-wider">
                <th className="p-3.5 font-medium">Invoice #</th>
                <th className="p-3.5 font-medium">Client Account</th>
                <th className="p-3.5 font-medium">Project</th>
                <th className="p-3.5 font-medium">Amount</th>
                <th className="p-3.5 font-medium">Status</th>
                <th className="p-3.5 font-medium">Billing Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)] text-sm text-[var(--text-primary)]">
              {RECENT_INVOICES.map((inv) => (
                <tr key={inv.id} className="hover:bg-[var(--surface-hover)]/30 transition-colors">
                  <td className="p-3.5 font-semibold text-[var(--accent-2)]">{inv.id}</td>
                  <td className="p-3.5">
                    <div className="flex items-center gap-2">
                      <Building size={12} className="text-[var(--text-tertiary)]" />
                      {inv.client}
                    </div>
                  </td>
                  <td className="p-3.5 text-[var(--text-secondary)]">{inv.project}</td>
                  <td className="p-3.5 font-bold tabular-nums text-[var(--text-primary)]">{inv.amount}</td>
                  <td className="p-3.5">
                    <Badge variant={getInvoiceStatusVariant(inv.status)} size="sm">
                      {inv.status}
                    </Badge>
                  </td>
                  <td className="p-3.5 text-xs text-[var(--text-secondary)] tabular-nums">{inv.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
