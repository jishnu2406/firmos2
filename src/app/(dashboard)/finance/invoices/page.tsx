"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Search,
  Plus,
  SlidersHorizontal,
  FileDown,
  Building,
  Calendar,
  MoreVertical,
  ArrowLeft,
  DollarSign
} from "lucide-react";
import {
  cn,
  Button,
  Badge,
  Card,
  Input
} from "@/components/ui";

const INVOICES_DB = [
  { id: "INV-2026-001", client: "Emaar Properties", project: "Dubai Creek Tower", amount: "$120,000", status: "Paid", due: "2026-06-15", created: "2026-05-15" },
  { id: "INV-2026-002", client: "Apple Inc.", project: "Apple Park Visitor Center Expansion", amount: "$85,000", status: "Sent", due: "2026-07-01", created: "2026-05-20" },
  { id: "INV-2026-003", client: "Bloomberg LP", project: "Bloomberg European HQ Interior Refresh", amount: "$45,000", status: "Paid", due: "2026-06-10", created: "2026-05-10" },
  { id: "INV-2026-004", client: "NEOM Company", project: "NEOM Industrial City Master Plan", amount: "$320,000", status: "Paid", due: "2026-05-30", created: "2026-04-30" },
  { id: "INV-2026-005", client: "The Battersea Power Station Dev Co", project: "Battersea Power Station Phase 4", amount: "$95,000", status: "Overdue", due: "2026-05-15", created: "2026-04-15" },
  { id: "INV-2026-006", client: "Emaar Properties", project: "Dubai Creek Tower", amount: "$140,000", status: "Sent", due: "2026-06-28", created: "2026-05-28" },
  { id: "INV-2026-007", client: "Green Horizon Group", project: "Marina Eco-Resort", amount: "$60,000", status: "Draft", due: "2026-06-30", created: "2026-05-30" },
  { id: "INV-2026-008", client: "Bloomberg LP", project: "Bloomberg European HQ Interior Refresh", amount: "$35,000", status: "Overdue", due: "2026-05-01", created: "2026-04-01" },
  { id: "INV-2026-009", client: "Apple Inc.", project: "Apple Park Visitor Center Expansion", amount: "$180,000", status: "Paid", due: "2026-04-30", created: "2026-03-31" },
  { id: "INV-2026-010", client: "The Battersea Power Station Dev Co", project: "Battersea Power Station Phase 4", amount: "$75,000", status: "Paid", due: "2026-03-15", created: "2026-02-15" },
  { id: "INV-2026-011", client: "NEOM Company", project: "NEOM Industrial City Master Plan", amount: "$450,000", status: "Draft", due: "2026-07-15", created: "2026-06-01" },
  { id: "INV-2026-012", client: "Green Horizon Group", project: "Marina Eco-Resort", amount: "$110,000", status: "Sent", due: "2026-06-15", created: "2026-05-15" }
];

export default function InvoicesListPage() {
  const [filter, setFilter] = useState<string>("All");
  const [search, setSearch] = useState<string>("");

  const filteredInvoices = INVOICES_DB.filter((inv) => {
    const matchesFilter = filter === "All" || inv.status === filter;
    const matchesSearch =
      inv.id.toLowerCase().includes(search.toLowerCase()) ||
      inv.client.toLowerCase().includes(search.toLowerCase()) ||
      inv.project.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "success";
      case "sent":
        return "info";
      case "overdue":
        return "error";
      case "draft":
      default:
        return "default";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <button
            onClick={() => window.location.href = '/finance'}
            className="flex items-center gap-1 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-2 font-medium"
          >
            <ArrowLeft size={12} />
            Back to Finance
          </button>
          <h1 className="text-3xl font-semibold text-[var(--text-primary)]">Invoice Ledger</h1>
          <p className="text-sm text-[var(--text-secondary)]">
            A comprehensive, audited database of all active client receivables and billings.
          </p>
        </div>
        <Button className="w-full md:w-auto self-start flex items-center gap-2">
          <Plus size={16} />
          Create Invoice
        </Button>
      </div>

      {/* Filter and search actions */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-[var(--surface)] border border-[var(--border)] p-4 rounded-xl">
        <div className="flex flex-wrap items-center gap-2">
          {["All", "Paid", "Sent", "Overdue", "Draft"].map((status) => (
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
              placeholder="Search invoice #, client..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<Search size={14} />}
              className="w-full"
            />
          </div>
          <Button variant="outline" size="sm" className="flex items-center gap-1.5 shrink-0">
            <FileDown size={14} />
            Export
          </Button>
        </div>
      </div>

      {/* Invoices Table */}
      <AnimatePresence mode="wait">
        {filteredInvoices.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center bg-[var(--surface)] border border-[var(--border)] rounded-xl"
          >
            <FileText className="text-[var(--text-tertiary)] mb-4" size={48} />
            <h3 className="text-lg font-medium text-[var(--text-primary)]">No invoices found</h3>
            <p className="text-sm text-[var(--text-secondary)] max-w-sm mt-1">
              We couldn't find any invoices matching your search. Try resetting your filters.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="overflow-x-auto bg-[var(--surface)] border border-[var(--border)] rounded-xl"
          >
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--surface-hover)]/30 text-xs text-[var(--text-tertiary)] uppercase tracking-wider">
                  <th className="p-4 font-semibold">Invoice ID</th>
                  <th className="p-4 font-semibold">Client</th>
                  <th className="p-4 font-semibold">Project commissions</th>
                  <th className="p-4 font-semibold">Billable Amount</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold">Due Date</th>
                  <th className="p-4 font-semibold">Created Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)] text-sm text-[var(--text-primary)]">
                {filteredInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-[var(--surface-hover)]/25 transition-colors">
                    <td className="p-4 font-bold text-[var(--accent-2)]">{inv.id}</td>
                    <td className="p-4 font-medium">
                      <div className="flex items-center gap-2">
                        <Building size={12} className="text-[var(--text-tertiary)]" />
                        {inv.client}
                      </div>
                    </td>
                    <td className="p-4 text-[var(--text-secondary)]">{inv.project}</td>
                    <td className="p-4 font-bold tabular-nums text-[var(--text-primary)]">{inv.amount}</td>
                    <td className="p-4">
                      <Badge variant={getStatusVariant(inv.status)} size="sm">
                        {inv.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-xs text-[var(--text-secondary)] tabular-nums">{inv.due}</td>
                    <td className="p-4 text-xs text-[var(--text-tertiary)] tabular-nums">{inv.created}</td>
                    <td className="p-4 text-right">
                      <button className="p-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded hover:bg-[var(--surface-hover)]">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
