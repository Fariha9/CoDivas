import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBook, FaChartLine, FaCog, FaThLarge, FaPlay } from "react-icons/fa";
import { Code2, GraduationCap } from "lucide-react";

const MyCourses = () => {
  const [userName, setUserName] = useState("");
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Define how many lessons each course has to calculate the percentage accurately
  const courseLessonCounts = {
    "Introduction To Programming (C/C++)": 5,
    "Artificial Intelligence": 5,
    "Data Structures & Algorithms": 5,
    "Web Development": 5,
    "Javascript": 5,
    "Machine Learning": 5
  };

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const name = localStorage.getItem("user_name") || "User";
        setUserName(name);

        if (!token) {
          window.location.href = "/";
          return;
        }

        const response = await fetch("https://codivas.onrender.com/api/enrollments/my-courses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          // Map database data into your required client structure
          const formattedCourses = data.map((course) => {
            let lessonLink = "/Courses/MLLesson";
            if (course.name && course.name.includes("Programming")) {
              lessonLink = "/Courses/ProgLesson";
            } else if (course.name === "Artificial Intelligence") {
              lessonLink = "/Courses/AILesson";
            }
            else if (course.name === "Data Structures & Algorithms") {
              lessonLink = "/Courses/DSLesson";
            }
            else if (course.name === "Web Development") {
              lessonLink = "/Courses/WebLesson";
            }
            else if (course.name === "Javascript") {
              lessonLink = "/Courses/JSLesson";
            }

            return {
              id: course._id, // Keep the DB ID to fetch progress later
              name: course.name,
              link: lessonLink
            };
          });

          // Fetch progress for each individual course
          const coursesWithProgress = await Promise.all(
            formattedCourses.map(async (course) => {
              try {
                const progRes = await fetch(`https://codivas.onrender.com/api/progress/${course.id}`, {
                  headers: { Authorization: `Bearer ${token}` }
                });
                
                if (progRes.ok) {
                  const progData = await progRes.json();
                  // Count how many lessons have 'isCompleted' set to true
                  const completedCount = progData.filter((p) => p.isCompleted).length;
                  const totalLessons = courseLessonCounts[course.name] || 5; 
                  
                  // Calculate percentage (capped at 100)
                  const percentage = Math.min(Math.round((completedCount / totalLessons) * 100), 100);
                  return { ...course, progressPercentage: percentage };
                }
                return { ...course, progressPercentage: 0 };
              } catch (err) {
                console.error(`Failed to load progress for ${course.name}`, err);
                return { ...course, progressPercentage: 0 };
              }
            })
          );

          setPurchasedCourses(coursesWithProgress);
        } else {
          console.error("Failed to load user courses:", data.error);
        }
      } catch (error) {
        console.error("Connection error while loading courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyCourses();
  }, []);

  if (loading) {
    return (
      <div className="text-white flex items-center justify-center h-screen bg-[#09090b]">
        Loading your courses...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#09090b] text-gray-100 font-sans">
      {/* Sidebar Layout */}
      <aside className="w-64 bg-[#111114] flex flex-col p-6 border-r border-white/10">
        <Link to="/" className="flex items-center gap-1 mb-10">
          <Code2 className="w-5 h-5 text-purple-400" />
          <span className="text-2xl font-extrabold text-white">Co</span>
          <span className="text-2xl font-extrabold text-purple-400">Divas</span>
        </Link>

        <nav className="flex flex-col gap-2">
          <Link to="/dashboard" className="flex items-center gap-3 text-gray-400 hover:text-white p-3 rounded-xl">
            <FaThLarge /> Dashboard
          </Link>
          <Link to="/dashboard/courses" className="flex items-center gap-3 text-white font-bold bg-purple-600/20 p-3 rounded-xl">
            <FaBook className="text-purple-400" /> My Courses
          </Link>
          <Link to="/progress" className="flex items-center gap-3 text-gray-400 hover:text-white p-3 rounded-xl">
            <FaChartLine /> Progress
          </Link>
          <Link to="/settings" className="flex items-center gap-3 text-gray-400 hover:text-white p-3 rounded-xl">
            <FaCog /> Settings
          </Link>
        </nav>
      </aside>

      {/* Main Panel */}
      <main className="flex-1 p-8 overflow-y-auto max-w-7xl mx-auto w-full text-left">
        <header className="mb-10 relative border-b border-white/5">
          <h2 className="text-3xl font-black text-white">
            Welcome Back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">{userName || "User"}</span>
          </h2>
          <p className="text-zinc-500 mt-1.5 text-sm">
            Track and resume your ongoing premium learning journeys.
          </p>
        </header>

        {purchasedCourses.length === 0 ? (
          <div className="bg-[#121214] p-16 rounded-2xl border border-white/5 text-center max-w-2xl mx-auto shadow-xl">
            <GraduationCap className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <p className="text-xl font-semibold text-zinc-300 mb-1">No active courses found</p>
            <p className="text-sm text-zinc-500 max-w-sm mx-auto">
              Once you purchase a course, it will appear here permanently.
            </p>
          </div>
        ) : (
          /* Card Container Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {purchasedCourses.map((course, idx) => (
              <div 
                key={idx} 
                className="group relative bg-[#121215] rounded-2xl border border-white/5 p-6 flex flex-col justify-between gap-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-500/30 hover:shadow-[0_12px_30px_rgba(147,51,234,0.08)] overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold tracking-wider text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full uppercase">
                      Enrolled
                    </span>
                    <GraduationCap className="w-5 h-5 text-zinc-600 group-hover:text-purple-400 transition-colors duration-300" />
                  </div>
                  
                  <h4 className="text-xl font-bold text-white tracking-tight leading-snug mt-5 group-hover:text-purple-300 transition-colors duration-200">
                    {course.name}
                  </h4>
                </div>

                <div className="w-full">
                  {/* PROGRESS BAR ADDED HERE */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-zinc-400 mb-1.5 font-semibold tracking-wide">
                      <span>Course Progress</span>
                      <span className={course.progressPercentage === 100 ? "text-green-400" : "text-purple-400"}>
                        {course.progressPercentage}%
                      </span>
                    </div>
                    <div className="w-full bg-black/50 rounded-full h-2 overflow-hidden border border-white/5">
                      <div
                        className={`h-2 rounded-full transition-all duration-700 ease-out ${course.progressPercentage === 100 ? "bg-green-500" : "bg-gradient-to-r from-purple-600 to-indigo-500"}`}
                        style={{ width: `${course.progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>

                  <Link 
                    to={course.link} 
                    className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-semibold text-sm bg-zinc-800 hover:bg-purple-600 text-zinc-200 hover:text-white border border-white/5 hover:border-purple-500/30 transition-all duration-300 shadow-sm hover:shadow-[0_4px_12px_rgba(147,51,234,0.2)]"
                  >
                    <FaPlay className="text-[10px] transform group-hover:translate-x-0.5 transition-transform duration-200" /> 
                    {course.progressPercentage === 100 ? "Review Lessons" : "Resume Lesson"}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyCourses;