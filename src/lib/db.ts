import { PrismaClient } from "@prisma/client";

// ============================================================================
// Prisma Client Singleton
// ============================================================================
// Prevents multiple PrismaClient instances in development (hot-reload).
// In production, a single instance is created.
// See: https://www.prisma.io/docs/guides/performance-and-optimization/connection-management
// ============================================================================

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}

export default db;
