import express from "express";

import {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking,
  getBookingStats,
} from "../controllers/booking.controller.js";

import protect from "../middlewares/auth.middleware.js";
import adminAuthorize from "../middlewares/adminAuthorize.js";
import { uploadBooking } from "../middlewares/upload.middleware.js";
import { validateBooking } from "../middlewares/bookingValidation.middleware.js";

const router = express.Router();

// user create booking
router.post(
  "/",
  protect,
  uploadBooking.single("transaction_image"),
  // validateBooking,
  createBooking,
);

// admin get all bookings
router.get("/", protect, adminAuthorize, getAllBookings);
router.get("/stats", protect, adminAuthorize, getBookingStats);

// get single booking
router.get("/:id", protect, getBookingById);

// admin update booking status
router.put("/:id/status", protect, adminAuthorize, updateBookingStatus);

// admin delete booking
router.delete("/:id", protect, adminAuthorize, deleteBooking);


export default router;
