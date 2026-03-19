import { useState, useEffect } from "react";
import api from "../../services/api";
import CommunityCard from "./components/CommunityCard";
import CommunityModal from "./components/CommunityModal";
import CommunitySearch from "./components/CommunitySearch";

export default function Communities() {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [modalCommunity, setModalCommunity] = useState(null);

  useEffect(() => {
    fetchCommunities();
  }, []);

  const fetchCommunities = async () => {
    try {
      const res = await api.get("/community-posts");
      setCommunities(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this community?")) return;

    await api.delete(`/community-posts/${id}`);
    setCommunities((prev) => prev.filter((c) => c._id !== id));
  };

  const filtered = communities.filter((c) =>
    c.title?.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return <div className="p-10 text-center">Loading communities...</div>;
  }

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold text-green-900">Manage Community</h1>
        <p className="text-gray-500 mb-5">Manage all Community</p>
      </div>
      <CommunitySearch
        search={search}
        setSearch={setSearch}
        onCreate={() => setModalCommunity({})}
      />

      <div className="grid md:grid-cols-3 gap-6">
        {filtered.map((community) => (
          <CommunityCard
            key={community._id}
            community={community}
            onEdit={setModalCommunity}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {modalCommunity !== null && (
        <CommunityModal
          community={modalCommunity}
          onClose={() => setModalCommunity(null)}
          onSaved={() => {
            setModalCommunity(null);
            fetchCommunities();
          }}
        />
      )}
    </div>
  );
}
