import React from "react";
import { use } from "react";
import ImageDetail from "@/components/CreativeImages/ImageDetail";
import gifsData from "@/data/gifsData.json";
import Link from "next/link";

export function generateStaticParams() {
  return gifsData.map((gif) => ({
    id: gif.id.toString(),
  }));
}

export default function GifDetailPage({ params }) {
  const unwrappedParams = use(params);
  const gifId = parseInt(unwrappedParams.id);
  
  const gif = gifsData.find((item) => item.id === gifId);

  if (!gif) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">GIF Not Found</h1>
          <Link
            href="/gifs"
            className="inline-block bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-700 transition-colors"
          >
            Back to Gallery
          </Link>
        </div>
      </div>
    );
  }

  const imageData = {
    ...gif,
    image: gif.gif
  };

  return <ImageDetail image={imageData} />;
}
