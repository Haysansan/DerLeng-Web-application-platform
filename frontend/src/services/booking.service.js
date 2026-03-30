import api from "./api";

/* ---------------- CREATE ---------------- */
const createBooking = async (formData) => {
  const token = localStorage.getItem("token");

  const res = await api.post("/booking", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

/* ---------------- GET ALL ---------------- */
const getAllBookings = async () => {
  const token = localStorage.getItem("token");
  console.log("TOKEN:", token);

  const res = await api.get("/booking", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.data;
};

/* ---------------- GET ONE ---------------- */
const getBookingById = async (id) => {
  const token = localStorage.getItem("token");

  const res = await api.get(`/booking/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.data;
};

/* ---------------- UPDATE ---------------- */
const updateBookingStatus = async (id, data) => {
  const token = localStorage.getItem("token");

  const res = await api.put(
    `/booking/${id}/status`,
    data, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};

/* ---------------- DELETE ---------------- */
const deleteBooking = async (id) => {
  const token = localStorage.getItem("token");

  const res = await api.delete(`/booking/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

/* ---------------- 📊 STATS ---------------- */
export const getBookingStats = async () => {
  const token = localStorage.getItem("token");

  const res = await api.get("/booking/stats", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.data;
};

export default {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking,
  getBookingStats,
};