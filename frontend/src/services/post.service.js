// src/services/post.service.js
import api from "./api.js";

export const getPostById = async (postId) => {
  const res = await api.get(`/posts/${postId}`);
  return res.data;
};

const getAllPosts = async () => {
  const res = await api.get("/posts");
  return res.data.data;
};

const toggleLike = async (postId) => {
  const res = await api.post(`/likes/${postId}`);
  return res.data;
};

const getLikesCount = async (postId) => {
  const res = await api.get(`/likes/${postId}`);
  return res.data.likes;
};

// services/postService.js

export const getPostsByUser = async (userId, token) => {
  const res = await api.get(`/posts/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data || [];
};
export default {
  getAllPosts,
  toggleLike,
  getLikesCount,
  getPostById,
  getPostsByUser,
};