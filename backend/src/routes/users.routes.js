import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  requestEmailChange,
  verifyEmailChange,
  uploadProfileImage,
  changePassword,
} from "../controllers/users.controller.js";

import protect from "../middlewares/auth.middleware.js";
import adminAuthorize from "../middlewares/adminAuthorize.js";
import uploadProfile from "../middlewares/uploadProfile.js";

const router = express.Router();

router.put("/change-password", protect, changePassword);

router.get("/", protect, adminAuthorize, getAllUsers);
router.get("/:id",protect, getUserById);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, deleteUser);

router.post("/change-email/request", protect, requestEmailChange);

router.post("/change-email/verify", protect, verifyEmailChange);
router.post("/upload-profile", protect, uploadProfile.single("image"), uploadProfileImage);


export default router;
