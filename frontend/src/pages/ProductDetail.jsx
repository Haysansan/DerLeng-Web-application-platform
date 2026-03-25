// src/pages/ProductDetail.jsx
import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products } from "../data/products";
import { CartContext } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext);

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <div className="text-center py-20 text-xl">Product not found</div>;
  }

 
  const handleBuyNow = () => {
    navigate(`/shop/payment/${product.id}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-10">

      {/* LEFT: IMAGE */}
      <div className="md:w-1/2">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded-xl shadow-md"
        />
      </div>

      {/* RIGHT: DETAILS */}
      <div className="md:w-1/2 flex flex-col">

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-[#002B11] mb-4">
          {product.name}
        </h1>

        {/* PRICE */}
        <p className="text-green-600 text-xl font-semibold mb-4">
          ${product.minPrice}
        </p>

        {/* SHORT DESCRIPTION (catalogue) */}
        <p className="text-gray-600 mb-6">
          {product.catalogue}
        </p>

        {/* BUTTONS */}
        <div className="flex gap-4 mb-8">

          {/* BUY NOW (GREEN) */}
          <button
            onClick={handleBuyNow}
            className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition"
          >
            Buy Now
          </button>

          {/* ADD TO CART (RED) */}
          <button
            onClick={() => addToCart(product)} // 🔥 THIS IS THE MAIN PART
            className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition"
          >
            Add to Cart
          </button>

        </div>

        {/* DESCRIPTION SECTION */}
        {product.description && (
          <div className="mb-6">
            <h2 className="font-bold text-lg mb-2">Description</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>
        )}

        {/* HOW TO USE */}
        {product.howToUse && (
          <div>
            <h2 className="font-bold text-lg mb-2">How to use</h2>
            <p className="text-gray-700">{product.howToUse}</p>
          </div>
        )}

      </div>
    </div>
  );
}
