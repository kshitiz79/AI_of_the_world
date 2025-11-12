"use client"
import React from "react";
import LightRays from './LightRays';

export default function Banner() {
  return (
    <div style={{ width: '100%', height: '800px', position: 'relative', backgroundColor: 'black' }}>
      {/* Light effect (non-interactive) */}
      <LightRays
        raysOrigin="top-center"
        raysColor="#00ffffff"
        raysSpeed={1.9}
        lightSpread={0.8}
        rayLength={3.8}
        followMouse={true}
        mouseInfluence={0.1}
        noiseAmount={0.1}
        distortion={0.05}
        className="custom-rays"
      />

      {/* Centered overlay content */}
      <div
        className="absolute inset-0 flex items-center justify-center px-4"
        style={{ zIndex: 5, pointerEvents: 'auto' }} // ensure the overlay is interactive
      >
        <div className="text-center max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-300 leading-tight drop-shadow-lg">
            hello
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200/90">
            Welcome to the world
          </p>

          <div className="mt-8 flex gap-4 justify-center">
            <button
              type="button"
              className="px-6 py-3 rounded-lg bg-white text-black font-medium shadow-md hover:shadow-lg transition"
              onClick={() => console.log('Get Started clicked')}
            >
              Get Started
            </button>

            <button
              type="button"
              className="px-6 py-3 rounded-lg border border-gray-400 text-gray-200 font-medium bg-transparent hover:bg-white/10 transition"
              onClick={() => console.log('Learn More clicked')}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
