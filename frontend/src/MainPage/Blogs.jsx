import React, { useEffect, useState } from "react";

const Blogs = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [blogs, setBlogs] = useState([
    {
      title: "How to Start Your Coding Journey",
      desc: "Learning to code can be intimidating. Consistency is key. Start with HTML/CSS, then move to JavaScript. Build projects to solidify your knowledge.",
      date: "15 Jan 2026",
      image: "https://i.ibb.co.com/XxL0v11g/channels4-profile.jpg"
    },
    {
      title: "The Logic Behind Problem Solving",
      desc: "Programming is more than syntax; it's about thinking. Explore how breaking down complex problems into smaller tasks can make any algorithm easy to grasp.",
      date: "14 Jan 2026",
      image: "https://i.ibb.co.com/YF5D3txN/1-KVkdr-CUoq-Zr5-LR-fm-WRF-Q.jpg"
    },
    {
      title: "Breaking Into the World of Open Source",
      desc: "Want to gain real-world experience? Open source is the way. Learn how contributing to GitHub projects can skyrocket your career and web dev skills.",
      date: "12 Jan 2026",
      image: "https://i.ibb.co.com/JjcHT1XN/world-sticker-padding.webp"
    },
    {
      title: "Debugging: The Developer's Superpower",
      desc: "Spending hours on a single comma? Don't worry. Master the art of using Chrome DevTools and console logs to find and fix bugs faster than ever.",
      date: "10 Jan 2026",
      image: "https://i.ibb.co.com/4wkC39LS/Advanced-debugging-postman-blog.webp"
    },
    {
      title: "From Code to Creation: The Designer's Eye",
      desc: "Why do some apps feel better than others? It's the UX. Understand how spacing, contrast, and user flow can turn a basic project into a professional product.",
      date: "08 Jan 2026",
      image: "https://i.ibb.co.com/jqSDr13/Screenshot-2026-01-15-131657.png"
    },
    {
      title: "Is AI Your Competitor or Your Teammate?",
      desc: "The rise of generative AI is changing how we write code. Learn to use AI tools as a pair programmer to double your productivity without losing your logic.",
      date: "05 Jan 2026",
      image: "https://i.ibb.co.com/2rSV3zF/683aecf8978fcd7ee4dc05a5-about.webp"
    }
  ]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("codivas_blogs")) || [];
    if (saved.length > 0) {
      setBlogs((prev) => [...saved, ...prev]);
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0d0d0f] text-white py-12 px-6 overflow-hidden">
      {/* Quiz পেজের মতো নিয়ন ব্যাকগ্রাউন্ড গ্লো ইফেক্টস */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-purple-700/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-[-10%] w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* প্রফেশনাল হেডার সেকশন */}
        <header className="text-left mb-14 border-b border-white/5 pb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">📝</span>
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter">
              CoDivas Chronicles
            </h2>
          </div>
          <p className="text-gray-400 text-sm font-medium">
            Practical insights and tech stories for your growth.
          </p>
        </header>

        {/* ব্লগ গ্রিড লেআউট */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, i) => (
            <div
              key={i}
              className="bg-[#111114] rounded-[32px] overflow-hidden border border-white/[0.06] hover:border-purple-500/30 transition-all duration-300 p-3 flex flex-col justify-between group hover:shadow-2xl hover:shadow-purple-950/20"
            >
              <div>
                {/* ইমেজ কন্টেইনার */}
                <div className="h-48 rounded-[24px] overflow-hidden mb-5 relative">
                  <img
                    src={blog.image || "https://via.placeholder.com/500"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt=""
                  />
                  <div className="absolute top-4 left-4 bg-[#0d0d0f]/80 backdrop-blur-md px-3 py-1 rounded-md border border-white/10 text-[9px] font-black text-purple-400 uppercase tracking-widest">
                    Article
                  </div>
                </div>

                {/* টেক্সট কন্টেন্ট */}
                <div className="px-4 pb-2">
                  <h3 className="text-lg font-bold text-gray-100 mb-3 leading-tight group-hover:text-purple-400 transition-colors duration-300">
                    {blog.title}
                  </h3>
                  <p className="text-gray-400 text-xs mb-4 line-clamp-2 leading-relaxed">
                    {blog.desc}
                  </p>
                </div>
              </div>

              {/* অ্যাকশন বাটন */}
              <div className="px-4 pb-4">
                <button
                  onClick={() => setSelectedBlog(blog)}
                  className="w-full bg-white/(0.02) border border-white/10 text-purple-300 font-bold px-5 py-3 rounded-xl text-[10px] uppercase tracking-widest hover:border-purple-500/40 hover:bg-purple-500/5 active:scale-98 transition-all duration-300 cursor-pointer text-center"
                >
                  Read Story →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- প্রিমিয়াম ডার্ক মডাল (Pop-up Box) --- */}
      {selectedBlog && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-6 animate-in fade-in duration-200"
          onClick={() => setSelectedBlog(null)}
        >
          <div
            className="bg-[#111114] border border-white/[0.08] w-full max-w-lg rounded-[32px] overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* মডাল ইমেজ */}
            <div className="h-56 overflow-hidden relative">
              <img
                src={selectedBlog.image}
                className="w-full h-full object-cover"
                alt=""
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111114] to-transparent opacity-60"></div>
              
              {/* মিনিমালিস্ট ক্লোজ বাটন */}
              <button
                onClick={() => setSelectedBlog(null)}
                className="absolute top-4 right-4 bg-[#0d0d0f]/60 backdrop-blur-md text-gray-400 w-8 h-8 rounded-full font-bold border border-white/10 hover:text-white hover:bg-purple-600 hover:border-purple-500 transition-all flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>

            {/* মডাল বডি কন্টেন্ট */}
            <div className="p-8 text-left relative">
              {/* লেফট অ্যাকসেন্ট লাইন যেমনটা কুইজ মার্কিংয়ে আছে */}
              <div className="absolute left-0 top-6 bottom-6 w-[3px] bg-purple-500" />

              <span className="text-[10px] font-black text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-md uppercase tracking-wider">
                {selectedBlog.date}
              </span>

              <h2 className="text-xl font-black text-white mt-4 mb-4 leading-snug tracking-tight">
                {selectedBlog.title}
              </h2>

              <p className="text-gray-300 leading-relaxed text-sm font-normal max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {selectedBlog.desc}
              </p>

              <button
                onClick={() => setSelectedBlog(null)}
                className="mt-8 w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-purple-900/30 active:scale-98 transition-all text-xs uppercase tracking-widest"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blogs;