"use client";
import React, { useState } from "react";
import { FaImage, FaVideo, FaUpload } from "react-icons/fa";
import { MdGif } from "react-icons/md";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function ImagePromptWindowPage() {
  const router = useRouter();
  const [contentType, setContentType] = useState("image");
  const [projectTitle, setProjectTitle] = useState("");
  const [prompt, setPrompt] = useState("");
  const [technicalNotes, setTechnicalNotes] = useState("");
  const [modelOrTool, setModelOrTool] = useState("");
  const [creatorCredit, setCreatorCredit] = useState("");
  const [tags, setTags] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const handleTabChange = (type) => {
    setContentType(type);
    if (type === "gif") {
      router.push("/panel/admin-dashboard/gif-promt-window");
    } else if (type === "video") {
      router.push("/panel/admin-dashboard/video-promt-window");
    }
  };

  const handleSubmit = () => {
    console.log("Submitting...", { contentType, projectTitle, prompt });
  };

  return (
    <div className={cn('min-h-screen', 'bg-black', 'text-white', 'p-8')}>
      <div className={cn('max-w-7xl', 'mx-auto')}>
        <h1 className={cn('text-4xl', 'font-bold', 'mb-2')}>Prompt Review</h1>
        <p className={cn('text-gray-400', 'mb-8')}>Review and approve submissions</p>

        {/* Content Type Tabs */}
        <div className={cn('flex', 'gap-2', 'mb-8')}>
          <button
            onClick={() => handleTabChange("image")}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              contentType === "image"
                ? "bg-white text-black"
                : "bg-gray-900 text-gray-400 hover:bg-gray-700"
            }`}
          >
            <FaImage />
            Image
          </button>
          <button
            onClick={() => handleTabChange("gif")}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              contentType === "gif"
                ? "bg-white text-black"
                : "bg-gray-900 text-gray-400 hover:bg-gray-700"
            }`}
          >
            <MdGif className="text-2xl" />
            GIF
          </button>
          <button
            onClick={() => handleTabChange("video")}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              contentType === "video"
                ? "bg-white text-black"
                : "bg-gray-900 text-gray-400 hover:bg-gray-700"
            }`}
          >
            <FaVideo />
            Video
          </button>
        </div>

        <div className={cn('bg-black', 'border', 'border-gray-800', 'rounded-2xl', 'p-8')}>
          <div className={cn('grid', 'grid-cols-1', 'lg:grid-cols-2', 'gap-8')}>
            {/* Left Column */}
            <div className="space-y-6">
              {/* Artwork Upload */}
              <div>
                <label className={cn('block', 'text-sm', 'font-semibold', 'text-gray-400', 'uppercase', 'tracking-wider', 'mb-3')}>
                  ARTWORK UPLOAD
                </label>
                <div className={cn('border-2', 'border-dashed', 'border-gray-700', 'rounded-xl', 'p-12', 'text-center', 'hover:border-gray-600', 'transition-colors', 'cursor-pointer')}>
                  <div className={cn('flex', 'flex-col', 'items-center', 'gap-4')}>
                    <div className={cn('w-16', 'h-16', 'bg-gray-950', 'rounded-full', 'flex', 'items-center', 'justify-center')}>
                      <FaUpload className={cn('text-2xl', 'text-gray-400')} />
                    </div>
                    <div>
                      <p className={cn('text-gray-300', 'mb-1')}>Drag an image here or click to upload your AI-generated artwork.</p>
                      <p className={cn('text-xs', 'text-gray-500', 'mt-2')}>PNG, JPG, OR WEBP • MAX 10MB</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Title */}
              <div>
                <label className={cn('block', 'text-sm', 'font-semibold', 'text-gray-400', 'uppercase', 'tracking-wider', 'mb-3')}>
                  PROJECT TITLE <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  placeholder="Add a short name for this prompt"
                  maxLength={100}
                  className={cn('w-full', 'bg-gray-950', 'border', 'border-gray-700', 'rounded-lg', 'px-4', 'py-3', 'text-white', 'placeholder-gray-500', 'focus:outline-none', 'focus:border-cyan-600')}
                />
                <p className={cn('text-xs', 'text-gray-500', 'mt-1', 'text-right')}>
                  {projectTitle.length}/100
                </p>
              </div>

              {/* Model or Tool */}
              <div>
                <label className={cn('block', 'text-sm', 'font-semibold', 'text-gray-400', 'uppercase', 'tracking-wider', 'mb-3')}>
                  MODEL OR TOOL
                </label>
                <input
                  type="text"
                  value={modelOrTool}
                  onChange={(e) => setModelOrTool(e.target.value)}
                  placeholder="e.g., Midjourney, Nano Banana"
                  className={cn('w-full', 'bg-gray-950', 'border', 'border-gray-700', 'rounded-lg', 'px-4', 'py-3', 'text-white', 'placeholder-gray-500', 'focus:outline-none', 'focus:border-cyan-600')}
                />
              </div>

              {/* Creator Credit */}
              <div>
                <label className={cn('block', 'text-sm', 'font-semibold', 'text-gray-400', 'uppercase', 'tracking-wider', 'mb-3')}>
                  CREATOR CREDIT <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={creatorCredit}
                  onChange={(e) => setCreatorCredit(e.target.value)}
                  placeholder="@handle or studio name"
                  className={cn('w-full', 'bg-gray-950', 'border', 'border-gray-700', 'rounded-lg', 'px-4', 'py-3', 'text-white', 'placeholder-gray-500', 'focus:outline-none', 'focus:border-cyan-600')}
                />
              </div>

              {/* Tags */}
              <div>
                <label className={cn('block', 'text-sm', 'font-semibold', 'text-gray-400', 'uppercase', 'tracking-wider', 'mb-3')}>
                  TAGS
                </label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Add tags"
                  className={cn('w-full', 'bg-gray-950', 'border', 'border-gray-700', 'rounded-lg', 'px-4', 'py-3', 'text-white', 'placeholder-gray-500', 'focus:outline-none', 'focus:border-cyan-600')}
                />
                <p className={cn('text-xs', 'text-gray-500', 'mt-2')}>
                  {selectedTags.length} selected • Mix style, mood, and theme tags to help the
                  community discover your art.
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Prompt */}
              <div>
                <label className={cn('block', 'text-sm', 'font-semibold', 'text-gray-400', 'uppercase', 'tracking-wider', 'mb-3')}>
                  PROMPT <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Paste the exact text prompt you used, including camera notes, seeds, or guidance strength."
                  rows={8}
                  className={cn('w-full', 'bg-gray-950', 'border', 'border-gray-700', 'rounded-lg', 'px-4', 'py-3', 'text-white', 'placeholder-gray-500', 'focus:outline-none', 'focus:border-cyan-600', 'resize-none')}
                />
              </div>

              {/* Technical Notes */}
              <div>
                <label className={cn('block', 'text-sm', 'font-semibold', 'text-gray-400', 'uppercase', 'tracking-wider', 'mb-3')}>
                  STORY OR TECHNICAL NOTES (OPTIONAL)
                </label>
                <textarea
                  value={technicalNotes}
                  onChange={(e) => setTechnicalNotes(e.target.value)}
                  placeholder="Share settings, inspiration, or post-processing steps so others can learn faster."
                  rows={8}
                  className={cn('w-full', 'bg-gray-950', 'border', 'border-gray-700', 'rounded-lg', 'px-4', 'py-3', 'text-white', 'placeholder-gray-500', 'focus:outline-none', 'focus:border-cyan-600', 'resize-none')}
                />
              </div>

              {/* What happens next */}
              <div className={cn('bg-gray-950', 'border', 'border-gray-700', 'rounded-lg', 'p-4')}>
                <h3 className={cn('font-semibold', 'mb-2')}>What happens next?</h3>
                <p className={cn('text-sm', 'text-gray-400')}>
                  Your submission will be reviewed and published to the gallery. We'll feature the
                  best prompts and credit you as the creator.
                </p>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className={cn('w-full', 'bg-white', 'hover:bg-gray-200', 'text-black', 'font-bold', 'py-4', 'rounded-lg', 'transition-colors')}
              >
                Submit to gallery
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
