"use client";
import React from "react";
import { FaUsers, FaImage, FaVideo, FaCheckCircle, FaTag } from "react-icons/fa";
import { MdGif } from "react-icons/md";

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-400 mb-8">Manage users and review submitted prompts</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-6">
            <FaUsers className="text-3xl mb-3" />
            <div className="text-3xl font-bold mb-1">0</div>
            <div className="text-sm opacity-90">Total Users</div>
          </div>
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6">
            <FaImage className="text-3xl mb-3" />
            <div className="text-3xl font-bold mb-1">0</div>
            <div className="text-sm opacity-90">Pending Images</div>
          </div>
          <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl p-6">
            <MdGif className="text-4xl mb-3" />
            <div className="text-3xl font-bold mb-1">0</div>
            <div className="text-sm opacity-90">Pending GIFs</div>
          </div>
          <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl p-6">
            <FaVideo className="text-3xl mb-3" />
            <div className="text-3xl font-bold mb-1">0</div>
            <div className="text-sm opacity-90">Pending Videos</div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <a href="/panel/admin-dashboard/all-users" className="block bg-gray-800 hover:bg-gray-700 rounded-lg p-4 transition-colors">
                <div className="flex items-center gap-3">
                  <FaUsers className="text-2xl text-blue-500" />
                  <div>
                    <div className="font-semibold">Manage Users</div>
                    <div className="text-sm text-gray-400">View and manage all users</div>
                  </div>
                </div>
              </a>
              <a href="/panel/admin-dashboard/verify-creator-promt" className="block bg-gray-800 hover:bg-gray-700 rounded-lg p-4 transition-colors">
                <div className="flex items-center gap-3">
                  <FaCheckCircle className="text-2xl text-green-500" />
                  <div>
                    <div className="font-semibold">Verify Creator Prompts</div>
                    <div className="text-sm text-gray-400">Review and approve submissions</div>
                  </div>
                </div>
              </a>
              <a href="/panel/admin-dashboard/manage-tags" className="block bg-gray-800 hover:bg-gray-700 rounded-lg p-4 transition-colors">
                <div className="flex items-center gap-3">
                  <FaTag className="text-2xl text-yellow-500" />
                  <div>
                    <div className="font-semibold">Manage Tags</div>
                    <div className="text-sm text-gray-400">Create, edit, and organize tags</div>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4">Review Prompts</h2>
            <div className="space-y-3">
              <a href="/panel/admin-dashboard/image-promt-window" className="block bg-gray-800 hover:bg-gray-700 rounded-lg p-4 transition-colors">
                <div className="flex items-center gap-3">
                  <FaImage className="text-2xl text-cyan-500" />
                  <div>
                    <div className="font-semibold">Image Prompts</div>
                    <div className="text-sm text-gray-400">Review image submissions</div>
                  </div>
                </div>
              </a>
              <a href="/panel/admin-dashboard/gif-promt-window" className="block bg-gray-800 hover:bg-gray-700 rounded-lg p-4 transition-colors">
                <div className="flex items-center gap-3">
                  <MdGif className="text-3xl text-purple-500" />
                  <div>
                    <div className="font-semibold">GIF Prompts</div>
                    <div className="text-sm text-gray-400">Review GIF submissions</div>
                  </div>
                </div>
              </a>
              <a href="/panel/admin-dashboard/video-promt-window" className="block bg-gray-800 hover:bg-gray-700 rounded-lg p-4 transition-colors">
                <div className="flex items-center gap-3">
                  <FaVideo className="text-2xl text-pink-500" />
                  <div>
                    <div className="font-semibold">Video Prompts</div>
                    <div className="text-sm text-gray-400">Review video submissions</div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
