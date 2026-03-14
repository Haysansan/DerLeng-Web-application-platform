import { useState, useEffect } from "react";
import { Plus, Search, Trash2, Edit } from "lucide-react";

export default function Products() {
  const [categories, setCategories] = useState([
    { _id: "1", product_category_name: "Food" },
    { _id: "2", product_category_name: "Souvenir" },
    { _id: "3", product_category_name: "Clothing" },
  ]);

  const [products, setProducts] = useState([
    {
      _id: "1",
      name: "Cambodian Coffee",
      price: 5,
      description: "Traditional Cambodian roasted coffee.",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
      product_category: "1",
      isAvailable: true,
    },
    {
      _id: "2",
      name: "Angkor T-Shirt",
      price: 15,
      description: "Cool Angkor Wat printed shirt.",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
      product_category: "3",
      isAvailable: true,
    },
    {
      _id: "3",
      name: "Palm Sugar Candy",
      price: 3,
      description: "Sweet palm sugar candy from Kampong Speu.",
      image: "https://images.unsplash.com/photo-1604908176997-431af2a3a6d8",
      product_category: "1",
      isAvailable: true,
    },
    {
      _id: "4",
      name: "Cambodian Coffee",
      price: 5,
      description: "Traditional Cambodian roasted coffee.",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
      product_category: "1",
      isAvailable: true,
    },
    {
      _id: "5",
      name: "Angkor T-Shirt",
      price: 15,
      description: "Cool Angkor Wat printed shirt.",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
      product_category: "3",
      isAvailable: true,
    },
    {
      _id: "6",
      name: "Palm Sugar Candy",
      price: 3,
      description: "Sweet palm sugar candy from Kampong Speu.",
      image: "https://images.unsplash.com/photo-1604908176997-431af2a3a6d8",
      product_category: "1",
      isAvailable: true,
    },
    {
      _id: "7",
      name: "Palm Sugar Candy",
      price: 3,
      description: "Sweet palm sugar candy from Kampong Speu.",
      image: "https://images.unsplash.com/photo-1604908176997-431af2a3a6d8",
      product_category: "1",
      isAvailable: true,
    },
  ]);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);
const [showCategoryModal, setShowCategoryModal] = useState(false);

const [categoryForm, setCategoryForm] = useState({
  product_category_name: "",
  description: "",
  image: null,
});

  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    product_category: "",
    gallery: [],
  });

  const [editingProductId, setEditingProductId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(6);



  const handleCategoryImageUpload = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  setCategoryForm((prev) => ({
    ...prev,
    image: file,
  }));
};

useEffect(() => {
  setCurrentPage(1);
}, [search, categoryFilter]);

  const filteredProducts = products.filter((product) => {
    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      categoryFilter === "All" || product.product_category === categoryFilter;

    return matchSearch && matchCategory;
  });

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  // -----------------------
  // CREATE PRODUCT
  // -----------------------

  const handleEditProduct = (product) => {
    setProductForm(product);
    setEditingProductId(product._id);
    setShowModal(true);
  };

  const handleCreateProduct = () => {
    const newProduct = {
      ...productForm,
      _id: Date.now().toString(),
      isAvailable: true,
    };

    setProducts((prev) => [...prev, newProduct]);

    setShowModal(false);

    setProductForm({
      name: "",
      price: "",
      description: "",
      image: "",
      product_category: "",
    });
  };

  // -----------------------
  // CREATE CATEGORY
  // -----------------------

 const handleCreateCategory = () => {
   if (!categoryForm.product_category_name.trim()) return;

   const newCat = {
     _id: Date.now().toString(),
     ...categoryForm,
   };

   setCategories((prev) => [...prev, newCat]);

   setCategoryForm({
     product_category_name: "",
     description: "",
     gallery: [],
   });

   setShowCategoryModal(false);
 };




  const handleProductGalleryUpload = (e) => {
    const files = Array.from(e.target.files);

    if (productForm.gallery.length + files.length > 5) {
      alert("Maximum 5 images allowed");
      return;
    }

    setProductForm((prev) => ({
      ...prev,
      gallery: [...prev.gallery, ...files],
    }));
  };
  const handleDeleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p._id !== id));
  };

  const handleSaveProduct = () => {
    if (editingProductId) {
      // UPDATE
      setProducts((prev) =>
        prev.map((p) =>
          p._id === editingProductId ? { ...p, ...productForm } : p,
        ),
      );
    } else {
      // CREATE
      const newProduct = {
        ...productForm,
        _id: Date.now().toString(),
        isAvailable: true,
      };

      setProducts((prev) => [...prev, newProduct]);
    }

    setShowModal(false);
    setEditingProductId(null);

    setProductForm({
      name: "",
      price: "",
      description: "",
      gallery: [],
      product_category: "",
    });
  };

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-green-900">
            Product Management
          </h1>
          <p className="text-gray-500">Manage your products</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setShowCategoryModal(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-xl flex items-center gap-2"
          >
            <Plus size={18} />
            Add Category
          </button>

          <button
            onClick={() => setShowModal(true)}
            className="bg-green-800 text-white px-4 py-2 rounded-xl flex items-center gap-2"
          >
            <Plus size={18} />
            Add Product
          </button>
        </div>
      </div>

      {/* SEARCH + FILTER */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search product..."
            className="w-full pl-10 pr-4 py-3 border rounded-xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="border px-4 py-3 rounded-xl"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="All">All Categories</option>

          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.product_category_name}
            </option>
          ))}
        </select>
      </div>

      {/* PRODUCT GRID */}
      <div className="grid md:grid-cols-3 gap-6 ">
        {currentProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-48 w-full object-cover rounded-t-2xl"
            />

            <div className="p-4">
              <h2 className="text-lg font-bold">{product.name}</h2>

              <p className="text-sm text-gray-500 line-clamp-2 mb-2">
                {product.description}
              </p>

              <p className="font-semibold text-green-700">${product.price}</p>

              <div className="flex justify-between items-center mt-4">
                <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                  {
                    categories.find((c) => c._id === product.product_category)
                      ?.product_category_name
                  }
                </span>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="text-blue-600"
                  >
                    <Edit size={18} />
                  </button>

                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-between items-center px-6 py-8 border-b text-sm text-gray-500 mb-6">
          {/* Rows per page */}
          <div className="flex items-center gap-3">
            <span>Rows per page:</span>

            <select
              value={productsPerPage}
              onChange={(e) => {
                setProductsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border rounded-md px-2 py-1"
            >
              <option value={6}>6</option>
              <option value={9}>9</option>
              <option value={12}>12</option>
            </select>
          </div>

          {/* Pagination Buttons */}
          <div className="flex items-center gap-2">
            {/* Prev */}
            <button
              onClick={() =>
                setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
              }
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg border transition-all duration-200 disabled:bg-gray-100 disabled:text-gray-400 hover:bg-green-800 hover:text-white"
            >
              Prev
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 rounded-lg transition-all ${
                  currentPage === page
                    ? "bg-green-800 text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                {page}
              </button>
            ))}

            {/* Next */}
            <button
              onClick={() =>
                setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg border transition-all duration-200 disabled:bg-gray-100 disabled:text-gray-400 hover:bg-green-800 hover:text-white"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {showCategoryModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setShowCategoryModal(false)}
          />

          <div className="bg-white p-6 rounded-2xl w-[450px] relative">
            <button
              onClick={() => setShowCategoryModal(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-red-600 text-xl font-bold"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-green-900 mb-6">
              Create Category
            </h2>

            <div className="space-y-3">
              <input
                placeholder="Category Name"
                className="border p-2 rounded w-full w-full border border-gray-300 p-3 rounded-sm bg-white"
                value={categoryForm.product_category_name}
                onChange={(e) =>
                  setCategoryForm({
                    ...categoryForm,
                    product_category_name: e.target.value,
                  })
                }
              />

              <textarea
                placeholder="Description"
                className="border p-2 rounded w-full w-full border border-gray-300 p-3 rounded-sm bg-white"
                value={categoryForm.description}
                onChange={(e) =>
                  setCategoryForm({
                    ...categoryForm,
                    description: e.target.value,
                  })
                }
              />

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  Category Image
                </h3>

                <label className="bg-[#008A3D] text-white text-[13px] font-bold px-3 py-1 rounded cursor-pointer hover:bg-green-600">
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleCategoryImageUpload}
                  />
                </label>

                {categoryForm.image && (
                  <div className="mt-3 relative w-24 h-24">
                    <img
                      src={URL.createObjectURL(categoryForm.image)}
                      className="w-24 h-24 object-cover rounded"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setCategoryForm((prev) => ({
                          ...prev,
                          image: null,
                        }))
                      }
                      className="absolute top-0 right-0 bg-red-400 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={handleCreateCategory}
                className="bg-green-800 text-white w-full py-2 rounded-xl"
              >
                Create Category
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE PRODUCT MODAL */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />

          <div className="bg-white rounded-2xl p-8 w-[800px] relative shadow-lg">
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-red-600 text-xl font-bold"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-green-900 mb-6">
              Create Product
            </h2>

            <div className="grid grid-cols-2 gap-8">
              {/* LEFT SIDE */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Product Name
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-3 rounded-sm bg-white"
                    value={productForm.name}
                    onChange={(e) =>
                      setProductForm({ ...productForm, name: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Description
                  </label>
                  <textarea
                    className="w-full border border-gray-300 p-3 rounded-sm bg-white"
                    value={productForm.description}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Price
                  </label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 p-3 rounded-sm bg-white"
                    value={productForm.price}
                    onChange={(e) =>
                      setProductForm({ ...productForm, price: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Category
                  </label>
                  <select
                    className="w-full border border-gray-300 p-3 rounded-sm bg-white"
                    value={productForm.product_category}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        product_category: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Category</option>

                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.product_category_name}
                      </option>
                    ))}
                  </select>
                </div>

                <section>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                      Gallery ({productForm.gallery.length || 0})
                    </h3>

                    <label className="bg-[#008A3D] text-white text-[13px] font-bold px-3 py-1 rounded cursor-pointer hover:bg-green-600">
                      + Add Images
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={handleProductGalleryUpload}
                      />
                    </label>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {productForm.gallery.map((file, i) => (
                      <div key={i} className="relative h-24 w-24">
                        <img
                          src={URL.createObjectURL(file)}
                          className="h-24 w-24 object-cover rounded"
                          alt="Product"
                        />

                        <button
                          type="button"
                          onClick={() => {
                            setProductForm((prev) => ({
                              ...prev,
                              gallery: prev.gallery.filter(
                                (_, index) => index !== i,
                              ),
                            }));
                          }}
                          className="absolute top-0 right-0 bg-red-400 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={handleCreateProduct}
              className="mt-6 w-full bg-green-800 text-white py-3 rounded-xl hover:bg-green-700"
            >
              Create Product
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
