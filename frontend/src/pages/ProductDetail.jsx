import { useParams } from "react-router-dom";
import { products } from "../data/products";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";

import visaLogo from "../assets/visa.png";
import abaLogo from "../assets/aba.jpg";
import mastercardLogo from "../assets/mastercard.jpg";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => { 
    const foundProduct = products.find(
      (p) => p.id === id || p.id === Number(id)
    );
    setProduct(foundProduct || null);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 flex justify-center items-center py-20">
          <h2 className="text-2xl font-bold text-[#002B11]">Product Not Found</h2>
        </div>
        <Footer />
      </div>
    );
  }

  const total = (product.minPrice * qty).toFixed(2); // total still uses 2 decimals

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* Checkout Container */}
      <div className="max-w-7xl w-full mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1">

        {/* LEFT: Product Checkout */}
        <div className="lg:col-span-2 bg-white shadow-md rounded-xl p-6">
          <h1 className="text-2xl font-bold mb-6">PRODUCT CHECKOUT</h1>

          <div className="flex flex-col md:flex-row gap-6 items-center border rounded-lg p-4 mb-6">
            <img
              src={product.image}
              alt={product.name}
              className="w-52 h-52 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h2 className="text-xl font-bold text-[#002B11]">{product.name}</h2>
              <p className="text-sm text-gray-500 mt-1">
                Availability:{" "}
                <span className="text-blue-600">
                  {product.isAvailable ? "In Stock" : "In Stock"}
                </span>
              </p>

              {/* Price like Shop page */}
              <p className="text-green-600 font-bold mt-2 text-2xl">
                ${product.minPrice}
              </p>

              {/* Quantity Selector */}
              <div className="flex items-center gap-3 mt-4">
                <button
                  onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
                  className="bg-gray-200 hover:bg-gray-300 text-lg font-bold px-4 py-1 rounded"
                >
                  -
                </button>
                <span className="font-semibold text-lg">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="bg-gray-200 hover:bg-gray-300 text-lg font-bold px-4 py-1 rounded"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Billing Details */}
          <h3 className="text-xl font-bold mb-4">BILLING DETAILS</h3>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded-lg p-3"
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>
        </div>

        {/* RIGHT: Summary */}
        <div className="bg-white shadow-md rounded-xl p-6 h-fit sticky top-24">
          <h3 className="text-xl font-bold mb-6">SUMMARY</h3>
          <div className="flex justify-between mb-3">
            <span>Sub Total</span>
            <span className="text-green-600 font-semibold">${total}</span>
          </div>
          <div className="flex justify-between border-t pt-4 mb-6">
            <span>Total Price</span>
            <span className="text-green-600 font-bold">${total}</span>
          </div>

          {/* Payment */}
          <div className="mb-6">
            <p className="font-semibold text-lg mb-2">Payment</p>
            <div className="flex gap-4">
              <img src={visaLogo} alt="Visa" className="h-8" />
              <img src={abaLogo} alt="ABA" className="h-8" />
              <img src={mastercardLogo} alt="MasterCard" className="h-8" />
            </div>
          </div>

          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition">
            PAY NOW
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}