import express from "express";
import {
  createProvince,
  removeProvince,
  getAllProvinces,
  updateProvince,
} from "../controllers/province.controller.js";

import protect from "../middlewares/auth.middleware.js";
import adminAuthorize from "../middlewares/adminAuthorize.js";

const router = express.Router();
router.get("/", getAllProvinces);

router.post("/create", protect, adminAuthorize, createProvince);
router.put("/:id", protect, adminAuthorize, updateProvince);
router.delete("/:id", protect, adminAuthorize, removeProvince);

export default router;
