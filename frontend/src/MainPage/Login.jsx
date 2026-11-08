import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  const handleLogin = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const response = await fetch(`${API}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    if (!data.token) {
      throw new Error("No token received from server");
    }

   // SAVE TOKEN
localStorage.setItem("token", data.token);

const user = data.user || {};

localStorage.setItem("user_name", user.name || "");
localStorage.setItem("user_email", user.email || "");
localStorage.setItem("role", user.role || "student");

const role = (user.role || "student").trim().toLowerCase();

document.getElementById("login")?.close();

// Small delay to ensure modal closes before redirect
console.log("FINAL ROLE FROM LOCALSTORAGE:", role);
if (role === "admin") {
  navigate("/admin");
}
else if (role === "instructor") {
  navigate("/instructor");
}
else {
  navigate("/dashboard");
}

  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <dialog id="login" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box max-w-md rounded-2xl p-8 bg-[#18181c] border border-white/10 text-white">

        {/* Close */}
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-gray-400 hover:bg-white/20 hover:text-white">
            ✕
          </button>
        </form>

        {/* Header */}
        <h2 className="text-2xl font-bold text-white mb-2">
          Welcome <span className="text-purple-400">Back</span>
        </h2>
        <p className="text-gray-500 mb-6">
          Login to continue learning
        </p>

        {/* Error */}
        {error && (
          <p className="text-red-400 text-sm mb-4 bg-red-500/10 p-3 rounded-lg border border-red-500/20">
            {error}
          </p>
        )}

        {/* Form */}
        <form className="space-y-4" onSubmit={handleLogin} autoComplete="off">

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

          <div className="flex justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
              <input type="checkbox" className="checkbox checkbox-sm checkbox-primary" />
              Remember me
            </label>

            <span
              className="text-purple-400 cursor-pointer hover:underline"
              onClick={() => {
                document.getElementById("login").close();
                document.getElementById("forgetPass").showModal();
              }}
            >
              Forgot password?
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn w-full bg-purple-600 text-white hover:bg-purple-500 border-none shadow-lg shadow-purple-900/40 transition-all disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* Footer */}
        <p className="text-center text-gray-500 mt-6 text-sm">
          New here?
          <button
            className="text-purple-400 font-semibold ml-1 hover:underline"
            onClick={() => {
              document.getElementById('login').close();
              window.location.href = "/signup";
            }}
          >
            Create an account
          </button>
        </p>

      </div>

      {/* Backdrop */}
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default Login;