import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  FaBook, FaChartLine, FaCog, FaThLarge,
  FaUsers, FaClipboardList, FaStar
} from "react-icons/fa";
import { Code2, GraduationCap } from "lucide-react";

const InstructorDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [instructor, setInstructor] = useState(null);
  const [myCourses, setMyCourses] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          window.location.href = "/";
          return;
        }

        const response = await fetch("https://codivas.onrender.com/api/instructor/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.message);

        setInstructor(data.instructor || {});
        setMyCourses(data.courses || []);
        setTotalStudents(data.totalStudents || 0);
        setTotalRevenue(data.totalRevenue || 0);
    

      } catch (error) {
        console.error(error.message);
        localStorage.removeItem("token");
        window.location.href = "/";
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="text-white flex items-center justify-center h-screen bg-[#0d0d0f]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Loading instructor panel...</p>
        </div>
      </div>
    );
  }

  return (
      <div className="relative overflow-hidden">

      {/* Sidebar */}
      

      {/* Main */}
      

        {/* Glow blob */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-purple-700/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Header */}
        <header className="mb-10 relative z-10">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-purple-400 bg-purple-400/10 border border-purple-400/20 rounded-full px-4 py-1 mb-4">
            Instructor Control Panel
          </span>
          <h2 className="text-3xl font-black text-white uppercase tracking-tight">
            Welcome, <span className="text-purple-400">{instructor?.name || "Instructor"}!</span>
          </h2>
          <p className="text-gray-500 mt-1">
            Manage your courses, students, and quizzes from here.
          </p>
          {instructor?.email && (
            <p className="text-sm text-gray-600 mt-1">{instructor.email}</p>
          )}
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 relative z-10">
          <div className="bg-[#18181c] border border-white/10 p-6 rounded-2xl border-b-4 border-b-purple-500 hover:border-purple-500/40 transition-all">
            <h3 className="text-gray-500 font-bold text-xs uppercase tracking-widest">My Courses</h3>
            <p className="text-4xl font-black text-purple-400 mt-2">{myCourses.length}</p>
          </div>
          <div className="bg-[#18181c] border border-white/10 p-6 rounded-2xl border-b-4 border-b-blue-500 hover:border-blue-500/40 transition-all">
            <h3 className="text-gray-500 font-bold text-xs uppercase tracking-widest">Total Students</h3>
            <p className="text-4xl font-black text-blue-400 mt-2">{totalStudents}</p>
          </div>
          
          <div className="bg-[#18181c] border border-white/10 p-6 rounded-2xl border-b-4 border-b-orange-500 hover:border-orange-500/40 transition-all">
            <h3 className="text-gray-500 font-bold text-xs uppercase tracking-widest">Total Revenue</h3>
            <p className="text-4xl font-black text-orange-400 mt-2">${totalRevenue}</p>
          </div>
        </div>

        {/* My Courses Table */}
        <div className="bg-[#18181c] border border-white/10 rounded-2xl overflow-hidden relative z-10 mb-10">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <h3 className="text-white font-bold text-lg flex items-center gap-2">
              <FaBook className="text-purple-400" /> My Courses
            </h3>
            <button className="btn btn-sm bg-purple-600 hover:bg-purple-500 text-white border-none rounded-lg text-xs">
              + Add Course
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-gray-500 text-xs uppercase tracking-widest">
                  <th className="text-left px-6 py-3">Course</th>
                  <th className="text-left px-6 py-3">Students</th>
                  <th className="text-left px-6 py-3">Rating</th>
                  <th className="text-left px-6 py-3">Revenue</th>
                  <th className="text-left px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {myCourses.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center text-gray-600 py-10">
                      No courses yet. Click "+ Add Course" to get started.
                    </td>
                  </tr>
                ) : (
                  myCourses.map((course, index) => (
                    <tr key={index} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4 text-white font-medium">{course.name}</td>
                      <td className="px-6 py-4 text-gray-400">{course.students || 0}</td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-1 text-yellow-400">
                          <FaStar size={12} />
                         {course.rating || 0}  ({course.reviews} reviews)
                        </span>
                      </td>
                      <td className="px-6 py-4 text-green-400">${course.revenue || 0}</td>
                      <td className="px-6 py-4">
  <span className="text-xs font-semibold px-3 py-1 rounded-full border bg-green-500/10 text-green-400 border-green-500/20">
    Published
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

export default InstructorDashboard;
