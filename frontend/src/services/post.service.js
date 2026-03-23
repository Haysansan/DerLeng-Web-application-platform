import api from "./api.js";

/* ---------------- GET POST ---------------- */
export const getPostById = async (postId) => {
  const res = await api.get(`/posts/${postId}`);
  return res.data;
};

const getAllPosts = async () => {
  const res = await api.get("/posts");
  return res.data.data;
};

/* ---------------- LIKE (UPDATED) ---------------- */
const toggleLike = async (postId) => {
  const res = await api.post(`/likes/toggle`, {
    target_id: postId,
    target_type: "Post",
  });

  return res.data; // { liked: true/false }
};

const getLikesCount = async (postId) => {
  const res = await api.get(
    `/likes/count?target_id=${postId}&target_type=Post`,
  );

  return res.data.likes;
};

/* ---------------- USER POSTS ---------------- */
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
