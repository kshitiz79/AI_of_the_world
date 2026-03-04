import React from "react";
import GifDetailClient from "./GifDetailClient";

// Generate static params for export
export async function generateStaticParams() {
  // Generate placeholder paths - actual data will be fetched client-side
  return Array.from({ length: 100 }, (_, i) => ({
    id: String(i + 1),
  }));
}

export default async function GifDetailPage({ params }) {
  const { id } = await params;
  return <GifDetailClient id={id} />;
}
