// lib/prisma.ts
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// Create a Postgres pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // required for Neon serverless
});

// Create Prisma adapter
const adapter = new PrismaPg(pool);

// Global variable to prevent multiple instances in dev
declare global {
  var prisma: PrismaClient | undefined;
}

// Create Prisma client
export const prisma =
  globalThis.prisma ||
  new PrismaClient({
    adapter,
    log: ["query"], // optional: logs all queries
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}
