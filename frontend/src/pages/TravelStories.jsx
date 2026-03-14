import React, { useState } from "react";
import { ChevronRight, Search } from "lucide-react";

// Mock data for the featured stories
const featuredStories = [
  { id: 1, title: "The 10 best things to do in Siem Reap, Angkor Wat", img: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800", author: "Dara" },
  { id: 2, title: "The best places to visit in Cambodia", img: "https://i.pinimg.com/736x/0e/26/33/0e2633a765037ba00327d2aa785fbe7a.jpg", author: "Sophea" },
  { id: 3, title: "Kampong Som, Koh Rong Island the paradise", img: "https://i.pinimg.com/736x/23/bc/e3/23bce3032dd81908c7ca093be2ba7766.jpg", author: "Bora" },
];

// Mock data for the story cards
const storyCards = Array(15)
  .fill({
    id: 4,
    title: "The Killing Field and Tuol Sleng Genocide Museum (S21) Tour",
    img: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=600",
    likes: 124,
    price: "12.00",
  })
  .map((card, i) => ({ ...card, id: i, favorite: false, liked: false })); // add favorite/liked state

export default function TravelStories() {
    const [cards, setCards] = useState(storyCards);
    const [search, setSearch] = useState("");

    const toggleFavorite = (id) => {
        setCards(cards.map(c => c.id === id ? { ...c, favorite: !c.favorite } : c));
    };

    const toggleLike = (id) => {
        setCards(cards.map(c => c.id === id ? { ...c, liked: !c.liked } : c));
    };

    const filteredCards = cards.filter(c =>
        c.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-white">
            {/* HERO SECTION - FEATURED STORIES */}
            <section className="grid grid-cols-1 md:grid-cols-3 h-[450px] w-full bg-black">
                {featuredStories.map((story) => (
                    <div key={story.id} className="relative group cursor-pointer overflow-hidden">
                        <img
                            src={story.img}
                            alt={story.title}
                            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute bottom-8 left-8 right-8 text-white">
                            <h2 className="text-2xl font-bold leading-tight mb-2">{story.title}</h2>
                            <div className="flex items-center text-sm opacity-90">
                                <span>By {story.author}</span>
                                <ChevronRight size={16} className="ml-1" />
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            {/* HEADER & FILTERS */}
<section className="px-8 py-4 max-w-[1600px] mx-auto sticky top-0 bg-white z-50 shadow-sm">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-[#002B11]">Travel Stories</h1>
                        <p className="text-gray-500">Discover experiences from our community</p>
                    </div>
                  
                    <div className="flex space-x-4 items-center">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search stories..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full border border-gray-200 py-2 pl-10 pr-3 outline-none focus:border-[#008A3D] rounded-sm"
                            />
                            <Search
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                            />
                        </div>

                        <select className="border-b-2 border-gray-200 py-2 focus:border-[#008A3D]  font-medium">
                            <option>Newest First</option>
                            <option>Most Viewed</option>
                        </select>
                    </div>
                </div>
            </section>
            <section className="px-8 py-4 max-w-[1600px] mx-auto">
                {/* 5-COLUMN GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                    {filteredCards.map((card) => (
                        <div key={card.id} className="group cursor-pointer">
                            {/* Card Image Container */}
                            <div className="relative aspect-[4/5] overflow-hidden rounded-xl mb-3">
                                <img
                                    src={card.img}
                                    alt={card.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                />

                                {/* Favorite Star */}
                                <button
                                    onClick={() => toggleFavorite(card.id)}
                                    className="absolute top-3 right-3 p-2 rounded-full transition"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5"
                                        viewBox="0 0 24 24"
                                        fill={card.favorite ? "yellow" : "white"}
                                        stroke={card.favorite ? "yellow" : "white"}
                                        strokeWidth={2}
                                    >
                                        <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21 12 17.27z" />
                                    </svg>
                                </button>
                            </div>

                            {/* Card Details */}
                            <div className="space-y-1">
                                <h3 className="text-base font-bold text-[#002B11] leading-snug line-clamp-2 group-hover:text-[#008A3D] transition">
                                    {card.title}
                                </h3>

                                {/* Heart Likes */}
                                <div className="flex items-center space-x-1">
                                    <button onClick={() => toggleLike(card.id)} className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-4 h-4"
                                            viewBox="0 0 24 24"
                                            fill={card.liked ? "red" : "white"}
                                            stroke={card.liked ? "red" : "gray"}
                                            strokeWidth={2}
                                        >
                                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                        </svg>
                                        <span className={`text-sm font-bold ml-1 ${card.liked ? "text-red-500" : "text-black"}`}>
                                            {card.likes}
                                        </span>
                                    </button>
                                </div>

                                <p className="text-sm text-gray-600">
                                    From <span className="font-bold text-black">${card.price}</span> per adult
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* PAGINATION */}
                <div className="flex justify-center mt-16 space-x-2">
                    <button className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-gray-100">1</button>
                    <button className="w-10 h-10 rounded-full bg-[#002B11] text-white flex items-center justify-center">2</button>
                    <button className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-gray-100">...</button>
                    <button className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-gray-100">10</button>
                </div>
            </section>
        </div>
    );
}