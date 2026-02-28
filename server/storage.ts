import { subscriptions, type Subscription, type InsertSubscription } from "../shared/schema.ts";
import { db, ensureDb } from "./db.ts";
import { eq } from "drizzle-orm";

export interface IStorage {
  createSubscription(subscription: InsertSubscription & { trackingId: string; status: string }): Promise<Subscription>;
  getSubscriptionByTrackingId(trackingId: string): Promise<Subscription | undefined>;
}

export class DatabaseStorage implements IStorage {
  async createSubscription(insertSubscription: InsertSubscription & { trackingId: string; status: string }): Promise<Subscription> {
    await ensureDb(); // Ensure DB is ready (even dynamically for SQLite locally)

    if (!db) {
      throw new Error("Unable to connect to the database. Please provide a DATABASE_URL.");
    }

    const [subscription] = await db
      .insert(subscriptions)
      .values(insertSubscription)
      .returning();
    return subscription;
  }

  async getSubscriptionByTrackingId(trackingId: string): Promise<Subscription | undefined> {
    await ensureDb(); // Ensure DB is ready

    if (!db) {
      return undefined;
    }

    const [subscription] = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.trackingId, trackingId));
    return subscription;
  }
}

export const storage = new DatabaseStorage();