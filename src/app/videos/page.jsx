import React from "react";
import GalleryMain from "@/components/shared/Gallery/GalleryMain";
import videosData from "@/data/videosData.json";
import filterData from "@/components/CreativeImages/filterData.json";

export default function VideosPage() {
  return (
    <GalleryMain
      title="Explore AI-Generated Videos"
      subtitle="Watch cinematic AI videos and learn the prompts behind them. Discover techniques for creating professional video content."
      data={videosData}
      filterData={filterData}
      type="video"
    />
  );
}
