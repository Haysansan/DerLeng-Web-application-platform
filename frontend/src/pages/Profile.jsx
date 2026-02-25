// src/pages/Profile.jsx
import { useState, useContext } from "react";
import { ChevronDown, Camera } from "lucide-react";
import EditProfileModal from "../components/EditProfile.jsx"; 
import ChangePasswordModal from "../components/ChangePassword.jsx"; 
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import api from "../services/api.js";
export default function Profile() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const defaultUser = {
    name: "N/A",
    username: "N/A",
    email: "N/A",
    bio: "No bio yet",
    location: "N/A",
    joined: "N/A",
    website: "N/A",
    posts: 0,
  };
  const currentUser = { ...defaultUser, ...user };
  const photos = [
    // "https://i.pinimg.com/736x/9c/eb/15/9ceb157883f1562b61849bb01c8df44a.jpg",
    // "https://i.pinimg.com/736x/6d/32/b5/6d32b5f6fdb5d22d737671d3c33cfdbc.jpg",
    // "https://i.pinimg.com/1200x/cd/56/2f/cd562fb3ae21ea89425f7e5ca504f3bb.jpg",
    // "https://i.pinimg.com/1200x/32/8c/dc/328cdc9dc3207f5e5cf4491ee22a7911.jpg",
    // "https://i.pinimg.com/1200x/3f/00/3e/3f003e69ad94c4248bdb45f6001f3860.jpg",
  //   "https://i.pinimg.com/1200x/df/c4/9c/dfc49cc78beed75df853854b4d15b038.jpg",
  //   "https://i.pinimg.com/1200x/d7/e9/06/d7e906c6977ecfa491e0aa0800a9ce44.jpg",
  ];
  const [userPosts, setUserPosts] = useState([]);

useEffect(() => {
  if (user?._id) {
    fetchUserPosts();
  }
}, [user]);

const fetchUserPosts = async () => {
  try {
    const res = await api.get(`/posts/user/${user._id}`, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
    // Update the state
    setUserPosts(res.data); // ✅ this updates userPosts
    console.log("User posts:", res.data.data);
    console.log("Post count:", res.data.count);
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
};
  const [activeTab, setActiveTab] = useState("Photos");
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  const handleEditCover = () => alert("Edit Cover Clicked (later open upload)");
  const handleEditAvatar = () => alert("Edit Profile Picture Clicked (later open upload)");
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
    return <p className="text-center mt-20 text-gray-500">Please login first!</p>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ================= COVER ================= */}
      <div className="relative w-full h-[280px]">
        <img
          src="https://i.pinimg.com/736x/92/71/26/92712683c4f105a5e1664f14057c16bc.jpg"
          alt="cover"
          className="w-full h-full object-cover"
        />

        {/* Cover Edit Icon */}
        <button
          onClick={handleEditCover}
          className="absolute top-4 right-6 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
          title="Edit Cover Photo"
        >
          <Camera size={18} className="text-gray-700" />
        </button>

        {/* Avatar */}
        <div className="absolute left-16 -bottom-12">
          <div className="relative">
            <img
              src="https://i.pinimg.com/736x/e9/18/e6/e918e6b6ab0bc11dedd9975cad3c60a2.jpg"
              alt="avatar"
              className="w-28 h-28 rounded-full border-4 border-white object-cover"
            />
            {/* Avatar Edit Icon */}
            <button
              onClick={handleEditAvatar}
              className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
              title="Edit Profile Picture"
            >
              <Camera size={16} className="text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      {/* ================= USER INFO ================= */}
      <div className="max-w-6xl mx-auto px-6 mt-14 sm:mt-14 md:mt-14 lg:mt-2 xl:mt-2">
        <h1 className="text-2xl font-bold">{currentUser.name}</h1>
        <p className="text-gray-500">{currentUser.username}</p>

        {/* Posts contributed */}
        <div className="flex justify-start mt-2">
          <p className="text-gray-600 text-sm">
            Posts contributed:{" "}
            <span className="font-bold">{userPosts.length}</span> posts
          </p>
        </div>

        {/* TABS */}
        <div className="flex gap-8 mt-4 border-b border-gray-200 pb-2 text-sm font-semibold relative">
          {["My Posts", "Photos", "Favorite"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 ${
                activeTab === tab
                  ? "border-b-2 border-green-600 text-green-700"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              {tab}
            </button>
          ))}

          {/* SETTINGS DROPDOWN */}
          <div className="relative">
            <button
              onClick={() =>
                setShowSettingsDropdown(!showSettingsDropdown)
              }
              className="flex items-center gap-2 pb-2 text-gray-600 hover:text-black"
            >
              Setting
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${
                  showSettingsDropdown ? "rotate-180" : ""
                }`}
              />
            </button>

            {showSettingsDropdown && (
              <div className="absolute left-0 mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <ul className="flex flex-col text-gray-700 text-sm">
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setIsEditModalOpen(true); // open modal
                      setShowSettingsDropdown(false);
                    }}
                  >
                    Edit Profile
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setIsChangePasswordOpen(true); // open change password modal
                  setShowSettingsDropdown(false);
                }}>
                    Change Password
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Privacy Policy
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600">
                    Delete Account
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Switch Account
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-semibold"
                  onClick={handleLogout}>
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* ================= MAIN CONTENT ================= */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-4">
          {/* LEFT INTRO CARD */}
          <div className="bg-white rounded-lg shadow-md p-5 h-fit">
            <h2 className="font-bold text-lg mb-4">Intro</h2>
            <p className="text-sm text-gray-600 mb-4">{currentUser.bio}</p>
            <ul className="text-sm text-gray-500 space-y-2">
              <li>📍 {currentUser.location}</li>
              <li>🗓 {currentUser.joined}</li>
              <li>🔗 {currentUser.website}</li>
            </ul>
            <div className="mt-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-sm">Photos</h3>
                <button className="text-xs text-gray-500 hover:underline">
                  View all
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {photos.slice(0, 6).map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="preview"
                    className="w-full h-16 object-cover rounded-md"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT PHOTO GRID */}
          <div className="md:col-span-3 rounded-lg shadow-md p-3">
            <h2 className="font-bold text-lg mb-4">Photos</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {photos.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="photo"
                  className="w-full h-52 object-cover rounded-lg hover:scale-105 transition"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================= EDIT PROFILE MODAL ================= */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        userData={currentUser}
          />
                <ChangePasswordModal
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
      />
    </div>
  );
}
