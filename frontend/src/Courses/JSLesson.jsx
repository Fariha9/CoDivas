import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsArrowReturnRight } from "react-icons/bs";
import YouTube from 'react-youtube';
import { HashLink } from 'react-router-hash-link';
import { FiBook } from "react-icons/fi";
import { FaDownload, FaFilePdf, FaVideo, FaCalendarAlt, FaLink, FaClipboardCheck } from "react-icons/fa";

const JSLesson = () => {
  const [activeLessonIndex, setActiveLessonIndex] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [liveClasses, setLiveClasses] = useState([]); 
  const [userProgress, setUserProgress] = useState({}); 
  const [activeTab, setActiveTab] = useState('lessons'); 

  const courseId = "6a3566fd46e43d524df13df5";

  const lessonsData = [
    { title: "1. Variables & Data Types", id: "ajdRvxDWH4w" },
    { title: "2. Operators and Conditional Statements", id: "Zg4-uSjxosE" },
    { title: "3. Loops and Strings", id: "UmRtFFSDSFo" },
    { title: "4. Arrays", id: "gFWhbjzowrM" },
    { title: "5. Functions & Methods", id: "P0XMXqDGttU" },
  ];

  // 1. Helper to fetch progress from database
  const fetchProgress = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await fetch(`https://codivas.onrender.com/api/progress/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        const progMap = {};
        data.forEach((p) => (progMap[p.lessonId] = p.currentTime));
        setUserProgress(progMap);
      }
    } catch (err) {
      console.error("Failed to fetch progress", err);
    }
  };

  // 2. Helper to save progress to database
  const saveProgress = async (lessonId, time, isCompleted = false) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      await fetch(`https://codivas.onrender.com/api/progress/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          courseId, 
          lessonId, 
          currentTime: Math.floor(time),
          isCompleted 
        }),
      });
    } catch (err) {
      console.error("Failed to save progress", err);
    }
  };

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const resMat = await fetch(`https://codivas.onrender.com/api/materials/${courseId}`);
        if (resMat.ok) setMaterials(await resMat.json());

        const resLect = await fetch(`https://codivas.onrender.com/api/lectures/${courseId}`);
        if (resLect.ok) setLectures(await resLect.json());
        
        // Fetch live classes
        const resLive = await fetch(`https://codivas.onrender.com/api/live-classes/${courseId}`);
        if (resLive.ok) setLiveClasses(await resLive.json());
        
        fetchProgress();
      } catch (error) {
        console.error("Error loading structural assets:", error);
      }
    };
    fetchContent();
  }, []);

  return (
    <div className="flex bg-[#0d0d0f] min-h-screen w-full relative items-start">
      
      {activeTab === 'lessons' && (
        <aside className="sticky top-20 w-[280px] h-[calc(100vh-5rem)] bg-[#111114] flex flex-col p-6 border-r border-white/10 shrink-0">
          <div className="flex items-center gap-1 mb-10">
            <span className="text-2xl font-extrabold text-purple-400">All Lessons List</span>
          </div>
          <nav className="flex flex-col gap-2 overflow-y-auto pr-1">
            {lessonsData.map((lesson, index) => (
              <HashLink
                key={index}
                smooth 
                to={`#lesson-${index}`} 
                onClick={() => {
                  setActiveTab('lessons');
                  setActiveLessonIndex(index);
                }} 
                className={`flex items-center gap-3 p-3 rounded-xl font-bold transition-colors w-full text-left ${
                  activeLessonIndex === index ? 'text-white bg-purple-600/20' : 'text-gray-400 hover:text-white hover:bg-white/5' 
                }`}
              >
                <FiBook />
                <span>Lesson {index + 1}</span>
              </HashLink>
            ))}
          </nav>
        </aside>
      )}

      <main className="flex-1 text-white p-6 space-y-6">
        
        {/* --- Tab Navigation Buttons --- */}
        <div className="max-w-5xl mx-auto flex flex-wrap gap-4 border-b border-white/10 pb-4">
          <button
            onClick={() => setActiveTab('lessons')}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'lessons'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            Lessons
          </button>
          <button
            onClick={() => setActiveTab('materials')}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'materials'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            Materials & Recorded Sessions
          </button>
          <button
            onClick={() => setActiveTab('liveClasses')}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'liveClasses'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            Live Class
          </button>
        </div>

        {/* --- CONDITIONAL RENDER: Live Classes Tab --- */}
        {activeTab === 'liveClasses' && (
          <div className="max-w-5xl mx-auto bg-[#18181c] border border-white/10 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Upcoming Live Class</h2>
            {liveClasses.length === 0 ? (
              <p className="text-gray-400 italic">No live classes scheduled yet.</p>
            ) : (
              <div className="grid gap-4">
                {liveClasses.map((live) => (
                  <div key={live._id} className="bg-black/30 p-5 rounded-xl border border-white/10 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-purple-300">{live.title}</h3>
                      <p className="text-sm text-gray-400 flex items-center gap-2 mt-1">
                        <FaCalendarAlt /> {new Date(live.scheduledAt).toLocaleString()}
                      </p>
                    </div>
                    <a
                      href={live.liveLink}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-purple-600 hover:bg-purple-500 text-white px-5 py-2 rounded-lg flex items-center gap-2 font-bold transition-colors"
                    >
                      <FaLink /> Join Class
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* --- CONDITIONAL RENDER: Materials & Lectures Tab --- */}
        {activeTab === 'materials' && (
          <div className="space-y-6">
             <div className="max-w-5xl mx-auto bg-[#18181c] border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Downloadable Materials</h2>
              {materials.length === 0 ? (
                <p className="text-gray-400 text-sm italic">No PDF materials uploaded yet.</p>
              ) : (
                <div className="space-y-3">
                  {materials.map((material) => (
                    <div key={material._id} className="flex items-center justify-between bg-black/30 p-4 rounded-xl border border-white/10">
                      <div className="flex items-center gap-3">
                        <FaFilePdf className="text-red-400 shrink-0" />
                        <span className="text-white text-sm font-medium">{material.title}</span>
                      </div>
                      <a
                        href={`https://codivas.onrender.com/uploads/materials/${material.file}`}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-xs font-bold transition-colors"
                      >
                        <FaDownload /> Download
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="max-w-5xl mx-auto bg-[#18181c] border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <FaVideo className="text-purple-400 text-xl" />Class Lectures
              </h2>
              {lectures.length === 0 ? (
                <p className="text-gray-400 text-sm italic">Instructor hasn't uploaded any video lectures yet.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {lectures.map((lecture) => (
                    <div key={lecture._id} className="bg-black/40 border border-white/5 rounded-xl p-4 flex flex-col gap-3">
                      <span className="text-sm font-bold text-gray-200 line-clamp-1">{lecture.title}</span>
                      <div className="w-full aspect-video rounded-lg overflow-hidden bg-black">
                        <video
                          className="w-full h-full object-contain"
                          controls
                          preload="metadata"
                          controlsList="nodownload"
                        >
                          <source 
                            src={`https://codivas.onrender.com/uploads/lectures/${lecture.videoFile}`} 
                            type="video/mp4" 
                          />
                          Browser streaming unsupported.
                        </video>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- CONDITIONAL RENDER: Lessons Tab --- */}
        {activeTab === 'lessons' && (
          <>
          <div className="max-w-5xl mx-auto bg-[#18181c] border border-white/10 rounded-2xl p-6">
            {lessonsData.map((lesson, index) => (
              <details 
                key={index} 
                id={`lesson-${index}`} 
                className="mb-4 scroll-mt-24" 
                open={activeLessonIndex === index} 
                onToggle={(e) => {
                  if (e.currentTarget.open) {
                    setActiveLessonIndex(index);
                  } else if (activeLessonIndex === index) {
                    setActiveLessonIndex(null);
                  }
                }}
              >
                <summary className="card w-full bg-purple-200 hover:bg-purple-300 cursor-pointer list-none">
                    <div className="card-body">
                      <h3 className="text-lg text-black sm:text-xl lg:text-2xl font-bold">
                        {lesson.title}
                      </h3>
                    </div>
                </summary>
                <div className="card">
                  <div className="card-body">
                    <div className="aspect-video w-full rounded-xl overflow-hidden">
                      {activeLessonIndex === index && (
                        <YouTube 
                          videoId={lesson.id} 
                          opts={{
                            playerVars: {
                              autoplay: 0,
                              start: Math.floor(userProgress[lesson.id] || 0),
                            }
                          }}
                          className="w-full h-full" 
                          iframeClassName="w-full h-full"
                          onStateChange={(event) => {
                            if (event.data === 2) { 
                              const currentTime = event.target.getCurrentTime();
                              saveProgress(lesson.id, currentTime, false);
                            } else if (event.data === 0) { 
                              const currentTime = event.target.getCurrentTime();
                              saveProgress(lesson.id, currentTime, true); 
                            }
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </details>
            ))}
          </div>
          <div className="max-w-5xl mx-auto mt-12 mb-8 flex justify-center">
          <Link
            to="/assessments" // Adjust this URL to match your actual assessment route
            className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 bg-linear-to-r from-purple-600 to-indigo-600 text-white font-extrabold text-lg rounded-xl overflow-hidden shadow-lg shadow-purple-500/30 transition-all hover:scale-105 hover:shadow-purple-500/50 hover:from-purple-500 hover:to-indigo-500"
          >
            <FaClipboardCheck className="text-2xl group-hover:rotate-12 transition-transform duration-300" />
            <span>Test Yourself: Take Quiz and Submit Assignment</span>
          </Link>
        </div>
          </>
        )}
      </main>
    </div>
  );
};

export default JSLesson;