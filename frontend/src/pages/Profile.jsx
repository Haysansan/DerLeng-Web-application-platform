import { useState, useContext, useEffect } from "react";
import { ChevronDown, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EditProfileModal from "../components/EditProfile.jsx";
import ChangePasswordModal from "../components/ChangePassword.jsx";
import { AuthContext } from "../context/AuthContext";
import postService from "../services/post.service.js";

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
  };
  const currentUser = { ...defaultUser, ...user };

  const [userPosts, setUserPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [activeTab, setActiveTab] = useState("My Posts");
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  // Fetch posts by user
  const fetchUserPosts = async () => {
    console.log("Current user:", user);
    if (!user?.id || !user?.token) return;
    setLoadingPosts(true);
    try {
      const posts = await postService.getPostsByUser(user.id, user.token);
      console.log("Fetched posts:", posts);
      setUserPosts(posts);
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    if (user?.id) fetchUserPosts();
  }, [user]);

  const handleEditCover = () => alert("Edit Cover Clicked (later open upload)");
  const handleEditAvatar = () => alert("Edit Profile Picture Clicked (later open upload)");
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return <p className="text-center mt-20 text-gray-500">Please login first!</p>;

  return (
    <div className="min-h-screen bg-white">
      {/* COVER */}
      <div className="relative w-full h-[280px]">
        <img
          src="https://i.pinimg.com/736x/92/71/26/92712683c4f105a5e1664f14057c16bc.jpg"
          alt="cover"
          className="w-full h-full object-cover"
        />
        <button
          onClick={handleEditCover}
          className="absolute top-4 right-6 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
          title="Edit Cover Photo"
        >
          <Camera size={18} className="text-gray-700" />
        </button>
        <div className="absolute left-16 -bottom-12">
          <div className="relative">
            <img
              src="https://i.pinimg.com/736x/e9/18/e6/e918e6b6ab0bc11dedd9975cad3c60a2.jpg"
              alt="avatar"
              className="w-28 h-28 rounded-full border-4 border-white object-cover"
            />
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

      {/* USER INFO */}
      <div className="max-w-6xl mx-auto px-6 mt-14">
        <h1 className="text-2xl font-bold">{currentUser.name}</h1>
        <p className="text-gray-500">{currentUser.username}</p>

        <div className="flex justify-start mt-2">
          <p className="text-gray-600 text-sm">
            Posts contributed: <span className="font-bold">{userPosts.length}</span> posts
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
              onClick={() => setShowSettingsDropdown(!showSettingsDropdown)}
              className="flex items-center gap-2 pb-2 text-gray-600 hover:text-black"
            >
              Setting
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${showSettingsDropdown ? "rotate-180" : ""}`}
              />
            </button>

            {showSettingsDropdown && (
              <div className="absolute left-0 mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <ul className="flex flex-col text-gray-700 text-sm">
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setIsEditModalOpen(true);
                      setShowSettingsDropdown(false);
                    }}
                  >
                    Edit Profile
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setIsChangePasswordOpen(true);
                      setShowSettingsDropdown(false);
                    }}
                  >
                    Change Password
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600">
                    Delete Account
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-semibold"
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-4">
          {/* LEFT INTRO + PHOTO PREVIEW */}
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
                <button className="text-xs text-gray-500 hover:underline">View all</button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {userPosts
                  .flatMap((post) => post.images || [])
                  .slice(0, 6)
                  .map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`preview-${i}`}
                      className="w-full h-16 object-cover rounded-md"
                    />
                  ))}
              </div>
            </div>
          </div>

          {/* RIGHT TAB CONTENT */}
          <div className="md:col-span-3 rounded-lg shadow-md p-3">
            {/* My Posts Tab */}
            {activeTab === "My Posts" && (
              <div>
                {loadingPosts ? (
                  <p className="text-gray-500 text-center py-8">Loading posts...</p>
                ) : userPosts.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No posts yet! Start creating your first travel story.</p>
                ) : (
                  <div className="space-y-6">
                    {userPosts.map((post) => (
                      <div key={post.id} className="border rounded-lg p-4 shadow-sm bg-green">
                        <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
                        <p className="mb-2 whitespace-pre-line">{post.content}</p>
                        {post.location_description && (
                          <p className="text-gray-600 mb-2">📍 {post.location_description}</p>
                        )}
                        {post.trip_date && (
                          <p className="text-gray-500 text-sm">
                            🗓 {new Date(post.trip_date).toLocaleDateString()} | ⏱ {post.trip_duration} days | 💰 ${post.trip_cost}
                          </p>
                        )}
                        {post.images && post.images.length > 0 && (
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                            {post.images.map((img, i) => (
                              <img
                                key={i}
                                src={img}
                                alt={`post-${post.title}-${i}`}
                                className="w-full h-40 object-cover rounded-md"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Photos Tab */}
            {activeTab === "Photos" && (
              <div>
                {loadingPosts ? (
                  <p className="text-gray-500 text-center py-8">Loading photos...</p>
                ) : userPosts.length === 0 || userPosts.flatMap((post) => post.images || []).length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No photos yet! Create a post with images.</p>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {userPosts
                      .flatMap((post) => post.images || [])
                      .map((img, i) => (
                        <div key={i} className="relative group overflow-hidden rounded-lg">
                          <img
                            src={img}
                            alt={`photo-${i}`}
                            className="w-full h-52 object-cover rounded-lg hover:scale-105 transition"
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/200?text=Photo+Not+Found";
                            }}
                          />
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}

            {/* Favorite Tab */}
            {activeTab === "Favorite" && (
              <div>
                <p className="text-gray-500 text-center py-8">No favorite posts yet!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODALS */}
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
