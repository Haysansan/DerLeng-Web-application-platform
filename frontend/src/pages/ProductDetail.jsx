// src/pages/ProductDetail.jsx
import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { useEffect } from "react";
import { getProducts } from "../services/product.service";
import { useState } from "react";
import { AuthContext } from "../context/AuthContext";
import AuthModals from "../components/AuthModals";
import PostLoginPromptModal from "../components/PostLoginPromptModal";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProducts(); 
        // const product = res?.data?.data || []; //safty to check nested data
        const found = res.data.data.find((p) => String(p._id) === String(id));
        if (found) {
          setProduct(found);
        } else {
          console.error("No Product found with ID:", id)
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleActionWithAuth = (type) => {
    if (!user) {
      setShowPrompt(true);
      return;
    }

    if (type === "add") {
      addToCart(product);
    } else {
      addToCart(product);
      navigate("/cart");
    }
  }
  if (!product) {
    return <div className="text-center py-20 text-xl">Product not found</div>;
  }

 
  // const handleBuyNow = () => {
  //   addToCart(product);
  //   navigate(`/cart}`);
  // };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 ">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-green-600 mb-4 transition"
      >
        ← Back
      </button>
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
          ${product.price}
        </p>

        {/* SHORT DESCRIPTION (catalogue) */}
        <p className="text-gray-600 mb-6">{product.catalogue}</p>

        {/* BUTTONS */}
        <div className="flex gap-4 mb-8">
          {/* BUY NOW (GREEN) */}
          <button
            onClick={() => handleActionWithAuth("buy")}
            className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition"
          >
            Buy Now
          </button>

          {/* ADD TO CART (RED) */}
          <button
            onClick={() => handleActionWithAuth("add")}
            className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition"
          >
            Add to Cart
          </button>
        </div>

        {/* The Modal */}
        <PostLoginPromptModal
          isOpen={showPrompt}
          message="Please sign in to purchase or add items to your cart."
          onClose={() => setShowPrompt(false)}
          onLogin={() => {
            setShowPrompt(false);
            setShowLogin(true);
          }}
        />
        <AuthModals isOpen={showLogin} onClose={() => setShowLogin(false)} />

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
