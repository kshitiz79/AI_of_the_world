"use client";
import React, { useState } from "react";
import StarBorder from "../../CreativeImages/StarBorder";
import { FaSearch } from "react-icons/fa";

export default function FilterSection({ selectedFilters, setSelectedFilters, filterData }) {
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFilter = (filterId) => {
    setSelectedFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId]
    );
  };

  const renderFilterGroup = (title, filters) => (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <StarBorder
            key={filter.id}
            onClick={() => toggleFilter(filter.id)}
            className={`transition-all duration-300 transform ${
              selectedFilters.includes(filter.id) 
                ? "scale-110 shadow-2xl shadow-cyan-500/50" 
                : "opacity-70 hover:opacity-100 hover:scale-105"
            }`}
            color={selectedFilters.includes(filter.id) ? "cyan" : "white"}
            speed={selectedFilters.includes(filter.id) ? "3s" : "5s"}
            thickness={selectedFilters.includes(filter.id) ? 2 : 1}
          >
            <div className={`flex items-center gap-2 ${
              selectedFilters.includes(filter.id) ? "font-bold" : "font-medium"
            }`}>
              <span className={selectedFilters.includes(filter.id) ? "text-xl" : ""}>
                {filter.icon}
              </span>
              <span>{filter.label}</span>
            </div>
          </StarBorder>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full bg-transparent border border-gray-600 rounded-lg p-6">
      <div className="mb-6">
        <div className="inline-block px-3 py-1 bg-gray-800 rounded-full text-xs font-semibold text-gray-300 mb-4">
          REFINE GALLERY
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Filter by style and technique
        </h2>
        <p className="text-gray-400 text-sm">
          Search titles or creators, then stack tags to surface the content you want to study.
        </p>
      </div>

      <div className="mb-6">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type="text"
            placeholder="Search titles, creators, or prompts"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
      </div>

 

      {renderFilterGroup("ARTISTIC STYLES", filterData.artisticStyles)}
      {renderFilterGroup("CORPORATE & PROFESSIONAL", filterData.corporateProfessional)}
      {renderFilterGroup("GENRE & THEMES", filterData.genreThemes)}
      {renderFilterGroup("MOOD & TONE", filterData.moodTone)}
      {renderFilterGroup("OPTIONAL ADD-ONS", filterData.optionalAddOns)}
    </div>
  )
}