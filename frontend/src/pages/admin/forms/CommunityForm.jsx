import React, { useState, useEffect } from "react";
import { MapPinned } from "lucide-react";
import api from "../../../services/api";
import { getProvinces } from "../../../services/place.service";
import toast from "react-hot-toast";

export default function CommunityForm({ onCreated, communityData }) {
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const isEditMode = !!communityData;
 const [community, setCommunity] = useState({
   title: communityData?.title || "",
   content: communityData?.content || "",
   province: communityData?.province_id?._id || "",
   location_description: communityData?.location_description || "",
   location_link: communityData?.location_link || "",
   gallery: [],
 });
  
  const [services, setServices] = useState([]);
  useEffect(() => {
    if (communityData?.services) {
      setServices(communityData.services);
    }
  }, [communityData]);
  
useEffect(() => {
  if (communityData) {
    setCommunity({
      title: communityData.title || "",
      content: communityData.content || "",
      province: communityData.province_id?._id || "",
      location_description: communityData.location_description || "",
      location_link: communityData.location_link || "",
      gallery: [],
    });
  } else {
    setCommunity({
      title: "",
      content: "",
      province: "",
      location_description: "",
      location_link: "",
      gallery: [],
    });
  }
}, [communityData]);

  
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    price: "",
  });

  const handleAddService = () => {
    if (!newService.name || !newService.price) return;

    setServices((prev) => [...prev, newService]);

    setNewService({
      name: "",
      description: "",
      price: "",
    });
  };

  const handleRemoveService = (index) => {
    setServices((prev) => prev.filter((_, i) => i !== index));
  };

  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const data = await getProvinces();
        setProvinces(data);
      } catch (err) {
        toast.error("Failed to load provinces");
      }
    };

    fetchProvinces();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommunity((prev) => ({ ...prev, [name]: value }));
  };

  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files);

    if (community.gallery.length + files.length > 10) {
      toast.error("Maximum 10 images allowed");
      return;
    }

    setCommunity((prev) => ({
      ...prev,
      gallery: [...prev.gallery, ...files],
    }));
  };

  useEffect(() => {
    console.log("communityData:", communityData);
  }, [communityData]);

  const handleSubmit = async () => {
    if (!community.title || !community.content || !community.province) {
      toast.error("Please fill required fields");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("title", community.title);
      formData.append("content", community.content);
      formData.append("province_id", community.province);
      formData.append("location_description", community.location_description);
      formData.append("location_link", community.location_link);

      community.gallery.forEach((file) => {
        formData.append("images", file);
      });

      let res;
      let communityId;

      if (isEditMode) {
        res = await api.put(`/community-posts/${communityData._id}`, formData);
        communityId = communityData._id;
        toast.success("Community updated successfully");
      } else {
        res = await api.post("/community-posts", formData);
        communityId = res.data.data._id;
        toast.success("Community created successfully");
      }

      // Save services
      if (services.length > 0) {
        await Promise.all(
          services.map((service) =>
            api.post(`/services/community/${communityId}/service`, service),
          ),
        );
      }

      onCreated(res.data.data);

      setCommunity({
        title: "",
        content: "",
        province: "",
        location_description: "",
        location_link: "",
        gallery: [],
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to create community");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-h-[80vh] overflow-y-auto pr-2">
      {/* TITLE */}
      <div>
        <h2 className="text-2xl font-bold text-green-900 mb-4">
          {isEditMode ? "Edit Community" : "Create Community"}
        </h2>

        <input
          type="text"
          name="title"
          placeholder="Community Title"
          value={community.title}
          onChange={handleChange}
          className="w-full border-b border-gray-300 py-3 text-lg focus:outline-none focus:border-green-600"
        />
      </div>

      {/* CONTENT */}
      <div>
        <div className="flex items-center gap-2 mb-2 text-gray-600 ">
          <MapPinned size={18} className="text-green-600" />
          <span>Describe the community...</span>
        </div>

        <textarea
          name="content"
          value={community.content}
          onChange={handleChange}
          placeholder="Community description..."
          className="w-full border border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none p-4 rounded-lg h-40"
        />
      </div>

      {/* SERVICES */}
      <section>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-bold text-gray-600">
            Community Services ({services.length})
          </h3>

          <button
            type="button"
            onClick={() => setShowServiceModal(true)}
            className="bg-green-800 text-white px-3 py-1 rounded cursor-pointer hover:bg-green-600"
          >
            + Add Service
          </button>
        </div>

        {/* Service List */}
        <div className="space-y-2">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-100 p-2 rounded"
            >
              {/* <span>
                {service.name} - ${service.price}
              </span> */}
              <input
                value={service.name}
                onChange={(e) =>
                  setServices((prev) =>
                    prev.map((s, i) =>
                      i === index ? { ...s, name: e.target.value } : s,
                    ),
                  )
                }
                className="border border-gray-400 focus:ring focus:ring-green-600 outline-none p-1 rounded w-32"
              />

              <input
                type="number"
                value={service.price}
                onChange={(e) =>
                  setServices((prev) =>
                    prev.map((s, i) =>
                      i === index ? { ...s, price: e.target.value } : s,
                    ),
                  )
                }
                className="border border-gray-400 focus:ring focus:ring-green-600 outline-none p-1 rounded w-20"
              />

              <button
                onClick={() => handleRemoveService(index)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* PROVINCE */}
      <div>
        <label className="block text-sm font-semibold mb-2">Province</label>

        <select
          name="province"
          value={community.province}
          onChange={handleChange}
          className="w-full border border-gray-400 focus:ring-2 focus:ring-green-600 outline-none p-3 rounded-lg"
        >
          <option value="">Select province</option>

          {provinces.map((p) => (
            <option key={p._id} value={p._id}>
              {p.province_name}
            </option>
          ))}
        </select>
      </div>

      {/* LOCATION */}
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="location_description"
          placeholder="Location description"
          value={community.location_description}
          onChange={handleChange}
          className="border border-gray-400 focus:ring-2 focus:ring-green-600 outline-none p-3 rounded-lg"
        />

        <input
          type="text"
          name="location_link"
          placeholder="Google Maps link"
          value={community.location_link}
          onChange={handleChange}
          className="border border-gray-400 focus:ring-2 focus:ring-green-600 outline-none p-3 rounded-lg"
        />
      </div>

      {/* GALLERY */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">
            Photo ({community.gallery.length}/10)
          </h3>

          <label className="bg-green-800 text-white px-3 py-1 rounded cursor-pointer hover:bg-green-600">
            + Add Images
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleGalleryUpload}
            />
          </label>
        </div>

        <div className="flex flex-wrap gap-2">
          {community.gallery.map((file, i) => (
            <div key={i} className="relative w-24 h-24">
              <img
                src={URL.createObjectURL(file)}
                alt="preview"
                className="w-24 h-24 object-cover rounded"
              />

              <button
                onClick={() =>
                  setCommunity((prev) => ({
                    ...prev,
                    gallery: prev.gallery.filter((_, index) => index !== i),
                  }))
                }
                className="absolute top-0 right-0 bg-red-500 text-white w-5 h-5 rounded-full text-xs"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
      {isEditMode && communityData.images?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {communityData.images.map((img, i) => (
            <img key={i} src={img} className="w-24 h-24 object-cover rounded" />
          ))}
        </div>
      )}

      {/* SUBMIT */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-green-800 text-white py-3 rounded-lg font-semibold cursor-pointer hover:bg-green-600 disabled:opacity-50"
      >
        {loading
          ? "Uploading..."
          : isEditMode
            ? "Update Community"
            : "Create Community"}
      </button>

      {showServiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Background */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowServiceModal(false)}
          />

          {/* Modal */}
          <div className="relative bg-white p-6 rounded-xl shadow-xl w-[400px]">
            <h3 className="text-lg font-semibold mb-4">Add Service</h3>

            <input
              type="text"
              placeholder="Service name"
              value={newService.name}
              onChange={(e) =>
                setNewService((prev) => ({ ...prev, name: e.target.value }))
              }
              className="border w-full p-2 rounded mb-3"
            />
            <input
              type="text"
              placeholder="Service description"
              value={newService.description}
              onChange={(e) =>
                setNewService((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="border w-full p-2 rounded mb-3"
            />

            <input
              type="number"
              placeholder="Price"
              value={newService.price}
              onChange={(e) =>
                setNewService((prev) => ({
                  ...prev,
                  price: e.target.value,
                }))
              }
              className="border w-full p-2 rounded mb-4"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowServiceModal(false)}
                className="px-3 py-1 bg-gray-300 rounded"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  handleAddService();
                  setShowServiceModal(false);
                }}
                className="px-3 py-1 bg-green-800 text-white rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
