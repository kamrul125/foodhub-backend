import { Router } from "express";
import * as orderController from "./order.controller";
import { protect } from "../../middlewares/auth";
import { roleGuard } from "../../middlewares/roleGuard";

const router = Router();

// ✅ USER + SELLER can create order
router.post(
  "/",
  protect,
  roleGuard("USER", "SELLER"),
  orderController.createOrder
);

// ✅ USER + SELLER can see own orders
router.get(
  "/me",
  protect,
  roleGuard("USER", "SELLER"),
  orderController.myOrders
);

// ✅ Only ADMIN can see all orders
router.get(
  "/",
  protect,
  roleGuard("ADMIN"),
  orderController.allOrders
);

export default router;