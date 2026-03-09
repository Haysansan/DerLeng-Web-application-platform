import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
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
    trip_date: {
      type: Date,
      required: false,
    },
    trip_duration: {
      type: String,
      required: false,
    },
    trip_cost: {
      type: Number,
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

export default mongoose.model("Post", postSchema);
