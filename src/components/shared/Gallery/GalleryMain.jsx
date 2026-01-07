"use client";
import React, { useState } from "react";
import FilterSection from "./FilterSection";
import GalleryGrid from "./GalleryGrid";
import Plasma from "../../Plasma";

export default function GalleryMain({ 
  title, 
  subtitle, 
  data, 
  filterData, 
  type = "image" 
}) {
  const [selectedFilters, setSelectedFilters] = useState([]);

  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="max-w-7xl mx-auto px-4 py-32">
        <div className="mb-12 border border-gray-500 relative overflow-hidden rounded-2xl" style={{ height: '300px' }}>
          {/* Left Plasma */}
          <div className="absolute left-0 top-0 w-1/2 h-full z-0">
            <Plasma
              color="#3b0172"
              speed={0.6}
              direction="forward"
              scale={1.1}
              opacity={0.8}
              mouseInteractive={true}
            />
          </div>
          
          {/* Right Plasma */}
          <div className="absolute right-0 top-0 w-1/2 h-full z-0">
            <Plasma
              color="#00ffff"
              speed={0.8}
              direction="reverse"
              scale={1.2}
              opacity={0.8}
              mouseInteractive={true}
            />
          </div>
          
          <div className="relative z-10 flex flex-col items-center justify-center h-full px-8">
            <h1 className="text-5xl text-center font-bold mb-4">
              {title}
            </h1>
            <p className="text-gray-400 text-center text-lg max-w-4xl mx-auto">
              {subtitle}
            </p>
          </div>
        </div>

        <FilterSection 
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          filterData={filterData}
        />

        <div className="mt-12">
          <GalleryGrid 
            selectedFilters={selectedFilters} 
            data={data}
            type={type}
          />
        </div>
      </div>
    </div>
  );
}
