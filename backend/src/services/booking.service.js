import Booking from "../models/booking.js";
import Service from "../models/Service.js";

/* ---------------- CREATE BOOKING ---------------- */
export const createBookingService = async ({
  user_id,
  community_post_id,
  services,
  name,
  phone_number,
  age,
  gender,
  current_location,
  trip_duration,
  number_of_people,
  booking_date,
  note,
  transaction_image,
}) => {
  const serviceDocs = await Service.find({
    _id: { $in: services },
  });

  if (!serviceDocs.length) {
    throw new Error("No valid services selected");
  }

  const serviceTotal = serviceDocs.reduce(
    (sum, service) => sum + service.price,
    0,
  );

  let totalPrice = serviceTotal * number_of_people;

  if (number_of_people >= 5) {
    totalPrice = totalPrice * 0.8;
  }

  const booking = await Booking.create({
    user_id,
    community_post_id,
    services,
    name,
    phone_number,
    age,
    gender,
    current_location,
    trip_duration,
    number_of_people,
    booking_date,
    total_price: totalPrice,
    transaction_image,
    note,
  });

  return booking;
};

/* ---------------- GET ALL ---------------- */
export const getAllBookingsService = async () => {
  return Booking.find()
    .populate("user_id", "username email")
    .populate("community_post_id", "title")
    .populate("services");
};

/* ---------------- GET ONE ---------------- */
export const getBookingByIdService = async (id) => {
  return Booking.findById(id)
    .populate("user_id")
    .populate("community_post_id")
    .populate("services");
};

/* ---------------- UPDATE ---------------- */
export const updateBookingStatusService = async (id, status) => {
  return Booking.findByIdAndUpdate(id, { status }, { new: true });
};

/* ---------------- DELETE ---------------- */
export const deleteBookingService = async (id) => {
  return Booking.findByIdAndDelete(id);
};

/* ---------------- STATS (FIXED) ---------------- */
export const getBookingStatsService = async () => {
  const stats = await Booking.aggregate([
    {
      $match: {
        created_at: { $exists: true, $ne: null },
        status: { $ne: "rejected" }, 
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$created_at" },
          month: { $month: "$created_at" },
        },
        totalBookings: { $sum: 1 },
        totalRevenue: {
          $sum: {
            $toDouble: { $ifNull: ["$total_price", 0] },
          },
        },
      },
    },
    {
      $sort: { "_id.year": 1, "_id.month": 1 },
    },
  ]);

  return stats;
};
