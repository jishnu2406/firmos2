"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Bell,
  CheckCheck,
  FolderKanban,
  Users,
  Brain,
  AlertTriangle,
  MessageSquare,
  FileText,
  Clock,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { Button, Avatar, Badge, cn } from "@/components/ui";

interface NotificationItem {
  id: string;
  type: "project" | "team" | "ai" | "alert" | "message" | "system";
  title: string;
  description: string;
  time: string;
  read: boolean;
  avatar?: string;
  avatarFallback?: string;
}

const DEMO_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "1",
    type: "ai",
    title: "NEXUS Mind",
    description: "Weekly progress report for Sky Tower has been generated and is ready for review.",
    time: "2 min ago",
    read: false,
  },
  {
    id: "2",
    type: "project",
    title: "Budget Alert",
    description: "Marina Bay Residences has reached 85% of allocated budget.",
    time: "15 min ago",
    read: false,
    avatarFallback: "MR",
  },
  {
    id: "3",
    type: "message",
    title: "Sarah Mitchell",
    description: "Left a comment on the Heritage Museum design review.",
    time: "1 hour ago",
    read: false,
    avatarFallback: "SM",
  },
  {
    id: "4",
    type: "team",
    title: "Team Update",
    description: "James Wong has been assigned to the Skyline Tower project.",
    time: "2 hours ago",
    read: true,
    avatarFallback: "JW",
  },
  {
    id: "5",
    type: "alert",
    title: "Deadline Approaching",
    description: "Design Development phase for Urban Park ends in 3 days.",
    time: "3 hours ago",
    read: true,
  },
  {
    id: "6",
    type: "system",
    title: "System Update",
    description: "NEXUS OS has been updated to version 2.4.0 with new AI features.",
    time: "1 day ago",
    read: true,
  },
];

const typeIcons: Record<string, React.ReactNode> = {
  project: <FolderKanban size={14} />,
  team: <Users size={14} />,
  ai: <Brain size={14} />,
  alert: <AlertTriangle size={14} />,
  message: <MessageSquare size={14} />,
  system: <FileText size={14} />,
};

const typeColors: Record<string, string> = {
  project: "text-[var(--accent-2)]",
  team: "text-[var(--info)]",
  ai: "text-purple-400",
  alert: "text-[var(--warning)]",
  message: "text-[var(--success)]",
  system: "text-[var(--text-tertiary)]",
};

export const NotificationCenter: React.FC = () => {
  const { notificationPanelOpen, setNotificationPanelOpen } = useAppStore();

  return (
    <AnimatePresence>
      {notificationPanelOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setNotificationPanelOpen(false)}
          />

          {/* Panel */}
          <motion.div
            className="fixed top-0 right-0 z-50 h-screen w-[380px] max-w-[90vw] border-l border-[var(--border)] flex flex-col"
            style={{
              backgroundColor: "var(--surface)",
            }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 h-14 border-b border-[var(--border)] shrink-0">
              <div className="flex items-center gap-2">
                <Bell size={16} className="text-[var(--text-primary)]" />
                <h2 className="text-sm font-semibold text-[var(--text-primary)]">
                  Notifications
                </h2>
                <Badge variant="primary" size="sm">
                  {DEMO_NOTIFICATIONS.filter((n) => !n.read).length} new
                </Badge>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon-sm" title="Mark all read">
                  <CheckCheck size={14} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setNotificationPanelOpen(false)}
                >
                  <X size={14} />
                </Button>
              </div>
            </div>

            {/* Filter tabs */}
            <div className="flex items-center gap-1 px-4 py-2 border-b border-[var(--border)] shrink-0">
              {["All", "Unread", "AI", "Projects", "Team"].map((tab) => (
                <button
                  key={tab}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                    tab === "All"
                      ? "bg-[var(--accent-2)]/10 text-[var(--accent-2)]"
                      : "text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Notification list */}
            <div className="flex-1 overflow-y-auto">
              {DEMO_NOTIFICATIONS.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    "flex gap-3 px-5 py-3.5 border-b border-[var(--border)]/50 cursor-pointer transition-colors hover:bg-[var(--surface-hover)]",
                    !notification.read && "bg-[var(--accent-2)]/[0.03]"
                  )}
                >
                  {/* Icon or avatar */}
                  <div className="shrink-0 mt-0.5">
                    {notification.avatarFallback ? (
                      <Avatar
                        fallback={notification.avatarFallback}
                        size="sm"
                      />
                    ) : (
                      <div
                        className={cn(
                          "h-8 w-8 rounded-full flex items-center justify-center bg-[var(--surface-hover)]",
                          typeColors[notification.type]
                        )}
                      >
                        {typeIcons[notification.type]}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p
                        className={cn(
                          "text-sm font-medium truncate",
                          !notification.read
                            ? "text-[var(--text-primary)]"
                            : "text-[var(--text-secondary)]"
                        )}
                      >
                        {notification.title}
                      </p>
                      {!notification.read && (
                        <span className="h-2 w-2 rounded-full bg-[var(--accent-2)] shrink-0 mt-1.5" />
                      )}
                    </div>
                    <p className="text-xs text-[var(--text-tertiary)] mt-0.5 line-clamp-2">
                      {notification.description}
                    </p>
                    <p className="text-[10px] text-[var(--text-tertiary)] mt-1 flex items-center gap-1">
                      <Clock size={10} />
                      {notification.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-[var(--border)] shrink-0">
              <Button variant="ghost" size="sm" className="w-full">
                View All Notifications
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationCenter;
