import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orgName, ownerName, ownerEmail, orgType, brandColor } = body;

    if (!orgName || !ownerName || !ownerEmail || !orgType) {
      return NextResponse.json(
        { error: "Missing required onboarding parameters" },
        { status: 400 }
      );
    }

    const orgSlug = orgName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "studio";

    // 1. Wipe all related tables in exact order to satisfy relational dependencies
    await db.notification.deleteMany();
    await db.auditLog.deleteMany();
    await db.leave.deleteMany();
    await db.timeEntry.deleteMany();
    await db.invoice.deleteMany();
    await db.taskAttachment.deleteMany();
    await db.taskComment.deleteMany();
    await db.task.deleteMany();
    await db.projectPhase.deleteMany();
    await db.projectMember.deleteMany();
    await db.projectMilestone.deleteMany();
    await db.project.deleteMany();
    await db.clientContact.deleteMany();
    await db.client.deleteMany();
    await db.asset.deleteMany();
    await db.message.deleteMany();
    await db.channelMember.deleteMany();
    await db.channel.deleteMany();
    await db.aIMessage.deleteMany();
    await db.aIConversation.deleteMany();
    await db.aIAgentRun.deleteMany();
    await db.aIAgent.deleteMany();
    await db.department.deleteMany();
    await db.organizationMember.deleteMany();
    await db.account.deleteMany();
    await db.session.deleteMany();
    await db.verificationToken.deleteMany();
    await db.user.deleteMany();
    await db.organization.deleteMany();

    // 2. Create the brand new fresh organization
    const freshOrg = await db.organization.create({
      data: {
        name: orgName,
        slug: orgSlug,
        type: orgType,
        plan: "ENTERPRISE",
        brandColor: brandColor || "#6366f1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    // 3. Create the brand new primary owner user
    const freshUser = await db.user.create({
      data: {
        name: ownerName,
        email: ownerEmail,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    // 4. Bind the user to the organization with OWNER role
    await db.organizationMember.create({
      data: {
        orgId: freshOrg.id,
        userId: freshUser.id,
        role: "OWNER",
        joinedAt: new Date(),
        isActive: true,
      },
    });

    // 5. Pre-seed a default General chat channel for convenience
    await db.channel.create({
      data: {
        orgId: freshOrg.id,
        name: "general",
        description: "Studio-wide announcements and general discussion",
        type: "GENERAL",
        isPrivate: false,
        createdAt: new Date(),
      },
    });

    // Fetch the newly created user and org to return clean session variables
    const updatedUser = await db.user.findFirst({
      where: { email: ownerEmail },
      include: {
        memberships: {
          include: {
            org: true,
          },
        },
      },
    });

    if (!updatedUser || !updatedUser.memberships[0]) {
      throw new Error("Failed to retrieve fresh session identity");
    }

    const membership = updatedUser.memberships[0];

    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: "owner",
        orgId: membership.org.id,
        orgName: membership.org.name,
        orgSlug: membership.org.slug,
        orgPlan: membership.org.plan,
        permissions: ["*"],
      },
    });
  } catch (err: any) {
    console.error("Workspace reset endpoint failed:", err);
    return NextResponse.json(
      { error: err.message || "Failed to reset workspace and onboard fresh organization" },
      { status: 500 }
    );
  }
}
