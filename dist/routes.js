"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = __importDefault(require("./modules/auth/auth.route"));
const food_route_1 = __importDefault(require("./modules/food/food.route"));
const order_route_1 = __importDefault(require("./modules/order/order.route"));
const router = (0, express_1.Router)();
router.use("/auth", auth_route_1.default);
router.use("/foods", food_route_1.default);
router.use("/orders", order_route_1.default);
exports.default = router;
