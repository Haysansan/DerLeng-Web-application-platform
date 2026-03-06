// src/components/Navbar.jsx
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { CircleUser, Bell, MessageCircleQuestionMark } from "lucide-react";
import AuthModals from "./AuthModals";
import NotificationPanel from "./NotificationPanel";
import LanguageDropdown from "./dropdowns/LanguageDropdown";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleUserClick = () => {
    if (!user) {
      setIsLoginOpen(true);
      return;
    }

    if (user.role === "Admin") {
      navigate("/admin");
    } else {
      navigate("/profile");
    }
  };

  return (
    <>
      <header className="w-full bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-16 items-center justify-between">

            {/* Logo */}
            <Link to="/" className="flex items-baseline gap-1">
              <img src={logo} alt="Derleng" className="h-10 sm:h-9 w-auto" />
              <span className="text-xl sm:text-2xl font-bold tracking-tight -ml-1" style={{ color: "#002B11", fontFamily: "Georgia, 'Times New Roman', serif", lineHeight: "1" }}>
                ERLENG
              </span>
            </Link>

            {/* Nav Links */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
              <Link to="/discover" className="hover:text-[#002B11] hover:scale-110 transition-transform duration-200">Discover</Link>
              <Link to="/post" className="hover:text-[#002B11] hover:scale-110 transition-transform duration-200">Post</Link>
              <Link to="/TravelStories" className="hover:text-[#002B11] hover:scale-110 transition-transform duration-200">Stories</Link>
              <Link to="/about" className="hover:text-[#002B11] hover:scale-110 transition-transform duration-200">About</Link>
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              <LanguageDropdown />

              <button onClick={() => setShowNotifications(true)} className="p-1 rounded-full hover:bg-gray-100 transition-colors relative">
                <Bell className="w-6 h-6 text-[#002B11]" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <button className="p-1 rounded-full hover:bg-gray-100 transition-colors" onClick={() => navigate("/faq")}>
                <MessageCircleQuestionMark className="w-6 h-6 text-[#002B11]" />
              </button>

              <button className="p-1 rounded-full hover:bg-gray-100 transition-colors" onClick={handleUserClick}>
                <CircleUser className="w-6 h-6 text-[#002B11]" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AuthModals isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <NotificationPanel isOpen={showNotifications} onClose={() => setShowNotifications(false)}/></>
  );
}
