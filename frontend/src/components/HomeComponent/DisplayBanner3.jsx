import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import angkorBottomView from "../../assets/banner/angkorBottomView.jpg";

export const DisplayBanner3 = () => {
  const navigate = useNavigate();

  const handleAboutUs = () => {
    navigate("/about");
  };

  return (
    <div className="w-full px-6">
      <div className="mx-auto max-w-7xl rounded-lg overflow-hidden relative bg-[#CCFF00]">
        <div className="flex items-stretch h-96">
          {/* Left Content Section */}
          <div className="w-1/3 px-8 py-12 flex flex-col justify-center bg-[#CCFF00]">
            {/* Logo and Brand */}
            <div className="flex items-baseline gap-1 mb-4">
              <img
                src={logo}
                alt="Derleng"
                className="h-10 w-auto"
              />
              <span
                className="text-xl font-bold tracking-tight -ml-1"
                style={{
                  color: "black",
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  lineHeight: "1",
                }}
              >
                ERLENG
              </span>
            </div>

            {/* Title */}
            <h2 className="text-4xl font-bold text-black mb-6 leading-tight">
              Derleng<br />Cambodia<br />Together
            </h2>

            {/* Description */}
            <p className="text-base text-black mb-6 font-medium">
              Life becomes a journey worth taking when you choose the right destination. Let us guide you there.
            </p>

            {/* Button */}
            <button
              onClick={handleAboutUs}
              className="px-5 py-2 border-2 border-black text-black font-semibold rounded-lg hover:bg-black hover:text-[#CCFF00] transition-colors duration-200 w-fit text-sm"
            >
              About us
            </button>
          </div>

          {/* Right Image Section */}
          <div className="w-2/3 overflow-hidden">
            <img
              src={angkorBottomView}
              alt="Angkor Temple"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};