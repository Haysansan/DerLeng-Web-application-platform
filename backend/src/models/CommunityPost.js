import mongoose from "mongoose";

const communityPostSchema = new mongoose.Schema(
  {
    admin_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    province_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Province",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      required: true,
    },

    location_description: {
      type: String,
      required: false,
    },

    location_link: {
      type: String,
      required: false,
    },

    images: {
      type: [String],
      required: false,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: false },
  },
);

export default mongoose.model("CommunityPost", communityPostSchema);
