import { useEffect, useState } from "react";
import { updatePost } from "../services/post.service";
import { X } from "lucide-react";
import toast from "react-hot-toast";

export default function EditPostModal({ post, onClose, onUpdated }) {
  const [form, setForm] = useState(post || {});
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(post || {});
    setImages([]);
    setPreviewImages(post?.images || []);
    setErrors({});
  }, [post]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 5) {
      toast.error("You can only upload 5 images max");
      return;
    }

    setImages(files);
    setPreviewImages(files.map((f) => URL.createObjectURL(f)));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.title?.trim()) newErrors.title = "Title is required";
    if (!form.content?.trim()) newErrors.content = "Content is required";
    if (!form.trip_date) newErrors.trip_date = "Trip date is required";
    if (!form.trip_duration?.trim()) newErrors.trip_duration = "Duration is required";
    if (!form.trip_cost) newErrors.trip_cost = "Trip cost is required";

    if (previewImages.length === 0) {
      newErrors.images = "At least 1 image is required";
    }

    if (previewImages.length > 5) {
      newErrors.images = "Maximum 5 images allowed";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", form.title || "");
      formData.append("content", form.content || "");
      formData.append("location_description", form.location_description || "");
      formData.append("location_link", form.location_link || "");
      formData.append("trip_date", form.trip_date || "");
      formData.append("trip_duration", form.trip_duration || "");
      formData.append("trip_cost", form.trip_cost || "");
      formData.append("province_id", form.province_id?._id || form.province_id);
      formData.append("category_id", form.category_id?._id || form.category_id);

      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }

      const res = await updatePost(post._id, formData);

      toast.success("Post updated successfully!");

      onUpdated(res.data);
      onClose();
    } catch (err) {
      toast.error("Failed to update post");
    } finally {
      setLoading(false);
    }
  };

  if (!post) return null;

  const inputClass = (field) =>
    `w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none
    ${errors[field] ? "border-red-500" : "border-gray-200"}`;

  const labelClass = "block text-xs font-bold text-gray-600 mb-1";

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-[620px] max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border border-gray-200">

        {/* HEADER */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-bold">Edit Post</h2>

          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
            <X size={18} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-4">

          {/* TITLE */}
          <div>
            <label className={labelClass}>Title *</label>
            <input
              name="title"
              value={form.title || ""}
              onChange={handleChange}
              placeholder="Enter title"
              className={inputClass("title")}
            />
            {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
          </div>

          {/* CONTENT */}
          <div>
            <label className={labelClass}>Content *</label>
            <textarea
              name="content"
              value={form.content || ""}
              onChange={handleChange}
              placeholder="Write your content..."
              className={`${inputClass("content")} h-24`}
            />
            {errors.content && <p className="text-red-500 text-xs">{errors.content}</p>}
          </div>

          {/* DATE + DURATION */}
          <div className="grid grid-cols-2 gap-3">

            <div>
              <label className={labelClass}>Trip Date *</label>
              <input
                type="date"
                name="trip_date"
                value={form.trip_date?.slice(0, 10) || ""}
                onChange={handleChange}
                className={inputClass("trip_date")}
              />
              {errors.trip_date && <p className="text-red-500 text-xs">{errors.trip_date}</p>}
            </div>

            <div>
              <label className={labelClass}>Duration *</label>
              <input
                type="number"
                name="trip_duration"
                value={form.trip_duration || ""}
                onChange={(e) => {
    const value = e.target.value;

    // prevent negative values
    if (value === "" || Number(value) >= 0) {
      handleChange(e);
    }
  }}
                placeholder="e.g. 3 days"
                className={inputClass("trip_duration")}
              />
              {errors.trip_duration && <p className="text-red-500 text-xs">{errors.trip_duration}</p>}
            </div>
          </div>

          {/* COST */}
          <div>
            <label className={labelClass}>Trip Cost *</label>
            <input
  type="number"
  name="trip_cost"
  value={form.trip_cost || ""}
  onChange={(e) => {
    const value = e.target.value;

    // prevent negative values
    if (value === "" || Number(value) >= 0) {
      handleChange(e);
    }
  }}
  placeholder="Trip cost"
  className={inputClass("trip_cost")}
/>
            {errors.trip_cost && <p className="text-red-500 text-xs">{errors.trip_cost}</p>}
          </div>

          {/* IMAGES */}
          <div>
            <label className={labelClass}>Images * (max 5)</label>

            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="text-sm"
            />

            {errors.images && (
              <p className="text-red-500 text-xs">{errors.images}</p>
            )}

            {previewImages.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-3">
                {previewImages.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    className="h-20 w-full object-cover rounded-lg border border-gray-200"
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-2 px-6 py-4 border-t border-gray-200 bg-gray-50">

          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 text-sm rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 text-sm rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-60 flex items-center gap-2"
          >
            {loading && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {loading ? "Updating..." : "Update"}
          </button>

        </div>

      </div>
    </div>
  );
}