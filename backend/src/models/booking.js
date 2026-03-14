import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    community_post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CommunityPost",
      required: true,
    },

    services: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
      },
    ],

    number_of_people: {
      type: Number,
      required: true,
      min: 1,
    },

    booking_date: {
      type: Date,
      required: true,
    },

    total_price: {
      type: Number,
      required: true,
    },

    note: {
      type: String,
      required: false,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "completed"],
      default: "pending",
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: false },
  },
);

export default mongoose.model("Booking", bookingSchema);
