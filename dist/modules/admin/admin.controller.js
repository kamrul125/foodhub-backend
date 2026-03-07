"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllOrders = exports.getAllUsers = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// সব ইউজারদের দেখার জন্য
const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
            },
        });
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
};
exports.getAllUsers = getAllUsers;
// সব অর্ডার দেখার জন্য
const getAllOrders = async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                foods: true, // আপনার স্কিমায় রিলেশন নাম 'foods'
            },
        });
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching orders", error: error.message });
    }
};
exports.getAllOrders = getAllOrders;
