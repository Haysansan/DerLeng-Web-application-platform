import Sidebar from "../../components/admin/Sidebar.jsx";
import StatCard from "../../components/admin/StatCard.jsx";
import api from "../../services/api.js";
import { useState, useEffect } from "react";
import { Users, FileText, ShoppingBag } from "lucide-react";

export default function Dashboard() {
  const [usersCount, setUsersCount] = useState(0);
  const [postsCount, setPostsCount] = useState(0);
    const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [usersRes, postsRes] = await Promise.all([
          api.get("/users"), 
          api.get("/posts"), 
        ]);

        setUsersCount(usersRes.data.data.length);
        setPostsCount(postsRes.data.data.length);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

    if (loading) {
      return (
        <div className="p-10 text-center text-gray-600">
          Loading dashboard...
        </div>
      );
    }

    if (error) {
      return <div className="p-10 text-center text-red-500">{error}</div>;
    }
  return (
    <div className="flex min-h-screen bg-gray-200">
      {/* <Sidebar /> */}

      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-green-900">Admin Dashboard</h1>
        <p className="text-gray-600 mb-8">Welcome back, Admin!</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Users"
            value={usersCount}
            change={12}
            icon={Users}
            accent="green"
          />

          <StatCard
            title="Total Posts"
            value={postsCount}
            icon={FileText}
            accent="blue"
          />

          <StatCard
            title="Total Products"
            value={30}
            icon={ShoppingBag}
            accent="purple"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatCard title="Total Orders" value="1200" dark />
          <StatCard title="Total Revenue" value="1200" dark />
        </div>
      </div>
    </div>
  );
}