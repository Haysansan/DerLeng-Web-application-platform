import express from "express";
import {
  createCategory,
  removeCategory,
} from "../controllers/category.controller.js";

const router = express.Router();

router.post("/create", createCategory);

router.delete("/remove", removeCategory);

export default router;
