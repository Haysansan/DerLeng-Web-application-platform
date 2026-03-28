import { useEffect, useState } from "react";
import { updatePost } from "../services/post.service";
import { X } from "lucide-react";

export default function EditPostModal({ post, onClose, onUpdated }) {
  const [form, setForm] = useState(post || {});
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    setForm(post || {});
    setImages([]);
    setPreviewImages(post?.images || []);
  }, [post]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append("title", form.title || "");
      formData.append("content", form.content || "");
      formData.append("location_description", form.location_description || "");
      formData.append("location_link", form.location_link || "");
      formData.append("trip_date", form.trip_date || "");
      formData.append("trip_duration", form.trip_duration || "");
      formData.append("trip_cost", form.trip_cost || "");
      formData.append(
        "province_id",
        form.province_id?._id || form.province_id
      );
      formData.append(
        "category_id",
        form.category_id?._id || form.category_id
      );

      // images
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }

      const res = await updatePost(post._id, formData);

      onUpdated(res.data);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  if (!post) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-[620px] max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border border-gray-100">

        {/* HEADER */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-lg font-bold text-gray-800">Edit Post</h2>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-3">

          <input
            name="title"
            value={form.title || ""}
            onChange={handleChange}
            placeholder="Title"
            className="w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <textarea
            name="content"
            value={form.content || ""}
            onChange={handleChange}
            placeholder="Content"
            className="w-full border rounded-lg p-2 text-sm h-24 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            name="location_description"
            value={form.location_description || ""}
            onChange={handleChange}
            placeholder="Location description"
            className="w-full border rounded-lg p-2 text-sm"
          />

          <input
            name="location_link"
            value={form.location_link || ""}
            onChange={handleChange}
            placeholder="Google Maps link"
            className="w-full border rounded-lg p-2 text-sm"
          />

          <div className="grid grid-cols-2 gap-2">
            <input
              type="date"
              name="trip_date"
              value={form.trip_date?.slice(0, 10) || ""}
              onChange={handleChange}
              className="border rounded-lg p-2 text-sm"
            />

            <input
              name="trip_duration"
              value={form.trip_duration || ""}
              onChange={handleChange}
              placeholder="Duration"
              className="border rounded-lg p-2 text-sm"
            />
          </div>

          <input
            type="number"
            name="trip_cost"
            value={form.trip_cost || ""}
            onChange={handleChange}
            placeholder="Trip cost"
            className="w-full border rounded-lg p-2 text-sm"
          />

          {/* IMAGE UPLOAD */}
          <div>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="text-sm"
            />

            {/* PREVIEW */}
            {previewImages.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-3">
                {previewImages.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="preview"
                    className="h-20 w-full object-cover rounded-lg border"
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-2 px-6 py-4 border-t bg-gray-50 rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm rounded-lg bg-green-600 text-white hover:bg-green-700"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
// import { useState, useEffect } from "react";
// import postService from "../services/post.service";

// const EditPostModal = ({ post, onClose, onUpdated }) => {
//   const [form, setForm] = useState({
//     title: "",
//     content: "",
//   });

//   useEffect(() => {
//     if (post) {
//       setForm({
//         title: post.title || "",
//         content: post.content || "",
//       });
//     }
//   }, [post]);

//   const handleUpdate = async () => {
//     try {
//       const updated = await postService.updatePost(post._id, form);
//       onUpdated(updated);
//       onClose();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
//       <div className="bg-white p-6 rounded w-96">
//         <h2>Edit Post</h2>

//         <input
//           value={form.title}
//           onChange={(e) =>
//             setForm({ ...form, title: e.target.value })
//           }
//           className="w-full border p-2 mb-3"
//         />

//         <textarea
//           value={form.content}
//           onChange={(e) =>
//             setForm({ ...form, content: e.target.value })
//           }
//           className="w-full border p-2 mb-3"
//         />

//         <div className="flex justify-end gap-2">
//           <button onClick={onClose}>Cancel</button>
//           <button onClick={handleUpdate} className="bg-green-500 text-white px-3 py-1">
//             Update
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditPostModal;