import api from "./api";

/* ---------------- GET COMMENTS ---------------- */
export const getComments = async (targetId, targetType) => {
  const res = await api.get(
    `/comments?target_id=${targetId}&target_type=${targetType}`,
  );
  return res.data.data;
};

/* ---------------- ADD COMMENT ---------------- */
export const addComment = async (targetId, targetType, content, token) => {
  const res = await api.post(
    `/comments`,
    {
      target_id: targetId,
      target_type: targetType,
      content,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  return res.data.data;
};

/* ---------------- UPDATE COMMENT ---------------- */
export const updateComment = async (commentId, content, token) => {
  const res = await api.put(
    `/comments/${commentId}`,
    { content },
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  return res.data.data;
};

/* ---------------- DELETE COMMENT ---------------- */
export const deleteComment = async (commentId, token) => {
  const res = await api.delete(`/comments/${commentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data.message;
};

export default {
  getComments,
  addComment,
  updateComment,
  deleteComment,
};
