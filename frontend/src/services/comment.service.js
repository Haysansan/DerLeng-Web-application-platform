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

/* ---------------- UPDATE COMMENT ---------------- */
export const updateComment = async (commentId, content) => {
  const res = await api.put(`/comments/${commentId}`, {
    content,
  });
  return res.data.data;
};


export default {
  getComments,
  addComment,
  deleteComment,
  updateComment,
};
