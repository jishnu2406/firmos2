"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Search,
  LayoutGrid,
  List as ListIcon,
  Plus,
  Mail,
  Phone,
  Briefcase,
  MapPin,
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle
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

const DEPARTMENTS = ["All", "Architecture", "Design", "Project Management", "Operations", "Finance"];

const TEAM_MEMBERS = [
  {
    id: "m1",
    name: "Norman Foster",
    fallback: "NF",
    role: "Founder & Design Principal",
    department: "Architecture",
    email: "norman@fosterandpartners.com",
    status: "online",
    utilization: 95,
    location: "London, UK",
    joined: "2020-01-01"
  },
  {
    id: "m2",
    name: "Luke Fox",
    fallback: "LF",
    role: "Executive Principal",
    department: "Architecture",
    email: "luke.fox@fosterandpartners.com",
    status: "busy",
    utilization: 80,
    location: "London, UK",
    joined: "2020-05-12"
  },
  {
    id: "m3",
    name: "Spencer de Grey",
    fallback: "SG",
    role: "Head of Design",
    department: "Design",
    email: "spencer@fosterandpartners.com",
    status: "online",
    utilization: 75,
    location: "London, UK",
    joined: "2020-08-20"
  },
  {
    id: "m4",
    name: "David Nelson",
    fallback: "DN",
    role: "Head of Architecture",
    department: "Architecture",
    email: "david.nelson@fosterandpartners.com",
    status: "away",
    utilization: 85,
    location: "London, UK",
    joined: "2020-09-15"
  },
  {
    id: "m5",
    name: "Narinder Sagoo",
    fallback: "NS",
    role: "Senior Partner & Illustrator",
    department: "Design",
    email: "narinder@fosterandpartners.com",
    status: "online",
    utilization: 90,
    location: "New York, USA",
    joined: "2021-03-01"
  },
  {
    id: "m6",
    name: "Gerard Evenden",
    fallback: "GE",
    role: "Senior Partner & Architect",
    department: "Architecture",
    email: "gerard@fosterandpartners.com",
    status: "offline",
    utilization: 60,
    location: "London, UK",
    joined: "2021-06-15"
  },
  {
    id: "m7",
    name: "Mouzhan Majidi",
    fallback: "MM",
    role: "Partner & Director",
    department: "Operations",
    email: "mouzhan@fosterandpartners.com",
    status: "busy",
    utilization: 85,
    location: "Hong Kong",
    joined: "2021-09-01"
  },
  {
    id: "m8",
    name: "Laura Chen",
    fallback: "LC",
    role: "Associate Partner",
    department: "Architecture",
    email: "laura.chen@fosterandpartners.com",
    status: "online",
    utilization: 100,
    location: "Singapore",
    joined: "2022-02-15"
  },
  {
    id: "m9",
    name: "Marcus Williams",
    fallback: "MW",
    role: "Senior Interior Designer",
    department: "Design",
    email: "marcus.w@fosterandpartners.com",
    status: "away",
    utilization: 70,
    location: "London, UK",
    joined: "2022-04-10"
  },
  {
    id: "m10",
    name: "Sofia Rossi",
    fallback: "SR",
    role: "Senior Project Manager",
    department: "Project Management",
    email: "sofia.r@fosterandpartners.com",
    status: "online",
    utilization: 90,
    location: "Milan, Italy",
    joined: "2022-07-22"
  },
  {
    id: "m11",
    name: "James Okoye",
    fallback: "JO",
    role: "Computational Designer",
    department: "Architecture",
    email: "james.o@fosterandpartners.com",
    status: "online",
    utilization: 50,
    location: "London, UK",
    joined: "2023-01-15"
  },
  {
    id: "m12",
    name: "Aiko Tanaka",
    fallback: "AT",
    role: "Visualisation Artist",
    department: "Design",
    email: "aiko.t@fosterandpartners.com",
    status: "offline",
    utilization: 80,
    location: "Tokyo, Japan",
    joined: "2023-05-18"
  },
  {
    id: "m13",
    name: "Priya Sharma",
    fallback: "PS",
    role: "Financial Controller",
    department: "Finance",
    email: "priya.s@fosterandpartners.com",
    status: "online",
    utilization: 40,
    location: "London, UK",
    joined: "2023-08-01"
  },
  {
    id: "m14",
    name: "Oliver Bennett",
    fallback: "OB",
    role: "HR Director",
    department: "Operations",
    email: "oliver.b@fosterandpartners.com",
    status: "busy",
    utilization: 65,
    location: "London, UK",
    joined: "2023-11-20"
  },
  {
    id: "m15",
    name: "Emma Dubois",
    fallback: "ED",
    role: "Junior Architect",
    department: "Architecture",
    email: "emma.d@fosterandpartners.com",
    status: "online",
    utilization: 100,
    location: "Paris, France",
    joined: "2024-03-01"
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

export default function PeopleDirectoryPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [activeDept, setActiveDept] = useState<string>("All");
  const [search, setSearch] = useState<string>("");

  const filteredMembers = TEAM_MEMBERS.filter((member) => {
    const matchesDept = activeDept === "All" || member.department === activeDept;
    const matchesSearch =
      member.name.toLowerCase().includes(search.toLowerCase()) ||
      member.role.toLowerCase().includes(search.toLowerCase()) ||
      member.email.toLowerCase().includes(search.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const getUtilBarColor = (util: number) => {
    if (util >= 90) return "error"; // Over-utilized
    if (util >= 75) return "default"; // Highly utilized
    if (util >= 50) return "success"; // Perfectly balanced
    return "warning"; // Under-utilized
  };

  const getUtilBadgeVariant = (util: number) => {
    if (util >= 90) return "error";
    if (util >= 75) return "primary";
    if (util >= 50) return "success";
    return "warning";
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-[var(--text-primary)]">Team Directory</h1>
          <p className="text-sm text-[var(--text-secondary)]">
            Overview of company resources, utilization statistics, and active allocations.
          </p>
        </div>
        <Button className="w-full md:w-auto self-start flex items-center gap-2">
          <Plus size={16} />
          Invite Associate
        </Button>
      </div>

      {/* Filters and View Controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-[var(--surface)] border border-[var(--border)] p-4 rounded-xl">
        <div className="flex flex-wrap items-center gap-2">
          {DEPARTMENTS.map((dept) => (
            <button
              key={dept}
              onClick={() => setActiveDept(dept)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
                activeDept === dept
                  ? "bg-[var(--accent-2)]/15 text-[var(--accent-2)] border border-[var(--accent-2)]/25"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] border border-transparent"
              )}
            >
              {dept}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-64">
            <Input
              placeholder="Search members..."
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
          </div>
        </div>
      </div>

      {/* Dynamic Directory Views */}
      <AnimatePresence mode="wait">
        {filteredMembers.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center bg-[var(--surface)] border border-[var(--border)] rounded-xl"
          >
            <Users className="text-[var(--text-tertiary)] mb-4" size={48} />
            <h3 className="text-lg font-medium text-[var(--text-primary)]">No members found</h3>
            <p className="text-sm text-[var(--text-secondary)] max-w-sm mt-1">
              We couldn't find any team members matching your search.
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
            {filteredMembers.map((member) => (
              <motion.div key={member.id} variants={itemVariants}>
                <Card className="p-5 flex flex-col justify-between h-[280px]" hover>
                  <div className="flex items-start justify-between">
                    <Avatar
                      fallback={member.fallback}
                      size="xl"
                      status={member.status as any}
                    />
                    <Badge variant={getUtilBadgeVariant(member.utilization)} size="sm">
                      {member.utilization}% Allocated
                    </Badge>
                  </div>

                  <div className="space-y-1 mt-4">
                    <h3 className="text-base font-semibold text-[var(--text-primary)] line-clamp-1">
                      {member.name}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] line-clamp-1 flex items-center gap-1">
                      <Briefcase size={12} className="text-[var(--text-tertiary)]" />
                      {member.role}
                    </p>
                    <p className="text-[10px] text-[var(--text-tertiary)] uppercase font-semibold">
                      {member.department}
                    </p>
                  </div>

                  <div className="space-y-3 mt-4">
                    {/* Capacity Indicator */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-[var(--text-tertiary)] font-medium">
                        <span>FTE Utilization</span>
                        <span>{member.utilization}%</span>
                      </div>
                      <ProgressBar value={member.utilization} size="sm" variant={getUtilBarColor(member.utilization)} />
                    </div>

                    <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--text-secondary)]">
                      <span className="flex items-center gap-1 truncate max-w-[130px]">
                        <Mail size={12} className="text-[var(--text-tertiary)]" />
                        {member.email}
                      </span>
                      <span className="flex items-center gap-0.5 text-[10px] text-[var(--text-tertiary)] shrink-0">
                        <MapPin size={11} />
                        {member.location}
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
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
                  <th className="p-4 font-medium">Name & Role</th>
                  <th className="p-4 font-medium">Department</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Email</th>
                  <th className="p-4 font-medium">Capacity / Utilization</th>
                  <th className="p-4 font-medium">Location</th>
                  <th className="p-4 font-medium">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)] text-sm text-[var(--text-primary)]">
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-[var(--surface-hover)]/40 transition-colors">
                    <td className="p-4 font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar fallback={member.fallback} size="sm" status={member.status as any} />
                        <div>
                          <div className="font-semibold">{member.name}</div>
                          <div className="text-xs text-[var(--text-tertiary)]">{member.role}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-[var(--text-secondary)]">{member.department}</td>
                    <td className="p-4">
                      <Badge
                        variant={
                          member.status === "online"
                            ? "success"
                            : member.status === "busy"
                            ? "error"
                            : member.status === "away"
                            ? "warning"
                            : "default"
                        }
                        size="sm"
                      >
                        {member.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-[var(--text-secondary)] text-xs">{member.email}</td>
                    <td className="p-4 w-44">
                      <div className="flex items-center gap-2">
                        <ProgressBar value={member.utilization} className="flex-1" size="sm" variant={getUtilBarColor(member.utilization)} />
                        <span className="text-xs font-semibold tabular-nums text-[var(--text-secondary)]">
                          {member.utilization}%
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-xs text-[var(--text-secondary)]">{member.location}</td>
                    <td className="p-4 text-xs text-[var(--text-tertiary)] tabular-nums">{member.joined}</td>
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
