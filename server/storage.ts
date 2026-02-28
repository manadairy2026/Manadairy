import { subscriptions, type Subscription, type InsertSubscription } from "@shared/schema";
import { db } from "./db";

export interface IStorage {
  createSubscription(subscription: InsertSubscription): Promise<Subscription>;
}

export class DatabaseStorage implements IStorage {
  async createSubscription(insertSubscription: InsertSubscription): Promise<Subscription> {
    const [subscription] = await db
      .insert(subscriptions)
      .values(insertSubscription)
      .returning();
    return subscription;
  }
}

export const storage = new DatabaseStorage();