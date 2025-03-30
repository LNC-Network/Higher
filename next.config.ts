import type { NextConfig } from "next";
const nextConfig: NextConfig = {};
export default nextConfig;

const removeImports = require("next-remove-imports")();
module.exports = removeImports({});
