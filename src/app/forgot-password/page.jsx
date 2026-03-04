"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { API_ENDPOINTS } from "@/api/config";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: Email, 2: OTP & New Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.SEND_OTP, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, purpose: "forgot_password" }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send OTP");
      }

      setSuccess("OTP sent to your email! Please check your inbox.");
      setStep(2);
    } catch (err) {
      setError(err.message || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate passwords match
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Validate password length
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    // Validate OTP length
    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.RESET_PASSWORD, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
          new_password: newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Password reset failed");
      }

      setSuccess("Password reset successfully! Redirecting to login...");
      setTimeout(() => {
        router.push("/signin");
      }, 2000);
    } catch (err) {
      setError(err.message || "Password reset failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.SEND_OTP, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, purpose: "forgot_password" }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to resend OTP");
      }

      setSuccess("OTP resent successfully!");
    } catch (err) {
      setError(err.message || "Failed to resend OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            AI of the World
          </h1>
          <p className="text-gray-400">Reset your password</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-cyan-600' : 'bg-gray-700'}`}>
              1
            </div>
            <div className={`w-16 h-1 ${step >= 2 ? 'bg-cyan-600' : 'bg-gray-700'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-cyan-600' : 'bg-gray-700'}`}>
              2
            </div>
          </div>
        </div>

        {/* Reset Password Form */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 shadow-2xl">
          {/* Error/Success Messages */}
          {error && (
            <div className="bg-red-950/50 border border-red-800 rounded-lg p-4 mb-6">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}
          {success && (
            <div className="bg-green-950/50 border border-green-800 rounded-lg p-4 mb-6">
              <p className="text-green-400 text-sm">{success}</p>
            </div>
          )}

          {/* Step 1: Email */}
          {step === 1 && (
            <form onSubmit={handleSendOTP} className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white mb-2">
                  Forgot your password?
                </h2>
                <p className="text-gray-400 text-sm mb-6">
                  No worries! Enter your email address and we'll send you a verification code.
                </p>
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
                    placeholder="your.email@example.com"
                    required
                    className="w-full bg-gray-950 border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-600 transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 disabled:from-gray-700 disabled:to-gray-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
              >
                {loading ? "Sending OTP..." : "Send Verification Code"}
              </button>
            </form>
          )}

          {/* Step 2: OTP & New Password */}
          {step === 2 && (
            <form onSubmit={handleResetPassword} className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white mb-2">
                  Verify & Reset
                </h2>
                <p className="text-gray-400 text-sm mb-6">
                  Enter the verification code sent to {email}
                </p>
                <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Verification Code
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="Enter 6-digit code"
                  required
                  maxLength={6}
                  className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-3 text-white text-center text-2xl tracking-widest placeholder-gray-500 focus:outline-none focus:border-cyan-600 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaLock className="text-gray-500" />
                  </div>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    required
                    minLength={8}
                    className="w-full bg-gray-950 border border-gray-700 rounded-lg pl-12 pr-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-600 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Must be at least 8 characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaLock className="text-gray-500" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    required
                    minLength={8}
                    className="w-full bg-gray-950 border border-gray-700 rounded-lg pl-12 pr-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-600 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 disabled:from-gray-700 disabled:to-gray-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
              >
                {loading ? "Resetting Password..." : "Reset Password"}
              </button>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={loading}
                  className="flex-1 text-cyan-500 hover:text-cyan-400 text-sm transition-colors"
                >
                  Resend Code
                </button>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 text-gray-400 hover:text-gray-300 text-sm transition-colors"
                >
                  Change Email
                </button>
              </div>
            </form>
          )}

          {/* Back to Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Remember your password?{" "}
              <a
                href="/signin"
                className="text-cyan-500 hover:text-cyan-400 font-semibold transition-colors"
              >
                Sign in
              </a>
            </p>
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
