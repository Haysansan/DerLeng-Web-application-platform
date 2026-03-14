//C:\Users\DELL\Documents\Cadt\cadty3t2\latestlast\DerLeng-Web-application-platform\frontend\src\components\stories\FeaturedStories.jsx
// src/components/stories/FeaturedStories.jsx
//
// frontend/src/components/stories/FeaturedStories.jsx
// import { useState, useEffect } from "react";
// import { Heart } from "lucide-react";
// import { toggleLike, getLikesCount } from "../../services/post.service.js";

// export default function FeaturedStoryCard({ story, userToken }) {
//   const [liked, setLiked] = useState(false);
//   const [likesCount, setLikesCount] = useState(story.likes || 0);

//   useEffect(() => {
//     const fetchLikes = async () => {
//       try {
//         const count = await getLikesCount(story._id);
//         setLikesCount(count);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchLikes();
//   }, [story._id]);

//   const handleLike = async () => {
//     if (!userToken) return alert("Please login to like this post");

//     try {
//       const res = await toggleLike(story._id, userToken);
//       setLiked(res.liked);
//       setLikesCount((prev) => (res.liked ? prev + 1 : prev - 1));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="relative group overflow-hidden rounded-xl">
//       <img
//         src={story.images?.[0] || story.image}
//         alt={story.title}
//         className="w-full h-[450px] object-cover opacity-80 group-hover:scale-105 transition duration-500"
//       />

//       {/* Like button on top-right */}
//       <div className="absolute top-4 right-4 flex items-center space-x-1 z-10">
//         <Heart
//           size={24}
//           className={`cursor-pointer transition-colors duration-300 ${
//             liked ? "text-red-500" : "text-gray-400"
//           }`}
//           onClick={handleLike}
//         />
//         <span className="text-white font-medium">{likesCount}</span>
//       </div>

//       {/* Story info */}
//       <div className="absolute bottom-8 left-8 right-8 text-white z-10">
//         <h2 className="text-2xl font-bold">{story.title}</h2>
//         <p className="text-sm">By {story.user_id?.username || story.author}</p>
//       </div>
//     </div>
//   );
// }

// const FeaturedStories = ({ posts }) => {
//   const featured = posts.slice(0, 3);

//   return (
//     <section className="grid grid-cols-1 md:grid-cols-3 gap mb-8">
//       {featured.map((post) => (
//         <div key={post._id} className="relative overflow-hidden rounded-md">
//           <img
//             src={post.images[0] || "https://via.placeholder.com/400x250"}
//             alt={post.title}
//             className="w-full h-64 object-cover"
//           />
//           <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 text-white">
//             <h2 className="text-xl font-bold">{post.title}</h2>
//             <p className="text-sm">By {post.user_id?.username || "Unknown"}</p>
//           </div>
//         </div>
//       ))}
//     </section>
//   );
// };

// export default FeaturedStories;
// import { ChevronRight } from "lucide-react";

// const FeaturedStories = ({ posts }) => {
//   const featured = posts.slice(0, 3);

//   return (
//     <section className="grid grid-cols-1 md:grid-cols-3 h-[450px] w-full">
//       {featured.map((post) => (
//         <div
//           key={post._id}
//           className="relative group cursor-pointer overflow-hidden rounded-md"
//         >
//           {/* Image */}
//           <img
//             src={post.images[0] || "https://via.placeholder.com/800x450"}
//             alt={post.title}
//             className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition duration-500"
//           />

//           {/* Gradient Overlay */}
//           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

//           {/* Text Content */}
//           <div className="absolute bottom-8 left-8 right-8 text-white">
//             <h2 className="text-2xl font-bold leading-tight mb-2">{post.title}</h2>
//             <div className="flex items-center text-sm opacity-90">
//               <span>By {post.user_id?.username || "Unknown"}</span>
//               <ChevronRight size={16} className="ml-1" />
//             </div>
//           </div>
//         </div>
//       ))}
//     </section>
//   );
// };

// export default FeaturedStories;
import { ChevronRight } from "lucide-react";

const FeaturedStories = ({ posts }) => {
  // Take the first 3 posts to fit the 3-column grid
  const featured = [...posts]
  .sort((a, b) => (b.likes || 0) - (a.likes || 0))
  .slice(0, 3);

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 h-[450px] w-full bg-black">
      {featured.map((post) => (
        <div
          key={post._id}
          className="relative group cursor-pointer overflow-hidden"
        >
          {/* Image - Scaled on hover */}
          <img
            src={post.images?.[0] || "https://via.placeholder.com/800x450"}
            alt={post.title}
            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition duration-500"
          />

          {/* Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          {/* Text Content */}
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <h2 className="text-2xl font-bold leading-tight mb-2">
              {post.title}
            </h2>
            <div className="flex items-center text-sm opacity-90">
              <span>By {post.user_id?.username || "Unknown Author"}</span>
              <ChevronRight size={16} className="ml-1" />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default FeaturedStories;