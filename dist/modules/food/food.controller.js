"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFood = exports.updateFood = exports.getAllFoods = exports.createFood = void 0;
const foodService = __importStar(require("./food.service"));
// Create Food
const createFood = async (req, res) => {
    try {
        const { title, price } = req.body;
        const food = await foodService.createFood(req.user.id, title, price);
        res.status(201).json(food);
    }
    catch (error) {
        res.status(400).json({
            message: error.message || "Failed to create food",
        });
    }
};
exports.createFood = createFood;
// Get All Foods (Public)
const getAllFoods = async (_req, res) => {
    try {
        const foods = await foodService.getAllFoods();
        res.json(foods);
    }
    catch (error) {
        res.status(400).json({
            message: error.message || "Failed to fetch foods",
        });
    }
};
exports.getAllFoods = getAllFoods;
// Update Food
const updateFood = async (req, res) => {
    try {
        const foodId = Number(req.params.id);
        const food = await foodService.updateFood(foodId, req.user.id, req.body);
        res.json(food);
    }
    catch (error) {
        res.status(400).json({
            message: error.message || "Failed to update food",
        });
    }
};
exports.updateFood = updateFood;
// Delete Food
const deleteFood = async (req, res) => {
    try {
        const foodId = Number(req.params.id);
        await foodService.deleteFood(foodId, req.user.id);
        res.json({ message: "Food deleted successfully" });
    }
    catch (error) {
        res.status(400).json({
            message: error.message || "Failed to delete food",
        });
    }
};
exports.deleteFood = deleteFood;
