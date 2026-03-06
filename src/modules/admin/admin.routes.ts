import { Router } from "express";
import { protect } from "../../middlewares/auth";
import { roleGuard } from "../../middlewares/roleGuard";
import * as adminController from "./admin.controller";

const router = Router();

router.use(protect);
router.use(roleGuard("ADMIN"));

router.get("/users", adminController.getAllUsers);
router.get("/orders", adminController.getAllOrders);

export default router;