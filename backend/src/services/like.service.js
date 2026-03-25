import mongoose from "mongoose";
import Like from "../models/PostLike.js";

const toggleLike = async (target_id, target_type, user_id) => {
  if (!mongoose.Types.ObjectId.isValid(target_id)) {
    throw new Error("Invalid target_id");
  }

  const existingLike = await Like.findOne({
    target_id,
    target_type,
    user_id,
  });

  if (existingLike) {
    await Like.deleteOne({ _id: existingLike._id });

    return { liked: false };
  } else {
    await Like.create({
      target_id,
      target_type,
      user_id,
    });

    return { liked: true };
  }
};

const getLikesCount = async (target_id, target_type) => {
  return await Like.countDocuments({ target_id, target_type });
};
const isLiked = async (target_id, target_type, user_id) => {
  const like = await Like.findOne({
    target_id,
    target_type,
    user_id,
  });

  return !!like;
};

export default {
  toggleLike,
  getLikesCount,
  isLiked,
};
