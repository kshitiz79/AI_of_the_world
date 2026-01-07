"use client";
import React from "react";

export default function VerifyCreatorPromptPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Verify Creator Prompts</h1>
        <p className="text-gray-400 mb-8">Review and verify creator submissions</p>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center">
          <p className="text-gray-400">No prompts pending verification</p>
        </div>
      </div>
    </div>
  );
}
