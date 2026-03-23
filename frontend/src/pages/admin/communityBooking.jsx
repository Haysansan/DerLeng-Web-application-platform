import React, { useEffect, useState } from "react";
import bookingService from "../../services/booking.service";

export default function AdminBookingPage() {
  const [bookings, setBookings] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [preview, setPreview] = useState(null);

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [statusValue, setStatusValue] = useState("");

  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const data = await bookingService.getAllBookings();

    const sorted = data.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at),
    );

    setBookings(sorted);
  };

  // FILTER + SEARCH
  const filteredBookings = bookings.filter((b) => {
    const matchStatus = statusFilter === "all" || b.status === statusFilter;

    const matchSearch =
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.community_post_id?.title?.toLowerCase().includes(search.toLowerCase());

    return matchStatus && matchSearch;
  });

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    approved: bookings.filter((b) => b.status === "approved").length,
    rejected: bookings.filter((b) => b.status === "rejected").length,
    revenue: bookings
      .filter((b) => b.status !== "rejected") // 🚀 KEY LINE
      .reduce((sum, b) => sum + (b.total_price || 0), 0),
  };

  const updateStatus = async () => {
    try {
      setLoadingId(selectedBooking._id);

      await bookingService.updateBookingStatus(
        selectedBooking._id,
        statusValue,
      );

      alert("Status updated!");
      setSelectedBooking(null);
      fetchBookings();
    } catch (err) {
      alert("Failed to update status");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-green-900">
          Manage Community Booking
        </h1>
        <p className="text-gray-500 mb-5">Manage all community booking</p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <StatCard title="Total" value={stats.total} />
        <StatCard title="Pending" value={stats.pending} />
        <StatCard title="Approved" value={stats.approved} />
        <StatCard title="Rejected" value={stats.rejected} />

        {/* ✅ NEW CARD */}
        <StatCard title="Total Revenue" value={`$${stats.revenue}`} />
      </div>

      {/* FILTER */}
      <div className="flex gap-4 mb-6">
        <input
          placeholder="Search..."
          className="border p-2 rounded w-full"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* LIST */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredBookings.map((booking) => (
          <div
            key={booking._id}
            onClick={() => {
              setSelectedBooking(booking);
              setStatusValue(booking.status);
            }}
            className="bg-white rounded-xl shadow p-5 border border-gray-200 flex flex-col gap-3 cursor-pointer hover:shadow-lg transition"
          >
            {/* HEADER */}
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">{booking.name}</h3>

              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  booking.status === "pending" &&
                  "bg-yellow-100 text-yellow-700"
                } ${
                  booking.status === "approved" && "bg-green-100 text-green-700"
                } ${
                  booking.status === "rejected" && "bg-red-100 text-red-700"
                }`}
              >
                {booking.status}
              </span>
            </div>

            {/* INFO */}
            <div className="text-sm text-gray-600 grid grid-cols-2 gap-2">
              <p>📍 {booking.current_location}</p>
              <p>👥 {booking.number_of_people}</p>
              <p>📅 {booking.booking_date?.slice(0, 10)}</p>
              <p>🧳 {booking.trip_duration} days</p>
            </div>

            {/* POST */}
            <div className="text-sm">
              <strong>Post:</strong> {booking.community_post_id?.title}
            </div>

            {/* SERVICES */}
            <div className="text-sm">
              <strong>Services:</strong>{" "}
              {booking.services?.map((s) => s.name).join(", ")}
            </div>

            {/* PRICE */}
            <div className="font-semibold text-green-700">
              ${booking.total_price}
            </div>

            {/* IMAGE */}
            <img
              src={booking.transaction_image}
              alt="transaction"
              className="w-24 h-24 object-cover rounded border"
            />
          </div>
        ))}
      </div>

      {/* IMAGE PREVIEW MODAL */}
      {preview && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <img src={preview} className="max-h-[80%] rounded" />
          <button onClick={() => setPreview(null)}>Close</button>
        </div>
      )}

      {/* 🔥 DETAIL MODAL */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white w-[700px] max-h-[90vh] overflow-y-auto rounded-xl p-6 relative">
            {/* CLOSE */}
            <button
              onClick={() => setSelectedBooking(null)}
              className="absolute top-3 right-3 text-gray-500"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4">Booking Detail</h2>

            {/* INFO */}
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <p>
                <strong>Name:</strong> {selectedBooking.name}
              </p>
              <p>
                <strong>Gender:</strong> {selectedBooking.gender}
              </p>
              <p>
                <strong>Age:</strong> {selectedBooking.age}
              </p>
              <p>
                <strong>Location:</strong> {selectedBooking.current_location}
              </p>
              <p>
                <strong>People:</strong> {selectedBooking.number_of_people}
              </p>
              <p>
                <strong>Duration:</strong> {selectedBooking.trip_duration} days
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {selectedBooking.booking_date?.slice(0, 10)}
              </p>
            </div>

            {/* SERVICES */}
            <div className="mb-4">
              <strong>Services:</strong>
              <ul className="list-disc ml-5 text-sm">
                {selectedBooking.services?.map((s) => (
                  <li key={s._id}>
                    {s.name} (${s.price})
                  </li>
                ))}
              </ul>
            </div>

            {/* NOTE */}
            {selectedBooking.note && (
              <div className="mb-4">
                <strong>Note:</strong>
                <p className="text-sm text-gray-600">{selectedBooking.note}</p>
              </div>
            )}

            {/* IMAGE */}
            <div className="mb-4">
              <strong>Transaction:</strong>
              <img
                src={selectedBooking.transaction_image}
                className="w-full max-h-[300px] object-cover rounded mt-2"
              />
            </div>

            {/* PRICE */}
            <div className="mb-4 font-semibold text-green-700">
              Total: ${selectedBooking.total_price}
            </div>

            {/* STATUS DROPDOWN */}
            <div className="flex items-center gap-3 mt-4">
              <label className="font-medium">Status:</label>

              <select
                value={statusValue}
                onChange={(e) => setStatusValue(e.target.value)}
                className="border p-2 rounded"
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="completed">Completed</option>
              </select>

              <button
                disabled={loadingId === selectedBooking._id}
                onClick={updateStatus}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                {loadingId === selectedBooking._id ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* STAT CARD */
function StatCard({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-xl  shadow text-center">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-xl font-bold">{value}</h2>
    </div>
  );
}
