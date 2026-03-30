import { ChevronDown } from "lucide-react";
import { useEffect, useRef } from "react";
export default function Tabs({
  activeTab,
  setActiveTab,
  showSettingsDropdown,
  setShowSettingsDropdown,
  setIsEditModalOpen,
  setIsChangePasswordOpen,
  handleLogout,
}) {
  const tabs = ["My Posts", "Photos", "Favorite", "Booking History", "Order History"];
  const dropdownRef = useRef(null);

useEffect(() => {
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowSettingsDropdown(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

  return (
    <div className="flex gap-8 mt-4 border-b border-gray-200 pb-2 text-sm font-semibold relative">
      {/* TAB BUTTONS */}
      {tabs.map((tab) => (
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
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowSettingsDropdown(!showSettingsDropdown)}
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
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600 font-semibold"
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}