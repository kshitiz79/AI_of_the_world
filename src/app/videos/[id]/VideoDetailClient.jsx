"use client";
import React, { useEffect, useState } from "react";
import VideoDetail from "@/components/shared/VideoDetail";
import { videosAPI } from "@/api";
import Link from "next/link";

export default function VideoDetailClient({ id }) {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Add timeout to prevent infinite loading
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        const response = await videosAPI.getVideoById(id);
        clearTimeout(timeoutId);
        
        if (response.success && response.data) {
          setVideo(response.data);
        } else {
          setError(response.error || "Video not found");
        }
      } catch (err) {
        console.error("Failed to fetch video:", err);
        if (err.name === 'AbortError') {
          setError("Request timed out. Please try again.");
        } else {
          setError(err.message || "Failed to load video");
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchVideo();
    } else {
      setLoading(false);
      setError("No video ID provided");
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mb-4"></div>
          <p className="text-gray-400">Loading video...</p>
        </div>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Video Not Found</h1>
          <p className="text-gray-400 mb-8">{error || "The video you're looking for doesn't exist."}</p>
          <Link 
            href="/videos"
            className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 transition-colors"
          >
            Back to Gallery
          </Link>
        </div>
      </div>
    );
  }

  return <VideoDetail video={video} contentType="video" />;
}
