import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    community_post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CommunityPost",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: false,
    },

    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: false },
  },
);

export default mongoose.model("Service", serviceSchema);
