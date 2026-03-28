import { ChevronRight, Heart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";

const FeaturedStories = ({ posts = [], onLike, onFavorite }) => {
  const navigate = useNavigate();

  const [hovered, setHovered] = useState(null);
  const [indexMap, setIndexMap] = useState({});

  // Top 3 liked posts (current page)
  const featured = useMemo(() => {
    return [...posts]
      .sort((a, b) => (b.likes || 0) - (a.likes || 0))
      .slice(0, 3);
  }, [posts]);

  // image slider on hover
  useEffect(() => {
    if (!hovered) return;

    const post = featured.find((p) => p._id === hovered);
    const images = post?.images || [];

    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setIndexMap((prev) => ({
        ...prev,
        [hovered]: ((prev[hovered] || 0) + 1) % images.length,
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [hovered, featured]);

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 h-[450px] w-full bg-black">
      {featured.map((post) => {
        const images = post.images || [];
        const index = indexMap[post._id] || 0;

        return (
          <div
            key={post._id}
            className="relative group cursor-pointer overflow-hidden"
            onMouseEnter={() => setHovered(post._id)}
            onMouseLeave={() => {
              setHovered(null);
              setIndexMap((prev) => ({ ...prev, [post._id]: 0 }));
            }}
            onClick={() => navigate(`/posts/${post._id}`)}
          >
            {/* IMAGE */}
            <img
              src={images[index] || "https://via.placeholder.com/800x450"}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700 pointer-events-none"
            />

            {/* GRADIENT OVERLAY (RESTORED) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* LIKE BUTTON */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onLike?.(post._id);
              }}              
              className="absolute top-4 left-4 z-40 flex items-center gap-2 px-3 py-2 bg-black/40 rounded-full backdrop-blur-md hover:bg-black/60 transition"           
            >
              <Heart
                size={18}
                fill={post.liked ? "#ef4444" : "none"}
                className={post.liked ? "text-red-500" : "text-white"}
              />
              <span className="text-sm text-white font-semibold">
                {post.likes || 0}
              </span>
            </button>

            {/* FAVORITE BUTTON */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onFavorite?.(post._id);
              }}
              className="absolute top-4 right-4 z-40 p-2 bg-black/40 rounded-full backdrop-blur-md hover:bg-black/60 transition"
            >
              <Star
                size={18}
                fill={post.favorited ? "#FFD700" : "none"}
                stroke={post.favorited ? "#FFD700" : "white"}
              />
            </button>

            {/* IMAGE COUNTER (RESTORED) */}
            {images.length > 1 && (
              <div className="absolute bottom-4 right-4 bg-black/40 text-white text-xs px-2 py-1 rounded-xl backdrop-blur">
                {index + 1}/{images.length}
              </div>
            )}

            {/* TEXT (RESTORED STYLE) */}
            <div className="absolute bottom-8 left-8 right-8 text-white z-30">
              <h2 className="text-2xl font-bold mb-2">{post.title}</h2>

              <div className="flex items-center text-sm opacity-90">
                <span>By {post.user_id?.username || "Unknown Author"}</span>
                <ChevronRight size={16} className="ml-1" />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default FeaturedStories;