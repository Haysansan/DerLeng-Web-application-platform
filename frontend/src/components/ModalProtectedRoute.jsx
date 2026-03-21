//frontend\src\components\ModalProtectedRoute.jsx
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostLoginPromptModal from "./PostLoginPromptModal";
import { AuthContext } from "../context/AuthContext";
import AuthModals from "./AuthModals";

export default function ModalProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [activeModal, setActiveModal] = useState(!user ? "prompt" : null);

  const handleClose = () => {
    setActiveModal(null);
    navigate("/");
  };

  const handleGoToLogin = () => setActiveModal("login");

  return (
    <>
      {/* Only show PostForm if logged in */}
      {user && children}

      {/* Prompt modal */}
      {!user && (
        <PostLoginPromptModal
          isOpen={activeModal === "prompt"}
          onClose={handleClose}
          onLogin={handleGoToLogin}
        />
      )}

      {/* Login modal */}
      <AuthModals
        isOpen={activeModal === "login"}
        onClose={handleClose}
      />
    </>
  );
}