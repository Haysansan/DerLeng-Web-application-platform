import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/users.controller.js";

import protect from "../middlewares/auth.middleware.js";
import adminAuthorize from "../middlewares/adminAuthorize.js";

const router = express.Router();

router.get("/", protect, adminAuthorize, getAllUsers);
router.get("/:id",protect, getUserById);
router.put("/:id", protect, updateUser);
router.delete("/:id",protect, adminAuthorize, deleteUser);

export default router;
