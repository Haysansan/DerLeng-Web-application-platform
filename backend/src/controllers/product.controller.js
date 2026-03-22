import productService from "../services/product.service.js"

export const getProducts = async (req, res) => {
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
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "Product image is required" });
    }

    const imageUrl = req.file.map((file) => file.path);

    const product = await productService.create({
      ...req.body,
      image: imageUrl,
    });
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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
    await productService.remove(req.params.id);
    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
}