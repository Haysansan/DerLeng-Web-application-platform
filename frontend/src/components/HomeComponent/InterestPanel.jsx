import { useNavigate } from "react-router-dom";
import historical from "../../assets/interestPanel/interest/historical.jpg";
import citylife from "../../assets/interestPanel/interest/city-life.jpg";
import relaxing from "../../assets/interestPanel/interest/relaxing.jpg";
import adventure from "../../assets/interestPanel/interest/adventure.jpg";

export default function InterestPanel() {
  const navigate = useNavigate();

  const interests = [
    { id: 1, title: "City Life", image: citylife },
    { id: 2, title: "Adventure", image: adventure },
    { id: 3, title: "Relaxing", image: relaxing },
    { id: 4, title: "Historical", image: historical },
  ];

  const handleCardClick = (title) => {
    navigate(`/discover?category=${title}`);
  };

  return (
    <div className="w-full bg-white py-8 px-6">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-2xl font-bold mb-6">Explore by Interest</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {interests.map((interest) => (
            <div
              key={interest.id}
              onClick={() => handleCardClick(interest.title)}
              className="relative w-full h-[240px] rounded-lg overflow-hidden group cursor-pointer hover:opacity-90 transition-opacity"
            >
              {/* Image */}
              <img
                src={interest.image}
                alt={interest.title}
                className="w-full h-full object-cover"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/60 via-black/60 to-transparent flex items-center px-4">
                <h3 className="text-white text-lg font-extrabold tracking-wide">
                  {interest.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}