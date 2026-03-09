import express from "express";
import {
  login,
  sendVerificationCode,
  verifyCodeAndRegister,
  adminCreateUser,
} from "../controllers/auth.controller.js";
import adminAuthorize from "../middlewares/adminAuthorize.js";
import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/send-code", sendVerificationCode);
router.post("/register", verifyCodeAndRegister);
router.post("/login", login);

// adin only
router.post("/admin-create-user", protect, adminAuthorize, adminCreateUser);

export default router;
