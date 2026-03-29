import api from "./api";

export const getProducts = () => api.get('/products');

export const createProduct = (formData) => api.post('/products', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});

export const updateProduct = (id, formData) => api.put(`/products/${id}`, formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});

export const deleteProduct = (id) => api.delete(`/products/${id}`);

/// Category
export const getProductCategory = () => api.get("/productCategories");

export const createProductCategory = (data) => api.post("/productCategories", data);

export const updateProductCategory = (id, data) => api.put(`/productCategories/${id}`, data);

export const deleteProductCategory = (id) => api.delete(`/productCategories/${id}`);