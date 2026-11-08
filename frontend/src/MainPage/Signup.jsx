import React, { useState } from "react";
import toast from "react-hot-toast";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const API = "http://localhost:5001";

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      return alert("Password must be at least 6 characters");
    }

    setLoading(true);

    try {
      const response = await fetch(`${API}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullName,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      toast.success("Account created successfully!");

    
      const loginModal = document.getElementById("login");
      if (loginModal) {
        loginModal.showModal();
      }

      // optional: clear form
      setFullName("");
      setEmail("");
      setPassword("");

    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#0d0d0f]">

      {/* Left */}
      <div className="flex flex-col justify-center py-10 px-8 lg:px-16 bg-[#0d0d0f] relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-700/20 rounded-full blur-[100px] pointer-events-none" />

        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-purple-400 bg-purple-400/10 border border-purple-400/20 rounded-full px-4 py-1 mb-6 w-fit">
          Learn. Build. Grow.
        </span>

        <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
          Start Your Journey
          <span className="block text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-purple-600">
            with CoDivas
          </span>
        </h1>

        <p className="text-gray-500 text-lg max-w-md mb-10">
          Learn computer science with interactive courses and quizzes.
        </p>
      </div>

      {/* Right */}
      <div className="flex flex-col justify-center px-8 lg:px-20 bg-[#111114] relative overflow-hidden">

        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-700/15 rounded-full blur-[100px] pointer-events-none" />

        <h2 className="text-3xl font-bold text-white mb-2 relative z-10">
          Create an <span className="text-purple-400">Account</span>
        </h2>

        <p className="text-gray-500 mb-8 relative z-10">
          Join thousands of learners today
        </p>

        <form
          onSubmit={handleSignup}
          className="space-y-4 max-w-md relative z-10"
          autoComplete="off"
        >
          <input
            type="text"
            placeholder="Full Name"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="input w-full bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:border-purple-500 focus:outline-none"
          />

          <input
            type="email"
            placeholder="Email Address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input w-full bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:border-purple-500 focus:outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input w-full bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:border-purple-500 focus:outline-none"
          />

          <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
            <input
              type="checkbox"
              className="checkbox checkbox-sm checkbox-primary"
              required
            />
            I agree to the Terms & Conditions
          </label>

          <button
            type="submit"
            disabled={loading}
            className="btn w-full bg-purple-600 text-white hover:bg-purple-500 border-none shadow-lg shadow-purple-900/40 transition-all disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-gray-500 mt-6 text-left relative z-10">
          Already have an account?
          <button
            className="text-purple-400 font-semibold ml-1 hover:underline"
            onClick={() => {
              const loginModal = document.getElementById("login");
              if (loginModal) loginModal.showModal();
            }}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;