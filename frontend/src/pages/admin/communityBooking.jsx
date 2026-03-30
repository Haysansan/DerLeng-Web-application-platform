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
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [adminNote, setAdminNote] = useState("");

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
  const handleDelete = (id) => {
    setDeleteId(id);
  };

  // FILTER + SEARCH
  const filteredBookings = bookings.filter((b) => {
    const matchStatus = statusFilter === "all" || b.status === statusFilter;

    const matchSearch =
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.community_post_id?.title?.toLowerCase().includes(search.toLowerCase());

    return matchStatus && matchSearch;
  });

  const confirmDelete = async () => {
    try {
      setDeleting(true);

      await bookingService.deleteBooking(deleteId);

      // remove from UI immediately
      setBookings((prev) => prev.filter((b) => b._id !== deleteId));
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };
  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    approved: bookings.filter((b) => b.status === "approved").length,
    rejected: bookings.filter((b) => b.status === "rejected").length,
    revenue: bookings
      .filter((b) => b.status !== "rejected")
      .reduce((sum, b) => sum + (b.total_price || 0), 0),
  };

  const updateStatus = async () => {
    try {
      setLoadingId(selectedBooking._id);

      await bookingService.updateBookingStatus(selectedBooking._id, {
        status: statusValue,
        admin_note: adminNote,
      });

      // alert("Status updated!");
      setSelectedBooking(null);
      fetchBookings();
    } catch (err) {
      alert("Failed to update status");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div>
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

        {/* NEW CARD */}
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
              setAdminNote(booking.admin_note || ""); 
            }}
            className="bg-white rounded-xl shadow p-5 border border-gray-200 flex flex-col gap-3 hover:shadow-lg transition cursor-pointer"
          >
            {/* ALL TOP CONTENT */}
            <div className="flex flex-col gap-3">
              {/* HEADER */}
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">{booking.name}</h3>

                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    booking.status === "pending" &&
                    "bg-yellow-100 text-yellow-700"
                  } ${
                    booking.status === "approved" &&
                    "bg-green-100 text-green-700"
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
                <p className="col-span-2">📞 {booking.phone_number}</p>
              </div>

              {/* POST */}
              <div className="text-sm">
                <strong>Post:</strong> {booking.community_post_id?.title}
              </div>

              {/* SERVICES */}
              <div className="text-sm">
                <strong>Services:</strong>{" "}
                {booking.services
                  ?.slice(0, 2)
                  .map((s) => s.name)
                  .join(", ")}
                {booking.services?.length > 2 && " ..."}
              </div>

              {/* PRICE */}
              <div className="font-semibold text-green-700">
                ${booking.total_price}
              </div>
            </div>

            <div className="mt-auto flex justify-between items-end">
              <img
                src={booking.transaction_image}
                alt="transaction"
                className="w-24 h-24 object-cover rounded border"
              />

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(booking._id);
                }}
                className="px-2 py-1 text-xs rounded-md bg-red-50 hover:bg-red-100 text-red-600 transition"
              >
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
        {deleteId && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-[320px] shadow-lg">
              {/* TITLE */}
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Delete Booking
              </h3>

              {/* MESSAGE */}
              <p className="text-sm text-black-500 mb-6">
                Are you sure you want to delete this booking? This action cannot
                be undone.
              </p>

              {/* ACTIONS */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setDeleteId(null)}
                  className="px-4 py-2 text-sm rounded-md bg-gray-100 hover:bg-gray-200"
                >
                  Cancel
                </button>

                <button
                  onClick={confirmDelete}
                  disabled={deleting}
                  className="px-4 py-2 text-sm rounded-md bg-red-500 hover:bg-red-600 text-white"
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* IMAGE PREVIEW MODAL */}
      {preview && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[999]">
          {/* CLOSE BUTTON */}
          <button
            onClick={() => setPreview(null)}
            className="absolute top-5 right-5 text-white text-3xl"
          >
            ✕
          </button>

          {/* IMAGE */}
          <img src={preview} className="max-w-full max-h-full object-contain" />
        </div>
      )}

      {/*DETAIL MODAL */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/70 z-50 flex flex-col">
          {/* HEADER */}
          <div className="flex justify-between items-center bg-white p-4 border border-grey-400">
            <h2 className="text-xl font-bold">Booking Detail</h2>
            <button
              onClick={() => setSelectedBooking(null)}
              className="text-gray-500 text-xl"
            >
              ✕
            </button>
          </div>

          {/* CONTENT (SCROLLABLE) */}
          <div className="flex-1 overflow-y-auto bg-white">
            <div className="w-full bg-white p-6 pb-10">
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
                  <strong>Duration:</strong> {selectedBooking.trip_duration}{" "}
                  days
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
                  <p className="text-sm text-gray-600">
                    {selectedBooking.note}
                  </p>
                </div>
              )}

              {/* IMAGE */}
              <div className="mb-4">
                <strong>Transaction:</strong>
                <img
                  src={selectedBooking.transaction_image}
                  onClick={() => setPreview(selectedBooking.transaction_image)}
                  className="w-full max-h-[400px] object-cover rounded mt-2 cursor-pointer hover:opacity-80"
                />
              </div>

              {/* PRICE */}
              <div className="mb-4 font-semibold text-green-700 text-lg">
                Total: ${selectedBooking.total_price}
              </div>
              <div className="mt-4">
                <label className="font-medium">Admin Note:</label>
                <textarea
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  className="w-full border p-2 rounded mt-1"
                  placeholder="Write extra info for user..."
                />
              </div>

              {/* STATUS */}
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
