import Product from "../models/Product.js";
import ProductCategory from "../models/ProductCategory.js";

const create = async ({ title }) => {
  const productCategory = await ProductCategory.findOne({ title });
  if (productCategory) {
    throw new Error("Catagory already exist");
  }
  return ProductCategory.create({ product_category_name: title });
};
///Remove category and deal with orphan product and move it to general category when the product has no category
const remove = async (id) => {
  let generalCategory = await ProductCategory.findOne({ product_category_name: "General" });

  if (!generalCategory) {
    generalCategory = await ProductCategory.create({ product_category_name: "General", title: "General" });
  }

  if (generalCategory._id.toString() === id) {
    throw new Error("The General category cannot be deleted.");
  }
  await Product.updateMany({ product_category: id }, { product_category: generalCategory._id });

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
