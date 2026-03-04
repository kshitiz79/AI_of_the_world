"use client";
import React, { useState, useEffect } from "react";
import { FaCheck, FaTimes, FaGlobe, FaGlobeAmericas, FaTrash, FaImage, FaVideo } from "react-icons/fa";
import { MdGif } from "react-icons/md";
import { imagesAPI, gifsAPI, videosAPI } from "@/api";

export default function VerifyCreatorPromptPage() {
  const [contentType, setContentType] = useState("images"); // 'images', 'gifs', or 'videos'
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("pending");
  const [selectedItem, setSelectedItem] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchItems();
  }, [filterStatus, contentType]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError("");
      let response;
      
      if (contentType === "images") {
        response = await imagesAPI.getAllImages({ status: filterStatus });
      } else if (contentType === "gifs") {
        response = await gifsAPI.getAllGIFs({ status: filterStatus });
      } else {
        response = await videosAPI.getAllVideos({ status: filterStatus });
      }
      
      if (response.success) {
        setItems(response.data || []);
      }
    } catch (err) {
      console.error(`Failed to fetch ${contentType}:`, err);
      setError(`Failed to load ${contentType}`);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      let response;
      if (contentType === "images") {
        response = await imagesAPI.approveImage(id);
      } else if (contentType === "gifs") {
        response = await gifsAPI.approveGIF(id);
      } else {
        response = await videosAPI.approveVideo(id);
      }
      
      if (response.success) {
        setSuccess(`${contentType.slice(0, -1)} approved successfully!`);
        fetchItems();
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleReject = async (id) => {
    if (!confirm(`Are you sure you want to reject this ${contentType.slice(0, -1)}?`)) return;
    
    try {
      let response;
      if (contentType === "images") {
        response = await imagesAPI.rejectImage(id);
      } else if (contentType === "gifs") {
        response = await gifsAPI.rejectGIF(id);
      } else {
        response = await videosAPI.rejectVideo(id);
      }
      
      if (response.success) {
        setSuccess(`${contentType.slice(0, -1)} rejected successfully!`);
        fetchItems();
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(""), 3000);
    }
  };

  const handlePublish = async (id) => {
    try {
      let response;
      if (contentType === "images") {
        response = await imagesAPI.publishImage(id);
      } else if (contentType === "gifs") {
        response = await gifsAPI.publishGIF(id);
      } else {
        response = await videosAPI.publishVideo(id);
      }
      
      if (response.success) {
        setSuccess(`${contentType.slice(0, -1)} published successfully!`);
        fetchItems();
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleUnpublish = async (id) => {
    try {
      let response;
      if (contentType === "images") {
        response = await imagesAPI.unpublishImage(id);
      } else if (contentType === "gifs") {
        response = await gifsAPI.unpublishGIF(id);
      } else {
        response = await videosAPI.unpublishVideo(id);
      }
      
      if (response.success) {
        setSuccess(`${contentType.slice(0, -1)} unpublished successfully!`);
        fetchItems();
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm(`Are you sure you want to delete this ${contentType.slice(0, -1)}? This action cannot be undone.`)) return;
    
    try {
      let response;
      if (contentType === "images") {
        response = await imagesAPI.deleteImage(id);
      } else if (contentType === "gifs") {
        response = await gifsAPI.deleteGIF(id);
      } else {
        response = await videosAPI.deleteVideo(id);
      }
      
      if (response.success) {
        setSuccess(`${contentType.slice(0, -1)} deleted successfully!`);
        fetchItems();
        setSelectedItem(null);
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(""), 3000);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: "bg-yellow-900/50 text-yellow-300",
      approved: "bg-green-900/50 text-green-300",
      rejected: "bg-red-900/50 text-red-300",
    };
    return badges[status] || "bg-gray-800 text-gray-300";
  };

  const getMediaUrl = (item) => {
    if (contentType === "images") return item.image_url;
    if (contentType === "gifs") return item.gif_url;
    return item.video_url;
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Verify Creator Prompts</h1>
          <p className="text-gray-400">
            Review and approve AI-generated content submissions
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

        {/* Content Type Tabs */}
        <div className="bg-gray-950 border border-gray-800 rounded-2xl p-2 mb-6 flex gap-2">
          <button
            onClick={() => setContentType("images")}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
              contentType === "images"
                ? "bg-cyan-600 text-white"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <FaImage /> Images
          </button>
          <button
            onClick={() => setContentType("gifs")}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
              contentType === "gifs"
                ? "bg-cyan-600 text-white"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <MdGif className="text-2xl" /> GIFs
          </button>
          <button
            onClick={() => setContentType("videos")}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
              contentType === "videos"
                ? "bg-cyan-600 text-white"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <FaVideo /> Videos
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-950 border border-gray-800 rounded-xl p-4">
            <p className="text-gray-400 text-sm mb-1">Total Submissions</p>
            <p className="text-3xl font-bold text-cyan-500">{items.length}</p>
          </div>
          <div className="bg-gray-950 border border-gray-800 rounded-xl p-4">
            <p className="text-gray-400 text-sm mb-1">Pending</p>
            <p className="text-3xl font-bold text-yellow-500">
              {items.filter(item => item.status === 'pending').length}
            </p>
          </div>
          <div className="bg-gray-950 border border-gray-800 rounded-xl p-4">
            <p className="text-gray-400 text-sm mb-1">Approved</p>
            <p className="text-3xl font-bold text-green-500">
              {items.filter(item => item.status === 'approved').length}
            </p>
          </div>
          <div className="bg-gray-950 border border-gray-800 rounded-xl p-4">
            <p className="text-gray-400 text-sm mb-1">Published</p>
            <p className="text-3xl font-bold text-blue-500">
              {items.filter(item => item.is_published).length}
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-gray-950 border border-gray-800 rounded-2xl p-2 mb-6 flex gap-2">
          {['pending', 'approved', 'rejected', 'all'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status === 'all' ? '' : status)}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                filterStatus === (status === 'all' ? '' : status)
                  ? "bg-cyan-600 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Items Grid */}
        <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
              <p className="text-gray-400 mt-4">Loading {contentType}...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-12">
              <FaImage className="text-6xl text-gray-700 mx-auto mb-4" />
              <p className="text-gray-400">No {contentType} found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-black border border-gray-800 rounded-xl overflow-hidden hover:border-cyan-600 transition-all cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                >
                  {/* Media */}
                  <div className="relative aspect-square bg-gray-900">
                    {contentType === "videos" ? (
                      <video
                        src={getMediaUrl(item)}
                        className="w-full h-full object-cover"
                        muted
                        loop
                      />
                    ) : (
                      <img
                        src={getMediaUrl(item)}
                        alt={item.project_title}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute top-2 right-2 flex gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(item.status)}`}>
                        {item.status}
                      </span>
                      {item.is_published && (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-900/50 text-blue-300">
                          <FaGlobe className="inline mr-1" />
                          Published
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 truncate">{item.project_title}</h3>
                    <p className="text-sm text-gray-400 mb-3 line-clamp-2">{item.prompt}</p>
                    
                    {/* User Info */}
                    <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
                      <span>By: {item.creator_credit}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      {item.status === 'pending' && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleApprove(item.id);
                            }}
                            className="flex-1 bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                          >
                            <FaCheck /> Approve
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleReject(item.id);
                            }}
                            className="flex-1 bg-red-600 hover:bg-red-500 text-white py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                          >
                            <FaTimes /> Reject
                          </button>
                        </>
                      )}
                      {item.status === 'approved' && !item.is_published && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePublish(item.id);
                          }}
                          className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <FaGlobeAmericas /> Publish
                        </button>
                      )}
                      {item.is_published && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUnpublish(item.id);
                          }}
                          className="flex-1 bg-yellow-600 hover:bg-yellow-500 text-white py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <FaTimes /> Unpublish
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item.id);
                        }}
                        className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Detail Modal */}
        {selectedItem && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <div
              className="bg-gray-950 border border-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedItem(null)}
                  className="float-right text-gray-400 hover:text-white"
                >
                  <FaTimes className="text-2xl" />
                </button>

                {/* Media */}
                {contentType === "videos" ? (
                  <video
                    src={getMediaUrl(selectedItem)}
                    controls
                    className="w-full rounded-lg mb-6"
                  />
                ) : (
                  <img
                    src={getMediaUrl(selectedItem)}
                    alt={selectedItem.project_title}
                    className="w-full rounded-lg mb-6"
                  />
                )}

                {/* Details */}
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{selectedItem.project_title}</h2>
                    <div className="flex gap-2 mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(selectedItem.status)}`}>
                        {selectedItem.status}
                      </span>
                      {selectedItem.is_published && (
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-900/50 text-blue-300">
                          Published
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-400 mb-2">Prompt:</h3>
                    <p className="text-white">{selectedItem.prompt}</p>
                  </div>

                  {selectedItem.technical_notes && (
                    <div>
                      <h3 className="font-semibold text-gray-400 mb-2">Technical Notes:</h3>
                      <p className="text-white">{selectedItem.technical_notes}</p>
                    </div>
                  )}

                  {selectedItem.model_or_tool && (
                    <div>
                      <h3 className="font-semibold text-gray-400 mb-2">Model/Tool:</h3>
                      <p className="text-white">{selectedItem.model_or_tool}</p>
                    </div>
                  )}

                  <div>
                    <h3 className="font-semibold text-gray-400 mb-2">Creator:</h3>
                    <p className="text-white">{selectedItem.creator_credit}</p>
                  </div>

                  {selectedItem.tags && selectedItem.tags.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-400 mb-2">Tags:</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedItem.tags.map((tag) => (
                          <span
                            key={tag.id}
                            className="px-3 py-1 bg-gray-800 rounded-full text-sm"
                          >
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t border-gray-800">
                    {selectedItem.status === 'pending' && (
                      <>
                        <button
                          onClick={() => {
                            handleApprove(selectedItem.id);
                            setSelectedItem(null);
                          }}
                          className="flex-1 bg-green-600 hover:bg-green-500 text-white py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <FaCheck /> Approve
                        </button>
                        <button
                          onClick={() => {
                            handleReject(selectedItem.id);
                            setSelectedItem(null);
                          }}
                          className="flex-1 bg-red-600 hover:bg-red-500 text-white py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <FaTimes /> Reject
                        </button>
                      </>
                    )}
                    {selectedItem.status === 'approved' && !selectedItem.is_published && (
                      <button
                        onClick={() => {
                          handlePublish(selectedItem.id);
                          setSelectedItem(null);
                        }}
                        className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <FaGlobeAmericas /> Publish to Gallery
                      </button>
                    )}
                    {selectedItem.is_published && (
                      <button
                        onClick={() => {
                          handleUnpublish(selectedItem.id);
                          setSelectedItem(null);
                        }}
                        className="flex-1 bg-yellow-600 hover:bg-yellow-500 text-white py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <FaTimes /> Unpublish
                      </button>
                    )}
                    <button
                      onClick={() => {
                        handleDelete(selectedItem.id);
                      }}
                      className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
