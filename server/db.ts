import { drizzle as drizzlePg } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "../shared/schema";

const { Pool } = pg;

// Use Postgres if DATABASE_URL is a postgres string, otherwise use SQLite (local only)
const isPostgres = process.env.DATABASE_URL?.startsWith("postgres");

export let db: any;
export let pool: any;

// Initialization function to handle native modules and environment differences
// This is called in server/index.ts during startup
export async function initDatabase() {
  if (isPostgres) {
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
    db = drizzlePg(pool, { schema });
  } else {
    // On Vercel (Production), native modules like better-sqlite3 are NOT supported.
    // We provide a dummy db if no URL exists to prevent the entire server from crashing.
    if (process.env.VERCEL) {
      console.warn("⚠️ Warning: No DATABASE_URL found on Vercel. Data will NOT be persisted.");
      db = {
        select: () => ({ from: () => ({ where: () => [] }) }),
        insert: () => ({ values: () => ({ returning: () => [{}] }) }),
      };
    } else {
      // Local development only - dynamic import better-sqlite3
      try {
        const { drizzle: drizzleSqlite } = await import("drizzle-orm/better-sqlite3");
        // @ts-ignore - native module issues in serverless build
        const Database = (await import("better-sqlite3")).default;
        const dbPath = process.env.DATABASE_URL || "sqlite.db";
        const sqlite = new Database(dbPath);
        db = drizzleSqlite(sqlite, { schema });
      } catch (err) {
        console.error("Local SQLite initialization failed:", err);
        db = {
          select: () => ({ from: () => ({ where: () => [] }) }),
          insert: () => ({ values: () => ({ returning: () => [{}] }) }),
        };
      }
    }
  }
}

// Initial sync call for those parts of the app that import db directly
// though they should wait for initDatabase() in a real environment
if (isPostgres) {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
  db = drizzlePg(pool, { schema });
}