/** @type {import('next').NextConfig} */
const nextConfig = {};

// TODO: Replace root directong forwarding in index.tsx with ...
// ... async rewrites in next.config.js

module.exports = {
  output: 'export',
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
        port: "",
      },
    ],
    dangerouslyAllowSVG: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};
