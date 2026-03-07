"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFood = exports.updateFood = exports.getAllFoods = exports.createFood = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
// Create Food (SELLER)
const createFood = async (sellerId, title, price) => {
    if (!title || !price) {
        throw new Error("title and price are required");
    }
    return prisma_1.default.food.create({
        data: {
            title,
            price,
            sellerId,
        },
    });
};
exports.createFood = createFood;
// Get All Foods (Public)
const getAllFoods = async () => {
    return prisma_1.default.food.findMany({
        include: {
            seller: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });
};
exports.getAllFoods = getAllFoods;
// Update Food (SELLER – own food only)
const updateFood = async (foodId, sellerId, data) => {
    const food = await prisma_1.default.food.findUnique({
        where: { id: foodId },
    });
    if (!food) {
        throw new Error("Food not found");
    }
    if (food.sellerId !== sellerId) {
        throw new Error("You are not allowed to update this food");
    }
    return prisma_1.default.food.update({
        where: { id: foodId },
        data,
    });
};
exports.updateFood = updateFood;
// Delete Food (SELLER – own food only)
const deleteFood = async (foodId, sellerId) => {
    const food = await prisma_1.default.food.findUnique({
        where: { id: foodId },
    });
    if (!food) {
        throw new Error("Food not found");
    }
    if (food.sellerId !== sellerId) {
        throw new Error("You are not allowed to delete this food");
    }
    return prisma_1.default.food.delete({
        where: { id: foodId },
    });
};
exports.deleteFood = deleteFood;
