import { Router } from "express";
import * as foodController from "./food.controller";
import { protect } from "../../middlewares/auth";
import { roleGuard } from "../../middlewares/roleGuard";

const router = Router();

// Public
router.get("/", foodController.getAllFoods);


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