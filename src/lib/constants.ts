// NEXUS OS — Constants and Configuration

export const APP_NAME = "DNAX.ai Os";
export const APP_TAGLINE = "Command. Create. Conquer.";
export const APP_VERSION = "5.02.3";

// Role hierarchy - ordered by power level (highest first)
export const ROLES = {
  CEO: "ceo",
  CTO: "cto",
  CFO: "cfo",
  DIRECTOR: "director",
  MANAGER: "manager",
  SENIOR_LEAD: "senior_lead",
  LEAD: "lead",
  MEMBER: "member",
  VIEWER: "viewer",
  CLIENT: "client",
  CONTRACTOR: "contractor",
  AI_AGENT: "ai_agent",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

// Permission keys
export const PERMISSIONS = {
  // Projects
  "projects:create": [ROLES.CEO, ROLES.CTO, ROLES.DIRECTOR, ROLES.MANAGER, ROLES.SENIOR_LEAD, ROLES.LEAD],
  "projects:read": [ROLES.CEO, ROLES.CTO, ROLES.CFO, ROLES.DIRECTOR, ROLES.MANAGER, ROLES.SENIOR_LEAD, ROLES.LEAD, ROLES.MEMBER, ROLES.VIEWER, ROLES.CLIENT, ROLES.CONTRACTOR],
  "projects:update": [ROLES.CEO, ROLES.CTO, ROLES.DIRECTOR, ROLES.MANAGER, ROLES.SENIOR_LEAD, ROLES.LEAD],
  "projects:delete": [ROLES.CEO, ROLES.CTO, ROLES.DIRECTOR],
  "projects:archive": [ROLES.CEO, ROLES.CTO, ROLES.DIRECTOR, ROLES.MANAGER],

  // Users
  "users:invite": [ROLES.CEO, ROLES.CTO, ROLES.DIRECTOR, ROLES.MANAGER],
  "users:manage": [ROLES.CEO, ROLES.CTO, ROLES.DIRECTOR],
  "users:remove": [ROLES.CEO, ROLES.CTO, ROLES.DIRECTOR],
  "users:view": [ROLES.CEO, ROLES.CTO, ROLES.CFO, ROLES.DIRECTOR, ROLES.MANAGER, ROLES.SENIOR_LEAD, ROLES.LEAD, ROLES.MEMBER],

  // Financials
  "financials:view": [ROLES.CEO, ROLES.CFO, ROLES.DIRECTOR],
  "financials:manage": [ROLES.CEO, ROLES.CFO],
  "financials:invoices": [ROLES.CEO, ROLES.CFO, ROLES.DIRECTOR],

  // AI
  "ai:use": [ROLES.CEO, ROLES.CTO, ROLES.CFO, ROLES.DIRECTOR, ROLES.MANAGER, ROLES.SENIOR_LEAD, ROLES.LEAD, ROLES.MEMBER],
  "ai:configure": [ROLES.CEO, ROLES.CTO, ROLES.DIRECTOR],
  "ai:agents": [ROLES.CEO, ROLES.CTO, ROLES.DIRECTOR, ROLES.MANAGER],

  // Billing
  "billing:view": [ROLES.CEO, ROLES.CFO],
  "billing:manage": [ROLES.CEO, ROLES.CFO],

  // Reports
  "reports:view": [ROLES.CEO, ROLES.CTO, ROLES.CFO, ROLES.DIRECTOR, ROLES.MANAGER, ROLES.SENIOR_LEAD],
  "reports:export": [ROLES.CEO, ROLES.CTO, ROLES.CFO, ROLES.DIRECTOR, ROLES.MANAGER],
  "reports:create": [ROLES.CEO, ROLES.CTO, ROLES.CFO, ROLES.DIRECTOR],

  // Assets
  "assets:upload": [ROLES.CEO, ROLES.CTO, ROLES.DIRECTOR, ROLES.MANAGER, ROLES.SENIOR_LEAD, ROLES.LEAD, ROLES.MEMBER, ROLES.CONTRACTOR],
  "assets:delete": [ROLES.CEO, ROLES.CTO, ROLES.DIRECTOR, ROLES.MANAGER],
  "assets:approve": [ROLES.CEO, ROLES.CTO, ROLES.DIRECTOR, ROLES.MANAGER, ROLES.SENIOR_LEAD],

  // Settings
  "settings:org": [ROLES.CEO, ROLES.CTO, ROLES.DIRECTOR],
  "settings:integrations": [ROLES.CEO, ROLES.CTO],
  "settings:security": [ROLES.CEO, ROLES.CTO],

  // Admin
  "admin:access": [ROLES.CEO],
  "admin:impersonate": [ROLES.CEO],

  // Communications
  "comms:broadcast": [ROLES.CEO, ROLES.CTO, ROLES.CFO, ROLES.DIRECTOR],
  "comms:channels:create": [ROLES.CEO, ROLES.CTO, ROLES.DIRECTOR, ROLES.MANAGER, ROLES.SENIOR_LEAD, ROLES.LEAD],
  "comms:channels:delete": [ROLES.CEO, ROLES.CTO, ROLES.DIRECTOR],

  // Clients
  "clients:create": [ROLES.CEO, ROLES.CTO, ROLES.CFO, ROLES.DIRECTOR, ROLES.MANAGER, ROLES.SENIOR_LEAD],
  "clients:manage": [ROLES.CEO, ROLES.CTO, ROLES.CFO, ROLES.DIRECTOR, ROLES.MANAGER],
  "clients:delete": [ROLES.CEO, ROLES.CTO, ROLES.DIRECTOR],

  // HR
  "hr:view": [ROLES.CEO, ROLES.CTO, ROLES.CFO, ROLES.DIRECTOR, ROLES.MANAGER],
  "hr:manage": [ROLES.CEO, ROLES.CTO, ROLES.DIRECTOR],
  "hr:salary": [ROLES.CEO, ROLES.CFO],
} as const;

export type PermissionKey = keyof typeof PERMISSIONS;

// Check if a role has a specific permission
export function hasPermission(role: Role, permission: PermissionKey): boolean {
  const allowedRoles = PERMISSIONS[permission];
  return (allowedRoles as readonly string[]).includes(role);
}

// Navigation items
export const NAV_ITEMS = [
  {
    group: "Command",
    items: [
      { name: "Dashboard", href: "/", icon: "LayoutDashboard" as const, permission: null },
      { name: "Command Center", href: "/command", icon: "Radar" as const, permission: null },
    ],
  },
  {
    group: "Projects",
    items: [
      { name: "All Projects", href: "/projects", icon: "FolderKanban" as const, permission: "projects:read" as PermissionKey },
      { name: "Tasks", href: "/tasks", icon: "CheckSquare" as const, permission: "projects:read" as PermissionKey },
      { name: "Calendar", href: "/calendar", icon: "Calendar" as const, permission: null },
      { name: "Documents", href: "/documents", icon: "FileText" as const, permission: null },
    ],
  },
  {
    group: "People",
    items: [
      { name: "Team", href: "/people", icon: "Users" as const, permission: "users:view" as PermissionKey },
      { name: "Clients", href: "/clients", icon: "Building2" as const, permission: "clients:create" as PermissionKey },
      { name: "Org Chart", href: "/org-chart", icon: "Network" as const, permission: "users:view" as PermissionKey },
    ],
  },
  {
    group: "Assets",
    items: [
      { name: "Asset Library", href: "/assets", icon: "Image" as const, permission: null },
      { name: "Knowledge Base", href: "/knowledge", icon: "BookOpen" as const, permission: null },
      { name: "Brand Kit", href: "/brand", icon: "Palette" as const, permission: null },
    ],
  },
  {
    group: "Finance",
    items: [
      { name: "Overview", href: "/finance", icon: "BarChart3" as const, permission: "financials:view" as PermissionKey },
      { name: "Invoices", href: "/finance/invoices", icon: "Receipt" as const, permission: "financials:invoices" as PermissionKey },
      { name: "Reports", href: "/finance/reports", icon: "PieChart" as const, permission: "reports:view" as PermissionKey },
    ],
  },
  {
    group: "Intelligence",
    items: [
      { name: "DNAX.ai Mind", href: "/ai", icon: "Brain" as const, permission: "ai:use" as PermissionKey },
      { name: "AI Agents", href: "/ai/agents", icon: "Bot" as const, permission: "ai:agents" as PermissionKey },
      { name: "Search", href: "/search", icon: "Search" as const, permission: null },
    ],
  },
  {
    group: "Settings",
    items: [
      { name: "Workspace", href: "/settings", icon: "Settings" as const, permission: null },
      { name: "Integrations", href: "/settings/integrations", icon: "Plug" as const, permission: "settings:integrations" as PermissionKey },
    ],
  },
] as const;

// Project phases for architecture/design workflows
export const PROJECT_PHASES = [
  "Concept",
  "Schematic Design",
  "Design Development",
  "Documentation",
  "Construction",
  "Handover",
] as const;

// Project statuses
export const PROJECT_STATUSES = [
  { value: "DRAFT", label: "Draft", color: "var(--text-tertiary)" },
  { value: "ACTIVE", label: "Active", color: "var(--success)" },
  { value: "ON_HOLD", label: "On Hold", color: "var(--warning)" },
  { value: "COMPLETED", label: "Completed", color: "var(--accent-2)" },
  { value: "ARCHIVED", label: "Archived", color: "var(--text-tertiary)" },
] as const;

// Task statuses
export const TASK_STATUSES = [
  { value: "TODO", label: "To Do", color: "var(--text-tertiary)" },
  { value: "IN_PROGRESS", label: "In Progress", color: "var(--accent-2)" },
  { value: "IN_REVIEW", label: "In Review", color: "var(--warning)" },
  { value: "DONE", label: "Done", color: "var(--success)" },
  { value: "CANCELLED", label: "Cancelled", color: "var(--error)" },
] as const;

// Priority levels
export const PRIORITIES = [
  { value: "LOW", label: "Low", color: "var(--text-tertiary)" },
  { value: "MEDIUM", label: "Medium", color: "var(--info)" },
  { value: "HIGH", label: "High", color: "var(--warning)" },
  { value: "URGENT", label: "Urgent", color: "var(--error)" },
] as const;

// Plan tiers
export const PLANS = [
  { value: "FREE", label: "Free", price: 0, maxUsers: 5, maxProjects: 3 },
  { value: "STARTER", label: "Starter", price: 29, maxUsers: 15, maxProjects: 20 },
  { value: "PROFESSIONAL", label: "Professional", price: 79, maxUsers: 50, maxProjects: -1 },
  { value: "ENTERPRISE", label: "Enterprise", price: -1, maxUsers: -1, maxProjects: -1 },
] as const;
