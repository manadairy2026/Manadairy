import { drizzle as drizzlePg } from "drizzle-orm/node-postgres";
import { drizzle as drizzleSqlite } from "drizzle-orm/better-sqlite3";
import pg from "pg";
import Database from "better-sqlite3";
import * as schema from "@shared/schema";

const { Pool } = pg;

// Use Postgres if DATABASE_URL is a postgres string, otherwise use SQLite
const isPostgres = process.env.DATABASE_URL?.startsWith("postgres");

export let db: any;
export let pool: any;

if (isPostgres) {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
  db = drizzlePg(pool, { schema });
} else {
  const dbPath = process.env.DATABASE_URL || "sqlite.db";
  const sqlite = new Database(dbPath);
  db = drizzleSqlite(sqlite, { schema });
}