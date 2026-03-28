import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import postService from "../services/post.service";
import StoryCard from "../components/stories/StoryCard";
import { ArrowLeft, Search } from "lucide-react";

export default function SearchResults() {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();

  const query = params.get("q") || "";

  const [search, setSearch] = useState(query);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  // FETCH SEARCH RESULTS
  useEffect(() => {
    const fetchSearch = async () => {
      try {
        setLoading(true);
        const res = await postService.getAllPosts(1, 5, query);
        setPosts(res.posts || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchSearch();
  }, [query]);

  // HANDLE SEARCH
  const handleSearch = (value) => {
    setSearch(value);
  };

  const submitSearch = () => {
    if (!search.trim()) return;
    setParams({ q: search }); // update URL → triggers useEffect
  };

  return (
    <div className="min-h-screen bg-white p-6">

      {/* TOP BAR */}
      <div className="flex items-center gap-4 mb-6">

        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-md"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        {/* SEARCH BOX */}
        <div className="relative w-full max-w-md">
          <input
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") submitSearch();
            }}
            placeholder="Search stories..."
            className="w-full border border-gray-200 px-10 py-2 rounded-md outline-none focus:border-green-500"
          />

          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          {/* BUTTON */}
          <button
            onClick={submitSearch}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-sm bg-green-500 text-white px-3 py-1 rounded-md"
          >
            Go
          </button>
        </div>
      </div>

      {/* TITLE */}
      <h1 className="text-2xl font-bold mb-6">
        Search results:{" "}
        <span className="text-green-600">{query}</span>
      </h1>

      {/* RESULTS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-64 bg-gray-100 animate-pulse rounded-lg"
            />
          ))
        ) : posts.length === 0 ? (
          <p>No results found</p>
        ) : (
          posts.map((post) => (
            <StoryCard key={post._id} post={post} />
          ))
        )}
      </div>
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import postService from "../services/post.service";
// import { ArrowLeft, Search, X } from "lucide-react";

// export default function SearchModal({ isOpen, onClose, onSelect }) {
//   const [search, setSearch] = useState("");
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!isOpen) return;

//     const delay = setTimeout(() => {
//       if (search.trim()) fetchSearch();
//     }, 300);

//     return () => clearTimeout(delay);
//   }, [search, isOpen]);

//   const fetchSearch = async () => {
//     try {
//       setLoading(true);
//       const res = await postService.getAllPosts(1, 10, search);
//       setPosts(res.posts || []);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      
//       {/* MODAL BOX */}
//       <div className="bg-white w-full max-w-xl rounded-xl shadow-lg p-4 relative">

//         {/* CLOSE */}
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-gray-500 hover:text-black"
//         >
//           <X size={20} />
//         </button>

//         {/* SEARCH BAR */}
//         <div className="relative mb-4">
//           <input
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="Search places..."
//             className="w-full border px-10 py-2 rounded-lg outline-none focus:border-green-500"
//           />

//           <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
//         </div>

//         {/* RESULTS */}
//         <div className="max-h-[400px] overflow-y-auto space-y-3">

//           {loading ? (
//             <div className="text-gray-400 text-sm">Searching...</div>
//           ) : posts.length === 0 ? (
//             <div className="text-gray-400 text-sm">No results</div>
//           ) : (
//             posts.map((post) => (
//               <PlaceCard
//                 key={post._id}
//                 post={post}
//                 onSelect={onSelect}
//               />
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

