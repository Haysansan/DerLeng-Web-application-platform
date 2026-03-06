import express from "express";
import { toggleLike, getLikesCount } from "../controllers/like.controller.js";

import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

// Like / Unlike (Protected)
router.post("/:post_id", protect, toggleLike);

// Get like count
router.get("/:post_id", getLikesCount);

export default router;
