"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaImage, FaVideo, FaUpload, FaTimes, FaCheck, FaTag } from "react-icons/fa";
import { MdGif } from "react-icons/md";
import { API_ENDPOINTS } from "@/api/config";

export default function ShareYourPromptPage() {
  const router = useRouter();
  const [contentType, setContentType] = useState("image");
  const [projectTitle, setProjectTitle] = useState("");
  const [prompt, setPrompt] = useState("");
  const [technicalNotes, setTechnicalNotes] = useState("");
  const [modelOrTool, setModelOrTool] = useState("");
  const [creatorCredit, setCreatorCredit] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [availableTags, setAvailableTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch available tags on mount
  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.TAGS);
      const data = await response.json();
      if (data.success && data.data) {
        setAvailableTags(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch tags:", err);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = {
      image: ["image/png", "image/jpeg", "image/jpg", "image/webp"],
      gif: ["image/gif"],
      video: ["video/mp4", "video/quicktime", "video/webm"],
    };

    if (!validTypes[contentType].includes(file.type)) {
      setError(`Invalid file type. Please upload a ${getFileTypes()}`);
      return;
    }

    // Validate file size
    const maxSizes = {
      image: 10 * 1024 * 1024, // 10MB
      gif: 20 * 1024 * 1024, // 20MB
      video: 100 * 1024 * 1024, // 100MB
    };

    if (file.size > maxSizes[contentType]) {
      setError(`File too large. Maximum size is ${getFileTypes()}`);
      return;
    }

    setSelectedFile(file);
    setError("");

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setFilePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const fakeEvent = { target: { files: [file] } };
      handleFileChange(fakeEvent);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const removeFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
  };

  const removeTag = (tagId) => {
    setSelectedTags(selectedTags.filter((t) => t.id !== tagId));
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    // Validation
    if (!selectedFile) {
      setError("Please upload a file");
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

    setLoading(true);
    setUploadProgress(0);

    try {
      // Get auth token
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("Please login to upload");
        setLoading(false);
        return;
      }

      // Create FormData
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("title", projectTitle);
      formData.append("prompt", prompt);
      formData.append("description", technicalNotes);
      formData.append("model_used", modelOrTool);
      formData.append("creator_credit", creatorCredit);
      
      // Add tag IDs
      selectedTags.forEach((tag) => {
        formData.append("tag_ids[]", tag.id);
      });

      // Determine upload endpoint
      let uploadEndpoint;
      switch (contentType) {
        case "gif":
          uploadEndpoint = API_ENDPOINTS.GIFS_UPLOAD;
          break;
        case "video":
          uploadEndpoint = API_ENDPOINTS.VIDEOS_UPLOAD;
          break;
        default:
          uploadEndpoint = API_ENDPOINTS.IMAGES_UPLOAD;
      }

      // Upload with progress
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) {
          const percentComplete = (e.loaded / e.total) * 100;
          setUploadProgress(Math.round(percentComplete));
        }
      });

      xhr.addEventListener("load", () => {
        if (xhr.status === 200 || xhr.status === 201) {
          const data = JSON.parse(xhr.responseText);
          setSuccess("Upload successful! Your content will be reviewed and published soon.");
          
          // Reset form
          setTimeout(() => {
            setProjectTitle("");
            setPrompt("");
            setTechnicalNotes("");
            setModelOrTool("");
            setCreatorCredit("");
            setSelectedFile(null);
            setFilePreview(null);
            setSelectedTags([]);
            setUploadProgress(0);
            setSuccess("");
            
            // Redirect to contributions page
            router.push("/panel/your-dashboard/your-contributions");
          }, 2000);
        } else {
          const data = JSON.parse(xhr.responseText);
          setError(data.error || "Upload failed. Please try again.");
        }
        setLoading(false);
      });

      xhr.addEventListener("error", () => {
        setError("Upload failed. Please check your connection and try again.");
        setLoading(false);
      });

      xhr.open("POST", uploadEndpoint);
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
      xhr.send(formData);
    } catch (err) {
      setError(err.message || "Upload failed. Please try again.");
      setLoading(false);
    }
  };

  const getUploadText = () => {
    switch (contentType) {
      case "gif":
        return "Drag a GIF here or click to upload your AI-generated animation.";
      case "video":
        return "Drag a video here or click to upload your AI-generated video.";
      default:
        return "Drag an image here or click to upload your AI-generated artwork.";
    }
  };

  const getFileTypes = () => {
    switch (contentType) {
      case "gif":
        return "GIF • MAX 20MB";
      case "video":
        return "MP4, MOV, WEBM • MAX 100MB";
      default:
        return "PNG, JPG, OR WEBP • MAX 10MB";
    }
  };

  return (
    <div className="text-white">
      <div className="mb-8">
        <div className="inline-block px-3 py-1 bg-gray-950 rounded-full text-xs font-semibold text-gray-300 mb-4">
          SHARE YOUR PROMPT
        </div>
        <h1 className="text-4xl font-bold mb-4">
          Share your AI-generated images
          <br />
          and videos with the community.
        </h1>
        <p className="text-gray-400">
          Upload your AI artwork or video, share the prompt that created it, and help others learn from your techniques.
        </p>
      </div>

      {/* Error/Success Messages */}
      {error && (
        <div className="bg-red-950/50 border border-red-800 rounded-lg p-4 mb-6">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}
      {success && (
        <div className="bg-green-950/50 border border-green-800 rounded-lg p-4 mb-6 flex items-center gap-3">
          <FaCheck className="text-green-400" />
          <p className="text-green-400 text-sm">{success}</p>
        </div>
      )}

      <div className="bg-black border border-gray-800 rounded-2xl p-8">
        {/* Content Type Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => {
              setContentType("image");
              removeFile();
            }}
            disabled={loading}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              contentType === "image"
                ? "bg-white text-black"
                : "bg-gray-900 text-gray-400 hover:bg-gray-700"
            } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <FaImage />
            Image
          </button>
          <button
            onClick={() => {
              setContentType("gif");
              removeFile();
            }}
            disabled={loading}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              contentType === "gif"
                ? "bg-white text-black"
                : "bg-gray-900 text-gray-400 hover:bg-gray-700"
            } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <MdGif className="text-2xl" />
            GIF
          </button>
          <button
            onClick={() => {
              setContentType("video");
              removeFile();
            }}
            disabled={loading}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              contentType === "video"
                ? "bg-white text-black"
                : "bg-gray-900 text-gray-400 hover:bg-gray-700"
            } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <FaVideo />
            Video
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Artwork Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                ARTWORK UPLOAD
              </label>
              
              {!selectedFile ? (
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className="border-2 border-dashed border-gray-700 rounded-xl p-12 text-center hover:border-cyan-600 transition-colors cursor-pointer relative"
                >
                  <input
                    type="file"
                    accept={
                      contentType === "image"
                        ? "image/png,image/jpeg,image/jpg,image/webp"
                        : contentType === "gif"
                        ? "image/gif"
                        : "video/mp4,video/quicktime,video/webm"
                    }
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    disabled={loading}
                  />
                  <div className="flex flex-col items-center gap-4 pointer-events-none">
                    <div className="w-16 h-16 bg-gray-950 rounded-full flex items-center justify-center">
                      <FaUpload className="text-2xl text-gray-400" />
                    </div>
                    <div>
                      <p className="text-gray-300 mb-1">{getUploadText()}</p>
                      <p className="text-xs text-gray-500 mt-2">{getFileTypes()}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative border-2 border-cyan-600 rounded-xl overflow-hidden">
                  {contentType === "video" ? (
                    <video src={filePreview} controls className="w-full h-64 object-cover" />
                  ) : (
                    <img src={filePreview} alt="Preview" className="w-full h-64 object-cover" />
                  )}
                  <button
                    onClick={removeFile}
                    disabled={loading}
                    className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors"
                  >
                    <FaTimes />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-2">
                    <p className="text-xs text-gray-300 truncate">{selectedFile.name}</p>
                    <p className="text-xs text-gray-500">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              )}

              {/* Upload Progress */}
              {loading && uploadProgress > 0 && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Uploading...</span>
                    <span className="text-cyan-400">{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-cyan-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}
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
                disabled={loading}
                className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-600 disabled:opacity-50"
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
                placeholder="e.g., Midjourney, DALL-E, Stable Diffusion"
                disabled={loading}
                className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-600 disabled:opacity-50"
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
                placeholder="@handle or studio name"
                disabled={loading}
                className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-600 disabled:opacity-50"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                <FaTag className="inline mr-2" />
                TAGS (Select all that apply)
              </label>
              
              {/* Selected Tags Display */}
              {selectedTags.length > 0 && (
                <div className="mb-4 p-3 bg-gray-950 border border-cyan-800 rounded-lg">
                  <p className="text-xs text-gray-400 mb-2">Selected Tags:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedTags.map((tag) => (
                      <div
                        key={tag.id}
                        className="bg-cyan-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
                      >
                        {tag.name}
                        <button
                          onClick={() => removeTag(tag.id)}
                          disabled={loading}
                          className="hover:text-cyan-100"
                        >
                          <FaTimes className="text-xs" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Available Tags - Clickable Buttons */}
              <div className="bg-gray-950 border border-gray-700 rounded-lg p-4 max-h-64 overflow-y-auto">
                {availableTags.length === 0 ? (
                  <p className="text-gray-500 text-sm">Loading tags...</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {availableTags.map((tag) => {
                      const isSelected = selectedTags.find((t) => t.id === tag.id);
                      return (
                        <button
                          key={tag.id}
                          type="button"
                          onClick={() => {
                            if (isSelected) {
                              removeTag(tag.id);
                            } else {
                              setSelectedTags([...selectedTags, tag]);
                            }
                          }}
                          disabled={loading}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                            isSelected
                              ? "bg-cyan-600 text-white"
                              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                          } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                          {tag.name}
                          {tag.usage_count > 0 && (
                            <span className="ml-1 text-xs opacity-70">({tag.usage_count})</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
              
              <p className="text-xs text-gray-500 mt-2">
                {selectedTags.length} selected • Click tags to select or deselect them
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Prompt */}
            <div>
              <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                PROMPT <span className="text-red-500">*</span>
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Paste the exact text prompt you used, including camera notes, seeds, or guidance strength."
                rows={8}
                disabled={loading}
                className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-600 resize-none disabled:opacity-50"
              />
            </div>

            {/* Technical Notes */}
            <div>
              <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                STORY OR TECHNICAL NOTES (OPTIONAL)
              </label>
              <textarea
                value={technicalNotes}
                onChange={(e) => setTechnicalNotes(e.target.value)}
                placeholder="Share settings, inspiration, or post-processing steps so others can learn faster."
                rows={8}
                disabled={loading}
                className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-600 resize-none disabled:opacity-50"
              />
            </div>

            {/* What happens next */}
            <div className="bg-gray-950 border border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold mb-2">What happens next?</h3>
              <p className="text-sm text-gray-400">
                Your submission will be reviewed and published to the gallery. We'll feature the
                best prompts and credit you as the creator.
              </p>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading || !selectedFile || !projectTitle || !prompt || !creatorCredit}
              className="w-full bg-white hover:bg-gray-200 text-black font-bold py-4 rounded-lg transition-colors disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed"
            >
              {loading ? "Uploading..." : "Submit to gallery"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
