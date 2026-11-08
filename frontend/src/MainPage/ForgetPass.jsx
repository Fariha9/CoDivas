import { useState } from "react";
import toast from "react-hot-toast";

const ForgetPass = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    const toastId = toast.loading("Sending reset email...");

    setTimeout(() => {
      toast.success("Password reset link sent 📩", { id: toastId });
      setSent(true);
    }, 1500);

    setTimeout(() => {
      document.getElementById("forgetPass").close();
      setSent(false);
      setEmail("");
    }, 2000);
  };

  return (
    <dialog id="forgetPass" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box max-w-md rounded-2xl p-8 bg-[#18181c] border border-white/10 text-white">

        {/* Close */}
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-gray-400 hover:bg-white/20 hover:text-white">
            ✕
          </button>
        </form>



        {/* Header */}
        <h2 className="text-2xl font-bold text-white mb-2">
          Reset <span className="text-purple-400">Password</span>
        </h2>
        <p className="text-gray-500 mb-6 text-sm">
          Enter your email to receive reset instructions
        </p>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {!sent ? (
            <>
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input w-full bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:border-purple-500 focus:outline-none"
              />
              <button
                type="submit"
                className="btn w-full bg-purple-600 text-white hover:bg-purple-500 border-none shadow-lg shadow-purple-900/40 transition-all"
              >
                Send Reset Link
              </button>
            </>
          ) : (
            <div className="text-center">
              <p className="text-green-400 font-semibold mb-4">
                Reset link sent successfully!
              </p>
              <button
                type="button"
                className="btn bg-purple-600 text-white hover:bg-purple-500 border-none w-full shadow-lg shadow-purple-900/40"
                onClick={() => {
                  document.getElementById("forgetPass").close();
                  setSent(false);
                }}
              >
                Close
              </button>
            </div>
          )}
        </form>

        <p className="text-center text-gray-500 mt-6 text-sm">
          Remember your password?
          <button
            className="text-purple-400 font-semibold ml-1 cursor-pointer hover:underline"
            onClick={() => {
              document.getElementById("forgetPass").close();
              document.getElementById("login").showModal();
            }}
          >
            Login
          </button>
        </p>

      </div>

      {/* Click outside to close */}
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default ForgetPass;