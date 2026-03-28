import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import postService from "../services/post.service";
import commentService from "../services/comment.service";
import {
  Heart,
  Star,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Send,
  Trash2,
  ArrowLeft,
  EllipsisVertical,
  Pencil,
  Calendar, Clock, DollarSign,MapPinned,
} from "lucide-react";
import PostLoginPromptModal from "../components/PostLoginPromptModal";
import likeService from "../services/like.service";
import favoriteService from "../services/favorite.service";
import { motion } from "framer-motion";

export default function PostDetail() {
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const token = localStorage.getItem("token");
  const currentUser = token ? JSON.parse(atob(token.split(".")[1])) : null;
  const [favorited, setFavorited] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const postData = await postService.getPostById(id);
        setPost(postData.data);

        const likeRes = await likeService.getLikesCount(id, "Post");
        setLikes(likeRes.likes);

        if (token) {
          const likedRes = await likeService.isLiked(id, "Post", token);
          setLiked(likedRes.liked);
        }
        if (token) {
          const favRes = await favoriteService.getFavorites("Post", token);

          const isFav = favRes.some(
            (f) => f.target_id?._id?.toString() === id.toString(),
          );

          setFavorited(isFav);
        }

        const commentsData = await commentService.getComments(id, "Post");
        setComments(commentsData || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);
  const toggleMenu = (id) => {
  setOpenMenuId(openMenuId === id ? null : id);
};
  const handleNextImage = () => {
    if (post.images?.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % post.images.length);
    }
  };
  const handleFavorite = async () => {
    if (!token) {
      setShowLoginModal(true);
      return;
    }

    const res = await favoriteService.toggleFavorite(id, "Post", token);
    setFavorited(res.isFavorite);
  };

  const handlePrevImage = () => {
    if (post.images?.length > 0) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + post.images.length) % post.images.length,
      );
    }
  };
  const handleEditClick = (comment) => {
  setEditingCommentId(comment._id);
  setEditContent(comment.content);
  };

  const handleUpdateComment = async (commentId) => {
  if (!editContent.trim()) return;

  try {
    const updated = await commentService.updateComment(
      commentId,
      editContent
    );

    setComments((prev) =>
      prev.map((c) =>
        c._id === commentId ? updated : c
      )
    );

    setEditingCommentId(null);
    setEditContent("");
  } catch (err) {
    console.error(err);
  }
  };
  const handleCancelEdit = () => {
  setEditingCommentId(null);
  setEditContent("");
  };  
  const handleLike = async () => {
    if (!token) {
      setShowLoginModal(true);
      return;
    }

    try {
      const res = await likeService.toggleLike(id, "Post", token);

      setLiked(res.liked);
      setLikes((prev) => (res.liked ? prev + 1 : prev - 1));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddComment = async () => {
  if (!token) {
    setShowLoginModal(true);
    return;
  }
  if (!newComment.trim()) return;

  try {
    const comment = await commentService.addComment({
      target_id: id,
      target_type: "Post",
      content: newComment,
    });

    setComments((prev) => [comment, ...prev]);
    setNewComment("");
  } catch (err) {
    console.error(err);
  }
};

  const handleDeleteComment = async (commentId) => {
      await commentService.deleteComment(commentId, token);
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    };
  
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading Story...
      </div>
    );
  if (!post) return <div className="text-center mt-20">Post not found</div>;
  return (
    <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 10 }}
        transition={{ duration: 0.25 }}
        className="min-h-screen bg-white"
      >
      <PostLoginPromptModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={() => {
          setShowLoginModal(false);
          navigate("/login"); // redirect to login page
        }}
      />
      <button
        onClick={() => navigate(-1)}
        className="fixed top-20 right-4 md:left-6 md:right-auto z-50 bg-white shadow-md p-3 rounded-full hover:bg-gray-100 transition"
      >
        <ArrowLeft size={22} />
      </button>
      <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">
        {/* --- HEADER --- */}

        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div className="flex-1 space-y-2">
            <h1 className="text-3xl font-bold text-[#002B11]">{post.title}</h1>
            <div className="flex flex-wrap gap-3 items-center text-gray-500 text-sm">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                {post.category_id?.category_name}
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={14} /> {post.province_id?.province_name}
              </span>
              <span>
                By{" "}
                <span className="font-semibold text-gray-800">
                  {post.user_id?.username || "Traveler"}
                </span>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 self-start ml-auto">
            <button
              onClick={handleLike}
              className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full  transition duration-300 self-start"
            >
              <Heart
                size={24}
                className={
                  liked ? "fill-red-500 text-red-500" : "text-gray-400"
                }
              />
              <span
                className={`font-bold ${liked ? "text-red-500" : "text-gray-600"}`}
              >
                {likes}
              </span>
            </button>
            <Star
              size={24}
              onClick={(e) => {
                e.stopPropagation();
                handleFavorite();
              }}
              className={`cursor-pointer transition hover:scale-110 ${
                favorited ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
              }`}
            />
          </div>
        </div>

        {/* --- IMAGE CAROUSEL WITH BLUR EFFECT --- */}
        <div className="relative flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 h-[600px] rounded-2xl overflow-hidden shadow-lg bg-black">
            {post.images && post.images.length > 0 ? (
              <>
                <div
                  className="absolute inset-0 bg-center bg-cover filter blur-xl scale-110"
                  style={{
                    backgroundImage: `url(${post.images[currentImageIndex]})`,
                  }}
                />
                <div className="absolute inset-0 bg-black/30"></div>

                <img
                  src={post.images[currentImageIndex]}
                  alt="Travel"
                  className="relative w-full h-full object-contain transition duration-700 rounded-2xl"
                />

                {post.images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-3 rounded-full"
                    >
                      <ChevronLeft size={28} />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-3 rounded-full"
                    >
                      <ChevronRight size={28} />
                    </button>
                  </>
                )}
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 bg-gray-100">
                No images
              </div>
            )}
          </div>

          {post.images?.length > 1 && (
            <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-x-hidden md:w-20">
              {post.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`thumb-${idx}`}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${idx === currentImageIndex ? "border-green-500" : "border-transparent"}`}
                  onClick={() => setCurrentImageIndex(idx)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-gray-800">Trip Story</h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {post.content}
            </p>
          </div>

          <div className="flex flex-col gap-4">

            <div className="p-5 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-md ring-1 ring-gray-100 space-y-5">

              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <MapPinned size={18} className="text-green-500" />
                Trip Details
              </h2>

              <div className="flex items-center justify-between text-xs">

                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-blue-500" />
                  <div>
                    <p className="uppercase text-gray-400 font-semibold">Date</p>
                    <p className="font-semibold text-gray-800">
                      {post.trip_date
                        ? new Date(post.trip_date).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "Unknown"}
                    </p>
                  </div>
                </div>

                <div className="w-px h-10 bg-gray-200 mx-3" />

                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-purple-500" />
                  <div>
                    <p className="uppercase text-gray-400 font-semibold">Duration</p>
                    <p className="font-semibold text-gray-800">
                      {post.trip_duration ? `${post.trip_duration} Days` : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="w-px h-10 bg-gray-200 mx-" />

                <div className="flex items-center gap-3">
                  <DollarSign size={16} className="text-green-500" />
                  <div>
                    <p className="uppercase text-gray-400 font-semibold">Budget Spend</p>
                    <p className="font-semibold text-gray-800">
                      {post.trip_cost ? `$${post.trip_cost}` : "N/A"}
                    </p>
                  </div>
                </div>

              </div>

              <div className="border-t border-gray-200 my-4" />

              <div className="flex items-start gap-2 text-xs">
                <MapPin size={16} className="text-red-500 mt-0.5" />
                <div>
                  <p className="uppercase text-gray-400 font-semibold">Location</p>
                  <p className="text-gray-800 font-medium">
                    {post.location_description || "Unknown"}
                  </p>
                </div>
              </div>
            </div>

            {post.location_link ? (
              <div className="relative group rounded-xl overflow-hidden shadow-md ring-1 ring-gray-100 h-40">
                <a
                  href={post.location_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-full"
                >
                  <iframe
                    src={`https://www.google.com/maps?q=${encodeURIComponent(
                      post.location_description || post.province_id?.province_name
                    )}&output=embed`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                  />

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition flex items-center justify-center">
                    <div className="bg-white/90 px-4 py-2 rounded-full shadow text-xs font-semibold flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
                      <MapPinned size={14} className="text-red-500" />
                      View Location
                    </div>
                  </div>
                </a>
              </div>
            ) : null}

          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-1">
            <h2 className="text-2xl font-bold text-[#002B11]">Comment</h2>
            <span className="bg-gray-100 px-3 py-0.5 rounded-full text-sm font-bold">
              {comments.length}
            </span>
          </div>

          <div className="relative group">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts..."
              className="w-full rounded-2xl p-4 pr-16 text-sm bg-white border border-gray-100 
               shadow-sm outline-none resize-none transition
               focus:shadow-md focus:border-gray-200"
            />

            <button
              onClick={handleAddComment}
              className="absolute bottom-4 right-4 bg-[#002B11] text-white p-2.5 rounded-xl 
               hover:opacity-90 transition shadow-md disabled:opacity-50"
              disabled={!newComment.trim()}
            >
              <Send size={18} />
            </button>
          </div>

          <div className="space-y-4">
            {comments.length === 0 ? (
              <p className="text-gray-400 text-center py-8 italic">
                No comments yet.
              </p>
            ) : (
              comments.map((comment) => (
                <div
                  key={comment._id}
                  className="flex gap-4 p-4 rounded-2xl bg-white border border-gray-50 
                     hover:border-gray-100 transition shadow-sm"
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                    {comment.user_id?.avatar ? (
                      <img
                        src={comment.user_id.avatar}
                        alt="avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center 
                              bg-[#008A3D] text-white font-semibold uppercase">
                        {comment.user_id.username?.charAt(0)}
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs text-gray-500 font-semibold">
                          @{comment.user_id.username}
                        </h4>

                        <span className="text-[10px] text-gray-400 flex items-center gap-1">
                          ·{" "}
                          {new Date(comment.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}

                          {comment.edited && (
                            <span className="text-[10px] text-gray-400 italic">
                              (edited)
                            </span>
                          )}
                        </span>
                      </div>

                      {currentUser && comment.user_id?._id === currentUser.id && (
                        <div className="relative">
                          <button
                            onClick={() => toggleMenu(comment._id)}
                            className="text-gray-900 hover:text-gray-700 p-1"
                          >
                            <EllipsisVertical size={16} />
                          </button>

                          {openMenuId === comment._id && (
                            <div className="absolute right-0 mt-2 w-28 bg-white rounded-lg shadow-lg z-10">
                              <button
                                onClick={() => {
                                  handleEditClick(comment);
                                  setOpenMenuId(null);
                                }}
                                className="w-full flex items-center gap-2 px-2 py-1 text-xs hover:bg-gray-100"
                              >
                                <Pencil size={14} />
                                Edit
                              </button>

                              <button
                                onClick={() => {
                                  handleDeleteComment(comment._id);
                                  setOpenMenuId(null);
                                }}
                                className="w-full flex items-center gap-2 px-2 py-1 text-xs text-red-500 hover:bg-gray-100"
                              >
                                <Trash2 size={14} />
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed ">
                      {comment.content}
                    </p>

                    {editingCommentId === comment._id && (
                      <div className="flex flex-col gap-2 mt-2">
                        <textarea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          className="w-full rounded-xl p-3 text-sm bg-white shadow-sm border border-gray-100
                             focus:ring-2 focus:ring-gray-200 focus:border-gray-400 outline-none transition"
                          autoFocus
                        />

                        <div className="flex gap-2">
                          <button
                            onClick={() => handleUpdateComment(comment._id)}
                            className="text-green-600 text-xs"
                          >
                            Save
                          </button>

                          <button
                            onClick={handleCancelEdit}
                            className="text-gray-400 text-xs"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}