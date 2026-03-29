import express from "express";
import { getUserNotifications } from "../controllers/notification.controller.js";
import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

// GET logged-in user's notifications
router.get("/", protect, getUserNotifications);

export default router;
