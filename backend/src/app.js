import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js";
import userRoutes from "./routes/users.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import provinceRoutes from "./routes/province.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import likeRoutes from "./routes/like.routes.js";
import productRoutes from "./routes/product.routes.js";
import productCategoryRoutes from "./routes/productCategory.routes.js"

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Server Static files (for ckoudinary/local images)
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/provinces", provinceRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/products", productRoutes);
app.use("/api/productCategories", productCategoryRoutes);

export default app;
