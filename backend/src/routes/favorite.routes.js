import express from "express";
import {
  toggleFavorite,
  getUserFavorites,
} from "../controllers/favorite.controller.js";

import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

// Toggle favorite
router.post("/:postId", protect, toggleFavorite);

// Get my favorites
router.get("/", protect, getUserFavorites);

export default router;
