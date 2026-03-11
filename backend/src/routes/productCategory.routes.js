import express from "express"
import protect from "../middlewares/auth.middleware.js";
import adminAuthorize from "../middlewares/adminAuthorize.js";
import { validateProductCategory } from "../middlewares/validators.js";
import {
  createProductCategory,
  deleteProductCategory,
  getProductCategory,
  updateProdcutCategory
} from "../controllers/productCategory.controller.js";

const router = express.Router();

router.post(
  "/",
  protect,
  adminAuthorize,
  validateProductCategory,
  createProductCategory,
);

router.get("/",  getProductCategory);

router.delete("/:id", protect, adminAuthorize, deleteProductCategory);

router.put(
  "/:id",
  protect,
  adminAuthorize,
  validateProductCategory,
  updateProdcutCategory,
);

export default router;