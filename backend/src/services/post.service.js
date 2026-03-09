import Post from "../models/Post.js";

const create = async ({
  user_id,
  category_id,
  province_id,
  title,
  content,
  location_description,
  location_link,
  trip_date,
  trip_duration,
  trip_cost,
  images,
}) => {
  return await Post.create({
    user_id,
    category_id,
    province_id,
    title,
    content,
    location_description,
    location_link,
    trip_date,
    trip_duration,
    trip_cost,
    images,
  });
};

// Get all posts
const getAll = async () => {
  return await Post.find()
    .populate("user_id", "username email role")
    .populate("category_id", "category_name")
    .populate("province_id", "province_name")
    .sort({ created_at: -1 });
};

// Get single post
const getById = async (id) => {
  const post = await Post.findById(id)

    .populate("user_id", "username email role")
    .populate("category_id", "category_name")
    .populate("province_id", "province_name");

  if (!post) {
    throw new Error("Post not found");
  }

  return post;
};

// Delete post 
const remove = async (post_id, user_id, role) => {
  const post = await Post.findById(post_id);

  if (!post) {
    throw new Error("Post not found");
  }

  if (post.user_id.toString() !== user_id.toString() && role !== "admin") {
    throw new Error("Not authorized to delete this post");
  }

  await Post.findByIdAndDelete(post_id);
};

const update = async (post_id, user_id, role, updateData) => {
  const post = await Post.findById(post_id);

  if (!post) {
    throw new Error("Post not found");
  }

  // Allow owner OR admin
  if (post.user_id.toString() !== user_id.toString() && role !== "admin") {
    throw new Error("Not authorized to edit this post");
  }

  const updatedPost = await Post.findByIdAndUpdate(post_id, updateData, {
    new: true,
  });

  return updatedPost;
};

export default {
  create,
  getAll,
  getById,
  remove,
  update,
};
