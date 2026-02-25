import express from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  deletePost,
} from "../controllers/post.controller.js";

import protect from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";
import adminAuthorize from "../middlewares/adminAuthorize.js";
const router = express.Router();

// Create post (Protected + Image upload)
router.post("/", protect, upload.single("image"), createPost);

// Get all posts
router.get("/", protect, adminAuthorize, getAllPosts);

// Get single post
router.get("/:id", getPostById);

// Delete post (Owner only)
router.delete("/:id", protect, deletePost);

export default router;
