"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Search,
  Plus,
  ArrowUpRight,
  TrendingUp,
  FolderOpen,
  DollarSign,
  Users,
  Briefcase,
  Mail,
  Phone
} from "lucide-react";
import {
  cn,
  Button,
  Badge,
  Card,
  Input
} from "@/components/ui";

const CLIENTS = [
  {
    id: "c1",
    name: "Emaar Properties",
    industry: "Real Estate Development",
    projectsCount: 2,
    contactsCount: 4,
    revenue: "$6.4M",
    activeProjects: ["Dubai Creek Tower", "Downtown Boulevard Walk"],
    gradient: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
    primaryContact: "Ahmad Al Matrooshi (Managing Director)"
  },
  {
    id: "c2",
    name: "Apple Inc.",
    industry: "Consumer Technology",
    projectsCount: 1,
    contactsCount: 2,
    revenue: "$12.5M",
    activeProjects: ["Apple Park Visitor Center Expansion"],
    gradient: "linear-gradient(135deg, #111827 0%, #4b5563 100%)",
    primaryContact: "Angela Ahrendts (VP Retail & Design)"
  },
  {
    id: "c3",
    name: "Bloomberg LP",
    industry: "Financial Media",
    projectsCount: 1,
    contactsCount: 3,
    revenue: "$8.7M",
    activeProjects: ["Bloomberg European HQ Interior Refresh"],
    gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    primaryContact: "Michael R. Bloomberg (Founder)"
  },
  {
    id: "c4",
    name: "NEOM Company",
    industry: "Megacity Development",
    projectsCount: 1,
    contactsCount: 5,
    revenue: "$22.0M",
    activeProjects: ["NEOM Industrial City Master Plan"],
    gradient: "linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)",
    primaryContact: "Nadhmi Al-Nasr (CEO)"
  },
  {
    id: "c5",
    name: "Battersea Power Station Dev Co",
    industry: "Urban Regeneration",
    projectsCount: 1,
    contactsCount: 3,
    revenue: "$3.5M",
    activeProjects: ["Battersea Power Station Phase 4"],
    gradient: "linear-gradient(135deg, #7c2d12 0%, #f97316 100%)",
    primaryContact: "Simon Murphy (CEO)"
  },
  {
    id: "c6",
    name: "Green Horizon Group",
    industry: "Eco-Tourism & Hospitality",
    projectsCount: 1,
    contactsCount: 2,
    revenue: "$1.8M",
    activeProjects: ["Marina Eco-Resort"],
    gradient: "linear-gradient(135deg, #065f46 0%, #10b981 100%)",
    primaryContact: "Sarah Jenkins (Sustainability Lead)"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as "spring", stiffness: 100, damping: 15 } }
};

export default function ClientsPage() {
  const [search, setSearch] = useState<string>("");

  const filteredClients = CLIENTS.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.industry.toLowerCase().includes(search.toLowerCase()) ||
      c.primaryContact.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-[var(--text-primary)]">Key Client Accounts</h1>
          <p className="text-sm text-[var(--text-secondary)]">
            Manage your accounts, strategic relationships, and historical engagement value.
          </p>
        </div>
        <Button className="w-full md:w-auto self-start flex items-center gap-2">
          <Plus size={16} />
          Add Account
        </Button>
      </div>

      {/* Search Filter */}
      <div className="bg-[var(--surface)] border border-[var(--border)] p-4 rounded-xl flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Input
            placeholder="Search accounts or industries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search size={14} />}
            className="w-full"
          />
        </div>
        <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
          <span className="font-semibold text-[var(--text-primary)]">{filteredClients.length}</span>
          Accounts Found
        </div>
      </div>

      {/* Grid of Client Cards */}
      <AnimatePresence mode="wait">
        {filteredClients.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center bg-[var(--surface)] border border-[var(--border)] rounded-xl"
          >
            <Building2 className="text-[var(--text-tertiary)] mb-4" size={48} />
            <h3 className="text-lg font-medium text-[var(--text-primary)]">No accounts found</h3>
            <p className="text-sm text-[var(--text-secondary)] max-w-sm mt-1">
              We couldn't find any client accounts matching your search parameters.
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredClients.map((client) => (
              <motion.div key={client.id} variants={itemVariants}>
                <Card className="overflow-hidden flex flex-col justify-between h-[300px]" hover padding="none">
                  {/* Decorative Banner Cover */}
                  <div
                    style={{ background: client.gradient }}
                    className="h-20 w-full relative flex items-center justify-between p-4"
                  >
                    <div className="h-10 w-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white font-bold text-base">
                      {client.name[0]}
                    </div>
                    <button className="h-7 w-7 rounded-lg bg-black/10 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/30 transition-colors">
                      <ArrowUpRight size={14} />
                    </button>
                  </div>

                  {/* Body */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold tracking-wider text-[var(--text-tertiary)] uppercase">
                        {client.industry}
                      </span>
                      <h3 className="text-lg font-semibold text-[var(--text-primary)] hover:text-[var(--accent-2)] transition-colors cursor-pointer">
                        {client.name}
                      </h3>
                      <p className="text-xs text-[var(--text-secondary)] line-clamp-1">
                        <span className="font-semibold text-[var(--text-primary)]">Primary:</span> {client.primaryContact}
                      </p>
                    </div>

                    {/* Stats strip */}
                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-[var(--border)] my-3">
                      <div className="text-center">
                        <div className="text-[10px] text-[var(--text-tertiary)] font-medium uppercase tracking-wider">
                          Projects
                        </div>
                        <div className="text-sm font-semibold text-[var(--text-primary)] flex items-center justify-center gap-1">
                          <FolderOpen size={11} className="text-[var(--accent-2)]" />
                          {client.projectsCount}
                        </div>
                      </div>
                      <div className="text-center border-x border-[var(--border)]">
                        <div className="text-[10px] text-[var(--text-tertiary)] font-medium uppercase tracking-wider">
                          Contacts
                        </div>
                        <div className="text-sm font-semibold text-[var(--text-primary)] flex items-center justify-center gap-1">
                          <Users size={11} className="text-[var(--accent-2)]" />
                          {client.contactsCount}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-[10px] text-[var(--text-tertiary)] font-medium uppercase tracking-wider">
                          Revenue
                        </div>
                        <div className="text-sm font-bold text-[var(--success)] flex items-center justify-center gap-0.5">
                          <TrendingUp size={11} />
                          {client.revenue}
                        </div>
                      </div>
                    </div>

                    {/* Active engagements */}
                    <div>
                      <span className="text-[9px] font-bold text-[var(--text-tertiary)] uppercase tracking-wider block mb-1">
                        Active Engagements
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {client.activeProjects.map((p, i) => (
                          <Badge key={i} variant="primary" size="sm" className="max-w-[130px] truncate">
                            {p}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
