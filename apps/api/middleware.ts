import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_PUBLIC_KEY } from "./config";

// Extend Express Request interface to include userId
declare module "express" {
  interface Request {
    userId?: string;
  }
}

// Define the expected shape of the JWT payload
interface JwtPayload {
  sub: string;
  [key: string]: any; // Allow additional properties
}

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  // Extract token from Authorization header (expecting "Bearer <token>")
  const authHeader = req.headers["authorization"];
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;

  if (!token) {
    res.status(401).json({ error: "Unauthorized: No token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_PUBLIC_KEY) as JwtPayload;
    if (!decoded.sub) {
      res.status(401).json({ error: "Unauthorized: Invalid token" });
      return;
    }

    req.userId = decoded.sub;
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
}