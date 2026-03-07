import { Request, Response, NextFunction } from "express";

import AppError from "../utils/AppError"; 

export const globalErrorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";


  let message = err.message;

  if (err.code === "P2025") {
    err.statusCode = 404;
    message = "Resource not found";
  }

  if (err.code === "P2002") {
    err.statusCode = 409;
    message = "Duplicate value exists";
  }

  res.status(err.statusCode).json({
    status: err.status, 
    message: message,
  });
};