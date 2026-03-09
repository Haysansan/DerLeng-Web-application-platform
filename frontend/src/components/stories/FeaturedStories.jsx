export default function FeaturedStories({ stories }) {
  const featured = stories.slice(0, 3);

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 h-[450px]">
      {featured.map((story) => (
        <div key={story._id} className="relative group overflow-hidden">
          <img
            src={story.image}
            alt={story.title}
            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent" />

          <div className="absolute bottom-8 left-8 right-8 text-white">
            <h2 className="text-2xl font-bold">{story.title}</h2>
            <p className="text-sm">By {story.author}</p>
          </div>
        </div>
      ))}
    </section>
  );
}