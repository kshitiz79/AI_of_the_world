"use client";
import React, { useState } from "react";
import { FaHeart, FaCopy } from "react-icons/fa";

export default function VideoDetail({ video, onBack }) {
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(video.likes);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(video.prompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handleLike = () => {
    if (!liked) {
      setLikeCount(likeCount + 1);
      setLiked(true);
    } else {
      setLikeCount(likeCount - 1);
      setLiked(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-32">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Video */}
          <div className="relative h-[95vh] rounded-2xl overflow-hidden bg-gray-900">
            <video
              src={video.video}
              controls
              loop
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
            <h1 className="text-4xl font-bold">{video.title}</h1>

            {/* Meta Info */}
            <div className="space-y-1 text-sm text-gray-400">
              <p>Shared by @{video.createdBy}</p>
              <p>
                Posted on{" "}
                {new Date(video.createdOn).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>

            {/* Prompt Section */}
            <div className="bg-gray-900 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                PROMPT
              </h3>
              <p className="text-gray-300 leading-relaxed">{video.prompt}</p>

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
              <button onClick={handleLike} className="flex items-center gap-3 w-full">
                <FaHeart
                  className={`text-2xl ${liked ? "text-red-500" : "text-gray-600"}`}
                />
                <div className="text-left">
                  <p className="text-2xl font-bold">{likeCount}</p>
                  <p className="text-sm text-gray-400">{likeCount} TOTAL LIKES</p>
                </div>
              </button>
            </div>

            {/* Model/Tool Section */}
            <div className="bg-gray-900 rounded-2xl p-6 space-y-2">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                MODEL OR TOOL
              </h3>
              <p className="text-white font-semibold">{video.model}</p>
            </div>

            {/* Tags Section */}
            <div className="bg-gray-900 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                TAGS
              </h3>
              <div className="flex flex-wrap gap-2">
                {video.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-800 text-gray-300 px-4 py-2 rounded-full text-sm font-medium capitalize"
                  >
                    {tag.replace("-", " / ")}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="bg-gray-900 rounded-2xl p-6 space-y-2">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                STATISTICS
              </h3>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-2xl font-bold text-cyan-400">
                    {video.copiedCount}
                  </p>
                  <p className="text-sm text-gray-400">Times Copied</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-400">
                    {video.type.toUpperCase()}
                  </p>
                  <p className="text-sm text-gray-400">Access Type</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
