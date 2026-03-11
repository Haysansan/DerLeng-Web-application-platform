import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import angkorBanner from "../../assets/banner/angkorBanner.jpg";
import angkorTopViewBanner from "../../assets/banner/angkorTopViewBanner.jpg";
import phnompenhBanner from "../../assets/banner/phnompenhBanner.jpg";

export const DisplayBanner = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const navigate = useNavigate();

  const banners = [angkorBanner, angkorTopViewBanner, phnompenhBanner];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000); // Change banner every 5 seconds

    return () => clearInterval(interval);
  }, [banners.length]);

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
          backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, ${isHovered ? 0.15 : 0.05}) 0%, rgba(0, 0, 0, ${isHovered ? 0.2 : 0.1}) 30%, rgba(0, 0, 0, ${isHovered ? 0.3 : 0.2}) 100%), url('${banners[currentBannerIndex]}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-8 md:p-10">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
          2025's Top Attractions in Cambodia
        </h2>

        {/* Description */}
        <p className="text-sm md:text-base text-white mb-4 font-medium max-w-2xl">
          Angkor Wat welcomed over 705,000 international visitors in the first nine months of 2025
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
        {banners.map((_, index) => (
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
