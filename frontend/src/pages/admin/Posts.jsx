import { useState, useEffect } from "react";
import { Plus, Trash2, Edit, Search, X, Heart } from "lucide-react";
import api from "../../services/api";
import PostForm from "../Post";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [provinceFilter, setProvinceFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);

  const [showPostModal, setShowPostModal] = useState(false);

  const [categories, setCategories] = useState([]);
  const [provinces, setProvinces] = useState([]);

  const [newCategory, setNewCategory] = useState("");
  const [newProvince, setNewProvince] = useState("");

  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editingProvinceId, setEditingProvinceId] = useState(null);

  const [editValue, setEditValue] = useState("");
  const [postFilterMode, setPostFilterMode] = useState("all");
  const [likesCount, setLikesCount] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/posts");
        setPosts(response.data.data); 
      } catch (err) {
        console.error(err);
        setError("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const likesData = {};

        await Promise.all(
          posts.map(async (post) => {
            const res = await api.get(`/likes/${post._id}`);
            likesData[post._id] = res.data.likes;
          }),
        );

        setLikesCount(likesData);
      } catch (error) {
        console.error("Failed to fetch likes", error);
      }
    };

    if (posts.length > 0) {
      fetchLikes();
    }
  }, [posts]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, categoryFilter, provinceFilter]);

  const filteredPosts = posts.filter((post) => {
    const matchSearch = post.title
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      categoryFilter === "All" ||
      post.category_id?.category_name === categoryFilter;

    const matchProvince =
      provinceFilter === "All" ||
      post.province_id?.province_name === provinceFilter;

    const matchAdmin =
      postFilterMode === "all" || post.user_id?.role === "admin";

    return matchSearch && matchCategory && matchProvince && matchAdmin;
  });

  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const catRes = await api.get("/categories");
        const proRes = await api.get("/provinces");

        setCategories(catRes.data); 
        setProvinces(proRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMeta();
  }, []);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-600">Loading posts...</div>
    );
  }

  if (error) {
    return <div className="p-10 text-center text-red-500">{error}</div>;
  }


  const handleDeletePost = async (postId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?",
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/posts/${postId}`);

      setPosts((prev) => prev.filter((post) => post._id !== postId));
    } catch (error) {
      console.error(error);
      alert("Failed to delete post");
    }
  };
  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;

    try {
      const res = await api.post("/categories/create", {
        title: newCategory,
      });

      console.log("CREATED:", res.data);

      setCategories((prev) => [...prev, res.data.data]);
      setNewCategory("");
    } catch (err) {
      console.log("ERROR:", err.response?.data);
      alert(err.response?.data?.message || "Create failed");
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await api.delete(`/categories/${id}`);
      setCategories((prev) => prev.filter((cat) => cat._id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  const handleUpdateCategory = async (id) => {
    try {
      const res = await api.put(`/categories/${id}`, {
        title: editValue,
      });

      setCategories((prev) =>
        prev.map((cat) => (cat._id === id ? res.data : cat)),
      );

      setEditingCategoryId(null);
      setEditValue("");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  const handleAddProvince = async () => {
    if (!newProvince.trim()) return;

    try {
      const res = await api.post("/provinces/create", { name: newProvince });
      setProvinces((prev) => [...prev, res.data.data]);
      setNewProvince("");
    } catch (err) {
      console.error(err);
      alert("Failed to create province");
    }
  };

  const handleDeleteProvince = async (id) => {
    try {
      await api.delete(`/provinces/${id}`);
      setProvinces((prev) => prev.filter((pro) => pro._id !== id));
    } catch (err) { 
      console.error(err);
      alert("Delete failed");
    }
  };

  const handleUpdateProvince = async (id) => {
    try {
      const res = await api.put(`/provinces/${id}`, {
        name: editValue,
      });

      setProvinces((prev) =>
        prev.map((pro) => (pro._id === id ? res.data : pro)),
      );

      setEditingProvinceId(null);
      setEditValue("");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  const handlePostCreated = (newPost) => {
    setPosts((prev) => [newPost, ...prev]); 
    setShowPostModal(false); 
  };

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-green-900">Manage Posts</h1>
          <p className="text-gray-500">Manage all posts</p>
        </div>

        <div className="flex items-center gap-3">
          {/* View All */}
          <button
            onClick={() => setPostFilterMode("all")}
            className={`px-4 py-2 rounded-xl shadow transition ${
              postFilterMode === "all"
                ? "bg-green-800 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            View All Posts
          </button>

          {/* View Admin */}
          <button
            onClick={() => setPostFilterMode("admin")}
            className={`px-4 py-2 rounded-xl shadow transition ${
              postFilterMode === "admin"
                ? "bg-green-800 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            View Admin Posts
          </button>

          {/* Create Post */}
          <button
            onClick={() => setShowPostModal(true)}
            className="bg-green-800 hover:bg-green-900 text-white px-4 py-2 rounded-xl shadow flex items-center gap-2"
          >
            <Plus size={18} />
            Create Post
          </button>
        </div>
      </div>

      {/* FILTERS */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Search */}
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by title..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-green-600 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-3 rounded-xl border"
        >
          <option value="All">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.category_name}>
              {cat.category_name}
            </option>
          ))}
        </select>

        {/* Province Filter */}
        <select
          value={provinceFilter}
          onChange={(e) => setProvinceFilter(e.target.value)}
          className="px-4 py-3 rounded-xl border"
        >
          <option value="All">All Provinces</option>
          {provinces.map((pro) => (
            <option key={pro._id} value={pro.province_name}>
              {pro.province_name}
            </option>
          ))}
        </select>
      </div>

      {/* POSTS GRID */}
      <div className="grid md:grid-cols-3 gap-6">
        {currentPosts.map((post) => (
          <div
            key={post._id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={
                post.images && post.images.length > 0
                  ? post.images[0]
                  : "/placeholder.jpg"
              }
              alt={post.title}
              className="h-48 w-full object-cover"
            />

            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{post.title}</h2>

              <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                {post.content}
              </p>

              <div className="flex justify-between text-xs text-gray-500">
                <span>@{post.user_id?.username || "Unknown"}</span>

                <div className="flex gap-2">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    {post.category_id?.category_name}
                  </span>

                  <span className="bg-gray-200 px-2 py-1 rounded-full">
                    {post.province_id?.province_name}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Heart size={16} className="text-red-500 fill-red-500" />
                  {likesCount[post._id] || 0}
                </div>

                <div className="flex gap-3">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Edit size={18} />
                  </button>

                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDeletePost(post._id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      {totalPages >= 1 && (
        <div className="flex justify-between items-center px-6 py-8 border-b text-sm text-gray-500 mb-6">
          <div className="flex items-center gap-3">
            <span>Rows per page:</span>
            <select
              value={postsPerPage}
              onChange={(e) => {
                setPostsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border rounded-md px-2 py-1"
            >
              <option value={6}>6</option>
              <option value={12}>12</option>
              <option value={18}>18</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
              }
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg border disabled:bg-gray-100 hover:bg-green-800 hover:text-white"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 rounded-lg ${
                  currentPage === page
                    ? "bg-green-800 text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg border disabled:bg-gray-100 hover:bg-green-800 hover:text-white"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* MODAL */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setShowPostModal(false)}
          ></div>

          <div className="relative bg-white w-[90%] max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-6">
            <button
              onClick={() => setShowPostModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-xl font-bold"
            >
              ✕
            </button>

            <PostForm onPostCreated={handlePostCreated} />
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Manage Categories</h2>

        <div className="flex flex-wrap gap-3 mb-4">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-xl"
            >
              {editingCategoryId === cat._id ? (
                <>
                  <input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="border px-2 py-1 rounded"
                  />
                  <button
                    onClick={() => handleUpdateCategory(cat._id)}
                    className="text-green-600 text-sm"
                  >
                    Save
                  </button>
                  <X
                    size={18}
                    className="cursor-pointer text-gray-500 hover:text-red-500"
                    onClick={() => {
                      setEditingCategoryId(null);
                      setEditValue("");
                    }}
                  />
                </>
              ) : (
                <>
                  {cat.category_name}
                  <Edit
                    size={16}
                    className="cursor-pointer"
                    onClick={() => {
                      setEditingCategoryId(cat._id);
                      setEditValue(cat.category_name);
                    }}
                  />
                  <Trash2
                    size={16}
                    className="cursor-pointer text-red-500"
                    onClick={() => handleDeleteCategory(cat._id)}
                  />
                </>
              )}
            </div>
          ))}
        </div>

        {/* Add Category */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="New category..."
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="border px-3 py-2 rounded-xl flex-1"
          />
          <button
            onClick={handleAddCategory}
            className="bg-green-800 text-white px-4 py-2 rounded-xl"
          >
            Add
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">Manage Provinces</h2>

        <div className="flex flex-wrap gap-3 mb-4">
          {provinces.map((pro) => (
            <div
              key={pro._id}
              className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-xl"
            >
              {editingProvinceId === pro._id ? (
                <>
                  <input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="border px-2 py-1 rounded"
                  />
                  <button
                    onClick={() => handleUpdateProvince(pro._id)}
                    className="text-green-600 text-sm"
                  >
                    Save
                  </button>
                  <X
                    size={18}
                    className="cursor-pointer text-gray-500 hover:text-red-500"
                    onClick={() => {
                      setEditingProvinceId(null);
                      setEditValue("");
                    }}
                  />
                </>
              ) : (
                <>
                  {pro.province_name}
                  <Edit
                    size={16}
                    className="cursor-pointer"
                    onClick={() => {
                      setEditingProvinceId(pro._id);
                      setEditValue(pro.province_name);
                    }}
                  />
                  <Trash2
                    size={16}
                    className="cursor-pointer text-red-500"
                    onClick={() => handleDeleteProvince(pro._id)}
                  />
                </>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="New province..."
            value={newProvince}
            onChange={(e) => setNewProvince(e.target.value)}
            className="border px-3 py-2 rounded-xl flex-1"
          />
          <button
            onClick={handleAddProvince}
            className="bg-green-800 text-white px-4 py-2 rounded-xl"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
