"use client";
import React, { useEffect, useState } from "react";
import ImageDetail from "@/components/CreativeImages/ImageDetail";
import { imagesAPI } from "@/api";
import Link from "next/link";

export default function ImageDetailClient({ id }) {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Add timeout to prevent infinite loading
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        const response = await imagesAPI.getImageById(id);
        clearTimeout(timeoutId);
        
        if (response.success && response.data) {
          setImage(response.data);
        } else {
          setError(response.error || "Image not found");
        }
      } catch (err) {
        console.error("Failed to fetch image:", err);
        if (err.name === 'AbortError') {
          setError("Request timed out. Please try again.");
        } else {
          setError(err.message || "Failed to load image");
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchImage();
    } else {
      setLoading(false);
      setError("No image ID provided");
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mb-4"></div>
          <p className="text-gray-400">Loading image...</p>
        </div>
      </div>
    );
  }

  if (error || !image) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Image Not Found</h1>
          <p className="text-gray-400 mb-8">{error || "The image you're looking for doesn't exist."}</p>
          <Link 
            href="/creative-images"
            className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 transition-colors"
          >
            Back to Gallery
          </Link>
        </div>
      </div>
    );
  }

  return <ImageDetail image={image} />;
}
