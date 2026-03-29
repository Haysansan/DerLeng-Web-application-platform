
import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const price = product.price;

 
  const handleClick = () => navigate(`/shop/${product._id}`);

  return (
    <div
      onClick={handleClick} 
      className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition flex flex-col h-full cursor-pointer"
    >
      <img src={product.image} alt={product.name} className="h-48 w-full object-cover" />
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-lg text-[#002B11]">{product.name}</h3>
        <p className="text-gray-600 text-sm my-2">{product.catalogue}</p>
        <p className="text-green-600 font-semibold mb-2">${price}</p>
      </div>
    </div>
  );
}
