import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FavoriteButton } from "./FavoriteButton";
import historical from "../../assets/bmc.png";
import citylife from "../../assets/btb.jpg";
import wild from "../../assets/kep.jpg";

export default function InterestPanel2() {
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();
  const images = [historical, citylife, wild];

  const baseInterests = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: "The Killing Field and Toul Sleng Genocide Museum (S21) Tour",
    image: images[Math.floor(Math.random() * images.length)],
    rating: 4.9,
    reviews: 1534,
    price: 5,
  }));

  // Create infinite loop by repeating interests 3 times
  const interests = [...baseInterests, ...baseInterests, ...baseInterests];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const itemWidth = 200 + 16; // card width + gap
      container.scrollLeft = itemWidth * 12;
    }
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const container = scrollContainerRef.current;
      const itemWidth = 200 + 16;

      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });

      // Reset scroll position for infinite loop
      setTimeout(() => {
        if (container.scrollLeft >= itemWidth * 24) {
          container.scrollLeft = itemWidth * 12;
        } else if (container.scrollLeft <= 0) {
          container.scrollLeft = itemWidth * 12;
        }
      }, 600);
    }
  };

  const handleCardClick = (interest) => {
    navigate(`/stories/${interest.id}`, { state: { interest } });
  };

  return (
    <div className="w-full bg-white py-8 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Scroll Controls */}
        <div className="flex items-start gap-4">
          {/* Left Button */}
          <button
            onClick={() => scroll("left")}
            className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-full transition-colors mt-20"
            aria-label="Scroll left"
          >
            <svg className="w-6 h-6 text-[#002B11]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Scrollable Container */}
          <div ref={scrollContainerRef} className="overflow-x-auto scrollbar-hide flex-1">
            <div className="flex gap-4">
              {interests.map((interest, index) => (
                <div
                  key={index}
                  onClick={() => handleCardClick(interest)}
                  className="flex-shrink-0 w-[200px] cursor-pointer group"
                >
                  {/* Image Card */}
                  <div className="relative w-full h-[220px] rounded-lg overflow-hidden mb-3 hover:opacity-90 transition-opacity">
                    <img
                      src={interest.image}
                      alt={interest.title}
                      className="w-full h-full object-cover"
                    />

                    {/* Favorite Button - Top Right */}
                    <div className="absolute top-2 right-2 z-20">
                      <FavoriteButton itemId={interest.id} itemType="story" />
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="px-1">
                    {/* Title */}
                    <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2 group-hover:text-[#002B11]">
                      {interest.title}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-[#00B050] text-xs">
                            ●
                          </span>
                        ))}
                      </div>
                      <span className="text-xs text-gray-600">
                        {interest.rating}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({interest.reviews})
                      </span>
                    </div>

                    {/* Price */}
                    <p className="text-sm font-semibold text-gray-800">
                      from ${interest.price} per adult
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Button */}
          <button
            onClick={() => scroll("right")}
            className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-full transition-colors mt-20"
            aria-label="Scroll right"
          >
            <svg className="w-6 h-6 text-[#002B11]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Hide scrollbar styles */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}