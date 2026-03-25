// frontend/src/components/profile/AvatarCover.jsx
import { useState } from "react";
import { Camera } from "lucide-react";
import Spinner from "../Spinner.jsx";
import userService from "../../services/user.service.js";

export default function AvatarCover({ user, setUser }) {
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isUploadingCover, setIsUploadingCover] = useState(false);

  const handleEditAvatar = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploadingAvatar(true);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("type", "avatar");

    const res = await userService.uploadProfileImage(formData, user.token);

    setUser((prev) => {
      const updated = { ...prev, avatar: res.data.avatar };
      localStorage.setItem("user", JSON.stringify(updated));
      return updated;
    });
    setIsUploadingAvatar(false);
  };

  const handleEditCover = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploadingCover(true);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("type", "cover");

    const res = await userService.uploadProfileImage(formData, user.token);

    setUser((prev) => {
      const updated = { ...prev, cover: res.data.cover };
      localStorage.setItem("user", JSON.stringify(updated));
      return updated;
    });
    setIsUploadingCover(false);
  };


  return (
    <div className="relative w-full h-[280px] border-1 bg-gradient-to-r from-gray-100 to-gray-200 border-b border-gray-200 group">
      {/* COVER */}
      {isUploadingCover ? (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <Spinner />
        </div>
      ) : user.cover ? (
        <img
          src={`${user.cover}?t=${Date.now()}`}
          alt="cover"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center text-[#025422]">
          <Camera size={32} className="mb-2 opacity-20" />
          <p className="text-sm font-medium opacity-60">No cover image yet.</p>
          <p className="text-xs opacity-40">
            Click the camera icon to personalize your profile
          </p>
        </div>
      )}
      <label className="absolute top-4 right-6 bg-white p-2 rounded-full shadow-md cursor-pointer">
        <Camera size={18} className="text-gray-700" />
        <input type="file" hidden onChange={handleEditCover} />
      </label>

      {/* AVATAR */}
      <div className="absolute left-16 -bottom-12 ">
        <div className="relative">
          <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white">
            {isUploadingAvatar ? (
              <div className="w-full h-full flex items-center justify-center bg-gray-50">
                <Spinner />
              </div>
            ) : user.avatar ? (
              <img
                src={`${user.avatar}?t=${Date.now()}`}
                alt="avatar"
                className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-90"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-green-50">
                <svg
                  className="w-20 h-20 text-green-200"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
            )}
          </div>
          <label className="absolute bottom-1 right-1 bg-white hover:bg-green-100 p-2 rounded-full shadow-md cursor-pointer border-2 border-white transition-all transform hover:rotate-12">
            <Camera size={16} className="text-gray-700" />
            <input type="file" hidden onChange={handleEditAvatar} />
          </label>
        </div>
      </div>
    </div>
    
  );
}