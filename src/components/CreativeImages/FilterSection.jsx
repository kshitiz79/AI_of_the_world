"use client";
import React, { useState, useEffect } from "react";
import { tagsAPI } from "@/api";
import StarBorder from "./StarBorder";
import { FaSearch } from "react-icons/fa";

export default function FilterSection({ selectedFilters, setSelectedFilters }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      setLoading(true);
      const response = await tagsAPI.getAllTags();
      if (response.success) {
        setTags(response.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch tags:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleFilter = (filterName) => {
    setSelectedFilters((prev) =>
      prev.includes(filterName)
        ? prev.filter((name) => name !== filterName)
        : [...prev, filterName]
    );
  };

  // Group tags by category
  const groupedTags = {
    Style: tags.filter(tag => tag.category === 'Style'),
    Mood: tags.filter(tag => tag.category === 'Mood'),
    Theme: tags.filter(tag => tag.category === 'Theme'),
    Technique: tags.filter(tag => tag.category === 'Technique'),
    Color: tags.filter(tag => tag.category === 'Color'),
    Other: tags.filter(tag => tag.category === 'Other'),
  };

  const renderFilterGroup = (title, filters) => {
    if (!filters || filters.length === 0) return null;
    
    return (
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">
          {title}
        </h3>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <StarBorder
              key={filter.id}
              onClick={() => toggleFilter(filter.name)}
              className={`transition-all duration-300 transform ${
                selectedFilters.includes(filter.name) 
                  ? " shadow-2xl shadow-cyan-500/50" 
                  : "opacity-70 hover:opacity-100 "
              }`}
              color={selectedFilters.includes(filter.name) ? "cyan" : "white"}
              speed={selectedFilters.includes(filter.name) ? "3s" : "5s"}
              thickness={selectedFilters.includes(filter.name) ? 2 : 1}
            >
              <div className={`flex items-center gap-2 ${
                selectedFilters.includes(filter.name) ? "font-bold" : "font-medium"
              }`}>
                <span>{filter.name}</span>
              </div>
            </StarBorder>
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="w-full bg-transparent border border-gray-600 rounded-lg p-6">
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
          <p className="text-gray-400 mt-2">Loading filters...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-transparent border border-gray-600 rounded-lg p-6">
      <div className="mb-6">
        <div className="inline-block px-3 py-1 bg-gray-800 rounded-full text-xs font-semibold text-gray-300 mb-4">
          REFINE GALLERY
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Filter images by style and technique
        </h2>
        <p className="text-gray-400 text-sm">
          Search titles or creators, then stack tags to surface the artwork you want to study.
        </p>
      </div>

      <div className="mb-6">
         <div className="relative">
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg mb-20" />

      <input
        type="text"
        placeholder="Search ti creators, or prompts"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
    </div>
      </div>

    

      {renderFilterGroup("ARTISTIC STYLES", groupedTags.Style)}
      {renderFilterGroup("MOOD & TONE", groupedTags.Mood)}
      {renderFilterGroup("GENRE & THEMES", groupedTags.Theme)}
      {renderFilterGroup("TECHNIQUES", groupedTags.Technique)}
      {renderFilterGroup("COLORS", groupedTags.Color)}
      {renderFilterGroup("OTHER", groupedTags.Other)}
    </div>
  );
}
