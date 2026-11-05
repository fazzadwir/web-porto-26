import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF is ~20-30% smaller than WebP for the large mockup PNGs; browsers without it get WebP
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },
  // Studio is hosted by Sanity now (kept out of the Worker bundle); old links still work.
  async redirects() {
    return [
      { source: "/studio", destination: "https://fazzadwr.sanity.studio", permanent: true },
      { source: "/studio/:path*", destination: "https://fazzadwr.sanity.studio/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
