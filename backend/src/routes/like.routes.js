import express from "express";
import {
  toggleLike,
  getLikesCount,
  isLiked,
} from "../controllers/like.controller.js";

import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/toggle", protect, toggleLike);

router.get("/count", getLikesCount);
router.get("/is-liked", protect, isLiked);

export default router;
