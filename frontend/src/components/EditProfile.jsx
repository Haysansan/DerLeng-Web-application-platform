// src/components/EditProfileModal.jsx
import React, { useState } from "react";
import logo from "../assets/logo.svg";
import edit from "../assets/edit-illustration.png"; // replace with your illustration

export default function EditProfileModal({ isOpen, onClose, userData }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: userData?.name || "",
    username: userData?.username || "",
    city: userData?.city || "",
    website: userData?.website || "",
    bio: userData?.bio || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Saving data:", formData);
    // TODO: Add API call
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md sm:max-w-lg md:max-w-2xl">
        <div className="bg-white overflow-hidden shadow-2xl flex flex-col md:flex-row h-auto md:h-auto rounded-l">
          
          {/* LEFT FORM */}
          <div className="relative w-full md:w-[65%] p-6 flex flex-col">
            {/* Logo */}
            <div className="flex items-baseline mb-6">
              <img src={logo} alt="Derleng" className="h-5 w-auto" />
              <span className="text-lg font-bold text-[#002B11]" style={{ fontFamily: "Georgia, serif" }}>
                ERLENG
              </span>
            </div>

            {/* Form */}
            <div className="max-w-xs mx-auto w-full">
              <h2 className="text-sm font-bold text-[#002B11] mb-4 text-center">Edit Profile</h2>

              <div className="space-y-3">
                {[
                  { label: "Name", name: "name" },
                  { label: "Username", name: "username" },
                  { label: "Current City", name: "city" },
                  { label: "Website", name: "website" },
                  { label: "Bio", name: "bio" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-xs font-bold text-[#002B11] mb-1">{field.label}</label>
                    <input
                      type="text"
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="w-full bg-[#E5E7EB] border border-gray-300 rounded-lg p-2 text-sm outline-none focus:ring-1 focus:ring-[#008A3D]"
                      placeholder={`Enter your ${field.label.toLowerCase()}`}
                    />
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-[#008A3D] text-white font-semibold rounded-full hover:bg-[#006F31] transition"
                >
                  Save
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div className="relative hidden md:flex w-[35%]   overflow-hidden items-center justify-center">
            <img src={edit} alt="Edit Illustration" className="relative z-10 w-full max-w-[200px] object-contain" />
          </div>

          {/* Close Button */}
          <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-black text-xl">✕</button>
        </div>
      </div>
    </div>
  );
}
