import {
  toggleFavoriteService,
  getUserFavoritesService,
} from "../services/favorite.service.js";

/* ---------------- TOGGLE ---------------- */
export const toggleFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const { postId } = req.params;

    const result = await toggleFavoriteService(userId, postId);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ---------------- GET FAVORITES ---------------- */
export const getUserFavorites = async (req, res) => {
  try {
    const userId = req.user.id;

    const favorites = await getUserFavoritesService(userId);

    res.json({ data: favorites });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
