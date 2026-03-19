//frontend\src\components\PostPageWrapper.jsx
import PostForm from "../pages/Post";
import ModalProtectedRoute from "./ModalProtectedRoute";

export default function PostPageWrapper() {
  return (
    <ModalProtectedRoute>
      <PostForm />
    </ModalProtectedRoute>
  );
}