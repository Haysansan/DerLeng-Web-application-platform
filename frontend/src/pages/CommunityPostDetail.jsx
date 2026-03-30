import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import communityService from "../services/community.service";
import serviceService from "../services/service.service";
import likeService from "../services/like.service";
import commentService from "../services/comment.service";
import { Heart, Layers, MapPinned, Send, ShieldCheck, Trash2 } from "lucide-react";
import favoriteService from "../services/favorite.service";

import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  ArrowLeft,
  DollarSign,
  Star,
  Calendar,
  EllipsisVertical,
  Pencil,
} from "lucide-react";

export default function CommunityPostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
  const page = location.state?.page || 1;
  navigate(`/discover?page=${page}`);
};

  const [post, setPost] = useState({});
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [favorited, setFavorited] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);

  const token = localStorage.getItem("token");
  const currentUser = token ? JSON.parse(atob(token.split(".")[1])) : null;
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const postData = await communityService.getCommunityPostById(id);
        setPost(postData || { images: [] });

        const servicesData = await serviceService.getByCommunity(id);
        setServices(servicesData.data || servicesData.services || servicesData);

        const likeRes = await likeService.getLikesCount(id, "CommunityPost");
        setLikes(likeRes?.likes || 0);

        const commentsRes = await commentService.getComments(
          id,
          "CommunityPost",
        );
        setComments(commentsRes || []);
        const likedRes = await likeService.isLiked(id, "CommunityPost", token);

        setLiked(likedRes.liked);

        const favRes = await favoriteService.getFavorites(
          "CommunityPost",
          token,
        );

        const isFav = favRes.some(
          (f) => f.target_id?._id?.toString() === id.toString(),
        );

        setFavorited(isFav);
      } catch (err) {
        console.error("ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleFavorite = async () => {
    if (!token) return alert("Please login");

    const res = await favoriteService.toggleFavorite(
      id,
      "CommunityPost",
      token,
    );

    setFavorited(res.isFavorite);
  };

  /* LIKE */
  const handleLike = async () => {
    if (!token) return alert("Please login");

    const res = await likeService.toggleLike(id, "CommunityPost", token);

    setLiked(res.liked);
    setLikes((prev) => (res.liked ? prev + 1 : prev - 1));
  };

  /*  ADD COMMENT */
  const handleAddComment = async () => {
    if (!token) {
      setShowLoginModal(true);
      return;
    }
    if (!newComment.trim()) return;

    try {
      const comment = await commentService.addComment({
        target_id: id,
        target_type: "CommunityPost",
        content: newComment,
      });

      setComments((prev) => [comment, ...prev]);
      setNewComment("");
    } catch (err) {
      console.error(err);
    }
  };

  /* DELETE COMMENT */
  const handleDeleteComment = async (commentId) => {
    await commentService.deleteComment(commentId, token);
    setComments((prev) => prev.filter((c) => c._id !== commentId));
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

  const nextImage = () => {
    if (post?.images?.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % post.images.length);
    }
  };

  const prevImage = () => {
    if (post?.images?.length > 0) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + post.images.length) % post.images.length,
      );
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading Community...
      </div>
    );

  if (!post || Object.keys(post).length === 0)
    return <div className="text-center mt-20">Post not found</div>;

  return (
    <>
      {/* BACK BUTTON */}
      <button
        onClick={handleBack}
        className="fixed top-20 right-4 md:left-6 md:right-auto z-50 bg-white shadow-md p-3 rounded-full hover:bg-gray-100 transition cursor-pointer"
      >
        <ArrowLeft size={22} />
      </button>

      <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          {/* LEFT SIDE */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-[#002B11]">{post.title}</h1>

            <div className="flex flex-wrap gap-3 text-gray-500 text-sm items-center">
              <span className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full">
                <MapPin size={14} />
                {post.province_id?.province_name}
              </span>

              <span>
                By{" "}
                <span className="font-semibold text-gray-800">
                  {post.admin_id?.username}
                </span>
              </span>
            </div>
          </div>

          {/* RIGHT SIDE (LIKE BUTTON) */}
          <div className="flex items-center gap-3 self-start ml-auto">
            {/* LIKE */}
            <button
              onClick={handleLike}
              className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full transition duration-300 cursor-pointer"
            >
              <Heart
                size={24}
                className={
                  liked ? "fill-red-500 text-red-500" : "text-gray-400"
                }
              />
              <span
                className={`font-bold ${
                  liked ? "text-red-500" : "text-gray-600"
                }`}
              >
                {likes}
              </span>
            </button>

            {/* FAVORITE */}
            <button
              onClick={handleFavorite}
              className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full flex items-center justify-center"
            >
              <Star
                size={24}
                className={
                  favorited
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-400"
                }
              />
            </button>
          </div>
        </div>

        {/* IMAGE CAROUSEL */}
        <div className="relative flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 h-[550px] rounded-2xl overflow-hidden shadow-lg bg-black">
            {post.images?.length > 0 ? (
              <>
                <div
                  className="absolute inset-0 bg-cover bg-center blur-xl scale-110"
                  style={{
                    backgroundImage: `url(${post?.images[currentImageIndex]})`,
                  }}
                />

                <div className="absolute inset-0 bg-black/30"></div>

                <img
                  src={post?.images[currentImageIndex]}
                  alt="community"
                  className="relative w-full h-full object-contain"
                />

                {post.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/40 p-3 rounded-full cursor-pointer"
                    >
                      <ChevronLeft size={28} />
                    </button>

                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/40 p-3 rounded-full cursor-pointer"
                    >
                      <ChevronRight size={28} />
                    </button>
                  </>
                )}
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                No images
              </div>
            )}
          </div>

          {/* THUMBNAILS */}
          {post.images?.length > 1 && (
            <div className="flex md:flex-col gap-2 overflow-x-auto md:w-20">
              {post.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="thumb"
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                    index === currentImageIndex
                      ? "border-green-500"
                      : "border-transparent"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* COMMUNITY DESCRIPTION */}
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-gray-800">
              About this Community
            </h2>

            <p className="text-gray-600 whitespace-pre-line leading-relaxed">
              {post.content}
            </p>
          </div>

          {/* LOCATION */}
          <div className="p-5 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-md ring-1 ring-gray-100 space-y-5">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <MapPinned size={18} className="text-green-500" />
              Trip Details
            </h2>

            <p className="text-gray-600">
              {post.location_description || "No description"}
            </p>

            {post.location_link ? (
              <div className="relative group rounded-xl overflow-hidden shadow-md ring-1 ring-gray-100 h-80">
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

        {/* SERVICES */}
        <div className="p-5 rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 space-y-5">

          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Layers size={18} className="text-green-500" />
            Community Services
          </h2>

          {!Array.isArray(services) || services.length === 0 ? (
            <p className="text-gray-400 italic text-sm text-center py-4">
              No services available
            </p>
          ) : (
            <>
              <div className="space-y-3">
                {services.map((service) => (
                  <div
                    key={service._id}
                    className="flex justify-between items-start gap-4 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <div>
                      <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                        <ShieldCheck size={15} className="text-green-600" />
                        {service.name}
                      </h3>

                      <p className="text-xs text-gray-500 mt-1 leading-snug">
                        {service.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 text-green-600 font-bold text-sm whitespace-nowrap">
                      <DollarSign size={14} />
                      {service.price}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate(`/booking/${post._id}`)}
                className="w-full flex items-center justify-center gap-2 bg-[#008A3D] cursor-pointer hover:bg-[#006F31] text-white py-2.5 rounded-xl transition"
              >
                <Calendar size={16} />
                Book Now
              </button>
            </>
          )}
        </div>

        {/* COMMENTS */}
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
    </>
  );
}