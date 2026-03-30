import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api";

export default function CategoryPostsPage() {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `${API}/community/category/${id}`
        );

        setPosts(res.data || []);
      } catch (err) {
        console.error(err);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [id]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Category Posts</h1>

      {/* ✅ scrollable feed */}
      <div className="space-y-4 max-h-[80vh] overflow-y-auto pr-2">
        {posts.map((post) => (
          <div key={post._id} className="border p-4 rounded-lg">
            <h2 className="font-semibold">{post.title}</h2>
            <p className="text-gray-600">{post.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}