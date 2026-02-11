import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js";
import userRoutes from "./routes/users.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import provinceRoutes from "./routes/province.routes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/image_uploads", express.static("image_uploads"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/provinces", provinceRoutes);

export default app;
