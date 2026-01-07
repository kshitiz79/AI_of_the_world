import React from "react";
import GalleryMain from "@/components/shared/Gallery/GalleryMain";
import gifsData from "@/data/gifsData.json";
import filterData from "@/components/CreativeImages/filterData.json";

export default function GifsPage() {
  return (
    <GalleryMain
      title="Explore AI-Generated GIFs"
      subtitle="Discover animated prompts and techniques. Browse through community-shared GIFs and learn how to create stunning animations."
      data={gifsData}
      filterData={filterData}
      type="gif"
    />
  );
}