import { Heart, Star, Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

const StoryCard = ({ post, onLike, onFavorite, onClick, onEdit, onDelete }) => {
  const images = post.images || [];
  const [index, setIndex] = useState(0);
  const [hover, setHover] = useState(false);

  const creationDay = post.created_at
    ? (() => {
        const d = new Date(post.created_at);
        const month = d.toLocaleString("en-US", { month: "short" });
        const day = d.getDate();
        const year = d.getFullYear();
        return `${month} ${day} ${year}`;
      })()
    : "";

  // Auto slide images on hover
  useEffect(() => {
    if (!hover || images.length <= 1) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [hover, images.length]);

  return (
    <div
      className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 max-w-sm border border-gray-100"
      onClick={onClick}
    >
      {/* IMAGE */}
      <div
        className="relative aspect-[1.1/1] overflow-hidden m-2 rounded-lg"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => {
          setHover(false);
          setIndex(0);
        }}
      >
        <img
          src={
            images.length > 0
              ? images[index]
              : "https://via.placeholder.com/600"
          }
          alt={post.title}
          className="w-full h-full object-cover transition duration-500"
        />

        {/* Image count */}
        {images.length > 1 && (
          <div className="absolute top-4 left-4 bg-black/40 text-white text-xs px-2 py-1 rounded-2xl backdrop-blur">
            {index + 1}/{images.length}
          </div>
        )}

        {/* Favorite */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavorite?.(post._id);
          }}
          className="absolute top-4 right-4 p-2 bg-black/20 backdrop-blur-md rounded-full hover:bg-black/40 transition"
        >
          <Star
            size={18}
            fill={post.isFavorite ? "#FFD700" : "none"}
            stroke={post.isFavorite ? "#FFD700" : "white"}
          />
        </button>

        {/* 🔥 ADMIN ACTIONS */}

        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.(post);
          }}
          className="p-2 bg-white/80 backdrop-blur rounded-full hover:bg-white transition shadow"
        >
          <Edit size={16} className="text-blue-600" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.(post._id);
          }}
          className="p-2 bg-white/80 backdrop-blur rounded-full hover:bg-white transition shadow"
        >
          <Trash2 size={16} className="text-red-600" />
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-4 pt-1">
        {/* 🔥 TITLE (1 LINE + ...) */}
        <p className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-1 truncate">
          {post.title}
        </p>

        {/* Category + Like */}
        <div className="flex justify-between items-center mb-1">
          <p className="text-xs opacity-80">
            {post.category_id?.category_name || ""}
          </p>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onLike?.(post._id);
            }}
            className="flex items-center gap-1 transition"
          >
            <Heart
              size={18}
              fill={post.liked ? "#ef4444" : "none"}
              className={post.liked ? "text-red-500" : "text-gray-400"}
            />
            <span
              className={`text-sm font-bold ${
                post.liked ? "text-red-500" : "text-gray-700"
              }`}
            >
              {post.likes || 0}
            </span>
          </button>
        </div>

        {/* User + Date */}
        {/* User + Date */}
        <p className="text-xs text-gray-500 flex justify-between border-t border-gray-100 pt-2">
          <span className="font-medium text-gray-700">
            By {post.user_id?.username || "Unknown"}
          </span>
          <span>{creationDay}</span>
        </p>

        {/* 🔥 ADMIN ACTIONS BELOW */}
        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(post);
            }}
            className="px-2 py-1 text-xs rounded-md bg-blue-50 hover:bg-blue-100 text-blue-600 transition"
          >
            ✏️ Edit
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(post._id);
            }}
            className="px-2 py-1 text-xs rounded-md bg-red-50 hover:bg-red-100 text-red-600 transition"
          >
            🗑 Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
