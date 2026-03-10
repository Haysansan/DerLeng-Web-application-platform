// //C:\Users\DELL\Documents\Cadt\cadty3t2\latestlast\DerLeng-Web-application-platform\frontend\src\hooks\useTravelStories.js
// import { useEffect, useState } from "react";
// import { getAllPosts } from "../services/post.service.js";

// export const useTravelStories = () => {
//   const [stories, setStories] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchStories = async () => {
//     try {
//       setLoading(true);
//       const stories = await getAllPosts();

//       // Sort newest first
//       const sorted = stories.sort(
//         (a, b) => new Date(b.created_at) - new Date(a.created_at)
//       );
//       setStories(sorted);
//     } catch (error) {
//       console.error("Error fetching stories:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStories();
//   }, []);

//   return { stories, loading };
// };
import { useState, useEffect } from "react";
import postService from "../services/post.service";

const useTravelStories = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const data = await postService.getAllPosts();
      // Initialize like count and liked state
      const postsWithLikes = await Promise.all(
        data.map(async (post) => {
          const likes = await postService.getLikesCount(post._id);
          return { ...post, likes, liked: false };
        })
      );
      setPosts(postsWithLikes);
    } catch (err) {
      console.error("Error fetching posts:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const toggleLikePost = async (postId) => {
    try {
      const result = await postService.toggleLike(postId);
      setPosts((prev) =>
        prev.map((post) =>
          post._id === postId
            ? {
                ...post,
                liked: result.liked,
                likes: result.liked ? post.likes + 1 : post.likes - 1,
              }
            : post
        )
      );
    } catch (err) {
      console.error("Error toggling like:", err.message);
    }
  };

  return { posts, loading, toggleLikePost };
};

export default useTravelStories;