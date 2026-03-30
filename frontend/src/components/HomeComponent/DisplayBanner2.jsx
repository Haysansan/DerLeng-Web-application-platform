import { useNavigate } from "react-router-dom";
import travelersStories from "../../assets/banner/travelersStories.jpg";
import logo from "../../assets/logo.svg";

export const DisplayBanner2 = () => {
  const navigate = useNavigate();

  const handleBestStories = () => {
    navigate("/TravelStories");
  };

  return (
    <div className="w-full h-72 md:h-96 rounded-lg overflow-hidden relative mt-6 bg-[#002B11]">
      {/* Background - Green base */}
      <div className="absolute inset-0 bg-[#002B11]" />

      {/* Right Side Image */}
      <div className="absolute right-0 top-0 h-full w-1/2 overflow-hidden">
        <img
          src={travelersStories}
          alt="Travelers Stories"
          className="w-full h-full object-cover"
        />
        {/* Optional: Gradient overlay on image for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#002B11]/20" />
      </div>

      {/* Content - Left Side */}
      <div className="relative h-full flex flex-col justify-center p-8 md:p-10 z-10">
        <div className="max-w-xl">
          {/* Logo and Brand */}
          <div className="flex items-baseline gap-1 mb-4">
            <img
              src={logo}
              alt="Derleng"
              className="h-10 sm:h-9 w-auto brightness-0 invert"
            />
            <span
              className="text-xl sm:text-2xl font-bold tracking-tight -ml-1"
              style={{
                color: "white",
                fontFamily: "Georgia, 'Times New Roman', serif",
                lineHeight: "1",
              }}
            >
              ERLENG
            </span>
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
            Top Travelers' Adventure Stories
          </h2>

          {/* Description */}
          <p className="text-sm md:text-base text-white mb-4 font-medium max-w-md">
            Our top 1% of places, stays, eats, and experiences are chosen by
            travelers like you. Every review matters your insights guide others,
            shape recommendations, and highlight the very best Cambodia has to
            offer.
          </p>

          {/* Button */}
          <button
            onClick={handleBestStories}
            className="bg-white hover:bg-gray-100 text-[#002B11] font-bold px-5 py-2 rounded transition-colors duration-200 w-fit text-sm"
          >
            Best Stories
          </button>
        </div>
      </div>
    </div>
  );
};