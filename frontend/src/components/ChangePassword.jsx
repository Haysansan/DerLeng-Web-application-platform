//C:\Users\DELL\Documents\Cadt\cadty3t2\New folder (2)\DerLeng-Web-application-platform\frontend\src\components\ChangePassword.jsx
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import logo from "../assets/logo.svg";
import passwordImg from "../assets/password.png"; // your illustration

export default function ChangePasswordModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      alert("New password and confirmation do not match!");
      return;
    }
    console.log("Changing password:", formData);
    // TODO: API call to change password
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md sm:max-w-lg md:max-w-2xl">
        <div className="bg-white overflow-hidden shadow-2xl flex flex-col md:flex-row h-auto md:h-[500px] rounded-xl">

          {/* LEFT FORM */}
          <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
            {/* Logo */}
            <div className="flex items-baseline mb-6">
              <img src={logo} alt="Derleng" className="h-5 w-auto" />
              <span className="text-lg font-bold text-[#002B11]" style={{ fontFamily: "Georgia, serif" }}>
                ERLENG
              </span>
            </div>

            <h2 className="text-sm font-bold text-[#002B11] mb-4 text-center">Change Password</h2>

            <div className="space-y-3">
              {/* Current Password */}
              <div className="relative">
                <label className="block text-xs font-bold text-[#002B11] mb-1">Current Password</label>
                <input
                  type={showCurrent ? "text" : "password"}
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className="w-full bg-[#E5E7EB] border border-gray-300 rounded-lg p-2 text-sm outline-none focus:ring-1 focus:ring-[#008A3D]"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-2 top-10 -translate-y-1/2 text-gray-500"
                >
                  {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* New Password */}
              <div className="relative">
                <label className="block text-xs font-bold text-[#002B11] mb-1">New Password</label>
                <input
                  type={showNew ? "text" : "password"}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full bg-[#E5E7EB] border border-gray-300 rounded-lg p-2 text-sm outline-none focus:ring-1 focus:ring-[#008A3D]"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-2 top-10 -translate-y-1/2 text-gray-500"
                >
                  {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <label className="block text-xs font-bold text-[#002B11] mb-1">Re-type Password</label>
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-[#E5E7EB] border border-gray-300 rounded-lg p-2 text-sm outline-none focus:ring-1 focus:ring-[#008A3D]"
                  placeholder="Re-type new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-2 top-10 -translate-y-1/2 text-gray-500"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-[#008A3D] text-white font-semibold rounded-full hover:bg-[#006F31] transition"
              >
                Save
              </button>
            </div>
          </div>

          {/* RIGHT ILLUSTRATION */}
          <div className="relative hidden md:flex w-[50%] overflow-hidden items-center justify-center">
            <img
              src={passwordImg}
              alt="Password Illustration"
              className="w-full h-full object-contain max-w-md"
            />
          </div>

          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-black text-xl"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
