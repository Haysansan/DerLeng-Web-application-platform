import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  FileText,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`
        ${collapsed ? "w-20" : "w-64"}
        bg-green-900 text-white 
        min-h-screen 
        transition-all duration-300 
        flex flex-col px-3 py-4
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        {!collapsed && <h2 className="text-2xl font-semibold">Admin Panel</h2>}

        <button onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="space-y-4 flex-1">
        <SidebarItem
          to="."
          icon={LayoutDashboard}
          text="Dashboard"
          collapsed={collapsed}
        />

        <SidebarItem
          to="products"
          icon={Package}
          text="Manage Product"
          collapsed={collapsed}
        />

        <SidebarItem
          to="posts"
          icon={FileText}
          text="Manage Post"
          collapsed={collapsed}
        />

        <SidebarItem
          to="users"
          icon={Users}
          text="Users"
          collapsed={collapsed}
        />
      </nav>

      {!collapsed && <div className="pt-6">Logout</div>}
    </div>
  );
}

function SidebarItem({ to, icon: Icon, text, collapsed }) {
  const isDashboard = to === ".";

  return (
    <NavLink
      to={to}
      end={isDashboard}
      className={({ isActive }) =>
        `flex items-center ${
          collapsed ? "justify-center" : "gap-3"
        } px-4 py-3 rounded-2xl transition-all duration-200
        ${
          isActive
            ? "bg-white text-green-900 shadow"
            : "text-white hover:bg-green-800"
        }`
      }
    >
      <Icon size={20} />

      {!collapsed && <span>{text}</span>}
    </NavLink>
  );
}
