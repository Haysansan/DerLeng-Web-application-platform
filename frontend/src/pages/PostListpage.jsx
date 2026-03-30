// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import postService from "../services/post.service";
// import StoryCard from "../components/stories/StoryCard";
// import likeService from "../services/like.service";
// import Spinner from "../components/Spinner";

// export default function PostListPage() {
//   const { categoryId, provinceId } = useParams();

//   const [posts, setPosts] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(false);

//   // useEffect(() => {
//   //   const fetchPosts = async () => {
//   //     try {
//   //       setLoading(true);

//   //       const token = localStorage.getItem("token");

//   //       if (!categoryId) return;

//   //       const res = await postService.getPostsByCategory(
//   //         categoryId,
//   //         page,
//   //         10
//   //       );

//   //       const postsData = res.data;

//   //       const updatedPosts = await Promise.all(
//   //         postsData.map(async (post) => {
//   //           try {
//   //             const likeRes = await likeService.getLikesCount(post._id);

//   //             let liked = false;

//   //             if (token) {
//   //               const likedRes = await likeService.isLiked(
//   //                 post._id,
//   //                 "Post",
//   //                 token
//   //               );
//   //               liked = likedRes.liked;
//   //             }

//   //             return {
//   //               ...post,
//   //               likes: likeRes,
//   //               liked,
//   //             };
//   //           } catch {
//   //             return { ...post, likes: 0, liked: false };
//   //           }
//   //         })
//   //       );

//   //       setPosts(updatedPosts);
//   //       setTotalPages(res.pagination.totalPages);

//   //     } catch (err) {
//   //       console.error(err);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchPosts();
//   // }, [categoryId, page]);
// useEffect(() => {
//   const fetchPosts = async () => {
//     try {
//       setLoading(true);

//       const token = localStorage.getItem("token");

//       let res;

//       // 🔥 PRIORITY: province filter first
//       if (provinceId) {
//         res = await postService.getPostsByProvince(
//           provinceId,
//           page,
//           10
//         );
//       } else if (categoryId) {
//         res = await postService.getPostsByCategory(
//           categoryId,
//           page,
//           10
//         );
//       } else {
//         return;
//       }

//       const postsData = res.data;

//       const updatedPosts = await Promise.all(
//         postsData.map(async (post) => {
//           try {
//             const likeRes = await likeService.getLikesCount(post._id);

//             let liked = false;

//             if (token) {
//               const likedRes = await likeService.isLiked(
//                 post._id,
//                 "Post",
//                 token
//               );
//               liked = likedRes.liked;
//             }

//             return {
//               ...post,
//               likes: likeRes,
//               liked,
//             };
//           } catch {
//             return { ...post, likes: 0, liked: false };
//           }
//         })
//       );

//       setPosts(updatedPosts);
//       setTotalPages(res.pagination.totalPages);

//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchPosts();
// }, [categoryId, provinceId, page]);
  
  
//   const handleLike = async (postId) => {
//     const token = localStorage.getItem("token");
//     if (!token) return alert("Login first");

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
//       console.error(err);
//     }
//   };

//   const handleFavorite = (postId) => {
//     setPosts((prev) =>
//       prev.map((p) =>
//         p._id === postId
//           ? { ...p, isFavorite: !p.isFavorite }
//           : p
//       )
//     );
//   };

//   // 🔥 FULL PAGE LOADING (first load)
//   if (loading && posts.length === 0) {
//     return (
//       <div className="flex justify-center items-center min-h-[60vh]">
//         <Spinner />
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">

//       {/* GRID */}
//       <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
//         {posts.map((post) => (
//           <StoryCard
//             key={post._id}
//             post={post}
//             onLike={handleLike}
//             onFavorite={handleFavorite}
//           />
//         ))}

//         {posts.length === 0 && !loading && (
//           <p className="col-span-full text-center">
//             No posts found.
//           </p>
//         )}
//       </div>

//       {/* PAGINATION */}
//       <div className="flex items-center justify-center gap-2 mt-10">

//         <button
//           disabled={page === 1}
//           onClick={() => setPage((p) => p - 1)}
//           className="px-3 py-1 rounded bg-gray-200 disabled:opacity-40"
//         >
//           Prev
//         </button>

//         {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
//           <button
//             key={p}
//             onClick={() => setPage(p)}
//             className={`px-3 py-1 rounded ${
//               page === p
//                 ? "bg-green-500 text-white"
//                 : "bg-gray-100"
//             }`}
//           >
//             {p}
//           </button>
//         ))}

//         <button
//           disabled={page === totalPages}
//           onClick={() => setPage((p) => p + 1)}
//           className="px-3 py-1 rounded bg-gray-200 disabled:opacity-40"
//         >
//           Next
//         </button>

//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import postService from "../services/post.service";
import StoryCard from "../components/stories/StoryCard";
import likeService from "../services/like.service";
import Spinner from "../components/Spinner";

export default function PostListPage() {
  const { categoryId, provinceId } = useParams();
  const navigate = useNavigate(); // ✅ ADD NAVIGATION

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");

        let res;

        // 🔥 PRIORITY: province first
        if (provinceId) {
          res = await postService.getPostsByProvince(provinceId, page, 10);
        } else if (categoryId) {
          res = await postService.getPostsByCategory(categoryId, page, 10);
        } else {
          return;
        }

        const postsData = res.data;

        const updatedPosts = await Promise.all(
          postsData.map(async (post) => {
            try {
              const likeRes = await likeService.getLikesCount(post._id, "Post");

              let liked = false;

              if (token) {
                const likedRes = await likeService.isLiked(
                  post._id,
                  "Post",
                  token
                );
                liked = likedRes.liked;
              }

              return {
                ...post,
                // likes: post.likesCount || post.likes || 0, // ✅ FIX NaN SAFE
                liked,
                likes: likeRes.likes,
              };
            } catch {
              return { ...post, likes: 0, liked: false };
            }
          })
        );

        setPosts(updatedPosts);
        setTotalPages(res.pagination.totalPages);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [categoryId, provinceId, page]);
  
  // ❤️ LIKE HANDLER (SAFE)
  const handleLike = async (postId) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Login first");

    try {
      const res = await likeService.toggleLike(postId, "Post", token);

      setPosts((prev) =>
        prev.map((p) =>
          p._id === postId
            ? {
                ...p,
                liked: res.liked,
              likes: res.liked
                  
                  ? Number(p.likes || 0) + 1
                  : Math.max(Number(p.likes || 0) - 1, 0),
              }
            : p
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  // ⭐ FAVORITE HANDLER
  const handleFavorite = (postId) => {
    setPosts((prev) =>
      prev.map((p) =>
        p._id === postId
          ? { ...p, isFavorite: !p.isFavorite }
          : p
      )
    );
  };

  // 🚀 NAVIGATE TO DETAIL
  const handlePostClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  // 🔥 LOADING SCREEN
  if (loading && posts.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="p-6">

      {/* GRID */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {posts.map((post) => (
          <StoryCard
            key={post._id}
            post={post}
            onLike={handleLike}
            onFavorite={handleFavorite}
            onClick={() => handlePostClick(post._id)} // ✅ IMPORTANT FIX
          />
        ))}

        {posts.length === 0 && !loading && (
          <p className="col-span-full text-center">
            No posts found.
          </p>
        )}
      </div>

      {/* PAGINATION */}
      <div className="flex items-center justify-center gap-2 mt-10">

        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 rounded bg-gray-200 disabled:opacity-40"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`px-3 py-1 rounded ${
              page === p ? "bg-green-500 text-white" : "bg-gray-100"
            }`}
          >
            {p}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 rounded bg-gray-200 disabled:opacity-40"
        >
          Next
        </button>

      </div>
    </div>
  );
}