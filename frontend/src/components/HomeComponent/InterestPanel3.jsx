import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useTravelStories from "../../hooks/useTravelStories";

export default function InterestPanel3() {
    const scrollContainerRef = useRef(null);
    const navigate = useNavigate();
    const { posts, loading } = useTravelStories();

    // Map posts to interests with first image from each post
    const baseInterests = posts.slice(0, 10).map((post) => ({
        id: post._id,
        title: post.title,
        image: post.images && post.images.length > 0 ? post.images[0] : "",
    }));

    // Create infinite loop by repeating interests
    const interests = [...baseInterests, ...baseInterests];

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            const itemWidth = 280 + 16; // card width + gap
            container.scrollLeft = itemWidth * 10;
        }
    }, []);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = 296;
            const container = scrollContainerRef.current;
            const itemWidth = 280 + 16;

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

    const handleCardClick = (interest) => {
        navigate(`/posts/${interest.id}`);
    };

    return (
        <div className="w-full bg-white py-8 px-6">
            <div className="mx-auto max-w-7xl">
                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center h-64">
                        <div className="w-10 h-10 border-4 border-[#008A3D] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}

                {/* Scroll Controls */}
                {!loading && (
                    <div className="flex items-center gap-4">
                        {/* Left Button */}
                        <button
                            onClick={() => scroll("left")}
                            className="flex-shrink-0 p-2 hover:bg-opacity-80 rounded-full transition-colors"
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
                                    className="flex-shrink-0 w-[280px] cursor-pointer group"
                                >
                                    {/* Wide Rectangle Card */}
                                    <div className="relative w-full h-[200px] rounded-lg overflow-hidden hover:opacity-90 transition-opacity">
                                        <img
                                            src={interest.image}
                                            alt={interest.title}
                                            className="w-full h-full object-cover"
                                        />

                                        {/* Title Overlay - Bottom */}
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                                            <h3 className="text-sm font-semibold text-white line-clamp-2 group-hover:text-[#00B050]">
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
                        className="flex-shrink-0 p-2 hover:bg-opacity-80 rounded-full transition-colors"
                        aria-label="Scroll right"
                    >
                        <svg className="w-6 h-6 text-[#002B11]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                    </div>
                )}
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