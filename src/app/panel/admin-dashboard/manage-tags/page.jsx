"use client";
import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaTimes, FaCheck, FaTag } from "react-icons/fa";
import { tagsAPI } from "@/api";

export default function ManageTagsPage() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTagName, setNewTagName] = useState("");
  const [newTagCategory, setNewTagCategory] = useState("Style");
  const [editingTag, setEditingTag] = useState(null);
  const [editTagName, setEditTagName] = useState("");
  const [editTagCategory, setEditTagCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const categories = ["Style", "Mood", "Theme", "Technique", "Color", "Other"];

  // Fetch tags on component mount
  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      setLoading(true);
      const response = await tagsAPI.getAllTags();
      if (response.success) {
        setTags(response.data);
      }
    } catch (err) {
      setError("Failed to fetch tags: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTag = async () => {
    if (newTagName.trim() === "") {
      setError("Please enter a tag name");
      return;
    }

    try {
      const response = await tagsAPI.createTag({
        name: newTagName.trim(),
        category: newTagCategory,
      });

      if (response.success) {
        setSuccess("Tag created successfully!");
        setNewTagName("");
        setNewTagCategory("Style");
        fetchTags(); // Refresh the list
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleDeleteTag = async (id) => {
    if (!confirm("Are you sure you want to delete this tag?")) return;

    try {
      const response = await tagsAPI.deleteTag(id);
      if (response.success) {
        setSuccess("Tag deleted successfully!");
        fetchTags(); // Refresh the list
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleEditTag = (tag) => {
    setEditingTag(tag.id);
    setEditTagName(tag.name);
    setEditTagCategory(tag.category);
  };

  const handleSaveEdit = async () => {
    if (editTagName.trim() === "") {
      setError("Please enter a tag name");
      return;
    }

    try {
      const response = await tagsAPI.updateTag(editingTag, {
        name: editTagName.trim(),
        category: editTagCategory,
      });

      if (response.success) {
        setSuccess("Tag updated successfully!");
        setEditingTag(null);
        setEditTagName("");
        setEditTagCategory("");
        fetchTags(); // Refresh the list
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleCancelEdit = () => {
    setEditingTag(null);
    setEditTagName("");
    setEditTagCategory("");
  };

  const filteredTags = tags.filter((tag) => {
    const matchesSearch = tag.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "All" || tag.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getTagCountByCategory = (category) => {
    return tags.filter((tag) => tag.category === category).length;
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <FaTag className="text-cyan-500" />
            Manage Tags
          </h1>
          <p className="text-gray-400">
            Create and manage tags for organizing AI-generated content
          </p>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-4 bg-green-950/50 border border-green-800 rounded-lg p-4">
            <p className="text-green-400">{success}</p>
          </div>
        )}
        {error && (
          <div className="mb-4 bg-red-950/50 border border-red-800 rounded-lg p-4">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-950 border border-gray-800 rounded-xl p-4">
            <p className="text-gray-400 text-sm mb-1">Total Tags</p>
            <p className="text-3xl font-bold text-cyan-500">{tags.length}</p>
          </div>
          <div className="bg-gray-950 border border-gray-800 rounded-xl p-4">
            <p className="text-gray-400 text-sm mb-1">Style Tags</p>
            <p className="text-3xl font-bold text-purple-500">
              {getTagCountByCategory("Style")}
            </p>
          </div>
          <div className="bg-gray-950 border border-gray-800 rounded-xl p-4">
            <p className="text-gray-400 text-sm mb-1">Mood Tags</p>
            <p className="text-3xl font-bold text-pink-500">
              {getTagCountByCategory("Mood")}
            </p>
          </div>
          <div className="bg-gray-950 border border-gray-800 rounded-xl p-4">
            <p className="text-gray-400 text-sm mb-1">Theme Tags</p>
            <p className="text-3xl font-bold text-blue-500">
              {getTagCountByCategory("Theme")}
            </p>
          </div>
        </div>

        {/* Create New Tag Section */}
        <div className="bg-gradient-to-br from-cyan-950/30 to-purple-950/30 border border-cyan-800/50 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <FaPlus className="text-cyan-500" />
            Create New Tag
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Tag Name
              </label>
              <input
                type="text"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                placeholder="Enter tag name (e.g., Cyberpunk, Minimalist)"
                className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-600"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleCreateTag();
                  }
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Category
              </label>
              <select
                value={newTagCategory}
                onChange={(e) => setNewTagCategory(e.target.value)}
                className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-600"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            onClick={handleCreateTag}
            className="mt-4 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 flex items-center gap-2"
          >
            <FaPlus />
            Create Tag
          </button>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Search Tags
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by tag name..."
                className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-600"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Filter by Category
              </label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-600"
              >
                <option value="All">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tags List */}
        <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4">
            All Tags ({filteredTags.length})
          </h2>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
              <p className="text-gray-400 mt-4">Loading tags...</p>
            </div>
          ) : filteredTags.length === 0 ? (
            <div className="text-center py-12">
              <FaTag className="text-6xl text-gray-700 mx-auto mb-4" />
              <p className="text-gray-400">No tags found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">
                      Tag Name
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">
                      Created Date
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTags.map((tag) => (
                    <tr
                      key={tag.id}
                      className="border-b border-gray-800 hover:bg-gray-900 transition-colors"
                    >
                      {editingTag === tag.id ? (
                        <>
                          <td className="py-3 px-4">
                            <input
                              type="text"
                              value={editTagName}
                              onChange={(e) => setEditTagName(e.target.value)}
                              className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-cyan-600"
                            />
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={editTagCategory}
                              onChange={(e) => setEditTagCategory(e.target.value)}
                              className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-cyan-600"
                            >
                              {categories.map((category) => (
                                <option key={category} value={category}>
                                  {category}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="py-3 px-4 text-gray-400">
                            {new Date(tag.created_at).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={handleSaveEdit}
                                className="bg-green-600 hover:bg-green-500 text-white p-2 rounded-lg transition-colors"
                                title="Save"
                              >
                                <FaCheck />
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg transition-colors"
                                title="Cancel"
                              >
                                <FaTimes />
                              </button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center gap-2 bg-gray-900 px-3 py-1 rounded-full">
                              <FaTag className="text-cyan-500 text-sm" />
                              <span className="font-medium">{tag.name}</span>
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                                tag.category === "Style"
                                  ? "bg-purple-900/50 text-purple-300"
                                  : tag.category === "Mood"
                                  ? "bg-pink-900/50 text-pink-300"
                                  : tag.category === "Theme"
                                  ? "bg-blue-900/50 text-blue-300"
                                  : tag.category === "Technique"
                                  ? "bg-green-900/50 text-green-300"
                                  : tag.category === "Color"
                                  ? "bg-yellow-900/50 text-yellow-300"
                                  : "bg-gray-800 text-gray-300"
                              }`}
                            >
                              {tag.category}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-400">
                            {new Date(tag.created_at).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => handleEditTag(tag)}
                                className="bg-cyan-600 hover:bg-cyan-500 text-white p-2 rounded-lg transition-colors"
                                title="Edit"
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => handleDeleteTag(tag.id)}
                                className="bg-red-600 hover:bg-red-500 text-white p-2 rounded-lg transition-colors"
                                title="Delete"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-gradient-to-r from-cyan-950/30 to-purple-950/30 border border-cyan-800/50 rounded-xl p-4">
          <h3 className="font-semibold mb-2 text-cyan-400">💡 Tag Management Tips</h3>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>• Tags help users discover and categorize AI-generated content</li>
            <li>• Use clear, descriptive names for better searchability</li>
            <li>• Organize tags by category: Style, Mood, Theme, Technique, Color, or Other</li>
            <li>• Tags created here will be available in all prompt submission forms</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
