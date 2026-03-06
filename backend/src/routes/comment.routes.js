import express from "express";
import {
  createComment,
  getCommentsByPost,
  deleteComment,
} from "../controllers/comment.controller.js";

import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

// Add comment (Protected)
router.post("/", protect, createComment);

// Get comments by post
router.get("/post/:post_id", getCommentsByPost);

// Delete comment (Owner only)
router.delete("/:id", protect, deleteComment);

export default router;
