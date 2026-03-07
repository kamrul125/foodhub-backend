"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../config/prisma"));
async function seedAdmin() {
    try {
        const adminEmail = "admin2@foodhub.com";
        const existingAdmin = await prisma_1.default.user.findUnique({
            where: { email: adminEmail },
        });
        if (existingAdmin) {
            console.log("✅ Admin already exists");
            return;
        }
        const hashedPassword = await bcrypt_1.default.hash("admin123", 10);
        const admin = await prisma_1.default.user.create({
            data: {
                name: "Super Admin",
                email: adminEmail,
                password: hashedPassword,
                role: "ADMIN",
            },
        });
        console.log("🎉 Admin created successfully");
        console.log({
            email: admin.email,
            password: "admin123",
            role: admin.role,
        });
    }
    catch (error) {
        console.error("❌ Error seeding admin:", error);
    }
    finally {
        await prisma_1.default.$disconnect();
    }
}
seedAdmin();
