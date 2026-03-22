import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    target_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "target_type", // 🔥 dynamic
    },

    target_type: {
      type: String,
      required: true,
      enum: ["Post", "CommunityPost"],
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: false },
  },
);

// ✅ prevent duplicate favorite
favoriteSchema.index(
  { user_id: 1, target_id: 1, target_type: 1 },
  { unique: true },
);

export default mongoose.model("Favorite", favoriteSchema);
