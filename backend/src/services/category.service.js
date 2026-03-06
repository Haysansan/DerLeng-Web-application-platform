import Category from "../models/Category.js";

const create = async ({ title }) => {
  const category = await Category.findOne({ title });
  if (category) {
    throw new Error("Catagory already exist");
  }
  return Category.create({ category_name: title });
};

const remove = async (id) => {
  const category = await Category.findById(id);

  if (!category) {
    throw new Error("Category not found");
  }

  await Category.findByIdAndDelete(id);
};


const getAll = async () => {
  return await Category.find().sort({ category_name: 1 });
};

const update = async (id, { title }) => {
  const category = await Category.findById(id);

  if (!category) {
    throw new Error("Category not found");
  }

  category.category_name = title;

  return await category.save();
};

export default { create, getAll, update, remove };
