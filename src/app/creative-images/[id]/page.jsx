import React from "react";
import ImageDetailClient from "./ImageDetailClient";

// Generate static params for export
export async function generateStaticParams() {
  // Generate placeholder paths - actual data will be fetched client-side
  return Array.from({ length: 100 }, (_, i) => ({
    id: String(i + 1),
  }));
}

export default async function ImageDetailPage({ params }) {
  const { id } = await params;
  return <ImageDetailClient id={id} />;
}
