import ProductCategory from "../models/ProductCategory";

const create = async ({ title }) => {
  const productCategory = await ProductCategory.findOne({ title });
  if (productCategory) {
    throw new Error("Catagory already exist");
  }
  return ProductCategory.create({ product_category_name: title });
};

const remove = async (id) => {
  const productCategory = await ProductCategory.findByIdAndDelete(id);

  if (!productCategory) {
    throw new Error("Category not found");
  }

  return { message: "Category deleted" };
};

const getAll = async () => {
  return await ProductCategory.find().sort({ product_category_name: 1 });
};

const update = async (id, { title }) => {
  const productCategory = await ProductCategory.findById(id);

  if (!productCategory) {
    throw new Error("Category not found");
  }

  productCategory.product_category_name = title;

  return await productCategory.save();
};

export default { create, getAll, update, remove };
