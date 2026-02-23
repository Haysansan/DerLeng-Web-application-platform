import express from "express";
import {
  createCategory,
  removeCategory,
  getAllCategories,
  updateCategory,
} from "../controllers/category.controller.js";
import adminAuthorize from "../middlewares/adminAuthorize.js";

const router = express.Router();

router.post("/create", protect, adminAuthorize, createCategory);

router.put("/:id", protect, adminAuthorize, updateCategory);
router.delete("/:id", protect, adminAuthorize, removeCategory);

router.get("/", getAllCategories);

export default router;



