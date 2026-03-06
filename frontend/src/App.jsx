import { Route, Routes } from "react-router-dom";
import Master from "./layout/Master";
import AuthModals from "./components/AuthModals";
import About from "./pages/About";
import Post from "./pages/Post";
import Discover from "./pages/DiscoverPage";
import Profile from "./pages/Profile";
import TravelStories from "./pages/TravalStories";
import FAQ from "./pages/FAQ.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Dashboard from "./pages/admin/Dashboard.jsx";
import AdminLayout from "./layout/admin/AdminLayout.jsx";
import Users from "./pages/admin/Users.jsx";
import Posts from "./pages/admin/Posts.jsx";
import Products from "./pages/admin/Products.jsx";

const App = () => {
  return (
    <div>
      <AuthModals />

      <Routes>
        <Route path="/" element={<Master />}>
          <Route index element={<div>Home</div>} />
          <Route path="discover" element={<Discover />} />

          <Route
            path="post"
            element={
              <ProtectedRoute>
                <Post />
              </ProtectedRoute>
            }
          />

          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route path="stories" element={<TravelStories />} />
          <Route path="about" element={<About />} />
          <Route path="faq" element={<FAQ />} />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="posts" element={<Posts />} />
          <Route path="products" element={<Products />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
