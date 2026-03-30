function PlaceCard({ post, onSelect }) {
  return (
    <div
      onClick={() => onSelect?.(post)}
      className="flex items-center gap-3 p-3 bg-gray-100 hover:bg-gray-200 rounded-xl cursor-pointer transition"
    >
      {/* IMAGE */}
      <img
        src={post.images?.[0] || "https://via.placeholder.com/60"}
        className="w-14 h-14 rounded-lg object-cover"
      />

      {/* TEXT */}
      <div className="flex flex-col">
        <p className="font-medium text-gray-800">
          {post.title || "Unknown place"}
        </p>
        <p className="text-xs text-gray-500">
          {post.location || "No location"}
        </p>
      </div>
    </div>
  );
}