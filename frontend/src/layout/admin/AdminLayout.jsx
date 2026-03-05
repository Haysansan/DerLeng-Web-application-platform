import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-200">
      <Sidebar />
      <div className="flex-1 p-10">
        <Outlet />
      </div>
    </div>
  );
}
