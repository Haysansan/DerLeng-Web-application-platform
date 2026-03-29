// src/components/PostLoginPromptModal.jsx
import lockImage from "../assets/lock.png";
export default function PostLoginPromptModal({ isOpen, onClose, onLogin, message }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="signin-modal-title"
    >
      <div className="relative w-full max-w-sm sm:max-w-md bg-white rounded-2xl p-7 sm:p-8 shadow-2xl text-center">

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition text-lg"
        >
          ✕
        </button>

        {/* Icon */}
          <div className="flex justify-center -mb-7">
            <img
              src={lockImage}
              alt="Sign in required"
              className="w-70 h-40 object-contain"
            />
          </div>

        {/* Title */}
        <h2
          id="signin-modal-title"
          className="text-2xl sm:text-3xl font-semibold text-[#002B11] mb-2"
        >
          Sign In Required
        </h2>

        {/* Message */}
        <p className="text-gray-600 text-sm sm:text-base mb-6">
          {message || "Please sign in to continue."}
        </p>

        {/* Button */}
        <button
          onClick={onLogin}
          className="w-full max-w-[180px] mx-auto block bg-[#008A3D] text-white font-semibold py-2 text-sm rounded-full hover:bg-[#006F31] transition mt-4 cursor-pointer"
        >
          Sign In
        </button>

      </div>
    </div>
  );
}