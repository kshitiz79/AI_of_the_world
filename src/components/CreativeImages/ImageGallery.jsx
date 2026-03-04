"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { imagesAPI } from "@/api";
import { FaHeart, FaCopy, FaStar } from "react-icons/fa";

export default function ImageGallery({ selectedFilters }) {
  const router = useRouter();
  const [copiedId, setCopiedId] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      // Fetch only published images for public gallery
      const response = await imagesAPI.getAllImages({ 
        status: 'approved',
        is_featured: undefined 
      });
      if (response.success) {
        // Filter only published images
        const publishedImages = (response.data || []).filter(img => img.is_published);
        setImages(publishedImages);
      }
    } catch (err) {
      console.error("Failed to fetch images:", err);
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredImages = images.filter((image) => {
    if (selectedFilters.length === 0) return true;
    // Check if image has tags and any tag matches selected filters
    if (!image.tags || image.tags.length === 0) return false;
    return selectedFilters.some((filter) => 
      image.tags.some(tag => tag.name.toLowerCase() === filter.toLowerCase())
    );
  });

  const handleCopy = (id, prompt) => {
    navigator.clipboard.writeText(prompt);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mb-4"></div>
        <p className="text-gray-400">Loading creative images...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <p className="text-gray-400 text-sm">
          Showing {filteredImages.length} of {images.length} images
          {selectedFilters.length > 0 && ` (${selectedFilters.length} filters active)`}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredImages.map((image) => (
          <div
            key={image.id}
            className="group relative bg-gray-900 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-cyan-500/20"
          >
            {/* Image */}
            <div 
              className="relative h-96 overflow-hidden cursor-pointer"
              onClick={() => router.push(`/creative-images/${image.id}`)}
            >
              <img
                src={image.image_url}
                alt={image.project_title}
                className="w-full h-full object-cover"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute top-4 left-4 right-4">
                </div>
              </div>

              {/* Premium Badge (if featured) */}
              {image.is_featured && (
                <div className="absolute top-3 left-3 bg-yellow-500 px-2 py-1 rounded-full flex items-center gap-1">
                  <FaStar className="text-black text-xs" />
                  <span className="text-black text-xs font-bold">PREMIUM</span>
                </div>
              )}
           
              {/* Likes - Top Right */}
              <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                <FaHeart className="text-red-500 text-xs" />
                <span className="text-white text-xs font-semibold">{image.likes_count || 0}</span>
              </div>

              {/* Bottom Info - Copy Button & Creator */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                {/* Copy Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy(image.id, image.prompt);
                  }}
                  className="bg-black/30 backdrop-blur-sm hover:bg-black/90 text-white py-2 px-4 rounded-lg flex items-center gap-2 transition-colors duration-200"
                >
                  <FaCopy />
                  <span className="text-sm font-semibold">
                    {copiedId === image.id ? "Copied!" : "Copy"}
                  </span>
                </button>

                {/* Creator */}
                <span className="text-xs text-white bg-black/20 backdrop-blur-sm px-3 py-2 rounded-lg">
                  by {image.creator_credit}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredImages.length === 0 && !loading && (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">No images found matching your filters</p>
          <p className="text-gray-500 text-sm mt-2">Try selecting different filter combinations</p>
        </div>
      )}
    </div>
  );
}
