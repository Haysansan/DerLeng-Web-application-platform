import { useState, useContext } from "react";
import logo from "../assets/logo.svg";
import edit from "../assets/edit-illustration.png";
import userService from "../services/user.service.js";
import { AuthContext } from "../context/AuthContext";
import ButtonSpinner from "./ButtonSpinner.jsx";

export default function EditProfileModal({ isOpen, onClose, userData }) {
  const { user, setUser } = useContext(AuthContext);

  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    username: userData?.username || "",
    city: userData?.city || "",
    website: userData?.website || "",
    bio: userData?.bio || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const res = await userService.updateUser(
        user.id,
        formData,
        user.token
      );

      // ✅ Update context instantly
      setUser((prev) => {
        const updated = { ...prev, ...res.data };
        localStorage.setItem("user", JSON.stringify(updated));
        return updated;
      });

      onClose();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md sm:max-w-lg md:max-w-2xl">
        <div className="bg-white overflow-hidden shadow-2xl flex flex-col md:flex-row rounded-l">

          {/* LEFT FORM */}
          <div className="relative w-full md:w-[65%] p-6 flex flex-col">
            <div className="flex items-baseline mb-6">
              <img src={logo} alt="Derleng" className="h-5 w-auto" />
              <span className="text-lg font-bold text-[#002B11]">
                ERLENG
              </span>
            </div>

            <div className="max-w-xs mx-auto w-full">
              <h2 className="text-sm font-bold text-[#002B11] mb-4 text-center">
                Edit Profile
              </h2>

              <div className="space-y-3">
                {[
                  { label: "Username", name: "username" },
                  { label: "Current City", name: "city" },
                  { label: "Website", name: "website" },
                  { label: "Bio", name: "bio" },
                ].map((field) =>
                  field.name === "bio" ? (
                    <div key={field.name}>
                      <label className="block text-xs font-bold mb-1">{field.label}</label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows={3}
                        maxLength={100} // limit to 100 characters
                        className="w-full bg-[#E5E7EB] border border-gray-300 rounded-lg p-2 text-sm outline-none focus:ring-1 focus:ring-[#008A3D]"
                        placeholder="Enter your bio"
                      />
                      <p className="text-xs text-gray-500 text-right mt-1">
                        {formData.bio.length}/100
                      </p>
                    </div>
                  ) : (
                    <div key={field.name}>
                      <label className="block text-xs font-bold mb-1 ">{field.label}</label>
                      <input
                        type="text"
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        className="w-full bg-[#E5E7EB] border border-gray-300 rounded-lg p-2 text-sm 
                        outline-none focus:outline-none focus:ring-1 focus:ring-[#008A3D]"
                        placeholder={`Enter your ${field.label.toLowerCase()}`}
                      />
                    </div>
                  )
                )}
              </div>

              {/* BUTTON */}
              <div className="flex justify-end mt-6">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className={`px-6 py-2 rounded-full flex items-center gap-2 justify-center min-w-[100px] text-white
                    ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#008A3D] cursor-pointer hover:bg-[#006F31]"}
                  `}
                >
                  {loading ? (
                    <>
                      <ButtonSpinner size={1.25} color="white" />
                      Saving...
                    </>
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="hidden md:flex w-[35%] items-center justify-center">
            <img src={edit} alt="Edit" className="max-w-[200px]" />
          </div>

          {/* CLOSE */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}