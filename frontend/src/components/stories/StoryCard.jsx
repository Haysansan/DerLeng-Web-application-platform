import { Heart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const StoryCard = ({ post, onLike, onFavorite }) => {
  const navigate = useNavigate();

  return (
    <div
      className="group cursor-pointer border border-green-100 p-2"
      onClick={() => navigate(`/posts/${post._id}`)} // Navigate to post detail
    >
      {/* Card Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden rounded- mb-3">
        <img
          src={post.images?.[0] || "https://via.placeholder.com/600"}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />

        {/* Favorite Star */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click
            if (onFavorite) onFavorite(post._id);
          }}
          className="absolute top-3 right-3 p-2 rounded-full transition"
        >
          <Star
            size={20}
            fill={post.isFavorite ? "yellow" : "rgba(255,255,255,0.5)"}
            stroke={post.isFavorite ? "yellow" : "white"}
            strokeWidth={2}
          />
        </button>
      </div>

      {/* Card Details */}
      <div className="space-y-1 ">
        <h3 className="text-base  font-bold text-[#002B11] leading-snug line-clamp-2 group-hover:text-[#008A3D] transition">
          {post.title}
        </h3>

        {/* Heart Likes */}
        <div className="flex items-center space-x-1">
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent navigation when liking
              onLike(post._id);
            }}
            className="flex items-center"
          >
            <Heart
              size={16}
              fill={post.liked ? "red" : "none"}
              className={post.liked ? "text-red-500" : "text-gray-400"}
              strokeWidth={2}
            />
            <span
              className={`text-sm font-bold ml-1 ${
                post.liked ? "text-red-500" : "text-black"
              }`}
            >
              {post.likes || 0}
            </span>
          </button>
        </div>

        {/* Author/User info */}
        <p className="text-sm text-gray-500">
          By <span className="font-medium text-black">{post.user_id?.username || "Unknown"}</span>
        </p>
      </div>
    </div>
  );
};

export default StoryCard;