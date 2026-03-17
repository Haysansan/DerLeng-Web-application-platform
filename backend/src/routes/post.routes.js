import express from "express";

import {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking,
} from "../controllers/booking.controller.js";

import protect from "../middlewares/auth.middleware.js";
import adminAuthorize from "../middlewares/adminAuthorize.js";
import { uploadBooking } from "../middlewares/upload.middleware.js";

const router = express.Router();

// user create booking
router.post(
  "/",
  protect,
  uploadBooking.single("transaction_image"),
  createBooking,
);

// admin get all bookings
router.get("/", protect, adminAuthorize, getAllBookings);

// get single booking
router.get("/:id", protect, getBookingById);

// admin update booking status
router.put("/:id/status", protect, adminAuthorize, updateBookingStatus);

// admin delete booking
router.delete("/:id", protect, adminAuthorize, deleteBooking);

export default router;
