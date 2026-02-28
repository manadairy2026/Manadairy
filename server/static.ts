import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  // Check multiple possible locations for the built frontend
  // This helps when running from server/index.ts vs dist/index.cjs
  const possiblePaths = [
    path.resolve(__dirname, "public"),         // Relative to server/ or dist/
    path.resolve(process.cwd(), "dist", "public"), // Root-based dist/public
    path.resolve(process.cwd(), "public")      // Fallback
  ];

  let distPath = "";
  for (const p of possiblePaths) {
    if (fs.existsSync(p) && fs.existsSync(path.join(p, "index.html"))) {
      distPath = p;
      break;
    }
  }

  if (!distPath) {
    // On Vercel, if we haven't built yet or looking in wrong place, don't crash the server
    // Just log a warning and let the API continue if possible
    console.warn("⚠️ Warning: Could not find the build directory. Static files won't be served.");
    return;
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
