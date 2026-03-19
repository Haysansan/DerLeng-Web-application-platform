import { MapPin } from "lucide-react";
import { useState, useEffect } from "react";

const CommunityCard = ({ post, onClick }) => {
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
    }, 1200);

    return () => clearInterval(interval);
  }, [hover, images.length]);

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 max-w-sm border border-gray-100"
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

        {images.length > 1 && (
          <div className="absolute top-4 left-4 bg-black/40 text-white text-xs px-2 py-1 rounded-2xl backdrop-blur">
            {index + 1}/{images.length}
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4 pt-1 space-y-1">
        <p className="text-sm font-bold text-gray-800 uppercase tracking-wide">
          {post.title}
        </p>

        {/* Province */}
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <MapPin size={14} />
          {post.province_id?.province_name}
        </div>

        {/* Short description */}
        <p className="text-xs text-gray-500 line-clamp-2">{post.content}</p>

        {/* Footer */}
        <p className="text-xs text-gray-500 flex justify-between border-t border-gray-100 pt-2">
          <span className="font-medium text-gray-700">
            By {post.admin_id?.username || "Admin"}
          </span>
          <span>{creationDay}</span>
        </p>
      </div>
    </div>
  );
};

export default CommunityCard;
