"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser, FaUserCircle } from "react-icons/fa";
import { API_ENDPOINTS } from "@/api/config";
import { setAuthToken, setUser } from "@/api/auth";

export default function SignUpPage() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Details
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [otpSent, setOtpSent] = useState(false);

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
        body: JSON.stringify({ email, purpose: "signup" }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send OTP");
      }

      setSuccess("OTP sent to your email! Please check your inbox.");
      setOtpSent(true);
      setStep(2);
    } catch (err) {
      setError(err.message || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.VERIFY_OTP, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Invalid OTP");
      }

      setSuccess("Email verified! Please complete your profile.");
      setStep(3);
    } catch (err) {
      setError(err.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Validate password length
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.SIGNUP_WITH_OTP, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
          username,
          full_name: fullName,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Signup failed");
      }

      // Save token and user data
      if (data.success && data.data) {
        setAuthToken(data.data.token);
        setUser(data.data.user);
        
        setSuccess("Account created successfully! Redirecting...");
        setTimeout(() => {
          router.push("/panel/your-dashboard");
        }, 1500);
      }
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
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
        body: JSON.stringify({ email, purpose: "signup" }),
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
          <p className="text-gray-400">Create your account</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-cyan-600' : 'bg-gray-700'}`}>
              1
            </div>
            <div className={`w-12 h-1 ${step >= 2 ? 'bg-cyan-600' : 'bg-gray-700'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-cyan-600' : 'bg-gray-700'}`}>
              2
            </div>
            <div className={`w-12 h-1 ${step >= 3 ? 'bg-cyan-600' : 'bg-gray-700'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-cyan-600' : 'bg-gray-700'}`}>
              3
            </div>
          </div>
        </div>

        {/* Sign Up Form */}
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
                <p className="text-xs text-gray-500 mt-2">
                  We'll send a verification code to this email
                </p>
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

          {/* Step 2: OTP Verification */}
          {step === 2 && (
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div>
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
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Sent to {email}
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 disabled:from-gray-700 disabled:to-gray-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
              >
                {loading ? "Verifying..." : "Verify Email"}
              </button>

              <button
                type="button"
                onClick={handleResendOTP}
                disabled={loading}
                className="w-full text-cyan-500 hover:text-cyan-400 text-sm transition-colors"
              >
                Resend Code
              </button>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full text-gray-400 hover:text-gray-300 text-sm transition-colors"
              >
                Change Email
              </button>
            </form>
          )}

          {/* Step 3: Complete Profile */}
          {step === 3 && (
            <form onSubmit={handleSignup} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaUser className="text-gray-500" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Choose a username"
                    required
                    minLength={3}
                    maxLength={100}
                    className="w-full bg-gray-950 border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-600 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaUserCircle className="text-gray-500" />
                  </div>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your full name"
                    required
                    className="w-full bg-gray-950 border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-600 transition-colors"
                  />
                </div>
              </div>

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
                    placeholder="Create a password"
                    required
                    minLength={8}
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

              <div>
                <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaLock className="text-gray-500" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
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
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>
          )}

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{" "}
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
