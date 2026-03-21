// import { Star, } from "lucide-react";
// import { useState, useEffect } from "react";

// const CommunityCard = ({ post, onClick, onFavorite }) => {
//   const images = post.images || [];
//   const [index, setIndex] = useState(0);
//   const [hover, setHover] = useState(false);

//   const creationDay = post.created_at
//     ? (() => {
//         const d = new Date(post.created_at);
//         const month = d.toLocaleString("en-US", { month: "short" });
//         const day = d.getDate();
//         const year = d.getFullYear();
//         return `${month} ${day} ${year}`;
//       })()
//     : "";

//   // Auto slide images on hover
//   useEffect(() => {
//     if (!hover || images.length <= 1) return;

//     const interval = setInterval(() => {
//       setIndex((prev) => (prev + 1) % images.length);
//     }, 1200);

//     return () => clearInterval(interval);
//   }, [hover, images.length]);

//   return (
//     <div
//       onClick={onClick}
//       className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 max-w-sm border border-gray-100"
//     >
//       {/* IMAGE */}
//       <div
//         className="relative aspect-[1.1/1] overflow-hidden m-2 rounded-xl"
//         onMouseEnter={() => setHover(true)}
//         onMouseLeave={() => {
//           setHover(false);
//           setIndex(0);
//         }}
//       >
//         <img
//           src={
//             images.length > 0
//               ? images[index]
//               : "https://via.placeholder.com/600"
//           }
//           alt={post.title}
//           className="w-full h-full object-cover transition duration-500"
//         />

//         {/*  COMMUNITY SPOTLIGHT */}
//         <div className="text-[#002B11] absolute -top-1 left-1/2 -translate-x-1/2 bg-white px-4 py-1 rounded-lg shadow text-xs font-bold tracking-wide z-15 whitespace-nowrap">
//           COMMUNITY SPOTLIGHT
//         </div>

//         {/* Image count */}
//         {images.length > 1 && (
//           <div className="absolute top-3 left-3 bg-black/40 text-white text-xs px-2 py-1 rounded-full backdrop-blur">
//             {index + 1}/{images.length}
//           </div>
//         )}

//         {/* Favorite button */}
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             onFavorite?.(post._id);
//           }}
//           className="absolute top-3 right-3 p-2 bg-black/30 backdrop-blur-md rounded-full hover:bg-black/50 transition"
//         >
//           <Star
//             size={18}
//             fill={post.isFavorite ? "#FFD700" : "none"}
//             stroke={post.isFavorite ? "#FFD700" : "white"}
//           />
//         </button>
//       </div>

//       {/* CONTENT */}
//       <div className="p-4 pt-1">
//         <p className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-1">
//           {post.title}
//         </p>

//         <p className="text-xs text-gray-500 mb-1">
//           {post.category_id?.category_name || "City Attraction"}
//         </p>

//         {/* Footer */}
//         <div className="flex justify-between items-center border-t border-gray-100 pt-2 text-xs text-gray-500">
//           <span className="font-medium text-gray-700">
//             By {post.admin_id?.username || "Admin"}
//           </span>
//           <span>{creationDay}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CommunityCard;

import { Star, Heart, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";

const CommunityCard = ({ post, onClick, onFavorite, onLike }) => {
  const images = post.images || [];
  const [index, setIndex] = useState(0);
  const [hover, setHover] = useState(false);

  const creationDay = post.created_at
    ? (() => {
        const d = new Date(post.created_at);
        const month = d.toLocaleString("en-US", { month: "short" });
        return `${month} ${d.getDate()} ${d.getFullYear()}`;
      })()
    : "";

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
      className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
      {/* IMAGE */}
      <div
        className="relative aspect-[1.1/1] overflow-hidden m-2 rounded-xl"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => {
          setHover(false);
          setIndex(0);
        }}
      >
        <img
          src={images[index] || "https://via.placeholder.com/600"}
          alt={post.title}
          className="w-full h-full object-cover"
        />

        {/* BADGE */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 bg-white px-4 py-1 rounded-lg shadow text-xs font-bold text-[#002B11] whitespace-nowrap z-10">
          COMMUNITY SPOTLIGHT
        </div>

        {/* IMAGE COUNT */}
        {images.length > 1 && (
          <div className="absolute top-3 left-3 bg-black/40 text-white text-xs px-2 py-1 rounded-full">
            {index + 1}/{images.length}
          </div>
        )}

        {/* FAVORITE */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavorite?.(post._id);
          }}
          className="absolute top-3 right-3 p-2 bg-black/30 rounded-full"
        >
          <Star
            size={18}
            fill={post.isFavorite ? "#FFD700" : "none"}
            className={post.isFavorite ? "text-yellow-400" : "text-white"}
          />
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-4 pt-1">
        <p className="text-sm font-bold uppercase text-gray-800">
          {post.title}
        </p>

        <p className="text-xs text-gray-500">
          {post.category_id?.category_name || "Community"}
        </p>

        {/* ACTIONS */}
        <div className="flex justify-between mt-2">
          {/* LIKE */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onLike?.(post._id);
            }}
            className="flex items-center gap-1"
          >
            <Heart
              size={16}
              fill={post.liked ? "#ef4444" : "none"}
              className={post.liked ? "text-red-500" : "text-gray-400"}
            />
            <span className="text-xs font-semibold">{post.likes || 0}</span>
          </button>

          {/* COMMENTS */}
          <div className="flex items-center gap-1 text-gray-500">
            <MessageCircle size={16} />
            <span className="text-xs">{post.comments_count || 0}</span>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-between border-t pt-2 mt-2 text-xs text-gray-500">
          <span>{post.admin_id?.username || "Admin"}</span>
          <span>{creationDay}</span>
        </div>
      </div>
    </div>
  );
};

export default CommunityCard;