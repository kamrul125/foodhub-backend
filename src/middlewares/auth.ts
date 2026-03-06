import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import AppError from "../utils/AppError"; // আপনার কাস্টম এরর ক্লাস
import { asyncHandler } from "./asyncHandler";// আপনার asyncHandler

const prisma = new PrismaClient();

interface JwtPayload {
  id: number;
  role: "USER" | "SELLER" | "ADMIN";
}

export const protect = asyncHandler(async (
  req: any, // সাময়িকভাবে any দিলে এরর কম হবে, অথবা Request টাইপ এক্সটেন্ড করতে পারেন
  res: Response,
  next: NextFunction
) => {
  let token;

  // ১. হেডার থেকে টোকেন নেওয়া
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  // ২. টোকেন না থাকলে আপনার AppError ব্যবহার করুন
  if (!token) {
    return next(new AppError("Not authorized, please login", 401));
  }

  try {
    // ৩. টোকেন ভেরিফাই করা
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your_secret_key"
    ) as JwtPayload;

    // ৪. ডাটাবেসে ইউজার আছে কি না চেক করা
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return next(new AppError("User no longer exists", 401));
    }

    // ৫. রিকোয়েস্টে ইউজারকে সেট করা (যাতে roleGuard এবং Controller এটি পায়)
    req.user = user; 
    next();
    
  } catch (error) {
    return next(new AppError("Invalid token or expired", 401));
  }
});