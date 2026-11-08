import { Outlet, NavLink } from "react-router-dom";
import {
  FaUsers,
  FaBook,
  FaClipboardList,
  FaCog,
  FaThLarge,
} from "react-icons/fa";
import { Code2, ShieldCheck, LogOut } from "lucide-react";

const AdminLayout = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-xl font-semibold transition-all duration-200 border ${
      isActive
        ? "bg-purple-600/20 text-white border-purple-500/30"
        : "text-gray-400 hover:text-white hover:bg-white/5 border-transparent hover:border-white/10"
    }`;

  return (
    <div className="min-h-screen flex bg-[#0d0d0f] text-white">

      {/* SIDEBAR */}
      <aside className="w-64 bg-[#111114] flex flex-col p-6 border-r border-white/10 sticky top-0 h-screen">

        
        

        {/* Admin badge */}
        <div className="flex items-center gap-2 bg-purple-600/10 border border-purple-500/20 rounded-lg px-3 py-1.5 mb-8 w-fit">
          <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
          <span className="text-xs font-semibold text-purple-400 uppercase tracking-widest">
            Admin Panel
          </span>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-2">
          <NavLink to="/admin" end className={linkClass}>
            <FaThLarge className="shrink-0" /> Overview
          </NavLink>
          <NavLink to="/admin/users" className={linkClass}>
            <FaUsers className="shrink-0" /> Users
          </NavLink>
          <NavLink to="/admin/courses" className={linkClass}>
            <FaBook className="shrink-0" /> Courses
          </NavLink>
          <NavLink to="/admin/assessments" className={linkClass}>
            <FaClipboardList className="shrink-0" /> Assessments
          </NavLink>
          <NavLink to="/admin/settings" className={linkClass}>
            <FaCog className="shrink-0" /> Settings
          </NavLink>
        </nav>

       
       

      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-8 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-purple-700/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10">
          <Outlet />
        </div>
      </main>

    </div>
  );
};

export default AdminLayout;