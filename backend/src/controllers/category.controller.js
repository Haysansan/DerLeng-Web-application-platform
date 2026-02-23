import categoryService from "../services/category.service.js";

export const createCategory = async (req, res) => {
  try {
    const category = await categoryService.create(req.body);

    res.status(201).json({
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAll();

    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const category = await categoryService.update(req.params.id, req.body);

    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const removeCategory = async (req, res) => {
  try {
    await categoryService.remove(req.params.id);

    res.status(200).json({
      message: "Category removed successfully",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};
