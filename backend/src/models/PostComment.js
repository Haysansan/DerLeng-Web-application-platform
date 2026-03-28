import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    target_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "target_type", // 🔥 dynamic reference
    },
    target_type: {
      type: String,
      required: true,
      enum: ["Post", "CommunityPost"],
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    edited: {
    type: Boolean,
    default: false,
    },
    avatar: {
    type: String,
    default: "",
    },

  },
  {
    timestamps: { createdAt: "created_at", updatedAt: false },
  },
);

export default mongoose.model("Comment", commentSchema);
