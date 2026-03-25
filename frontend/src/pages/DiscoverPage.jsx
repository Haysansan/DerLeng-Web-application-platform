import { useDiscover } from "../hooks/useDiscover";
import { categoryImages, provinceImages } from "../data/imageMap";
import { normalize } from "../utils/normalize";
import discoverBanner from "../assets/discover.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import communityService from "../services/community.service";
import CommunityCard from "../components/CommunityCard";
import likeService from "../services/like.service";
import favoriteService from "../services/favorite.service";

export default function DiscoverPage() {
  const { categories, provinces, loading } = useDiscover();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [likedMap, setLikedMap] = useState({});

  const [communities, setCommunities] = useState([]);
  const [likesMap, setLikesMap] = useState({});
  const [favoritesMap, setFavoritesMap] = useState({});

  useEffect(() => {
    const fetchCommunityPosts = async () => {
      try {
        const data = await communityService.getAllCommunityPosts();
        setCommunities(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCommunityPosts();
  }, []);
  useEffect(() => {
    const fetchInteractions = async () => {
      try {
        const likesData = {};
        const likedData = {};
        const favoritesData = {};

        const token = localStorage.getItem("token");

        await Promise.all(
          communities.map(async (post) => {
            try {
              const likeRes = await likeService.getLikesCount(
                post._id,
                "CommunityPost",
              );

              likesData[post._id] = likeRes.likes;

              if (token) {
                const likedRes = await likeService.isLiked(
                  post._id,
                  "CommunityPost",
                  token,
                );

                likedData[post._id] = likedRes.liked;
              }
            } catch {}
          }),
        );

        if (token) {
          const favorites = await favoriteService.getFavorites(
            "CommunityPost",
            token,
          );
          favorites.forEach((fav) => {
            let id = null;

            if (fav.target_id) {
              if (typeof fav.target_id === "object" && fav.target_id._id) {
                id = fav.target_id._id;
              } else {
                id = fav.target_id;
              }
            }

            if (id) {
              favoritesData[id.toString()] = true;
            }
          });
          console.log("favorites:", favorites);
          console.log("favoritesData:", favoritesData);
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

  const handleLike = async (postId) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Login first");

    const res = await likeService.toggleLike(postId, "CommunityPost", token);

    setLikedMap((prev) => ({
      ...prev,
      [postId]: res.liked,
    }));

    setLikesMap((prev) => ({
      ...prev,
      [postId]: res.liked ? (prev[postId] || 0) + 1 : (prev[postId] || 1) - 1,
    }));
  };
const handleFavorite = async (postId) => {
  const token = localStorage.getItem("token");
  if (!token) return alert("Login first");

  const res = await favoriteService.toggleFavorite(
    postId,
    "CommunityPost",
    token,
  );

  setFavoritesMap((prev) => ({
    ...prev,
    [postId.toString()]: res.isFavorite, 
  }));
};

  const filteredCommunities = communities.filter((post) => {
    const keyword = search.toLowerCase();

    return (
      post.title?.toLowerCase().includes(keyword) ||
      post.content?.toLowerCase().includes(keyword) ||
      post.province_id?.province_name?.toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO */}
      <section className="relative w-full h-[250px]">
        <img
          src={discoverBanner}
          alt="Discover"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold">
            Explore places with Derleng
          </h1>
        </div>
      </section>

      {/* SEARCH BAR */}
      <section className="px-6 py-6 bg-white">
        <div className="max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search Community Tourism..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-full px-5 py-2
  focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
          />
        </div>
      </section>

      {/* PROVINCE (ROUND IMAGE ONLY) */}
      <section className="px-6 py-6 bg-white">
        <h2 className="text-xl font-semibold mb-4">Explore by Province</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex space-x-4 overflow-x-auto">
            {provinces.map((prov) => {
              const key = normalize(prov.province_name);

              return (
                <div
                  key={prov._id}
                  onClick={() => navigate(`/community/province/${prov._id}`)}
                  className="flex flex-col items-center min-w-[90px] cursor-pointer"
                >
                  {/* ROUND IMAGE */}
                  <div className="w-20 h-20 rounded-full overflow-hidden shadow hover:scale-105 transition">
                    <img
                      src={
                        provinceImages[key] || "https://via.placeholder.com/150"
                      }
                      alt={prov.province_name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* NAME */}
                  <span className="mt-2 text-sm text-center text-gray-700">
                    {prov.province_name}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </section>
      {/* COMMUNITY SECTION */}
      <section className="px-6 py-8">
        <h2 className="text-2xl font-bold mb-6">Community Tourism</h2>

        {communities.length === 0 ? (
          <p className="text-gray-400">No community posts yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {filteredCommunities.map((post) => (
              <CommunityCard
                key={post._id}
                post={{
                  ...post,
                  likes: likesMap[post._id] || 0,
                  liked: likedMap[post._id] || false,
                  favorited: favoritesMap[post._id.toString()] || false,
                }}
                onClick={() => navigate(`/community/${post._id}`)}
                onLike={handleLike}
                onFavorite={handleFavorite}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
