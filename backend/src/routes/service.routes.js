import express from "express";

import {
  createService,
  getServicesByCommunity,
  updateService,
  deleteService,
} from "../controllers/communityServices.controller.js";

import protect from "../middlewares/auth.middleware.js";
import adminAuthorize from "../middlewares/adminAuthorize.js";

const router = express.Router();

// Add service to community (Admin only)
router.post(
  "/community/:communityId/service",
  protect,
  adminAuthorize,
  createService,
);

// Get services of community
router.get("/community/:communityId/service", getServicesByCommunity);

// Update service
router.put("/service/:serviceId", protect, adminAuthorize, updateService);

// Delete service
router.delete("/service/:serviceId", protect, adminAuthorize, deleteService);

export default router;
