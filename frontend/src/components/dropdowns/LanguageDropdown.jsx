// components/dropdowns/LanguageDropdown.jsx
import { useState, useEffect, useRef } from "react";

export default function LanguageDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-xl border border-[#002B11] px-2 sm:px-3 md:px-4 py-1 text-sm sm:text-base text-sm text-[#002B11] font-bold hover:bg-gray-50 transition-colors"
      >
        EN
        <svg
          className={`w-3 h-3 sm:w-4 sm:h-4 md:w-4 md:h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-24 sm:w-28 md:w-32 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
          <button
            className="w-full text-left px-3 sm:px-4 py-2 text-sm sm:text-base md:text-base hover:bg-gray-100 text-[#002B11]"
            onClick={() => setIsOpen(false)}
          >
            English
          </button>
          <button
            className="w-full text-left px-3 sm:px-4 py-2 text-sm sm:text-base md:text-base hover:bg-gray-100 text-[#002B11]"
            onClick={() => setIsOpen(false)}
          >
            Khmer
          </button>
        </div>
      )}
    </div>
  );
}