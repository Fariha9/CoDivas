import React, { useState } from "react";
import Quizzes from "./Quizzes"; 
import Assignments from "./Assignments"; 
import generateCertificate from "./CertificateGenerator";

const Assessments = () => {
  const [activeTab, setActiveTab] = useState("quizzes");
  const currentUserEmail = localStorage.getItem("user_email");
  const userName = localStorage.getItem("user_name") || "Student";

  const courses = [
    { id: 1, title: "Introduction To Programming" },
    { id: 2, title: "Data Structures & Algorithms" },
    { id: 3, title: "Web Development" },
    { id: 4, title: "JavaScript" },
    { id: 5, title: "Artificial Intelligence" },
    { id: 6, title: "Machine Learning" }
  ];

  const isCourseCompleted = (courseId) => {
    let completedCount = 0;
    const totalLessons = 3; 
    for(let i = 0; i < totalLessons; i++) {
      if(localStorage.getItem(`quiz_${courseId}_lesson_${i}_${currentUserEmail}`) === "completed") {
        completedCount++;
      }
    }
    return completedCount === totalLessons;
  };

  const downloadCourseCertificate = (courseTitle) => {
    const certData = {
      certificateID: Math.floor(Math.random() * 1000000),
      issueDate: new Date(),
      completionRate: 100,
      grade: "A+",
      status: "Verified"
    };
    generateCertificate(userName, courseTitle, certData);
  };

  return (
    <div className="min-h-screen bg-[#0d0d0f] text-white py-12 px-4 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-purple-700/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-purple-400 bg-purple-400/10 border border-purple-400/20 rounded-full px-4 py-1.5 mb-4">
            CoDivas Evaluation Hub
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-3">
            🎓 Evaluation Dashboard
          </h1>
        </div>

        <div className="flex justify-center mb-12">
          <div className="bg-[#141417] p-1.5 rounded-2xl border border-white/[0.06] flex gap-2 shadow-xl">
            <button
              onClick={() => setActiveTab("quizzes")}
              className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === "quizzes" ? "bg-purple-600 text-white shadow-lg" : "text-gray-400"}`}
            >
              Practice Quizzes
            </button>
            <button
              onClick={() => setActiveTab("assignments")}
              className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === "assignments" ? "bg-purple-600 text-white shadow-lg" : "text-gray-400"}`}
            >
              Coding Assignments
            </button>
          </div>
        </div>

        <div className="transition-all duration-300">
          {activeTab === "quizzes" ? (
            <div className="border border-white/5 p-4 rounded-xl">
              <Quizzes />
              
              <div className="mt-8 flex flex-col items-center gap-4 animate-fadeIn">
                {courses.map((course) => (
                  isCourseCompleted(course.id) && (
                    <button 
                      key={course.id}
                      onClick={() => downloadCourseCertificate(course.title)}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-purple-900/20 transition-all"
                    >
                      Download {course.title} Certificate 
                    </button>
                  )
                ))}
              </div>
            </div>
          ) : (
            <div className="border border-white/5 p-4 rounded-xl">
              <Assignments />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assessments;