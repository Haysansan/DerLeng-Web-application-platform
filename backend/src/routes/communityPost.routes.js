import express from "express";

import {
  createCommunityPost,
  getAllCommunityPosts,
  getCommunityPostById,
  deleteCommunityPost,
  updateCommunityPost,
  getCommunityByProvince, 
} from "../controllers/communityPost.controller.js";

import protect from "../middlewares/auth.middleware.js";
import adminAuthorize from "../middlewares/adminAuthorize.js";
import { uploadCommunity } from "../middlewares/upload.middleware.js";

const router = express.Router();

// Create community post (Admin only + images)
router.post(
  "/",
  protect,
  adminAuthorize,
  uploadCommunity.array("images", 10),
  createCommunityPost,
);

// MUST BE FIRST (safe route grouping)
router.get("/province/:provinceId", getCommunityByProvince);

// then normal routes
router.get("/", getAllCommunityPosts);
router.get("/:id", getCommunityPostById);

// Update community post
router.put(
  "/:id",
  protect,
  adminAuthorize,
  uploadCommunity.array("images", 10),
  updateCommunityPost,
);

// Delete community post
router.delete("/:id", protect, adminAuthorize, deleteCommunityPost);

export default router;
