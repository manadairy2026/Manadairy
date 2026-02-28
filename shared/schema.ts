import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
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
