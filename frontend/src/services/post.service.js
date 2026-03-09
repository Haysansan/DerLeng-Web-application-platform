import api from "./api";

export const getPostsByCategory = async (categoryId) => {
  const res = await api.get(`/posts/category/${categoryId}`);
  return res.data;
};

export const getPostsByProvince = async (provinceId) => {
  const res = await api.get(`/posts/province/${provinceId}`);
  return res.data;
};

export const getAllPosts = async () => {
  const res = await api.get("/posts");
  return res.data;
};