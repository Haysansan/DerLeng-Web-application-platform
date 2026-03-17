import { Edit, Trash2 } from "lucide-react";
import api from "../../../services/api";

export default function CommunityCard({ community, onEdit, onDelete }) {
  const openEdit = async () => {
    try {
      const res = await api.get(`/services/community/${community._id}/service`);

      onEdit({
        ...community,
        services: res.data.data,
      });
    } catch (err) {
      console.error("Failed to fetch services", err);
      onEdit(community);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <img
        src={community.images?.[0] || "/placeholder.jpg"}
        className="h-48 w-full object-cover"
      />

      <div className="p-4">
        <h2 className="text-lg font-semibold">{community.title}</h2>

        <p className="text-sm text-gray-600 line-clamp-2">
          {community.content}
        </p>

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={openEdit}
            className="text-blue-600 hover:text-blue-800"
          >
            <Edit size={18} />
          </button>

          <button
            onClick={() => onDelete(community._id)}
            className="text-red-600 hover:text-red-800"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
