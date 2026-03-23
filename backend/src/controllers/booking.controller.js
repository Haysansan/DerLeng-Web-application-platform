import {
  createBookingService,
  getAllBookingsService,
  getBookingByIdService,
  updateBookingStatusService,
  deleteBookingService,
  getBookingStatsService,
} from "../services/booking.service.js";

/* ---------------- CREATE ---------------- */
export const createBooking = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Transaction image is required",
      });
    }

    const services = Array.isArray(req.body.services)
      ? req.body.services
      : JSON.parse(req.body.services);

    const booking = await createBookingService({
      user_id: req.user._id,
      community_post_id: req.body.community_post_id,
      services,
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
      current_location: req.body.current_location,
      trip_duration: req.body.trip_duration,
      number_of_people: req.body.number_of_people,
      booking_date: req.body.booking_date,
      note: req.body.note,
      transaction_image: req.file.path,
    });

    res.status(201).json({ success: true, data: booking });
  } catch (error) {
    console.error("Create booking error:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ---------------- GET ALL ---------------- */
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await getAllBookingsService();
    res.json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ---------------- GET ONE ---------------- */
export const getBookingById = async (req, res) => {
  try {
    const booking = await getBookingByIdService(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ---------------- UPDATE ---------------- */
export const updateBookingStatus = async (req, res) => {
  try {
    const booking = await updateBookingStatusService(
      req.params.id,
      req.body.status,
    );

    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ---------------- DELETE ---------------- */
export const deleteBooking = async (req, res) => {
  try {
    await deleteBookingService(req.params.id);
    res.json({ success: true, message: "Booking deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ---------------- 📊 STATS ---------------- */
export const getBookingStats = async (req, res) => {
  try {
    const data = await getBookingStatsService();
    res.json({ data });
  } catch (err) {
    console.error("BOOKING STATS ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
