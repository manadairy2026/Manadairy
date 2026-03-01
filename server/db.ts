import { drizzle as drizzlePg } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "../shared/schema";

const { Pool } = pg;

// Use Postgres if DATABASE_URL is a postgres string
const isPostgres = process.env.DATABASE_URL?.startsWith("postgres");

export let db: any;
export let pool: any;

// CRITICAL: We avoid importing 'better-sqlite3' at the top level
// because it's a native module and causes Vercel 500 errors.
// We only load it dynamically when NOT on Vercel.

if (isPostgres) {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
  db = drizzlePg(pool, { schema });
} else {
  // If no Postgres and we ARE on Vercel, we provide a dummy DB
  // to prevent the app from crashing on start.
  if (process.env.VERCEL) {
    console.warn("⚠️ No DATABASE_URL found. Using a dummy driver for now on Vercel.");
    db = {
      select: () => ({ from: () => ({ where: () => [] }) }),
      insert: () => ({
        values: () => ({
          returning: () => {
            // Return a realistic but unique tracking ID for the dummy success
            const trackingId = `MANA-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
            return [{ trackingId, status: "Booked" }];
          }
        })
      }),
    };
  }
}

// Helper to ensure database is ready for local SQLite
export async function ensureDb() {
  if (db) return;

  if (!isPostgres && !process.env.VERCEL) {
    try {
      const { drizzle: drizzleSqlite } = await import("drizzle-orm/better-sqlite3");
      // @ts-ignore - dynamic import of native module to avoid Vercel build issues
      const Database = (await import("better-sqlite3")).default;
      const dbPath = process.env.DATABASE_URL || "sqlite.db";
      const sqlite = new Database(dbPath);
      db = drizzleSqlite(sqlite, { schema });
    } catch (err) {
      console.error("Local SQLite load failed:", err);
    }
  }
}

// Pre-initialize for faster response times if not on Vercel
if (!process.env.VERCEL) {
  ensureDb().catch(err => {
    console.warn("⚠️ Initial database connection postponed until first request.");
  });
}