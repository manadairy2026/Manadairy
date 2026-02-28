import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "../shared/routes";
import { sendSubscriptionEmail, sendUserConfirmationEmail } from "./mail";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post(api.subscriptions.create.path, async (req, res) => {
    try {
      const input = api.subscriptions.create.input.parse(req.body);

      // Generate a unique tracking ID: MANA-XXXXXX
      const trackingId = `MANA-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

      const subscription = await storage.createSubscription({
        ...(input as any),
        trackingId,
        status: "Booked"
      });

      // Send email notifications (don't await to avoid slowing down user response)
      sendSubscriptionEmail(subscription).catch(console.error);
      sendUserConfirmationEmail(subscription).catch(console.error);

      res.status(201).json(subscription);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.get("/api/track/:trackingId", async (req, res) => {
    const { trackingId } = req.params;
    const subscription = await storage.getSubscriptionByTrackingId(trackingId);

    if (!subscription) {
      return res.status(404).json({ message: "Order not found. Please check your tracking ID." });
    }

    res.json(subscription);
  });

  return httpServer;
}