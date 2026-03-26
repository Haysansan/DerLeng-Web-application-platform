import React, { useContext, useState } from "react"; // Added useContext here
import { CartContext } from "../context/CartContext";
import { placeOrder } from "../services/order.service";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [loading, setLoading] = useState(false);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity,
    0,
  );

  const handleCheckout = async () => {
    if (!address || !phone || !screenshot) {
      alert("Please fill in all fields and upload your payment screenshot.");
      return;
    }

    setLoading(true);
    const formData = new FormData();

    formData.append(
      "items",
      JSON.stringify(
        cartItems.map((item) => ({
          product: item._id,
          quantity: item.quantity,
          price: item.price,
        })),
      ),
    );

    formData.append("total_price", totalPrice);
    formData.append("shipping_address", address);
    formData.append("phone_number", phone);
    formData.append("transaction_image", screenshot);

    try {
      const response = await placeOrder(formData);
      if (response.data.success) {
        alert("Order Successful! Admin will verify your payment.");
        clearCart();
      }
    } catch (error) {
      alert(error.response?.data?.message || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20 text-xl font-bold text-gray-400">
        Your cart is empty 🛒
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-green-600 mb-4 transition"
      >
        ← Back
      </button>
      <h1 className="text-4xl font-bold text-[#002B11] mb-10">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT: ITEM LIST */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-xl"
              />
              <div className="flex-1">
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-gray-500">
                  ${item.price} x {item.quantity}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-400 p-2 hover:bg-red-50 rounded-full transition"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>

        {/* RIGHT: PAYMENT FORM */}
        <div className="bg-white p-6 rounded-3xl shadow-lg border-t-4 border-green-600 h-fit">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>

          <div className="space-y-4 mb-6">
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full p-3 bg-gray-50 rounded-xl border focus:outline-green-500"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <textarea
              placeholder="Delivery Address"
              className="w-full p-3 bg-gray-50 rounded-xl border focus:outline-green-500"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="mb-6 p-4 bg-yellow-50 rounded-xl border border-yellow-100">
            <p className="text-xs text-yellow-700 font-semibold mb-2">
              Scan QR & Upload Screenshot
            </p>
            <input
              type="file"
              accept="image/*"
              className="text-xs"
              onChange={(e) => setScreenshot(e.target.files[0])}
            />
          </div>

          <div className="flex justify-between text-lg font-bold mb-6">
            <span>Total:</span>
            <span className="text-green-600">${totalPrice}</span>
          </div>

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full py-4 bg-[#002B11] text-white rounded-2xl font-bold hover:bg-black transition disabled:bg-gray-300"
          >
            {loading ? "Processing..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
}
