// src/pages/Cart.jsx
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { cartItems, removeFromCart } = useContext(CartContext);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.minPrice * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20 text-xl">
        Your cart is empty 🛒
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-[#002B11] mb-8">
        Your Cart
      </h1>

      <div className="space-y-6">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-6 bg-white shadow-md rounded-xl p-4"
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-lg"
            />

            {/* Info */}
            <div className="flex-1">
              <h2 className="font-bold text-lg">{item.name}</h2>
              <p className="text-gray-600">${item.minPrice}</p>
              <p className="text-sm text-gray-500">
                Quantity: {item.quantity}
              </p>
            </div>

            {/* Subtotal */}
            <div className="font-semibold text-green-600">
              ${item.minPrice * item.quantity}
            </div>

            {/* Remove Button */}
            <button
              onClick={() => removeFromCart(item.id)}
              className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-10 flex justify-between items-center border-t pt-6">
        <h2 className="text-2xl font-bold">
          Total: ${totalPrice}
        </h2>

        <button className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition">
          Checkout
        </button>
      </div>
    </div>
  );
}2
