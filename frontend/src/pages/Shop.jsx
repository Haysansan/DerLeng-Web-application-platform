import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { products } from "../data/products";
import Footer from "../components/Footer";
import shopBanner from "../assets/shop-banner.jpg";

export default function Shop() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  // Auto-scroll effect for Most Popular Products
  useEffect(() => {
    const slider = document.getElementById("popular-products-slider");
    let scrollAmount = 0;
    const scrollStep = 1;
    const delay = 20;

    const scrollInterval = setInterval(() => {
      if (slider) {
        slider.scrollLeft += scrollStep;
        scrollAmount += scrollStep;
        if (scrollAmount >= slider.scrollWidth / 2) {
          slider.scrollLeft = 0;
          scrollAmount = 0;
        }
      }
    }, delay);

    return () => clearInterval(scrollInterval);
  }, []);

  const handleSearch = () => {
    const filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.catalogue.toLowerCase().includes(search.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <div className="w-full flex flex-col">

      {/* Hero Banner - Full Screen */}
      <div className="relative w-full h-screen overflow-hidden">
        <img
          src={shopBanner}
          alt="Shop Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <h1 className="text-white text-5xl md:text-7xl font-bold text-center">
        
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 w-full flex-1">

              {/* Most Popular Products - Auto Scroll */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#002B11] mb-6">
            Most Popular Products Purchased
          </h2>

          <div
            id="popular-products-slider"
            className="flex gap-6 overflow-x-auto scroll-smooth pb-4"
          >
            {products.concat(products).map((product, idx) => (
              <Link
                key={idx}
                to={`/shop/${product.id}`}
                className="min-w-[240px] max-w-[240px]"
              >
                <div className="h-[320px] bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition flex flex-col">
                  
                  {/* Image */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-40 w-full object-cover"
                  />

                  {/* Content */}
                  <div className="p-4 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="font-semibold text-lg text-[#002B11] line-clamp-1">
                        {product.name}
                      </h3>

                      <p className="text-sm text-gray-500 line-clamp-1">
                        {product.catalogue}
                      </p>
                    </div>

                    <p className="mt-3 font-bold text-green-600">
                      ${product.minPrice}
                    </p>
                  </div>

                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Search Section */}
        <section className="mb-12 bg-green-50 p-8 rounded-xl text-center">
          <h2 className="text-2xl font-bold text-[#002B11] mb-4">Find Your Needs!</h2>
          <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for products..."
              className="p-3 rounded-xl border border-gray-300 flex-1"
            />
            <button
              onClick={handleSearch}
              className="bg-[#002B11] text-white px-6 py-3 rounded-xl hover:bg-[#001a08] transition"
            >
              Search
            </button>
          </div>

          {results.length > 0 && (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {results.map((product) => (
                <Link key={product.id} to={`/shop/${product.id}`}>
                  <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition">
                    <img src={product.image} alt={product.name} className="h-48 w-full object-cover" />
                    <div className="p-4">
                      <h3 className="font-semibold text-lg text-[#002B11]">{product.name}</h3>
                      <p className="text-sm text-gray-500">{product.catalogue}</p>
                      <p className="mt-2 font-bold text-green-600">${product.minPrice}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* All Products */}
        <section>
          <h2 className="text-2xl font-bold text-[#002B11] mb-6">All Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <Link key={product.id} to={`/shop/${product.id}`}>
                <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-[#002B11]">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.catalogue}</p>
                    <p className="mt-2 font-bold text-green-600">${product.minPrice}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>

      {/* Footer Full Width */}
      <footer className="w-full">
        <Footer />
      </footer>
    </div>
  );
}