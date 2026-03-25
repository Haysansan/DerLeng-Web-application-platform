import likeService from "../services/like.service.js";

export const toggleLike = async (req, res) => {
  try {
    const { target_id, target_type } = req.body;

    const result = await likeService.toggleLike(
      target_id,
      target_type,
      req.user._id,
    );

    res.status(200).json({
      message: result.liked ? "Liked" : "Unliked",
      liked: result.liked,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getLikesCount = async (req, res) => {
  try {
    const { target_id, target_type } = req.query;

    const count = await likeService.getLikesCount(target_id, target_type);

    res.status(200).json({
      target_id,
      likes: count,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const isLiked = async (req, res) => {
  try {
    const { target_id, target_type } = req.query;

    const liked = await likeService.isLiked(
      target_id,
      target_type,
      req.user._id,
    );

    res.json({ liked });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};