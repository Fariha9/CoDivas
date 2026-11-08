import React, { useState } from "react";
import { useNavigate } from "react-router";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const navigate = useNavigate();

  const handlePublish = (e) => {
    e.preventDefault();
    const newBlog = { title, desc, date: new Date().toLocaleDateString() };
    const existing = JSON.parse(localStorage.getItem("codivas_blogs")) || [];
    localStorage.setItem("codivas_blogs", JSON.stringify([newBlog, ...existing]));
    navigate("/blogs");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handlePublish} className="bg-white p-10 rounded-[40px] shadow-sm max-w-lg w-full">
        <h2 className="text-2xl font-black text-purple-700 mb-6 uppercase">New Post</h2>
        <input type="text" placeholder="Title" className="w-full p-4 bg-gray-50 rounded-2xl mb-4" onChange={(e)=>setTitle(e.target.value)} required />
        <textarea placeholder="Write here..." className="w-full p-4 bg-gray-50 rounded-2xl mb-4 h-32" onChange={(e)=>setDesc(e.target.value)} required />
        <button className="w-full bg-purple-600 text-white font-black py-4 rounded-2xl uppercase">Publish</button>
      </form>
    </div>
  );
};
export default AddBlog;