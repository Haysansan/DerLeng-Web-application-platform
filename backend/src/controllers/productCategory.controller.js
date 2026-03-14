import productCategoryService from "../services/productCategory.service.js"

export const createProductCategory = async (req, res) => {
  try {
    const productCategory = await productCategoryService.create(req.body);

    res.status(201).json({
      success: true,
      data: productCategory,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}

export const getProductCategory = async (req, res) => {
  try {
    const productCategory = await productCategoryService.getAll();
    res.status(200).json({
      success: true,
      count: productCategory.length,
      data: productCategory,
    })
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
}

export const updateProdcutCategory = async (req, res) => {
  try {
    const updateProdcutCategory = await productCategoryService.update(req.params.id, req.body);
    res.status(200).json({ success: true, data: updateProdcutCategory });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
}

export const deleteProductCategory = async (req, res) => {
  try {
    await productCategoryService.remove(req.params.id);
    res.status(200).json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}