import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-10">
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} MyWebsite. All rights reserved.</p>
      </div>
    </footer>
  );
}
