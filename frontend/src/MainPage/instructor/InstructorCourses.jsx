import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaTrash, FaPlus, FaBook, FaUpload, FaVideo } from "react-icons/fa";

const InstructorCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const fetchMyCourses = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5001/api/instructor/courses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setCourses(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:5001/api/instructor/courses/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setCourses(courses.filter((course) => course._id !== id));
      toast.success("Course deleted");
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0d0f] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d0f] p-8 relative overflow-hidden">

      {/* Glow blob */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-purple-700/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="flex justify-between items-start mb-8 relative z-10">
        <div>
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-purple-400 bg-purple-400/10 border border-purple-400/20 rounded-full px-4 py-1 mb-4">
            ✦ Instructor Panel
          </span>
          <h1 className="text-3xl font-black text-white uppercase tracking-tight">
            My <span className="text-purple-400">Courses</span>
          </h1>
          <p className="text-gray-500 mt-1">
            Manage and update your created courses
          </p>
        </div>

        <Link
          to="/instructor/courses/new"
          className="btn bg-purple-600 hover:bg-purple-500 text-white border-none rounded-xl font-bold shadow-lg shadow-purple-900/40 transition-all flex items-center gap-2"
        >
          <FaPlus size={12} /> Add Course
        </Link>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 relative z-10">
        <div className="bg-[#18181c] border border-white/10 rounded-2xl p-4">
          <p className="text-gray-500 text-xs uppercase tracking-widest">Total Courses</p>
          <p className="text-3xl font-black text-white mt-1">{courses.length}</p>
        </div>
        <div className="bg-[#18181c] border border-white/10 rounded-2xl p-4">
          <p className="text-gray-500 text-xs uppercase tracking-widest">Published</p>
          <p className="text-3xl font-black text-green-400 mt-1">
            {courses.filter(c => c.status !== "published").length}
          </p>
        </div>
        <div className="bg-[#18181c] border border-white/10 rounded-2xl p-4">
          <p className="text-gray-500 text-xs uppercase tracking-widest">Drafts</p>
          <p className="text-3xl font-black text-yellow-400 mt-1">
            {courses.filter(c => c.status === "published").length}
          </p>
        </div>
      </div>

      {/* Empty State */}
      {courses.length === 0 ? (
        <div className="bg-[#18181c] border border-white/10 p-16 rounded-2xl text-center relative z-10">
          <FaBook className="mx-auto text-gray-700 text-4xl mb-4" />
          <p className="text-gray-500 mb-1">No courses created yet.</p>
          <p className="text-gray-600 text-sm mb-6">Start building your first course now.</p>
          <Link
            to="/instructor/courses/new"
            className="btn bg-purple-600 hover:bg-purple-500 text-white border-none rounded-xl font-bold inline-flex items-center gap-2"
          >
            <FaPlus size={12} /> Create Course
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-[#18181c] border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/30 hover:shadow-xl hover:shadow-purple-900/10 transition-all duration-300 group"
            >
              {/* Image */}
              <div className="relative overflow-hidden h-44">
                <img
                  src={course.pic || "https://via.placeholder.com/400x250/18181c/9333ea?text=No+Image"}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                  alt={course.name}
                />
                <span className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full border ${
                  course.status === "published"
                    ? "bg-green-500/10 text-green-400 border-green-500/20"
                    : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                }`}>
                  {course.status || "draft"}
                </span>
              </div>

              {/* Body */}
              <div className="p-5">
                <h2 className="text-white text-lg font-bold line-clamp-1">
                  {course.name}
                </h2>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                  {course.page}
                </p>

                {/* Actions */}
                <div className="mt-5 flex gap-2">
                  <Link
                    to={`/instructor/courses/${course._id}/materials`}
                    className="flex-1 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/20 py-2 rounded-lg flex justify-center items-center gap-1.5 text-xs font-bold transition-all"
                  >
                    <FaUpload size={11} /> Upload
                  </Link>

                  <Link
                    to={`/instructor/courses/${course._id}/live-class`}
                    className="flex-1 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 py-2 rounded-lg flex justify-center items-center gap-1.5 text-xs font-bold transition-all"
                  >
                    <FaVideo size={11} /> Live
                  </Link>

                  <button
                    onClick={() => {
                      if (window.confirm("Delete this course? This cannot be undone.")) {
                        handleDelete(course._id);
                      }
                    }}
                    className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 py-2 rounded-lg flex justify-center items-center gap-1.5 text-xs font-bold transition-all"
                  >
                    <FaTrash size={11} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InstructorCourses;