import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaUsers } from "react-icons/fa";

const InstructorStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("https://codivas.onrender.com/api/instructor/students", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setStudents(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0d0f] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Loading students...</p>
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
          ✦ Instructor Panel
        </span>
        <h1 className="text-3xl font-black text-white uppercase tracking-tight">
          My <span className="text-purple-400">Students</span>
        </h1>
        <p className="text-gray-500 mt-1">
          Students enrolled in your courses
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 relative z-10">
        <div className="bg-[#18181c] border border-white/10 rounded-2xl p-4">
          <p className="text-gray-500 text-xs uppercase tracking-widest">Total Students</p>
          <p className="text-3xl font-black text-white mt-1">{students.length}</p>
        </div>
        <div className="bg-[#18181c] border border-white/10 rounded-2xl p-4">
          <p className="text-gray-500 text-xs uppercase tracking-widest">Active</p>
          <p className="text-3xl font-black text-green-400 mt-1">{students.length}</p>
        </div>
        <div className="bg-[#18181c] border border-white/10 rounded-2xl p-4">
          <p className="text-gray-500 text-xs uppercase tracking-widest">Courses</p>
          <p className="text-3xl font-black text-purple-400 mt-1">
            {new Set(students.map(s => s.courseId?._id)).size}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#18181c] border border-white/10 rounded-2xl overflow-hidden relative z-10">

        <div className="flex justify-between items-center px-6 py-5 border-b border-white/10">
          <h2 className="text-white font-bold text-lg flex items-center gap-2">
            <FaUsers className="text-purple-400" /> Enrolled Students
          </h2>
          <span className="text-xs text-gray-500 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
            {students.length} total
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 uppercase text-xs border-b border-white/10 tracking-widest">
                <th className="text-left px-6 py-4">#</th>
                <th className="text-left px-6 py-4">Student Name</th>
                <th className="text-left px-6 py-4">Email</th>
                <th className="text-left px-6 py-4">Course</th>
                <th className="text-left px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-gray-600 py-16">
                    <FaUsers className="mx-auto text-gray-700 text-3xl mb-3" />
                    <p>No students enrolled yet.</p>
                  </td>
                </tr>
              ) : (
                students.map((student, index) => (
                  <tr
                    key={student._id}
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-6 py-4 text-gray-600 text-xs">{index + 1}</td>
                    <td className="px-6 py-4 text-white font-medium">
                      {student.userId?.name}
                    </td>
                    <td className="px-6 py-4 text-gray-400">
                      {student.userId?.email}
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {student.courseId?.name}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-xs bg-green-500/10 text-green-400 border border-green-500/20 font-semibold">
                        Active
                      </span>
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

export default InstructorStudents;