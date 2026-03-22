import express from "express";
import {
  toggleFavorite,
  getUserFavorites,
} from "../controllers/favorite.controller.js";

import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/toggle", protect, toggleFavorite);

router.get("/", protect, getUserFavorites);

export default router;
