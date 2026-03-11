import express from "express";
import protect from "../middlewares/auth.middleware.js";
import adminAuthorize from "../middlewares/adminAuthorize.js";
import uploadProduct from "../middlewares/upload.middleware.js";
import { validateProduct } from "../middlewares/validators.js";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/prduct.controller.js";

const router = express.Router();

router.post(
  "/",
  protect,
  adminAuthorize,
  uploadProduct.array("image", 5),
  validateProduct,
  createProduct,
);

router.get("/", getProducts);

router.get("/:id", getProductById);

router.delete("/:id", protect, adminAuthorize, deleteProduct);

router.put("/:id", protect, adminAuthorize, uploadProduct.array("image", 5), updateProduct);

export default router;
