

import { useState, useEffect } from "react";
import postService from "../services/post.service";
import likeService from "../services/like.service";
import favoriteService from "../services/favorite.service"; 

const useTravelStories = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token");

      const data = await postService.getAllPosts();
      let favoritesMap = {}; 

      if (token) {
        const favorites = await favoriteService.getFavorites("Post", token);

        favorites.forEach((fav) => {
          const id =
            typeof fav.target_id === "object"
              ? fav.target_id._id
              : fav.target_id;

          favoritesMap[id.toString()] = true;
        });
      }

      const postsWithLikes = await Promise.all(
        data.map(async (post) => {
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
              favorited: favoritesMap[post._id.toString()] || false,
            };
          } catch {
            return {
              ...post,
              likes: 0,
              liked: false,
            };
          }
        }),
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
      const token = localStorage.getItem("token");
      if (!token) return alert("Login first");

      const res = await likeService.toggleLike(postId, "Post", token);

      setPosts((prev) =>
        prev.map((post) =>
          post._id === postId
            ? {
                ...post,
                liked: res.liked,
                likes: res.liked ? post.likes + 1 : post.likes - 1,
              }
            : post,
        ),
      );
    } catch (err) {
      console.error("Error toggling like:", err.message);
    }
  };

  const toggleFavoritePost = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("Login first");

      const res = await favoriteService.toggleFavorite(postId, "Post", token);

      setPosts((prev) =>
        prev.map((post) =>
          post._id === postId ? { ...post, favorited: res.isFavorite } : post,
        ),
      );
    } catch (err) {
      console.error("Favorite error:", err.message);
    }
  };

  return { posts, loading, toggleLikePost, toggleFavoritePost };
};



export default useTravelStories;
