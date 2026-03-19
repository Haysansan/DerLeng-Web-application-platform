// frontend\src\hooks\useTravelStories.js
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