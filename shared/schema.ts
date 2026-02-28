import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { sqliteTable, text as sqliteText, integer as sqliteInteger } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Use Postgres if DATABASE_URL is a postgres string, otherwise use SQLite
// browser-safe check for process.env
const isPostgres = typeof process !== "undefined" && process?.env?.DATABASE_URL?.startsWith("postgres");

// Helper to define table based on DB engine
// @ts-ignore
const table = (isPostgres ? pgTable : sqliteTable) as any;

export const subscriptions = table("subscriptions", {
  // @ts-ignore - Drizzle dialect differences handled dynamically
  id: isPostgres ? serial("id").primaryKey() : sqliteInteger("id").primaryKey({ autoIncrement: true }),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phoneNumber: text("phone_number").notNull(),
  address: text("address").notNull(),
  product: text("product").notNull(),
  quantity: integer("quantity").notNull(),
  frequency: text("frequency").notNull(),
  deliveryTime: text("delivery_time").notNull(),
  startDate: text("start_date").notNull(),
  specialInstructions: text("special_instructions"),
});

export const insertSubscriptionSchema = createInsertSchema(subscriptions).omit({ id: true });

export type Subscription = typeof subscriptions.$inferSelect;
export type InsertSubscription = z.infer<typeof insertSubscriptionSchema>;
