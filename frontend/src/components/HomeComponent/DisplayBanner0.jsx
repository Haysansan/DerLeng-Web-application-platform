// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import osvay from  "../../assets/banner/Borey-OSvay.jpeg";
// import yeakloam from  "../../assets/banner/Yeak-Loam.jpg";
// import prektoal from  "../../assets/banner/Prek-Toal.jpg";



// export const DisplayBanner0 = () => {
//   const [isHovered, setIsHovered] = useState(false);
//   const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
//   const navigate = useNavigate();

//   const bannerContent = [
//     {
//       image: osvay,
//       title: "Osvay Community-Based Ecotourism Site",
//       description: "Mekong Islands and river beaches to a variety of different bird species such as the Black Cormorant."
//     },
//     {
//       image: yeakloam,
//       title: "Yeak Laom Community-Based Ecotourism Site",
//       description: "Yeak Laom is a deep and clear water containing volcanic lake surrounded by jungle."
//     },
//     {
//       image: prektoal,
//       title: "Prek Toal Community-Based Ecotourism Site",
//       description: "Prek Toal is a floating village with a bird sanctuary."
//     }
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % bannerContent.length);
//     }, 5000); // Change banner every 5 seconds

//     return () => clearInterval(interval);
//   }, [bannerContent.length]);

//   const handleFindOutMore = () => {
//     navigate("/discover");
//   };

//   return (
//     <div
//       className="w-full h-72 md:h-96 rounded-lg overflow-hidden relative mt-6 cursor-pointer transition-all duration-300"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Background Image with Overlay */}
//       <div
//         className="absolute inset-0 bg-cover bg-center transition-all duration-500"
//         style={{
//           backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, ${isHovered ? 0.15 : 0.05}) 0%, rgba(0, 0, 0, ${isHovered ? 0.2 : 0.1}) 30%, rgba(0, 0, 0, ${isHovered ? 0.3 : 0.2}) 100%), url('${bannerContent[currentBannerIndex].image}')`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       />

//       {/* Content */}
//       <div className="relative h-full flex flex-col justify-end p-8 md:p-10">
//         {/* Title */}
//         <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
//           {bannerContent[currentBannerIndex].title}
//         </h2>

//         {/* Description */}
//         <p className="text-sm md:text-base text-white mb-4 font-medium max-w-2xl">
//           {bannerContent[currentBannerIndex].description}
//         </p>

//         {/* Button */}
//         <button
//           onClick={handleFindOutMore}
//           className="bg-white hover:bg-gray-100 text-[#002B11] font-bold px-5 py-2 rounded transition-colors duration-200 w-fit text-sm"
//         >
//           Find out more
//         </button>
//       </div>

//       {/* Indicator Dots */}
//       <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
//         {bannerContent.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentBannerIndex(index)}
//             className={`h-2 w-2 rounded-full transition-all duration-300 cursor-pointer hover:opacity-80 ${
//               index === currentBannerIndex ? "bg-white w-6" : "bg-white/50"
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import communityService from "../../services/community.service";

export const DisplayBanner0 = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [banners, setBanners] = useState([]);

  const navigate = useNavigate();

  // 🔥 FETCH RANDOM 3 COMMUNITIES
  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await communityService.getAllCommunityPosts(1, 50);

        const posts =
          res?.posts ||
          res?.data?.posts ||
          res?.data ||
          [];

        if (!posts.length) return;

        // 🎲 SHUFFLE RANDOM
        const shuffled = [...posts].sort(() => 0.5 - Math.random());

        // ✅ TAKE ONLY 3
        const selected = shuffled.slice(0, 3).map((post) => ({
          image:
            post.images?.[0] ||
            "https://via.placeholder.com/1200x500",
          title: post.title,
          content: post.content,
        }));

        setBanners(selected);
      } catch (err) {
        console.error("Banner fetch error:", err);
      }
    };

    fetchBanner();
  }, []);

  // 🔁 AUTO SLIDE
  useEffect(() => {
    if (banners.length === 0) return;

    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) =>
        (prev + 1) % banners.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [banners]);

  const handleClick = () => {
    navigate("/discover");
  };

  if (banners.length === 0) {
    return (
      <div className="w-full h-72 flex items-center justify-center">
        <p className="text-gray-400">Loading banner...</p>
      </div>
    );
  }

  const current = banners[currentBannerIndex];

  return (
    <div
      className="w-full h-72 md:h-96 rounded-lg overflow-hidden relative mt-6 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* BACKGROUND */}
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,${
            isHovered ? 0.2 : 0.1
          }) 0%, rgba(0,0,0,${
            isHovered ? 0.4 : 0.2
          }) 100%), url('${current.image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* CONTENT */}
      <div className="relative h-full flex flex-col justify-end p-8 md:p-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
          {current.title}
        </h2>
        <p className="text-sm font-bold uppercase text-white overflow-hidden mb-2"
   style={{
     display: "-webkit-box",
     WebkitLineClamp: 2,
     WebkitBoxOrient: "vertical",
   }}>
  {current.content}
</p>
          
        

        <button className="bg-white text-[#002B11] font-bold px-5 py-2 rounded w-fit text-sm">
          Explore
        </button>
      </div>

      {/* DOTS */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 line-clamp-1">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentBannerIndex(index);
            }}
            className={`h-2 w-2 rounded-full ${
              index === currentBannerIndex
                ? "bg-white w-6"
                : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
