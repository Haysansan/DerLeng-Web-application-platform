import commentService from "../services/comment.service.js";

export const createComment = async (req, res) => {
  try {
    const { target_id, target_type, content } = req.body;

    let comment = await commentService.create({
      target_id,
      target_type,
      user_id: req.user._id,
      content,
    });
    comment = await comment.populate("user_id", "username avatar");
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

export const getComments = async (req, res) => {
  try {
    const { target_id, target_type } = req.query;

    const comments = await commentService.getByTarget(target_id, target_type);

    res.status(200).json({
      data: comments,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

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
    let updatedComment = await commentService.update(
      req.params.id,
      req.user._id,
      req.body.content,
    );

    updatedComment = await updatedComment.populate("user_id", "username avatar");
    
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
