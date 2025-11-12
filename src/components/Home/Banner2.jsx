"use client"
import React from "react";
import Beams from './Beams';

export default function Banner2() {
  return (
    <div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <Beams
    beamWidth={2}
    beamHeight={15}
    beamNumber={12}
    lightColor="#ffffff"
    speed={2}
    noiseIntensity={1.75}
    scale={0.2}
    rotation={0}
  />
</div>

  );
}
