import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes.ts";
import { serveStatic } from "./static.ts";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

// 1. Logger Middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      console.log(`[express] ${logLine}`);
    }
  });

  next();
});

// 2. Register API Routes (Synchronous registration for Vercel)
registerRoutes(app);

// 3. Error Handling Middleware
app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  console.error("Internal Server Error:", err);
  if (res.headersSent) return next(err);
  return res.status(status).json({ message });
});

// 4. Static File Serving (Synchronous for Production/Vercel)
if (process.env.NODE_ENV === "production" || process.env.VERCEL) {
  serveStatic(app);
}

// 5. Development Mode (Vite only)
(async () => {
  if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  // 6. Start the server (Only in non-serverless environments)
  if (!process.env.VERCEL) {
    const port = parseInt(process.env.PORT || "5000", 10);
    httpServer.listen({ port, host: "0.0.0.0" }, () => {
      console.log(`[express] Serving Mana Dairy on port ${port} 🥛✨🚀`);
    });
  }
})();

// Export for Vercel Serverless Function
export default app;
