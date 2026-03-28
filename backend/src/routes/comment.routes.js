import express from "express";
import {
  createComment,
  getComments,
  deleteComment,
  updateComment,
} from "../controllers/comment.controller.js";

import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

//  Add comment (Post or Community)
router.post("/", protect, createComment);

//  Get comments (Post or Community)
router.get("/", getComments);

//  Delete comment (Owner only)
router.delete("/:id", protect, deleteComment);

//  Update comment (Owner only)
router.put("/:id", protect, updateComment);

export default router;
