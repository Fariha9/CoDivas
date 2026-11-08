import React, { useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { FaFilePdf, FaVideo } from "react-icons/fa";

const UploadMaterial = () => {
  const [activeTab, setActiveTab] = useState("pdf"); // Toggle between 'pdf' and 'video'
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { courseId } = useParams();

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!title || !file) {
      toast.error("Please provide a title and select a file.");
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("courseId", courseId);

    let endpoint = "";

    if (activeTab === "pdf") {
      formData.append("file", file);
      endpoint = "http://localhost:5001/api/materials/upload";
    } else {
      // Must match videoUpload.single("video") in your lectureRoutes.js
      formData.append("video", file);
      endpoint = "http://localhost:5001/api/lectures/upload";
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Uploaded successfully!");
        setTitle("");
        setFile(null);
        e.target.reset(); // Clear form inputs
      } else {
        throw new Error(data.message || "Upload failed");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0d0d0f] min-h-screen p-8 text-white">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-black mb-2">Upload Course Content</h1>
        <p className="text-gray-400 mb-6 text-sm">Add downloadable resources or quick video walkthroughs directly into your students' feed.</p>

        {/* Tab Selection Bar */}
        <div className="flex gap-4 mb-6 border-b border-white/10 pb-3">
          <button
            onClick={() => { setActiveTab("pdf"); setTitle(""); setFile(null); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all text-sm ${
              activeTab === "pdf" ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white bg-white/5"
            }`}
          >
            <FaFilePdf />Documents
          </button>
          <button
            onClick={() => { setActiveTab("video"); setTitle(""); setFile(null); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all text-sm ${
              activeTab === "video" ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white bg-white/5"
            }`}
          >
            <FaVideo />Video Lectures
          </button>
        </div>

        {/* Form Element */}
        <form onSubmit={handleUpload} className="space-y-5 bg-[#18181c] p-8 rounded-2xl border border-white/10">
          <h3 className="text-lg font-bold text-purple-400 capitalize">
            Add New {activeTab === "pdf" ? "Document Resource" : "Video Snippet"}
          </h3>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-400">Title</label>
            <input
              type="text"
              placeholder={activeTab === "pdf" ? "Enter document title" : "Enter lecture title"}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-3 bg-black rounded-xl border border-white/10 text-white focus:outline-none focus:border-purple-500 w-full"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-400">Choose File Asset</label>
            <input
              type="file"
              accept={activeTab === "pdf" ? ".pdf" : "video/*"}
              onChange={(e) => setFile(e.target.files[0])}
              className="p-3 bg-black/50 rounded-xl border border-dashed border-white/20 w-full text-sm text-gray-400 file:mr-4 file:py-1 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-purple-500/10 file:text-purple-400 hover:file:bg-purple-500/20 cursor-pointer"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-500 transition-colors py-3 rounded-xl font-bold text-white shadow-lg disabled:opacity-50"
          >
            {loading ? "Processing Upload..." : `Confirm & Upload ${activeTab.toUpperCase()}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadMaterial;