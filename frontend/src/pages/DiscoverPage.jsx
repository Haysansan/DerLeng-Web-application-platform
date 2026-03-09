//C:\Users\DELL\Documents\Cadt\cadty3t2\latestlast\DerLeng-Web-application-platform\frontend\src\pages\DiscoverPage.jsx
import { useDiscover } from "../hooks/useDiscover";
import { categoryImages, provinceImages } from "../data/imageMap";
import { normalize } from "../utils/normalize";
import discoverBanner from "../assets/discover.png";
import { useNavigate } from "react-router-dom";

export default function DiscoverPage() {
  const { categories, provinces, loading } = useDiscover();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO */}
      <section className="relative w-full h-[250px]">
        <img
          src={discoverBanner}
          alt="Discover"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold">
            Explore places with Derleng
          </h1>
        </div>
      </section>

      {/* CATEGORY SECTION */}
      <section className="px-6 py-6 bg-white">
        <h2 className="text-xl font-bold mb-4">Type of Place</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex space-x-4 overflow-x-auto">
            {categories.map((cat) => {
              const key = normalize(cat.category_name);

              return (
                <div
                  key={cat._id}
                  onClick={() => navigate(`/posts/category/${cat._id}`)}
                  className="flex flex-col items-center min-w-[90px]"
                >
                  <div className="w-20 h-20 rounded-full overflow-hidden shadow">
                    <img
                      src={
                        categoryImages[key] ||
                        "https://via.placeholder.com/150"
                      }
                      alt={cat.category_name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <span className="mt-2 text-sm text-center">
                    {cat.category_name}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* PROVINCE SECTION */}
      <section className="px-6 py-6 bg-white">
        <h2 className="text-xl font-bold mb-4">Provinces</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {provinces.map((prov) => {
              const key = normalize(prov.province_name);

              return (
                <div
                  key={prov._id}
                  className="rounded-lg shadow"
                >
                  <div className="h-55 overflow-hidden rounded-t-lg">
                    <img
                      src={
                        provinceImages[key] ||
                        "https://via.placeholder.com/200"
                      }
                      alt={prov.province_name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="text-center py-5 font-semibold">
                    {prov.province_name}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}