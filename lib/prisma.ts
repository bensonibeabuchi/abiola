// lib/prisma.ts
import type { PrismaClient as PrismaClientType } from "@prisma/client"; // only for type
import { PrismaClient } from "@prisma/client"; // actual runtime

import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const adapter = new PrismaPg(pool);

declare global {
  var prisma: PrismaClientType | undefined;
}

export const prisma =
  globalThis.prisma ||
  new PrismaClient({
    adapter,
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}
