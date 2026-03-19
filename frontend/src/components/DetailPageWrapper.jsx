//frontend\src\components\PostPageWrapper.jsx
import PostDetail from "../pages/PostDetail";
import ModalProtectedRoute from "./ModalProtectedRoute";

export default function DetailPageWrapper() {
  return (
    <ModalProtectedRoute>
      <PostDetail />
    </ModalProtectedRoute>
  );
}