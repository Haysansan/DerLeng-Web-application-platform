import express from "express";
import { getAdminOrders, getMyOrders, placeOrder, updateStatus } from "../controllers/order.controller.js";
import { uploadOrder } from "../middlewares/upload.middleware.js"; 
import protect from "../middlewares/auth.middleware.js";
import adminAuthorize from "../middlewares/adminAuthorize.js";

const router = express.Router();

router.post("/", uploadOrder.single("transaction_image"), protect, placeOrder);
router.get("/user/:userId", protect, getMyOrders);

router.get("/admin/all", protect, adminAuthorize, getAdminOrders); 
router.put("/:id/status", protect, adminAuthorize, updateStatus); 
export default router;
