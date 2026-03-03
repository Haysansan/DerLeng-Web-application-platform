// App.jsx
import { Route, Routes } from "react-router-dom";
import Master from "./layout/Master";
import AuthModals from "./components/AuthModals";
import Home from "./pages/Home";
import About from "./pages/About";
import Post from "./pages/Post";
import Discover from "./pages/DiscoverPage";
import Profile from "./pages/Profile";
import TravelStories from "./pages/TravalStories";
import FAQ from "./pages/FAQ.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const App = () => {
  return (
    <div>
      <AuthModals />
      <Routes>
        <Route path="/" element={<Master />}>
          <Route path="/" element={<Home />} />
          <Route path="/discover" element={<Discover />} />
          <Route
            path="/post"
            element={
              <ProtectedRoute>
                <Post />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/stories" element={<div>Stories</div>} />
          <Route path="/about" element={<About />} />
          <Route path="/TravelStories" element={<TravelStories />} />
          <Route path="/faq" element={<FAQ />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;