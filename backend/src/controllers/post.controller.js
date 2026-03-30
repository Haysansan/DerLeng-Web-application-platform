import postService from "../services/post.service.js";
import Post from "../models/Post.js";

// Create Post
export const createPost = async (req, res) => {
  try {
    if (!req.body.title || !req.body.content) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    const imageUrls = req.files.map((file) => file.path);

    const post = await postService.create({
      user_id: req.user._id,
      category_id: req.body.category_id,
      province_id: req.body.province_id,
      title: req.body.title,
      content: req.body.content,
      location_description: req.body.location_description,
      location_link: req.body.location_link,
      trip_date: req.body.trip_date,
      trip_duration: req.body.trip_duration,
      trip_cost: req.body.trip_cost,
      images: imageUrls,
    });

    res.status(201).json({
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Posts
export const getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    const result = await postService.getAll(page, limit, search);

    res.status(200).json({
      success: true,
      data: result.posts,
      pagination: result.pagination,
    });
  } catch (error) {
    console.error("GET POSTS ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Single Post
export const getPostById = async (req, res) => {
  try {
    const post = await postService.getById(req.params.id);

    res.status(200).json({
      data: post,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

// Delete Post
export const deletePost = async (req, res) => {
  try {
    await postService.remove(req.params.id, req.user._id,req.user.role);

    res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(403).json({
      message: error.message,
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const updatedPost = await postService.update(
      req.params.id,
      req.user._id,
      req.user.role,
      req.body,
      req.files // ✅ PASS FILES HERE
    );

    res.status(200).json({
      message: "Post updated successfully",
      data: updatedPost,
    });
  } catch (error) {
    res.status(403).json({
      message: error.message,
    });
  }
};

// Controller to get posts by user
export const getPostsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const posts = await Post.find({ user_id: userId }) // <-- use user_id
      .sort({ created_at: -1 }) // your schema uses created_at
      .populate("user_id", "username email role") // populate correct field
      .populate("category_id", "category_name")
      .populate("province_id", "province_name");

    res.status(200).json({ data: posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch user posts" });
  }
};

//get top 3 post
export const getTopPosts = async (req, res) => {
  try {
    const posts = await postService.getTopPosts();
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch top posts" });
  }
};

//get post by category
export const getPostsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const result = await postService.getPostsByCategory(
      categoryId,
      page,
      limit
    );

    res.status(200).json(result);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getPostsByProvince = async (req, res) => {
  try {
    const { provinceId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    const posts = await Post.find({ province_id: provinceId })
      .skip(skip)
      .limit(Number(limit))
      .sort({ created_at: -1 });

    const total = await Post.countDocuments({
      province_id: provinceId,
    });

    res.json({
      data: posts,
      pagination: {
        total,
        page: Number(page),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

