import Category from "../models/Category.js";

const create = async ({ title }) => {
  const category = await Category.findOne({ title });
  if (category) {
    throw new Error("Catagory already exist");
  }
  return Category.create({ category_name: title });
};

const remove = async ({ title }) => {
  const category = await Category.findOne({ title });
  if (!category) {
    throw new Error("Category not exist");
  }
  return;
};

export default { create, remove };
