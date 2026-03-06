//C:\Users\DELL\Documents\Cadt\cadty3t2\New folder (2)\DerLeng-Web-application-platform\frontend\src\pages\DiscoverPage.jsx
import React, { useState,useEffect } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom"; // for navigation
import placesData from "../data/placesData"; // {id, title, province, type, image}
import discover from "../assets/discover.png";
import api from "../services/api.js";

// Example images for type icons
import mountainImg from "../assets/image.png";
import beachImg from "../assets/image.png";
import waterfallImg from "../assets/image.png";
import cafeImg from "../assets/image.png";
import templeImg from "../assets/image.png";
import cityImg from "../assets/image.png";

export default function Discover() {
  const navigate = useNavigate();
  const [sort, setSort] = useState("Most Popular");
  const [places, setPlaces] = useState([]);
  // Type data with image
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await api.get("/provinces");
        setPlaces(res.data);
      } catch (err) {
        console.log("Failed to fetch places:", err);
      }
    };

    fetchPlaces();
  }, []);
  const types = [
    { name: "Mountain", img:"https://i.pinimg.com/736x/ff/6d/a9/ff6da94e1d64544b15fa958d4e17be1c.jpg" },
    { name: "Sea / Beach", img: "https://i.pinimg.com/736x/6e/99/ec/6e99ecc5fe979f6f71acc5f67266f804.jpg" },
    { name: "Waterfall", img: "https://i.pinimg.com/1200x/59/89/ac/5989ac7f0faa12072150cc4997a33cdd.jpg" },
    { name: "Café", img: "https://i.pinimg.com/736x/1b/f1/27/1bf1270e83b91a142d147a0d9d1874a3.jpg"},
    { name: "Temple", img: templeImg },
    { name: "City View", img: "https://i.pinimg.com/736x/b8/a7/7b/b8a77bc2537c1a6b7af98cea206494a7.jpg"},
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* HERO */}
      <section className="relative w-full h-[250px] md:h-[250px]">
        <img
          src={discover}
          alt="Discover"
          className="w-full h-full object-cover brightness-90"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold text-center">
            Explore places with Derleng
          </h1>
        </div>
      </section>

      {/* FILTERS */}
      <section className="w-full px-6 py-6 bg-white flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">        
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 focus:ring-1 focus:ring-[#008A3D]"
          >
            <option>Most Popular</option>
            <option>Alphabetical</option>
          </select>
        </div>

        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search places..."
            className="w-full border border-gray-300 rounded-lg p-2 pl-10 focus:ring-1 focus:ring-[#008A3D]"
          />
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />
        </div>
      </section>

      {/* TYPE OF PLACE */}
      <section className="w-full px-6 py-4 bg-white">
        <h3 className="text-xl font-bold text-[#002B11] mb-3">Type of Place</h3>
        <div className="flex space-x-4 overflow-x-auto py-2">
          {types.map((type) => (
            <div
              key={type.name}
              className="flex flex-col items-center min-w-[80px] cursor-pointer"
              onClick={() =>
                navigate(`/discover/${type.name.toLowerCase().replace(" ", "-")}`)
              }
            >
              <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-200 shadow-md flex items-center justify-center hover:scale-105 transition">
                <img
                  src={type.img}
                  alt={type.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="mt-2 text-xs font-semibold text-gray-700 text-center">
                {type.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* GRID OF CARDS */}
          <section className="flex-1 px-6 py-6 bg-gray-50">
              <h3 className="text-xl font-bold text-[#002B11] mb-3">Provinces</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {places.map((place) => (
  <div key={place.id} className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition">
    <img src={place.image} alt={place.title} className="w-full h-40 object-cover" />
    <div className="p-3">
      <h2 className="text-sm font-bold text-[#002B11]">{place.province}</h2>
    </div>
  </div>
))}


        </div>
      </section>
    </div>
  );
}
