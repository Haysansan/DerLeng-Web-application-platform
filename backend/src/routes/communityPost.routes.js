import express from "express";

import {
  createCommunityPost,
  getAllCommunityPosts,
  getCommunityPostById,
  deleteCommunityPost,
  updateCommunityPost,
} from "../controllers/communityPost.controller.js";

import protect from "../middlewares/auth.middleware.js";
import adminAuthorize from "../middlewares/adminAuthorize.js";
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

// Create community post (Admin only + images)
router.post(
  "/",
  protect,
  adminAuthorize,
  upload.array("images", 5),
  createCommunityPost,
);

// Get all community posts
router.get("/", getAllCommunityPosts);

// Get single community post
router.get("/:id", getCommunityPostById);

// Update community post
router.put(
  "/:id",
  protect,
  adminAuthorize,
  upload.array("images", 5),
  updateCommunityPost,
);

// Delete community post
router.delete("/:id", protect, adminAuthorize, deleteCommunityPost);

export default router;
