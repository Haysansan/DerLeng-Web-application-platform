import CommunityForm from "../forms/CommunityForm";

export default function CommunityModal({ community, onClose, onSaved }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white w-[90%] max-w-5xl rounded-2xl shadow-2xl p-6">
        <button onClick={onClose} className="absolute top-4 right-4">
          ✕
        </button>

        <CommunityForm
          communityData={community._id ? community : null}
          onCreated={onSaved}
        />
      </div>
    </div>
  );
}
