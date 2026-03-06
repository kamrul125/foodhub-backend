import { Request, Response, NextFunction } from "express";

export const roleGuard =
  (...allowedRoles: ("USER" | "SELLER" | "ADMIN")[]) =>
  (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };