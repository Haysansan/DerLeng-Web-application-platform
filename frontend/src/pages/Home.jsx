import SearchBar from "../components/HomeComponent/SearchBar";
import { DisplayBanner } from "../components/HomeComponent/DisplayBanner";

export default function Home() {
  return (
    <div className="w-full">
      {/* Title */}
      <div className="w-full bg-white py-8 px-6">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl sm:text-5xl font-bold text-center text-[#002B11]">
            តោះដេីរលេង?
          </h1>
        </div>
      </div>

      {/* SearchBar Section */}
      <div className="w-full py-8 px-6 bg-white flex justify-center">
        <div className="w-full max-w-7xl">
          <SearchBar />
        </div>
      </div>

      {/* Display Banner */}
      <div className="w-full px-6 bg-white flex justify-center">
        <div className="w-full max-w-7xl">
          <DisplayBanner />
        </div>
      </div>

      {/* Additional Content */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Add your home page content here */}
      </div>
    </div>
  );
}
