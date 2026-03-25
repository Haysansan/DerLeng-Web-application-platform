import { useState, useContext } from "react";
import { Link, useNavigate,useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";
import { CircleUser, Bell, MessageCircleQuestionMark, Menu, X } from "lucide-react";
import AuthModals from "./AuthModals";
import NotificationPanel from "./NotificationPanel";
import LanguageDropdown from "./dropdowns/LanguageDropdown";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleUserClick = () => {
    if (user) navigate("/profile");
    else setIsLoginOpen(true);
  };

  return (
    <>
      <header className="w-full bg-white shadow-sm sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-16 items-center justify-between">

            {/* Logo */}
            <Link to="/" className="flex items-baseline gap-1">
              <img
                src={logo}
                alt="Derleng"
                className="max-h-7 sm:max-h-6 md:max-h-9 w-auto"
              />
              <span
                className="text-sm sm:text-md md:text-2xl max:text-2xl font-bold tracking-tight -ml-1"
                style={{
                  color: "#002B11",
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  lineHeight: "1",
                }}
              >
                ERLENG
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
              <Link to="/discover" className={`hover:text-[#002B11] hover:scale-110 transition-transform duration-200 ${
                    location.pathname === "/discover" ? "text-[#002B11] font-bold text-lg" : "text-gray-700"
                }`}>
                Discover
              </Link>

              <Link to="/post" className={`hover:text-[#002B11] hover:scale-110 transition-transform duration-200 ${
                    location.pathname === "/post" ? "text-[#002B11] font-bold text-lg" : "text-gray-700"
                }`}>
                Post
              </Link>

              <Link to="/TravelStories" className={`hover:text-[#002B11] hover:scale-110 transition-transform duration-200 ${
                    location.pathname === "/TravelStories" ? "text-[#002B11] font-bold text-lg" : "text-gray-700"
                }`}>
                Stories
              </Link>

              <Link to="/shop" className={`hover:text-[#002B11] hover:scale-110 transition-transform duration-200 ${
                    location.pathname === "/shop" ? "text-[#002B11] font-bold text-lg " : "text-gray-700"
                }`}>
                Shop
              </Link>

              <Link to="/about" className={`hover:text-[#002B11] hover:scale-110 transition-transform duration-200 ${
                    location.pathname === "/about" ? "text-[#002B11] font-bold text-lg" : "text-gray-700"
                }`}>
                About
              </Link>


            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-4">

              {/* Hamburger (mobile only) */}
              <button
                className="md:hidden "
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="w-6 h-6 text-[#002B11]" />
              </button>

              <LanguageDropdown />

              <button
                onClick={() => setShowNotifications(true)}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors relative"
              >
                <Bell className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#002B11]" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <button
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                onClick={() => navigate("/faq")}
              >
                <MessageCircleQuestionMark className="w-5 h-5 md:w-6 md:h-6 text-[#002B11]" />
              </button>

              <button
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                onClick={handleUserClick}
              >
                <CircleUser className="w-5 h-5 md:w-6 md:h-6 text-[#002B11]" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Slide Menu */}
      {mobileMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Menu */}
          <div className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 p-6 flex flex-col gap-6">

            <div className="flex justify-end">
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="w-7 h-7 text-[#002B11]" />
              </button>
            </div>

            <Link to="/discover" onClick={() => setMobileMenuOpen(false)}>
              Discover
            </Link>

            <Link to="/post" onClick={() => setMobileMenuOpen(false)}>
              Post
            </Link>

            <Link to="/TravelStories" onClick={() => setMobileMenuOpen(false)}>
              Stories
            </Link>

            <Link to="/shop" onClick={() => setMobileMenuOpen(false)}>
              Shop
            </Link>
            
            <Link to="/about" onClick={() => setMobileMenuOpen(false)}>
              About
            </Link>


          </div>
        </>
      )}

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