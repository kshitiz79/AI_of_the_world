"use client";
import React from "react";
import FluidGlass from "./FluidGlass";

export default function FluidGlassParent() {
  return (


    <div >
    <div className="z-10" style={{ height: "900px", position: "relative" }}>
      <FluidGlass
        mode="lens"
        lensProps={{
          scale: 0.25,
          ior: 1.15,
          thickness: 5,
          chromaticAberration: 0.1,
          anisotropy: 0.01,
        }}
      />

{/* Bottom corner soft lights */}
<div className="absolute inset-0 pointer-events-none z-40">
  {/* Bottom-left soft light */}
  <div
    className="absolute bottom-0 left-0 w-[55rem] h-[55rem] opacity-30 blur-3xl mix-blend-screen"
    style={{
      background:
        "radial-gradient(circle at bottom left, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.2) 40%, transparent 80%)",
    }}
  />

  {/* Bottom-right soft light */}
  <div
    className="absolute bottom-0 right-0 w-[55rem] h-[55rem] opacity-30 blur-3xl mix-blend-screen"
    style={{
      background:
        "radial-gradient(circle at bottom right, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.2) 40%, transparent 80%)",
    }}
  />
</div>

    </div>
    </div>
  );
}



// IMPORTANT INFO BELOW
// This component requires a 3D model to function correctly.
// You can find three example models in the 'public/assets/3d' directory of the repository:
// - 'lens.glb'
// - 'bar.glb'
// - 'cube.glb'
// Make sure to place these models in the correct directory or update the paths accordingly.


