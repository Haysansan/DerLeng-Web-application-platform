import api from "./api";

/* ---------------- GET COMMENTS ---------------- */
export const getComments = async (targetId, targetType) => {
  const res = await api.get(
    `/comments?target_id=${targetId}&target_type=${targetType}`,
  );
  return res.data.data;
};

/* ---------------- ADD COMMENT ---------------- */
export const addComment = async ({ target_id, target_type, content }) => {
  const res = await api.post(`/comments`, {
    target_id,
    target_type,
    content,
  });

  return res.data.data;
};

/* ---------------- DELETE COMMENT ---------------- */
export const deleteComment = async (commentId) => {
  const res = await api.delete(`/comments/${commentId}`);
  return res.data.message;
};

export default {
  getComments,
  addComment,
  deleteComment,
};
