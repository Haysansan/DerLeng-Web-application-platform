import productService from "../services/product.service"

export const getProduct = async (req, res) => {
  try {
    const product = await productService.getAll(req.query);
    res.status(200).json({
      success: true,
      coout: product.length,
      data: product
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
}

export const getProductById = async (req, res) => {
  try {
    const product = await productService.getById(req.params.id);
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
}

export const createProduct = async (req, res) => {
  try {
    const product = await productService.create(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

export const updateProduct = async (req, res) => {
  try {
    const product = await productService.update(req.params.id, req.body);
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const process = await productService.remove(req.params.id);
    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
}