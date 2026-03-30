import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  booking_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
  },
  title: String,
  message: String,
  is_read: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
});

export default mongoose.model("Notification", notificationSchema);
