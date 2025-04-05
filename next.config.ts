// next.config.js or next.config.ts
const removeImports = require("next-remove-imports")();

const nextConfig = {
  images: {
    domains: ["oagsprvqqc.ufs.sh"],
  },
};

module.exports = removeImports(nextConfig);
