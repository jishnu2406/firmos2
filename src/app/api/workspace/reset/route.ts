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

    // Perform atomic transaction to clean and seed fresh database structure
    await db.$transaction(async (tx) => {
      // 1. Wipe all related tables in exact order to satisfy relational dependencies
      await tx.notification.deleteMany();
      await tx.auditLog.deleteMany();
      await tx.leave.deleteMany();
      await tx.timeEntry.deleteMany();
      await tx.invoice.deleteMany();
      await tx.taskAttachment.deleteMany();
      await tx.taskComment.deleteMany();
      await tx.task.deleteMany();
      await tx.projectPhase.deleteMany();
      await tx.projectMember.deleteMany();
      await tx.projectMilestone.deleteMany();
      await tx.project.deleteMany();
      await tx.clientContact.deleteMany();
      await tx.client.deleteMany();
      await tx.asset.deleteMany();
      await tx.message.deleteMany();
      await tx.channelMember.deleteMany();
      await tx.channel.deleteMany();
      await tx.aIMessage.deleteMany();
      await tx.aIConversation.deleteMany();
      await tx.aIAgentRun.deleteMany();
      await tx.aIAgent.deleteMany();
      await tx.department.deleteMany();
      await tx.organizationMember.deleteMany();
      await tx.account.deleteMany();
      await tx.session.deleteMany();
      await tx.verificationToken.deleteMany();
      await tx.user.deleteMany();
      await tx.organization.deleteMany();

      // 2. Create the brand new fresh organization
      const freshOrg = await tx.organization.create({
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
      const freshUser = await tx.user.create({
        data: {
          name: ownerName,
          email: ownerEmail,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      // 4. Bind the user to the organization with OWNER role
      await tx.organizationMember.create({
        data: {
          orgId: freshOrg.id,
          userId: freshUser.id,
          role: "OWNER",
          joinedAt: new Date(),
          isActive: true,
        },
      });

      // 5. Pre-seed a default General chat channel for convenience
      await tx.channel.create({
        data: {
          orgId: freshOrg.id,
          name: "general",
          description: "Studio-wide announcements and general discussion",
          type: "GENERAL",
          isPrivate: false,
          createdAt: new Date(),
        },
      });
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
