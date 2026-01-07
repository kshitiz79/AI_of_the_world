"use client";
import React, { useState } from "react";
import StarBorder from "@/components/CreativeImages/StarBorder";
import filterData from "@/components/CreativeImages/filterData.json";

export default function ProfilePage() {
  const [selectedInterests, setSelectedInterests] = useState([]);

  const toggleInterest = (interestId) => {
    setSelectedInterests((prev) =>
      prev.includes(interestId)
        ? prev.filter((id) => id !== interestId)
        : [...prev, interestId]
    );
  };

  // Combine all filter categories into one interests list
  const allInterests = [
    ...filterData.artisticStyles,
    ...filterData.corporateProfessional,
    ...filterData.genreThemes,
    ...filterData.moodTone,
    ...filterData.optionalAddOns,
  ];

  return (
    <div className="min-h-screen bg-black text-white  px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-block px-3 py-1 bg-black rounded-full text-xs font-semibold text-gray-300 mb-4">
            ACCOUNT SETTINGS
          </div>
          <h1 className="text-4xl font-bold mb-2">Profile & Settings</h1>
          <p className="text-gray-400">
            Manage your account information, subscription, and appearance preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Card */}
          <div className="bg-black border border-gray-800 rounded-2xl p-6">
            <div className="mb-4">
              <span className="text-xs text-gray-400 uppercase tracking-wider">
                SIGNED IN AS
              </span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-2xl font-bold">
                K
              </div>
              <div>
                <h2 className="text-xl font-bold">Kshitiz WhatsApp</h2>
                <p className="text-gray-400 text-sm">kshitizmaurya02@gmail.com</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6 text-center">
              <div>
                <p className="text-xs text-gray-400 uppercase mb-1">Member Since</p>
                <p className="font-semibold">Nov 13, 2025</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase mb-1">Prompts</p>
                <p className="font-semibold">0</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase mb-1">Last Update</p>
                <p className="font-semibold">-</p>
              </div>
            </div>

            <div className="flex gap-2 mb-4">
              <span className="text-red-500 text-sm">❤️ 0 total likes</span>
              <span className="text-gray-500 text-sm">0 published prompts</span>
            </div>

            <div className="flex gap-3">
              <button className="bg-black border border-gray-800  hover:bg-gray-950 text-white px-6 py-2 rounded-lg transition-colors">
                Submit new prompt
              </button>
              <button className="bg-black hover:bg-gray-950  border border-gray-700 text-white px-6 py-2 rounded-lg transition-colors">
                Sign out
              </button>
            </div>
          </div>

          {/* Subscription Card */}
          <div className="bg-black border border-gray-800 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4">No Active Subscription</h3>
            <p className="text-gray-400 mb-6">
              Subscribe to a plan to access the Studio and generate AI images and videos.
            </p>
            <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              View pricing plans
            </button>
          </div>
        </div>

        {/* Your Interests Card */}
        <div className="mt-6 bg-black border border-gray-800 rounded-2xl p-6">
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2">Your Interests</h3>
            <p className="text-gray-400 text-sm">
              Select your interests to personalize your feed and get better recommendations.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {allInterests.map((interest) => (
              <StarBorder
                key={interest.id}
                onClick={() => toggleInterest(interest.id)}
                className={`transition-all duration-300 transform ${
                  selectedInterests.includes(interest.id)
                    ? "scale-110 shadow-2xl shadow-cyan-500/50"
                    : "opacity-70 hover:opacity-100 hover:scale-105"
                }`}
                color={selectedInterests.includes(interest.id) ? "cyan" : "white"}
                speed={selectedInterests.includes(interest.id) ? "3s" : "5s"}
                thickness={selectedInterests.includes(interest.id) ? 2 : 1}
              >
                <div
                  className={`flex items-center gap-2 ${
                    selectedInterests.includes(interest.id) ? "font-bold" : "font-medium"
                  }`}
                >
                  <span
                    className={selectedInterests.includes(interest.id) ? "text-xl" : ""}
                  >
                    {interest.icon}
                  </span>
                  <span>{interest.label}</span>
                </div>
              </StarBorder>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              Save Interests ({selectedInterests.length} selected)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
