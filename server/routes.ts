import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post(api.subscriptions.create.path, async (req, res) => {
    try {
      const input = api.subscriptions.create.input.parse(req.body);
      const subscription = await storage.createSubscription(input);

      // Send email notifications (don't await to avoid slowing down user response)
      import("./mail").then(({ sendSubscriptionEmail, sendUserConfirmationEmail }) => {
        sendSubscriptionEmail(input);
        sendUserConfirmationEmail(input);
      });

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

  return httpServer;
}