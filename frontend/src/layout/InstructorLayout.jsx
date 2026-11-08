import { Outlet, Link, useLocation } from "react-router-dom";
import {
  FaBook,
  FaUsers,
  FaChartLine,
  FaCog,
  FaStar,
  FaThLarge,
} from "react-icons/fa";
import { GraduationCap } from "lucide-react";

const InstructorLayout = () => {
  const location = useLocation();

  const menuItems = [
    {
      name: "Overview",
      path: "/instructor",
      icon: <FaThLarge />,
    },
    {
      name: "My Courses",
      path: "/instructor/courses",
      icon: <FaBook />,
    },
    {
      name: "Students",
      path: "/instructor/students",
      icon: <FaUsers />,
    },
    
    
    {
      name: "Settings",
      path: "/instructor/settings",
      icon: <FaCog />,
    },
  ];

  return (
    <div className="min-h-screen flex bg-[#0d0d0f]">

      {/* Sidebar */}
      <aside className="w-64 bg-[#111114] border-r border-white/10 flex flex-col p-6 sticky top-0 h-screen">

        <div className="flex items-center gap-2 bg-purple-600/10 border border-purple-500/20 rounded-lg px-3 py-2 mb-8">
          <GraduationCap className="text-purple-400" size={18} />
          <span className="text-purple-400 font-bold">
            Instructor
          </span>
        </div>

        <nav className="flex flex-col gap-2">

          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold ${
                location.pathname === item.path
                  ? "bg-purple-600/20 border border-purple-500/30 text-white"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}

        </nav>

      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-[#0d0d0f] p-8 overflow-y-auto">
        <Outlet />
      </main>

    </div>
  );
};

export default InstructorLayout;