"use client";
import React from "react";
import Threads from "./Threads";
import CornerLights from "../shared/CornerLights";
import SplashCursor from "../Global/Cursor/SplashCursor";


export default function AIWelcome({
  eyebrow = "",
  title = "AI that transforms prompts into visual magic.",
  subtitle = "An AI that converts text prompts into high-quality images — sell, customize, and deliver ready-to-use prompts and artwork for creators and businesses.",
  ctaPrimary = "Watch a demo",
  className = ""
}) {
  return (
    <section className={`relative bg-black overflow-hidden ${className}`}>

            <SplashCursor />
      <div style={{ width: "100%", height: "350px", position: "relative", background: "black" }}>
        <Threads />
      </div>

      {/* Shared lights overlay */}


      <div className="max-w-7xl mx-auto px-6 pb-20 md:pb-28 text-center relative z-30">
        {eyebrow ? <div className="text-sm text-slate-600 mb-6">{eyebrow}</div> : null}

        <h1 className="mx-auto max-w-4xl text-4xl md:text-6xl font-extrabold leading-tight text-white">
          {title}
        </h1>

        <p className="mt-8 mx-auto max-w-3xl text-lg md:text-xl text-slate-300">
          {subtitle}
        </p>

        <div className="mt-12 flex justify-center gap-6">
          <button
            className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-transparent border border-white text-white text-lg font-medium hover:bg-white/10 transition-colors duration-300 z-40"
            onClick={() => console.log("Watch demo")}
            aria-label={ctaPrimary}
          >
            <span>{ctaPrimary}</span>
            <span className="w-10 h-10 bg-[#c3512a] rounded-full flex items-center justify-center text-white">→</span>
          </button>
        </div>
      </div>

      {/* Decorative rounded image card centered — same baseline as FluidGlassParent */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 bottom-0 translate-y-1/2 w-[80%] md:w-[65%] h-48 md:h-64 bg-cover bg-center rounded-3xl shadow-xl"
        style={{ backgroundImage: `url('/hero-photo.jpg')`, zIndex: 10, pointerEvents: 'none' }}
      />
    </section>
  );
}





