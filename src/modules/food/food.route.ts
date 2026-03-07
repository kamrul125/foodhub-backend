import { Router } from "express";
import * as foodController from "./food.controller";
import { protect } from "../../middlewares/auth";
import { roleGuard } from "../../middlewares/roleGuard";

const router = Router();

// Public
router.get("/", foodController.getAllFoods);

// নির্দিষ্ট খাবার দেখার রুট (এডিট পেজের জন্য)
router.get("/:id", protect, foodController.getFoodById); 

// SELLER only
router.post(
  "/",
  protect,
  roleGuard("SELLER"),
  foodController.createFood
);

router.patch(
  "/:id",
  protect,
  roleGuard("SELLER"),
  foodController.updateFood
);

router.delete(
  "/:id",
  protect,
  roleGuard("SELLER"),
  foodController.deleteFood
);

export default router;