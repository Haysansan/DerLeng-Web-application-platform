import api from "./api";

export const getPostsByCategory = async (categoryId) => {
  const res = await api.get("/posts"); // we'll filter on frontend or add query params backend
  return res.data.data.filter(post => post.category_id._id === categoryId);
};

export const getPostsByProvince = async (provinceId) => {
  const res = await api.get("/posts");
  return res.data.data.filter(post => post.province_id._id === provinceId);
};

export const getAllPosts = async () => {
  const res = await api.get("/posts");
  return res.data.data;
};