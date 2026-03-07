"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatus = exports.getAllOrders = exports.getMyOrders = exports.createOrder = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createOrder = async (userId, foodIds) => {
    const selectedFoods = await prisma.food.findMany({
        where: { id: { in: foodIds.map(id => Number(id)) } }
    });
    const total = selectedFoods.reduce((sum, food) => sum + food.price, 0);
    return await prisma.order.create({
        data: {
            userId: Number(userId),
            status: "PENDING",
            totalAmount: total,
            foods: {
                connect: foodIds.map((id) => ({ id: Number(id) })),
            },
        },
        include: { foods: true }
    });
};
exports.createOrder = createOrder;
const getMyOrders = async (userId) => {
    return await prisma.order.findMany({
        where: { userId: Number(userId) },
        include: { foods: true },
        orderBy: { createdAt: "desc" }
    });
};
exports.getMyOrders = getMyOrders;
const getAllOrders = async () => {
    return await prisma.order.findMany({
        include: {
            user: { select: { id: true, name: true, email: true } },
            foods: true,
        },
        orderBy: { createdAt: "desc" },
    });
};
exports.getAllOrders = getAllOrders;
// ✅ নতুন যোগ করা: স্ট্যাটাস আপডেট লজিক
const updateOrderStatus = async (orderId, status) => {
    return await prisma.order.update({
        where: { id: orderId },
        data: { status }
    });
};
exports.updateOrderStatus = updateOrderStatus;
