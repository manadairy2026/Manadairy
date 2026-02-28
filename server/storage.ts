import { subscriptions, type Subscription, type InsertSubscription } from "../shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  createSubscription(subscription: InsertSubscription & { trackingId: string; status: string }): Promise<Subscription>;
  getSubscriptionByTrackingId(trackingId: string): Promise<Subscription | undefined>;
}

export class DatabaseStorage implements IStorage {
  async createSubscription(insertSubscription: InsertSubscription & { trackingId: string; status: string }): Promise<Subscription> {
    const [subscription] = await db
      .insert(subscriptions)
      .values(insertSubscription)
      .returning();
    return subscription;
  }

  async getSubscriptionByTrackingId(trackingId: string): Promise<Subscription | undefined> {
    const [subscription] = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.trackingId, trackingId));
    return subscription;
  }
}

export const storage = new DatabaseStorage();