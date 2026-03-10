import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  requestEmailChange,
  verifyEmailChange,
} from "../controllers/users.controller.js";

import protect from "../middlewares/auth.middleware.js";
import adminAuthorize from "../middlewares/adminAuthorize.js";

const router = express.Router();

router.get("/", protect, adminAuthorize, getAllUsers);
router.get("/:id",protect, getUserById);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, deleteUser);

router.post("/change-email/request", protect, requestEmailChange);

router.post("/change-email/verify", protect, verifyEmailChange);

export default router;
