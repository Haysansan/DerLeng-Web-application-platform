import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditProfileModal from "../components/EditProfile.jsx";
import ChangePasswordModal from "../components/ChangePassword.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import postService from "../services/post.service.js";
import userService from "../services/user.service.js";
import bookingService from "../services/booking.service.js";
import AvatarCover from "../components/profile/AvatarCover.jsx";
import PersonalInfo from "../components/profile/PersonalInfo.jsx";
import Tabs from "../components/profile/Tabs.jsx";
import TabContent from "../components/profile/TabContent.jsx";

export default function Profile() {
  const { user, setUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const defaultUser = {
    username: "N/A",
    email: "N/A",
    bio: "No bio yet",
    location: "N/A",
    created_at: "N/A",
    website: "N/A",
  };
  const currentUser = { ...defaultUser, ...user };

  const [userPosts, setUserPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [activeTab, setActiveTab] = useState("My Posts");
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [userBookings, setUserBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [setStatusValue] = useState("");
  const [preview, setPreview] = useState(null);

  // NEW: spinner states
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  // inside the component
  const creationDay = currentUser.created_at
    ? (() => {
        const d = new Date(currentUser.created_at);
        const month = d.toLocaleString("en-US", { month: "short" });
        const day = d.getDate();
        const year = d.getFullYear();
        return `${month} ${day} ${year}`;
      })()
    : "";


  const fetchUserPosts = async () => {
    if (!user?.id || !user?.token) return;

    setLoadingPosts(true);
    try {
      const posts = await postService.getPostsByUser(user.id, user.token);
      const postsWithLikes = await Promise.all(
        posts.map(async (post) => {
          const id = post._id || post.id;
          const likes = await postService.getLikesCount(id);
          return {
            ...post,
            _id: id,
            images: post.images || [],
            likes: likes || 0,
            liked: false,
          };
        })
      );
      setUserPosts(postsWithLikes);
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally {
      setLoadingPosts(false);
    }
  };

    const fetchUserBookings = async () => {
    try {
      const res = await bookingService.getMyBookings();
      setUserBookings(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingBookings(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchUserPosts();
      fetchUserBookings();
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navigateToDetail = (postId) => navigate(`/posts/${postId}`);

  const handleLike = async (postId) => {
    const result = await postService.toggleLike(postId);
    setUserPosts((prev) =>
      prev.map((p) =>
        (p._id || p.id) === postId
          ? {
              ...p,
              liked: result.liked,
              likes: result.liked ? (p.likes || 0) + 1 : (p.likes || 0) - 1,
            }
          : p
      )
    );
  };

  const handleFavorite = (postId) => {
    setUserPosts((prev) =>
      prev.map((p) =>
        (p._id || p.id) === postId ? { ...p, isFavorite: !p.isFavorite } : p
      )
    );
  };

  if (!user)
    return (
      <p className="text-center mt-20 text-gray-500">Please login first!</p>
    );

  return (
    <div className="min-h-screen bg-white">
      {/* COVER */}
      <AvatarCover user={currentUser} setUser={setUser} />
      {/* USER INFO */}
      <div className="max-w-6xl mx-auto px-6 mt-10 sm:mt-12 md:mt-16 lg:mt-1">
        <h1 className="text-2xl text-[#002B11] font-bold">{currentUser.username}</h1>
        <div className="flex justify-start mt-2">
          <p className="text-gray-600 text-sm">
            Posts contributed: <span className="font-bold">{userPosts.length}</span> posts
          </p>
        </div>

        {/* TABS */}
        <Tabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          showSettingsDropdown={showSettingsDropdown}
          setShowSettingsDropdown={setShowSettingsDropdown}
          setIsEditModalOpen={setIsEditModalOpen}
          setIsChangePasswordOpen={setIsChangePasswordOpen}
          handleLogout={handleLogout}
        />

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-4">
          {/* LEFT INTRO + PHOTO PREVIEW */}
          <PersonalInfo
                currentUser={currentUser}
                userPosts={userPosts}
                setActiveTab={setActiveTab}
                setIsEditModalOpen={setIsEditModalOpen}
            />

          {/* RIGHT TAB CONTENT */}
          <TabContent
            activeTab={activeTab}
            userPosts={userPosts}
            loadingPosts={loadingPosts}
            userBookings={userBookings}
            loadingBookings={loadingBookings}
            navigateToDetail={navigateToDetail}
            handleLike={handleLike}
            handleFavorite={handleFavorite}
            selectedBooking={selectedBooking}
            setSelectedBooking={setSelectedBooking}
            preview={preview}
            setPreview={setPreview}

          />
        </div>
      </div>
      {/* BOOKING DETAIL MODAL */}

         
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
