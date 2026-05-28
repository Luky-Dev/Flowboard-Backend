import { Role } from "@prisma/client";
import type { Request, Response, NextFunction } from "express";

type Membership = {
  role: Role;
};

export interface AuthRequest extends Request {
  membership?: Membership;
}

const roleHierarchy: Record<Role, number> = {
  MEMBER: 1,
  ADMIN: 2,
  OWNER: 3,
};

export const requireMinRole = (minRole: Role) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const membership = req.membership;

    if (!membership) {
      return res.status(403).json({ error: "No membership found" });
    }

    const userRole = membership.role;

    if (roleHierarchy[userRole] < roleHierarchy[minRole]) {
      return res.status(403).json({ error: "Forbidden" });
    }

    next();
  };
};