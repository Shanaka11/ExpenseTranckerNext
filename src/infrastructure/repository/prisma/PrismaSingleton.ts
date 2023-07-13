import { PrismaClient } from '@prisma/client';

// try to use singleton pattern here
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();
