//frontend\src\hooks\useTravelStories.js
import { useState, useEffect } from "react";
import postService from "../services/post.service";
import likeService from "../services/like.service";
import favoriteService from "../services/favorite.service";
import toast from "react-hot-toast";

const useTravelStories = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(() => {
    return Number(localStorage.getItem("page")) || 1;
  });

  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    localStorage.setItem("page", page);
  }, [page]);

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

        // favorites.forEach((fav) => {
        //   const id =
        //     typeof fav.target_id === "object"
        //       ? fav.target_id._id
        //       : fav.target_id;

        //   favoritesMap[id.toString()] = true;
        // });
        favorites.forEach((fav) => { const id = fav?.target_id?._id || fav?.target_id || null; if (id) { favoritesMap[String(id)] = true; } });
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

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const toggleLikePost = async (postId) => {
    const token = localStorage.getItem("token");
    if (!token) {
  toast.error("Please login first");
  return;
}

    const res = await likeService.toggleLike(postId, "Post", token);

    setPosts((prev) =>
      prev.map((p) =>
        p._id === postId
          ? {
              ...p,
              liked: res.liked,
              likes: res.liked ? p.likes + 1 : p.likes - 1,
            }
          : p
      )
    );
  };

  const toggleFavoritePost = async (postId) => {
    const token = localStorage.getItem("token");
    if (!token) {
  toast.error("Please login first");
  return;
}

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
  };

  return {
    posts,
    loading,
    page,
    setPage,
    totalPages,
    toggleLikePost,
    toggleFavoritePost,
    
  };
};

export default useTravelStories;