// src/components/Navbar.jsx
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { CircleUser, Bell, MessageCircleQuestionMark } from "lucide-react";
import AuthModals from "./AuthModals";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import NotificationPanel from "./NotificationPanel";
export default function Navbar() {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
   const handleUserClick = () => {
    if (user) {
      // Already logged in → go to profile
      navigate("/profile");
    } else {
      // Not logged in → show login modal
      setIsLoginOpen(true);
    }
  };
  return (
    <>
      <header className="w-full bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-16 items-center justify-between">

            {/* Logo */}
            <Link to="/" className="flex items-baseline group gap-1">
              <img src={logo} alt="Derleng" className="h-10 sm:h-9 w-auto" />
              <span
                className="text-xl sm:text-2xl font-bold tracking-tight -ml-1"
                style={{
                  color: "#002B11",
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  lineHeight: "1",
                }}
              >
                ERLENG
              </span>
            </Link>

            {/* Nav */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
              <Link to="/discover" className="hover:text-[#002B11]">Discover</Link>
              <Link to="/post" className="hover:text-[#002B11]">Post</Link>
              <Link to="/TravelStories" className="hover:text-[#002B11]">Stories</Link>
              <Link to="/about" className="hover:text-[#002B11]">About</Link>
            </nav>

            {/* Right */}
            <div className="flex items-center gap-4">
              {/* Language selector */}
              <div className="relative">
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center gap-2 rounded-xl border border-[#002B11] px-4 py-1 text-[#002B11] font-bold hover:bg-gray-50 transition-colors"
                >
                  <span>EN</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${isLangOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>

                {isLangOpen && (
                  <div className="absolute right-0 mt-2 w-24 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                    <button
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-[#002B11]"
                    >
                      English
                    </button>
                    <button
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-[#002B11]"
                    >
                      Khmer
                    </button>
                  </div>
                )}
              </div>

              {/* Notifications */}
              <button
                className="p-1 rounded-full hover:bg-gray-100 transition-colors relative"
                aria-label="Notifications"
                onClick={() => setShowNotifications(true)}
              >
                <Bell className="w-6 h-6 text-[#002B11]" />
                <span className="absolute -top-1 -right-1 block w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* FAQ */}
              <button
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="FAQ"
                onClick={() => navigate("/faq")}
              >
                <MessageCircleQuestionMark className="w-6 h-6 text-[#002B11]" />
                
              </button>

              {/* User/Login */}
              {/* <button
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                onClick={() => setIsLoginOpen(true)}
                aria-label="Login"
              > */}
              <button
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                onClick={handleUserClick} // ✅ updated logic
                aria-label={user ? "Profile" : "Login"}
              >
                <CircleUser className="w-6 h-6 text-[#002B11]" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Login Modal */}
      <AuthModals
  isOpen={isLoginOpen}
  onClose={() => setIsLoginOpen(false)}
      />
      <NotificationPanel
  isOpen={showNotifications}
  onClose={() => setShowNotifications(false)}
/>

    </>
  );
}
