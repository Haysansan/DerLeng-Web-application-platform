//frontend\src\App.jsx
import { Route, Routes } from "react-router-dom";
import Master from "./layout/Master";
import Home from "./pages/Home";
import About from "./pages/About";
import DiscoverPage from "./pages/DiscoverPage";
import Profile from "./pages/Profile";
import TravelStories from "./pages/TravalStories.jsx";
import FAQ from "./pages/FAQ.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import PostListPage from "./pages/PostListpage.jsx";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";

import Dashboard from "./pages/admin/Dashboard.jsx";
import AdminLayout from "./layout/admin/AdminLayout.jsx";
import Users from "./pages/admin/Users.jsx";
import Posts from "./pages/admin/Posts.jsx";
import Products from "./pages/admin/Products.jsx";
import PostPageWrapper from "./components/PostPageWrapper.jsx";
import DetailPageWrapper from "./components/DetailPageWrapper.jsx";

const App = () => {
  return (
    <Routes>

      {/* Main Layout */}
      <Route path="/" element={<Master />}>

        <Route index element={<Home />} />

        <Route path="shop" element={<Shop />} />
        <Route path="shop/:id" element={<ProductDetail />} />

        <Route path="about" element={<About />} />
        <Route path="faq" element={<FAQ />} />

        <Route path="discover" element={<DiscoverPage />} />

        <Route path="post" element={<PostPageWrapper />} />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Posts */}
        <Route path="posts/:id" element={<DetailPageWrapper />} />
        <Route path="posts/category/:categoryId" element={<PostListPage />} />
        <Route path="posts/province/:provinceId" element={<PostListPage />} />

        <Route path="stories" element={<div>Stories</div>} />
        <Route path="TravelStories" element={<TravelStories />} />

      </Route>

      {/* Admin Layout */}
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
  );
};

export default App;