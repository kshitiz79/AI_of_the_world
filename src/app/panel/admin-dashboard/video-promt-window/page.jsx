"use client";
import React, { useState, useEffect } from "react";
import { FaUpload, FaCloudUploadAlt } from "react-icons/fa";
import { MdVideoLibrary } from "react-icons/md";
import { useRouter } from "next/navigation";
import { videosAPI, tagsAPI } from "@/api";

export default function VideoPromptWindowPage() {
  const router = useRouter();
  const [projectTitle, setProjectTitle] = useState("");
  const [prompt, setPrompt] = useState("");
  const [technicalNotes, setTechnicalNotes] = useState("");
  const [modelOrTool, setModelOrTool] = useState("");
  const [creatorCredit, setCreatorCredit] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [availableTags, setAvailableTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch tags on component mount
  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      setLoading(true);
      const response = await tagsAPI.getAllTags();
      if (response.success) {
        setAvailableTags(response.data);
      }
    } catch (err) {
      console.error("Failed to fetch tags:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('video/')) {
        setError("Please select a valid video file");
        return;
      }
      
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError("");
    }
  };

  const handleTagToggle = (tagId) => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!selectedFile) {
      setError("Please select a video file");
      return;
    }
    if (!projectTitle.trim()) {
      setError("Project title is required");
      return;
    }
    if (!prompt.trim()) {
      setError("Prompt is required");
      return;
    }
    if (!creatorCredit.trim()) {
      setError("Creator credit is required");
      return;
    }

    try {
      setUploading(true);
      setError("");

      // Create FormData
      const formData = new FormData();
      formData.append('video', selectedFile);
      formData.append('project_title', projectTitle);
      formData.append('prompt', prompt);
      formData.append('technical_notes', technicalNotes);
      formData.append('model_or_tool', modelOrTool);
      formData.append('creator_credit', creatorCredit);
      formData.append('tags', selectedTags.join(','));

      // Upload
      const response = await videosAPI.uploadVideo(formData);
      
      if (response.success) {
        setSuccess("Video uploaded successfully! It's now pending review.");
        // Reset form
        setProjectTitle("");
        setPrompt("");
        setTechnicalNotes("");
        setModelOrTool("");
        setCreatorCredit("");
        setSelectedFile(null);
        setPreviewUrl("");
        setSelectedTags([]);
        
        setTimeout(() => setSuccess(""), 5000);
      }
    } catch (err) {
      setError(err.message || "Failed to upload video");
    } finally {
      setUploading(false);
    }
  };

  const handleCancel = () => {
    setProjectTitle("");
    setPrompt("");
    setTechnicalNotes("");
    setModelOrTool("");
    setCreatorCredit("");
    setSelectedFile(null);
    setPreviewUrl("");
    setSelectedTags([]);
    setError("");
    setSuccess("");
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Video Prompt Upload</h1>
        <p className="text-gray-400 mb-8">Upload your AI-generated videos</p>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 bg-green-950/50 border border-green-800 rounded-lg p-4">
            <p className="text-green-400">{success}</p>
          </div>
        )}
        {error && (
          <div className="mb-6 bg-red-950/50 border border-red-800 rounded-lg p-4">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="bg-black border border-gray-800 rounded-2xl p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Video Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    VIDEO UPLOAD <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-700 rounded-xl p-12 text-center hover:border-cyan-600 transition-colors cursor-pointer relative">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    {previewUrl ? (
                      <div className="space-y-4">
                        <video src={previewUrl} controls className="max-h-64 mx-auto rounded-lg" />
                        <p className="text-sm text-gray-400">{selectedFile?.name}</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-cyan-600 to-purple-600 rounded-full flex items-center justify-center">
                          <FaCloudUploadAlt className="text-2xl text-white" />
                        </div>
                        <div>
                          <p className="text-gray-300 mb-1">Drag a video here or click to upload</p>
                          <p className="text-xs text-gray-500 mt-2">MP4, MOV, AVI • MAX 100MB</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Project Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    PROJECT TITLE <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    placeholder="Add a short name for this prompt"
                    maxLength={100}
                    className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-600"
                  />
                  <p className="text-xs text-gray-500 mt-1 text-right">
                    {projectTitle.length}/100
                  </p>
                </div>

                {/* Model or Tool */}
                <div>
                  <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    MODEL OR TOOL
                  </label>
                  <input
                    type="text"
                    value={modelOrTool}
                    onChange={(e) => setModelOrTool(e.target.value)}
                    placeholder="e.g., Runway Gen-2, Pika Labs"
                    className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-600"
                  />
                </div>

                {/* Creator Credit */}
                <div>
                  <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    CREATOR CREDIT <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={creatorCredit}
                    onChange={(e) => setCreatorCredit(e.target.value)}
                    placeholder="Your name or username"
                    className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-600"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* AI Prompt */}
                <div>
                  <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    AI PROMPT <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Paste the exact prompt you used to generate this video"
                    rows={6}
                    maxLength={2000}
                    className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-600 resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1 text-right">
                    {prompt.length}/2000
                  </p>
                </div>

                {/* Technical Notes */}
                <div>
                  <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    TECHNICAL NOTES
                  </label>
                  <textarea
                    value={technicalNotes}
                    onChange={(e) => setTechnicalNotes(e.target.value)}
                    placeholder="Settings, parameters, or workflow details"
                    rows={4}
                    maxLength={1000}
                    className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-600 resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1 text-right">
                    {technicalNotes.length}/1000
                  </p>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    TAGS (OPTIONAL)
                  </label>
                  {loading ? (
                    <p className="text-gray-500">Loading tags...</p>
                  ) : (
                    <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-2 bg-gray-950 rounded-lg border border-gray-700">
                      {availableTags.map((tag) => (
                        <button
                          key={tag.id}
                          type="button"
                          onClick={() => handleTagToggle(tag.id)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            selectedTags.includes(tag.id)
                              ? "bg-cyan-600 text-white"
                              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                          }`}
                        >
                          {tag.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8 pt-6 border-t border-gray-800">
              <button
                type="button"
                onClick={handleCancel}
                disabled={uploading}
                className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={uploading}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 text-white rounded-lg hover:from-cyan-500 hover:to-purple-500 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {uploading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <FaUpload />
                    <span>Upload Video</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
