import { useDiscover } from "../hooks/useDiscover";
import { categoryImages, provinceImages } from "../data/imageMap";
import { normalize } from "../utils/normalize";
import discoverBanner from "../assets/discover.png";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function DiscoverPage() {
  const { categories, provinces: allProvinces, loading } = useDiscover();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const categoryFilter = searchParams.get("category");
  const [provinces, setProvinces] = useState([]);
  const [filteredProvinces, setFilteredProvinces] = useState([]);

  useEffect(() => {
    setProvinces(allProvinces);
    if (searchQuery) {
      const filtered = allProvinces.filter((prov) =>
        prov.province_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProvinces(filtered);
    } else if (categoryFilter) {
      // Filter by category name
      const filtered = allProvinces.filter((prov) =>
        prov.category_name?.toLowerCase().includes(categoryFilter.toLowerCase())
      );
      setFilteredProvinces(filtered);
    } else {
      setFilteredProvinces(allProvinces);
    }
  }, [allProvinces, searchQuery, categoryFilter]);
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
        {searchQuery && (
          <h2 className="text-xl font-bold mb-4">
            Search results for "{searchQuery}"
          </h2>
        )}
        {categoryFilter && (
          <h2 className="text-xl font-bold mb-4">
            {categoryFilter}
          </h2>
        )}
        {!searchQuery && !categoryFilter && <h2 className="text-xl font-bold mb-4">Provinces</h2>}

        {loading ? (
          <p>Loading...</p>
        ) : filteredProvinces.length === 0 ? (
          <p className="text-gray-500">
            {searchQuery
              ? `No provinces found matching "${searchQuery}"`
              : categoryFilter
              ? `No provinces found for "${categoryFilter}"`
              : "No provinces available"}
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {filteredProvinces.map((prov) => {
              const key = normalize(prov.province_name);

              return (
                <div
                  key={prov._id}
                  onClick={() => navigate(`/posts/province/${prov._id}`)}
                  className="rounded-lg shadow cursor-pointer"
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