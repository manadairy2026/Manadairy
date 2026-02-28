import type { Express } from "express";
import { storage } from "./storage.ts";
import { api } from "../shared/routes.ts";
import { sendSubscriptionEmail, sendUserConfirmationEmail } from "./mail.ts";
import { z } from "zod";

export function registerRoutes(app: Express): void {
  // Subscription Creation Route
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

      // Send email notifications asynchronously (non-blocking)
      sendSubscriptionEmail(subscription).catch(err => {
        console.error("❌ Notification error (Subscription):", err);
      });

      sendUserConfirmationEmail(subscription).catch(err => {
        console.error("❌ Notification error (User Confirmation):", err);
      });

      res.status(201).json(subscription);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      console.error("❌ Subscription API Error:", err);
      res.status(500).json({ message: "Unable to process your order. Please try again later." });
    }
  });

  // Order Tracking Route
  app.get("/api/track/:trackingId", async (req, res) => {
    try {
      const { trackingId } = req.params;
      const subscription = await storage.getSubscriptionByTrackingId(trackingId);

      if (!subscription) {
        return res.status(404).json({ message: "Order not found. Please verify your tracking ID." });
      }

      res.json(subscription);
    } catch (err) {
      console.error("❌ Tracking API Error:", err);
      res.status(500).json({ message: "Unable to retrieve tracking details at this time." });
    }
  });
}