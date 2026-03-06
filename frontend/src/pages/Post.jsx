// src/pages/Post.jsx
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Calendar, Clock, DollarSign, PlusCircle } from "lucide-react";
import api from "../services/api.js";

export default function PostForm() {
  const { user: currentUser } = useContext(AuthContext);
  const [post, setPost] = useState({
    title: "",
    content: "",
    startDate: "",
    duration: "",
    cost: "",
    province: "", // MongoDB province_id
    type: "",     // MongoDB category_id
    gallery: [],  // Files
    locations: [], // { description, link }
  });

  // Replace with your actual provinces and their MongoDB IDs
  const provinces = [
    { name: "Phnom Penh", id: "6989e728b1df45ae53f0ee7f" },
    { name: "Siem Reap", id: "6989e728b1df45ae53f0ee80" },
    { name: "Battambang", id: "6989e728b1df45ae53f0ee81" },
    { name: "Kampot", id: "6989e728b1df45ae53f0ee82" },
  ];

  // Replace with your actual types and their MongoDB IDs
  const types = [
    { name: "Cultural", id: "6989e587a5cd43bd6ab33cd2" },
    { name: "Adventure", id: "6989e587a5cd43bd6ab33cd3" },
    { name: "Nature", id: "6989e587a5cd43bd6ab33cd4" },
    { name: "Relax", id: "6989e587a5cd43bd6ab33cd5" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files);
    setPost((prev) => ({ ...prev, gallery: [...prev.gallery, ...files] }));
  };

  const handleAddLocation = () => {
    const description = prompt("Enter location description:");
    const link = prompt("Enter Google Maps link (optional):");
    if (description) {
      setPost((prev) => ({
        ...prev,
        locations: [...prev.locations, { description, link }],
      }));
    }
  };
  const handlePublish = async () => {
  try {
    const formData = new FormData();

    formData.append("title", post.title);
    formData.append("content", post.content);
    formData.append("trip_date", new Date(post.startDate).toISOString());
    formData.append("trip_duration", post.duration);
    formData.append("trip_cost", post.cost);
    formData.append("province_id", post.province);
    formData.append("category_id", post.type);

    // **Add logged-in user ID**
    formData.append("user_id", currentUser._id);

    // Add first location
    if (post.locations[0]) {
      formData.append("location_description", post.locations[0].description);
      formData.append("location_link", post.locations[0].link || "");
    }

    // Add images
    post.gallery.forEach((file) => {
      formData.append("images", file);
    });

    await api.post("/posts", formData);
    alert("Post published successfully!");
    setPost({
      title: "",
      content: "",
      startDate: "",
      duration: "",
      cost: "",
      province: "",
      type: "",
      gallery: [],
      locations: [],
    });
  } catch (err) {
    console.error(err);
    alert("Failed to publish post");
  }
};
  return (
    <div className="min-h-screen bg-white font-sans text-gray-700 p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* LEFT COLUMN */}
        <div className="md:col-span-2 space-y-8">
          <header>
            <h1 className="text-3xl font-bold text-teal-900 mb-6">
              Add an impressive title to your trip
            </h1>
            <input
              type="text"
              name="title"
              placeholder="Trip Title"
              value={post.title}
              onChange={handleChange}
              className="w-full text-xl border-b border-gray-300 py-3 focus:outline-none focus:border-green-500 transition-colors"
            />
          </header>

          <section className="space-y-4">
            <div className="flex items-center space-x-2 text-gray-500">
              <PlusCircle size={20} className="text-green-500" />
              <span className="font-medium">Tell a story...</span>
            </div>
            <textarea
              name="content"
              value={post.content}
              onChange={handleChange}
              placeholder="Share your experience..."
              className="w-full h-80 border border-gray-300 rounded-sm p-4 focus:ring-1 focus:ring-green-500 focus:outline-none"
            />
          </section>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-8">
          {/* Trip Details */}
          <section>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">
              Trip Details
            </h3>
            <div className="space-y-4 text-sm">
              <div>
                <div className="flex items-start space-x-3">
                  <Calendar size={18} className="mt-0.5" />
                  <input
                    type="date"
                    name="startDate"
                    onChange={handleChange}
                    className="block w-full border border-gray-300 p-1 focus:ring-0 text-gray-600 rounded-sm"
                  />
                </div>
                <p className="text-xs text-gray-400">
                  Add start date to your trip
                </p>
              </div>

              <div>
                <div className="flex items-start space-x-3">
                  <Clock size={18} className="mt-0.5" />
                  <input
                    type="text"
                    name="duration"
                    placeholder="Trip Duration (e.g., 2 days)"
                    onChange={handleChange}
                    className="block w-full border border-gray-300 focus:ring-0 text-gray-600 rounded-sm p-1"
                  />
                </div>
                <p className="text-xs text-gray-400">
                  Duration of the trip
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <DollarSign size={18} />
                <input
                  type="number"
                  name="cost"
                  placeholder="Trip cost in USD"
                  value={post.cost}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-sm p-1 w-full"
                  min="0"
                />
              </div>
              <p className="text-xs text-gray-400">How much you spent</p>
            </div>
          </section>

          {/* Province & Type */}
          <section className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-2">
                Province
              </label>
              <select
                name="province"
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-sm bg-white"
              >
                <option value="">Select province</option>
                {provinces.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-2">
                Type of Place
              </label>
              <select
                name="type"
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-sm bg-white"
              >
                <option value="">Select type</option>
                {types.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
          </section>

          {/* Gallery */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Gallery ({post.gallery.length})
              </h3>
              <label className="bg-[#008A3D] text-white text-[13px] font-bold px-3 py-1 rounded cursor-pointer hover:bg-green-600">
                + Add Images
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleGalleryUpload}
                />
              </label>
            </div>
            <div className="flex flex-wrap gap-2">
              {post.gallery.map((file, i) => (
                <div key={i} className="relative h-24 w-24">
                  <img
                    src={URL.createObjectURL(file)}
                    className="h-24 w-24 object-cover rounded"
                    alt="Gallery"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPost((prev) => ({
                        ...prev,
                        gallery: prev.gallery.filter((_, index) => index !== i),
                      }));
                    }}
                    className="absolute top-0 right-0 bg-red-400 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Locations */}
          <section>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Locations ({post.locations.length})
              </h3>
              <button
                type="button"
                onClick={handleAddLocation}
                className="bg-[#008A3D] text-white text-[13px] font-bold px-3 py-1 rounded hover:bg-green-600"
              >
                + Add Location
              </button>
            </div>
            <ul className="text-sm text-gray-600 list-disc ml-5 space-y-1">
              {post.locations.map((loc, i) => (
                <li key={i} className="flex justify-between items-center">
                  <span>{loc.description}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setPost((prev) => ({
                        ...prev,
                        locations: prev.locations.filter((_, index) => index !== i),
                      }));
                    }}
                    className="text-red-500 text-xs font-bold hover:text-red-700 ml-2"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          </section>

          {/* Publish */}
          <button
            className="w-full bg-[#008A3D] text-white font-bold py-3 rounded-md hover:bg-green-600 transition-colors cursor-pointer"
            onClick={handlePublish}
          >
            Publish Post
          </button>
        </div>
      </div>
    </div>
  );
}