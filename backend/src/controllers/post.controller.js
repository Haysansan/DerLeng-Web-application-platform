import postService from "../services/post.service.js";

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
    const posts = await postService.getAll();

    res.status(200).json({
      data: posts,
    });
  } catch (error) {
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