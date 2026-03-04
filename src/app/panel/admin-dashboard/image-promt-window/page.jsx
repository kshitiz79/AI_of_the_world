"use client";
import React, { useState, useEffect } from "react";
import { FaImage, FaUpload, FaTag, FaCloudUploadAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { imagesAPI, tagsAPI } from "@/api";

export default function ImagePromptWindowPage() {
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
      if (!file.type.startsWith('image/')) {
        setError("Please select a valid image file");
        return;
      }
      
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
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
    
    if (!selectedFile) {
      setError("Please select an image file");
      return;
    }

    if (!projectTitle || !prompt || !creatorCredit) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      setUploading(true);
      setError("");

      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("project_title", projectTitle);
      formData.append("prompt", prompt);
      formData.append("technical_notes", technicalNotes);
      formData.append("model_or_tool", modelOrTool);
      formData.append("creator_credit", creatorCredit);
      formData.append("tags", selectedTags.join(","));

      const response = await imagesAPI.uploadImage(formData);

      if (response.success) {
        setSuccess("Image uploaded successfully! It's now pending review.");
        // Reset form
        setProjectTitle("");
        setPrompt("");
        setTechnicalNotes("");
        setModelOrTool("");
        setCreatorCredit("");
        setSelectedFile(null);
        setPreviewUrl("");
        setSelectedTags([]);
        
        setTimeout(() => {
          setSuccess("");
        }, 5000);
      }
    } catch (err) {
      setError(err.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <FaImage className="text-cyan-500" />
            Upload AI Image
          </h1>
          <p className="text-gray-400">
            Share your AI-generated artwork with the community
          </p>
        </div>

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
              {/* Left Column - Image Upload */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Artwork Upload *
                  </label>
                  <div className="border-2 border-dashed border-gray-700 rounded-xl p-8 text-center hover:border-cyan-600 transition-colors cursor-pointer relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      required
                    />
                    {previewUrl ? (
                      <div className="space-y-4">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="max-h-64 mx-auto rounded-lg"
                        />
                        <p className="text-sm text-gray-400">
                          {selectedFile?.name}
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedFile(null);
                            setPreviewUrl("");
                          }}
                          className="text-cyan-500 hover:text-cyan-400 text-sm"
                        >
                          Change Image
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-gray-950 rounded-full flex items-center justify-center">
                          <FaCloudUploadAlt className="text-3xl text-cyan-500" />
                        </div>
                        <div>
                          <p className="text-lg font-semibold mb-1">
                            Drop your image here
                          </p>
                          <p className="text-sm text-gray-400">
                            or click to browse
                          </p>
                        </div>
                        <p className="text-xs text-gray-500">
                          Supports: JPG, PNG, WEBP (Max 100MB)
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Tags Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    <FaTag className="inline mr-2" />
                    Tags (Select all that apply)
                  </label>
                  {loading ? (
                    <p className="text-gray-500">Loading tags...</p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {availableTags.map((tag) => (
                        <button
                          key={tag.id}
                          type="button"
                          onClick={() => handleTagToggle(tag.id)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
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

              {/* Right Column - Form Fields */}
              <div className="space-y-6">
                {/* Project Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    placeholder="e.g., Cyberpunk City at Night"
                    className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-600"
                    required
                  />
                </div>

                {/* Prompt */}
                <div>
                  <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    AI Prompt Used *
                  </label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the prompt you used to generate this image..."
                    rows={4}
                    className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-600 resize-none"
                    required
                  />
                </div>

                {/* Technical Notes */}
                <div>
                  <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Technical Notes (Optional)
                  </label>
                  <textarea
                    value={technicalNotes}
                    onChange={(e) => setTechnicalNotes(e.target.value)}
                    placeholder="Any technical details, settings, or parameters used..."
                    rows={3}
                    className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-600 resize-none"
                  />
                </div>

                {/* Model/Tool */}
                <div>
                  <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    AI Model/Tool (Optional)
                  </label>
                  <input
                    type="text"
                    value={modelOrTool}
                    onChange={(e) => setModelOrTool(e.target.value)}
                    placeholder="e.g., Midjourney, DALL-E, Stable Diffusion"
                    className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-600"
                  />
                </div>

                {/* Creator Credit */}
                <div>
                  <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Creator Credit *
                  </label>
                  <input
                    type="text"
                    value={creatorCredit}
                    onChange={(e) => setCreatorCredit(e.target.value)}
                    placeholder="Your name or handle (e.g., @username)"
                    className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-600"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-end gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={uploading}
                className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 disabled:from-gray-700 disabled:to-gray-700 text-white font-bold rounded-lg transition-all duration-300 flex items-center gap-2 disabled:cursor-not-allowed"
              >
                {uploading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Uploading...
                  </>
                ) : (
                  <>
                    <FaUpload />
                    Upload Image
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Info Box */}
        <div className="mt-6 bg-gradient-to-r from-cyan-950/30 to-purple-950/30 border border-cyan-800/50 rounded-xl p-4">
          <h3 className="font-semibold mb-2 text-cyan-400">💡 Upload Tips</h3>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>• Your submission will be reviewed by our team before being published</li>
            <li>• Include detailed prompts to help others learn from your work</li>
            <li>• Select relevant tags to make your artwork more discoverable</li>
            <li>• Give proper credit to yourself or the original creator</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
