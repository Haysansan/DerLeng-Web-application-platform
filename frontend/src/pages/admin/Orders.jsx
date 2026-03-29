import React, { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "../../services/order.service";
import { format } from "date-fns";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null); // For the Modal

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await getAllOrders();
      setOrders(res.data.data || res.data);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewSlip = (transactionImage) => {
    if (!transactionImage) {
      alert("No image found for this order");
      return;
    }

    if (transactionImage.startsWith("http://") || transactionImage.startsWith("https://")) {
      console.log("Image Debugging - Cloud URL:", transactionImage);
      setSelectedImage(transactionImage);
      return;
    }

    const envUrl = String(import.meta.env.API_BASE_URL || "http://localhost:5000");
    const API_BASE_URL = envUrl.endsWith('/') ? envUrl.slice(0, -1) : envUrl;

    let cleanPath = transactionImage.replace(/\\/g, "/");

    const finalPath = cleanPath.startsWith("uploads/")
      ? cleanPath
      : `uploads/${cleanPath}`;
    const fullUrl = `${API_BASE_URL}/${finalPath}`;
    console.log("Image Debugging - Full URL:", fullUrl);
    setSelectedImage(fullUrl);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      // Refresh local state to show updated status
      setOrders(
        orders.map((o) =>
          o._id === orderId ? { ...o, status: newStatus } : o,
        ),
      );
    } catch (err) {
      alert("Failed to update status");
    }
  };

  if (loading) return <div className="p-10 text-center">Loading Orders...</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-[#002B11] mb-8">
        Order Management
      </h1>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs font-bold">
            <tr>
              <th className="p-4">Customer / Date</th>
              <th className="p-4">Items</th>
              <th className="p-4">Total</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50 transition">
                <td className="p-4">
                  <div className="font-bold text-gray-800">
                    {order.user?.username || "Guest"}
                  </div>
                  <div className="text-xs text-gray-500">
                    {order.phone_number}
                  </div>
                  <div className="text-xs text-gray-500 italic">
                    {order.shipping_address}
                  </div>
                  <div className="text-[10px] text-gray-400">
                    {format(new Date(order.createdAt), "PPP p")}
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-sm text-gray-600">
                    {order.items?.length} items
                  </span>
                </td>
                <td className="p-4 font-bold text-green-700">
                  ${order.total_price}
                </td>
                <td className="p-4">
                  <button
                    onClick={() => handleViewSlip(order.transaction_image)}
                    className="text-blue-600 underline text-sm"
                  >
                    View Slip
                  </button>
                </td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      order.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.status.toUpperCase()}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className="p-1 text-sm border rounded bg-white"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Proccessing</option>
                    <option value="rejected">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* LIGHTBOX FOR SLIP VERIFICATION */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-10"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-lg w-full bg-white p-2 rounded-lg">
            <button className="absolute -top-10 right-0 text-white text-xl">
              ✕ Close
            </button>
            <img
              src={selectedImage}
              alt="Payment Receipt"
              className="w-full h-auto rounded shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
