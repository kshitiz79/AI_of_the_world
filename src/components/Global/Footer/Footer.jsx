"use client"
import React, { useRef } from "react";
import LaserFlow from './LaserFlow';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import Link from 'next/link';

export default function Footer() {
  const revealImgRef = useRef(null);

  return (
    <div 
      style={{ 
        height: '400px', 
        position: 'fixed', 
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        overflow: 'hidden',
        backgroundColor: '#060010',
        zIndex: -1000 // Ensure it's above other content
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const el = revealImgRef.current;
        if (el) {
          el.style.setProperty('--mx', `${x}px`);
          el.style.setProperty('--my', `${y + rect.height * 0.5}px`);
        }
      }}
      onMouseLeave={() => {
        const el = revealImgRef.current;
        if (el) {
          el.style.setProperty('--mx', '-9999px');
          el.style.setProperty('--my', '-9999px');
        }
      }}
    >
      <LaserFlow
        horizontalBeamOffset={0.1}
        verticalBeamOffset={-0.4}
        color="#78ebcc"
      />

      <img
        ref={revealImgRef}
        src="/path/to/image.jpg"
        alt="Reveal effect"
        style={{
          position: 'absolute',
          width: '100%',
          top: '-50%',
          zIndex: 5,
          mixBlendMode: 'lighten',
          opacity: 0.3,
          pointerEvents: 'none',
          '--mx': '-9999px',
          '--my': '-9999px',
          WebkitMaskImage: 'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)',
          maskImage: 'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat'
        }}
      />

      {/* Footer Content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-between px-8 py-8 md:px-16">
        {/* Top Section - Logo and Social Icons */}
        <div className="flex justify-between items-start">
          {/* Logo */}
          <div>
            <img 
              src="https://cdn.pixabay.com/photo/2018/08/04/11/30/draw-3583548_1280.png" 
              alt="AI of the World Logo" 
              className="h-16 w-auto"
            />
          </div>

          {/* Social Icons */}
          <div className="flex gap-4">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-pink-400 transition-colors duration-300"
              aria-label="Instagram"
            >
              <FaInstagram size={24} />
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
              aria-label="Facebook"
            >
              <FaFacebook size={24} />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-blue-300 transition-colors duration-300"
              aria-label="Twitter"
            >
              <FaTwitter size={24} />
            </a>
          </div>
        </div>

        {/* Bottom Section - Links on Left, Icons on Right */}
        <div className="flex justify-between items-end">
          {/* Left Side - Copyright and Links */}
          <div className="flex flex-col gap-3">
           
            <div className="flex gap-6 text-gray-400 text-sm">
              <Link href="/terms" className="hover:text-gray-200 transition-colors">
                Terms
              </Link>
              <Link href="/privacy" className="hover:text-gray-200 transition-colors">
                Privacy
              </Link>
              <Link href="/faq" className="hover:text-gray-200 transition-colors">
                FAQ
              </Link>
              <Link href="/contact" className="hover:text-gray-200 transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Right Side - Social Icons */}
         <p className="text-gray-400 text-sm">© 2025 Ai of the world</p>
        </div>
      </div>
    </div>
  );
}