import React from "react";
import { use } from "react";
import VideoDetail from "@/components/shared/VideoDetail";
import videosData from "@/data/videosData.json";
import Link from "next/link";

export function generateStaticParams() {
  return videosData.map((video) => ({
    id: video.id.toString(),
  }));
}

export default function VideoDetailPage({ params }) {
  const unwrappedParams = use(params);
  const videoId = parseInt(unwrappedParams.id);
  
  const video = videosData.find((item) => item.id === videoId);

  if (!video) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Video Not Found</h1>
          <Link
            href="/videos"
            className="inline-block bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-700 transition-colors"
          >
            Back to Gallery
          </Link>
        </div>
      </div>
    );
  }

  return <VideoDetail video={video} />;
}
