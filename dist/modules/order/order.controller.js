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
exports.updateOrderStatus = exports.allOrders = exports.myOrders = exports.createOrder = void 0;
const orderService = __importStar(require("./order.service"));
const createOrder = async (req, res) => {
    try {
        const { foodIds } = req.body;
        const order = await orderService.createOrder(req.user.id, foodIds);
        res.status(201).json(order);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.createOrder = createOrder;
const myOrders = async (req, res) => {
    try {
        const orders = await orderService.getMyOrders(req.user.id);
        res.json(orders);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.myOrders = myOrders;
const allOrders = async (_req, res) => {
    try {
        const orders = await orderService.getAllOrders();
        res.json(orders);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.allOrders = allOrders;
// ✅ নতুন যোগ করা: অ্যাডমিন স্ট্যাটাস আপডেট করার কন্ট্রোলার
const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedOrder = await orderService.updateOrderStatus(Number(id), status);
        res.json(updatedOrder);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updateOrderStatus = updateOrderStatus;
