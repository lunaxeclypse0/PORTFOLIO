import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Moved out of experimental (required for Next.js 15.5+)
  outputFileTracingRoot: path.join(__dirname),

  // Hide the Next.js "N" dev toolbar completely
  devIndicators: false,

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "ui-avatars.com" },
      { protocol: "https", hostname: "goclinic.ph" },
    ],
  },
};

export default nextConfig;
