import React from "react";
import { Link } from "react-router-dom";
import { XCircle, RotateCcw, ArrowRight } from "lucide-react";

const PaymentFailed = () => {
  return (
    <div className="min-h-screen bg-[#0d0d0f] flex items-center justify-center px-4 relative overflow-hidden">

      {/* Glow blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-700/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-red-700/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md bg-[#18181c] border border-white/10 rounded-2xl p-10 text-center relative z-10">

        {/* Icon */}
        <div className="w-16 h-16 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-8 h-8 text-red-400" />
        </div>

        {/* Header */}
        <h1 className="text-2xl font-bold text-white mb-2">
          Payment <span className="text-red-400">Failed</span>
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          Your payment could not be completed. Please check your details and try again.
        </p>

        {/* Actions */}
        <div className="space-y-3">
          <Link
            to="/checkout"
            className="btn w-full bg-purple-600 text-white hover:bg-purple-500 border-none shadow-lg shadow-purple-900/40 transition-all"
          >
            <RotateCcw className="w-4 h-4" /> Try Again
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

export default PaymentFailed;