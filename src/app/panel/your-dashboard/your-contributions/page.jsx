"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaImage, FaVideo, FaHeart, FaEye, FaDownload } from "react-icons/fa";
import { MdGif } from "react-icons/md";
import { imagesAPI, gifsAPI, videosAPI, authAPI } from "@/api";

export default function YourContributionsPage() {
  const router = useRouter();
  const [sortBy, setSortBy] = useState("recent");
  const [loading, setLoading] = useState(true);
  const [contributions, setContributions] = useState([]);
  const [stats, setStats] = useState({
    promptsShared: 0,
    totalLikes: 0,
    avgPromptLength: 0,
    totalImages: 0,
    totalGifs: 0,
    totalVideos: 0,
  });

  useEffect(() => {
    fetchContributions();
  }, [sortBy]);

  const fetchContributions = async () => {
    try {
      setLoading(true);
      
      // Get user profile for stats
      const profileResponse = await authAPI.getProfile();
      const userId = profileResponse.data?.id;

      if (!userId) {
        setLoading(false);
        return;
      }

      // Fetch all user contributions
      const [imagesRes, gifsRes, videosRes] = await Promise.all([
        imagesAPI.getAllImages({ user_id: userId }),
        gifsAPI.getAllGIFs({ user_id: userId }),
        videosAPI.getAllVideos({ user_id: userId })
      ]);

      const images = imagesRes.success ? imagesRes.data : [];
      const gifs = gifsRes.success ? gifsRes.data : [];
      const videos = videosRes.success ? videosRes.data : [];

      // Combine all contributions
      const allContributions = [
        ...images.map(item => ({ ...item, type: 'image' })),
        ...gifs.map(item => ({ ...item, type: 'gif' })),
        ...videos.map(item => ({ ...item, type: 'video' }))
      ];

      // Sort contributions
      const sorted = allContributions.sort((a, b) => {
        if (sortBy === "recent") {
          return new Date(b.created_at) - new Date(a.created_at);
        } else {
          return (b.likes_count || 0) - (a.likes_count || 0);
        }
      });

      setContributions(sorted);

      // Calculate stats
      const totalLikes = allContributions.reduce((sum, item) => sum + (item.likes_count || 0), 0);
      const avgLength = allContributions.length > 0
        ? Math.round(allContributions.reduce((sum, item) => sum + (item.prompt?.split(' ').length || 0), 0) / allContributions.length)
        : 0;

      setStats({
        promptsShared: allContributions.length,
        totalLikes,
        avgPromptLength: avgLength,
        totalImages: images.length,
        totalGifs: gifs.length,
        totalVideos: videos.length,
      });
    } catch (err) {
      console.error("Failed to fetch contributions:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleContributionClick = (item) => {
    const path = item.type === 'gif' 
      ? `/gifs/${item.id}`
      : item.type === 'video'
      ? `/videos/${item.id}`
      : `/creative-images/${item.id}`;
    router.push(path);
  };

  return (
    <div className="text-white">
      <div className="bg-gray-black border border-gray-800 rounded-2xl p-8 mb-6">
        <div className="inline-block px-3 py-1 bg-gray-800 rounded-full text-xs font-semibold text-gray-300 mb-4">
          YOUR CONTRIBUTIONS
        </div>
        <h1 className="text-4xl font-bold mb-4">Keep inspiring the gallery</h1>
        <p className="text-gray-400 mb-8">
          {stats.promptsShared === 0 
            ? "Share your first prompt to teach the community how you unlock cinematic frames."
            : "Your contributions are helping the community create amazing AI art!"}
        </p>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-950 border border-gray-700 rounded-xl p-6">
            <div className="text-4xl font-bold mb-2">{stats.promptsShared}</div>
            <div className="text-sm text-gray-400">Prompts shared</div>
          </div>
          <div className="bg-gray-950 border border-gray-700 rounded-xl p-6">
            <div className="text-4xl font-bold mb-2">{stats.totalLikes}</div>
            <div className="text-sm text-gray-400">Total likes</div>
          </div>
          <div className="bg-gray-950 border border-gray-700 rounded-xl p-6">
            <div className="text-4xl font-bold mb-2">{stats.avgPromptLength} words</div>
            <div className="text-sm text-gray-400">Avg prompt length</div>
          </div>
        </div>

        {/* Content Type Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-black border border-gray-700 rounded-xl p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-cyan-600 rounded-lg flex items-center justify-center">
              <FaImage className="text-xl" />
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.totalImages}</div>
              <div className="text-sm text-gray-400">Images uploaded</div>
            </div>
          </div>
          <div className="bg-gray-950 border border-gray-700 rounded-xl p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
              <MdGif className="text-3xl" />
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.totalGifs}</div>
              <div className="text-sm text-gray-400">GIFs uploaded</div>
            </div>
          </div>
          <div className="bg-gray-950 border border-gray-700 rounded-xl p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center">
              <FaVideo className="text-xl" />
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.totalVideos}</div>
              <div className="text-sm text-gray-400">Videos uploaded</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => router.push('/panel/your-dashboard/share-your-promt')}
            className="bg-white hover:bg-gray-200 text-black font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Share a new prompt
          </button>
          <button 
            onClick={() => router.push('/panel/your-dashboard/profile')}
            className="bg-gray-950 hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            View profile
          </button>
          <button 
            onClick={() => router.push('/creative-images')}
            className="bg-gray-950 hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Explore community feed
          </button>
        </div>
      </div>

      {/* Contributions Library */}
      <div className="bg-black border border-gray-800 rounded-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Prompt library</h2>
            <p className="text-gray-400 text-sm">
              {stats.promptsShared === 0 
                ? "You have not published any prompts yet. Upload your first artwork to get started."
                : `Showing ${contributions.length} contribution${contributions.length !== 1 ? 's' : ''}`}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSortBy("recent")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                sortBy === "recent" ? "bg-gray-900 text-white" : "bg-black text-gray-400"
              }`}
            >
              Recently updated
            </button>
            <button
              onClick={() => setSortBy("liked")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                sortBy === "liked" ? "bg-gray-900 text-white" : "bg-black text-gray-400"
              }`}
            >
              Most liked
            </button>
          </div>
        </div>

        {loading ? (
          <div className="bg-black border border-gray-700 rounded-xl p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mb-4"></div>
            <p className="text-gray-400">Loading your contributions...</p>
          </div>
        ) : contributions.length === 0 ? (
          <div className="bg-black border border-gray-700 rounded-xl p-12 text-center">
            <h3 className="text-xl font-bold mb-3">You haven't shared any prompts yet</h3>
            <p className="text-gray-400 mb-6">
              Upload your first artwork on the submit page and it will appear here.
            </p>
            <button 
              onClick={() => router.push('/panel/your-dashboard/share-your-promt')}
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Share your first prompt
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contributions.map((item) => (
              <div
                key={`${item.type}-${item.id}`}
                onClick={() => handleContributionClick(item)}
                className="bg-gray-950 border border-gray-700 rounded-xl overflow-hidden cursor-pointer hover:border-cyan-600 transition-all group"
              >
                <div className="relative h-48 bg-gray-900">
                  <img
                    src={item.image_url || item.gif_url || item.video_url}
                    alt={item.project_title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 px-2 py-1 bg-black/80 rounded-full text-xs font-semibold">
                    {item.type.toUpperCase()}
                  </div>
                  <div className="absolute top-2 left-2 px-2 py-1 bg-black/80 rounded-full text-xs font-semibold">
                    {item.status === 'approved' ? '✓ Approved' : item.status === 'pending' ? '⏳ Pending' : '✗ Rejected'}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold mb-2 truncate">{item.project_title}</h3>
                  <p className="text-sm text-gray-400 line-clamp-2 mb-3">{item.prompt}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <FaHeart className="text-red-500" />
                      <span>{item.likes_count || 0}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaEye className="text-cyan-500" />
                      <span>{item.views_count || 0}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaDownload className="text-green-500" />
                      <span>{item.downloads_count || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
