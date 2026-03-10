import { useState, useEffect } from "react";

export const FavoriteButton = ({ itemId, itemType = "story" }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check localStorage for favorite status
    const favorites = JSON.parse(localStorage.getItem("favorites") || "{}");
    setIsFavorited(favorites[`${itemType}_${itemId}`] || false);
  }, [itemId, itemType]);

  const handleToggleFavorite = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    setIsLoading(true);
    const newFavoriteState = !isFavorited;

    try {
      // Try to save to database
      const response = await fetch("/api/favorites/toggle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemId,
          itemType,
          isFavorited: newFavoriteState,
        }),
      });

      if (response.ok) {
        setIsFavorited(newFavoriteState);
        // Also save to localStorage as backup
        const favorites = JSON.parse(localStorage.getItem("favorites") || "{}");
        favorites[`${itemType}_${itemId}`] = newFavoriteState;
        localStorage.setItem("favorites", JSON.stringify(favorites));
      } else {
        // Fallback to localStorage on API error
        const favorites = JSON.parse(localStorage.getItem("favorites") || "{}");
        favorites[`${itemType}_${itemId}`] = newFavoriteState;
        localStorage.setItem("favorites", JSON.stringify(favorites));
        setIsFavorited(newFavoriteState);
      }
    } catch (error) {
      console.log("Database save failed, saving to localStorage:", error);
      // Fallback to localStorage
      const favorites = JSON.parse(localStorage.getItem("favorites") || "{}");
      favorites[`${itemType}_${itemId}`] = newFavoriteState;
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorited(newFavoriteState);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggleFavorite}
      disabled={isLoading}
      className="p-2 rounded-full bg-white/80 hover:bg-white transition-all duration-200"
      aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
    >
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill={isFavorited ? "#EF4444" : "none"}
        stroke="#EF4444"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    </button>
  );
};