import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orgId = searchParams.get("orgId");

    if (!orgId) {
      return NextResponse.json({ error: "Missing orgId" }, { status: 400 });
    }

    // If it's the demo firm, let the client use its preloaded state
    if (orgId === "org_demo_001") {
      return NextResponse.json({ projects: [], isDemo: true });
    }

    const projects = await db.project.findMany({
      where: { orgId },
      include: {
        client: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ projects, isDemo: false });
  } catch (err: any) {
    console.error("GET projects API failed:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, clientName, type, budget, priority, phase, orgId, userId } = body;

    if (!name || !orgId || !userId) {
      return NextResponse.json({ error: "Missing required fields (name, orgId, userId)" }, { status: 400 });
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "project";

    // 1. Resolve or create client
    let clientId: string | undefined;
    if (clientName) {
      const clientSlug = clientName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const existingClient = await db.client.findFirst({
        where: { orgId, name: clientName },
      });

      if (existingClient) {
        clientId = existingClient.id;
      } else {
        const newClient = await db.client.create({
          data: {
            orgId,
            name: clientName,
            company: clientName,
          },
        });
        clientId = newClient.id;
      }
    }

    // 2. Create the project
    const project = await db.project.create({
      data: {
        orgId,
        name,
        slug,
        type: type || "ARCHITECTURE",
        budget: budget ? parseFloat(budget) : 0,
        priority: priority || "MEDIUM",
        status: "ACTIVE",
        createdById: userId,
        clientId,
      },
    });

    // 3. Create default project phase if set
    if (phase) {
      await db.projectPhase.create({
        data: {
          projectId: project.id,
          name: phase,
          order: 0,
          status: "IN_PROGRESS",
        },
      });
    }

    return NextResponse.json({ success: true, project });
  } catch (err: any) {
    console.error("POST project API failed:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
