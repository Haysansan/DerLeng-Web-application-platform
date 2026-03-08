import Post from "../models/Post.js";
import PostComment from "../models/PostComment.js";

const create = async ({ post_id, user_id, content }) => {
  const post = await Post.findById(post_id);
  if (!post) {
    throw new Error("Post not found");
  }

  return await PostComment.create({
    post_id,
    user_id,
    content,
  });
};

const getByPost = async (post_id) => {
  return await PostComment.find({ post_id })
    .populate("user_id", "username")
    .sort({ created_at: -1 });
};

const remove = async (comment_id, user_id) => {
  const comment = await PostComment.findById(comment_id);

  if (!comment) {
    throw new Error("Comment not found");
  }

  if (comment.user_id.toString() !== user_id.toString()) {
    throw new Error("Not authorized to delete this comment");
  }

  await PostComment.findByIdAndDelete(comment_id);
};

const update = async (comment_id, user_id, content) => {
  const comment = await PostComment.findById(comment_id);

  if (!comment) {
    throw new Error("Comment not found");
  }

  // Only owner can update
  if (comment.user_id.toString() !== user_id.toString()) {
    throw new Error("Not authorized to update this comment");
  }

  comment.content = content;
  await comment.save();

  return comment;
};

export default {
  create,
  getByPost,
  remove,
  update,
};
