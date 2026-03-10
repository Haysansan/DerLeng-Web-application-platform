import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import historical from "../../assets/bmc.png";
import citylife from "../../assets/btb.jpg";
import wild from "../../assets/kep.jpg";

export default function InterestPanel5() {
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();
  const images = [historical, citylife, wild];

  // Mock data for landmark spots
  // TODO: Replace with database query or API call
  // Example: const { data: spots } = useFetch('/api/spots');
  const baseInterests = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    title: [
      "Siem Reap, Angkor Wat",
      "Phnom Penh, Royal Palace",
      "Sihanoukville, Otres Beach",
      "Battambang, Bamboo Train",
      "Kampot, Bokor National Park",
      "Kep, Crab Market",
      "Kratie, Irrawaddy Dolphins",
      "Mondulkiri, Sen Monorom",
      "Ratanakiri, Yeak Loum Lake",
      "Kampong Thom, Sambok Mountain",
    ][i],
    image: images[Math.floor(Math.random() * images.length)],
  }));

  // Create infinite loop by repeating interests 3 times
  const interests = [...baseInterests, ...baseInterests, ...baseInterests];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const itemWidth = 240 + 16; // card width + gap
      container.scrollLeft = itemWidth * 10;
    }
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const container = scrollContainerRef.current;
      const itemWidth = 240 + 16;

      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });

      // Reset scroll position for infinite loop
      setTimeout(() => {
        if (container.scrollLeft >= itemWidth * 20) {
          container.scrollLeft = itemWidth * 10;
        } else if (container.scrollLeft <= 0) {
          container.scrollLeft = itemWidth * 10;
        }
      }, 600);
    }
  };

  const handleCardClick = (title) => {
    navigate(`/discover?filter=${encodeURIComponent(title)}`);
  };

  return (
    <div className="w-full bg-white py-8 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Scroll Controls */}
        <div className="flex items-center gap-4">
          {/* Left Button */}
          <button
            onClick={() => scroll("left")}
            className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-full transition-colors"
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
                  onClick={() => handleCardClick(interest.title)}
                  className="flex-shrink-0 w-[240px] h-[240px] cursor-pointer group"
                >
                  {/* Image Card */}
                  <div className="relative w-full h-full rounded-lg overflow-hidden hover:opacity-90 transition-opacity">
                    <img
                      src={interest.image}
                      alt={interest.title}
                      className="w-full h-full object-cover"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 group-hover:opacity-70 transition-opacity"></div>

                    {/* Text Content - Bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-base font-semibold text-white line-clamp-2 group-hover:text-[#00B050]">
                        {interest.title}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Button */}
          <button
            onClick={() => scroll("right")}
            className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-full transition-colors"
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