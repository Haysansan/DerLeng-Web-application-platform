import { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/discover?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center gap-3 bg-white rounded-full shadow-md px-4 py-3 w-full max-w-2xl mx-auto">
      {/* Search Icon */}
      <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />

      {/* Input Field */}
      <input
        type="text"
        placeholder="Attraction, activity or destination..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400 text-sm"
      />

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="bg-lime-400 hover:bg-lime-500 text-gray-900 font-semibold px-6 py-2 rounded-full transition-colors duration-200 flex-shrink-0 text-sm"
      >
        Search
      </button>
    </div>
  );
}
