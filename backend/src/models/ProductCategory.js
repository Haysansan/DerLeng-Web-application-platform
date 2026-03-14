import mongoose from "mongoose";

const productCategorySchema = new mongoose.Schema({
  product_category_name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true
  },
}, { timestamps: true }); 

export default mongoose.model("ProductCategory", productCategorySchema);