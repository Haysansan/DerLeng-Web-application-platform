import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import postService from "../../services/post.service";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  // 🔥 SEARCH ONLY ON CLICK / ENTER
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      setLoading(true);

      const res = await postService.getAllPosts(
        1,
        10,
        searchQuery
      );

      setResults(res.posts || []);
      setOpen(true);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ENTER KEY
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // SELECT RESULT
  const handleSelect = (post) => {
    navigate(`/posts/${post._id}`);
    setSearchQuery("");
    setResults([]);
    setOpen(false);
  };

  // ❌ CLOSE WHEN INPUT IS EMPTY
  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      setOpen(false);
    }
  }, [searchQuery]);

  // ❌ CLOSE WHEN CLICK OUTSIDE
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full max-w-2xl mx-auto"
    >

      {/* SEARCH BAR */}
      <div className="flex items-center gap-3 bg-white rounded-full border border-gray-100 shadow-lg px-4 py-3 z-20 relative">

        <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />

        <input
          type="text"
          placeholder="Attraction, activity or destination..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400 text-sm"
        />

        <button
          onClick={handleSearch}
          className="bg-lime-400 hover:bg-lime-500 text-gray-900 font-semibold px-6 py-2 rounded-full text-sm"
        >
          Search
        </button>

      </div>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white shadow-lg rounded-xl max-h-[300px] overflow-y-auto z-50">

          {loading ? (
            <p className="p-3 text-sm text-gray-400">
              Searching...
            </p>
          ) : results.length === 0 ? (
            <p className="p-3 text-sm text-gray-400">
              No results found
            </p>
          ) : (
            results.map((post) => (
              <div
                key={post._id}
                onClick={() => handleSelect(post)}
                className="flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer"
              >

                <img
                  src={
                    post.images?.[0] ||
                    "https://via.placeholder.com/80"
                  }
                  className="w-20 h-20 rounded-md object-cover"
                />

                <div className="flex-1">
                  <p className="text-sm font-medium line-clamp-1">
                    {post.title}
                  </p>
                  <p className="text-xs text-gray-400 line-clamp-1">
                    {post.content}
                  </p>
                </div>

              </div>
            ))
          )}

        </div>
      )}

    </div>
  );
}