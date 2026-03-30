import express from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  deletePost,
  updatePost,
  getPostsByUser,
  getTopPosts,
  getPostsByCategory,
  getPostsByProvince,
} from "../controllers/post.controller.js";

import protect from "../middlewares/auth.middleware.js";
import { uploadPost } from "../middlewares/upload.middleware.js";
const router = express.Router();

//get post by category
router.get("/category/:categoryId", getPostsByCategory);
router.get("/province/:provinceId", getPostsByProvince);
//get top post
router.get("/top", getTopPosts);
// Create post (Protected + Image upload)
router.post("/", protect, uploadPost.array("images", 5), createPost);

router.put("/:id", protect, uploadPost.array("images", 5), updatePost);
// Get all posts
router.get("/", getAllPosts);

// Get all posts by a user
router.get("/user/:userId", protect, getPostsByUser);

// Get single post
router.get("/:id", getPostById);

// Delete post
router.delete("/:id", protect, deletePost);

router.put("/:id", protect, updatePost);

export default router;
