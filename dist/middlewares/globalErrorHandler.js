"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const globalErrorHandler = (err, _req, res, _next) => {
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
exports.globalErrorHandler = globalErrorHandler;
