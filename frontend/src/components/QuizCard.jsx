import React from "react";
import { ArrowRight } from "lucide-react";

export default function QuizCard({ quiz }) {
  return (
    <div className="group relative bg-[#141417] border border-white/[0.06] hover:border-purple-500/40 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col justify-between">
      
      {/* ইমেজ সেকশন এবং ওভারলে গ্রাডিয়েন্ট */}
      <div className="h-36 w-full overflow-hidden relative">
        <img
          src={quiz.image || "https://images.unsplash.com/photo-1618401471353-b98aedd07871?q=80&w=600&auto=format&fit=crop"} // ব্যাকআপ ডামি ইমেজ যদি ডাটাতে না থাকে
          alt={quiz.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
        />
        {/* ইমেজের নিচে হালকা ডার্ক শ্যাডো গ্রাডিয়েন্ট যাতে নিচের টেক্সটের সাথে ব্লেন্ড হয় */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141417] via-transparent to-transparent" />
      </div>

      {/* কন্টেন্ট বডি */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div className="space-y-1.5">
          {/* কার্ড টাইটেল - সাইজ text-xl থেকে কমিয়ে text-base (স্ট্যান্ডার্ড) করা হয়েছে */}
          <h2 className="text-base font-bold text-white tracking-wide group-hover:text-purple-400 transition-colors">
            {quiz.title}
          </h2>
          {/* ডেসক্রিপশন - text-xs এবং টেক্সট কালার অপাসিটি ব্যালেন্স করা হয়েছে */}
          <p className="text-xs text-gray-400 font-medium leading-relaxed line-clamp-2">
            {quiz.description || "Master this course core concepts by practicing verified modules."}
          </p>
        </div>

        {/* অ্যাকশন বাটন সেকশন */}
        <div className="flex items-center justify-end mt-4">
          <button
            onClick={() => quiz.onStart(quiz.id)}
            className="w-full sm:w-auto bg-white/(0.03) hover:bg-purple-600 border border-white/10 hover:border-purple-500 text-purple-300 hover:text-white px-4 py-2 text-xs font-bold rounded-xl shadow-md transition-all duration-300 flex items-center justify-center gap-2 group/btn"
          >
            Start Quiz 
            <ArrowRight size={14} className="transform group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}