"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../../config/prisma"));
const JWT_SECRET = process.env.JWT_SECRET || "secret";
// ২. role এর টাইপ string এর বদলে Role করে দিন
const registerUser = async (name, email, password, role) => {
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    const user = await prisma_1.default.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role // এখন আর টাইপ নিয়ে সমস্যা হবে না
        }
    });
    return user;
};
exports.registerUser = registerUser;
const loginUser = async (email, password) => {
    const user = await prisma_1.default.user.findUnique({ where: { email } });
    if (!user)
        throw new Error("User not found");
    const isValid = await bcrypt_1.default.compare(password, user.password);
    if (!isValid)
        throw new Error("Invalid credentials");
    // টোকেনের ভেতরেও ইউজার রোল পাস করা হচ্ছে
    const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1d" });
    return { token, user };
};
exports.loginUser = loginUser;
