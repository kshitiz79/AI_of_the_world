"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { videosAPI, tagsAPI } from "@/api";
import { FaHeart, FaCopy, FaPlay } from "react-icons/fa";
import Plasma from "@/components/Plasma";

export default function VideosPage() {
  const router = useRouter();
  const [videos, setVideos] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    fetchVideos();
    fetchTags();
  }, []);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const response = await videosAPI.getAllVideos({ status: 'approved' });
      if (response.success) {
        // Filter only published videos
        const publishedVideos = (response.data || []).filter(video => video.is_published);
        setVideos(publishedVideos);
      }
    } catch (err) {
      console.error("Failed to fetch videos:", err);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await tagsAPI.getAllTags();
      if (response.success) {
        setTags(response.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch tags:", err);
    }
  };

  const filteredVideos = videos.filter((video) => {
    if (selectedFilters.length === 0) return true;
    if (!video.tags || video.tags.length === 0) return false;
    return selectedFilters.some((filter) => 
      video.tags.some(tag => tag.name.toLowerCase() === filter.toLowerCase())
    );
  });

  const handleCopy = (id, prompt) => {
    navigator.clipboard.writeText(prompt);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleFilter = (tagName) => {
    setSelectedFilters((prev) =>
      prev.includes(tagName)
        ? prev.filter((name) => name !== tagName)
        : [...prev, tagName]
    );
  };

  // Group tags by category
  const groupedTags = {
    Style: tags.filter(tag => tag.category === 'Style'),
    Mood: tags.filter(tag => tag.category === 'Mood'),
    Theme: tags.filter(tag => tag.category === 'Theme'),
    Technique: tags.filter(tag => tag.category === 'Technique'),
  };

  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="max-w-7xl mx-auto px-4 py-32">
        {/* Header with Plasma */}
        <div className="mb-12 border border-gray-500 relative overflow-hidden rounded-2xl" style={{ height: '300px' }}>
          <div className="absolute left-0 top-0 w-1/2 h-full z-0">
            <Plasma
              color="#3b0172"
              speed={0.6}
              direction="forward"
              scale={1.1}
              opacity={0.8}
              mouseInteractive={true}
            />
          </div>
          
          <div className="absolute right-0 top-0 w-1/2 h-full z-0">
            <Plasma
              color="#00ffff"
              speed={0.8}
              direction="reverse"
              scale={1.2}
              opacity={0.8}
              mouseInteractive={true}
            />
          </div>
          
          <div className="relative z-10 flex flex-col items-center justify-center h-full px-8">
            <h1 className="text-5xl text-center font-bold mb-4">
              Explore AI-Generated Videos
            </h1>
            <p className="text-gray-400 text-center text-lg max-w-4xl mx-auto">
              Discover video prompts and techniques. Browse through community-shared AI videos and learn how to create stunning animations.
            </p>
          </div>
        </div>

        {/* Filter Section */}
        <div className="w-full bg-transparent border border-gray-600 rounded-lg p-6 mb-12">
          <div className="mb-6">
            <div className="inline-block px-3 py-1 bg-gray-800 rounded-full text-xs font-semibold text-gray-300 mb-4">
              REFINE GALLERY
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Filter videos by style and technique
            </h2>
            <p className="text-gray-400 text-sm">
              Select tags to find the perfect video prompts for your project.
            </p>
          </div>

          {Object.entries(groupedTags).map(([category, categoryTags]) => {
            if (categoryTags.length === 0) return null;
            return (
              <div key={category} className="mb-6">
                <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {categoryTags.map((tag) => (
                    <button
                      key={tag.id}
                      onClick={() => toggleFilter(tag.name)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        selectedFilters.includes(tag.name)
                          ? "bg-cyan-600 text-white shadow-lg shadow-cyan-500/50"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Video Gallery */}
        <div className="w-full">
          <div className="mb-6">
            <p className="text-gray-400 text-sm">
              Showing {filteredVideos.length} of {videos.length} videos
              {selectedFilters.length > 0 && ` (${selectedFilters.length} filters active)`}
            </p>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mb-4"></div>
              <p className="text-gray-400">Loading videos...</p>
            </div>
          ) : filteredVideos.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No videos found</p>
              <p className="text-gray-500 text-sm mt-2">
                {selectedFilters.length > 0 
                  ? "Try selecting different filter combinations"
                  : "Check back later for new content"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map((video) => (
                <div
                  key={video.id}
                  className="group relative bg-gray-900 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-cyan-500/20 transition-all"
                >
                  {/* Video */}
                  <div 
                    className="relative h-96 overflow-hidden cursor-pointer"
                    onClick={() => router.push(`/videos/${video.id}`)}
                  >
                    <video
                      src={video.video_url}
                      className="w-full h-full object-cover"
                      muted
                      loop
                      onMouseEnter={(e) => e.target.play()}
                      onMouseLeave={(e) => {
                        e.target.pause();
                        e.target.currentTime = 0;
                      }}
                    />
                    
                    {/* Play Icon Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 bg-cyan-600 rounded-full flex items-center justify-center">
                        <FaPlay className="text-white text-2xl ml-1" />
                      </div>
                    </div>

                    {/* Likes - Top Right */}
                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                      <FaHeart className="text-red-500 text-xs" />
                      <span className="text-white text-xs font-semibold">{video.likes_count || 0}</span>
                    </div>

                    {/* Bottom Info - Copy Button & Creator */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(video.id, video.prompt);
                        }}
                        className="bg-black/30 backdrop-blur-sm hover:bg-black/90 text-white py-2 px-4 rounded-lg flex items-center gap-2 transition-colors duration-200"
                      >
                        <FaCopy />
                        <span className="text-sm font-semibold">
                          {copiedId === video.id ? "Copied!" : "Copy"}
                        </span>
                      </button>

                      <span className="text-xs text-white bg-black/20 backdrop-blur-sm px-3 py-2 rounded-lg">
                        by {video.creator_credit}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <div className="p-4">
                    <h3 className="font-bold text-lg truncate">{video.project_title}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
