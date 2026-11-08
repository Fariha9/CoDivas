import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaUsers, FaBook, FaChartLine, FaCog, FaThLarge,
  FaClipboardList, FaTrash, FaEdit
} from "react-icons/fa";
import { Code2, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalQuizzes, setTotalQuizzes] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const handleUpgradeInstructor = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:5001/api/admin/upgrade/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    // Update UI instantly
    setUsers(
      users.map((user) =>
        user._id === id
          ? { ...user, role: "instructor" }
          : user
      )
    );

    toast.success("User upgraded to Instructor");

  } catch (error) {
     toast.error(error.message);
  }
};
  const handleDeleteUser = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:5001/api/admin/user/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    setUsers(users.filter(user => user._id !== id));

  } catch (error) {
    alert(error.message);
  }
};

  useEffect(() => {
    const fetchAdminData = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/";
      return;
    }

    const response = await fetch("http://localhost:5001/api/admin/stats", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();

    console.log("ADMIN API RESPONSE:", data);

    
    if (!response.ok) {
      console.warn("Admin API failed:", data.message);
      setUsers([]);
      setTotalCourses(0);
      setTotalQuizzes(0);
      setTotalRevenue(0);
      return;
    }

    setUsers(data.users || []);
    setTotalCourses(data.totalCourses || 0);
    setTotalQuizzes(data.totalQuizzes || 0);
    setTotalRevenue(data.totalRevenue || 0);

  } catch (error) {
    console.error("Network error:", error.message);

    
    setUsers([]);
    setTotalCourses(0);
    setTotalQuizzes(0);
    setTotalRevenue(0);

  } finally {
    setLoading(false);
  }
};



    fetchAdminData();
  }, []);

  if (loading) {
    return (
      <div className="text-white flex items-center justify-center h-screen bg-[#0d0d0f]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#0d0d0f]">

      

      {/* Main */}
      <main className="flex-1 p-8 relative overflow-hidden">

        {/* Glow blob */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-purple-700/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Header */}
        <header className="mb-10 relative z-10">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-purple-400 bg-purple-400/10 border border-purple-400/20 rounded-full px-4 py-1 mb-4">
            ✦ Admin Control Panel
          </span>
          <h2 className="text-3xl font-black text-white uppercase tracking-tight">
            Platform <span className="text-purple-400">Overview</span>
          </h2>
          <p className="text-gray-500 mt-1">Monitor users, courses, and platform activity.</p>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 relative z-10">
          <div className="bg-[#18181c] border border-white/10 p-6 rounded-2xl border-b-4 border-b-purple-500 hover:border-purple-500/40 transition-all">
            <h3 className="text-gray-500 font-bold text-xs uppercase tracking-widest">Total Users</h3>
            <p className="text-4xl font-black text-purple-400 mt-2">{users.length}</p>
          </div>
          <div className="bg-[#18181c] border border-white/10 p-6 rounded-2xl border-b-4 border-b-blue-500 hover:border-blue-500/40 transition-all">
            <h3 className="text-gray-500 font-bold text-xs uppercase tracking-widest">Total Courses</h3>
            <p className="text-4xl font-black text-blue-400 mt-2">{totalCourses}</p>
          </div>
          <div className="bg-[#18181c] border border-white/10 p-6 rounded-2xl border-b-4 border-b-green-500 hover:border-green-500/40 transition-all">
            <h3 className="text-gray-500 font-bold text-xs uppercase tracking-widest">Total Quizzes</h3>
            <p className="text-4xl font-black text-green-400 mt-2">{totalQuizzes}</p>
          </div>
          <div className="bg-[#18181c] border border-white/10 p-6 rounded-2xl border-b-4 border-b-orange-500 hover:border-orange-500/40 transition-all">
            <h3 className="text-gray-500 font-bold text-xs uppercase tracking-widest">Total Revenue</h3>
            <p className="text-4xl font-black text-orange-400 mt-2">${totalRevenue}</p>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-[#18181c] border border-white/10 rounded-2xl overflow-hidden relative z-10 mb-10">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <h3 className="text-white font-bold text-lg flex items-center gap-2">
              <FaUsers className="text-purple-400" /> Registered Users
            </h3>
            <span className="text-xs text-gray-500 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
              {users.length} total
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-gray-500 text-xs uppercase tracking-widest">
                  <th className="text-left px-6 py-3">Name</th>
                  <th className="text-left px-6 py-3">Email</th>
                  <th className="text-left px-6 py-3">Role</th>
                  <th className="text-left px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center text-gray-600 py-10">
                      No users found
                    </td>
                  </tr>
                ) : (
                  users.map((u, index) => (
                    <tr key={index} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4 text-white font-medium">{u.name}</td>
                      <td className="px-6 py-4 text-gray-400">{u.email}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                          u.role === "admin"
                            ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                            : "bg-white/5 text-gray-400 border-white/10"
                        }`}>
                          {u.role || "user"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {u.role === "student" && (
                            <button className="px-2 py-1 text-xs rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                            onClick={() => handleUpgradeInstructor(u._id)}>
                            Make Instructor
                             </button>
                             )}
                          <button className="p-2 rounded-lg bg-white/5 hover:bg-purple-500/20 hover:text-purple-400 text-gray-400 transition-all">
                            <FaEdit size={13} />
                          </button>
                         <button
  className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-gray-400 transition-all"
  onClick={() => {
  if (window.confirm(`Delete ${u.name}?`)) {
    handleDeleteUser(u._id);
  }
}}
>
  <FaTrash size={13} />
</button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

       
        

      </main>
    </div>
  );
};

export default AdminDashboard;