import Favorite from "../models/Favorite.js";

/* ---------------- TOGGLE FAVORITE ---------------- */
export const toggleFavoriteService = async (userId, postId) => {
  const existing = await Favorite.findOne({
    user_id: userId,
    post_id: postId,
  });

  if (existing) {
    await existing.deleteOne();
    return { favorited: false };
  }

  await Favorite.create({
    user_id: userId,
    post_id: postId,
  });

  return { favorited: true };
};

/* ---------------- GET USER FAVORITES ---------------- */
export const getUserFavoritesService = async (userId) => {
  const favorites = await Favorite.find({ user_id: userId })
    .populate("post_id")
    .sort({ created_at: -1 });

  return favorites;
};
