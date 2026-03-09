import { useEffect, useState } from "react";
import { getAllPosts } from "../services/post.service.js";

export const useTravelStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStories = async () => {
  try {
    setLoading(true);

    const res = await getAllPosts();

    // get array correctly
    const stories = res.data || res;

    const sorted = stories.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    setStories(sorted);
  } catch (error) {
    console.error("Error fetching stories:", error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchStories();
  }, []);

  return {
    stories,
    loading,
  };
};