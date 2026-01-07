import React from "react";
import { use } from "react";
import ImageDetail from "@/components/CreativeImages/ImageDetail";
import imagesData from "@/components/CreativeImages/imagesData.json";
import Link from "next/link";

export function generateStaticParams() {
  return imagesData.map((image) => ({
    id: image.id.toString(),
  }));
}

export default function ImageDetailPage({ params }) {
  const unwrappedParams = use(params);
  const imageId = parseInt(unwrappedParams.id);
  
  const image = imagesData.find((img) => img.id === imageId);

  if (!image) {
    return (
      <div className="h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Image Not Found</h1>
          <Link
            href="/creative-images"
            className="inline-block bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-700 transition-colors"
          >
            Back to Gallery
          </Link>
        </div>
      </div>
    );
  }

  return <ImageDetail image={image} />;
}
