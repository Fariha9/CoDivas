import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash, FaUserGraduate } from "react-icons/fa";
import { ShieldCheck } from "lucide-react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("https://codivas.onrender.com/api/admin/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setUsers(data.users || []);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`https://codivas.onrender.com/api/admin/user/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setUsers((prev) => prev.filter((u) => u._id !== id));
      toast.success("User deleted");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleUpgrade = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`https://codivas.onrender.com/api/admin/upgrade/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, role: "instructor" } : u))
      );
      toast.success("Upgraded to Instructor");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const getRoleBadge = (role) => {
    const styles = {
      admin: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      instructor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      student: "bg-white/5 text-gray-400 border-white/10",
    };
    return styles[role] || styles.student;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0d0f] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d0f] p-8 relative overflow-hidden">

      {/* Glow blob */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-purple-700/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="mb-8 relative z-10">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-purple-400 bg-purple-400/10 border border-purple-400/20 rounded-full px-4 py-1 mb-4">
          ✦ Admin Panel
        </span>
        <h1 className="text-3xl font-black text-white uppercase tracking-tight">
          Users <span className="text-purple-400">Management</span>
        </h1>
        <p className="text-gray-500 mt-1">
          Manage, upgrade, or remove platform users.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 relative z-10">
        <div className="bg-[#18181c] border border-white/10 rounded-2xl p-4">
          <p className="text-gray-500 text-xs uppercase tracking-widest">Total Users</p>
          <p className="text-3xl font-black text-white mt-1">{users.length}</p>
        </div>
        <div className="bg-[#18181c] border border-white/10 rounded-2xl p-4">
          <p className="text-gray-500 text-xs uppercase tracking-widest">Instructors</p>
          <p className="text-3xl font-black text-blue-400 mt-1">
            {users.filter((u) => u.role === "instructor").length}
          </p>
        </div>
        <div className="bg-[#18181c] border border-white/10 rounded-2xl p-4">
          <p className="text-gray-500 text-xs uppercase tracking-widest">Students</p>
          <p className="text-3xl font-black text-purple-400 mt-1">
            {users.filter((u) => u.role === "student").length}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#18181c] border border-white/10 rounded-2xl overflow-hidden relative z-10">

        {/* Table header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h3 className="text-white font-bold text-lg flex items-center gap-2">
            <ShieldCheck className="text-purple-400 w-5 h-5" /> All Users
          </h3>
          <span className="text-xs text-gray-500 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
            {users.length} total
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-gray-500 text-xs uppercase tracking-widest">
                <th className="text-left px-6 py-3">#</th>
                <th className="text-left px-6 py-3">Name</th>
                <th className="text-left px-6 py-3">Email</th>
                <th className="text-left px-6 py-3">Role</th>
                <th className="text-left px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-gray-600 py-12">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((u, index) => (
                  <tr
                    key={u._id}
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-6 py-4 text-gray-600 text-xs">{index + 1}</td>
                    <td className="px-6 py-4 text-white font-medium">{u.name}</td>
                    <td className="px-6 py-4 text-gray-400">{u.email}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full border capitalize ${getRoleBadge(u.role)}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {/* Upgrade to Instructor */}
                        {u.role === "student" && (
                          <button
                            onClick={() => handleUpgrade(u._id)}
                            title="Upgrade to Instructor"
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 text-xs font-semibold transition-all"
                          >
                            <FaUserGraduate size={11} /> Upgrade
                          </button>
                        )}
                        {/* Delete */}
                        <button
                          onClick={() => {
                            if (window.confirm("Delete this user?")) {
                              handleDelete(u._id);
                            }
                          }}
                          title="Delete user"
                          className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-gray-400 border border-white/10 hover:border-red-500/20 transition-all"
                        >
                          <FaTrash size={12} />
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
    </div>
  );
};

export default Users;