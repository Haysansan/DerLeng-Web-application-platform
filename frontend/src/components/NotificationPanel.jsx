
export default function NotificationPanel({ isOpen, onClose }) {
  // Mock Notification Data
  const notifications = [
    {
      id: 1,
      user: "yuna",
      action: "Liked your photo.",
      time: "2h",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      postImg:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=200",
    },
    {
      id: 2,
      user: "hyunwook",
      action: "Liked your photo.",
      time: "2h",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      postImg:
        "https://images.unsplash.com/photo-1526779259212-939e64788e3c?auto=format&fit=crop&w=200",
    },
    {
      id: 3,
      user: "ryu",
      action: "Started following you.",
      time: "2h",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      postImg:
        "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=200",
    },
  ];

  return (
    <div
      className={`fixed top-0 right-0 h-full bg-white text-black shadow-lg z-50
      transform transition-transform duration-300
      ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      style={{ width: "30%" }}
    >
      {/* Header */}
      <div className="p-5 flex justify-between items-center border-b border-white/20">
        <h2 className="text-lg font-bold border-b border-gray-400 pb-1">
  Notifications
</h2>


        <button
          onClick={onClose}
          className="text-gray-300 hover:text-black text-xl"
        >
          ✕
        </button>
      </div>

      {/* Notification List */}
      <div className="p-4 space-y-6 overflow-y-auto h-full">
        {notifications.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between"
          >
            {/* Left Side */}
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <img
                src={item.avatar}
                alt={item.user}
                className="w-14 h-14 rounded-full object-cover"
              />

              {/* Text */}
              <div>
                <p className="text-lg font-bold leading-none">
                  {item.user}
                </p>

                <p className="text-black-500 text-sm">
                  {item.action}
                </p>

                <p className="text-black-600 text-xs mt-1">
                  {item.time}
                </p>
              </div>
            </div>

            {/* Right Side Post Thumbnail */}
            <img
              src={item.postImg}
              alt="post"
              className="w-14 h-14 rounded-md object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
