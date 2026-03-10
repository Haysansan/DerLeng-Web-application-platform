import { useEffect, useState } from "react";
import axios from "axios";

export default function UserPosts({ userId }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/posts");
        const userPosts = res.data.data.filter(
          (post) => post.user_id._id === userId
        );
        setPosts(userPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [userId]);

  if (loading) return <p>Loading posts...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        User Posts ({posts.length})
      </h2>
      {posts.length === 0 ? (
        <p>No posts found for this user.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.map((post) => (
            <div key={post._id} className="border p-4 rounded shadow">
              <h3 className="font-bold text-lg">{post.title}</h3>
              <p className="text-gray-600">{post.content}</p>
              {post.images &&
                post.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="post"
                    className="mt-2 w-full rounded"
                  />
                ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}