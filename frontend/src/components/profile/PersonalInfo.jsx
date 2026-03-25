export default function PersonalInfo({
  currentUser,
  userPosts,
  setActiveTab,
  setIsEditModalOpen,
}) {
  // Format creation date
  const creationDay = currentUser.created_at
    ? (() => {
        const d = new Date(currentUser.created_at);
        const month = d.toLocaleString("en-US", { month: "short" });
        const day = d.getDate();
        const year = d.getFullYear();
        return `${month} ${day} ${year}`;
      })()
    : "";

  return (
    <div className="bg-white rounded-lg shadow-md p-5 h-fit">
      <h2 className="font-bold text-lg text-[#002B11] mb-4">Personal Detail</h2>
      <p className="text-sm text-gray-600 mb-4">
        {currentUser.bio || (
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="text-gray-400 hover:text-green-600 transition"
          >
            Add a bio
          </button>
        )}
      </p>

      <ul className="text-sm text-gray-500 space-y-2">
        <li className="flex items-center">
          <span className="text-lg">📍</span>
          {currentUser.city || (
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="text-gray-400 hover:text-green-600 transition"
            >
              Add a city
            </button>
          )}
        </li>
        <li>🗓 {creationDay}</li>
        <li>
          🔗{" "}
          {currentUser.website ? (
            <a
              href={
                currentUser.website.startsWith("http")
                  ? currentUser.website
                  : `https://${currentUser.website}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-all"
            >
              {currentUser.website}
            </a>
          ) : (
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="text-gray-400 hover:text-green-600 transition"
            >
              Add a website link
            </button>
          )}
        </li>
      </ul>

      {/* Photos Preview */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-[#002B11] text-sm">Photos</h3>
          <button
            onClick={() => setActiveTab("Photos")}
            className="text-xs text-gray-500 hover:underline cursor-pointer"
          >
            View all
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {userPosts
            .flatMap((post) => post.images || [])
            .slice(0, 6)
            .map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`preview-${i}`}
                className="w-full h-16 object-cover rounded-md"
              />
            ))}
        </div>
      </div>
    </div>
  );
}