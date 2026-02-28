import express, { type Express, type Request, Response } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function serveStatic(app: Express) {
  // Check multiple possible locations for the built frontend
  // This helps when running from server/index.ts vs dist/index.cjs
  const possiblePaths = [
    path.resolve(__dirname, "public"),         // Relative to server/ or dist/
    path.resolve(process.cwd(), "dist", "public"), // Root-based dist/public
    path.resolve(process.cwd(), "public"),      // Fallback
    path.resolve(__dirname, "..", "client", "dist") // Local Dev fallback
  ];

  let distPath = "";
  for (const p of possiblePaths) {
    if (fs.existsSync(p) && fs.existsSync(path.join(p, "index.html"))) {
      distPath = p;
      break;
    }
  }

  if (!distPath) {
    console.warn("⚠️ Warning: Could not find the build directory. Static files won't be served.");
    return;
  }

  // Support for static assets
  app.use(express.static(distPath, { index: false }));

  // SPA fallback for all non-API routes
  app.get("*", (req: Request, res: Response) => {
    // If it's an API route, let it pass (though it should have been caught already)
    if (req.path.startsWith("/api")) return res.status(404).json({ message: "API endpoint not found" });

    // Serve index.html for all other routes to support client-side routing
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
