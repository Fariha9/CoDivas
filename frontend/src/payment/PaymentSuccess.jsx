import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight, BookOpen } from "lucide-react";

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen bg-[#0d0d0f] flex items-center justify-center px-4 relative overflow-hidden">

      {/* Glow blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-700/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-green-700/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md bg-[#18181c] border border-white/10 rounded-2xl p-10 text-center relative z-10">

        {/* Icon */}
        <div className="w-16 h-16 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-green-400" />
        </div>

        {/* Header */}
        <h1 className="text-2xl font-bold text-white mb-2">
          Payment <span className="text-purple-400">Successful</span>
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          Your payment has been completed successfully. You can now access your enrolled courses.
        </p>

        {/* Actions */}
        <div className="space-y-3">
          <Link
            to="/dashboard"
            className="btn w-full bg-purple-600 text-white hover:bg-purple-500 border-none shadow-lg shadow-purple-900/40 transition-all"
          >
            <BookOpen className="w-4 h-4" /> Go to My Courses
          </Link>

          <Link
            to="/"
            className="btn w-full bg-transparent border border-white/10 text-gray-400 hover:bg-white/5 hover:text-white transition-all"
          >
            Back to Home <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default PaymentSuccess;