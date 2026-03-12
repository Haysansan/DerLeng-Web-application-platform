import Product from "../models/Product.js";

const create = async (productData) => {
  return await Product.create(productData);
};

const getAll = async () => {
  return await Product.find()
  .populate("product_category_id", "product_category_name").sort({createdAt: -1 })
}

const getById = async (id) => {
  const product = await Product.findById(id)
    .populate("product_category_id", "product_category_name");
  
  if (!product) {
    throw new Error("Product not found");
  }

  return product;
}

const update = async (id, updateData) => {
  const product = await Product.findByIdAndUpdate(id, updateData,
  {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new Error("Product not found")
  }

  return product;
}

const remove = async (id) => {
  const linkedProducts = await Product.findOne({ product_category: id });
  
  if (linkedProducts) {
    throw new Error("Cannot delete: This category still has products linked to it.")
  }

  const product = await Product.findById(id);

  if (!product) {
    throw new Error("Product not found");
  }

  await Product.findByIdAndDelete(id);
}

export default {
  create,
  getAll,
  getById,
  update,
  remove,
}