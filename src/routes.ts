import { Router } from "express";
import authRoutes from "./modules/auth/auth.route";
import foodRoutes from "./modules/food/food.route";
import orderRoutes from "./modules/order/order.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/foods", foodRoutes);
router.use("/orders", orderRoutes);

export default router;