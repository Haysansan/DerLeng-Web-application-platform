import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import communityService from "../services/community.service";
import serviceService from "../services/service.service";

import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  ArrowLeft,
  DollarSign,
} from "lucide-react";

export default function CommunityPostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState({});
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const postData = await communityService.getCommunityPostById(id);
        setPost(postData);

        const servicesData = await serviceService.getByCommunity(id);
        setServices(servicesData.data || servicesData.services || servicesData);
        // setServices(servicesData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

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
        onClick={() => navigate(-1)}
        className="fixed top-20 right-4 md:left-6 md:right-auto z-50 bg-white shadow-md p-3 rounded-full hover:bg-gray-100 transition"
      >
        <ArrowLeft size={22} />
      </button>

      <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">
        {/* HEADER */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-[#002B11]">{post.title}</h1>

          <div className="flex flex-wrap gap-3 text-gray-500 text-sm items-center">
            <span className="flex items-center gap-1">
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
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/40 p-3 rounded-full"
                    >
                      <ChevronLeft size={28} />
                    </button>

                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/40 p-3 rounded-full"
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
        <div className="p-4 border border-green-500 rounded-xl bg-white shadow-md space-y-2">
          <h2 className="text-xl font-bold text-gray-800">Location</h2>

          <p className="text-gray-600">
            {post.location_description || "No description"}
          </p>

          {post.location_link && (
            <a
              href={post.location_link}
              target="_blank"
              rel="noreferrer"
              className="inline-block px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              View Map
            </a>
          )}
        </div>

        {/* SERVICES */}
        <div className="p-4 border border-green-500 rounded-xl bg-white shadow-md space-y-4">
          <h2 className="text-xl font-bold text-gray-800">
            Community Services
          </h2>

          {!Array.isArray(services) || services.length === 0 ? (
            <p className="text-gray-400 italic">No services available</p>
          ) : (
            <>
              {/* Service List */}
              <div className="space-y-3">
                {services.map((service) => (
                  <div
                    key={service._id}
                    className="border-b border-gray-300 last:border-none pb-3"
                  >
                    <h3 className="font-semibold text-gray-800">
                      {service.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {service.description}
                    </p>

                    <div className="flex items-center gap-1 text-green-600 font-bold text-sm">
                      <DollarSign size={14} />
                      {service.price}
                    </div>
                  </div>
                ))}
              </div>

              {/* Single Booking Button */}
              <button
                onClick={() => navigate(`/booking/${post._id}`)}
                className="w-full mt-3 bg-[#002B11] text-white py-2 rounded-lg hover:bg-green-700 transition"
              >
                Book Now
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
