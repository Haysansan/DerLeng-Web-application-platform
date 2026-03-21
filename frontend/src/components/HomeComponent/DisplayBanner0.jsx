import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import osvay from  "../../assets/banner/Borey-OSvay.jpeg";
import yeakloam from  "../../assets/banner/Yeak-Loam.jpg";
import prektoal from  "../../assets/banner/Prek-Toal.jpg";



export const DisplayBanner0 = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const navigate = useNavigate();

  const bannerContent = [
    {
      image: osvay,
      title: "Osvay Community-Based Ecotourism Site",
      description: "Mekong Islands and river beaches to a variety of different bird species such as the Black Cormorant."
    },
    {
      image: yeakloam,
      title: "Yeak Laom Community-Based Ecotourism Site",
      description: "Yeak Laom is a deep and clear water containing volcanic lake surrounded by jungle."
    },
    {
      image: prektoal,
      title: "Prek Toal Community-Based Ecotourism Site",
      description: "Prek Toal is a floating village with a bird sanctuary."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % bannerContent.length);
    }, 5000); // Change banner every 5 seconds

    return () => clearInterval(interval);
  }, [bannerContent.length]);

  const handleFindOutMore = () => {
    navigate("/discover");
  };

  return (
    <div
      className="w-full h-72 md:h-96 rounded-lg overflow-hidden relative mt-6 cursor-pointer transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-500"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, ${isHovered ? 0.15 : 0.05}) 0%, rgba(0, 0, 0, ${isHovered ? 0.2 : 0.1}) 30%, rgba(0, 0, 0, ${isHovered ? 0.3 : 0.2}) 100%), url('${bannerContent[currentBannerIndex].image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-8 md:p-10">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
          {bannerContent[currentBannerIndex].title}
        </h2>

        {/* Description */}
        <p className="text-sm md:text-base text-white mb-4 font-medium max-w-2xl">
          {bannerContent[currentBannerIndex].description}
        </p>

        {/* Button */}
        <button
          onClick={handleFindOutMore}
          className="bg-white hover:bg-gray-100 text-[#002B11] font-bold px-5 py-2 rounded transition-colors duration-200 w-fit text-sm"
        >
          Find out more
        </button>
      </div>

      {/* Indicator Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {bannerContent.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentBannerIndex(index)}
            className={`h-2 w-2 rounded-full transition-all duration-300 cursor-pointer hover:opacity-80 ${
              index === currentBannerIndex ? "bg-white w-6" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
