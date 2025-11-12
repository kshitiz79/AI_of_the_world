import React from "react";

export default function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <h1 className="text-2xl font-bold">MyWebsite</h1>
        <nav className="space-x-6">
          <a href="#" className="hover:text-gray-200">Home</a>
          <a href="#" className="hover:text-gray-200">About</a>
          <a href="#" className="hover:text-gray-200">Services</a>
          <a href="#" className="hover:text-gray-200">Contact</a>
        </nav>
      </div>
    </header>
  );
}
