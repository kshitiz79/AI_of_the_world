"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaImage, FaVideo, FaHeart, FaFire, FaTrophy, FaChartLine } from "react-icons/fa";
import { MdGif, MdTrendingUp } from "react-icons/md";
import { authAPI } from "@/api";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCreations: 0,
    totalLikes: 0,
    trendingScore: 0,
    communityRank: null,
    images: 0,
    gifs: 0,
    videos: 0,
    username: "User"
  });

  useEffect(() => {
    fetchUserStats();
  }, []);

  const fetchUserStats = async () => {
    try {
      setLoading(true);
      const response = await authAPI.getProfile();
      
      if (response.success && response.data) {
        const user = response.data;
        setStats({
          totalCreations: user.total_creations || 0,
          totalLikes: user.total_likes || 0,
          trendingScore: user.trending_score || 0,
          communityRank: user.community_rank,
          images: user.image_count || 0,
          gifs: user.gif_count || 0,
          videos: user.video_count || 0,
          username: user.username || user.full_name || "User"
        });
      }
    } catch (err) {
      console.error("Failed to fetch user stats:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigation = (path) => {
    router.push(path);
  };

  if (loading) {
    return (
      <div className="text-white flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mb-4"></div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-white space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Welcome back, {stats.username}! 👋</h1>
        <p className="text-gray-400">Here's what's happening with your AI creations today.</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <FaImage className="text-3xl mb-3 relative z-10" />
          <div className="text-3xl font-bold mb-1 relative z-10">{stats.totalCreations}</div>
          <div className="text-sm opacity-90 relative z-10">Total Creations</div>
        </div>
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <FaHeart className="text-3xl mb-3 relative z-10" />
          <div className="text-3xl font-bold mb-1 relative z-10">{stats.totalLikes}</div>
          <div className="text-sm opacity-90 relative z-10">Total Likes</div>
        </div>
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <FaFire className="text-3xl mb-3 relative z-10" />
          <div className="text-3xl font-bold mb-1 relative z-10">{stats.trendingScore}</div>
          <div className="text-sm opacity-90 relative z-10">Trending Score</div>
        </div>
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <FaTrophy className="text-3xl mb-3 relative z-10" />
          <div className="text-3xl font-bold mb-1 relative z-10">
            {stats.communityRank ? `#${stats.communityRank}` : "#--"}
          </div>
          <div className="text-sm opacity-90 relative z-10">Community Rank</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Content Breakdown */}
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
              <span className="text-2xl font-bold">{stats.images}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                  <MdGif className="text-2xl" />
                </div>
                <span className="font-medium">GIFs</span>
              </div>
              <span className="text-2xl font-bold">{stats.gifs}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                  <FaVideo />
                </div>
                <span className="font-medium">Videos</span>
              </div>
              <span className="text-2xl font-bold">{stats.videos}</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-2 bg-black border border-gray-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => handleNavigation('/panel/your-dashboard/share-your-promt')}
              className="bg-gradient-to-r from-black to-gray-950 border border-gray-800 rounded-xl p-6 text-left transition-all transform hover:scale-105"
            >
              <FaImage className="text-2xl mb-3" />
              <div className="font-bold mb-1">Upload Image</div>
              <div className="text-sm opacity-90">Share your AI artwork</div>
            </button>
            <button 
              onClick={() => handleNavigation('/panel/your-dashboard/share-your-promt')}
              className="bg-gradient-to-r from-black to-gray-950 border border-gray-800 rounded-xl p-6 text-left transition-all transform hover:scale-105"
            >
              <MdGif className="text-3xl mb-3" />
              <div className="font-bold mb-1">Upload GIF</div>
              <div className="text-sm opacity-90">Share animated content</div>
            </button>
            <button 
              onClick={() => handleNavigation('/panel/your-dashboard/share-your-promt')}
              className="bg-gradient-to-r from-black to-gray-950 border border-gray-800 rounded-xl p-6 text-left transition-all transform hover:scale-105"
            >
              <FaVideo className="text-2xl mb-3" />
              <div className="font-bold mb-1">Upload Video</div>
              <div className="text-sm opacity-90">Share AI-generated videos</div>
            </button>
            <button 
              onClick={() => handleNavigation('/panel/your-dashboard/your-contributions')}
              className="bg-gradient-to-r from-black to-gray-950 border border-gray-800 rounded-xl p-6 text-left transition-all transform hover:scale-105"
            >
              <MdTrendingUp className="text-2xl mb-3" />
              <div className="font-bold mb-1">View Analytics</div>
              <div className="text-sm opacity-90">Track your performance</div>
            </button>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-black to-gray-950 border border-cyan-800/50 rounded-2xl p-8">
        <h3 className="text-2xl font-bold mb-3">🚀 Ready to get started?</h3>
        <p className="text-gray-300 mb-6">
          {stats.totalCreations === 0 
            ? "Upload your first AI-generated creation and join thousands of creators."
            : "Keep creating amazing content and grow your community!"}
        </p>
        <div className="flex gap-3">
          <button 
            onClick={() => handleNavigation('/panel/your-dashboard/share-your-promt')}
            className="bg-white hover:bg-gray-200 text-black font-bold px-6 py-3 rounded-lg transition-colors"
          >
            {stats.totalCreations === 0 ? "Upload Your First Creation" : "Upload New Creation"}
          </button>
          <button 
            onClick={() => handleNavigation('/creative-images')}
            className="bg-gray-800 hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Explore Gallery
          </button>
        </div>
      </div>
    </div>
  );
}
