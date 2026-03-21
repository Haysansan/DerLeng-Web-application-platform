import Favorite from "../models/Favorite.js";

/* ---------------- TOGGLE FAVORITE ---------------- */
export const toggleFavoriteService = async (userId, target_id, target_type) => {
  const existing = await Favorite.findOne({
    user_id: userId,
    target_id,
    target_type,
  });

  if (existing) {
    await existing.deleteOne();
    return { favorited: false };
  }

  await Favorite.create({
    user_id: userId,
    target_id,
    target_type,
  });

  return { favorited: true };
};

/* ---------------- GET USER FAVORITES ---------------- */
export const getUserFavoritesService = async (
  userId,
  target_type, // optional filter
) => {
  const query = { user_id: userId };

  if (target_type) {
    query.target_type = target_type;
  }

  const favorites = await Favorite.find(query)
    .populate("target_id") // 🔥 dynamic populate
    .sort({ created_at: -1 });

  return favorites;
};
