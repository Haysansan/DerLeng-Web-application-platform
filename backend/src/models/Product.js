import mongoose from "mongoose";
import Category from "./Category";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  image: String,
  product_category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductCategory',
    required: true,
  },
  isAvailable: { type: Boolean, default: true }
});

export default mongoose.model("Product", productSchema);