"use client";
import React from "react";
import { FaImage, FaVideo, FaHeart, FaFire, FaTrophy, FaChartLine } from "react-icons/fa";
import { MdGif, MdTrendingUp } from "react-icons/md";

export default function DashboardPage() {
  return (
    <div className="text-white space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Welcome back, Kshitiz! 👋</h1>
        <p className="text-gray-400">Here's what's happening with your AI creations today.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <FaImage className="text-3xl mb-3 relative z-10" />
          <div className="text-3xl font-bold mb-1 relative z-10">0</div>
          <div className="text-sm opacity-90 relative z-10">Total Creations</div>
        </div>
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <FaHeart className="text-3xl mb-3 relative z-10" />
          <div className="text-3xl font-bold mb-1 relative z-10">0</div>
          <div className="text-sm opacity-90 relative z-10">Total Likes</div>
        </div>
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <FaFire className="text-3xl mb-3 relative z-10" />
          <div className="text-3xl font-bold mb-1 relative z-10">0</div>
          <div className="text-sm opacity-90 relative z-10">Trending Score</div>
        </div>
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <FaTrophy className="text-3xl mb-3 relative z-10" />
          <div className="text-3xl font-bold mb-1 relative z-10">#--</div>
          <div className="text-sm opacity-90 relative z-10">Community Rank</div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-black border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Content Breakdown</h3>
            <FaChartLine className="text-cyan-400" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-cyan-950 rounded-lg flex items-center justify-center">
                  <FaImage />
                </div>
                <span className="font-medium">Images</span>
              </div>
              <span className="text-2xl font-bold">0</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                  <MdGif className="text-2xl" />
                </div>
                <span className="font-medium">GIFs</span>
              </div>
              <span className="text-2xl font-bold">0</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                  <FaVideo />
                </div>
                <span className="font-medium">Videos</span>
              </div>
              <span className="text-2xl font-bold">0</span>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 bg-black border border-gray-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="bg-gradient-to-r from-black to-gray-950 border border-gray-800 rounded-xl p-6 text-left transition-all transform hover:scale-105">
              <FaImage className="text-2xl mb-3" />
              <div className="font-bold mb-1">Upload Image</div>
              <div className="text-sm opacity-90">Share your AI artwork</div>
            </button>
            <button className="bg-gradient-to-r from-black to-gray-950 border border-gray-800 rounded-xl p-6 text-left transition-all transform hover:scale-105">
              <MdGif className="text-3xl mb-3" />
              <div className="font-bold mb-1">Upload GIF</div>
              <div className="text-sm opacity-90">Share animated content</div>
            </button>
            <button className="bg-gradient-to-r from-black to-gray-950 border border-gray-800 rounded-xl p-6 text-left transition-all transform hover:scale-105">
              <FaVideo className="text-2xl mb-3" />
              <div className="font-bold mb-1">Upload Video</div>
              <div className="text-sm opacity-90">Share AI-generated videos</div>
            </button>
            <button className="bg-gradient-to-r from-black to-gray-950 border border-gray-800 rounded-xl p-6 text-left transition-all transform hover:scale-105">
              <MdTrendingUp className="text-2xl mb-3" />
              <div className="font-bold mb-1">View Analytics</div>
              <div className="text-sm opacity-90">Track your performance</div>
            </button>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-black to-cray-950 border border-cyan-800/50 rounded-2xl p-8">
        <h3 className="text-2xl font-bold mb-3">🚀 Ready to get started?</h3>
        <p className="text-gray-300 mb-6">Upload your first AI-generated creation and join thousands of creators.</p>
        <div className="flex gap-3">
          <button className="bg-white hover:bg-gray-200 text-black font-bold px-6 py-3 rounded-lg transition-colors">
            Upload Your First Creation
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
            Explore Gallery
          </button>
        </div>
      </div>
    </div>
  );
}
