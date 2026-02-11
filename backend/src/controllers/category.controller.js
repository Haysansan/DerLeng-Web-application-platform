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

export const removeCategory = async (req, res) => {
  try {
    await categoryService.remove(req.body);

    res.status(200).json({
      message: "Category removed successfully",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};
