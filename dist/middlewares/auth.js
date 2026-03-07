"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const AppError_1 = __importDefault(require("../utils/AppError")); // আপনার কাস্টম এরর ক্লাস
const asyncHandler_1 = require("./asyncHandler"); // আপনার asyncHandler
const prisma = new client_1.PrismaClient();
exports.protect = (0, asyncHandler_1.asyncHandler)(async (req, // সাময়িকভাবে any দিলে এরর কম হবে, অথবা Request টাইপ এক্সটেন্ড করতে পারেন
res, next) => {
    let token;
    // ১. হেডার থেকে টোকেন নেওয়া
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    // ২. টোকেন না থাকলে আপনার AppError ব্যবহার করুন
    if (!token) {
        return next(new AppError_1.default("Not authorized, please login", 401));
    }
    try {
        // ৩. টোকেন ভেরিফাই করা
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "your_secret_key");
        // ৪. ডাটাবেসে ইউজার আছে কি না চেক করা
        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
        });
        if (!user) {
            return next(new AppError_1.default("User no longer exists", 401));
        }
        // ৫. রিকোয়েস্টে ইউজারকে সেট করা (যাতে roleGuard এবং Controller এটি পায়)
        req.user = user;
        next();
    }
    catch (error) {
        return next(new AppError_1.default("Invalid token or expired", 401));
    }
});
