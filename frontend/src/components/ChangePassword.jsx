// src/components/ChangePassword.jsx
import { useState, useContext } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import passwordImg from "../assets/password.png"; 
import userService from "../services/user.service.js";
import { AuthContext } from "../context/AuthContext";
import { toast, Toaster } from "react-hot-toast"; 
import ButtonSpinner from "./ButtonSpinner.jsx";

export default function ChangePasswordModal({ isOpen, onClose }) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSave = async () => {
    const newErrors = {};
    if (!formData.currentPassword) newErrors.currentPassword = "Current password is required";
    if (!formData.newPassword) newErrors.newPassword = "New password is required";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm new password";
    if (formData.newPassword && formData.confirmPassword && formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      await userService.changePassword(user.id, formData, user.token);
      toast.success("Password changed! Please login again.");
      onClose();
      setTimeout(() => {
        logout();
        navigate("/login");
      }, 1500);
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Cannot change password. Current password may be incorrect.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
        <div className="relative w-full max-w-md sm:max-w-lg md:max-w-2xl">
          <div className="flex flex-col md:flex-row overflow-hidden shadow-2xl bg-white rounded-md ">

            {/* LEFT FORM */}
            <div className="relative w-full md:w-[60%] p-6 flex flex-col justify-start rounded-t-md md:rounded-tl-md md:rounded-bl-xl bg-white">
              <div className="flex items-baseline mb-6">
                <img src={logo} alt="Derleng" className="h-5 w-auto" />
                <span className="text-lg font-bold text-[#002B11]" style={{ fontFamily: "Georgia, serif" }}>
                  ERLENG
                </span>
              </div>

              <h2 className="text-sm font-bold text-[#002B11] mb-4 text-center">
                Change Password
              </h2>

              <div className="space-y-3 max-w-xs mx-auto w-full">
                {[
                  ["Current Password", "currentPassword", showCurrent, setShowCurrent],
                  ["New Password", "newPassword", showNew, setShowNew],
                  ["Re-type Password", "confirmPassword", showConfirm, setShowConfirm],
                ].map(([label, name, show, setShow]) => (
                  <div key={name} className="relative">
                    <label className="block text-xs font-bold text-[#002B11] mb-1">{label}</label>
                    <input
                      type={show ? "text" : "password"}
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      className={`w-full bg-[#E5E7EB] border rounded-lg p-2 text-sm outline-none focus:ring-1 focus:ring-[#008A3D] ${
                        errors[name] ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                      }`}
                      placeholder={`Enter ${label.toLowerCase()}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShow(!show)}
                      className="absolute right-2 top-10 -translate-y-1/2 text-gray-500"
                    >
                      {show ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    {errors[name] && (
                      <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* SAVE BUTTON */}
              <div className="flex justify-end mt-6">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className={`px-6 py-2 rounded-full flex items-center gap-2 justify-center text-white min-w-[100px] cursor-pointer ${
                    loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#008A3D] hover:bg-[#006F31]"
                  }`}
                >
                  {loading ? <><ButtonSpinner size={1.25} /> Saving...</> : "Save"}
                </button>
              </div>
            </div>

            {/* RIGHT ILLUSTRATION */}
            <div className="hidden md:flex w-[40%] items-center justify-center bg-white">
              <img src={passwordImg} alt="Password Illustration" className="max-w-[220px] h-auto object-contain" />
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
    </>
  );
}