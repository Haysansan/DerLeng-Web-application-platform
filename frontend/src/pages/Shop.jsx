
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { products } from "../data/products";
import shopBanner from "../assets/shop-banner.jpg";
import ProductCard from "../components/shop/ProductCard";

export default function Shop() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const categories = ["All", ...new Set(products.map((p) => p.type))];

  const handleSearch = () => {
    let filtered = products;
    if (selectedCategory !== "All") filtered = filtered.filter(p => p.type === selectedCategory);
    filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.catalogue.toLowerCase().includes(search.toLowerCase()));
    setResults(filtered);
  };

  const categoryProducts = selectedCategory === "All" ? [] : products.filter(p => p.type === selectedCategory);

  // Auto-scroll popular products
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollPos = 0;
    const step = () => {
      scrollPos += 0.5;
      if (scrollPos >= scrollContainer.scrollWidth / 2) scrollPos = 0;
      scrollContainer.scrollLeft = scrollPos;
      requestAnimationFrame(step);
    };
    step();
  }, []);

  return (
    <div className="w-full flex flex-col">
      {/* Hero */}
      <div className="relative w-full h-screen overflow-hidden">
        <img src={shopBanner} alt="Shop Banner" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <h1 className="text-white text-5xl md:text-7xl font-bold text-center"></h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 w-full">
        {/* Categories */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#002B11] mb-4">Categories</h2>
          <div className="flex flex-wrap gap-6 text-lg">
            {categories.map((cat, idx) => (
              <span key={idx} onClick={() => setSelectedCategory(cat)} className={`cursor-pointer transition ${selectedCategory === cat ? "text-green-600 font-bold underline" : "text-gray-600 hover:text-green-500"}`}>
                {cat}
              </span>
            ))}
          </div>
        </section>

        {/* Category Products */}
        {selectedCategory !== "All" && categoryProducts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#002B11] mb-6">{selectedCategory} Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {categoryProducts.map(product => (
                <ProductCard key={product.id} product={product} priceOnly={true} />
              ))}
            </div>
          </section>
        )}

        {/* Popular Products */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#002B11] mb-6">Most Popular Products Purchased</h2>
          <div ref={scrollRef} className="flex gap-6 overflow-x-hidden pb-4">
            {products.concat(products).map((product, idx) => (
              <div key={idx} className="min-w-[240px] flex-shrink-0">
                <ProductCard product={product} priceOnly={true} />
              </div>
            ))}
          </div>
        </section>

        {/* Search Section */}
        <section className="mb-12 bg-green-50 p-8 rounded-xl text-center">
          <h2 className="text-2xl font-bold text-[#002B11] mb-4">Find Your Needs!</h2>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search for products..." className="p-3 rounded-xl border border-gray-300 flex-1" />
            <button onClick={handleSearch} className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition">Search</button>
          </div>
          {results.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {results.map(product => <ProductCard key={product.id} product={product} priceOnly={true} />)}
            </div>
          )}
        </section>

        {/* All Products */}
        <section>
          <h2 className="text-2xl font-bold text-[#002B11] mb-6">All Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map(product => <ProductCard key={product.id} product={product} priceOnly={true} />)}
          </div>
        </section>
      </div>
    </div>
  );
}
