import { Route, Routes } from "react-router-dom";
import Master from "./layout/Master";
import About from "./pages/About";
import Post from "./pages/Post";
import DiscoverPage from "./pages/DiscoverPage";
import Profile from "./pages/Profile";
import TravelStories from "./pages/TravalStories";
import FAQ from "./pages/FAQ.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import PostListPage from "./pages/PostListpage.jsx";

import Dashboard from "./pages/admin/Dashboard.jsx";
import AdminLayout from "./layout/admin/AdminLayout.jsx";
import Users from "./pages/admin/Users.jsx";
import Posts from "./pages/admin/Posts.jsx";
import Products from "./pages/admin/Products.jsx";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Master />}>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/post" element={<Post />}/>
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                  {/* CATEGORY FILTER */}
        <Route path="/posts/category/:categoryId" element={<PostListPage />} />

        {/* PROVINCE FILTER */}
        <Route path="/posts/province/:provinceId" element={<PostListPage />} />
          <Route path="/stories" element={<div>Stories</div>} />
          <Route path="/about" element={<About />} />
          <Route path="/TravelStories" element={<TravelStories />} />
          <Route path="/faq" element={<FAQ />} />
          {/* <Route index element={<div>Home</div>} /> */}
          {/* <Route path="discover" element={<Discover />} /> */}
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
