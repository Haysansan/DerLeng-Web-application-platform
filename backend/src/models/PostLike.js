import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    target_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "target_type", // 🔥 dynamic reference
    },
    target_type: {
      type: String,
      required: true,
      enum: ["Post", "CommunityPost"], // add more later if needed
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: false },
  },
);

// prevent duplicate like
likeSchema.index(
  { target_id: 1, target_type: 1, user_id: 1 },
  { unique: true },
);

export default mongoose.model("Like", likeSchema);
