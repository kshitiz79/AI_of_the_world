/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',         // Enables static export to the 'out' directory
  trailingSlash: true,      // Adds trailing slash to all routes
  reactCompiler: true,      // Your existing config
};


export default nextConfig;
