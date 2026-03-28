import { useState, useEffect } from "react";
import postService from "../services/post.service";
import { X, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SearchModal({ onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSearch = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      try {
        setLoading(true);
        const res = await postService.getAllPosts(1, 5, query);
        setResults(res.posts || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const delay = setTimeout(fetchSearch, 400); // debounce
    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div className="fixed inset-0 bg-black/40 z-[999] flex justify-center items-start pt-20">
      
      <div className="bg-white w-full max-w-xl rounded-xl shadow-lg p-4">
        
        {/* HEADER */}
        <div className="flex items-center gap-2 border-b pb-3">
          <Search size={18} />

          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search stories..."
            className="flex-1 outline-none"
          />

          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* RESULTS */}
        <div className="mt-4 max-h-[400px] overflow-y-auto space-y-3">
          {loading ? (
            <p className="text-gray-400 text-sm">Searching...</p>
          ) : results.length === 0 ? (
            <p className="text-gray-400 text-sm">No results</p>
          ) : (
            results.map((post) => (
              <div
                key={post._id}
                onClick={() => {
                  navigate(`/posts/${post._id}`);
                  onClose();
                }}
                className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
              >
                {/* IMAGE */}
                <img
                  src={post.images?.[0] || "https://via.placeholder.com/80"}
                  className="w-14 h-14 object-cover rounded-md"
                />

                {/* TEXT */}
                <div>
                  <p className="font-medium text-sm line-clamp-1">
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
      </div>
    </div>
  );
}