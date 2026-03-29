// frontend/src/hooks/useTravelStories.js
import { useState, useEffect } from "react";
import postService from "../services/post.service";
import likeService from "../services/like.service";
import favoriteService from "../services/favorite.service";
import toast from "react-hot-toast";

const useTravelStories = () => {
  const [posts, setPosts] = useState([]);
  const [topPosts, setTopPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(() => {
    return Number(localStorage.getItem("page")) || 1;
  });

  const [totalPages, setTotalPages] = useState(1);

  // ================= SAVE PAGE =================
  useEffect(() => {
    localStorage.setItem("page", page);
  }, [page]);

  // ================= FETCH POSTS (PAGINATED FEED) =================
  const fetchPosts = async (pageNumber = 1) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const { posts: postData, pagination } =
        await postService.getAllPosts(pageNumber, 10);

      setTotalPages(pagination.pages);

      let favoritesMap = {};

      if (token) {
        const favorites = await favoriteService.getFavorites("Post", token);

        favorites.forEach((fav) => {
          const id = fav?.target_id?._id || fav?.target_id;
          if (id) favoritesMap[String(id)] = true;
        });
      }

      const postsWithLikes = await Promise.all(
        postData.map(async (post) => {
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
            likes: likeRes.likes,
            liked,
            favorited: favoritesMap[post._id] || false,
          };
        })
      );

      setPosts(postsWithLikes);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ================= FETCH TOP POSTS (GLOBAL TOP 3) =================
  const fetchTopPosts = async () => {
    try {
      const token = localStorage.getItem("token");

      const data = await postService.getTopPosts(); // 🔥 BACKEND GLOBAL TOP 3

      const normalized = await Promise.all(
        data.map(async (post) => {
          let liked = false;
          let favorited = false;

          if (token) {
            const likedRes = await likeService.isLiked(
              post._id,
              "Post",
              token
            );
            liked = likedRes.liked;

            const favRes = await favoriteService.getFavorites("Post", token);

            const favMap = {};
            favRes.forEach((f) => {
              const id = f?.target_id?._id || f?.target_id;
              if (id) favMap[String(id)] = true;
            });

            favorited = !!favMap[post._id];
          }

          return {
            ...post,
            likes: post.likesCount || post.likes || 0,
            liked,
            favorited,
          };
        })
      );

      setTopPosts(normalized);
    } catch (err) {
      console.error(err);
    }
  };

  // ================= INIT =================
  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  useEffect(() => {
    fetchTopPosts();
  }, []);

  // ================= LIKE (INSTANT UI UPDATE) =================
  const toggleLikePost = async (postId) => {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Please login first");

    const res = await likeService.toggleLike(postId, "Post", token);

    setPosts((prev) =>
      prev.map((p) =>
        p._id === postId
          ? {
              ...p,
              liked: res.liked,
              likes: p.likes + (res.liked ? 1 : -1),
            }
          : p
      )
    );

    // refresh top posts (global ranking may change)
    fetchTopPosts();
  };

  // ================= FAVORITE (INSTANT UI UPDATE) =================
  const toggleFavoritePost = async (postId) => {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Please login first");

    const res = await favoriteService.toggleFavorite(
      postId,
      "Post",
      token
    );

    setPosts((prev) =>
      prev.map((p) =>
        p._id === postId
          ? { ...p, favorited: res.isFavorite }
          : p
      )
    );

    // refresh top posts (so Featured syncs)
    fetchTopPosts();
  };

  // ================= RETURN =================
  return {
    posts,
    topPosts, // 🔥 GLOBAL TOP 3 FROM ALL POSTS
    loading,
    page,
    setPage,
    totalPages,
    toggleLikePost,
    toggleFavoritePost,
  };
};

export default useTravelStories;