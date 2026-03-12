import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  image: { type: [String], required: true, validate: [arrayLimit, 'Product must have at least one image']},
  product_category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductCategory',
    required: true,
  },
  isAvailable: { type: Boolean, default: true }
});

function arrayLimit(val) {
  return val.length > 0;
}

export default mongoose.model("Product", productSchema);