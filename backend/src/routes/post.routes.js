import express from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  deletePost,
  updatePost,
  getPostsByUser
} from "../controllers/post.controller.js";

import protect from "../middlewares/auth.middleware.js";
import {uploadPost} from "../middlewares/upload.middleware.js";
const router = express.Router();

// Create post (Protected + Image upload)
router.post("/", protect, uploadPost.array("images", 5), createPost);

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
