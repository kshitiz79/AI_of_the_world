"use client";
import React, { useState } from "react";
import { FaImage, FaVideo } from "react-icons/fa";
import { MdGif } from "react-icons/md";

export default function YourContributionsPage() {
  const [sortBy, setSortBy] = useState("recent");
  const stats = {
    promptsShared: 0,
    totalLikes: 0,
    avgPromptLength: 0,
    totalImages: 0,
    totalGifs: 0,
    totalVideos: 0,
  };

  return (
    <div className="text-white">
      <div className="bg-gray-black border border-gray-800 rounded-2xl p-8 mb-6">
        <div className="inline-block px-3 py-1 bg-gray-800 rounded-full text-xs font-semibold text-gray-300 mb-4">
          WELCOME BACK
        </div>
        <h1 className="text-4xl font-bold mb-4">Keep inspiring the gallery</h1>
        <p className="text-gray-400 mb-8">
          Share your first prompt to teach the community how you unlock cinematic frames.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-950 border border-gray-700 rounded-xl p-6">
            <div className="text-4xl font-bold mb-2">{stats.promptsShared}</div>
            <div className="text-sm text-gray-400">Prompts shared</div>
          </div>
          <div className="bg-gray-950  border border-gray-700 rounded-xl p-6">
            <div className="text-4xl font-bold mb-2">{stats.totalLikes}</div>
            <div className="text-sm text-gray-400">Total likes</div>
          </div>
          <div className="bg-gray-950  border border-gray-700 rounded-xl p-6">
            <div className="text-4xl font-bold mb-2">{stats.avgPromptLength} words</div>
            <div className="text-sm text-gray-400">Avg prompt length</div>
          </div>
        </div>
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
          <div className="bg-gray-950  border border-gray-700 rounded-xl p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
              <MdGif className="text-3xl" />
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.totalGifs}</div>
              <div className="text-sm text-gray-400">GIFs uploaded</div>
            </div>
          </div>
          <div className="bg-gray-950  border border-gray-700 rounded-xl p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center">
              <FaVideo className="text-xl" />
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.totalVideos}</div>
              <div className="text-sm text-gray-400">Videos uploaded</div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="bg-white hover:bg-gray-200 text-black font-semibold px-6 py-3 rounded-lg transition-colors">
            Share a new prompt
          </button>
          <button className="bg-gray-950  hover:bg-gray-950 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
            View profile
          </button>
          <button className="bg-gray-950  hover:bg-gray-950 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
            Explore community feed
          </button>
        </div>
      </div>
      <div className="bg-black border border-gray-800 rounded-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Prompt library</h2>
            <p className="text-gray-400 text-sm">
              You have not published any prompts yet. Upload your first artwork to get started.
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
        <div className="bg-black border border-gray-700 rounded-xl p-12 text-center">
          <h3 className="text-xl font-bold mb-3">You haven't shared any prompts yet</h3>
          <p className="text-gray-400 mb-6">
            Upload your first artwork on the submit page and it will appear here.
          </p>
          <button className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
            Share your first prompt
          </button>
        </div>
      </div>
    </div>
  );
}
