import Post from "../models/Post.js";
import PostLike from "../models/PostLike.js";

const toggleLike = async (post_id, user_id) => {
  const post = await Post.findById(post_id);
  if (!post) {
    throw new Error("Post not found");
  }

  const existingLike = await PostLike.findOne({ post_id, user_id });

  if (existingLike) {
    // Unlike
    await PostLike.deleteOne({ _id: existingLike._id });
    return { liked: false };
  } else {
    // Like
    await PostLike.create({ post_id, user_id });
    return { liked: true };
  }
};

const getLikesCount = async (post_id) => {
  const count = await PostLike.countDocuments({ post_id });
  return count;
};

export default {
  toggleLike,
  getLikesCount,
};
