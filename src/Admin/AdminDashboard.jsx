// src/components/Admin/AdminDashboard.jsx
import React, { useState, useEffect, useCallback } from "react";
import { NavLink, Outlet, Navigate, useNavigate } from "react-router-dom";
import {
  Users2,
  FileText,
  LogOut,
  FileClock as FileClockIcon,
  Menu as MenuIcon,
  X as CloseIcon,
  User,
} from "lucide-react";
import toast from "react-hot-toast";

const links = [
  {
    to: "/admin/dashboard/users",
    label: "Users",
    icon: <Users2 size={18} />,
  },
  {
    to: "/admin/dashboard/stock",
    label: "Manage Stock",
    icon: <FileText size={18} />,
  },
  {
    to: "/admin/dashboard/sales",
    label: "Manage Sales",
    icon: <FileClockIcon size={18} />,
  },
  {
    to: "/admin/dashboard/dist",
    label: "Manage Distributors",
    icon: <User size={18} />,
  },
];

const AdminDashboard = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  // Auto logout when token expires
  const handleLogout = useCallback(() => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("user");
    toast.success("Logged out successfully 👋");
    navigate("/");
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) return;
    try {
      const { exp } = JSON.parse(atob(token.split(".")[1]));
      const timeout = exp * 1000 - Date.now();
      const id = setTimeout(handleLogout, timeout);
      return () => clearTimeout(id);
    } catch (_) {}
  }, [handleLogout]);

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside
        className={`fixed z-30 top-0 h-full w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-white border-r border-gray-700 transition-transform duration-300 shadow-2xl ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700 bg-gray-900/60 backdrop-blur">
          <h2 className="text-lg font-bold tracking-wide text-green-400">
            Green World Admin
          </h2>
          <button
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setOpen(false)}
          >
            <CloseIcon size={22} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="mt-6 px-4 space-y-1">
          {links.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative overflow-hidden
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md ring-1 ring-blue-400"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              <span className="transition-transform duration-200 hover:scale-110">
                {icon}
              </span>
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Logout button */}
        <div className="absolute bottom-6 inset-x-0 px-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-3 px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-700 hover:opacity-90 text-white text-sm font-semibold shadow-lg transition"
          >
            <LogOut size={18} />
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 overflow-y-auto transition-all duration-300 ${
          open ? "md:ml-64" : ""
        }`}
      >
        {/* Topbar */}
        <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md sticky top-0 z-20 border-b border-gray-200">
          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700 hover:text-blue-600"
            onClick={() => setOpen(true)}
          >
            <MenuIcon size={24} />
          </button>

          {/* Title */}
          <h1 className="text-lg font-semibold text-gray-800 md:ml-20">
            Mwingi Branch — Admin Dashboard
          </h1>

          {/* Profile Circle */}
          <div className="flex items-center gap-3 cursor-pointer group relative">
            <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center text-blue-600 font-bold group-hover:scale-105 transition">
              A
            </div>
            <div className="absolute top-10 right-0 bg-gray-800 text-white text-xs px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition">
              Admin Profile
            </div>
          </div>
        </div>

        {/* Routed Content */}
        <div className="p-6 animate-fadeIn">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export const AdminRoutes = () => <Navigate to="users" replace />;
export default AdminDashboard;
