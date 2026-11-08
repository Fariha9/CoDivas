import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LiveClassForm = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    topic: "",
    date: "",
    time: "",
    meetLink: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      
      // 1. Combine Date and Time into a proper Date object
      // 2. Map your form fields to match the backend expectation
      const formattedData = {
        courseId: courseId,
        title: formData.topic,
        liveLink: formData.meetLink,
        scheduledAt: new Date(`${formData.date}T${formData.time}:00`),
      };

      const res = await fetch("https://codivas.onrender.com/api/live-classes/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formattedData)
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to schedule class");

      toast.success("Live class scheduled successfully!");
      navigate("/instructor"); 

    } catch (error) {
      toast.error(error.message || "Failed to schedule live class.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0f] p-5 flex justify-center items-start">
      <div className="w-full max-w-2xl bg-[#18181c] rounded-2xl border border-white/10 p-8 mt-10">
        
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Schedule a Live Class</h2>
          <p className="text-gray-400 text-sm">Provide the details for your upcoming interactive session.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Topic */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-300 text-sm font-semibold">Class Topic / Title</label>
            <input
              type="text"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              placeholder="Enter topic name"
              required
              className="p-3 bg-black/50 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Date */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-300 text-sm font-semibold">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="p-3 bg-black/50 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            {/* Time */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-300 text-sm font-semibold">Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="p-3 bg-black/50 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
              />
            </div>
          </div>

          {/* Link */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-300 text-sm font-semibold">Meeting Link (Zoom, Meet etc.)</label>
            <input
              type="url"
              name="meetLink"
              value={formData.meetLink}
              onChange={handleChange}
              placeholder="Enter the link"
              required
              className="p-3 bg-black/50 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-4 bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-6 rounded-xl transition-colors disabled:opacity-50"
          >
            {loading ? "Scheduling..." : "Schedule Live Class"}
          </button>
        </form>

      </div>
    </div>
  );
};

export default LiveClassForm;