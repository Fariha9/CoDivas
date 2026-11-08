import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBook, FaChartLine, FaCog, FaThLarge, FaMoneyBill } from "react-icons/fa";
import { Code2 } from "lucide-react";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [purchasedCount, setPurchasedCount] = useState(0); // Added state for DB tracking
  const [loading, setLoading] = useState(true);

  const currentUserEmail = user?.email || "";

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          window.location.href = "/";
          return;
        }

        // 1. Fetch user profile
        const response = await fetch("https://codivas.onrender.com/api/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setUser(data.user);

        localStorage.setItem("user_name", data.user.name);
        localStorage.setItem("user_email", data.user.email);

        // 2. Fetch permanently enrolled courses from MongoDB
        const coursesResponse = await fetch("https://codivas.onrender.com/api/enrollments/my-courses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (coursesResponse.ok) {
          const coursesData = await coursesResponse.json();
          setPurchasedCount(coursesData.length); // Sets the exact database length
        }

      } catch (error) {
        console.error(error.message);
        localStorage.removeItem("token");
        window.location.href = "/";
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const streak = Number(
    localStorage.getItem(`streak_${currentUserEmail}`) || 0
  );

  const quizzesTaken = (() => {
    if (!currentUserEmail) return 0;
    let qCount = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.includes("quiz") && key.includes(currentUserEmail)) {
        if (localStorage.getItem(key) === "completed") qCount++;
      }
    }
    return qCount;
  })();

  const progressPercentage =
    purchasedCount > 0 ? Math.min(purchasedCount * 25, 100) : 0;

  if (loading) {
    return (
      <div className="text-white flex items-center justify-center h-screen bg-[#0d0d0f]">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#0d0d0f]">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-[#111114] flex flex-col p-6 border-r border-white/10">
       

        <nav className="flex flex-col gap-2">
          <Link to="/dashboard" className="flex items-center gap-3 text-white font-bold bg-purple-600/20 p-3 rounded-xl">
            <FaThLarge className="text-purple-400" /> Dashboard
          </Link>
          <Link to="/dashboard/courses" className="flex items-center gap-3 text-gray-400 hover:text-white p-3 rounded-xl">
            <FaBook /> My Courses
          </Link>
          <Link to="/progress" className="flex items-center gap-3 text-gray-400 hover:text-white p-3 rounded-xl">
            <FaChartLine /> Progress
          </Link>
          <Link 
to="/payment-history" 
className="flex items-center gap-3 text-gray-400 hover:text-white p-3 rounded-xl">
<FaMoneyBill /> Payment History
</Link>
          
          <Link to="/settings" className="flex items-center gap-3 text-gray-400 hover:text-white p-3 rounded-xl">
            <FaCog /> Settings
          </Link>
        </nav>
      </aside>

      {/* Main Stats Layout */}
      <main className="flex-1 p-8 text-left">
        <header className="mb-10">
          <h2 className="text-3xl font-black text-white">
            Welcome Back, <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-indigo-400">{user?.name || "User"}</span>
          </h2>
          <p className="text-gray-500 mt-1">Your learning dashboard is active</p>
          {user?.email && <p className="text-sm text-gray-400 mt-2">{user.email}</p>}
        </header>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-[#18181c] p-6 rounded-2xl border-b-4 border-purple-500">
            <h3 className="text-gray-500 text-xs uppercase">Purchased Courses</h3>
            <p className="text-4xl font-bold text-purple-400 mt-2">{purchasedCount}</p>
          </div>
          <div className="bg-[#18181c] p-6 rounded-2xl border-b-4 border-green-500">
            <h3 className="text-gray-500 text-xs uppercase">Quizzes Taken</h3>
            <p className="text-4xl font-bold text-green-400 mt-2">{quizzesTaken}</p>
          </div>
          <div className="bg-[#18181c] p-6 rounded-2xl border-b-4 border-orange-500">
            <h3 className="text-gray-500 text-xs uppercase">Current Streak</h3>
            <p className="text-4xl font-bold text-orange-400 mt-2">{streak} Days</p>
          </div>
        </div>

        {/* Learning Mastery Component Block */}
        {/* <div className="bg-[#18181c] p-8 rounded-2xl max-w-2xl border border-white/5">
          <h3 className="text-lg font-bold text-white mb-6">Learning Mastery</h3>
          <div className="w-full bg-white/5 h-3 rounded-full overflow-hidden border border-white/10">
            <div
              className="bg-purple-600 h-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-gray-500 text-xs mt-3 text-right">
            Progress: {progressPercentage}%
          </p>
        </div> */}
      </main>
    </div>
  );
};

export default Dashboard;