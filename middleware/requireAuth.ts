import { Request, Response, NextFunction } from "express";
import { verifyJWTFromRequest } from "../services/auth";
import { getUserByEmail } from "../DA/user";

async function getAuthenticatedUser(req: Request): Promise<any> {
  const userPayload = await verifyJWTFromRequest(req);
  if (!userPayload) return null;
  const user = await getUserByEmail(userPayload.email);
  return user || null;
}

export async function requireAuth(
  req: Request & { session?: any },
  res: Response,
  next: NextFunction
) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) {
      return res.status(401).json({ error: "Authentication required or user not found" });
    }
    if (req.session) {
      req.session.user = user;
    }
    (req as any).user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or missing token" });
  }
}

export async function requireKitchenUser(
  req: Request & { session?: any },
  res: Response,
  next: NextFunction
) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) {
      return res.status(401).json({ error: "Authentication required or user not found" });
    }
    if (!user.kitchenId) {
      return res.status(403).json({ error: "User does not have a kitchen assigned" });
    }
    if (req.session) {
      req.session.user = user;
    }
    (req as any).user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or missing token" });
  }
}
