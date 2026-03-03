import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";

export const Advertise = () => {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    navigate("/about");
  };

  return (
    <div className="w-full bg-white py-8 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center gap-8 bg-white rounded-lg p-8">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <div className="w-40 h-40 bg-white rounded-lg flex items-center justify-center p-4 rotate-3">
              <img
                src={logo}
                alt="Derleng Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1">
            {/* Advertisement Label */}
            <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide">
              Advertisement
            </p>

            {/* Title */}
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Your Stories Matter To Our Nations
            </h2>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed mb-6">
              Every Cambodian story counts. Sharing travels from Phnom Penh to Angkor shows our culture,
              inspires tourism and boosts national pride. Together, our stories help Cambodia shine.
            </p>

            {/* Learn More Button */}
            <button
              onClick={handleLearnMore}
              className="px-8 py-3 border-2 border-gray-900 text-gray-900 font-semibold rounded-lg hover:bg-gray-900 hover:text-white transition-colors duration-200"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};