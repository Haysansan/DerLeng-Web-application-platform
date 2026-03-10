import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import postService from "../services/post.service";
import StoryCard from "../components/stories/StoryCard"; // <-- import StoryCard

export default function PostListPage() {
  const { categoryId, provinceId } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const allPosts = await postService.getAllPosts();

      let filtered = allPosts;

      if (categoryId) {
        filtered = allPosts.filter(
          (post) => post.category_id?._id === categoryId
        );
      }

      if (provinceId) {
        filtered = filtered.filter(
          (post) => post.province_id?._id === provinceId
        );
      }

      // Initialize liked and favorite states if not present
      filtered = filtered.map(post => ({
        ...post,
        liked: post.liked || false,
        isFavorite: post.isFavorite || false,
        likes: post.likes || 0,
      }));

      setPosts(filtered);
    };

    fetchPosts();
  }, [categoryId, provinceId]);

  const handleLike = async (postId) => {
    const result = await postService.toggleLike(postId);
    setPosts(prev =>
      prev.map(p =>
        p._id === postId
          ? { ...p, liked: result.liked, likes: result.liked ? p.likes + 1 : p.likes - 1 }
          : p
      )
    );
  };

  const handleFavorite = (postId) => {
    setPosts(prev =>
      prev.map(p =>
        p._id === postId ? { ...p, isFavorite: !p.isFavorite } : p
      )
    );
  };

  return (
    <div className="p-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {posts.map(post => (
        <StoryCard
          key={post._id}
          post={post}
          onLike={handleLike}
          onFavorite={handleFavorite}
        />
      ))}
      {posts.length === 0 && <p className="col-span-full text-center">No posts found.</p>}
    </div>
  );
}