// ============================================================================
// NEXUS OS — Comprehensive Seed Data
// ============================================================================
// Creates a realistic demo environment for "Foster & Partners" architecture firm
// with 15 users, 8 projects, 5 clients, tasks, milestones, assets, invoices,
// AI conversations, channels, messages, and more.
// ============================================================================

import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

// Fix seed for reproducible data
faker.seed(42);

// ============================================================================
// Helper functions
// ============================================================================

function cuid(): string {
  return faker.string.alphanumeric(25);
}

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomSubset<T>(arr: T[], min: number, max: number): T[] {
  const count = faker.number.int({ min, max: Math.min(max, arr.length) });
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function daysFromNow(days: number): Date {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d;
}

function daysAgo(days: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d;
}

// ============================================================================
// Data definitions
// ============================================================================

const ORG_ROLES = [
  "OWNER",
  "ADMIN",
  "PRINCIPAL",
  "DIRECTOR",
  "SENIOR_ARCHITECT",
  "ARCHITECT",
  "DESIGNER",
  "PROJECT_MANAGER",
  "INTERN",
  "FINANCE",
  "HR",
  "MEMBER",
] as const;

const USER_PROFILES = [
  { name: "Norman Foster",        email: "norman.foster@fosterpartners.com",    role: "OWNER",            title: "Founder & Chairman",         department: "Executive" },
  { name: "Luke Fox",             email: "luke.fox@fosterpartners.com",         role: "PRINCIPAL",        title: "Head of Studio",             department: "Design" },
  { name: "Spencer de Grey",      email: "spencer.degrey@fosterpartners.com",   role: "DIRECTOR",         title: "Senior Executive Partner",   department: "Design" },
  { name: "David Nelson",         email: "david.nelson@fosterpartners.com",     role: "DIRECTOR",         title: "Head of Design",             department: "Design" },
  { name: "Narinder Sagoo",       email: "narinder.sagoo@fosterpartners.com",   role: "SENIOR_ARCHITECT", title: "Senior Partner",             department: "Architecture" },
  { name: "Gerard Evenden",       email: "gerard.evenden@fosterpartners.com",   role: "SENIOR_ARCHITECT", title: "Senior Partner",             department: "Architecture" },
  { name: "Mouzhan Majidi",       email: "mouzhan.majidi@fosterpartners.com",   role: "ADMIN",            title: "Chief Executive",            department: "Executive" },
  { name: "Laura Chen",           email: "laura.chen@fosterpartners.com",       role: "ARCHITECT",        title: "Associate Architect",        department: "Architecture" },
  { name: "Marcus Williams",      email: "marcus.williams@fosterpartners.com",  role: "DESIGNER",         title: "Senior Interior Designer",   department: "Interiors" },
  { name: "Sofia Rossi",          email: "sofia.rossi@fosterpartners.com",      role: "PROJECT_MANAGER",  title: "Senior Project Manager",     department: "Project Management" },
  { name: "James Okoye",          email: "james.okoye@fosterpartners.com",      role: "ARCHITECT",        title: "Junior Architect",           department: "Architecture" },
  { name: "Aiko Tanaka",          email: "aiko.tanaka@fosterpartners.com",      role: "DESIGNER",         title: "Computational Designer",     department: "Technology" },
  { name: "Priya Sharma",         email: "priya.sharma@fosterpartners.com",     role: "FINANCE",          title: "Financial Controller",       department: "Finance" },
  { name: "Oliver Bennett",       email: "oliver.bennett@fosterpartners.com",   role: "HR",               title: "HR Manager",                 department: "Human Resources" },
  { name: "Emma Dubois",          email: "emma.dubois@fosterpartners.com",      role: "INTERN",           title: "Architecture Intern",        department: "Architecture" },
];

const CLIENT_DATA = [
  {
    name: "Emaar Properties",
    email: "projects@emaar.com",
    phone: "+971 4 367 3333",
    company: "Emaar Properties PJSC",
    industry: "Real Estate Development",
    website: "https://www.emaar.com",
    address: "Emaar Square, Building 1, Sheikh Zayed Road, Dubai, UAE",
  },
  {
    name: "Apple Inc.",
    email: "corporate.real.estate@apple.com",
    phone: "+1 408 996 1010",
    company: "Apple Inc.",
    industry: "Technology",
    website: "https://www.apple.com",
    address: "One Apple Park Way, Cupertino, CA 95014, USA",
  },
  {
    name: "Bloomberg LP",
    email: "facilities@bloomberg.net",
    phone: "+1 212 318 2000",
    company: "Bloomberg LP",
    industry: "Financial Services",
    website: "https://www.bloomberg.com",
    address: "731 Lexington Avenue, New York, NY 10022, USA",
  },
  {
    name: "NEOM Company",
    email: "development@neom.com",
    phone: "+966 11 555 0000",
    company: "NEOM Company",
    industry: "Urban Development",
    website: "https://www.neom.com",
    address: "NEOM, Tabuk Province, Saudi Arabia",
  },
  {
    name: "The Battersea Power Station Dev Co",
    email: "planning@bpsdc.co.uk",
    phone: "+44 20 7501 0688",
    company: "Battersea Power Station Development Company",
    industry: "Mixed-Use Development",
    website: "https://batterseapowerstation.co.uk",
    address: "188 Kirtling Street, London, SW8 5BN, UK",
  },
];

const PROJECT_DATA = [
  {
    name: "Dubai Creek Tower",
    slug: "dubai-creek-tower",
    description: "An iconic observation tower and cultural landmark at Dubai Creek Harbour. The tower is designed to be the world's tallest structure, featuring a slender, cable-stayed form inspired by the lily flower. The design integrates a series of observation gardens at multiple levels with rotating balconies offering panoramic views.",
    type: "ARCHITECTURE",
    status: "ACTIVE",
    priority: "HIGH",
    budget: 1500000000,
    actualCost: 890000000,
    location: "Dubai Creek Harbour, Dubai, UAE",
    latitude: 25.2048,
    longitude: 55.3447,
    clientIdx: 0, // Emaar
  },
  {
    name: "Apple Park Visitor Center Expansion",
    slug: "apple-park-visitor-expansion",
    description: "Extension of the Apple Park Visitor Center to include new exhibition spaces, an expanded Apple Store, and landscaped rooftop terraces. The design maintains the seamless glass-and-stone aesthetic of the original campus while incorporating sustainable materials.",
    type: "ARCHITECTURE",
    status: "ACTIVE",
    priority: "URGENT",
    budget: 250000000,
    actualCost: 120000000,
    location: "Cupertino, California, USA",
    latitude: 37.3349,
    longitude: -122.0090,
    clientIdx: 1, // Apple
  },
  {
    name: "Bloomberg European HQ Interior Refresh",
    slug: "bloomberg-eu-hq-refresh",
    description: "Comprehensive interior renovation of Bloomberg's European headquarters in London. Scope includes 4 floors of open-plan workspaces, the pantry and dining spaces, executive floors, and the Bloomberg Arcade public thoroughfare refresh.",
    type: "INTERIOR_FITOUT",
    status: "ON_HOLD",
    priority: "MEDIUM",
    budget: 85000000,
    actualCost: 12000000,
    location: "3 Queen Victoria Street, London, UK",
    latitude: 51.5118,
    longitude: -0.0893,
    clientIdx: 2, // Bloomberg
  },
  {
    name: "NEOM Industrial City Master Plan",
    slug: "neom-industrial-master-plan",
    description: "Master planning for the sustainable industrial zone within NEOM's mega-project. Includes logistics hub, manufacturing clusters, renewable energy infrastructure, desalination plants, and a research campus. Targeting LEED Platinum and zero-carbon operation by 2035.",
    type: "CONCEPT",
    status: "DRAFT",
    priority: "HIGH",
    budget: 4500000000,
    actualCost: 0,
    location: "Tabuk Province, Saudi Arabia",
    latitude: 27.9500,
    longitude: 35.2833,
    clientIdx: 3, // NEOM
  },
  {
    name: "Battersea Power Station Phase 4",
    slug: "battersea-phase-4",
    description: "The final phase of the Battersea Power Station redevelopment, delivering mixed-use commercial spaces, residential apartments, a hotel, wellness centre, and extensive landscaped public realm along the Thames riverfront.",
    type: "ARCHITECTURE",
    status: "COMPLETED",
    priority: "MEDIUM",
    budget: 900000000,
    actualCost: 875000000,
    location: "Battersea, London, UK",
    latitude: 51.4813,
    longitude: -0.1477,
    clientIdx: 4, // Battersea
  },
  {
    name: "Foster + Partners Brand Refresh",
    slug: "brand-refresh-2026",
    description: "Internal brand identity refresh for Foster + Partners. Includes updated visual identity system, digital brand guidelines, website redesign concepts, publication templates, and signage design for all global offices.",
    type: "BRAND_IDENTITY",
    status: "ACTIVE",
    priority: "LOW",
    budget: 500000,
    actualCost: 210000,
    location: "Riverside, 22 Hester Road, London",
    latitude: 51.4761,
    longitude: -0.1690,
    clientIdx: -1, // Internal
  },
  {
    name: "Lusail Stadium Post-Event Retrofit",
    slug: "lusail-stadium-retrofit",
    description: "Post-FIFA World Cup retrofit study and tender documentation for the Lusail Iconic Stadium. Scope includes conversion of temporary seating, commercial fit-out of modular community facilities, and sustainable landscape integration.",
    type: "TENDER",
    status: "ARCHIVED",
    priority: "LOW",
    budget: 120000000,
    actualCost: 3500000,
    location: "Lusail, Qatar",
    latitude: 25.4195,
    longitude: 51.4906,
    clientIdx: -1,
  },
  {
    name: "Sustainable Tall Building Research",
    slug: "sustainable-tall-building-research",
    description: "An internal R&D project exploring next-generation structural systems, bioclimatic facades, embodied carbon reduction strategies, and mass-timber high-rise feasibility for buildings above 40 storeys.",
    type: "RESEARCH",
    status: "ACTIVE",
    priority: "MEDIUM",
    budget: 2000000,
    actualCost: 850000,
    location: "London, UK",
    latitude: 51.4761,
    longitude: -0.1690,
    clientIdx: -1,
  },
];

const PHASE_TEMPLATES: Record<string, string[]> = {
  ARCHITECTURE: ["Concept Design", "Schematic Design", "Design Development", "Construction Documents", "Bidding & Negotiation", "Construction Administration"],
  INTERIOR_FITOUT: ["Space Planning", "Concept Design", "Design Development", "Documentation", "Procurement", "Installation"],
  BRAND_IDENTITY: ["Research & Discovery", "Concept Development", "Design Refinement", "Guidelines & Rollout"],
  CONCEPT: ["Site Analysis", "Feasibility Study", "Concept Framework", "Master Plan Draft", "Stakeholder Review"],
  TENDER: ["Brief Analysis", "Technical Specification", "Cost Estimation", "Submission Preparation"],
  RESEARCH: ["Literature Review", "Hypothesis & Methodology", "Analysis & Testing", "Findings & Publication"],
  PRODUCTION: ["Pre-Production", "Production", "Post-Production", "Delivery"],
};

const TASK_TEMPLATES = [
  "Review architectural drawings",
  "Prepare site analysis report",
  "Update BIM model with structural changes",
  "Create material palette presentation",
  "Coordinate with MEP consultants",
  "Develop facade detail drawings",
  "Prepare client presentation deck",
  "Review building code compliance",
  "Update project timeline",
  "Conduct environmental impact assessment",
  "Design landscape masterplan",
  "Prepare construction cost estimate",
  "Review structural engineering calcs",
  "Create 3D visualization renders",
  "Document design intent specifications",
  "Coordinate with planning authority",
  "Prepare sustainability report (LEED/BREEAM)",
  "Review fire safety strategy",
  "Update specification schedule",
  "Prepare tender documentation package",
  "Review contractor submittals",
  "Conduct site visit and photo documentation",
  "Design wayfinding and signage system",
  "Prepare lighting design concept",
  "Review acoustic performance requirements",
  "Create furniture layout options",
  "Prepare FF&E budget breakdown",
  "Design reception and lobby areas",
  "Review accessibility compliance (ADA/DDA)",
  "Create phasing and logistics plan",
];

const AI_AGENT_TYPES = [
  { name: "Design Reviewer",      type: "DESIGN_REVIEW",     description: "Analyses architectural drawings for code compliance, buildability issues, and design consistency." },
  { name: "Cost Estimator",       type: "COST_ESTIMATE",     description: "Generates preliminary cost estimates from BIM models and specification documents." },
  { name: "Material Advisor",     type: "MATERIAL_SUGGEST",  description: "Suggests sustainable materials based on project requirements, climate, and budget constraints." },
  { name: "Schedule Optimizer",   type: "SCHEDULING",        description: "Optimizes project schedules by analyzing task dependencies and resource availability." },
  { name: "Weekly Reporter",      type: "REPORTING",         description: "Generates automated weekly progress reports from project data, time entries, and milestones." },
];

const CHANNEL_TEMPLATES = [
  { name: "general",          type: "GENERAL",    description: "Company-wide announcements and discussion" },
  { name: "design-reviews",   type: "DEPARTMENT", description: "Design team critique and review sessions" },
  { name: "tech-talk",        type: "DEPARTMENT", description: "Computational design and technology discussion" },
  { name: "random",           type: "GENERAL",    description: "Water cooler chat, memes, and off-topic banter" },
  { name: "leadership",       type: "GENERAL",    description: "Senior leadership team coordination", isPrivate: true },
];

// ============================================================================
// SEED MAIN
// ============================================================================

async function main() {
  console.log("🌱 Starting NEXUS OS seed...\n");

  // Clean existing data (order matters for FK constraints)
  console.log("🧹 Cleaning existing data...");
  await prisma.aIAgentRun.deleteMany();
  await prisma.aIAgent.deleteMany();
  await prisma.aIMessage.deleteMany();
  await prisma.aIConversation.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.leave.deleteMany();
  await prisma.message.deleteMany();
  await prisma.channelMember.deleteMany();
  await prisma.channel.deleteMany();
  await prisma.timeEntry.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.taskAttachment.deleteMany();
  await prisma.taskComment.deleteMany();
  await prisma.task.deleteMany();
  await prisma.asset.deleteMany();
  await prisma.projectMilestone.deleteMany();
  await prisma.projectMember.deleteMany();
  await prisma.projectPhase.deleteMany();
  await prisma.project.deleteMany();
  await prisma.clientContact.deleteMany();
  await prisma.client.deleteMany();
  await prisma.department.deleteMany();
  await prisma.organizationMember.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.organization.deleteMany();
  await prisma.user.deleteMany();

  // --------------------------------------------------------------------------
  // 1. Create Organization
  // --------------------------------------------------------------------------
  console.log("🏢 Creating organization...");
  const org = await prisma.organization.create({
    data: {
      name: "Foster + Partners",
      slug: "foster-partners",
      type: "ARCHITECTURE",
      plan: "ENTERPRISE",
      domain: "fosterpartners.com",
      logoUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/3/35/Foster_and_Partners_logo.svg/250px-Foster_and_Partners_logo.svg.png",
      brandColor: "#1a1a2e",
      settings: JSON.stringify({
        timezone: "Europe/London",
        dateFormat: "DD/MM/YYYY",
        currency: "GBP",
        language: "en",
        features: {
          aiAssistant: true,
          timeTracking: true,
          invoicing: true,
          clientPortal: true,
        },
      }),
      aiConfig: JSON.stringify({
        defaultModel: "gpt-4o",
        maxTokensPerDay: 500000,
        enabledAgents: ["DESIGN_REVIEW", "COST_ESTIMATE", "MATERIAL_SUGGEST", "SCHEDULING", "REPORTING"],
        customPromptPrefix: "You are an AI assistant for Foster + Partners, a world-renowned architecture firm. Provide expert-level architectural advice.",
      }),
    },
  });
  console.log(`   ✅ ${org.name} (${org.id})`);

  // --------------------------------------------------------------------------
  // 2. Create Users
  // --------------------------------------------------------------------------
  console.log("👥 Creating users...");
  const users = [];
  for (const profile of USER_PROFILES) {
    const user = await prisma.user.create({
      data: {
        email: profile.email,
        name: profile.name,
        passwordHash: "$2b$12$LJ3m4ys3Gz8KX3EZ.VxCDO7CYFnYZJHkd6wNSYfVfH5z0JG0TBGG", // "nexus2026!"
        image: `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(profile.name)}`,
        emailVerified: daysAgo(faker.number.int({ min: 30, max: 365 })),
        twoFactorEnabled: profile.role === "OWNER" || profile.role === "ADMIN",
        preferences: JSON.stringify({
          theme: randomFrom(["light", "dark", "system"]),
          notifications: { email: true, push: true, desktop: true },
          dashboardLayout: "default",
          language: "en",
        }),
      },
    });
    users.push(user);
    console.log(`   ✅ ${user.name} (${profile.role})`);
  }

  // --------------------------------------------------------------------------
  // 3. Create Organization Members
  // --------------------------------------------------------------------------
  console.log("🔗 Linking users to organization...");
  for (let i = 0; i < users.length; i++) {
    await prisma.organizationMember.create({
      data: {
        orgId: org.id,
        userId: users[i].id,
        role: USER_PROFILES[i].role,
        department: USER_PROFILES[i].department,
        title: USER_PROFILES[i].title,
        joinedAt: daysAgo(faker.number.int({ min: 30, max: 3650 })),
        isActive: true,
      },
    });
  }

  // --------------------------------------------------------------------------
  // 4. Create Departments
  // --------------------------------------------------------------------------
  console.log("🏛️  Creating departments...");
  const deptNames = ["Executive", "Design", "Architecture", "Interiors", "Technology", "Project Management", "Finance", "Human Resources"];
  const departments: any[] = [];
  for (const name of deptNames) {
    const headProfile = USER_PROFILES.find((p) => p.department === name);
    const headUser = headProfile ? users[USER_PROFILES.indexOf(headProfile)] : undefined;
    const dept = await prisma.department.create({
      data: {
        orgId: org.id,
        name,
        description: `${name} department at Foster + Partners`,
        headId: headUser?.id,
      },
    });
    departments.push(dept);
  }
  // Create sub-department hierarchy: Architecture -> Interiors, Technology
  const archDept = departments.find((d) => d.name === "Architecture");
  const intDept = departments.find((d) => d.name === "Interiors");
  const techDept = departments.find((d) => d.name === "Technology");
  if (archDept && intDept) {
    await prisma.department.update({ where: { id: intDept.id }, data: { parentId: archDept.id } });
  }
  if (archDept && techDept) {
    await prisma.department.update({ where: { id: techDept.id }, data: { parentId: archDept.id } });
  }

  // --------------------------------------------------------------------------
  // 5. Create Clients
  // --------------------------------------------------------------------------
  console.log("🤝 Creating clients...");
  const clients = [];
  for (const cd of CLIENT_DATA) {
    const client = await prisma.client.create({
      data: {
        orgId: org.id,
        name: cd.name,
        email: cd.email,
        phone: cd.phone,
        company: cd.company,
        industry: cd.industry,
        website: cd.website,
        address: cd.address,
        notes: faker.lorem.paragraph(),
        avatarUrl: `https://api.dicebear.com/8.x/identicon/svg?seed=${encodeURIComponent(cd.company)}`,
      },
    });
    clients.push(client);

    // Add 1-3 contacts per client
    const contactCount = faker.number.int({ min: 1, max: 3 });
    for (let c = 0; c < contactCount; c++) {
      await prisma.clientContact.create({
        data: {
          clientId: client.id,
          name: faker.person.fullName(),
          email: faker.internet.email({ provider: cd.website?.replace("https://www.", "") }),
          phone: faker.phone.number(),
          role: randomFrom(["CEO", "CFO", "Development Director", "Project Manager", "Head of Real Estate", "VP Facilities"]),
          isPrimary: c === 0,
        },
      });
    }
    console.log(`   ✅ ${client.name}`);
  }

  // --------------------------------------------------------------------------
  // 6. Create Projects
  // --------------------------------------------------------------------------
  console.log("📐 Creating projects...");
  const projects = [];
  for (const pd of PROJECT_DATA) {
    const project = await prisma.project.create({
      data: {
        orgId: org.id,
        name: pd.name,
        slug: pd.slug,
        description: pd.description,
        type: pd.type,
        status: pd.status,
        priority: pd.priority,
        budget: pd.budget,
        actualCost: pd.actualCost,
        startDate: daysAgo(faker.number.int({ min: 60, max: 720 })),
        endDate: pd.status === "COMPLETED" ? daysAgo(faker.number.int({ min: 1, max: 30 })) : daysFromNow(faker.number.int({ min: 90, max: 1800 })),
        clientId: pd.clientIdx >= 0 ? clients[pd.clientIdx].id : undefined,
        createdById: users[0].id, // Norman Foster
        location: pd.location,
        latitude: pd.latitude,
        longitude: pd.longitude,
        coverImageUrl: `https://picsum.photos/seed/${pd.slug}/1200/800`,
        settings: JSON.stringify({
          bimEnabled: true,
          renderEngine: "V-Ray",
          coordinateSystem: "WGS84",
          unitSystem: "metric",
        }),
      },
    });
    projects.push(project);
    console.log(`   ✅ ${project.name} (${pd.status})`);
  }

  // --------------------------------------------------------------------------
  // 7. Create Project Phases
  // --------------------------------------------------------------------------
  console.log("📊 Creating project phases...");
  const allPhases: any[] = [];
  for (const project of projects) {
    const pd = PROJECT_DATA[projects.indexOf(project)];
    const phaseNames = PHASE_TEMPLATES[pd.type] || PHASE_TEMPLATES.ARCHITECTURE;
    for (let i = 0; i < phaseNames.length; i++) {
      let phaseStatus = "NOT_STARTED";
      if (pd.status === "COMPLETED") {
        phaseStatus = "COMPLETED";
      } else if (pd.status === "ACTIVE") {
        if (i < phaseNames.length / 2) phaseStatus = "COMPLETED";
        else if (i === Math.floor(phaseNames.length / 2)) phaseStatus = "IN_PROGRESS";
      }
      const phase = await prisma.projectPhase.create({
        data: {
          projectId: project.id,
          name: phaseNames[i],
          order: i,
          status: phaseStatus,
          startDate: daysAgo(720 - i * 90),
          endDate: daysAgo(720 - (i + 1) * 90 + 90),
          description: `${phaseNames[i]} phase for ${project.name}`,
        },
      });
      allPhases.push({ ...phase, projectId: project.id });
    }
  }

  // --------------------------------------------------------------------------
  // 8. Create Project Members
  // --------------------------------------------------------------------------
  console.log("👷 Assigning project members...");
  for (const project of projects) {
    // Always add owner + 3-7 random team members
    const teamSize = faker.number.int({ min: 3, max: 7 });
    const teamMembers = randomSubset(users.slice(1), teamSize, teamSize);
    const allMembers = [users[0], ...teamMembers];
    const projectRoles = ["LEAD", "ARCHITECT", "ARCHITECT", "DESIGNER", "DESIGNER", "ENGINEER", "MEMBER", "MEMBER"];

    for (let i = 0; i < allMembers.length; i++) {
      await prisma.projectMember.create({
        data: {
          projectId: project.id,
          userId: allMembers[i].id,
          role: projectRoles[i] || "MEMBER",
          allocation: i === 0 ? 20 : faker.number.int({ min: 25, max: 100 }),
        },
      });
    }
  }

  // --------------------------------------------------------------------------
  // 9. Create Project Milestones
  // --------------------------------------------------------------------------
  console.log("🎯 Creating milestones...");
  const milestoneTemplates = [
    "Concept Design Approval",
    "Client Design Freeze",
    "Planning Permission Submitted",
    "Planning Approval Received",
    "Construction Start",
    "Structural Completion",
    "Practical Completion",
    "Final Handover",
  ];
  for (const project of projects) {
    const pd = PROJECT_DATA[projects.indexOf(project)];
    const milestoneCount = faker.number.int({ min: 3, max: 6 });
    for (let i = 0; i < milestoneCount; i++) {
      const isCompleted = pd.status === "COMPLETED" || (pd.status === "ACTIVE" && i < milestoneCount / 2);
      await prisma.projectMilestone.create({
        data: {
          projectId: project.id,
          name: milestoneTemplates[i % milestoneTemplates.length],
          description: faker.lorem.sentence(),
          dueDate: daysFromNow(faker.number.int({ min: -180, max: 360 })),
          completedAt: isCompleted ? daysAgo(faker.number.int({ min: 1, max: 180 })) : undefined,
          status: isCompleted ? "COMPLETED" : randomFrom(["PENDING", "IN_PROGRESS"]),
        },
      });
    }
  }

  // --------------------------------------------------------------------------
  // 10. Create Tasks
  // --------------------------------------------------------------------------
  console.log("✅ Creating tasks...");
  const allTasks: any[] = [];
  for (const project of projects) {
    const pd = PROJECT_DATA[projects.indexOf(project)];
    const projectPhases = allPhases.filter((p) => p.projectId === project.id);
    const taskCount = faker.number.int({ min: 8, max: 15 });

    for (let i = 0; i < taskCount; i++) {
      let taskStatus: string;
      if (pd.status === "COMPLETED") {
        taskStatus = "DONE";
      } else if (pd.status === "ARCHIVED") {
        taskStatus = randomFrom(["DONE", "CANCELLED"]);
      } else if (pd.status === "DRAFT") {
        taskStatus = "TODO";
      } else {
        taskStatus = randomFrom(["TODO", "IN_PROGRESS", "IN_REVIEW", "DONE", "TODO", "IN_PROGRESS"]);
      }

      const assignee = randomFrom(users);
      const creator = randomFrom(users.slice(0, 7)); // Senior staff create tasks
      const phase = projectPhases.length > 0 ? randomFrom(projectPhases) : undefined;

      const task = await prisma.task.create({
        data: {
          projectId: project.id,
          orgId: org.id,
          title: TASK_TEMPLATES[i % TASK_TEMPLATES.length],
          description: faker.lorem.paragraph(),
          status: taskStatus,
          priority: randomFrom(["LOW", "MEDIUM", "HIGH", "URGENT"]),
          assigneeId: assignee.id,
          creatorId: creator.id,
          dueDate: daysFromNow(faker.number.int({ min: -30, max: 90 })),
          estimatedHours: faker.number.float({ min: 2, max: 40, fractionDigits: 1 }),
          actualHours: taskStatus === "DONE" ? faker.number.float({ min: 1, max: 50, fractionDigits: 1 }) : undefined,
          order: i,
          phaseId: phase?.id,
        },
      });
      allTasks.push(task);
    }
  }

  // Create some subtasks (5 parent tasks get 2-3 subtasks each)
  const parentTasks = allTasks.slice(0, 5);
  for (const parent of parentTasks) {
    const subCount = faker.number.int({ min: 2, max: 3 });
    for (let s = 0; s < subCount; s++) {
      await prisma.task.create({
        data: {
          projectId: parent.projectId,
          orgId: org.id,
          title: `Sub: ${faker.lorem.words(4)}`,
          description: faker.lorem.sentence(),
          status: randomFrom(["TODO", "IN_PROGRESS", "DONE"]),
          priority: "MEDIUM",
          assigneeId: randomFrom(users).id,
          creatorId: parent.creatorId,
          parentTaskId: parent.id,
          order: s,
        },
      });
    }
  }
  console.log(`   ✅ ${allTasks.length} tasks + subtasks`);

  // --------------------------------------------------------------------------
  // 11. Create Task Comments
  // --------------------------------------------------------------------------
  console.log("💬 Creating task comments...");
  const commentTemplates = [
    "Looks great, approved for the next phase.",
    "Can we revisit the material selection here? The client had concerns about durability.",
    "Updated the drawings per the consultant's feedback. Please review.",
    "This needs to be coordinated with the structural engineer before we proceed.",
    "Client wants to see an alternative option by Friday.",
    "I've uploaded the revised renders to the asset library.",
    "Scheduling conflict with the MEP team—let's discuss tomorrow.",
    "The planning authority has requested additional shadow studies.",
    "Cost estimate looks high. Can we value-engineer the facade system?",
    "Great progress on this. Let's present it at the design review.",
  ];
  for (const task of allTasks.slice(0, 30)) {
    const commentCount = faker.number.int({ min: 0, max: 3 });
    for (let c = 0; c < commentCount; c++) {
      await prisma.taskComment.create({
        data: {
          taskId: task.id,
          userId: randomFrom(users).id,
          content: commentTemplates[faker.number.int({ min: 0, max: commentTemplates.length - 1 })],
          createdAt: daysAgo(faker.number.int({ min: 0, max: 60 })),
        },
      });
    }
  }

  // --------------------------------------------------------------------------
  // 12. Create Assets
  // --------------------------------------------------------------------------
  console.log("📁 Creating assets...");
  const assetTemplates = [
    { name: "Site Plan - Ground Level",            type: "DRAWING",   mimeType: "application/pdf" },
    { name: "Concept Render - Aerial View",        type: "RENDER",    mimeType: "image/png" },
    { name: "Concept Render - Street Level",       type: "RENDER",    mimeType: "image/png" },
    { name: "Material Board - Facade Options",     type: "IMAGE",     mimeType: "image/jpeg" },
    { name: "Structural Analysis Report",          type: "DOCUMENT",  mimeType: "application/pdf" },
    { name: "BIM Model - Full Building",           type: "MODEL_3D",  mimeType: "application/ifc" },
    { name: "Client Presentation - Phase 2",       type: "DOCUMENT",  mimeType: "application/vnd.ms-powerpoint" },
    { name: "Drone Survey Video",                  type: "VIDEO",     mimeType: "video/mp4" },
    { name: "Environmental Impact Assessment",     type: "DOCUMENT",  mimeType: "application/pdf" },
    { name: "Interior Finish Schedule",            type: "DOCUMENT",  mimeType: "application/vnd.ms-excel" },
  ];
  const allAssets: any[] = [];
  for (const project of projects) {
    const assetCount = faker.number.int({ min: 3, max: 8 });
    for (let a = 0; a < assetCount; a++) {
      const template = assetTemplates[a % assetTemplates.length];
      const asset = await prisma.asset.create({
        data: {
          orgId: org.id,
          projectId: project.id,
          name: `${template.name} - ${project.name.substring(0, 20)}`,
          type: template.type,
          url: `https://cdn.nexusos.dev/assets/${org.slug}/${project.slug}/${slugify(template.name)}.${template.mimeType.split("/")[1]}`,
          thumbnailUrl: `https://cdn.nexusos.dev/thumbnails/${org.slug}/${project.slug}/${slugify(template.name)}_thumb.jpg`,
          size: faker.number.int({ min: 50000, max: 500000000 }),
          mimeType: template.mimeType,
          tags: JSON.stringify(randomSubset(["architecture", "render", "presentation", "technical", "concept", "interior", "landscape", "structural", "MEP"], 2, 4)),
          metadata: JSON.stringify({
            width: template.type === "IMAGE" || template.type === "RENDER" ? 3840 : undefined,
            height: template.type === "IMAGE" || template.type === "RENDER" ? 2160 : undefined,
            dpi: 300,
            software: randomFrom(["Revit 2025", "Rhino 8", "AutoCAD 2025", "SketchUp Pro", "Photoshop", "Blender"]),
          }),
          status: randomFrom(["DRAFT", "IN_REVIEW", "APPROVED", "PUBLISHED"]),
          uploadedById: randomFrom(users).id,
          version: faker.number.int({ min: 1, max: 5 }),
        },
      });
      allAssets.push(asset);
    }
  }
  console.log(`   ✅ ${allAssets.length} assets`);

  // Create some task attachments
  for (let i = 0; i < Math.min(10, allTasks.length, allAssets.length); i++) {
    await prisma.taskAttachment.create({
      data: {
        taskId: allTasks[i].id,
        assetId: allAssets[i % allAssets.length].id,
      },
    });
  }

  // --------------------------------------------------------------------------
  // 13. Create Invoices
  // --------------------------------------------------------------------------
  console.log("💰 Creating invoices...");
  const financeUser = users.find((u) => u.email === "priya.sharma@fosterpartners.com")!;
  let invoiceNum = 1001;
  for (const project of projects.slice(0, 5)) {
    const pd = PROJECT_DATA[projects.indexOf(project)];
    const client = pd.clientIdx >= 0 ? clients[pd.clientIdx] : undefined;
    const invoiceCount = faker.number.int({ min: 1, max: 4 });

    for (let inv = 0; inv < invoiceCount; inv++) {
      const amount = faker.number.float({ min: 50000, max: 5000000, fractionDigits: 2 });
      const tax = Math.round(amount * 0.2 * 100) / 100; // 20% VAT
      const isPaid = faker.datatype.boolean();
      await prisma.invoice.create({
        data: {
          orgId: org.id,
          projectId: project.id,
          clientId: client?.id,
          number: `FP-INV-${invoiceNum++}`,
          status: isPaid ? "PAID" : randomFrom(["DRAFT", "SENT", "OVERDUE"]),
          amount,
          currency: "GBP",
          tax,
          total: Math.round((amount + tax) * 100) / 100,
          dueDate: daysFromNow(faker.number.int({ min: -60, max: 60 })),
          paidAt: isPaid ? daysAgo(faker.number.int({ min: 1, max: 30 })) : undefined,
          lineItems: JSON.stringify([
            { description: "Professional Fees - Design Stage", quantity: 1, unitPrice: amount * 0.6, total: amount * 0.6 },
            { description: "Consultant Coordination", quantity: 1, unitPrice: amount * 0.25, total: amount * 0.25 },
            { description: "Expenses & Disbursements", quantity: 1, unitPrice: amount * 0.15, total: amount * 0.15 },
          ]),
          notes: faker.lorem.sentence(),
          createdById: financeUser.id,
        },
      });
    }
  }
  console.log(`   ✅ ${invoiceNum - 1001} invoices`);

  // --------------------------------------------------------------------------
  // 14. Create Time Entries
  // --------------------------------------------------------------------------
  console.log("⏱️  Creating time entries...");
  let timeEntryCount = 0;
  for (const project of projects.filter((_, i) => PROJECT_DATA[i].status === "ACTIVE")) {
    for (let day = 0; day < 30; day++) {
      const usersToday = randomSubset(users.slice(0, 12), 2, 5);
      for (const user of usersToday) {
        await prisma.timeEntry.create({
          data: {
            orgId: org.id,
            projectId: project.id,
            userId: user.id,
            description: randomFrom(TASK_TEMPLATES),
            hours: faker.number.float({ min: 0.5, max: 8, fractionDigits: 1 }),
            date: daysAgo(day),
            billable: faker.datatype.boolean({ probability: 0.8 }),
            rate: faker.number.float({ min: 80, max: 350, fractionDigits: 0 }),
          },
        });
        timeEntryCount++;
      }
    }
  }
  console.log(`   ✅ ${timeEntryCount} time entries`);

  // --------------------------------------------------------------------------
  // 15. Create Channels & Messages
  // --------------------------------------------------------------------------
  console.log("📢 Creating channels and messages...");
  const channels = [];

  // Global channels
  for (const ct of CHANNEL_TEMPLATES) {
    const channel = await prisma.channel.create({
      data: {
        orgId: org.id,
        name: ct.name,
        description: ct.description,
        type: ct.type,
        isPrivate: (ct as any).isPrivate || false,
      },
    });
    channels.push(channel);

    // Add members
    const memberUsers = (ct as any).isPrivate ? users.slice(0, 4) : users;
    for (const user of memberUsers) {
      await prisma.channelMember.create({
        data: {
          channelId: channel.id,
          userId: user.id,
          role: user.id === users[0].id ? "ADMIN" : "MEMBER",
          lastReadAt: daysAgo(faker.number.int({ min: 0, max: 7 })),
        },
      });
    }
  }

  // Project channels
  for (const project of projects.slice(0, 4)) {
    const channel = await prisma.channel.create({
      data: {
        orgId: org.id,
        name: `proj-${project.slug.substring(0, 25)}`,
        description: `Discussion channel for ${project.name}`,
        type: "PROJECT",
        projectId: project.id,
      },
    });
    channels.push(channel);
    // Add 5 members
    for (const user of randomSubset(users, 4, 7)) {
      await prisma.channelMember.create({
        data: {
          channelId: channel.id,
          userId: user.id,
          role: "MEMBER",
        },
      });
    }
  }

  // Messages
  const messageTemplates = [
    "Has anyone reviewed the latest facade study? I think option B works better with the site context.",
    "The client meeting is moved to Thursday at 2pm. Please prepare your sections.",
    "Just uploaded the updated renders to the asset library. Feedback welcome!",
    "Reminder: Design review tomorrow at 10am in Studio 3.",
    "The structural engineer confirmed the cantilever is feasible. 🎉",
    "Can someone share the latest cost plan? I need it for the client report.",
    "Great work on the competition entry everyone. We made the shortlist!",
    "I've updated the BIM model with the latest MEP coordination changes.",
    "The planning authority wants additional views from the Thames Path. @Laura can you handle?",
    "Friday drinks at the Riverside terrace, 5:30pm. All welcome! 🍻",
    "New sustainability targets from the client: net-zero carbon by 2030.",
    "The acoustic consultant's report is in. Some changes needed on the auditorium design.",
    "Has anyone used the new parametric facade tool? It's incredible for sun studies.",
    "Site photos from today's visit are in the project folder.",
    "Congratulations to the Dubai Creek Tower team on winning the design award! 🏆",
  ];

  for (const channel of channels) {
    const msgCount = faker.number.int({ min: 5, max: 15 });
    for (let m = 0; m < msgCount; m++) {
      await prisma.message.create({
        data: {
          channelId: channel.id,
          userId: randomFrom(users).id,
          content: messageTemplates[m % messageTemplates.length],
          type: "TEXT",
          createdAt: daysAgo(faker.number.int({ min: 0, max: 30 })),
        },
      });
    }
  }
  console.log(`   ✅ ${channels.length} channels with messages`);

  // --------------------------------------------------------------------------
  // 16. Create AI Conversations & Messages
  // --------------------------------------------------------------------------
  console.log("🤖 Creating AI conversations...");
  const aiConversations = [
    {
      userId: users[1].id, // Luke Fox
      title: "Facade Material Selection - Dubai Creek",
      context: { projectId: projects[0].id, area: "facade" },
      messages: [
        { role: "USER", content: "What are the best facade materials for a supertall tower in the Gulf climate? We need something that can handle extreme heat and humidity while maintaining a sleek aesthetic." },
        { role: "ASSISTANT", content: "For a supertall in the Gulf climate, I'd recommend these high-performance facade systems:\n\n1. **Ultra-clear low-iron glass** with triple-silver low-E coating (solar heat gain coefficient < 0.22)\n2. **Anodised aluminium** unitised curtain wall with thermal break technology\n3. **GFRC (Glass Fibre Reinforced Concrete)** panels for solid areas — excellent thermal mass\n4. **Ceramic frit patterns** on glass for solar shading without compromising views\n\nGiven Dubai Creek Tower's form, a unitised system with aluminium mullions and double-skin glass would perform best. The outer skin can incorporate photovoltaic cells for energy generation.\n\nShall I run a thermal performance comparison between these options?" },
        { role: "USER", content: "Yes please. Also factor in embodied carbon — the client has a net-zero commitment." },
        { role: "ASSISTANT", content: "Here's a comparative analysis factoring thermal performance and embodied carbon:\n\n| Material | U-Value (W/m²K) | SHGC | Embodied Carbon (kgCO₂e/m²) | 30yr Lifecycle |\n|----------|-----------------|------|-------------------------------|----------------|\n| Triple-silver Low-E IGU | 1.1 | 0.19 | 85 | Low maintenance |\n| Unitised aluminium CW | 1.3 | 0.22 | 120 | Standard |\n| GFRC panels | 0.35 | N/A | 45 | Very low |\n| PV-integrated glass | 1.4 | 0.25 | 150 | Offset by generation |\n\n**Recommendation**: A hybrid system combining GFRC at podium levels (lower embodied carbon) with triple-silver IGU at tower levels would achieve the best balance. PV integration on the south-facing crown would offset approximately 15% of the building's energy consumption.\n\nTotal estimated facade embodied carbon: 12,500 tonnes CO₂e — within LEED v4.1 Gold thresholds." },
      ],
    },
    {
      userId: users[4].id, // Narinder Sagoo
      title: "Structural System Options - Tall Building Research",
      context: { projectId: projects[7].id, area: "structure" },
      messages: [
        { role: "USER", content: "For our tall timber research — what's the current height record for mass timber buildings, and what structural systems make 40+ storeys feasible?" },
        { role: "ASSISTANT", content: "The current record for mass timber is **Ascent Milwaukee** at 25 storeys (86.6m), completed 2022. For 40+ storey feasibility:\n\n**Viable Structural Systems:**\n\n1. **Hybrid CLT-concrete core**: CLT floors/walls + concrete shear core. Proven to 25 storeys, theoretically viable to 50.\n2. **Glulam diagrid + CLT floors**: Excellent lateral stiffness. Research suggests 40 storeys is feasible with current technology.\n3. **Mass timber + steel outriggers**: Timber gravity system with steel outriggers at every 10 floors for lateral resistance.\n4. **Rocking timber walls**: Post-tensioned CLT walls that 'rock' in seismic events — pioneered in New Zealand.\n\n**Key challenges at 40+ storeys:**\n- Differential shortening (timber creep vs concrete core)\n- Fire engineering (char rate calculations become critical)\n- Connection design (steel node connectors at high-stress zones)\n- Wind-induced vibration (timber is lighter = more susceptible)\n\nShall I detail the fire engineering strategy for any of these systems?" },
      ],
    },
    {
      userId: users[11].id, // Aiko Tanaka
      title: "Parametric Facade Script Help",
      context: { area: "computational_design" },
      messages: [
        { role: "USER", content: "I'm writing a Grasshopper script for a parametric facade panel system. How do I create a Voronoi-based panel layout that responds to solar radiation data?" },
        { role: "ASSISTANT", content: "Here's a Grasshopper workflow for a solar-responsive Voronoi facade:\n\n**Step 1: Solar Analysis**\n- Use Ladybug's `SolarRadiation` component to map radiation values onto your facade surface\n- Set your EPW weather file to the project location\n- Output: radiation mesh with values per face\n\n**Step 2: Voronoi Generation**\n- Populate your facade surface with points using `Populate 2D`\n- Map solar radiation values to point density (more points = smaller panels where radiation is high)\n- Use `Voronoi` component on the projected UV points\n- Map back to 3D surface using `Surface Closest Point`\n\n**Step 3: Panel Variation**\n- For each Voronoi cell, map radiation value → panel opacity (0-80%)\n- High radiation zones → more opaque/perforated panels\n- Low radiation zones → more transparent/glass panels\n\n**Step 4: Rationalisation**\n- Use `Kangaroo` to relax panel edges for fabrication\n- Apply minimum/maximum panel size constraints\n- Export panel schedule with unique IDs and opacity values\n\nWant me to generate the Python/GHPython node code for the density-mapping step?" },
      ],
    },
  ];

  for (const convData of aiConversations) {
    const conv = await prisma.aIConversation.create({
      data: {
        orgId: org.id,
        userId: convData.userId,
        title: convData.title,
        context: JSON.stringify(convData.context),
        model: "gpt-4o",
      },
    });

    for (const msg of convData.messages) {
      await prisma.aIMessage.create({
        data: {
          conversationId: conv.id,
          role: msg.role,
          content: msg.content,
          model: msg.role === "ASSISTANT" ? "gpt-4o" : undefined,
          tokensUsed: msg.role === "ASSISTANT" ? faker.number.int({ min: 200, max: 1500 }) : faker.number.int({ min: 20, max: 100 }),
          costCents: msg.role === "ASSISTANT" ? faker.number.float({ min: 0.5, max: 5, fractionDigits: 2 }) : 0.01,
        },
      });
    }
  }

  // --------------------------------------------------------------------------
  // 17. Create AI Agents
  // --------------------------------------------------------------------------
  console.log("🤖 Creating AI agents...");
  for (const agentDef of AI_AGENT_TYPES) {
    const agent = await prisma.aIAgent.create({
      data: {
        orgId: org.id,
        name: agentDef.name,
        type: agentDef.type,
        description: agentDef.description,
        config: JSON.stringify({
          model: "gpt-4o",
          temperature: 0.3,
          maxTokens: 4096,
          schedule: agentDef.type === "REPORTING" ? "0 9 * * 1" : undefined, // Monday 9am
        }),
        isActive: true,
        lastRunAt: daysAgo(faker.number.int({ min: 0, max: 7 })),
      },
    });

    // Create 2-3 agent runs per agent
    const runCount = faker.number.int({ min: 2, max: 3 });
    for (let r = 0; r < runCount; r++) {
      await prisma.aIAgentRun.create({
        data: {
          agentId: agent.id,
          status: r === 0 ? "COMPLETED" : randomFrom(["COMPLETED", "COMPLETED", "FAILED"]),
          input: JSON.stringify({ projectId: randomFrom(projects).id, trigger: "scheduled" }),
          output: JSON.stringify({ summary: faker.lorem.paragraph(), recommendations: [faker.lorem.sentence(), faker.lorem.sentence()] }),
          startedAt: daysAgo(r * 7),
          completedAt: daysAgo(r * 7),
          error: null,
        },
      });
    }
  }

  // --------------------------------------------------------------------------
  // 18. Create Notifications
  // --------------------------------------------------------------------------
  console.log("🔔 Creating notifications...");
  const notifTypes = ["TASK_ASSIGNED", "TASK_COMPLETED", "MENTION", "INVOICE_PAID", "PROJECT_UPDATE", "SYSTEM"];
  for (const user of users.slice(0, 10)) {
    const notifCount = faker.number.int({ min: 3, max: 8 });
    for (let n = 0; n < notifCount; n++) {
      const nType = randomFrom(notifTypes);
      const isRead = faker.datatype.boolean({ probability: 0.6 });
      await prisma.notification.create({
        data: {
          orgId: org.id,
          userId: user.id,
          type: nType,
          title: nType === "TASK_ASSIGNED"
            ? "New task assigned to you"
            : nType === "TASK_COMPLETED"
            ? "Task completed"
            : nType === "MENTION"
            ? `${randomFrom(users).name} mentioned you`
            : nType === "INVOICE_PAID"
            ? "Invoice payment received"
            : nType === "PROJECT_UPDATE"
            ? "Project status updated"
            : "System notification",
          message: faker.lorem.sentence(),
          data: JSON.stringify({ entityId: randomFrom(projects).id }),
          read: isRead,
          readAt: isRead ? daysAgo(faker.number.int({ min: 0, max: 7 })) : undefined,
          createdAt: daysAgo(faker.number.int({ min: 0, max: 30 })),
        },
      });
    }
  }

  // --------------------------------------------------------------------------
  // 19. Create Audit Logs
  // --------------------------------------------------------------------------
  console.log("📋 Creating audit logs...");
  const auditActions = ["CREATE", "UPDATE", "DELETE", "LOGIN", "EXPORT", "INVITE"];
  const auditEntities = ["Project", "Task", "Invoice", "User", "Asset", "Client"];
  for (let al = 0; al < 50; al++) {
    await prisma.auditLog.create({
      data: {
        orgId: org.id,
        userId: randomFrom(users).id,
        action: randomFrom(auditActions),
        entity: randomFrom(auditEntities),
        entityId: randomFrom(projects).id,
        changes: JSON.stringify({ field: "status", oldValue: "DRAFT", newValue: "ACTIVE" }),
        ipAddress: faker.internet.ip(),
        createdAt: daysAgo(faker.number.int({ min: 0, max: 90 })),
      },
    });
  }

  // --------------------------------------------------------------------------
  // 20. Create Leaves
  // --------------------------------------------------------------------------
  console.log("🏖️  Creating leave records...");
  const leaveTypes = ["ANNUAL", "SICK", "PERSONAL", "MATERNITY", "PATERNITY", "OTHER"];
  for (const user of users.slice(0, 10)) {
    const leaveCount = faker.number.int({ min: 1, max: 3 });
    for (let l = 0; l < leaveCount; l++) {
      const startDay = faker.number.int({ min: -60, max: 60 });
      const duration = faker.number.int({ min: 1, max: 14 });
      const leaveStatus = randomFrom(["PENDING", "APPROVED", "APPROVED", "REJECTED"]);
      await prisma.leave.create({
        data: {
          orgId: org.id,
          userId: user.id,
          type: randomFrom(leaveTypes),
          startDate: daysFromNow(startDay),
          endDate: daysFromNow(startDay + duration),
          status: leaveStatus,
          approvedById: leaveStatus !== "PENDING" ? users[0].id : undefined,
          notes: faker.lorem.sentence(),
        },
      });
    }
  }

  // --------------------------------------------------------------------------
  // Done!
  // --------------------------------------------------------------------------
  console.log("\n🎉 Seed completed successfully!");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`   Organization:  ${org.name}`);
  console.log(`   Users:         ${users.length}`);
  console.log(`   Projects:      ${projects.length}`);
  console.log(`   Tasks:         ${allTasks.length}+`);
  console.log(`   Clients:       ${clients.length}`);
  console.log(`   Assets:        ${allAssets.length}`);
  console.log(`   Channels:      ${channels.length}`);
  console.log(`   AI Agents:     ${AI_AGENT_TYPES.length}`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seed failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
