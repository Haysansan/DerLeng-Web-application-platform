import React, { useState } from "react";
import useTravelStories from "../hooks/useTravelStories";
import StoryCard from "../components/stories/StoryCard";
import FeaturedStories from "../components/stories/FeaturedStories";
import { Search } from "lucide-react";

export default function TravelStories() {
  const { posts, loading, toggleLikePost } = useTravelStories();
  const [search, setSearch] = useState("");

  const filteredPosts = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );
  
  if (loading) return <p className="text-center mt-20">Loading posts...</p>;

  return (
    <div className="min-h-screen bg-white ">
      <FeaturedStories posts={posts} />

      <section className="px-8 py-4 max-w-[1600px] mx-auto sticky top-0 bg-white z-50 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          {/* Title and Subtitle */}
          <div>
            <h1 className="text-3xl font-bold text-[#002B11]">Travel Stories</h1>
            <p className="text-gray-500">Discover experiences from our community</p>
          </div>
          
          {/* Controls: Search and Filter */}
          <div className="flex space-x-4 items-center w-full md:w-auto">
            {/* Styled Search Input */}
            <div className="relative flex-1 md:w-64">
              <input
                type="text"
                placeholder="Search stories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-gray-200 py-2 pl-10 pr-3 outline-none focus:border-[#008A3D] rounded-sm transition-colors"
              />
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {filteredPosts.map((post) => (
          <StoryCard key={post._id} post={post} onLike={toggleLikePost} />
        ))}
      </div>
    </div>
  );
}