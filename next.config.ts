// next.config.js or next.config.ts
const removeImports = require("next-remove-imports")();

const nextConfig = {
  images: {
    domains: ["oagsprvqqc.ufs.sh"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = removeImports(nextConfig);
