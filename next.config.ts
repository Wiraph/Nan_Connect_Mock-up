import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow accessing the dev server from the local network (e.g. phone on the
  // same Wi-Fi at http://192.168.x.x:3000). Without this, Next blocks dev
  // resources/HMR for cross-origin hosts, which breaks client-side hydration
  // (buttons, language switch, etc. stop responding).
  allowedDevOrigins: ["192.168.1.71"],
};

export default nextConfig;
