import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import AppError from "../utils/AppError"; 
import { asyncHandler } from "./asyncHandler";

const prisma = new PrismaClient();

interface JwtPayload {
  id: number;
  role: "USER" | "SELLER" | "ADMIN";
}

export const protect = asyncHandler(async (
  req: any, 
  res: Response,
  next: NextFunction
) => {
  let token;


  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

 
  if (!token) {
    return next(new AppError("Not authorized, please login", 401));
  }

  try {
  
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your_secret_key"
    ) as JwtPayload;

    
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return next(new AppError("User no longer exists", 401));
    }

 
    req.user = user; 
    next();
    
  } catch (error) {
    return next(new AppError("Invalid token or expired", 401));
  }
});