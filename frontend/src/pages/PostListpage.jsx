import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import postService from "../services/post.service";
import StoryCard from "../components/stories/StoryCard";
import likeService from "../services/like.service";

export default function PostListPage() {
  const { categoryId, provinceId } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem("token");

      const allPosts = await postService.getAllPosts();

      let filtered = allPosts;

      if (categoryId) {
        filtered = filtered.filter(
          (post) => post.category_id?._id === categoryId,
        );
      }

      if (provinceId) {
        filtered = filtered.filter(
          (post) => post.province_id?._id === provinceId,
        );
      }

      //  ADD REAL LIKE DATA
      const updatedPosts = await Promise.all(
        filtered.map(async (post) => {
          try {
            const likeRes = await likeService.getLikesCount(post._id, "Post");

            let liked = false;

            if (token) {
              const likedRes = await likeService.isLiked(
                post._id,
                "Post",
                token,
              );
              liked = likedRes.liked;
            }

           return {
             ...post,
             likes: likeRes.likes,
             liked,
           };
          } catch (err) {
            return {
              ...post,
              likes: 0,
              liked: false,
            };
          }
        }),
      );

      setPosts(updatedPosts);
    };

    fetchPosts();
  }, [categoryId, provinceId]);

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
                likes: res.liked ? p.likes + 1 : p.likes - 1,
              }
            : p,
        ),
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleFavorite = (postId) => {
    setPosts((prev) =>
      prev.map((p) =>
        p._id === postId ? { ...p, isFavorite: !p.isFavorite } : p,
      ),
    );
  };

  return (
    <div className="p-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {posts.map((post) => (
        <StoryCard
          key={post._id}
          post={post}
          onLike={handleLike}
          onFavorite={handleFavorite}
        />
      ))}
      {posts.length === 0 && (
        <p className="col-span-full text-center">No posts found.</p>
      )}
    </div>
  );
}
// import { useParams } from "react-router-dom";
// import usePosts from "../hooks/usePosts";
// import usePostActions from "../hooks/usePostActions";
// import StoryCard from "../components/stories/StoryCard";

// export default function PostListPage() {

//   const { categoryId, provinceId } = useParams();

//   const { posts, setPosts } = usePosts();
//   const { toggleLike, toggleFavorite } = usePostActions(setPosts);

//   const filtered = posts.filter((p) => {

//     if (categoryId) {
//       return p.category_id?._id === categoryId;
//     }

//     if (provinceId) {
//       return p.province_id?._id === provinceId;
//     }

//     return true;
//   });

//   return (
//     <div className="p-8 grid grid-cols-5 gap-6">

//       {filtered.map((post) => (
//         <StoryCard
//           key={post._id}
//           post={post}
//           onLike={toggleLike}
//           onFavorite={toggleFavorite}
//         />
//       ))}

//     </div>
//   );
// }
