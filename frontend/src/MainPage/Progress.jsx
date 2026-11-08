import React, { useEffect, useState } from "react";
import { FaChartLine, FaTrophy, FaHistory, FaFire, FaCheckCircle } from "react-icons/fa";
import { GraduationCap, Trophy, Flame } from "lucide-react";

const Progress = () => {
  const [stats, setStats] = useState({ streak: 0, completedQuizzes: [] });

  useEffect(() => {
    const email = localStorage.getItem("user_email");
    if (!email) return;

    let quizList = [];
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if (key && key.startsWith("quiz_")) {
        try {
          const data = JSON.parse(localStorage.getItem(key));
          if (data && data.status === "completed") {
            quizList.push(data.score || 0);
          }
        } catch (e) {}
      }
    }
    const savedStreak = localStorage.getItem(`streak_${email}`) || 0;
    setStats({ streak: Number(savedStreak), completedQuizzes: quizList });
  }, []);

  const totalCompleted = stats.completedQuizzes.length;
  const avgScore = totalCompleted > 0
    ? Math.round(stats.completedQuizzes.reduce((a, b) => a + b, 0) / totalCompleted)
    : 0;

  return (
    <div className="p-8 bg-[#0f0f12] min-h-screen text-white">
      <h2 className="text-3xl font-black text-purple-400 mb-8 uppercase tracking-tight">Learning Progress</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Skill Mastery */}
        <div className="bg-[#18181c] p-8 rounded-[32px] border border-white/5 shadow-xl">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-purple-300">
            <FaChartLine /> Skill Mastery
          </h3>
          <div className="space-y-8">
            <div>
              <div className="flex justify-between mb-2">
                <p className="font-bold text-gray-400 text-xs uppercase">Average Score</p>
                <p className="font-black text-purple-400">{avgScore}%</p>
              </div>
              <div className="w-full bg-[#0d0d0f] h-3 rounded-full overflow-hidden">
                <div className="bg-purple-600 h-full transition-all duration-1000" style={{ width: `${avgScore}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <p className="font-bold text-gray-400 text-xs uppercase">Quizzes Completed</p>
                <p className="font-black text-purple-400">{totalCompleted}</p>
              </div>
              <div className="w-full bg-[#0d0d0f] h-3 rounded-full overflow-hidden">
                <div className="bg-purple-600 h-full transition-all duration-1000" style={{ width: `${Math.min(totalCompleted * 10, 100)}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-[#18181c] p-8 rounded-[32px] border border-white/5 shadow-xl">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-yellow-500">
            <FaTrophy /> Achievements
          </h3>
          <div className="flex gap-4">

            {/* Starter */}
            <div className={`p-5 rounded-3xl border flex flex-col items-center ${
              totalCompleted >= 1
                ? "bg-purple-900/20 border-purple-500/30"
                : "bg-[#0d0d0f] border-transparent opacity-30"
            }`}>
              <div className="w-10 h-10 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-purple-400" />
              </div>
              <p className="text-[9px] font-black mt-2 text-center text-gray-300 uppercase">Starter</p>
            </div>

            {/* Expert */}
            <div className={`p-5 rounded-3xl border flex flex-col items-center ${
              avgScore >= 80
                ? "bg-yellow-900/20 border-yellow-500/30"
                : "bg-[#0d0d0f] border-transparent opacity-30"
            }`}>
              <div className="w-10 h-10 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex items-center justify-center">
                <Trophy className="w-5 h-5 text-yellow-400" />
              </div>
              <p className="text-[9px] font-black mt-2 text-center text-gray-300 uppercase">Expert</p>
            </div>

            {/* 3-Day Streak */}
            <div className={`p-5 rounded-3xl border flex flex-col items-center ${
              stats.streak >= 3
                ? "bg-orange-900/20 border-orange-500/30"
                : "bg-[#0d0d0f] border-transparent opacity-30"
            }`}>
              <div className="w-10 h-10 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-center justify-center">
                <Flame className="w-5 h-5 text-orange-400" />
              </div>
              <p className="text-[9px] font-black mt-2 text-center text-gray-300 uppercase">3-Day Streak</p>
            </div>

          </div>
        </div>

        {/* Activity Summary */}
        <div className="bg-[#18181c] p-8 rounded-[32px] border border-white/5 shadow-xl md:col-span-2">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-blue-400">
            <FaHistory /> Activity Summary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-4 p-5 bg-[#0d0d0f] rounded-2xl border border-white/5">
              <div className="bg-orange-500/10 p-3 rounded-xl">
                <FaFire className="text-orange-500" />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-500 uppercase">Current Streak</p>
                <p className="text-lg font-bold text-white">{stats.streak} Days</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-5 bg-[#0d0d0f] rounded-2xl border border-white/5">
              <div className="bg-green-500/10 p-3 rounded-xl">
                <FaCheckCircle className="text-green-500" />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-500 uppercase">Total Quizzes</p>
                <p className="text-lg font-bold text-white">{totalCompleted} Completed</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Progress;