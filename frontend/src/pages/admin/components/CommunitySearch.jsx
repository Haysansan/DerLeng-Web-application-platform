import { Search, Plus } from "lucide-react";

export default function CommunitySearch({ search, setSearch, onCreate }) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div className="relative w-80">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2"
          size={18}
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search communities..."
          className="w-full pl-10 py-3 border rounded-xl"
        />
      </div>

      <button
        onClick={onCreate}
        className="bg-green-800 text-white px-4 py-2 rounded-xl flex gap-2"
      >
        <Plus size={18} />
        Create Community
      </button>
    </div>
  );
}
