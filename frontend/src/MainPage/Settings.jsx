import React, { useEffect, useState } from "react";
import { FaUser, FaBell, FaSignOutAlt, FaTrash, FaShieldAlt, FaHistory, FaCheckCircle, FaBookOpen } from "react-icons/fa";
import toast from "react-hot-toast";

const Settings = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  
  
  const [emailNotifications, setEmailNotifications] = useState(
    JSON.parse(localStorage.getItem("emailNotifications")) || false
  );
  const [courseReminders, setCourseReminders] = useState(
    JSON.parse(localStorage.getItem("courseReminders")) || false
  );
  const [isPrivate, setIsPrivate] = useState(
    JSON.parse(localStorage.getItem("isPrivate")) || false
  );

  useEffect(() => {
    setUserName(localStorage.getItem("user_name") || "User");
    setEmail(localStorage.getItem("user_email") || "user@example.com");
  }, []);

 
  const handleToggle = (key, value, setter) => {
    setter(value);
    localStorage.setItem(key, JSON.stringify(value));
    toast.success("Settings updated!");
  };

  const handleUpdateProfile = () => {
    localStorage.setItem("user_name", userName);
    toast.success("Profile updated successfully!");
  };

  // Logout Function
  const handleLogout = () => {
  localStorage.clear();

  toast.loading("Logging out...");

  setTimeout(() => {
    toast.dismiss();
    window.location.replace("/");
  }, 1000);
};

  // Delete Account Function
  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure? This action cannot be undone.")) {
      localStorage.clear();
      toast.error("Account deleted successfully!");
      setTimeout(() => {
        window.location.href = "/register";
      }, 1000);
    }
  };

  return (
    <div className="p-8 min-h-screen bg-[#0d0d0f] text-white">
      <h2 className="text-3xl font-black mb-8 uppercase tracking-tight text-purple-400">Settings</h2>

      <div className="max-w-4xl space-y-8">
        
        {/* 1. Profile Section */}
        <div className="p-8 rounded-3xl bg-[#18181c] border border-white/10">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <FaUser className="text-purple-400" /> Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
                <label className="text-xs text-gray-500 font-bold uppercase">Full Name</label>
                <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} className="w-full mt-2 p-3 rounded-xl bg-[#111114] border border-white/10" />
             </div>
             <div>
                <label className="text-xs text-gray-500 font-bold uppercase">Email Address</label>
                <div className="w-full mt-2 p-3 rounded-xl bg-[#111114] border border-white/10 flex justify-between items-center text-gray-400">
                    {email} <FaCheckCircle className="text-green-500" />
                </div>
             </div>
          </div>
          <button onClick={handleUpdateProfile} className="mt-6 bg-purple-600 px-8 py-3 rounded-xl text-sm font-bold hover:bg-purple-500 transition">Save Changes</button>
        </div>

        {/* 2. Notifications & Reminders */}
        <div className="p-8 rounded-3xl bg-[#18181c] border border-white/10 space-y-6">
            <h3 className="font-bold flex items-center gap-2 mb-4"><FaBell className="text-purple-400"/> Notifications & Reminders</h3>
            
            

            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <FaBookOpen className="text-gray-500" />
                    <div>
                        <p className="text-sm font-medium">Course Reminders</p>
                        <p className="text-xs text-gray-500">Get alerts for upcoming live classes</p>
                    </div>
                </div>
                <input type="checkbox" checked={courseReminders} onChange={(e) => handleToggle("courseReminders", e.target.checked, setCourseReminders)} className="toggle" />
            </div>
        </div>

        {/* 3. Privacy & Security */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-[#18181c] border border-white/10">
                <h3 className="font-bold mb-4 flex items-center gap-2"><FaShieldAlt className="text-purple-400"/> Privacy</h3>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Private Profile</span>
                    <input type="checkbox" checked={isPrivate} onChange={(e) => handleToggle("isPrivate", e.target.checked, setIsPrivate)} className="toggle" />
                </div>
            </div>

            <div className="p-8 rounded-3xl bg-[#18181c] border border-white/10">
                <h3 className="font-bold mb-4 flex items-center gap-2"><FaHistory className="text-purple-400"/> Login Activity</h3>
                <div className="text-xs text-gray-500">
                    <p>Last login: Today 10:24 AM</p>
                    <p className="text-green-500">Device: Chrome - Windows</p>
                </div>
            </div>
        </div>

        {/* 4. Danger Zone */}
        <div className="p-8 rounded-3xl bg-[#18181c] border border-red-500/20">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-red-500">
            <FaTrash /> Danger Zone
          </h3>
          <div className="flex flex-wrap gap-4">
            <button onClick={handleLogout} className="flex items-center gap-2 bg-gray-700 px-6 py-3 rounded-xl text-sm font-bold hover:bg-gray-600 transition"><FaSignOutAlt /> Logout</button>
            <button onClick={handleDeleteAccount} className="flex items-center gap-2 bg-red-600/20 text-red-500 px-6 py-3 rounded-xl text-sm font-bold hover:bg-red-600/30 transition"><FaTrash /> Delete Account</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;