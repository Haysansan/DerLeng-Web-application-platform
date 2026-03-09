import commentService from "../services/comment.service.js";

// Create comment
export const createComment = async (req, res) => {
  try {
    const comment = await commentService.create({
      post_id: req.body.post_id,
      user_id: req.user._id,
      content: req.body.content,
    });

    res.status(201).json({
      message: "Comment added successfully",
      data: comment,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Get comments of a post
export const getCommentsByPost = async (req, res) => {
  try {
    const comments = await commentService.getByPost(req.params.post_id);

    res.status(200).json({
      data: comments,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Delete comment
export const deleteComment = async (req, res) => {
  try {
    await commentService.remove(req.params.id, req.user._id);

    res.status(200).json({
      message: "Comment deleted successfully",
    });
  } catch (error) {
    res.status(403).json({
      message: error.message,
    });
  }
};

export const updateComment = async (req, res) => {
  try {
    const updatedComment = await commentService.update(
      req.params.id,
      req.user._id,
      req.body.content,
    );

    res.status(200).json({
      message: "Comment updated successfully",
      data: updatedComment,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
