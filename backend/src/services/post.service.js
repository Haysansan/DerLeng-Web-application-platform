import Post from "../models/Post.js";
import mongoose from "mongoose";
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
const getAll = async (page = 1, limit = 10, search ="" ) => {
  const skip = (page - 1) * limit;
    //search 
    const query = search
    ? {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { content: { $regex: search, $options: "i" } },
          { location_description: { $regex: search, $options: "i" } },
        ],
      }
    : {};

  const total = await Post.countDocuments(query);
  
  const posts = await Post.find(query)
    .populate("user_id", "username email role")
    .populate("category_id", "category_name")
    .populate("province_id", "province_name")
    .sort({ created_at: -1 })
    .skip(skip)
    .limit(limit);

  return {
    posts,
    pagination: {
      total,
      page,
      pages: Math.ceil(total / limit),
    },
  };
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

const update = async (post_id, user_id, role, updateData, files) => {
  const post = await Post.findById(post_id);

  if (!post) {
    throw new Error("Post not found");
  }

  if (post.user_id.toString() !== user_id.toString() && role !== "admin") {
    throw new Error("Not authorized to edit this post");
  }

  const updatedFields = {
    ...updateData,
  };

  if (files && files.length > 0) {
    updatedFields.images = files.map((f) => f.path);
  }

  const updatedPost = await Post.findByIdAndUpdate(
    post_id,
    updatedFields,
    { new: true }
  );

  return updatedPost;
}
const getTopPosts = async () => {
  return await Post.aggregate([
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "target_id",
        as: "likesData",
      },
    },
    {
      $addFields: {
        likesCount: { $size: { $ifNull: ["$likesData", []] } },
      },
    },
    {
      $lookup: {
        from: "users", // ✅ FIX USERNAME
        localField: "user_id",
        foreignField: "_id",
        as: "user_id",
      },
    },
    {
      $unwind: {
        path: "$user_id",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $sort: { likesCount: -1 },
    },
    {
      $limit: 3,
    },
  ]);
};


const getPostsByCategory = async (categoryId, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const posts = await Post.find({ category_id: categoryId })
    .populate("user_id", "username")
    .populate("category_id", "category_name")
    .populate("province_id", "province_name")
    .sort({ created_at: -1 }) // ✅ IMPORTANT (you used created_at)
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Post.countDocuments({
    category_id: categoryId,
  });

  return {
    data: posts,
    pagination: {
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getPostsByFilter = async ({ categoryId, provinceId, page, limit }) => {
  const filter = {};

  if (categoryId) filter.category_id = categoryId;
  if (provinceId) filter.province_id = provinceId;

  const skip = (page - 1) * limit;

  const posts = await Post.find(filter)
    .populate("category_id")
    .populate("province_id")
    .skip(skip)
    .limit(limit);

  const total = await Post.countDocuments(filter);

  return {
    data: posts,
    pagination: {
      total,
      page,
      totalPages: Math.ceil(total / limit),
    },
  };
};
export default {
  create,
  getAll,
  getById,
  remove,
  update,
  getTopPosts,
  getPostsByCategory,
  getPostsByFilter,
};
