import Favorite from "../models/Favorite.js";
import mongoose from "mongoose";

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

  try {
    await Favorite.create({
      user_id: userId,
      target_id,
      target_type,
    });

    console.log("Created favorite:", target_id);

    return { favorited: true };
  } catch (error) {
    console.error("ERROR FAVORITE:", error);

    if (error.code === 11000) {
      return { favorited: true };
    }

    throw error;
  }
};

/* ---------------- GET USER FAVORITES ---------------- */
export const getUserFavoritesService = async (
  userId,
  target_type, 
) => {
  const query = { user_id: userId };

  if (target_type) {
    query.target_type = target_type;
  }

  const favorites = await Favorite.find(query)
    .populate("target_id") 
    .sort({ created_at: -1 });

  return favorites;
};
