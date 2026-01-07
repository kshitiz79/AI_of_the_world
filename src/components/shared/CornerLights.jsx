"use client";
import React from "react";

export default function CornerLights({
  topSize = "55rem",
  bottomSize = "50rem",
  topOpacity = 0.28,
  bottomOpacity = 0.18,
  topBlur = "blur-3xl",
  bottomBlur = "blur-xl",
  className = ""
}) {
  return (
    <div className={`absolute inset-0 pointer-events-none z-20 ${className}`}>
      {/* Top-left soft light */}
      <div
        className={`absolute top-0 left-0 ${topBlur}`}
        style={{
          width: topSize,
          height: topSize,
          opacity: topOpacity,
          background:
            "radial-gradient(circle at top left, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.25) 35%, transparent 80%)",
          transform: "translate(-10%, -10%)"
        }}
      />

      {/* Top-right soft light */}
      <div
        className={`absolute top-0 right-0 ${topBlur}`}
        style={{
          width: topSize,
          height: topSize,
          opacity: topOpacity,
          background:
            "radial-gradient(circle at top right, rgba(165, 189, 219, 0.59) 0%, rgba(255,255,255,0.25) 35%, transparent 80%)",
          transform: "translate(10%, -10%)",
          mixBlendMode: "screen"
        }}
      />

      {/* Bottom-left soft light */}
      <div
        className={`${bottomBlur} absolute bottom-0 left-0`}
        style={{
          width: bottomSize,
          height: bottomSize,
          opacity: bottomOpacity,
          background:
            "radial-gradient(circle at bottom left, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.15) 40%, transparent 85%)",
          transform: "translate(-8%, 8%)"
        }}
      />

      {/* Bottom-right soft light */}
      <div
        className={`${bottomBlur} absolute bottom-0 right-0`}
        style={{
          width: bottomSize,
          height: bottomSize,
          opacity: bottomOpacity,
          background:
            "radial-gradient(circle at bottom right, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.15) 40%, transparent 85%)",
          transform: "translate(8%, 8%)",
          mixBlendMode: "screen"
        }}
      />
    </div>
  );
}
