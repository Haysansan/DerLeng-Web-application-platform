import ProductCategory from "../models/ProductCategory";

const create = async ({ title }) => {
  const product_category = await ProductCategory.findOne({ title });
  if (product_category) {
    throw new Error("Catagory already exist");
  }
  return ProductCategory.create({ product_category_name: title });
};

const remove = async (id) => {
  const product_category = await ProductCategory.findByIdAndDelete(id);

  if (!product_category) {
    throw new Error("Category not found");
  }

  return { message: "Category deleted" };
};

const getAll = async () => {
  return await ProductCategory.find().sort({ product_category_name: 1 });
};

const update = async (id, { title }) => {
  const product_category = await ProductCategory.findById(id);

  if (!product_category) {
    throw new Error("Category not found");
  }

  product_category.product_category_name = title;

  return await product_category.save();
};

export default { create, getAll, update, remove };
