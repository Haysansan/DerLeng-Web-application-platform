import Booking from "../models/Booking.js";
import Service from "../models/Service.js";

export const createBookingService = async ({
  user_id,
  community_post_id,
  services,
  number_of_people,
  booking_date,
  note,
  transaction_image,
}) => {
  // get selected services
  const serviceDocs = await Service.find({
    _id: { $in: services },
  });

  if (!serviceDocs.length) {
    throw new Error("No valid services selected");
  }

  // calculate service total
  const serviceTotal = serviceDocs.reduce(
    (sum, service) => sum + service.price,
    0,
  );

  let totalPrice = serviceTotal * number_of_people;

  // apply discount
  if (number_of_people >= 5) {
    totalPrice = totalPrice * 0.8;
  }

  const booking = await Booking.create({
    user_id,
    community_post_id,
    services,
    number_of_people,
    booking_date,
    total_price: totalPrice,
    transaction_image,
    note,
  });

  return booking;
};

export const getAllBookingsService = async () => {
  return Booking.find()
    .populate("user_id", "username email")
    .populate("community_post_id", "title")
    .populate("services");
};

export const getBookingByIdService = async (id) => {
  return Booking.findById(id)
    .populate("user_id")
    .populate("community_post_id")
    .populate("services");
};

export const updateBookingStatusService = async (id, status) => {
  return Booking.findByIdAndUpdate(id, { status }, { new: true });
};

export const deleteBookingService = async (id) => {
  return Booking.findByIdAndDelete(id);
};
