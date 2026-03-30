import { useEffect, useState } from "react";
import likeService from "../services/like.service";
import favoriteService from "../services/favorite.service";

export default function useCommunityInteractions(communities = []) {
  const [likedMap, setLikedMap] = useState({});
  const [likesMap, setLikesMap] = useState({});
  const [favoritesMap, setFavoritesMap] = useState({});

  useEffect(() => {
    const fetchInteractions = async () => {
      try {
        const likesData = {};
        const likedData = {};
        const favoritesData = {};

        const token = localStorage.getItem("token");

        await Promise.all(
          (communities || []).map(async (post) => {
            try {
              const likeRes = await likeService.getLikesCount(
                post._id,
                "CommunityPost"
              );

              likesData[post._id] = likeRes?.likes || 0;

              if (token) {
                const likedRes = await likeService.isLiked(
                  post._id,
                  "CommunityPost",
                  token
                );

                likedData[post._id] = likedRes?.liked || false;
              }
            } catch (err) {
              console.log(err);
            }
          })
        );

        if (token) {
          const favorites = await favoriteService.getFavorites(
            "CommunityPost",
            token
          );

          (favorites || []).forEach((fav) => {
            const id =
              typeof fav.target_id === "object"
                ? fav.target_id?._id
                : fav.target_id;

            if (id) favoritesData[String(id)] = true;
          });
        }

        setLikesMap(likesData);
        setLikedMap(likedData);
        setFavoritesMap(favoritesData);
      } catch (err) {
        console.error(err);
      }
    };

    if (communities.length > 0) {
      fetchInteractions();
    }
  }, [communities]);

  // LIKE
  const handleLike = async (postId) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Login first");

    const res = await likeService.toggleLike(
      postId,
      "CommunityPost",
      token
    );

    setLikedMap((prev) => ({
      ...prev,
      [postId]: res.liked,
    }));

    setLikesMap((prev) => ({
      ...prev,
      [postId]: res.liked
        ? (prev[postId] || 0) + 1
        : Math.max((prev[postId] || 1) - 1, 0),
    }));
  };

  // FAVORITE
  const handleFavorite = async (postId) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Login first");

    const res = await favoriteService.toggleFavorite(
      postId,
      "CommunityPost",
      token
    );

    setFavoritesMap((prev) => ({
      ...prev,
      [String(postId)]: res.isFavorite,
    }));
  };

  return {
    likedMap,
    likesMap,
    favoritesMap,
    handleLike,
    handleFavorite,
  };
}