// // frontend/src/pages/TravelStories.jsx
// import { useNavigate } from "react-router-dom";
// import useTravelStories from "../hooks/useTravelStories";
// import StoryCard from "../components/stories/StoryCard";
// import FeaturedStories from "../components/stories/FeaturedStories";
// import { Search } from "lucide-react";
// import { motion } from "framer-motion";
// import Spinner from "../components/Spinner";

// export default function TravelStories() {
//   const {
//     posts,
//     loading,
//     toggleLikePost,
//     toggleFavoritePost,
//     page,
//     setPage,
//     totalPages,
//   } = useTravelStories();

//   const navigate = useNavigate();

//   const handlePostClick = (postId) => {
//     navigate(`/posts/${postId}`);
//   };
//     if (loading)
//     return (
//       <div className="flex flex-col justify-center items-center min-h-[200vh] bg-white">
//         <Spinner></Spinner>
//       </div>
//     );

//   return (
//     <motion.div
//       initial={{ opacity: 0, x: -10 }}
//       animate={{ opacity: 1, x: 0 }}
//       exit={{ opacity: 0, x: 10 }}
//       className="min-h-screen bg-white"
//     >
//       <FeaturedStories
//         posts={posts} 
//         onFavorite={toggleFavoritePost} 
//         onLike={toggleLikePost}
//       />
//       {/* HEADER */}
//       <section className="px-8 py-4 max-w-[1600px] mx-auto sticky top-0 bg-white z-50 shadow-sm">
//   <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">

//     {/* LEFT SIDE TITLE */}
//     <div>
//       <h1 className="text-3xl font-bold text-[#002B11]">
//         Travel Stories
//       </h1>
//       <p className="text-gray-500">
//         Discover experiences from our community
//       </p>
//     </div>

//     {/* RIGHT SIDE SEARCH */}
//     <div className="flex space-x-4 items-center w-full md:w-auto">

//       {/* OPTIONAL BUTTON (extra UX) */}
//       <button
//         onClick={() => navigate(`/search`)}
//         className="flex items-center gap-2 border border-gray-100  px-3 py-2 rounded-xl hover:bg-gray-50"
//       >
//         <Search size={16} />
//         Search
//       </button>

//     </div>
//   </div>
// </section>
  

//       {/* POSTS */}
//       <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
//         {loading
//           ? Array.from({ length: 8 }).map((_, i) => (
//               <div
//                 key={i}
//                 className="h-64 bg-gray-100 animate-pulse rounded-lg"
//               />
//             ))
//           : posts.map((post) => (
//               <StoryCard
//                 key={post._id}
//                 post={post}
//                 onLike={toggleLikePost}
//                 onFavorite={toggleFavoritePost}
//                 onClick={() => handlePostClick(post._id)}
                
//               />
//             ))}
//       </div>

//       {/* PAGINATION */}
//       <div className="flex justify-center mt-8 gap-2 mb-4">
//         {Array.from({ length: totalPages }, (_, i) => (
//           <button
//             key={i + 1}
//             onClick={() => setPage(i + 1)}
//             className={`px-3 py-1 rounded-md ${
//               page === i + 1 ? "bg-green-500 text-white" : "bg-gray-100"
//             }`}
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>
      
//     </motion.div>
//   );
// }

// // frontend/src/pages/TravelStories.jsx
// import { useNavigate } from "react-router-dom";
// import useTravelStories from "../hooks/useTravelStories";
// import StoryCard from "../components/stories/StoryCard";
// import FeaturedStories from "../components/stories/FeaturedStories";
// import { Search } from "lucide-react";
// import { motion } from "framer-motion";
// import Spinner from "../components/Spinner";
// import { useState } from "react";
// import EditPostModal from "../components/EditPostModal";
// import { deletePost } from "../services/post.service";
// import { Toaster } from "react-hot-toast";


// export default function TravelStories() {
//   const {
//     posts,
//     loading,
//     toggleLikePost,
//     toggleFavoritePost,
//     page,
//     setPage,
//     totalPages,
//   } = useTravelStories();

//   const navigate = useNavigate();
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [selectedPost, setSelectedPost] = useState(null);
//   const handlePostClick = (postId) => {
//     navigate(`/posts/${postId}`);
//   };
    
//     const handleEdit = (post) => {
//   setSelectedPost(post);
//   setShowEditModal(true);
//   };
  
//   const handleDelete = async (postId) => {
//   if (!window.confirm("Are you sure you wanwwt to delete this post?")) return;

//   try {
//     await deletePost(postId);

//     // 🔥 refresh posts (simple way)
//     window.location.reload();

//   } catch (err) {
//     console.error(err);
//     alert("Delete failed");
//   }
//   };

//   if (loading)
//     return (
//       <div className="flex flex-col justify-center items-center min-h-[200vh] bg-white">
//         <Spinner></Spinner>
//       </div>
//     );
  
//   return (
//     <motion.div
//       initial={{ opacity: 0, x: -10 }}
//       animate={{ opacity: 1, x: 0 }}
//       exit={{ opacity: 0, x: 10 }}
//       className="min-h-screen bg-white"
//     >
//       <Toaster position="top-center" reverseOrder={false} />
//       <FeaturedStories
//         posts={posts} 
//         onFavorite={toggleFavoritePost} 
//         onLike={toggleLikePost}
//       />
//       {/* HEADER */}
//       <section className="px-8 py-4 max-w-[1600px] mx-auto sticky top-0 bg-white z-50 shadow-sm">
//   <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">

//     {/* LEFT SIDE TITLE */}
//     <div>
//       <h1 className="text-3xl font-bold text-[#002B11]">
//         Travel Stories
//       </h1>
//       <p className="text-gray-500">
//         Discover experiences from our community
//       </p>
//     </div>

//     {/* RIGHT SIDE SEARCH */}
//     <div className="flex space-x-4 items-center w-full md:w-auto">

//       {/* OPTIONAL BUTTON (extra UX) */}
//       <button
//         onClick={() => navigate(`/search`)}
//         className="flex items-center gap-2 border border-gray-100  px-3 py-2 rounded-xl hover:bg-gray-50"
//       >
//         <Search size={16} />
//         Search
//       </button>

//     </div>
//   </div>
// </section>
  

//       {/* POSTS */}
//       <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
//         {loading
//           ? Array.from({ length: 8 }).map((_, i) => (
//               <div
//                 key={i}
//                 className="h-64 bg-gray-100 animate-pulse rounded-lg"
//               />
//             ))
//           : posts.map((post) => (
//               <StoryCard
//   key={post._id}
//   post={post}
//   onLike={toggleLikePost}
//   onFavorite={toggleFavoritePost}
//   onClick={() => handlePostClick(post._id)}

//   // ✅ ADD THESE
//   onEdit={handleEdit}
//   onDelete={handleDelete}
// />
//             ))}
//       </div>

//       {/* PAGINATION */}
//       <div className="flex justify-center mt-8 gap-2 mb-4">
//         {Array.from({ length: totalPages }, (_, i) => (
//           <button
//             key={i + 1}
//             onClick={() => setPage(i + 1)}
//             className={`px-3 py-1 rounded-md ${
//               page === i + 1 ? "bg-green-500 text-white" : "bg-gray-100"
//             }`}
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>
//       {showEditModal && (
//   <EditPostModal
//     post={selectedPost}
//     onClose={() => setShowEditModal(false)}
//     onUpdated={() => {
//       setShowEditModal(false);
//       window.location.reload(); // refresh list
//     }}
//   />
// )}
      
//     </motion.div>
//   );
// }


// frontend/src/pages/TravelStories.jsx
import { useNavigate } from "react-router-dom";
import useTravelStories from "../hooks/useTravelStories";
import StoryCard from "../components/stories/StoryCard";
import FeaturedStories from "../components/stories/FeaturedStories";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import Spinner from "../components/Spinner";
import { useState } from "react";
import EditPostModal from "../components/EditPostModal";
import { deletePost } from "../services/post.service";
import { Toaster } from "react-hot-toast";
import SearchModal from "../components/SearchModal";

export default function TravelStories() {
  const {
    posts,
    loading,
    toggleLikePost,
    toggleFavoritePost,
    page,
    setPage,
    totalPages,
    topPosts,
  } = useTravelStories();

  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const handlePostClick = (postId) => {
    navigate(`/posts/${postId}`);
  };
    
    const handleEdit = (post) => {
  setSelectedPost(post);
  setShowEditModal(true);
  };
  
  const handleDelete = async (postId) => {
  if (!window.confirm("Are you sure you wanwwt to delete this post?")) return;

  try {
    await deletePost(postId);

    // 🔥 refresh posts (simple way)
    window.location.reload();

  } catch (err) {
    console.error(err);
    alert("Delete failed");
  }
  };

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center min-h-[200vh] bg-white">
        <Spinner></Spinner>
      </div>
    );
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      className="min-h-screen bg-white"
    >
      <Toaster position="top-center" reverseOrder={false} />
      <FeaturedStories
        posts={topPosts}
        onFavorite={toggleFavoritePost} 
        onLike={toggleLikePost}
      />
      {/* HEADER */}
      <section className="px-8 py-4 max-w-[1600px] mx-auto sticky top-0 bg-white z-50 shadow-sm">
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">

    {/* LEFT SIDE TITLE */}
    <div>
      <h1 className="text-3xl font-bold text-[#002B11]">
        Travel Stories
      </h1>
      <p className="text-gray-500">
        Discover experiences from our community
      </p>
    </div>

    {/* RIGHT SIDE SEARCH */}
    <div className="flex space-x-4 items-center w-full md:w-auto">

      {/* OPTIONAL BUTTON (extra UX) */}
      <button
        onClick={() => setShowSearchModal(true)}
        className="flex items-center gap-2 border border-gray-100  px-3 py-2 rounded-xl hover:bg-gray-50"
      >
        <Search size={16} />
        Search
      </button>

    </div>
  </div>
</section>
  

      {/* POSTS */}
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-64 bg-gray-100 animate-pulse rounded-lg"
              />
            ))
          : posts.map((post) => (
              <StoryCard
  key={post._id}
  post={post}
  onLike={toggleLikePost}
  onFavorite={toggleFavoritePost}
  onClick={() => handlePostClick(post._id)}

  // ✅ ADD THESE
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
            ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center mt-8 gap-2 mb-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded-md ${
              page === i + 1 ? "bg-green-500 text-white" : "bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      {showEditModal && (
  <EditPostModal
    post={selectedPost}
    onClose={() => setShowEditModal(false)}
    onUpdated={() => {
      setShowEditModal(false);
      window.location.reload(); // refresh list
    }}
  />
)}
      {showSearchModal && (
  <SearchModal onClose={() => setShowSearchModal(false)} />
)}
    </motion.div>
  );
}

// // frontend/src/hooks/useTravelStories.js
// import { useState, useEffect, useMemo } from "react";
// import postService from "../services/post.service";
// import likeService from "../services/like.service";
// import favoriteService from "../services/favorite.service";
// import toast from "react-hot-toast";

// const useTravelStories = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [page, setPage] = useState(() => {
//     return Number(localStorage.getItem("page")) || 1;
//   });

//   const [totalPages, setTotalPages] = useState(1);

//   /* ================================
//      SAVE PAGE
//   ================================= */
//   useEffect(() => {
//     localStorage.setItem("page", page);
//   }, [page]);

//   /* ================================
//      FETCH POSTS
//   ================================= */
//   const fetchPosts = async (pageNumber = 1) => {
//     try {
//       setLoading(true);

//       const token = localStorage.getItem("token");

//       const { posts: postData, pagination } =
//         await postService.getAllPosts(pageNumber, 10);

//       setTotalPages(pagination.pages);

//       /* -------- FAVORITES MAP -------- */
//       let favoritesMap = {};

//       if (token) {
//         const favorites = await favoriteService.getFavorites("Post", token);

//         favorites.forEach((fav) => {
//           const id = fav?.target_id?._id || fav?.target_id;
//           if (id) favoritesMap[String(id)] = true;
//         });
//       }

//       /* -------- MERGE DATA -------- */
//       const postsWithData = await Promise.all(
//         postData.map(async (post) => {
//           const likeRes = await likeService.getLikesCount(post._id, "Post");

//           let liked = false;

//           if (token) {
//             const likedRes = await likeService.isLiked(
//               post._id,
//               "Post",
//               token
//             );
//             liked = likedRes.liked;
//           }

//           return {
//             ...post,
//             likes: likeRes.likes,
//             liked,
//             favorited: favoritesMap[post._id] || false,
//           };
//         })
//       );

//       setPosts(postsWithData);
//     } catch (err) {
//       console.error("Fetch posts error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPosts(page);
//   }, [page]);

//   /* ================================
//      LIKE POST (SYNC EVERYWHERE)
//   ================================= */
//   const toggleLikePost = async (postId) => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       toast.error("Please login first");
//       return;
//     }

//     try {
//       const res = await likeService.toggleLike(postId, "Post", token);

//       setPosts((prev) =>
//         prev.map((p) =>
//           p._id === postId
//             ? {
//                 ...p,
//                 liked: res.liked,
//                 likes: res.liked ? p.likes + 1 : p.likes - 1,
//               }
//             : p
//         )
//       );
//     } catch (err) {
//       console.error("Like error:", err);
//     }
//   };

//   /* ================================
//      FAVORITE POST (SYNC EVERYWHERE)
//   ================================= */
//   const toggleFavoritePost = async (postId) => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       toast.error("Please login first");
//       return;
//     }

//     try {
//       const res = await favoriteService.toggleFavorite(
//         postId,
//         "Post",
//         token
//       );

//       setPosts((prev) =>
//         prev.map((p) =>
//           p._id === postId
//             ? { ...p, favorited: res.isFavorite }
//             : p
//         )
//       );
//     } catch (err) {
//       console.error("Favorite error:", err);
//     }
//   };

//   /* ================================
//      FEATURED POSTS (AUTO SYNC 🔥)
//   ================================= */
//   const topPosts = useMemo(() => {
//     return [...posts]
//       .sort((a, b) => (b.likes || 0) - (a.likes || 0))
//       .slice(0, 3);
//   }, [posts]);

//   /* ================================
//      RETURN
//   ================================= */
//   return {
//     posts,
//     loading,
//     page,
//     setPage,
//     totalPages,
//     toggleLikePost,
//     toggleFavoritePost,
//     topPosts, // 🔥 now auto updates
//   };
// };

// export default useTravelStories;