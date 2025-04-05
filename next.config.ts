// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig: import("next").NextConfig = {
  images: {
    domains: ["oagsprvqqc.ufs.sh"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
