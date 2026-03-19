

// Create booking
import api from "./api";

const createBooking = async (formData) => {
  const token = localStorage.getItem("token");

  const res = await api.post("/booking", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data", // ✅ IMPORTANT
    },
  });

  return res.data;
};


// Get all bookings (admin)
const getAllBookings = async () => {
  const res = await api.get("/booking");
  return res.data.data;
};

// Get booking by ID
const getBookingById = async (id) => {
  const res = await api.get(`/booking/${id}`);
  return res.data.data;
};

// Update booking status (admin)
const updateBookingStatus = async (id, status) => {
  const res = await api.put(`/booking/${id}/status`, { status });
  return res.data;
};

// Delete booking (admin)
const deleteBooking = async (id) => {
  const res = await api.delete(`/booking/${id}`);
  return res.data;
};

export default {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking,
};
