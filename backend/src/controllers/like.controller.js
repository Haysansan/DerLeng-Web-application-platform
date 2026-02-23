import likeService from "../services/like.service.js";

// Toggle Like
export const toggleLike = async (req, res) => {
  try {
    const result = await likeService.toggleLike(
      req.params.post_id,
      req.user._id,
    );

    res.status(200).json({
      message: result.liked ? "Post liked" : "Post unliked",
      liked: result.liked,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Get Likes Count
export const getLikesCount = async (req, res) => {
  try {
    const count = await likeService.getLikesCount(req.params.post_id);

    res.status(200).json({
      post_id: req.params.post_id,
      likes: count,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
