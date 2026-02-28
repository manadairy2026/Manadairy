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
  trackingId: text("tracking_id").notNull().unique(),
  status: text("status").notNull().default("Booked"),
});

export const insertSubscriptionSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(10, "Address is too short"),
  product: z.string(),
  quantity: z.number().min(1),
  frequency: z.string(),
  deliveryTime: z.string(),
  startDate: z.string(),
  specialInstructions: z.string().optional(),
});

export type Subscription = typeof subscriptions.$inferSelect;
export type InsertSubscription = z.infer<typeof insertSubscriptionSchema>;
