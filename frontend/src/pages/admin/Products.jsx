import { useState, useEffect } from "react";
import { Plus, Search, Trash2, Edit, Loader2 } from "lucide-react";
import {
  getProducts,
  createProduct,
  deleteProduct,
  getProductCategory,
  createProductCategory,
  updateProductCategory,
  deleteProductCategory,
} from "../../services/product.service.js";
import API from "../../services/api.js";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // UI State
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");

  // Form State
  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    description: "",
    product_category: "",
    images: [],
  });

  // 1. FETCH DATA ON LOAD
  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [prodRes, catRes] = await Promise.all([
        getProducts(),
        getProductCategory(),
      ]);
      console.log("Product Res", prodRes.data);
      console.log("Categories Res", catRes.data);
      setProducts(prodRes.data.data || []);
      setCategories(catRes.data.data || []);
    } catch (err) {
      console.error("Failed to load data", err);
    } finally {
      setLoading(false);
    }
  };

  // 2. CREATE / UPDATE HANDLER
  const handleSaveProduct = async (e) => {
    e.preventDefault();

    // Use FormData for Multer/Cloudinary
    const formData = new FormData();

    formData.append("name", productForm.name);
    formData.append("price", productForm.price);
    formData.append("description", productForm.description || "");
    const categoryId =
      typeof productForm.product_category === "object"
        ? productForm.product_category._id
        : productForm.product_category;
    if (!categoryId) {
      alert("Please select a valid category!");
      return;
    }
    formData.append("product_category", categoryId);
    // Only append image if a new one was selected
    if (productForm.images && productForm.images.length > 0) {
      productForm.images.forEach((file) => {
        formData.append("image", file);
      });
    }

    try {
      const res = await createProduct(formData);
      alert("Product saved successfully");
      setProducts((prev) => [...prev, res.data.data]);
      setShowModal(false);
      // fetchInitialData(); // Refresh list
      resetForm();
    } catch (err) {
      console.error("Save Product Failed:", err.response?.data);
      alert(err.response?.data?.message || "Error saving product");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        setProducts(products.filter((p) => p._id !== id));
      } catch (err) {
        console.error("Delete failed:", err);
        alert("Delete failed");
      }
    }
  };

  const resetForm = () => {
    setProductForm({
      name: "",
      price: "",
      description: "",
      product_category: "",
      image: null,
    });
    setEditingProductId(null);
  };

  const handleAddCategoryInline = async () => {
    if (!newCategoryName.trim()) return;

    try {
      const res = await createProductCategory({
        product_category_name: newCategoryName,
        title: newCategoryName,
      });

      // Update state with the new category from backend
      setCategories((prev) => [...prev, res.data.data]);
      setNewCategoryName("");
    } catch (err) {
      console.error("Create category failed:", err.response?.data);
      alert(err.response?.data?.message || "Create failed - check console");
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Delete this category? Products might become orphans!"))
      return;
    try {
      await deleteProductCategory(id);
      setCategories((prev) => prev.filter((cat) => cat._id !== id));
      alert("Category deleted");
    } catch (err) {
      console.error("Delete failed", err.response?.data || err);
      alert(err.response?.data?.message);
    }
  };

  const handleUpdateCategory = async (id) => {
    try {
      const res = await updateProductCategory(id, {
        product_category_name: editValue,
        title: editValue,
      });
      // Update the local list so the product dropdown reflects the change
      setCategories((prev) =>
        prev.map((cat) => (cat._id === id ? res.data.data : cat)),
      );
      setEditingCategoryId(null);
      setEditValue("");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  // Filter Logic
  const filteredProducts = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat =
      categoryFilter === "All" || p.product_category?._id === categoryFilter;
    return matchSearch && matchCat;
  });

  if (loading)
    return (
      <div className="flex justify-center p-20">
        <Loader2 className="animate-spin" />
      </div>
    );

  return (
    <div className="p-6">
      {/* HEADER SECTION (Same as your mockup) */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-green-900">Store Management</h1>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-green-800 text-white px-6 py-2 rounded-xl flex items-center gap-2 hover:bg-green-700 transition"
        >
          <Plus size={18} /> Add Product
        </button>
      </div>

      {/* SEARCH & FILTER */}
      <div className="flex gap-4 mb-8">
        <input
          className="flex-1 p-3 border rounded-xl"
          placeholder="Search products..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="p-3 border rounded-xl bg-white"
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="All">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.product_category_name || cat.title}
            </option>
          ))}
        </select>
      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-md transition"
          >
            <img
              src={product.image}
              className="h-40 w-full object-cover"
              alt={product.name}
            />
            <div className="p-4">
              <h3 className="font-bold text-lg">{product.name}</h3>
              <p className="text-green-700 font-semibold">${product.price}</p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => {
                    setProductForm(product);
                    setEditingProductId(product._id);
                    setShowModal(true);
                  }}
                  className="text-blue-500"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="text-red-500"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CATEGORY MANAGEMENT SECTION (Friend's Style) */}
      <div className="bg-white rounded-2xl shadow p-6 mt-12 border border-gray-100">
        <h2 className="text-xl font-bold text-green-900 mb-4">
          Manage Product Categories
        </h2>

        {/* Category Tags List */}
        <div className="flex flex-wrap gap-3 mb-6">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-2 rounded-xl hover:bg-white transition"
            >
              {editingCategoryId === cat._id ? (
                <>
                  <input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="border px-2 py-1 rounded text-sm focus:ring-1 focus:ring-green-500 outline-none"
                    autoFocus
                  />
                  <button
                    onClick={() => handleUpdateCategory(cat._id)}
                    className="text-green-600 font-bold text-xs"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditingCategoryId(null);
                      setEditValue("");
                    }}
                    className="text-gray-400 hover:text-red-500"
                  >
                    ✕
                  </button>
                </>
              ) : (
                <>
                  <span className="text-sm font-medium text-gray-700">
                    {cat.product_category_name || cat.title}
                  </span>
                  <div className="flex gap-1 ml-2 border-l pl-2 border-gray-300">
                    <Edit
                      size={14}
                      className="cursor-pointer text-blue-500 hover:text-blue-700"
                      onClick={() => {
                        setEditingCategoryId(cat._id);
                        setEditValue(cat.product_category_name || cat.title);
                      }}
                    />
                    <Trash2
                      size={14}
                      className="cursor-pointer text-red-400 hover:text-red-600"
                      onClick={() => handleDeleteCategory(cat._id)}
                    />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Inline Add Category Input */}
        <div className="flex gap-2 max-w-md">
          <input
            type="text"
            placeholder="New category name..."
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-xl flex-1 focus:ring-2 focus:ring-green-800 outline-none"
          />
          <button
            onClick={handleAddCategoryInline}
            className="bg-green-800 hover:bg-green-900 text-white px-6 py-2 rounded-xl font-semibold transition shadow-sm"
          >
            Add
          </button>
        </div>
      </div>

      {/* UPLOAD MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <form
            onSubmit={handleSaveProduct}
            className="bg-white p-8 rounded-2xl w-full max-w-md"
          >
            <h2 className="text-2xl font-bold mb-4">
              {editingProductId ? "Edit" : "Add"} Product
            </h2>
            <div className="space-y-4">
              <input
                required
                placeholder="Name"
                className="w-full p-2 border rounded"
                value={productForm.name}
                onChange={(e) =>
                  setProductForm({ ...productForm, name: e.target.value })
                }
              />
              <input
                required
                type="number"
                placeholder="Price"
                className="w-full p-2 border rounded"
                value={productForm.price}
                onChange={(e) =>
                  setProductForm({ ...productForm, price: e.target.value })
                }
              />
              <select
                required
                className="w-full p-2 border rounded"
                value={
                  productForm.product_category?._id ||
                  productForm.product_category
                }
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
                    {cat.product_category_name ||
                      cat.title ||
                      "Unamed Category"}
                  </option>
                ))}
              </select>
              <input
                type="file"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  setProductForm({ ...productForm, images: files })
                }}
              />
            </div>
            <div className="flex gap-2 mt-6">
              <button
                type="submit"
                className="flex-1 bg-green-800 text-white py-2 rounded-xl"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-100 py-2 rounded-xl"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
