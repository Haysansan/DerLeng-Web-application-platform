export default function StoryCard({ story }) {
  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl mb-3">
        <img
          src={story.image}
          alt={story.title}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />
      </div>

      <h3 className="text-base font-bold text-[#002B11] line-clamp-2 group-hover:text-[#008A3D]">
        {story.title}
      </h3>

      <p className="text-sm text-gray-500">By {story.author}</p>

      <div className="text-sm text-gray-500">
        ❤️ {story.likes || 0}
      </div>
    </div>
  );
}