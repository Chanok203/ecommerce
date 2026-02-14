import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { config } from '../config';

const adapter = new PrismaPg({
    connectionString: config.dbUrl,
});

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter: adapter });

if (!config.isProd) {
    globalForPrisma.prisma = prisma;
}
