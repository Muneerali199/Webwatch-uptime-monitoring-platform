process.env.BUN_DEBUG_SKIP_BIGINT_BINDINGS = "1";

import express from "express";
import type { Request, Response, NextFunction } from "express";
import { authMiddleware } from "./middleware";
import { prismaClient } from "db/client";
import cors from "cors";
import { Connection } from "@solana/web3.js";
const app = express();
const connection = new Connection("https://api.mainnet-beta.solana.com");

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}));

app.use(express.json());

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Helper function for async error handling
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => 
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

// Create website
app.post("/api/v1/website", authMiddleware, asyncHandler(async (req, res) => {
  const userId = req.userId!;
  const { url } = req.body;

  if (!url) {
    res.status(400).json({ error: "URL is required" });
    return;
  }

  const data = await prismaClient.website.create({
    data: { userId, url }
  });

  res.json({ id: data.id });
}));

// Get website status
app.get("/api/v1/website/status", authMiddleware, asyncHandler(async (req, res) => {
  const websiteId = req.query.websiteId as string;
  const userId = req.userId;

  if (!websiteId) {
    res.status(400).json({ error: "websiteId is required" });
    return;
  }

  const data = await prismaClient.website.findFirst({
    where: { id: websiteId, userId, disabled: false },
    include: { ticks: true }
  });

  if (!data) {
    res.status(404).json({ error: "Website not found" });
    return;
  }

  res.json(data);
}));

// List all websites
app.get("/api/v1/websites", authMiddleware, asyncHandler(async (req, res) => {
  const userId = req.userId!;
  const websites = await prismaClient.website.findMany({
    where: { userId, disabled: false },
    include: { ticks: true }
  });
  res.json({ websites });
}));

// Delete website
app.delete("/api/v1/website", authMiddleware, asyncHandler(async (req, res) => {
  const { websiteId } = req.body;
  const userId = req.userId!;

  if (!websiteId) {
    res.status(400).json({ error: "websiteId is required" });
    return;
  }

  await prismaClient.website.update({
    where: { id: websiteId, userId },
    data: { disabled: true }
  });

  res.json({ message: "Website disabled successfully" });
}));

// Payout endpoint (placeholder)
app.post("/api/v1/payout/:validatorId", asyncHandler(async (req, res) => {
  res.status(501).json({ message: "Payout endpoint not implemented" });
}));

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start server
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

// Handle shutdown gracefully
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});

export { app };