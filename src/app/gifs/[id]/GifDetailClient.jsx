"use client";
import React, { useEffect, useState } from "react";
import ImageDetail from "@/components/CreativeImages/ImageDetail";
import { gifsAPI } from "@/api";
import Link from "next/link";

export default function GifDetailClient({ id }) {
  const [gif, setGif] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGif = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Add timeout to prevent infinite loading
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        const response = await gifsAPI.getGIFById(id);
        clearTimeout(timeoutId);
        
        console.log("GIF API Response:", response); // Debug log
        
        if (response.success && response.data) {
          // Transform data to match ImageDetail component expectations
          const gifData = {
            ...response.data,
            // Map GIF URL to image_url field (ImageDetail uses image_url on line 36)
            image_url: response.data.gif_url || response.data.url || response.data.file_url || response.data.image_url
          };
          console.log("Transformed GIF Data:", gifData); // Debug log
          setGif(gifData);
        } else {
          setError(response.error || "GIF not found");
        }
      } catch (err) {
        console.error("Failed to fetch GIF:", err);
        if (err.name === 'AbortError') {
          setError("Request timed out. Please try again.");
        } else {
          setError(err.message || "Failed to load GIF");
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchGif();
    } else {
      setLoading(false);
      setError("No GIF ID provided");
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mb-4"></div>
          <p className="text-gray-400">Loading GIF...</p>
        </div>
      </div>
    );
  }

  if (error || !gif) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">GIF Not Found</h1>
          <p className="text-gray-400 mb-8">{error || "The GIF you're looking for doesn't exist."}</p>
          <Link 
            href="/gifs"
            className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 transition-colors"
          >
            Back to Gallery
          </Link>
        </div>
      </div>
    );
  }

  return <ImageDetail image={gif} contentType="gif" />;
}
