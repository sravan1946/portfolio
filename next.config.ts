import type { NextConfig } from "next";

// For GitHub Pages deployment:
// - Custom domain: BASE_PATH = "" (empty, served at root like example.com)
// - Repository page: BASE_PATH = "/repo-name" (served at github.io/repo-name)
// - User/org page: BASE_PATH = "" (empty, served at github.io)
//
// The BASE_PATH is set automatically by GitHub Actions configure-pages action
// which detects custom domain configuration. The action also modifies this file during build.
// For local development, use empty string or "/portfolio" if testing the repository page setup.
const basePath = process.env.BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: basePath,
  assetPrefix: basePath,
  trailingSlash: true,
};

export default nextConfig;
