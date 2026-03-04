"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { authAPI } from "@/api/auth";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authAPI.login(email, password);
      
      if (response.success) {
        // Check if user is admin
        if (response.data.user.role === "admin") {
          router.push("/panel/admin-dashboard");
        } else {
          router.push("/panel/your-dashboard");
        }
      }
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md mt-20">
        {/* Logo/Title */}
     

        {/* Sign In Form */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-950/50 border border-red-800 rounded-lg p-4">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-500" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@aioftheworld.com"
                  required
                  className="w-full bg-gray-950 border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-600 transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaLock className="text-gray-500" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full bg-gray-950 border border-gray-700 rounded-lg pl-12 pr-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-600 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 bg-gray-950 border-gray-700 rounded focus:ring-cyan-600 focus:ring-2"
                />
                <span className="ml-2 text-sm text-gray-400">Remember me</span>
              </label>
              <a
                href="/forgot-password"
                className="text-sm text-cyan-500 hover:text-cyan-400 transition-colors"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 disabled:from-gray-700 disabled:to-gray-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-cyan-500 hover:text-cyan-400 font-semibold transition-colors"
              >
                Sign up
              </a>
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="mt-6 bg-gray-950 border border-gray-800 rounded-lg p-4">
            <p className="text-xs text-gray-500 mb-2 font-semibold uppercase tracking-wider">
              Demo Credentials
            </p>
            <div className="space-y-1 text-xs text-gray-400">
              <p>
                <span className="text-gray-500">Admin:</span>{" "}
                admin@aioftheworld.com / Admin@123
              </p>
              <p>
                <span className="text-gray-500">User:</span>{" "}
                kshitiz@example.com / Admin@123
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>© 2026 AI of the World. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
