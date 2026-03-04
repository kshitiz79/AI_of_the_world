"use client";
import React, { useState, useEffect } from "react";
import { FaHeart, FaCopy, FaDownload } from "react-icons/fa";
import { API_ENDPOINTS } from "@/api/config";

export default function ImageDetail({ image, onBack, contentType = "image" }) {
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(image.likes_count || 0);
  const [viewsCount, setViewsCount] = useState(image.views_count || 0);
  const [downloadsCount, setDownloadsCount] = useState(image.downloads_count || 0);
  const [downloading, setDownloading] = useState(false);

  // Track view on component mount
  useEffect(() => {
    trackView();
  }, [image.id]);

  const trackView = async () => {
    try {
      const endpoint = contentType === "gif" 
        ? `${API_ENDPOINTS.GIFS}/${image.id}/view`
        : contentType === "video"
        ? `${API_ENDPOINTS.VIDEOS}/${image.id}/view`
        : `${API_ENDPOINTS.IMAGES}/${image.id}/view`;
      
      await fetch(endpoint, { method: 'POST' });
      setViewsCount(prev => prev + 1);
    } catch (err) {
      console.error("Failed to track view:", err);
    }
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(image.prompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handleLike = async () => {
    try {
      const endpoint = contentType === "gif"
        ? `${API_ENDPOINTS.GIFS}/${image.id}/like`
        : contentType === "video"
        ? `${API_ENDPOINTS.VIDEOS}/${image.id}/like`
        : `${API_ENDPOINTS.IMAGES}/${image.id}/like`;

      const response = await fetch(endpoint, { 
        method: liked ? 'DELETE' : 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (response.ok) {
        if (!liked) {
          setLikeCount(likeCount + 1);
          setLiked(true);
        } else {
          setLikeCount(likeCount - 1);
          setLiked(false);
        }
      }
    } catch (err) {
      console.error("Failed to like:", err);
    }
  };

  const handleDownload = async () => {
    try {
      setDownloading(true);
      
      // Track download
      const trackEndpoint = contentType === "gif"
        ? `${API_ENDPOINTS.GIFS}/${image.id}/download`
        : contentType === "video"
        ? `${API_ENDPOINTS.VIDEOS}/${image.id}/download`
        : `${API_ENDPOINTS.IMAGES}/${image.id}/download`;
      
      await fetch(trackEndpoint, { method: 'POST' });
      setDownloadsCount(prev => prev + 1);

      // Download file
      const imageUrl = image.image_url || image.gif_url || image.video_url;
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = image.project_title || 'download';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Failed to download:", err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-32">
      <div className="max-w-7xl mx-auto px-4 py-20" >
        {/* Back Button */}
       

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Image */}
          <div className="relative h-[95vh] rounded-4xl overflow-hidden bg-gray-900">
            <img
              src={image.image_url}
              alt={image.project_title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Side - Details */}
          <div className="space-y-6">
            {/* Badge */}
            <div className="inline-block px-3 py-1 bg-gray-800 rounded-full text-xs font-semibold text-gray-300">
              PROMPT DETAIL
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold">{image.project_title}</h1>

            {/* Meta Info */}
            <div className="space-y-1 text-sm text-gray-400">
              <p>Shared by {image.creator_credit}</p>
              <p>Posted on {new Date(image.created_at).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}</p>
            </div>

            {/* Prompt Section */}
            <div className="bg-gray-900 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                PROMPT
              </h3>
              <p className="text-gray-300 leading-relaxed">{image.prompt}</p>
              
              <div className="flex gap-3">
                <button
                  onClick={handleCopyPrompt}
                  className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  <FaCopy />
                  <span>{copiedPrompt ? "Copied!" : "Copy"}</span>
                </button>
                <button className="bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors">
                  Try this
                </button>
              </div>
            </div>

            {/* Likes Section */}
            <div className="bg-gray-900 rounded-2xl p-6">
              <button
                onClick={handleLike}
                className="flex items-center gap-3 w-full"
              >
                <FaHeart className={`text-2xl ${liked ? "text-red-500" : "text-gray-600"}`} />
                <div className="text-left">
                  <p className="text-2xl font-bold">{likeCount}</p>
                  <p className="text-sm text-gray-400">{likeCount} TOTAL LIKES</p>
                </div>
              </button>
            </div>

            {/* Model/Tool Section */}
            {image.model_or_tool && (
              <div className="bg-gray-900 rounded-2xl p-6 space-y-2">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                  MODEL OR TOOL
                </h3>
                <p className="text-white font-semibold">{image.model_or_tool}</p>
              </div>
            )}

            {/* Technical Notes */}
            {image.technical_notes && (
              <div className="bg-gray-900 rounded-2xl p-6 space-y-2">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                  TECHNICAL NOTES
                </h3>
                <p className="text-gray-300">{image.technical_notes}</p>
              </div>
            )}

            {/* Tags Section */}
            {image.tags && image.tags.length > 0 && (
              <div className="bg-gray-900 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                  TAGS
                </h3>
                <div className="flex flex-wrap gap-2">
                  {image.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="bg-gray-800 text-gray-300 px-4 py-2 rounded-full text-sm font-medium capitalize"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="bg-gray-900 rounded-2xl p-6 space-y-2">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                STATISTICS
              </h3>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div>
                  <p className="text-2xl font-bold text-cyan-400">{viewsCount}</p>
                  <p className="text-sm text-gray-400">Views</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-400">{downloadsCount}</p>
                  <p className="text-sm text-gray-400">Downloads</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-400">
                    {image.is_featured ? "PREMIUM" : "FREE"}
                  </p>
                  <p className="text-sm text-gray-400">Access</p>
                </div>
              </div>
              
              {/* Download Button */}
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="w-full mt-4 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 disabled:from-gray-700 disabled:to-gray-700 text-white font-bold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
              >
                <FaDownload />
                <span>{downloading ? "Downloading..." : "Download"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
