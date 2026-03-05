import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostsByCategory, getPostsByProvince } from "../services/post.service";

export default function PostListPage() {
  const { categoryId, provinceId } = useParams();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      let data;

      if (categoryId) {
        data = await getPostsByCategory(categoryId);
      }

      if (provinceId) {
        data = await getPostsByProvince(provinceId);
      }

      setPosts(data);
    };

    fetchPosts();
  }, [categoryId, provinceId]);

  return (
    <div className="px-6 py-6">
      <h1 className="text-2xl font-bold mb-6">Places</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post._id} className="bg-white shadow rounded-lg overflow-hidden">
            
            <img
              src={`http://localhost:5000/images/${post.image}`}
              alt={post.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <h2 className="font-bold text-lg">{post.title}</h2>
              <p className="text-gray-600">{post.location_description}</p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}