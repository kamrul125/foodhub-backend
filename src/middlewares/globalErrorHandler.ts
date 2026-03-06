import { Request, Response, NextFunction } from "express";
// যদি default export হয়ে থাকে, তবে {} ছাড়া ইমপোর্ট করুন
import AppError from "../utils/AppError"; 

export const globalErrorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // ১. ডিফল্ট ভ্যালু সেট করা
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // ২. প্রিজমা এরর হ্যান্ডলিং (Prisma errors)
  let message = err.message;

  if (err.code === "P2025") {
    err.statusCode = 404;
    message = "Resource not found";
  }

  if (err.code === "P2002") {
    err.statusCode = 409;
    message = "Duplicate value exists";
  }

  // ৩. ফাইনাল রেসপন্স
  res.status(err.statusCode).json({
    status: err.status, // এটি এখন 'fail' অথবা 'error' দেখাবে
    message: message,
  });
};