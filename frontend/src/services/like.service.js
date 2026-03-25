import api from "./api";

/* ---------------- TOGGLE LIKE ---------------- */
export const toggleLike = async (targetId, targetType, token) => {
  const res = await api.post(
    `/likes/toggle`,
    {
      target_id: targetId,
      target_type: targetType,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  return res.data; 
};

/* ---------------- GET LIKE COUNT ---------------- */
export const getLikesCount = async (targetId, targetType) => {
  const res = await api.get(
    `/likes/count?target_id=${targetId}&target_type=${targetType}`,
  );

  return res.data; // { likes: number }
};

export const isLiked = async (targetId, targetType, token) => {
  const res = await api.get(
    `/likes/is-liked?target_id=${targetId}&target_type=${targetType}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  return res.data; // { liked: true/false }
};

export default {
  toggleLike,
  getLikesCount,
  isLiked,
};
