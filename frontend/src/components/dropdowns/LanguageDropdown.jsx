// components/dropdowns/LanguageDropdown.jsx
import { useState } from "react";

export default function LanguageDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-xl border border-[#002B11] px-4 py-1 text-[#002B11] font-bold hover:bg-gray-50 transition-colors">
        EN
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-24 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
          <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-[#002B11]">
            English
          </button>
          <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-[#002B11]">
            Khmer
          </button>
        </div>
      )}
    </div>
  );
}