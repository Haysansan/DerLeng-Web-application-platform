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
export const getUserFavoritesService = async (userId, target_type) => {
  const query = { user_id: userId };

  if (target_type) {
    query.target_type = target_type;
  }

  // STEP 1: basic populate
  let favorites = await Favorite.find(query)
    .populate("target_id")
    .sort({ created_at: -1 });

  // STEP 2: manual safe populate per type
  favorites = await Promise.all(
    favorites.map(async (fav) => {
      const doc = fav.target_id;

      if (!doc) return fav;

      // ✅ POST
      if (fav.target_type === "Post") {
        await doc.populate([
          { path: "user_id", select: "username" },
          { path: "category_id", select: "category_name" },
        ]);
      }

      // ✅ COMMUNITY POST (adjust fields here!)
      if (fav.target_type === "CommunityPost") {
        await doc.populate([
          { path: "admin_id", select: "username" }, // ⚠️ adjust if needed
        ]);
      }

      return fav;
    })
  );

  return favorites;
};