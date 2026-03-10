// frontend/src/services/comment.service.js
import api from "./api";

// Get all comments for a post
export const getCommentsByPost = async (postId) => {
  const res = await api.get(`/comments/post/${postId}`);
  return res.data.data; // your backend returns { data: comments }
};

// Add a new comment (requires auth token)
export const addComment = async (postId, content, token) => {
  const res = await api.post(
    `/comments/`,
    { post_id: postId, content },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data.data;
};

// Update a comment (owner only, requires auth token)
export const updateComment = async (commentId, content, token) => {
  const res = await api.put(
    `/comments/${commentId}`,
    { content },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data.data;
};

// Delete a comment (owner only, requires auth token)
export const deleteComment = async (commentId, token) => {
  const res = await api.delete(`/comments/${commentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.message;
};

export default {
  getCommentsByPost,
  addComment,
  updateComment,
  deleteComment,
};